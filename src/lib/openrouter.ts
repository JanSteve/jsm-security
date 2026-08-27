import { findBestSemanticMatch, JSM_ENTERPRISE_KNOWLEDGE } from "./ai-brain";

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const FREE_MODELS = [
  "meta-llama/llama-3.3-70b-instruct:free",
  "google/gemini-2.0-flash-exp:free",
  "mistralai/mistral-7b-instruct:free",
  "qwen/qwen-2.5-72b-instruct:free"
];

const JSM_SYSTEM_PROMPT = `You are "JSM Priya", the official Executive AI Receptionist, Commercial Solutions Specialist, and Operations Advisor for JSM INTEGRATED SERVICES (Official Domain: jsmintegratedservices.in | Email: jsmintegratedservices@outlook.com).

EXECUTIVE & COMPANY PROFILE:
- Managing Director: Sweety R
- Chief Technology Officer: Jan Steve Daniel R
- Chief Executive Officer: Richard A
- Operational Roots: Founded as JSMMANPOWER; rebranded to JSM Integrated Services as a unified operations partner.
- Landmark Launch Assignment: Landmark 2024 operations and security screening contract at Trichy International Airport (civil aviation passenger screening, gate flow, terminal discipline, zero incidents).
- Tagline: "One Partner. Every Solution."
- Headquarters: Tiruchirappalli (Trichy), Tamil Nadu, India.
- Operating Hubs: Chennai, Coimbatore, Madurai, Salem, Hosur, Erode, Tirunelveli, and across South India.

SERVICES CATALOG (8 INTEGRATED SERVICES):
1. Private Security & Guarding: 100% background-verified guards, 5-day induction training, surprise 2:00 AM mobile officer spot-checks, 2-hour replacement SLA.
2. Housekeeping & Facility Management: 5-step closed-loop hygiene standard (Clean → Inspect → Report → Correct → Verify), hourly restroom cycles, floor scrubbing.
3. Contractual Manpower & Staffing: Skilled/semi-skilled/industrial workforce, 48-hour mobilization, prompt 1st-of-the-month payroll.
4. Cash-in-Transit Operations: Two-person verified custody transfers, tamper-proof bags, retail cash pickups.
5. Event Security & Wedding Coordination: Hospitality-trained bouncers, crowd management, VIP handling, valet coordination.
6. Real Estate & Auction Site Support: Construction material gate passes, sales lounge hosts, bidder identification verification.
7. Software & Web Solutions: Fast corporate websites, digital visitor management tablets, lead automation.
8. Creative Media & Documentation: Corporate facility photography, event videography, visual safety SOP videos.

PRICING BENCHMARKS:
- 8-hour guard: ~₹14k - ₹18k/month.
- 12-hour guard: ~₹18k - ₹23k/month.
- 24/7 post (with relief): ~₹38k - ₹48k/month.
- Event bouncer: ~₹1.2k - ₹2.5k/day.
- Custom multi-service bundled contracts available with unified billing.

RESPONSE RULES:
- Be remarkably sharp, polite, articulate, and authoritative.
- Answer ANY question directly and precisely (pricing, training syllabus, airport contract, SOPs, job openings, coverage).
- When a prospective client inquires, invite them to share their Name, Phone Number, City, and required staff headcount for an instant formal quote.
- If user provides their phone number or contact info, acknowledge it warmly and confirm that our Operations Desk will reach out within 2 hours.
- Keep markdown formatting clean with bullet points.`;

export async function queryOpenRouter(messages: ChatMessage[]): Promise<string> {
  const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content || "";
  const semanticMatch = findBestSemanticMatch(lastUserMessage);

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (apiKey) {
    // Augment context with semantic match if found
    let contextualPrompt = JSM_SYSTEM_PROMPT;
    if (semanticMatch) {
      contextualPrompt += `\n\nRELEVANT GROUNDED KNOWLEDGE FOR THIS QUERY:\nTopic: ${semanticMatch.title}\nDetails: ${semanticMatch.detailedAnswer}`;
    }

    const fullMessages: ChatMessage[] = [
      { role: 'system', content: contextualPrompt },
      ...messages
    ];

    for (const model of FREE_MODELS) {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "HTTP-Referer": "https://jsmintegratedservices.in",
            "X-Title": "JSM Integrated Services AI Receptionist",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: model,
            messages: fullMessages,
            temperature: 0.65,
            max_tokens: 700
          }),
          signal: AbortSignal.timeout(9000)
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.choices?.[0]?.message?.content;
          if (content && typeof content === 'string' && content.trim().length > 0) {
            return content.trim();
          }
        }
      } catch {
        // Fallback to next model
      }
    }
  }

  // Autonomous Deterministic Brain Fallback
  if (semanticMatch) {
    return semanticMatch.detailedAnswer + "\n\n*Would you like to speak with our Operations Manager or schedule a complimentary on-site risk assessment? Feel free to share your email address.*";
  }

  return fallbackReceptionistResponse(lastUserMessage);
}

function fallbackReceptionistResponse(userQuery: string): string {
  const q = userQuery.toLowerCase();

  if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("vanakkam") || q.includes("namaste")) {
    return "Namaste and welcome to **JSM Integrated Services**! I am **Priya**, your executive AI advisor.\n\nWe provide disciplined Private Security, Commercial Housekeeping, Contractual Manpower, and Facility Operations across Tamil Nadu.\n\nHow may I assist you today? You can ask about our **service rates**, **Trichy Airport landmark contract**, **5-day induction training**, or request a **free site assessment**.";
  }

  if (q.includes("manpower") || q.includes("staff") || q.includes("labor") || q.includes("worker")) {
    return "Rooted in our heritage as **JSMMANPOWER**, JSM provides vetted industrial helpers, warehouse operators, and skilled technical manpower across Tamil Nadu with 48-hour mobilization.\n\n• 100% Background-checked personnel\n• Guaranteed 1st-of-the-month salary disbursement\n• Transparent statutory compliance\n\nPlease share your **Name, Mobile Number, City, and Headcount required** to receive a tailored commercial quotation.";
  }

  if (q.includes("security") || q.includes("guard") || q.includes("gate") || q.includes("patrol")) {
    return "JSM Private Security operations deploy disciplined, 5-day induction trained, and background-verified security guards backed by unannounced **2:00 AM supervisor spot-checks** and a **2-hour replacement guarantee**.\n\nWould you like to schedule a complimentary on-site security risk audit for your premises in Tamil Nadu? Please share your **Phone Number and City** to get started.";
  }

  if (q.includes("housekeeping") || q.includes("cleaning") || q.includes("facility")) {
    return "Our Housekeeping & Facility Management division operates on our structured **5-Step Hygiene Framework**: Clean → Inspect → Report → Correct → Verify.\n\nWe handle daily corporate office sanitization, hourly restroom cycles, and periodic deep scrubbing with modern equipment.\n\nMay I have your **Name, Location, and Property Type** to prepare a facility maintenance blueprint?";
  }

  return "Thank you for reaching out to **JSM Integrated Services**.\n\nOur team delivers disciplined operational solutions across Tamil Nadu under Managing Director **Sweety R**. We specialize in Private Security, Housekeeping, Manpower Staffing, and Cash Logistics.\n\nTo help you with an exact answer or quotation, please share your requirement details or contact number!";
}
