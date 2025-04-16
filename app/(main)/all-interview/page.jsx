"use client";
import { useUser } from "@/app/provider";
import { supabase } from "@/app/services/supabaseClient";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import InterviewCard from "../dashboard/_components/InterviewCard";

const AllInterview = () => {
  const [interviewList, setInterviewList] = useState([]);
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    try {
      const { data: interviews, error } = await supabase
        .from("interviews")
        .select("*")
        .eq("userEmail", user?.email)
        .order("created_at", { ascending: false });

      if (error) {
        toast.error(error.message);
        setLoading(false);
      }
      if (interviews) {
        setInterviewList(interviews);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl ">All Previously Created Interviews</h2>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <span className="animate-spin ">
            {" "}
            <Loader2Icon />
          </span>
        </div>
      ) : (
          interviewList?.length ===0 && (
          <div className="flex flex-col gap-3  items-center bg-white p-5 rounded-lg shadow-md">
            <Video className="text-primary p-3 bg-blue-50 rounded-lg size-14" />
            <h2 className="font-bold text-xl">No Interviews Found!</h2>
            <Button
              className="bg-primary text-white px-5 py-2 rounded-lg cursor-pointer"
              onClick={() => router.push("/dashboard/create-interview")}
            >
              Create Interview
            </Button>
          </div>
        )
      )}
      {interviewList && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {interviewList.map((interview, index) => (
            <InterviewCard key={index} interview={interview} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllInterview;
