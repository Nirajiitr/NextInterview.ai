
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Circle,
  CheckCircle2,
  XCircle,
  BookOpen,
  BookText,
  Award,
  ArrowUpRight,
} from "lucide-react";

const FeedbackDisplay = ({ feedback, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full mt-10 p-8 border rounded-lg bg-white">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
        <p className="text-center text-gray-500 mt-4">
          Generating comprehensive feedback...
        </p>
      </div>
    );
  }

  if (!feedback) return null;

  
  const renderScore = (score) => {
    let color = "text-red-500";
    if (score >= 8) color = "text-green-500";
    else if (score >= 6) color = "text-yellow-500";
    
    return <span className={`text-xl font-bold ${color}`}>{score}/10</span>;
  };

  return (
    <div className="w-full mt-10 p-6 border rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 border-b pb-4 flex items-center">
        <Award className="mr-2 text-primary" />
        Interview Performance Summary
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 border rounded-lg flex flex-col items-center justify-center">
          <span className="text-gray-500 mb-1">Overall Score</span>
          {renderScore(feedback.overallScore)}
        </div>
        <div className="p-4 border rounded-lg flex flex-col items-center justify-center">
          <span className="text-gray-500 mb-1">Technical Knowledge</span>
          {renderScore(feedback.technicalAssessment.technicalKnowledge)}
        </div>
        <div className="p-4 border rounded-lg flex flex-col items-center justify-center">
          <span className="text-gray-500 mb-1">Communication</span>
          {renderScore(feedback.technicalAssessment.communication)}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3 flex items-center">
          <BookText className="mr-2 text-primary" /> Summary
        </h3>
        <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{feedback.summary}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-xl font-semibold mb-3 flex items-center">
            <CheckCircle2 className="mr-2 text-green-500" /> Strengths
          </h3>
          <ul className="space-y-2 bg-gray-50 p-4 rounded-lg">
            {feedback.strengths.map((strength, idx) => (
              <li key={idx} className="flex items-start">
                <Circle className="mr-2 text-green-500 size-5 mt-1" />
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-3 flex items-center">
            <XCircle className="mr-2 text-yellow-500" /> Areas To Improve
          </h3>
          <ul className="space-y-2 bg-gray-50 p-4 rounded-lg">
            {feedback.areasToImprove.map((area, idx) => (
              <li key={idx} className="flex items-start">
                <Circle className="mr-2 text-yellow-500 size-5 mt-1" />
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3 flex items-center">
          <BookOpen className="mr-2 text-primary" /> Question Analysis
        </h3>
        <ScrollArea className="h-64 bg-gray-50 rounded-lg p-4">
          {feedback.questionAnalysis.map((item, idx) => (
            <div key={idx} className="mb-6 border-b pb-4 last:border-0">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">{item.question}</h4>
                {renderScore(item.responseQuality)}
              </div>
              <p className="text-gray-700">{item.feedback}</p>
            </div>
          ))}
        </ScrollArea>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-3 flex items-center">
          <ArrowUpRight className="mr-2 text-blue-500" /> Recommendations
        </h3>
        <ul className="space-y-2 bg-gray-50 p-4 rounded-lg">
          {feedback.recommendations.map((rec, idx) => (
            <li key={idx} className="flex items-start">
              <Circle className="mr-2 text-blue-500 size-5 mt-1" />
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeedbackDisplay;