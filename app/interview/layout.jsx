"use client";
import React, { useState } from "react";
import { InterviewDataContext } from "../context/InterviewDataContext";
import InterviewHeader from "./_components/InterviewHeader";

const InterviewLayout = ({ children }) => {
  const [interviewInfo, setInterviewInfo] = useState(null);
  return (
    <InterviewDataContext.Provider value={{ interviewInfo, setInterviewInfo }}>
      <div className="bg-secondary">
        <InterviewHeader />
        {children}
      </div>
    </InterviewDataContext.Provider>
  );
};

export default InterviewLayout;
