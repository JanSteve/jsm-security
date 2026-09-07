import { NextRequest, NextResponse } from "next/server";
import { queryReceptionistAI, ChatMessage } from "@/lib/gemini";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = body.messages || [];
    const lang: string = body.lang || "en";

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    const rawReply = await queryReceptionistAI(messages, { lang });

    // Check if user or Priya generated an appointment booking dossier
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const hasPhone = /\b\d{10}\b|\b\+91\d{10}\b|\b\d{5}\s*\d{5}\b/.test(lastUserMessage);
    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(lastUserMessage);
    const appointmentKeyword = /appointment|meet md|meet sweety|meeting with md|schedule|time slot|discuss contract/i.test(lastUserMessage);
    
    // Check structured tag from Priya
    const apptTagMatch = rawReply.match(/\[APPOINTMENT_REQUEST:\s*(.*?)\]/i);
    const isAppointment = Boolean(apptTagMatch) || (appointmentKeyword && (hasPhone || hasEmail));
    const appointmentRef = isAppointment ? `JSM-APPT-${Date.now().toString().slice(-4)}` : undefined;

    const leadCaptured = hasPhone || hasEmail || isAppointment;
    const leadReference = appointmentRef || (leadCaptured ? `JSM-CHAT-${Date.now().toString().slice(-4)}` : undefined);

    // Clean reply of structured tag for presentation
    let cleanReply = rawReply.replace(/\[APPOINTMENT_REQUEST:\s*.*?\]/gi, "").trim();

    // If appointment is confirmed, ensure reference ID is mentioned nicely
    if (isAppointment && appointmentRef && !cleanReply.includes(appointmentRef)) {
      cleanReply += `\n\n📌 **Official Appointment Reference: #${appointmentRef}**\n*Our Executive Secretariat has logged this dossier for Managing Director Sweety J.*`;
    }

    const fullConversation = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join("\n\n");

    // 1. Dispatch Appointment Notification Email if appointment detected
    if (isAppointment) {
      sendAppointmentEmail({
        reference: appointmentRef!,
        details: apptTagMatch ? apptTagMatch[1] : `User Query: ${lastUserMessage}`,
        userQuery: lastUserMessage,
        fullConversation
      }).catch(err => console.error("Appointment email error:", err));
    } else if (leadCaptured && (hasPhone || hasEmail)) {
      // 2. Dispatch Standard Lead Notification Email
      sendChatLeadEmail({
        reference: leadReference || "JSM-CHAT-LEAD",
        userQuery: lastUserMessage,
        fullConversation
      }).catch(err => console.error("Chat lead email error:", err));
    }

    return NextResponse.json({
      reply: cleanReply,
      isAppointment,
      appointmentReference: appointmentRef,
      leadCaptured,
      leadReference
    });
  } catch (error) {
    console.error("AI Assistant API Error:", error);
    return NextResponse.json(
      { 
        reply: "Thank you for contacting **JSM Integrated Services**! I am **Priya**, Senior Operations Officer and Executive Receptionist.\n\nOur Managing Director **Sweety J** and Head of Operations **Major AR Devadoss (Army-Veteran)** are available to assist you.\n\n• **Direct WhatsApp**: https://wa.me/919080863448\n• **Hotline**: +91 90808 63448\n• **Official Email**: contact@jsmintegratedservices.com\n\nPlease leave your name and contact number here so I can schedule an appointment or prepare your security proposal." 
      }, 
      { status: 200 }
    );
  }
}

async function sendAppointmentEmail({ reference, details, userQuery, fullConversation }: { reference: string; details: string; userQuery: string; fullConversation: string }) {
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
    from: `"JSM Executive Secretariat" <${outlookEmail}>`,
    to: targetRecipient,
    replyTo: outlookEmail,
    subject: `📅 URGENT APPOINTMENT REQUEST with MD / Leadership [Ref: ${reference}]`,
    text: `URGENT APPOINTMENT REQUEST\n\nReference: ${reference}\nDetails: ${details}\nLatest Message: ${userQuery}\n\nFull Conversation Log:\n${fullConversation}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #000; padding: 24px; color: #fff;">
        <div style="max-width: 650px; margin: 0 auto; background: #111; border-radius: 16px; border: 2px solid #10b981; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <div style="background: #000; color: #fff; padding: 24px; border-bottom: 2px solid #10b981;">
            <span style="background: #10b981; color: #000; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 12px; text-transform: uppercase;">
              Action Required &bull; MD Appointment
            </span>
            <h2 style="margin: 12px 0 4px 0; font-size: 22px; font-weight: 900; color: #fff;">
              Official Appointment Request with MD / Leadership
            </h2>
            <p style="margin: 0; color: #10b981; font-size: 13px; font-family: monospace; font-weight: 700;">
              Dossier Reference: #${reference}
            </p>
          </div>
          <div style="padding: 24px; background: #141414;">
            <p style="font-size: 14px; font-weight: 700; color: #10b981; margin: 0 0 8px 0; text-transform: uppercase; font-family: monospace;">
              Appointment Specifications:
            </p>
            <div style="background: #1f1f1f; border-left: 4px solid #10b981; padding: 16px; border-radius: 8px; font-size: 14px; font-weight: 600; color: #fff; line-height: 1.6;">
              ${details}
            </div>

            <p style="font-size: 13px; font-weight: 700; color: #aaa; margin: 20px 0 8px 0; text-transform: uppercase; font-family: monospace;">
              Latest User Query:
            </p>
            <div style="background: #1f1f1f; padding: 12px 16px; border-radius: 8px; font-size: 13px; color: #e5e5e5;">
              ${userQuery}
            </div>

            <p style="font-size: 12px; color: #888; margin: 24px 0 8px 0; text-transform: uppercase; font-family: monospace;">
              Full Front-Desk Transcript:
            </p>
            <pre style="background: #0a0a0a; border: 1px solid #262626; color: #10b981; padding: 14px; border-radius: 8px; font-size: 11px; white-space: pre-wrap; font-family: monospace; max-height: 350px; overflow-y: auto;">${fullConversation}</pre>
          </div>
          <div style="background: #000; padding: 18px 24px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #222;">
            JSM Integrated Services &bull; Central Command HQ, Trichy &bull; +91 90808 63448
          </div>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
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
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f7; padding: 24px; color: #1d1d1f;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 16px; border: 1px solid #e5e5ea; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
          <div style="background: #1d1d1f; color: #fff; padding: 20px 24px; border-bottom: 3px solid #0071e3;">
            <h2 style="margin: 0; font-size: 18px;">🚨 Live Chat Lead &amp; Manager Alert</h2>
            <p style="margin: 4px 0 0 0; color: #0071e3; font-size: 12px; font-weight: 700; text-transform: uppercase;">Reference: ${reference}</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 14px; font-weight: 700; color: #000;">User Query / Phone Details:</p>
            <div style="background: #f5f5f7; border-left: 3px solid #0071e3; padding: 12px 16px; border-radius: 8px; font-size: 13px; font-weight: 600;">
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

