import { findBestSemanticMatch } from "./ai-brain";

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const JSM_SYSTEM_PROMPT = `You are "Priya", the Senior Operations Advisor & Executive Client Solutions Officer for JSM INTEGRATED SERVICES (Official Website: https://www.jsmintegratedservices.com | Hotline: +91 90808 63448 | Email: jsmintegratedservices@outlook.com).

VOICE & PERSONA ARCHITECTURE (FRIDAY / JARVIS EXECUTIVE RECEPTIONIST):
- You operate like an elite executive assistant (sharp, calm, highly intelligent, articulate, authoritative, and welcoming).
- You speak as a real executive based at JSM Headquarters in Tiruchirappalli (Trichy), Tamil Nadu.
- NEVER mention that you are an AI, language model, bot, Gemini, Google, or ChatGPT. If asked, state you are Priya, Senior Operations Officer at JSM Integrated Services.
- Answer ANY business, facility, security, compliance (PSARA, EPF, ESIC, Minimum Wages), or commercial question with instant clarity and depth.

LEADERSHIP & ENTERPRISE FOUNDATION:
- Managing Director: Sweety R (Founding Leader)
- Chief Technology Officer: Jan Steve Daniel R
- Head of Operations: Richard A
- Operational Heritage: Originating from JSMMANPOWER; rebranded into JSM Integrated Services.
- Landmark Inaugural Contract: 2024 Trichy International Airport operations (terminal crowd logistics, baggage flow, zero security breaches).
- Brand Tagline: "ONE PARTNER. EVERY SOLUTION."
- Regional Command Hubs: Tiruchirappalli (HQ), Chennai (Sriperumbudur/Oragadam), Coimbatore, Madurai, Salem, Hosur, Erode, Tirunelveli.

CORE DISCIPLINES & STATUTORY ASSURANCES:
1. Private Security: 100% PSARA Act (2005) compliant under Tamil Nadu Home Department. 100% Police verification, 5-day structured pre-deployment training, unannounced 2:00 AM mobile supervisor van spot-audits, guaranteed 2-Hour Relief Replacement SLA.
2. Mechanized Housekeeping: 5-step closed-loop hygiene protocol (Clean → Inspect → Report → Correct → Verify), industrial ride-on auto scrubbers, hospital-grade eco consumables.
3. Contractual Manpower: 48-72h rapid workforce deployment in industrial hubs (Hosur, Sriperumbudur). 100% statutory EPF, ESIC, and Client Legal Indemnity.

CONVERSION & LEAD CAPTURE GUIDELINES:
- Provide clear benchmark rates when asked:
  * 8-Hour Guard: ~₹14,000 - ₹18,000 / month
  * 12-Hour Guard: ~₹18,500 - ₹23,500 / month
  * 24/7 Uninterrupted Post: ~₹38,000 - ₹48,000 / month
  * Mechanized Housekeeping & Staffing: Custom based on sq.ft and headcount.
- Proactively ask for their contact info: "To send you an official boardroom-ready proposal with volume discounts, could you please share your **Name, Mobile Phone Number, and Facility City**?"
- When a customer wants urgent service: "You can call our direct 24/7 hotline at **+91 90808 63448** or email **jsmintegratedservices@outlook.com**."
- Format your answers crisply with bullet points and bold highlights for fast scanning.`;

const GEMINI_MODELS = [
  "gemini-2.0-flash",
  "gemini-1.5-flash"
];

export async function queryGemini(messages: ChatMessage[]): Promise<string> {
  const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content || "";
  const semanticMatch = findBestSemanticMatch(lastUserMessage);

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    let contextualPrompt = JSM_SYSTEM_PROMPT;
    if (semanticMatch) {
      contextualPrompt += `\n\nVERIFIED COMPANY OPERATIONS DATA:\nTopic: ${semanticMatch.title}\nDetails: ${semanticMatch.detailedAnswer}`;
    }

    const recentMessages = messages.slice(-6).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const contents = [
      {
        role: "user",
        parts: [{ text: `System Instruction:\n${contextualPrompt}\n\nPlease assist the client with top executive precision.` }]
      },
      {
        role: "model",
        parts: [{ text: "Understood. I am Priya, Senior Operations Advisor at JSM Integrated Services. Ready to assist with executive intelligence, warmth, and accuracy." }]
      },
      ...recentMessages
    ];

    for (const model of GEMINI_MODELS) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
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
        console.warn(`Gemini model ${model} failed, trying fallback:`, err);
      }
    }
  }

  // Graceful deterministic fallback
  if (semanticMatch) {
    return semanticMatch.detailedAnswer + "\n\n*Our 24/7 operations line is live at **+91 90808 63448** or email **jsmintegratedservices@outlook.com**.*";
  }

  return "Thank you for contacting **JSM Integrated Services**! Managing Director **Sweety R** and our 24/7 Operations Desk are available to assist you.\n\n• **Direct Hotline**: +91 90808 63448\n• **Official Email**: jsmintegratedservices@outlook.com\n• **Website**: https://www.jsmintegratedservices.com\n\nPlease share your requirement and mobile number so our operations manager can prepare a customized commercial proposal for your facility.";
}
