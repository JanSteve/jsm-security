import { NextRequest, NextResponse } from "next/server";
import { queryOpenRouter, ChatMessage } from "@/lib/openrouter";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = body.messages || [];

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    const reply = await queryOpenRouter(messages);

    // Simple heuristic to check if user provided contact details
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const hasPhone = /\b\d{10}\b|\b\+91\d{10}\b|\b\d{5}\s*\d{5}\b/.test(lastUserMessage);
    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(lastUserMessage);

    const leadCaptured = hasPhone || hasEmail;
    const leadReference = leadCaptured ? `JSM-LEAD-${Date.now().toString().slice(-4)}` : undefined;

    return NextResponse.json({
      reply,
      leadCaptured,
      leadReference
    });
  } catch (error) {
    console.error("AI Assistant API Error:", error);
    return NextResponse.json(
      { 
        reply: "Thank you for reaching out to JSM Integrated Services! We are ready to assist you. Please feel free to WhatsApp us directly at +91 94431 52000 or email jsmintegratedservices@outlook.com for immediate support." 
      }, 
      { status: 200 }
    );
  }
}
