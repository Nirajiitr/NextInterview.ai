import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const InterviewHeader = () => {
  const router = useRouter();
  return (
    <div className="p-2 shadow-sm w-full flex justify-between items-center bg-white">
        <div className="h-10 w-48 m-2 ">
            <Image
            src="/logo.png"
            alt="logo"
            width={192}
            height={40}
            className="w-full h-full object-cover rounded-3xl"
            />
        </div>
        <Button onClick={() => router.push("/")} className="cursor-pointer">Home</Button>
    </div>
  );
};

export default InterviewHeader;
