"use client";
import { InterviewDataContext } from "@/app/context/InterviewDataContext";
import Vapi from "@vapi-ai/web";
import { Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import AlertConfirmation from "./_components/AlertConfirmation";
import FeedbackDisplay from "./_components/FeedbackDisplay";
import toast from "react-hot-toast";
import axios from "axios";
import { supabase } from "@/app/services/supabaseClient";
import { useParams } from "next/navigation";

const LiveInterview = () => {
  const { interviewInfo } = useContext(InterviewDataContext);
  const [vapi, setVapi] = useState(null);
  const [activeUser, setActiveUser] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [interviewEnded, setInterviewEnded] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const { interview_id } = useParams();
  const interviewDurationRef = useRef(0);

  useEffect(() => {
    if (interviewInfo?.interviewDuration) {
      const durationMatch = interviewInfo.interviewDuration.match(/(\d+)/);
      if (durationMatch) {
        interviewDurationRef.current = parseInt(durationMatch[0], 10) * 60;
      }
    }
  }, [interviewInfo]);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prev) => {
          const newValue = prev + 1;
          if (
            interviewDurationRef.current > 0 &&
            newValue >= interviewDurationRef.current
          ) {
            stopInterview();
            toast.info("Interview time limit reached");
          }
          return newValue;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const instance = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);
    setVapi(instance);

    return () => {
      if (instance) {
        try {
          instance.stop();
        } catch (error) {
          console.error("Error stopping Vapi instance:", error);
        }
      }
    };
  }, []);

  const stopInterview = useCallback(() => {
    if (!vapi) return;

    try {
      vapi.stop();
      setInterviewEnded(true);
      setIsTimerRunning(false);
      setActiveUser(null);
    } catch (error) {
      console.error("Error stopping interview:", error);
      toast.error("Error stopping interview");
    }
  }, [vapi]);

  const startCall = useCallback(async () => {
    if (!vapi || !interviewInfo) return;

    try {
      const questionList = interviewInfo?.questionList
        ?.map((item) => item.question)
        .join(", ");

      const assistantOptions = {
        name: "AI Interviewer",
        firstMessage: `Hi ${
          interviewInfo?.userName || "there"
        }, how are you? Ready for your interview on ${
          interviewInfo.jobPosition || "the position"
        }?`,
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en-US",
        },
        voice: {
          provider: "playht",
          voiceId: "jennifer",
        },
        model: {
          provider: "openai",
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `
                You are an AI voice assistant conducting interviews.
                Your job is to ask candidates provided interview questions, assess their responses.
                Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
                "Hey there! Welcome to your {{jobPosition}} interview. Let's get started with a few questions!"
                Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
                Questions: ${questionList || "General interview questions"} 
                If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
                "Need a hint? Think about how React tracks component updates!"
                Provide brief, encouraging feedback after each answer. Example:
                "Nice! That's a solid answer."
                "Hmm, not quite! Want to try again?"
                Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"
                After 5–7 questions, wrap up the interview smoothly by summarizing their performance. Example:
                "That was great! You handled some tough questions well. Keep sharpening your skills!"
                End on a positive note:
                "Thanks for chatting! Hope to see you crushing projects soon!"
                Key Guidelines:
                ✅ Be friendly, engaging, and witty 🎤
                ✅ Keep responses short and natural, like a real conversation
                ✅ Adapt based on the candidate's confidence level
                ✅ Ensure the interview remains focused on React
              `.trim(),
            },
          ],
        },
      };

      vapi.start(assistantOptions);
    } catch (error) {
      console.error("Error starting call:", error);
      toast.error("Failed to start interview");
    }
  }, [interviewInfo, vapi]);

  useEffect(() => {
    if (interviewInfo && vapi && !interviewEnded) {
      startCall();
    }
  }, [interviewInfo, vapi, interviewEnded, startCall]);

  useEffect(() => {
    if (!vapi) return;

    const handlers = {
      "call-start": () => {
        toast.success("Interview Started...");
        setIsTimerRunning(true);
      },
      "speech-start": () => setActiveUser(false),
      "speech-end": () => setActiveUser(true),
      "call-end": () => {
        toast.error("Interview Ended...");
        setActiveUser(null);
        setInterviewEnded(true);
        setIsTimerRunning(false);
      },
      message: (message) => {
        const newMessages = Array.isArray(message?.conversation)
          ? message.conversation
          : message?.conversation
          ? [message.conversation]
          : [];

        if (newMessages.length > 0) {
          setConversation((prev) => [...prev, ...newMessages]);
        }
      },
      error: (error) => {
        console.error("Vapi error:", error);
        toast.error("Interview error occurred");
      },
    };

    Object.entries(handlers).forEach(([event, handler]) => {
      vapi.on(event, handler);
    });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        vapi.off(event, handler);
      });
    };
  }, [vapi]);

  const GenerateFeedback = async () => {
    if (isLoading) return;

    const filteredConversation = conversation.filter((item) => item != null);
    if (filteredConversation.length === 0) {
      toast.error("No conversation data to analyze");
      return;
    }

    try {
      setIsLoading(true);
      const result = await axios.post("/api/ai-feedback", {
        conversation: JSON.stringify(filteredConversation),
      });

      try {
        const feedbackData = JSON.parse(result?.data?.data);
        setFeedback(feedbackData);

        toast.success("Feedback generated successfully");
        const { data, error } = await supabase
          .from("interview-feedback")
          .insert({
            interview_id: interview_id,
            feedback: feedbackData,
            userName: interviewInfo.userName,
            userEmail: interviewInfo.userEmail,
          });
        if (error) {
          console.error("Error saving feedback to database:", error);
          toast.error("Failed to save feedback to database");
        }
      } catch (parseError) {
        console.error("Parse error:", parseError);
        toast.error("Failed to parse feedback data");
      }
    } catch (error) {
      console.error("Feedback generation error:", error);
      toast.error("Error generating feedback");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-20 lg:px-48 xl:px-56">
      <h2 className="text-2xl md:text-3xl font-bold flex flex-col md:flex-row md:items-center md:justify-between">
        <span>Interview with AI Interviewer</span>
        <span className="flex items-center text-gray-500 font-normal mt-2 md:mt-0">
          <Timer className="text-primary mr-2 size-6 md:size-5" />
          {formatTime(timer)}{" "}
          {interviewDurationRef.current > 0 &&
            `/ ${formatTime(interviewDurationRef.current)}`}
        </span>
      </h2>
      {interviewInfo ? (
        !interviewEnded && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-10">
            <div className="flex flex-col gap-3 items-center justify-center border rounded-lg bg-white p-7 py-20 md:py-40">
              <div className="relative">
                {activeUser === false && (
                  <span className="absolute insert-0 bg-blue-500 rounded-full animate-ping size-20" />
                )}
                <Image
                  src="/ai.jpg"
                  alt="Interviewer"
                  width={100}
                  height={100}
                  className="rounded-full w-20 h-20 object-cover"
                />
              </div>
              <h2 className="text-lg font-bold mt-3">AI Interviewer</h2>
            </div>

            <div className="flex flex-col gap-3 items-center justify-center border rounded-lg bg-white p-7 py-20 md:py-40">
              <div className="relative">
                {activeUser === true ? (
                  <span className="absolute insert-0 bg-blue-500 rounded-full animate-ping size-20" />
                ) : null}
                <h2 className="text-3xl font-bold bg-primary text-white rounded-full w-20 h-20 flex items-center justify-center">
                  {interviewInfo?.userName?.[0]?.toUpperCase() || "U"}
                </h2>
              </div>
              <h2 className="text-lg font-bold mt-3">
                {interviewInfo?.userName || "User"}
              </h2>
            </div>
          </div>
        )
      ) : (
        <div className="flex flex-col gap-3 items-center justify-center border rounded-lg bg-white p-7 py-20 md:py-40">
          <h2 className="text-lg font-bold mt-3">Interview Not Found</h2>
        </div>
      )}

      {!interviewEnded ? (
        <>
          <div className="flex justify-center items-center mt-10">
            <Mic className="size-12 bg-gray-500 text-white rounded-full p-3 cursor-pointer" />
            <AlertConfirmation stopInterview={stopInterview}>
              <Phone className="size-12 bg-red-500 rounded-full p-3 ml-5 cursor-pointer" />
            </AlertConfirmation>
          </div>
          <p className="text-center text-gray-500 mt-5 font-normal">
            Interview in progress... <br /> Please wait for the interview to
            finish.
          </p>
        </>
      ) : (
        <div className="mt-6 flex justify-center">
          {!feedback && (
            <button
              onClick={GenerateFeedback}
              disabled={isLoading}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Generating...
                </>
              ) : (
                <>Generate Feedback</>
              )}
            </button>
          )}
        </div>
      )}

      <FeedbackDisplay feedback={feedback} isLoading={isLoading} />
    </div>
  );
};

export default LiveInterview;
