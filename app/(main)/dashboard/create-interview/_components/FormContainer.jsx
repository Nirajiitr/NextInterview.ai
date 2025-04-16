"use client";
import { InterviewTypes } from "@/app/services/Constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";

const FormContainer = ({onHandleInputChange, GoToNextStep}) => {
    const [interviewType, setInterviewType] = useState([]);
    useEffect(()=>{
        if(interviewType){
            onHandleInputChange("interviewType", interviewType)
        }
    },[interviewType])
    const handleInterviewType = (item) => {
        if (interviewType.includes(item)) {
            setInterviewType(interviewType.filter((type) => type !== item));
        } else {
            setInterviewType([...interviewType, item]);
        }
    };
   
  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      <div className="mt-5">
        <h2 className="text-sm font-medium">Job Position</h2>
        <Input
            onChange={(e) => onHandleInputChange("jobPosition", e.target.value)}
          type="text"
          placeholder="e.g. Frontend Developer"
          className="mt-2"
        />
      </div>
      <div className="mt-5">
        <h2 className="text-sm font-medium">Job Description</h2>
        <Textarea
          placeholder="e.g. We are looking for a Frontend Developer to join our team."
          className="mt-2 h-80"
            onChange={(e) => onHandleInputChange("jobDescription", e.target.value)}
        />
      </div>
      <div className="mt-5">
        <h2 className="text-sm font-medium">Interview Duration</h2>
        <Select onValueChange={(value) => onHandleInputChange("interviewDuration", value)}>
          <SelectTrigger className=" w-full mt-2">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5 min">5 minutes</SelectItem>
            <SelectItem value="30 min">30 minutes</SelectItem>
            <SelectItem value="60 min">60 minutes</SelectItem>
            <SelectItem value="120 min">120 minutes</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-5">
        <h2 className="text-sm font-medium">Interview Type</h2>
        <div className="flex items-center flex-wrap justify-between mt-2">
          {InterviewTypes.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 p-2 px-4 border rounded-3xl cursor-pointer  ${
                interviewType.includes(item.title) ? "bg-blue-500 text-white" : "hover:bg-blue-100"}`}
              onClick={()=>handleInterviewType(item.title)}
            >
              <item.icon className="size-5" />
              <p className="text-sm font-medium">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 flex justify-end">
       <Button onClick={GoToNextStep} >Generate Question <ArrowRight /></Button>
      </div>
    </div>
  );
};

export default FormContainer;
