"use client";
import { useUser } from "@/app/provider";
import Image from "next/image";
import React from "react";

const WelcomeContainer = () => {
  const { user } = useUser();
  return (
    <div className="bg-white shadow-md rounded-lg p-2 flex  items-center justify-between w-full ">
      <div className=" flex flex-col items-start justify-center">
        <h1 className="text-3xl font-bold">🎙️ Welcome back, {user?.name}</h1>
        <p className="text-lg">
          This is your NextInterview.ai dashboard — manage your sessions, track
          your progress, and sharpen your interview skills.
        </p>
      </div>
      {user && (
        <Image
          src={user?.picture}
          alt="User Picture"
          width={80}
          height={80}
          className="rounded-full "
        />
      )}
    </div>
  );
};

export default WelcomeContainer;
