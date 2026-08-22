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

const JSM_SYSTEM_PROMPT = `You are "JSM Priya", the official Executive AI Receptionist & Client Solutions Advisor for JSM INTEGRATED SERVICES (Website: jsmintegratedservices.in | Email: jsmintegratedservices@outlook.com | Phone/WhatsApp: +91 94431 52000).

ABOUT JSM INTEGRATED SERVICES:
- Founder & Managing Director: Sweety R.
- Operational Roots: Founded originally under the name JSMMANPOWER; rebranded to JSM Integrated Services as a one-stop integrated operations leader.
- Landmark Achievement: Successfully completed our landmark first operations assignment at Trichy International Airport in 2024.
- Core Tagline: "One Partner. Every Solution."
- Service Coverage: Tiruchirappalli (Trichy), Chennai, Coimbatore, Madurai, Salem, Hosur, and throughout Tamil Nadu & India.

OUR SERVICES:
1. Private Security & Guarding: Verified unarmed guards, gate/visitor logging, night perimeter patrols, supervisory checks.
2. Housekeeping & Facility Management: Checklist-driven hygiene (Clean → Inspect → Report → Correct → Verify), restroom cycles, deep cleaning.
3. Manpower & Temporary Staffing: Industrial laborers, warehouse handlers, technical helpers, peak-season workforce surges.
4. Cash-in-Transit: Dual-custody verification, retail cash pickups, route timing discipline.
5. Event & Wedding Support: Hospitality-trained bouncers, crowd management, VIP handling, valet traffic coordination.
6. Real Estate & Auction Site Support: Construction material security, labor gate passes, model flat hosting, bidder verification.
7. Software & Web Solutions: High-conversion websites, digital visitor management, lead automation.
8. Creative Media: Corporate facility photography, event videography, visual SOP documentation.

YOUR GOAL & PERSONALITY:
- Be polite, disciplined, articulate, professional, and warmly welcoming.
- Answer questions accurately about our services, 5-day induction training, and SOPs.
- Actively qualify prospective clients by asking for their requirement details:
  1. Name & Company / Society Name
  2. Phone number / WhatsApp
  3. City / Location in Tamil Nadu or India
  4. Service required & estimated staff headcount
- If the user provides their contact information, thank them warmly and let them know a JSM Operations Officer will contact them within 2 hours or on WhatsApp.
- Keep answers concise, clear, and focused on operational confidence.`;

export async function queryOpenRouter(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (apiKey) {
    const fullMessages: ChatMessage[] = [
      { role: 'system', content: JSM_SYSTEM_PROMPT },
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
            temperature: 0.7,
            max_tokens: 600
          }),
          signal: AbortSignal.timeout(10000)
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.choices?.[0]?.message?.content;
          if (content && typeof content === 'string' && content.trim().length > 0) {
            return content.trim();
          }
        }
      } catch {
        // Continue to next model if rate-limited or timeout
      }
    }
  }

  // Fallback intelligent simulated receptionist logic if external API is unreachable
  return fallbackReceptionistResponse(messages[messages.length - 1]?.content || "");
}

function fallbackReceptionistResponse(userQuery: string): string {
  const q = userQuery.toLowerCase();

  if (q.includes("manpower") || q.includes("staff") || q.includes("labor") || q.includes("worker")) {
    return "Thank you for asking about JSM Manpower Solutions. Originating from our heritage as JSMMANPOWER, we supply vetted industrial helpers, warehouse operators, and skilled contractual staff across Tamil Nadu with full statutory compliance and 48-hour mobilization.\n\nCould you please share your Name, Phone Number, City, and estimated headcount required so our operations team can prepare a custom quote?";
  }

  if (q.includes("security") || q.includes("guard") || q.includes("gate") || q.includes("cctv")) {
    return "Welcome to JSM Private Security Operations. We provide disciplined, 5-day induction trained, and background-verified security guards with surprise 2:00 AM supervisor spot-checks across commercial, industrial, and residential premises.\n\nCould you share your Name, Contact Number, and property location in Tamil Nadu to schedule a free Site Risk Assessment?";
  }

  if (q.includes("housekeeping") || q.includes("cleaning") || q.includes("facility") || q.includes("hygiene")) {
    return "JSM Housekeeping & Facility Management operates on our structured 5-step hygiene framework: Clean → Inspect → Report → Correct → Verify. We manage daily office cleaning, hourly restroom cycles, and deep floor scrubbing.\n\nMay I have your Name, Company/Property Name, and Phone number to arrange a facility walkthrough?";
  }

  if (q.includes("trichy airport") || q.includes("history") || q.includes("experience") || q.includes("about")) {
    return "JSM Integrated Services was founded under Managing Director Sweety R, starting as JSMMANPOWER. In 2024, we completed our landmark inaugural project securing operations at Trichy International Airport, proving our capacity for high-discipline public infrastructure service.\n\nHow can we assist your business today?";
  }

  if (q.includes("price") || q.includes("cost") || q.includes("quote") || q.includes("rate")) {
    return "We provide transparent, competitive monthly service quotes tailored to your exact shift hours, headcount, and facility requirements. To send you an accurate proposal, please share your Name, Mobile Number, City, and the specific service you need!";
  }

  return "Namaste and welcome to JSM Integrated Services! I am Priya, your digital receptionist. We provide disciplined Private Security, Housekeeping & Facility Management, Contractual Manpower, and Event Support across Tamil Nadu.\n\nPlease let me know your operational requirement or share your Name and Phone Number so our Managing Director's office can connect with you directly.";
}
