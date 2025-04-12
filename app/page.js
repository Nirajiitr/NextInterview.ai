"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


const Home = () => {
  const router = useRouter();
  return (
    <main className="flex h-screen flex-col items-center  p-2">
      <h1 className="text-4xl font-bold">Next Interview</h1>
      <p className="text-lg text-gray-600">
        Your AI-powered interview assistant
      </p>
      <div className="mt-8">
        <Button
          onClick={() => router.push("/auth")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Get Started
        </Button>
      </div>
    </main>
  );
};
export default Home;
