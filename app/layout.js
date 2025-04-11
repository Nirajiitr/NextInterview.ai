import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NextInterview.ai — Your AI-Powered Voice Interviewer",
  description: "NextInterview.ai is a smart, voice-enabled AI agent built to simulate real interview experiences. Whether you're preparing for your next big opportunity or building tools for smarter hiring, our platform offers realistic, conversational practice sessions powered by cutting-edge voice AI.",
  keywords: "AI, voice interview, interview preparation, hiring tools, voice AI, NextInterview.ai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
