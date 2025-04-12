"use client";
import { Phone, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CreateOptions = () => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 gap-4">
      <div onClick={()=>router.push("/dashboard/create-interview")} className="bg-white border border-gray-200 rounded-lg p-5 shadow-md flex items-center justify-start gap-5 cursor-pointer">
        <Video className="text-primary p-3 bg-blue-50 rounded-lg size-14" />
        <div className="flex flex-col gap-1">
          <h2 className="font-bold">Create New Interview</h2>
          <p className="text-gray-500">
            Create AI Interviews and schedule then with Candidates{" "}
          </p>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-md flex items-center justify-start gap-5">
        <Phone className="text-primary p-3 bg-blue-50 rounded-lg size-14" />
        <div className="flex flex-col gap-1">
          <h2 className="font-bold">Create Phone Screening Call</h2>
          <p className="text-gray-500">
             Schedule phone screening call with Candidates{" "}
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default CreateOptions;
