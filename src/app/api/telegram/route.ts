import { NextRequest, NextResponse } from "next/server";

/**
 * Serverless Telegram Bot Webhook Handler: /api/telegram
 * 
 * Capabilities:
 * 1. 24/7 interactive lead capture for Employers and Candidates on Telegram.
 * 2. Group engagement: welcomes new members and responds when mentioned or commanded.
 * 3. Instant forwarding of candidate profiles and employer mandates to JSM Admin chat.
 * 4. Zero external dependencies (uses native fetch to communicate with Telegram API).
 */

const TELEGRAM_API = "https://api.telegram.org";

interface TelegramUser {
  id: number;
  is_bot?: boolean;
  first_name?: string;
  last_name?: string;
  username?: string;
}

interface TelegramChat {
  id: number;
  type: "private" | "group" | "supergroup" | "channel";
  title?: string;
  username?: string;
}

interface TelegramMessage {
  message_id: number;
  from?: TelegramUser;
  chat: TelegramChat;
  text?: string;
  new_chat_members?: TelegramUser[];
}

interface TelegramCallbackQuery {
  id: string;
  from: TelegramUser;
  message?: TelegramMessage;
  data?: string;
}

interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
  callback_query?: TelegramCallbackQuery;
}

/**
 * Helper: Sends message via Telegram Bot API
 */
async function sendTelegramMessage(
  token: string,
  chatId: number | string,
  text: string,
  replyMarkup?: unknown
) {
  try {
    await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
        reply_markup: replyMarkup,
      }),
    });
  } catch (err) {
    console.error("Failed to send Telegram message:", err);
  }
}

/**
 * Helper: Answers callback query to stop loading spinner on buttons
 */
async function answerCallbackQuery(token: string, callbackQueryId: string, text?: string) {
  try {
    await fetch(`${TELEGRAM_API}/bot${token}/answerCallbackQuery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        callback_query_id: callbackQueryId,
        text,
      }),
    });
  } catch (err) {
    console.error("Failed to answer callback query:", err);
  }
}

/**
 * Main Interactive Keyboard
 */
function getMainKeyboard() {
  return {
    inline_keyboard: [
      [
        { text: "💼 Hire Senior Talent", callback_data: "cmd_hire" },
        { text: "📄 Submit Profile", callback_data: "cmd_candidate" },
      ],
      [
        { text: "💰 Fee Model & Guarantee", callback_data: "cmd_fees" },
        { text: "📍 Focus States", callback_data: "cmd_states" },
      ],
      [
        { text: "🌐 Visit Website", url: "https://www.jsmintegratedservices.com" },
        { text: "📞 Call +91 90808 63448", url: "https://wa.me/919080863448?text=Hello%20JSM%20Talent%20Desk" },
      ],
    ],
  };
}

export async function GET() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  return NextResponse.json({
    status: "active",
    bot: "JSM Executive Talent Bot",
    configured: Boolean(token),
    webhookEndpoint: "https://www.jsmintegratedservices.com/api/telegram",
  });
}

export async function POST(req: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const adminChatId = process.env.TELEGRAM_CHAT_ID;

  if (!token) {
    return NextResponse.json(
      { error: "TELEGRAM_BOT_TOKEN is not configured" },
      { status: 500 }
    );
  }

  let update: TelegramUpdate;
  try {
    update = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  // 1. Handle Inline Button Clicks (Callback Queries)
  if (update.callback_query) {
    const cb = update.callback_query;
    const chatId = cb.message?.chat.id;
    const data = cb.data;

    await answerCallbackQuery(token, cb.id);

    if (chatId) {
      if (data === "cmd_hire") {
        await sendTelegramMessage(
          token,
          chatId,
          `*💼 Hire Executive & Senior Talent (₹12 LPA to ₹1 Cr)*\n\n` +
          `JSM operates as a pure mediator on a *100% contingency success model*:\n` +
          `• *Zero Upfront Retainers* — Pay only when your candidate joins\n` +
          `• *3 Vetted Finalists* delivered within 7 business days\n` +
          `• *90-Day Free Replacement Guarantee*\n\n` +
          `To initiate a search mandate, please reply directly with:\n` +
          `1. Your Name & Company\n` +
          `2. Target Role & Compensation Band (e.g., ₹25L–₹50L)\n` +
          `3. Location / State\n` +
          `4. Phone number or email\n\n` +
          `_Our executive recruitment desk will connect with you within 24 business hours._`
        );
      } else if (data === "cmd_candidate") {
        await sendTelegramMessage(
          token,
          chatId,
          `*📄 Submit Senior Candidate Profile*\n\n` +
          `We place senior professionals (₹12 LPA to ₹1 Cr) across South and West India in confidential roles.\n\n` +
          `To submit your profile for confidential leadership mandates, reply with:\n` +
          `1. Your Full Name\n` +
          `2. Current Designation & Industry\n` +
          `3. Total Years of Experience\n` +
          `4. Current & Expected CTC\n` +
          `5. Preferred States (TN, KA, MH, DL, MP, GJ)\n` +
          `6. Mobile number / LinkedIn URL\n\n` +
          `_All submissions are treated with strict executive confidentiality._`
        );
      } else if (data === "cmd_fees") {
        await sendTelegramMessage(
          token,
          chatId,
          `*💰 JSM Commercial Fee Architecture*\n\n` +
          `• *Upfront Advance:* ₹0 (Zero upfront exposure)\n` +
          `• *Contingency Placement Fee:* Standard corporate percentage invoiced strictly on candidate Day 1 onboarding\n` +
          `• *Payment Terms:* Net 15 days credit\n` +
          `• *Replacement Assurance:* 90-day free candidate replacement warranty\n\n` +
          `Simulate fees on our interactive calculator:\n` +
          `👉 https://www.jsmintegratedservices.com/#fee-calculator`
        );
      } else if (data === "cmd_states") {
        await sendTelegramMessage(
          token,
          chatId,
          `*📍 Active Practice Footprint (6 Focus States)*\n\n` +
          `1. *Tamil Nadu* — Central Command HQ (Chennai, Coimbatore, Trichy, Hosur)\n` +
          `2. *Karnataka* — Bengaluru Tech & Manufacturing Corridor\n` +
          `3. *Maharashtra* — Mumbai BFSI & Pune Automotive Hub\n` +
          `4. *Delhi NCR* — Enterprise SaaS & Corporate Headquarters\n` +
          `5. *Gujarat* — Ahmedabad & Vadodara Industrial Belt\n` +
          `6. *Madhya Pradesh* — Indore & Pithampur Industrial Corridor\n\n` +
          `👉 https://www.jsmintegratedservices.com/#roles`
        );
      }
    }

    return NextResponse.json({ ok: true });
  }

  // 2. Handle Incoming Messages (Private chat or Group)
  const message = update.message;
  if (!message) {
    return NextResponse.json({ ok: true });
  }

  const chatId = message.chat.id;
  const chatType = message.chat.type;
  const text = message.text?.trim() || "";
  const sender = message.from;
  const senderName = [sender?.first_name, sender?.last_name].filter(Boolean).join(" ") || "User";
  const senderUsername = sender?.username ? `@${sender.username}` : `ID: ${sender?.id}`;

  // Handle New Members Joining a Group where the bot is present
  if (message.new_chat_members && message.new_chat_members.length > 0) {
    for (const newMember of message.new_chat_members) {
      if (newMember.is_bot) continue;
      const welcomeName = newMember.first_name || "there";
      await sendTelegramMessage(
        token,
        chatId,
        `👋 Welcome ${welcomeName} to the group!\n\n` +
        `This community is supported by *JSM Integrated Services* — Executive Talent Mediator for ₹12 LPA to ₹1 Cr leadership roles across South and West India.\n\n` +
        `Looking to hire senior talent or explore leadership opportunities? Click below to connect with our desk directly:`,
        getMainKeyboard()
      );
    }
    return NextResponse.json({ ok: true });
  }

  // Handle /start or greeting commands
  if (text.startsWith("/start") || text.toLowerCase() === "hi" || text.toLowerCase() === "hello") {
    await sendTelegramMessage(
      token,
      chatId,
      `🎯 *Welcome to JSM Integrated Services Executive Desk*\n\n` +
      `We act as the confidential talent mediator between leading enterprises and proven senior leadership talent (*₹12 LPA to ₹1 Cr*) across Tamil Nadu, Karnataka, Maharashtra, Delhi, Madhya Pradesh, and Gujarat.\n\n` +
      `*Our Core Guarantees:*\n` +
      `✅ *Zero Upfront Retainers* (100% Contingency Success Model)\n` +
      `✅ *Vetted Finalists in 7 Days*\n` +
      `✅ *90-Day Free Replacement Policy*\n\n` +
      `How can our executive recruitment desk assist you today?`,
      getMainKeyboard()
    );
    return NextResponse.json({ ok: true });
  }

  // Handle /hire command
  if (text.startsWith("/hire")) {
    await sendTelegramMessage(
      token,
      chatId,
      `*💼 Executive Search & Senior Hiring Intake*\n\nPlease reply with your requirement (Company, Target Role Band, Location, Phone Number) and our desk will contact you within 24 hours.`
    );
    return NextResponse.json({ ok: true });
  }

  // Handle /roles or /bands command
  if (text.startsWith("/roles") || text.startsWith("/bands")) {
    await sendTelegramMessage(
      token,
      chatId,
      `*🎯 Roles & Compensation Horizons Mediated by JSM:*\n\n` +
      `1. *Mid-Senior Leadership (₹12L – ₹25L)*\n` +
      `   Plant & Operations Managers, Tech Architects, Regional Sales Heads\n\n` +
      `2. *Functional Heads & Directors (₹25L – ₹50L)* [Highest Demand]\n` +
      `   VP Operations, Head of Engineering / CTO, CHRO, General Counsel\n\n` +
      `3. *Executive & C-Suite (₹50L – ₹1 Cr)*\n` +
      `   CEOs, COOs, Managing Directors, Board Advisors\n\n` +
      `👉 Details & Calculator: https://www.jsmintegratedservices.com/#roles`
    );
    return NextResponse.json({ ok: true });
  }

  // Handle Leads / General Inquiries sent in Private Chat
  if (chatType === "private" && text.length > 2) {
    // 1. Confirm receipt to user
    await sendTelegramMessage(
      token,
      chatId,
      `✅ *Thank you, ${senderName}! Your message has been received by JSM Executive Desk.*\n\n` +
      `Reference ID: \`JSM-TG-${Math.floor(1000 + Math.random() * 9000)}\`\n` +
      `Our recruitment director will review your details and connect within 24 business hours.\n\n` +
      `For urgent CXO mandates, call directly at [+91 90808 63448](tel:+919080863448).`,
      getMainKeyboard()
    );

    // 2. Forward lead directly to Admin Telegram
    if (adminChatId) {
      const alertText =
        `🚨 *NEW TELEGRAM LEAD / INQUIRY*\n` +
        `----------------------------------------\n` +
        `👤 *From:* ${senderName} (${senderUsername})\n` +
        `💬 *Message:* \n${text}\n` +
        `----------------------------------------\n` +
        `⏰ *Time:* ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`;

      await sendTelegramMessage(token, adminChatId, alertText);
    }
  }

  return NextResponse.json({ ok: true });
}
