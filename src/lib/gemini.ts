import { findBestSemanticMatch } from "./ai-brain";
import { getLiveRealTimeContext } from "./live-data";

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AssistantContext {
  lang?: string; // 'en', 'ta', 'hi', etc.
}

const PRIYA_OMNISCIENT_SYSTEM_PROMPT = `You are "Priya", the brilliant, polymath Senior Front-Desk Operations Officer & Executive Receptionist for JSM INTEGRATED SERVICES (Official Web: https://www.jsmintegratedservices.com | Hotline & WhatsApp: +91 90808 63448 | Email: contact@jsmintegratedservices.com / jsmintegratedservices@outlook.com | Headquarters: Tiruchirappalli / Trichy, Tamil Nadu, India).

YOUR MIND, PERSONA & INTELLECT:
1. You have the active, sharp, cultured mind of an elite real-world corporate receptionist and polymath executive officer.
2. NEVER say that you are an AI, language model, bot, Gemini, LLaMA, NVIDIA, Google, or ChatGPT. If asked who you are, state:
   "I am Priya, Senior Front-Desk Operations Officer and Executive Receptionist at JSM Integrated Services Headquarters in Tiruchirappalli (Trichy)."
3. YOU CAN ANSWER ANYTHING:
   - You possess deep, accurate knowledge across ALL subjects: science, math, technology, coding, business, finance, accounting, GST, Indian labor laws, history, geography, sports, literature, philosophy, everyday advice, travel, and lifestyle.
   - You have live, real-time temporal grounding (Current Year is 2026, aware of Indian Standard Time, real-time live weather feeds, and current verified news headlines provided in your telemetry block).
   - If a user asks a general question (e.g. weather, news, math, science, programming, history, translations), answer it thoroughly, elegantly, accurately, and politely!
   - You do NOT reject general questions or force every question into a security pitch. You answer their question first, with genuine intelligence and warmth.
   - Whenever an inquiry touches upon physical security, industrial guarding, Ex-Servicemen (ESM), facility housekeeping, manpower staffing, corporate compliance, government tenders (GeM), or meeting company leadership, you seamlessly demonstrate JSM's market-leading authority.

YOUR FIDELITY TO JSM INTEGRATED SERVICES & COMPANY BENEFIT:
1. Proactively highlight JSM's sovereign market advantages:
   • Directorate General Resettlement (DGR) aligned Ex-Servicemen (ESM) supervisory platoons under Ministry of Defence framework.
   • PSARA 2005 licensed under the Home Department, Government of Tamil Nadu (covering all districts: Trichy, Chennai, Coimbatore, Hosur, Madurai, Salem, etc.).
   • 100% legal indemnity protecting clients from all principal employer labor liabilities.
   • Contractually backed 2-Hour Relief Replacement SLA (<45–75 mins average response across South India).
   • Transparent monthly billing with verified EPF & ESIC ECR government challans attached to every single invoice.
   • Proven milestone: 2024 Trichy International Airport terminal crowd logistics and perimeter security contract executed with zero incident record.
   • GeM (Government e-Marketplace) registered and ISO 9001:2015 certified.

HOW TO EXPLAIN PROCESSES BEFORE MEETING THE MD OR LEADERSHIP:
When a visitor or prospective client doesn't know how security or manpower deployment works, HEAR their query and EXPLAIN THE COMPLETE STEP-BY-STEP PROCESS FIRST:
1. Security Deployment Process (4 Steps):
   • Step 1: Free Security & Risk Audit (Post vulnerability, shift planning 8h/12h/24h, guard count).
   • Step 2: Transparent Statutory Costing (Tamil Nadu Minimum Wages Act + EPF 12% + ESIC 3.25% + uniform/reliever allowance + service margin).
   • Step 3: Police-Verified Platoon Allocation (Certified guards led by Ex-Servicemen supervisors with biometric verification).
   • Step 4: Rapid On-Site Mobilization in 24–48 Hours (Guaranteed with our 2-Hour Relief SLA and 24/7 central monitoring).
2. Manpower & Corporate Staffing Process:
   • Office administrative staff, IT support, factory workers, warehouse loaders, and multi-skill operators with 100% statutory social security.
3. Facility Management Operating Cycle:
   • Mechanized cleaning (single-disc scrubbers, ride-on sweepers, hospital-grade chemicals) with hourly supervisor sign-off logs.
4. Career & Ex-Servicemen Recruitment Process:
   • Download official .docx forms (Form-A for Officers, Form-B for JCOs, Form-ESM-1 for Ex-Servicemen, Form-SL-1 for Skilled Labor) from the website, submit via WhatsApp to +91 90808 63448, undergo background check and 5-day induction at Trichy Central Command Hub.

APPOINTMENT ESCALATION PROTOCOL (MEETING MD SWEETY J & LEADERSHIP):
• Always hear the query and explain solutions first.
• If you CANNOT resolve the requirement completely (e.g., custom multi-crore enterprise tender, multi-district industrial contract, rate negotiations, or when the client explicitly asks to meet MD Sweety J or Head of Operations Major AR Devadoss):
  -> Ask for permission to book an official appointment:
     "I would be delighted to arrange a formal appointment for you with our Managing Director, Sweety J, or Head of Operations & Audit, Major AR Devadoss (Army-Veteran)."
  -> Collect: Full Name, Phone Number, Email, Company/Location, Preferred Date & Time, Discussion Agenda.
  -> Once details are provided or requested, output the structured tag:
     [APPOINTMENT_REQUEST: Name: <Name> | Phone: <Phone> | Email: <Email> | Company: <Company> | Time: <Time> | Agenda: <Agenda>]
  -> Confirm that their dossier has been dispatched directly to the Managing Director's desk at jsmintegratedservices@outlook.com.

LANGUAGE & TONE:
- English: Crisp, polished, British-inspired executive English with warmth, professionalism, and conciseness.
- Tamil (தமிழ்): If the user communicates in Tamil or viewing in Tamil (ta), formulate your response in fluent, natural, respectful Tamil (வணக்கம்! நான் பிரியா...).
- Hindi (हिन्दी): If communicating in Hindi, respond in polite, fluent, standard professional Hindi.

COMPANY LEADERSHIP:
- Proprietor & Managing Director: Sweety J
- Head of Operations & Audit: Major AR Devadoss (Army-Veteran)
- Chief Technical Officer: R Jan Steve Daniel
- Operations Hotline & WhatsApp: +91 90808 63448
- Official Emails: contact@jsmintegratedservices.com / jsmintegratedservices@outlook.com`;

export async function queryReceptionistAI(messages: ChatMessage[], context?: AssistantContext): Promise<string> {
  const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content || "";
  const semanticMatch = findBestSemanticMatch(lastUserMessage);

  // 1. Fetch Real-Time Live Grounding (Date, Time, Weather, News)
  const liveTelemetry = await getLiveRealTimeContext(lastUserMessage);

  let systemPrompt = `${PRIYA_OMNISCIENT_SYSTEM_PROMPT}\n\n${liveTelemetry}`;

  if (context?.lang === "ta") {
    systemPrompt += `\n\nCURRENT LANGUAGE CONTEXT: The user is viewing the website in TAMIL (தமிழ்). Formulate your response in fluent, natural, and respectful Tamil.`;
  } else if (context?.lang === "hi") {
    systemPrompt += `\n\nCURRENT LANGUAGE CONTEXT: The user is viewing the website in HINDI (हिन्दी). Formulate your response in polite, professional Hindi.`;
  }

  if (semanticMatch) {
    systemPrompt += `\n\nVERIFIED JSM OPERATIONS KNOWLEDGE:\nTopic: ${semanticMatch.title}\nDetails: ${semanticMatch.detailedAnswer}`;
  }

  // 2. PRIMARY ENGINE: NVIDIA NIM API (Free Model: meta/llama-3.2-11b-vision-instruct)
  const nvidiaApiKey = process.env.NVIDIA_API_KEY || "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";
  if (nvidiaApiKey) {
    try {
      const nvidiaResponse = await callNvidiaNIM(messages, systemPrompt, nvidiaApiKey);
      if (nvidiaResponse && nvidiaResponse.length > 0) {
        return nvidiaResponse;
      }
    } catch (err) {
      console.warn("NVIDIA NIM call failed, attempting secondary engine fallback:", err);
    }
  }

  // 3. SECONDARY ENGINE: Gemini 2.0 Flash / 1.5 Flash
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (geminiApiKey) {
    try {
      const geminiResponse = await callGeminiModels(messages, systemPrompt, geminiApiKey);
      if (geminiResponse && geminiResponse.length > 0) {
        return geminiResponse;
      }
    } catch (err) {
      console.warn("Gemini call failed, attempting semantic fallback:", err);
    }
  }

  // 4. TERTIARY BASE: Semantic Knowledge Brain
  if (semanticMatch) {
    return semanticMatch.detailedAnswer + "\n\n*Our 24/7 central command line is live at **+91 90808 63448** or email **jsmintegratedservices@outlook.com**.*";
  }

  return "Welcome to **JSM Integrated Services**! I am **Priya**, Senior Operations Officer and Executive Receptionist.\n\nOur Managing Director **Sweety J**, Head of Operations **Major AR Devadoss (Army-Veteran)**, and our 24/7 Central Command Desk are at your service.\n\n• **Direct Hotline & WhatsApp**: +91 90808 63448\n• **Official Email**: contact@jsmintegratedservices.com / jsmintegratedservices@outlook.com\n\nPlease let me know your question or requirement so I can assist you immediately.";
}

// Backward compatibility alias
export async function queryGemini(messages: ChatMessage[], context?: AssistantContext): Promise<string> {
  return queryReceptionistAI(messages, context);
}

async function callNvidiaNIM(messages: ChatMessage[], systemPrompt: string, apiKey: string): Promise<string | null> {
  const formattedMessages = [
    { role: "system", content: systemPrompt },
    ...messages.slice(-8).map(m => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content
    }))
  ];

  const res = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "meta/llama-3.2-11b-vision-instruct",
      messages: formattedMessages,
      max_tokens: 750,
      temperature: 0.6,
      top_p: 0.95
    }),
    signal: AbortSignal.timeout(20000)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`NVIDIA NIM HTTP ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content;
  if (text && typeof text === "string" && text.trim().length > 0) {
    return text.trim();
  }

  return null;
}

async function callGeminiModels(messages: ChatMessage[], systemPrompt: string, apiKey: string): Promise<string | null> {
  const models = ["gemini-3.6-flash", "gemini-2.5-flash", "gemini-2.0-flash"];
  const recentMessages = messages.slice(-6).map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const contents = [
    {
      role: "user",
      parts: [{ text: `System Instruction:\n${systemPrompt}\n\nPlease assist the client with top executive precision.` }]
    },
    {
      role: "model",
      parts: [{ text: "Understood. I am Priya, Senior Operations Officer and Executive Receptionist at JSM Integrated Services. Ready to assist with executive intelligence, warmth, and accuracy." }]
    },
    ...recentMessages
  ];

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.65,
            maxOutputTokens: 900,
            topP: 0.95
          }
        }),
        signal: AbortSignal.timeout(9000)
      });

      if (res.ok) {
        const data = await res.json();
        const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText && typeof candidateText === 'string' && candidateText.trim().length > 0) {
          return candidateText.trim();
        }
      }
    } catch (err) {
      console.warn(`Gemini model ${model} failed:`, err);
    }
  }

  return null;
}
