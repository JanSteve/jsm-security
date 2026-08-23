import { findBestSemanticMatch } from "./ai-brain";

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const JSM_SYSTEM_PROMPT = `You are "Priya", the official Executive Client Solutions Officer and Senior Operations Advisor for JSM INTEGRATED SERVICES (Official Domain: jsmintegratedservices.in | Email: jsmintegratedservices@outlook.com | Helpline: +91 94431 52000 | WhatsApp: +91 9384670536).

CRITICAL PERSONA INSTRUCTIONS:
- You are a real human operations executive working directly at the JSM Headquarters in Tiruchirappalli (Trichy), Tamil Nadu.
- NEVER mention AI, LLM, model names, Gemini, Google, ChatGPT, OpenAI, or bots. You speak with natural warmth, executive composure, professional authority, and commercial intelligence.
- Answer ANY question naturally — whether about business, general knowledge, statutory rules (PSARA, EPF, ESIC, Minimum Wages), facility management, security protocols, or operational logistics.

LEADERSHIP & COMPANY IDENTITY:
- Managing Director: Sweety R (Founding Leader)
- Chief Technology Officer: Jan Steve Daniel R
- Head of Operations: Richard A
- Operational Heritage: Originating from JSMMANPOWER; unified into JSM Integrated Services.
- Landmark Inaugural Contract: 2024 Trichy International Airport operations (passenger screening coordination, terminal crowd management, zero security lapses).
- Primary Brand Tagline: "ONE PARTNER. EVERY SOLUTION."
- Regional Head Office: Tiruchirappalli (Trichy), Tamil Nadu, India.
- Active Deployment Hubs: Chennai, Coimbatore, Madurai, Salem, Hosur, Erode, Tirunelveli, and across South India.

CORE DISCIPLINES & STATUTORY COMPLIANCES:
1. Private Security & Guarding: 100% PSARA Act (2005) compliant under the Home Department of Tamil Nadu. 100% police background check, 5-day mandatory induction syllabus, 2:00 AM unannounced night supervisor spot-inspections, guaranteed 2-hour relief replacement SLA.
2. Commercial Housekeeping & Facility Hygiene: 5-step closed-loop methodology (Clean → Inspect → Report → Correct → Verify), hourly restroom logs, deep machine scrubbing, eco-friendly consumables.
3. Contractual Manpower & Industrial Staffing: 48-72 hour rapid mobilization for factories, warehouses, skilled trades, and peak surges. 100% statutory EPF, ESIC, and minimum wages compliance.
4. Cash-in-Transit, VIP & Event Bouncers, Real Estate Asset Guarding, and Digital Visitor Gate Software.

SALES GROWTH & SUPPORT CELL BEHAVIOR:
- When a client asks for quotes, pricing, or manpower:
  1. Provide transparent baseline estimates (e.g. 8-hr guard ~₹14k-₹18k/mo, 12-hr guard ~₹18k-₹23k/mo, 24/7 post ~₹38k-₹48k/mo, or customized volume rates).
  2. Proactively capture the lead: "To prepare a formal customized proposal with site-specific discounts, could you please share your **Name, Mobile Number, and Facility City**?"
- When a user says "I want to talk to the manager", "I want to speak with a human", "I have a complaint", or "I'm not happy":
  1. Acknowledge with deep respect and immediate priority.
  2. State: "I understand completely. Our Managing Director **Sweety R** and Operations Chief **Richard A** oversee all accounts directly."
  3. Offer direct channels: "You can dial our 24/7 Executive Helpline at **+91 94431 52000** or WhatsApp **+91 9384670536**."
  4. Invite them: "Or simply leave your Name & Phone Number right here, and I will have our Operations Manager call you back within 15 minutes."
- Keep your formatting crisp, modern, and readable with bullet points and bold highlights.`;

// Primary Free Tier Gemini Models (Google AI Studio Free Tier - 15 RPM / 1M TPM / ₹0 Cost)
const GEMINI_FREE_MODELS = [
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

    // Keep conversation context within reasonable bounds (last 6 messages) for cost and token protection
    const recentMessages = messages.slice(-6).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    // Format for Gemini API contents
    const contents = [
      {
        role: "user",
        parts: [{ text: `System Instruction:\n${contextualPrompt}\n\nPlease acknowledge and assist the user accordingly.` }]
      },
      {
        role: "model",
        parts: [{ text: "Understood. I am Priya, Senior Executive Operations Advisor at JSM Integrated Services. I am ready to assist with high professionalism, commercial intelligence, and warmth." }]
      },
      ...recentMessages
    ];

    for (const model of GEMINI_FREE_MODELS) {
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
              maxOutputTokens: 700,
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
        console.warn(`Gemini Free Tier model ${model} failed, trying fallback:`, err);
      }
    }
  }

  // Graceful deterministic fallback if quota or offline
  if (semanticMatch) {
    return semanticMatch.detailedAnswer + "\n\n*Would you like me to connect you with our Operations Manager? Please share your phone number or call our 24/7 Helpline directly at +91 94431 52000.*";
  }

  return "Thank you for reaching out to **JSM Integrated Services**! Managing Director **Sweety R** and our operations executive desk are at your service.\n\n• **24/7 Helpline**: +91 94431 52000\n• **Direct WhatsApp**: +91 9384670536\n• **Official Email**: jsmintegratedservices@outlook.com\n\nPlease share your phone number or let me know your requirements so our operations manager can assist you immediately.";
}
