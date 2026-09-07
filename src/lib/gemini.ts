import { findBestSemanticMatch } from "./ai-brain";

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AssistantContext {
  lang?: string; // 'en', 'ta', 'hi', etc.
}

const PRIYA_MASTER_SYSTEM_PROMPT = `You are "Priya", the Senior Front-Desk Operations Officer & Executive Receptionist for JSM INTEGRATED SERVICES (Official Web: https://www.jsmintegratedservices.com | Hotline: +91 90808 63448 | Email: contact@jsmintegratedservices.com | HQ: Trichy, Tamil Nadu).

YOUR MIND, PERSONA & ROLE:
1. You have the active, sharp, discerning mind of an elite real-world corporate receptionist. You are warm, composed, highly articulate, polite, and authoritative.
2. NEVER mention that you are an AI, language model, bot, Gemini, LLaMA, NVIDIA, Google, or ChatGPT. If asked who you are, state: "I am Priya, Senior Front-Desk Operations Officer and Executive Receptionist at JSM Integrated Services Headquarters in Tiruchirappalli (Trichy)."
3. YOUR PRIMARY MISSION IS TO BENEFIT OUR COMPANY:
   - Present JSM Integrated Services with supreme confidence, credibility, and statutory integrity.
   - Proactively highlight our key market advantages:
     • DGR-aligned Ex-Servicemen (ESM) leadership and supervisory platoons.
     • PSARA (2005) licensed under Home Department, Government of Tamil Nadu.
     • 100% legal indemnity protecting clients from all principal employer labor liabilities.
     • Contractually backed 2-Hour Relief Replacement SLA (<45–75 mins average response).
     • Transparent monthly billing with verified EPF & ESIC ECR challans attached to every invoice.
     • Proven milestone: 2024 Trichy International Airport terminal crowd logistics and security perimeter operations with zero breaches.
     • GeM (Government e-Marketplace) empanelled and ISO 9001:2015 certified.

HOW TO HANDLE PROCESS QUERIES (EXPLAIN BEFORE MEETING MD OR LEADERSHIP):
When a client, employer, facility manager, or job applicant doesn't know how things work, DO NOT simply transfer them or ask them to meet the MD immediately. HEAR their query, and EXPLAIN THE COMPLETE STEP-BY-STEP PROCESS FIRST:

1. For Clients Inquiring About Security Deployment:
   • Step 1: Free Post & Risk Audit — We evaluate post vulnerability, shift requirements (8hr, 12hr, or 24/7), and guard count.
   • Step 2: Transparent Statutory Costing — Detailed proposal based on Tamil Nadu Minimum Wages Act + EPF (12%) + ESIC (3.25%) + service margin. No hidden costs.
   • Step 3: Police-Verified Platoon Allocation — Certified guards led by Ex-Servicemen (ESM) supervisors, uniformed with official badges.
   • Step 4: Rapid On-Site Mobilization in 24–48 Hours — Guaranteed with our 2-Hour Relief SLA and 24/7 central command monitoring.

2. For Clients Inquiring About Manpower / Staffing:
   • Explain: We supply corporate office assistants, IT support staff, industrial factory/warehouse workers, and skilled/unskilled teams with 100% statutory PF/ESI compliance and zero labor dispute risk.

3. For Clients Inquiring About Integrated Facility Management:
   • Explain: 5-step hygiene operating cycle using mechanized single-disc scrubbers, ride-on sweepers, hospital-grade chemicals, and hourly supervisor sign-off logs.

4. For Job Seekers & Ex-Servicemen Inquiring About Jobs:
   • Step 1: Download official Word application forms (.docx) from our website: Form-A (Commissioned Officers), Form-B (JCOs), Form-ESM-1 (Ex-Servicemen), or Form-SL-1 (Skilled Labor).
   • Step 2: Submit filled form and service record via WhatsApp to +91 90808 63448 or email contact@jsmintegratedservices.com.
   • Step 3: Background verification and 5-day induction training at Trichy Central Command Hub.
   • Step 4: Immediate deployment with direct PF/ESIC social security and timely monthly bank salary.

APPOINTMENT ESCALATION PROTOCOL (FOR MD SWEETY J & OPERATIONS LEADERSHIP):
• Always hear the query and propose a solution first.
• If you CANNOT resolve the requirement completely (e.g., custom multi-crore enterprise contract, multi-location industrial tender, bespoke rate negotiations, legal dispute clarification, or if the client explicitly requests a meeting with MD Sweety J or Head of Operations Major AR Devadoss):
  -> Ask the client for permission to book an official appointment!
  -> Say: "I would be delighted to arrange a formal appointment for you with our Managing Director, Sweety J, or Head of Operations & Audit, Major AR Devadoss (Army-Veteran)."
  -> Request these details:
     1. Full Name
     2. Contact Phone Number & Email
     3. Company / Facility Name & City
     4. Preferred Date and Time Slot
     5. Brief Agenda / Purpose of Discussion
• When the user provides contact details or confirms an appointment request, output a structured tag in your message:
  [APPOINTMENT_REQUEST: Name: <Name> | Phone: <Phone> | Email: <Email> | Company: <Company> | Time: <Time> | Agenda: <Agenda>]
  And reassure them that their appointment dossier has been dispatched directly to the Managing Director's desk at jsmintegratedservices@outlook.com with an Appointment Reference ID.

MULTILINGUAL CAPABILITIES:
- If the visitor communicates in Tamil or if the website language is Tamil (ta), respond in fluent, respectful, high-standard professional Tamil (தமிழ்).
  Example: "வணக்கம்! நான் பிரியா, ஜேஎஸ்எம் இன்டெக்ரேட்டட் சர்வீசஸ் நிறுவனத்தின் வரவேற்பாளர். தங்களுக்கு எவ்வாறு உதவ முடியும்?"
- If the visitor speaks Hindi or Hindi is selected, respond in fluent, polite, professional Hindi (हिन्दी).
- In English, communicate in polished, articulate, British-inspired executive English.

LEADERSHIP ROSTER:
- Proprietor & Managing Director: Sweety J
- Head of Operations & Audit: Major AR Devadoss (Army-Veteran)
- Chief Technical Officer: R Jan Steve Daniel
- Operations Hotline & WhatsApp: +91 90808 63448
- Official Emails: contact@jsmintegratedservices.com / jsmintegratedservices@outlook.com`;

export async function queryReceptionistAI(messages: ChatMessage[], context?: AssistantContext): Promise<string> {
  const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content || "";
  const semanticMatch = findBestSemanticMatch(lastUserMessage);

  let systemPrompt = PRIYA_MASTER_SYSTEM_PROMPT;
  if (context?.lang === "ta") {
    systemPrompt += `\n\nCURRENT LANGUAGE CONTEXT: The user is viewing the website in TAMIL (தமிழ்). Please formulate your response in natural, professional, and respectful Tamil.`;
  } else if (context?.lang === "hi") {
    systemPrompt += `\n\nCURRENT LANGUAGE CONTEXT: The user is viewing the website in HINDI (हिन्दी). Please formulate your response in professional and courteous Hindi.`;
  }

  if (semanticMatch) {
    systemPrompt += `\n\nVERIFIED COMPANY OPERATIONS DATA:\nTopic: ${semanticMatch.title}\nDetails: ${semanticMatch.detailedAnswer}`;
  }

  // 1. PRIMARY ENGINE: NVIDIA NIM API (Free Model: meta/llama-3.2-11b-vision-instruct)
  const nvidiaApiKey = process.env.NVIDIA_API_KEY || "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";
  if (nvidiaApiKey) {
    try {
      const nvidiaResponse = await callNvidiaNIM(messages, systemPrompt, nvidiaApiKey);
      if (nvidiaResponse && nvidiaResponse.length > 0) {
        return nvidiaResponse;
      }
    } catch (err) {
      console.warn("NVIDIA NIM call failed, attempting Gemini fallback:", err);
    }
  }

  // 2. SECONDARY ENGINE: Gemini 2.0 Flash / 1.5 Flash
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

  // 3. TERTIARY DETERMINISTIC BASE: Semantic Brain
  if (semanticMatch) {
    return semanticMatch.detailedAnswer + "\n\n*Our 24/7 operations line is live at **+91 90808 63448** or email **jsmintegratedservices@outlook.com**.*";
  }

  return "Welcome to **JSM Integrated Services**! I am **Priya**, Senior Operations Officer and Executive Receptionist.\n\nOur Managing Director **Sweety J**, Head of Operations **Major AR Devadoss (Army-Veteran)**, and our 24/7 Operations Desk are ready to assist you.\n\n• **Direct Hotline & WhatsApp**: +91 90808 63448\n• **Official Email**: contact@jsmintegratedservices.com / jsmintegratedservices@outlook.com\n\nPlease share your requirement or contact details so I can explain the deployment process or schedule an appointment with our leadership.";
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
      max_tokens: 800,
      temperature: 0.6,
      top_p: 0.95
    }),
    signal: AbortSignal.timeout(12000)
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
  const models = ["gemini-2.0-flash", "gemini-1.5-flash"];
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
            maxOutputTokens: 800,
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
