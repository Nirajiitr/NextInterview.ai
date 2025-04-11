"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { supabase } from "../services/supabaseClient";

const Page = () => {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) {
      console.error("Error signing in with Google:", error.message);
    }
    
  };
  return (
    <div className=" w-screen h-screen overflow-hidden flex flex-col justify-center">
      <div className="h-10 w-48 m-2">
        <img src="/logo.png" alt="logo" className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold mb-4">Welcome to NextInterview.ai</h1>
        <p className="text-lg mb-8">Please sign in to continue</p>
        <div className="flex items-center justify-center space-x-4 border-2 border-gray-300 rounded-lg p-4">
          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign In
          </Button>
          <span className=" text-gray-600">or</span>

          <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ">
            Sign Up
          </Button>
        </div>

        <span className="my-4 text-gray-600">or</span>
        <Button
          onClick={signInWithGoogle}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default Page;
