import { NextRequest, NextResponse } from "next/server";
import { queryGemini, ChatMessage } from "@/lib/gemini";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = body.messages || [];

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    const reply = await queryGemini(messages);

    // Check if user provided contact details or asked for manager escalation
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const hasPhone = /\b\d{10}\b|\b\+91\d{10}\b|\b\d{5}\s*\d{5}\b/.test(lastUserMessage);
    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(lastUserMessage);
    const wantsManager = /manager|speak|talk|call me|human|complaint|director|urgent|hire|quote/i.test(lastUserMessage);

    const leadCaptured = hasPhone || hasEmail || (wantsManager && lastUserMessage.length > 15);
    const leadReference = leadCaptured ? `JSM-CHAT-${Date.now().toString().slice(-4)}` : undefined;

    // Dispatch background email notification if lead/manager request captured
    if (leadCaptured && (hasPhone || hasEmail)) {
      sendChatLeadEmail({
        reference: leadReference || "JSM-CHAT-LEAD",
        userQuery: lastUserMessage,
        fullConversation: messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join("\n\n")
      }).catch(err => console.error("Chat lead email error:", err));
    }

    return NextResponse.json({
      reply,
      leadCaptured,
      leadReference
    });
  } catch (error) {
    console.error("AI Assistant API Error:", error);
    return NextResponse.json(
      { 
        reply: "Thank you for reaching out to **JSM Integrated Services**! Our Managing Director **Sweety R** and operations desk are available.\n\n• **Email**: jsmintegratedservices@outlook.com\n• **Website**: jsmintegratedservices.in\n\nPlease share your requirement and email here so our manager can reach out to you." 
      }, 
      { status: 200 }
    );
  }
}

async function sendChatLeadEmail({ reference, userQuery, fullConversation }: { reference: string; userQuery: string; fullConversation: string }) {
  const outlookEmail = process.env.OUTLOOK_EMAIL || 'jsmintegratedservices@outlook.com';
  const outlookPassword = process.env.OUTLOOK_PASSWORD || 'Jsm@2026';
  const targetRecipient = process.env.CONTACT_NOTIFICATION_EMAIL || 'jsmintegratedservices@outlook.com';

  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: outlookEmail,
      pass: outlookPassword,
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `"JSM Operations Live Alert" <${outlookEmail}>`,
    to: targetRecipient,
    replyTo: outlookEmail,
    subject: `🚨 Live Chat Lead Captured [${reference}] - JSM Integrated Services`,
    text: `New Lead Captured via Priya Operations Desk\n\nReference: ${reference}\nLatest Query: ${userQuery}\n\nFull Conversation Log:\n${fullConversation}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #fbf9f4; padding: 24px; color: #111;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 16px; border: 1px solid #e4e2dd; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
          <div style="background: #000; color: #fff; padding: 20px 24px; border-bottom: 3px solid #C5A880;">
            <h2 style="margin: 0; font-size: 18px;">🚨 Live Chat Lead &amp; Manager Alert</h2>
            <p style="margin: 4px 0 0 0; color: #C5A880; font-size: 12px; font-weight: 700; text-transform: uppercase;">Reference: ${reference}</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 14px; font-weight: 700; color: #000;">User Query / Phone Details:</p>
            <div style="background: #fbf9f4; border-left: 3px solid #000; padding: 12px 16px; border-radius: 8px; font-size: 13px; font-weight: 600;">
              ${userQuery}
            </div>
            <p style="font-size: 12px; color: #666; margin-top: 20px;">Full Chat Conversation:</p>
            <pre style="background: #f4f4f5; padding: 12px; border-radius: 8px; font-size: 11px; white-space: pre-wrap; font-family: monospace;">${fullConversation}</pre>
          </div>
          <div style="background: #f4f4f5; padding: 16px 24px; text-align: center; font-size: 11px; color: #777;">
            JSM Integrated Services • 24/7 Operations Desk
          </div>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
