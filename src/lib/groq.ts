import { findBestSemanticMatch } from "./ai-brain";

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const JSM_SYSTEM_PROMPT = `You are "Priya", the Senior Executive Client Solutions Officer and Operations Advisor at JSM INTEGRATED SERVICES (Official Domain: jsmintegratedservices.in | Email: jsmintegratedservices@outlook.com).

CRITICAL PERSONA INSTRUCTIONS:
- You are a real human operations executive working directly at the JSM Headquarters in Tiruchirappalli (Trichy), Tamil Nadu.
- NEVER mention AI, LLM, model names, Groq, Meta, Llama, ChatGPT, OpenAI, or robots under any circumstances. You speak with natural warmth, executive composure, professional authority, and commercial intelligence.
- Answer ANY question naturally — whether about business, general knowledge, statutory rules (PSARA, EPF, ESIC, Minimum Wages), facility management math, security protocols, or operational logistics.

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
  2. State: "I understand completely. Our Managing Director **Sweety R** and Operations Chief **Richard A** personally oversee all accounts."
  3. Offer: "You can email us directly at **jsmintegratedservices@outlook.com** and our leadership team will respond within 2 hours."
  4. Or: "Simply share your Name & Email right here, and I will have our Operations Manager reach out to you personally."
- Keep your formatting crisp, modern, and readable with bullet points and bold highlights.`;

export async function queryGroq(messages: ChatMessage[]): Promise<string> {
  const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content || "";
  const semanticMatch = findBestSemanticMatch(lastUserMessage);

  const apiKey = process.env.GROQ_API_KEY;

  if (apiKey) {
    let contextualPrompt = JSM_SYSTEM_PROMPT;
    if (semanticMatch) {
      contextualPrompt += `\n\nVERIFIED COMPANY OPERATIONS DATA:\nTopic: ${semanticMatch.title}\nDetails: ${semanticMatch.detailedAnswer}`;
    }

    const fullMessages: ChatMessage[] = [
      { role: 'system', content: contextualPrompt },
      ...messages
    ];

    const models = [
      "llama-3.3-70b-versatile",
      "llama-3.1-8b-instant",
      "mixtral-8x7b-32768"
    ];

    for (const model of models) {
      try {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: model,
            messages: fullMessages,
            temperature: 0.65,
            max_tokens: 850
          }),
          signal: AbortSignal.timeout(8000)
        });

        if (res.ok) {
          const data = await res.json();
          const content = data.choices?.[0]?.message?.content;
          if (content && typeof content === 'string' && content.trim().length > 0) {
            return content.trim();
          }
        }
      } catch (err) {
        console.warn(`Groq model ${model} fallback trigger:`, err);
      }
    }
  }

  // Graceful deterministic response
  if (semanticMatch) {
    return semanticMatch.detailedAnswer + "\n\n*Would you like me to connect you with our Operations Manager? Please share your email or reach us at jsmintegratedservices@outlook.com.*";
  }

  return "Thank you for reaching out to **JSM Integrated Services**! Managing Director **Sweety R** and our operations team are here to support your facility.\n\n• **Official Email**: jsmintegratedservices@outlook.com\n• **Website**: jsmintegratedservices.in\n\nPlease share your email and requirements so we can assist you immediately.";
}
