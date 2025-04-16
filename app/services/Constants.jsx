import { BriefcaseBusinessIcon, Calendar, Code2Icon, LayoutDashboard, List, Puzzle, Settings, User2Icon, Wallet } from "lucide-react";


export const SideBarOptions = [
{
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
},

{
    name: "All Interview",
    icon: List,
    path: "/all-interview",
},
{
    name: "Billing",
    icon: Wallet,
    path: "/billing",
},
{
    name: "Settings",
    icon: Settings,
    path: "/settings",
}

]
export const InterviewTypes=[
    {
        title: "Technical",
        icon: Code2Icon
    },
    {
        title: "Behavioral",
        icon:User2Icon
    },
    {
        title: "Experience",
        icon:BriefcaseBusinessIcon
    },
    {
        title: "Problem Solving",
        icon:Puzzle
    },
    {
        title: "Culture Fit",
        icon:LayoutDashboard
    },
    {
        title: "General",
        icon:List
    }
]
export const PROMPT = `
You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:

Job Title: {{jobTitle}}  
Job Description: {{jobDescription}}  
Interview Duration: {{duration}}  
Interview Type: {{type}}

📝 Your task:
1. Analyze the job description to identify key responsibilities, required skills, and expected experience.  
2. Generate a list of interview questions based on the interview duration.  
3. Adjust the number and depth of questions to match the interview time.  
4. Ensure the questions match the tone and structure of a real-life {{type}} interview.  

🧩 Format your response in **JSON format** with an array of questions.  
Format:
interviewQuestions = [
  {
    question: "",
    type: "Technical | Behavioral | Experience | Problem Solving | Culture Fit | General",
  },
  ...
]

🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.
`;


export const FEEDBACK_PROMPT = `
You are an expert technical interview assessor. Analyze the following interview conversation between an AI interviewer and a candidate, then provide detailed feedback in JSON format.

INTERVIEW CONVERSATION:
{{conversation}}

Please evaluate the interview and return a JSON object with the following structure:
{
  "overallScore": number (1-10),
  "summary": "Brief overall assessment of the candidate's performance",
  "strengths": [
    "Strength 1",
    "Strength 2",
    ...
  ],
  "areasToImprove": [
    "Area 1",
    "Area 2",
    ...
  ],
  "technicalAssessment": {
    "technicalKnowledge": number (1-10),
    "problemSolving": number (1-10),
    "communication": number (1-10)
  },
  "questionAnalysis": [
    {
      "question": "The question asked",
      "responseQuality": number (1-10),
      "feedback": "Specific feedback on this response"
    },
    ...
  ],
  "recommendations": [
    "Recommendation 1",
    "Recommendation 2",
    ...
  ]
}

Ensure your evaluation is fair, constructive, and based solely on the candidate's responses. Provide specific examples from the conversation to support your assessment. Focus on both technical accuracy and communication skills.
`;