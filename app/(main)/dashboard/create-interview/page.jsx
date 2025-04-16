"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Progress } from "@/components/ui/progress"
import FormContainer from "./_components/FormContainer";
import QuestionList from "./_components/QuestionList";
import toast from "react-hot-toast";
import InterviewLink from "./_components/InterviewLink";


const CreateInterview = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();
  const [interviewId, setInterviewId] = useState(null);
  const [questionList, setQuestionList] = useState([]);
  const onHandleInputChange = (field, value) => {
    setFormData((prev=>({...prev, [field]:value})))
  };
  
  const GoToNextStep = () => {
    if(formData.jobPosition && formData.jobDescription && formData.interviewDuration && formData.interviewType.length > 0){
      setStep(step + 1);
    }
    else{
      toast.error("Please fill all the fields")
    }
  };
  const onCreateLink = (interview_id) => {
    setStep(step + 1);
    setInterviewId(interview_id);
   
  }
  return (
    <div className="mt-10 px-10 md:px24 lg:px-44 xl:px-56 ">
      <div className="flex items-center gap-5">
        <ArrowLeft onClick={() => router.back()} className="mr-2 size-8 cursor-pointer" />
        <h2 className="font-bold text-2xl"> Create New Interview </h2>

      </div>
      <Progress value={step * 33.33} className="my-5" />
      {
        step === 1? <FormContainer onHandleInputChange={onHandleInputChange} GoToNextStep={GoToNextStep} /> 
        : step === 2 ? <QuestionList questionList={questionList} setQuestionList={setQuestionList}  formData ={formData} onCreateLink={(interview_id)=>onCreateLink(interview_id)}/> 
        : step === 3 ? <InterviewLink interviewId={interviewId} formData={formData} questionList={questionList} /> : null

      }
    </div>
  );
};

export default CreateInterview;
