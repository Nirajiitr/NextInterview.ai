import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, BadgeCheck, Clock, Copy, List, Plus } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const InterviewLink = ({ interviewId, formData, questionList }) => {
  
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/interview/" + interviewId;
  const GetInterviewUrl = () => {
    return url;
  };
  useEffect(() => {
    GetInterviewUrl();
  },[])
  const onCopyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copied to clipboard!");
    });
  }
  const handleShare = () => {
    const url = process.env.NEXT_PUBLIC_HOST_URL+`/interview/${interviewId}`
    if (navigator.share) {
        navigator.share({
            title: 'Interview Link',
            text: 'Join the interview',
            url: url,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
        
        toast.error('Your browser does not support sharing')
    }

}
  return (
    <div className="flex flex-col gap-5 bg-white p-5 rounded-xl border border-gray-400">
      <div className="flex justify-center items-center gap-2">
        <BadgeCheck className="text-green-500 size-40" />
      </div>
      <h2 className="text-center font-bold text-2xl">
        Interview Created Successfully!
      </h2>
      <p className="text-center">
        Your interview link is ready to be shared with your candidates.
      </p>

      <div className="w-full p-7 mt-6 rounded-xl bg-green-50 border border-gray-400 ">
        <div className="flex justify-between items-center">
          <h2 className=" font-bold">Interview Link</h2>
          <h2 className="p-2 px-4 text-primary bg-white rounded-xl">
            Valid for 30 Days
          </h2>
        </div>
        <div className="mt-3 flex justify-between items-center gap-2">
          <Input
            defaultValue={GetInterviewUrl()}
            disabled={true}
            className="bg-white "
          />
          <Button onClick={() => onCopyLink() } className="bg-blue-500 text-white hover:bg-blue-600 hover:cursor-pointer">
            <Copy /> Copy Link
          </Button>
        </div>
        <hr className="my-7 " />
        <div className="flex gap-5 items-center ">
          <h2 className="text-sm text-gray-500 flex gap-2 items-center">
            <Clock /> {formData?.interviewDuration} mins
          </h2>
          <h2 className="text-sm text-gray-500 flex gap-2 items-center">
            <List />{questionList?.length} Questions
          </h2>
        </div>
      </div>
      <div className="mt-7 bg-blue-50 p-5 rounded-xl border border-gray-400">
        <h2 className="font-bold">Share Via</h2>
        <div className="flex gap-5 mt-3 flex-wrap justify-between items-center">
          <Button onClick={handleShare} className=" bg-blue-500 text-white hover:bg-blue-600 cursor-pointer">
            Share Option
          </Button>
          
          <Button className=" bg-blue-500 text-white hover:bg-blue-600 cursor-pointer">
            Copy Link
          </Button>
        </div>
      </div>
      <div className="flex gap-5 justify-between items-center mt-7">
        <Link href={"/dashboard"}>
        <Button variant={"outline"} > <ArrowLeft /> Back to Dashboard</Button>
        </Link>
        <Link href={"create-interview" }>
        <Button disabled={true} className={"outline "}><Plus/> Create New Interview</Button>

        </Link>
      </div>
    </div>
  );
};

export default InterviewLink;
