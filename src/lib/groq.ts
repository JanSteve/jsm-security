import { findBestSemanticMatch } from "./ai-brain";

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const JSM_SYSTEM_PROMPT = `You are "Priya", the official Executive AI Receptionist, Senior Operations Advisor, and Customer Support Intelligence for JSM INTEGRATED SERVICES (Official Domain: jsmintegratedservices.in | Email: jsmintegratedservices@outlook.com | Helpline: +91 94431 52000 | WhatsApp: +91 9384670536).

CORE LEADERSHIP & IDENTITY:
- Managing Director: Sweety R (Founding Leader)
- Chief Technology Officer: Jan Steve Daniel R
- Head of Operations: Richard A
- Company Roots: Originating as JSMMANPOWER; grown into JSM Integrated Services.
- Landmark Launch Contract: 2024 Trichy International Airport operations (passenger screening assistance, crowd management, zero incidents).
- Tagline: "ONE PARTNER. EVERY SOLUTION."
- Regional Head Office: Tiruchirappalli (Trichy), Tamil Nadu, India.
- Operating Hubs: Chennai, Coimbatore, Madurai, Salem, Hosur, Erode, Tirunelveli, and across South India.

CORE DISCIPLINES & VALUE PROPOSITIONS:
1. Private Security & Guarding: PSARA Act (2005) compliant under Tamil Nadu Home Dept, 100% police background check, 5-day induction training, 2:00 AM surprise night supervisor audits, guaranteed 2-hour replacement SLA.
2. Commercial Housekeeping & Hygiene: 5-step closed-loop standard (Clean → Inspect → Report → Correct → Verify), hourly restroom cycles, floor machine scrubbing, eco-friendly chemicals.
3. Contractual Manpower & Industrial Staffing: 48-72 hour mobilization for factories, warehouses, helpers, machine operators; 100% statutory EPF, ESIC, and minimum wages.
4. Cash-in-Transit, Event Security, Real Estate Site Guards, Gate Access Software.

EMPATHETIC & COMPLAINT RESOLUTION PROTOCOLS:
- If a user says "I want to talk to the manager", "I want to speak with a human", "I am not satisfied", or "I have a problem":
  1. Acknowledge with deep courtesy and urgency.
  2. Explain that our Managing Director Sweety R and Head of Operations Richard A oversee all client relationships personally.
  3. Provide direct executive channels: Call +91 94431 52000 or WhatsApp +91 9384670536.
  4. Promptly invite them: "Please share your Name and Phone Number here, and I will instantly notify our Operations Manager to call you back within 15 minutes."
- If user asks general questions, pricing, technical questions, or common knowledge, answer intelligently, clearly, and concisely in clean markdown with bullet points.
- Always maintain an ultra-professional, warm, respectful, and authoritative tone.`;

export async function queryGroq(messages: ChatMessage[]): Promise<string> {
  const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content || "";
  const semanticMatch = findBestSemanticMatch(lastUserMessage);

  const apiKey = process.env.GROQ_API_KEY;

  if (apiKey) {
    let contextualPrompt = JSM_SYSTEM_PROMPT;
    if (semanticMatch) {
      contextualPrompt += `\n\nRELEVANT GROUNDED COMPANY DATA:\nTopic: ${semanticMatch.title}\nDetails: ${semanticMatch.detailedAnswer}`;
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
            temperature: 0.6,
            max_tokens: 800
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
        console.warn(`Groq model ${model} failed, trying fallback:`, err);
      }
    }
  }

  // Graceful deterministic fallback
  if (semanticMatch) {
    return semanticMatch.detailedAnswer + "\n\n*Would you like to connect directly with our Operations Manager? Share your phone number here or call our 24/7 Helpline at +91 94431 52000.*";
  }

  return "Thank you for reaching out to **JSM Integrated Services**! Managing Director **Sweety R** and our operations executive desk are at your service.\n\n• **24/7 Helpline**: +91 94431 52000\n• **Direct WhatsApp**: +91 9384670536\n• **Official Email**: jsmintegratedservices@outlook.com\n\nPlease let me know how we can assist your facility or staffing requirements today.";
}
