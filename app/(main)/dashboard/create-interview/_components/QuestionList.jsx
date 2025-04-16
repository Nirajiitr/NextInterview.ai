import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import QuestionListContainer from "./QuestionListContainer";
import { supabase } from "@/app/services/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@/app/provider";
const QuestionList = ({ formData, onCreateLink,questionList, setQuestionList }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const [saveLoading, setSaveLoading] = useState(false);
  const { user } = useUser();
  const hasGeneratedRef = useRef(false);
  const GenerateQuestionList = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/ai-model", {
        ...formData,
      });
       
     
      
      const data = JSON.parse(response.data.data);
      setQuestionList(data?.interviewQuestions);
      

      toast.success("Questions generated successfully!");
    } catch (error) {
      toast.error("server error, try again");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (formData && !hasGeneratedRef.current) {
      hasGeneratedRef.current = true;
      GenerateQuestionList();
     
    }
  }, [formData]);

  const onFinish = async () => {
    const interview_id = uuidv4();
    if (questionList.length === 0) {
      toast.error("Please generate questions first!");
      return;
    }
    try {
      setSaveLoading(true);
      const { data, error } = await supabase
        .from("interviews")
        .insert([
          {
            ...formData,
            questionList,
            interview_id,
            userEmail: user?.email,
          },
        ])
        .select();
       
      toast.success("Interview created successfully!");
      onCreateLink(interview_id);
    } catch (error) {
      toast.error("Error creating interview, try again!");
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div>
      {isLoading && (
        <div className="p-5 bg-blue-50 rounded-xl border border-gray-400 flex items-center gap-2">
          <Loader2Icon className="animate-spin text-blue-500" size={24} />
          <div>
            <p className="text-blue-500">Generating Questions...</p>
            <p className="text-blue-500">Please wait...</p>
          </div>
        </div>
      )}
      {questionList.length > 0 && (
        <QuestionListContainer questionList={questionList} />
      )}
      <div className="flex justify-end my-10">
        <Button
          onClick={onFinish}
          className="hover:cursor-pointer"
          disabled={saveLoading}
        >
          {saveLoading ? (
            <Loader2Icon className="animate-spin text-white" size={20} />
          ) : (
            "Create Interview Link & Finish"
          )}
        </Button>
      </div>
    </div>
  );
};

export default QuestionList;
