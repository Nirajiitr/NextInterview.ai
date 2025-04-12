"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CreateInterview = () => {
  const router = useRouter();
  return (
    <div className="mt-10 px-10 md:px24 lg:px-44 xl:px-56">
      <div className="flex items-center gap-5">
        <ArrowLeft onClick={() => router.back()} className="mr-2 size-8" />
        <h2 className="font-bold text-2xl"> Create New Interview </h2>
      </div>
    </div>
  );
};

export default CreateInterview;
