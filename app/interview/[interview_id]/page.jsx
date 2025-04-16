"use client";
import React, { useContext, useEffect, useState } from "react";
import InterviewHeader from "../_components/interviewHeader";
import Image from "next/image";
import { Clock, Info, Loader2Icon, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/app/services/supabaseClient";
import { toast } from "react-hot-toast";
import { InterviewDataContext } from "@/app/context/InterviewDataContext";

const Interview = () => {
  const { interview_id } = useParams();
  const [interviewDetails, setInterviewDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchInterviewDetails = async () => {
      try {
        const { data, error } = await supabase
          .from("interviews")
          .select(`jobPosition, interviewType, interviewDuration`)
          .eq("interview_id", interview_id)
          .single();

        if (error) {
          throw error;
        }

        setInterviewDetails(data);
      } catch (error) {
        console.error("Error fetching interview details:", error.message);
        toast.error("invalid interview link");
      } finally {
        setLoading(false);
      }
    };

    fetchInterviewDetails();
  }, [interview_id]);

  const onStartInterview = async () => {
   
    if (userEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userEmail)) {
        toast.error("Please enter a valid email address");
        return;
      }
    }
    if (userName) {
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!nameRegex.test(userName)) {
        toast.error("Please enter a valid name");
        return;
      }
      }
      if(!userName || !userEmail){
        toast.error("Please fill all the fields");
        return;
      }
       
    setLoading(true);
    const { data, error } = await supabase
      .from("interviews")
      .select(`*`)
      .eq("interview_id", interview_id)
      .single();
    if (error) {
      loading(false);
      toast.error("Error fetching interview data");
      return;
    }
    const interviewData = data;
    setLoading(false);
    setInterviewInfo({
      ...interviewData,
      userName,
      userEmail,
    });
    router.push(`/interview/${interview_id}/start`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2Icon className="animate-spin text-primary" size={50} />
      </div>
    );
  }

  return (
    <div className="px-10 md:px-28 lg:px-48 xl:px-64 mt-16">
      <div className="flex justify-center border rounded-lg bg-white flex-col items-center p-7 lg:px-32 xl:px-52">
        <div className="h-10 w-48 m-2 ">
          <Image
            src="/logo.png"
            alt="logo"
            width={192}
            height={40}
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
        <h1 className="mt-3"> AI-Powered Interview Interview Platform</h1>
        <p className="text-center text-gray-500 mt-2">
          Get ready for your next interview with our AI-powered platform.
          Practice your skills and receive instant feedback to help you succeed.
          Start now!
        </p>
        <Image
          src="/interview.png"
          alt="interview"
          width={500}
          height={500}
          className=" object-cover rounded-3xl my-5"
        />
        <h2 className="font-bold text-xl">
          <span className="text-gray-500 font-normal">Position: </span>
          <span className="text-primary font-bold">
            {interviewDetails?.jobPosition}
          </span>
        </h2>
        <h2 className="flex gap-2 items-center text-gray-500 mt-3 ">
          <Clock size={20} /> {interviewDetails?.interviewDuration}.
        </h2>
        <div className="flex flex-col gap-2 mt-5 w-full">
          <h2>Enter your full name </h2>
          <Input
            type={"text"}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="e.g. Niraj Kumar"
          />
        </div>
        <div className="flex flex-col gap-2 mt-5 w-full">
          <h2>Enter your email address </h2>
          <Input
            type={"email"}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="e.g. example@gmail.com"
          />
        </div>
        <div className="bg-blue-50 p-5 mt-5 rounded-lg w-full">
          <h2 className="font-bold text-lg">Instructions</h2>
          <h2 className="font-bold text-lg mt-3 flex gap-2 items-center text-gray-500">
            <Info /> Before you begin:{" "}
          </h2>
          <ul>
            <li className="px-6">- Test your camera and microphone</li>
            <li className="px-6">- Find a quiet place</li>
            <li className="px-6">
              - Make sure you have a stable internet connection
            </li>
            <li className="px-6">- Be ready to answer questions</li>
            <li className="px-6">- Be yourself and relax</li>
          </ul>
        </div>
        <div className="flex justify-center mt-10">
          <Button
            disabled={!userName || loading}
            onClick={() => onStartInterview()}
            className="bg-primary hover:cursor-pointer text-white px-4 py-2 rounded-lg"
          >
            {loading ? (
              <Loader2Icon className="animate-spin text-white" size={20} />
            ) : (
              <Video size={20} className="mr-2" />
            )}
            Start Interview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Interview;
