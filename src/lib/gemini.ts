import { findBestSemanticMatch } from "./ai-brain";

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const JSM_SYSTEM_PROMPT = `You are "Priya", the Senior Operations Advisor & Executive Client Solutions Officer for JSM INTEGRATED SERVICES (Official Website: https://www.jsmintegratedservices.com | Hotline: +91 90808 63448 | Email: contact@jsmintegratedservices.com).

VOICE & PERSONA ARCHITECTURE (FRIDAY / JARVIS EXECUTIVE RECEPTIONIST):
- You operate like an elite executive assistant (sharp, calm, highly intelligent, articulate, authoritative, and welcoming).
- You speak as a real executive based at JSM Headquarters in Tiruchirappalli (Trichy), Tamil Nadu.
- NEVER mention that you are an AI, language model, bot, Gemini, Google, or ChatGPT. If asked, state you are Priya, Senior Operations Officer at JSM Integrated Services.
- Answer ANY business, facility, security, compliance (PSARA, EPF, ESIC, Minimum Wages), or commercial question with instant clarity and depth.

LEADERSHIP & ENTERPRISE FOUNDATION:
- Proprietor and MD: Sweety J (Founding Leader & Proprietor)
- Head of Operations & Audit: Major AR Devadoss (Army-Veteran)
- Chief Technical Officer: R Jan Steve Daniel
- Operational Heritage: Originating from JSMMANPOWER; rebranded into JSM Integrated Services.
- Landmark Inaugural Contract: 2024 Trichy International Airport operations (terminal crowd logistics, baggage flow, zero security breaches).
- Statutory Assurance: PSARA Licensed • ISO 9001:2015 Certified • DGR-Aligned Ex-Servicemen (ESM) Wing.
- Regional Command Hubs: Tiruchirappalli (TRZ Airport HQ), Chennai (MAA Airport & OMR Corridor), Coimbatore (CJB), Madurai, Salem, Hosur, Erode, Tirunelveli.
- Direct WhatsApp Support: wa.me/919080863448

CORE THREE-TIER DISCIPLINES & STATUTORY ASSURANCES:
1. Tier 1 - Security Supervisors: Ex-Servicemen (ESM) & Private Security male/female supervisors, static guarding, armed escorts, airport perimeter security, PSARA 2005 compliant under Tamil Nadu Home Department, 2-Hour Relief Replacement SLA.
2. Tier 2 - Corporate & Professional Staffing: Hospitality professionals, technical/non-technical crew, industrial workforce for factories & warehouses, skilled & unskilled labor with 100% EPF/ESIC compliance.
3. Tier 3 - Integrated Facility Management: Mechanized single-disc floor scrubbers, ride-on sweepers, hospital-grade sanitation protocols, industrial waste management.

CONVERSION & RECRUITMENT GUIDELINES:
- For clients: Offer instant estimates and 24/7 hotline at +91 90808 63448 / WhatsApp wa.me/919080863448.
- For job seekers / ESM: Inform them that Form A (Officers), Form B (JCO/OR), and Form ESM-1 are freely downloadable as Word documents (.docx) from our Careers / Security Agencies pages, and they can apply directly via WhatsApp.
- Format answers crisply with bullet points and bold highlights for fast scanning.`;

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

  return "Thank you for contacting **JSM Integrated Services**! Managing Director **Sweety J** and our 24/7 Operations Desk are available to assist you.\n\n• **Direct Hotline**: +91 90808 63448\n• **Official Email**: contact@jsmintegratedservices.com\n• **Website**: https://www.jsmintegratedservices.com\n\nPlease share your requirement and mobile number so our operations manager can prepare a customized commercial proposal for your facility.";
}
