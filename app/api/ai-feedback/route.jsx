import { FEEDBACK_PROMPT } from "@/app/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";


const MODEL_PRIORITY = [
  "meta-llama/llama-4-maverick:free",
  "qwen/qwen2.5-vl-72b-instruct:free",
  "deepseek/deepseek-r1:free",
    "openrouter/optimus-alpha",
    "deepseek/deepseek-chat-v3-0324:free",
    "meta-llama/llama-3.1-8b-instruct:free", 
  ];
export const POST = async(req)=> {
 const { conversation } = await req.json();
  const FINAL_PROMPT = FEEDBACK_PROMPT.replace("{{conversation}}", conversation);
   
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.NEXT_OPENROUTER_API_KEY,
  });

  let rawContent = null;
  let lastError = null;

  for (const model of MODEL_PRIORITY) {
    try {
      console.log(`🧠 Trying model: ${model}`);
      const completion = await openai.chat.completions.create({
        model,
        messages: [{ role: "user", content: FINAL_PROMPT }],
      });

      if (
        completion &&
        completion.choices &&
        completion.choices[0]?.message?.content
      ) {
        rawContent = completion.choices[0].message.content;
        break; 
      }
    } catch (err) {
      console.warn(`❌ Failed model: ${model}`, err.message);
      lastError = err;
      continue;
    }
  }

  if (!rawContent) {
    return NextResponse.json(
      {
        data: null,
        status: false,
        message: "All models failed to generate feedback",
        error: lastError?.message || "Unknown error",
      },
      { status: 500 }
    );
  }


  const cleaned = rawContent.replace(/```json|```/g, "").trim();

  return NextResponse.json(
    {
      data: cleaned,
      status: true,
      message: "Feedback generated successfully",
    },
    { status: 200 }
  );
}
