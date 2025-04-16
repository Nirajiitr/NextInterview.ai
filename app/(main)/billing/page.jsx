"use client"
import React from "react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const SubscriptionBilling = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  
  const plans = [
    {
      name: "Free Plan",
      price: "Free",
      interval: "month",
      description: "Start your interview journey at no cost",
      features: [
        "1 AI interview per month",
        "Basic feedback",
        "Limited question set",
        "Email support",
        "Access to interview history"
      ]
    },
    {
      name: "Starter Plan",
      price: "$9",
      interval: "month",
      description: "Ideal for job seekers preparing occasionally",
      features: [
        "5 AI interviews per month",
        "Standard feedback with ratings",
        "Access to common question bank",
        "Email + Chat support",
        "Resume tips & suggestions"
      ]
    },
    {
      name: "Pro Plan",
      price: "$19",
      interval: "month",
      description: "Best for active job seekers and professionals",
      features: [
        "Unlimited AI interviews",
        "Detailed AI feedback with suggestions",
        "Customizable interview difficulty",
        "Priority support",
        "Practice with behavioral & technical rounds"
      ]
    }
    
  ];
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Subscription Plans</h1>
          <p className="text-lg text-gray-600">
            Choose a subscription plan that fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`flex flex-col border-2 transition-all ${
                selectedPlan === index ? "border-blue-500 shadow-lg" : "border-gray-200"
              }`}
            >
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  {index === 1 && <Badge className="bg-blue-500">Popular</Badge>}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">/{plan.interval}</span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check size={16} className="text-green-500 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={selectedPlan === index ? "default" : "outline"}
                  onClick={() => setSelectedPlan(index)}
                >
                  {selectedPlan === index ? "Selected" : "Subscribe"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionBilling;