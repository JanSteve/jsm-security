/**
 * JSM AI Brain — Enterprise Knowledge Base & Semantic Reasoning Engine
 * Powers JSM Priya (Executive AI Receptionist & Operations Advisor)
 */

export interface KnowledgeTopic {
  id: string;
  keywords: string[];
  title: string;
  summary: string;
  detailedAnswer: string;
  suggestedFollowups: string[];
  ctaType?: 'quote' | 'assessment' | 'email' | 'careers';
}

export const JSM_ENTERPRISE_KNOWLEDGE: KnowledgeTopic[] = [
  {
    id: 'pricing-security',
    keywords: ['price', 'pricing', 'cost', 'rate', 'charges', 'per guard', 'salary', 'fees', 'budget', 'quotation', 'how much'],
    title: 'Security Guarding Commercial Rates',
    summary: 'Transparent, compliance-aligned monthly pricing tailored to shift hours and site risk.',
    detailedAnswer: `JSM operates with complete transparent billing based on statutory minimum wage standards and shift duration:

• **8-Hour Single Shift Unarmed Guard**: Approx. ₹14,000 – ₹18,000 / month per post (includes uniform, daily supervision, and statutory compliance).
• **12-Hour Shift Guard**: Approx. ₹18,000 – ₹23,000 / month per post.
• **24/7 Complete Post Coverage (3 x 8hr or 2 x 12hr shifts)**: Approx. ₹38,000 – ₹48,000 / month per post including relief guard coverage and night supervisor visits.
• **Event Security / Bouncers**: Starting from ₹1,200 – ₹2,500 per day / shift per personnel depending on event duration and VIP protocols.

*Note: Exact commercial proposals depend on total headcount, property square footage, and specific technical equipment needed.*`,
    suggestedFollowups: ['Calculate customized quote', 'Schedule free site risk assessment', 'What equipment is included?'],
    ctaType: 'quote'
  },
  {
    id: 'trichy-airport-milestone',
    keywords: ['trichy airport', 'airport contract', 'airport project', 'civil aviation', 'first assignment', 'history', 'experience', 'track record', 'established'],
    title: '2024 Trichy International Airport Landmark Assignment',
    summary: 'Our foundational high-stakes civil aviation operational project.',
    detailedAnswer: `In 2024, JSM Integrated Services (founded originally as JSMMANPOWER under Managing Director Sweety R) executed the landmark operations and security support contract at **Trichy International Airport (Tiruchirappalli)**.

**Key Highlights:**
• Managed high-density passenger screening flow, terminal security assistance, and gate access discipline.
• Zero security breaches or compliance lapses across the entire contract duration.
• Forged the rigorous 5-day induction training and surprise 2:00 AM supervisory audits that now govern every JSM deployment across Tamil Nadu.`,
    suggestedFollowups: ['Read the full case study', 'What other sectors do you serve?', 'Request site assessment'],
    ctaType: 'assessment'
  },
  {
    id: 'psara-licensing-compliance',
    keywords: ['psara', 'licence', 'license', 'licensing', 'government', 'statutory', 'legal', 'police verification', 'controlling authority', 'regulation', 'act 2005'],
    title: 'PSARA Act Compliance & Legal Licensing in Tamil Nadu',
    summary: 'Strict adherence to Private Security Agencies (Regulation) Act, 2005 under the Government of Tamil Nadu.',
    detailedAnswer: `JSM Integrated Services operates strictly under the governance of the **Private Security Agencies (Regulation) Act (PSARA 2005)** as mandated by the Controlling Authority, Home Department of Tamil Nadu.
    
**Our PSARA Compliance Safeguards:**
• **100% Police Verification**: Complete character & antecedents verification through Tamil Nadu Police records before personnel deployment.
• **Mandatory 5-Day Pre-Deployment Training**: Physical drill, fire prevention, gate management, visitor logging, and emergency escalation syllabus.
• **Standard Uniform & Photo ID Badges**: Distinct, statutory-compliant uniforms with photo identification and emergency response cards.
• **Zero Labour Liability**: 100% Provident Fund (EPF), Employees State Insurance (ESIC), and Minimum Wages Act remittances with monthly challans shared with client leadership.`,
    suggestedFollowups: ['View Trust Center', 'Request statutory compliance audit', 'Download sample PF/ESI challan'],
    ctaType: 'assessment'
  },
  {
    id: 'housekeeping-hygiene-sop',
    keywords: ['housekeeping', 'cleaning', 'facility', 'hygiene', 'restroom', 'deep cleaning', 'sanitization', 'sweeper', 'scrubbing'],
    title: '5-Step Closed-Loop Housekeeping SOP',
    summary: 'Checklist-driven facility hygiene: Clean → Inspect → Report → Correct → Verify.',
    detailedAnswer: `JSM approaches facility housekeeping as an operational engineering discipline:

1. **Daily Workspace Sanitization**: Pre-shift floor scrubbing, dusting, and ergonomic desk hygiene.
2. **Hourly Restroom Cycles**: Timestamped sign-off sheets, odor neutralizers, continuous consumable replenishment.
3. **5-Step Hygiene Standard**:
   • **01 Clean**: Systematic multi-surface scrubbing with eco-friendly solutions.
   • **02 Inspect**: Area supervisor checklist verification.
   • **03 Report**: Digital or physical log entry.
   • **04 Correct**: Immediate remediation of any missed spot within 15 minutes.
   • **05 Verify**: Client admin sign-off.
4. **Periodic Deep Cleaning**: Heavy machinery scrubbing, glass facade washing, and carpet extraction.`,
    suggestedFollowups: ['Get commercial housekeeping quote', 'What chemicals do you use?', 'Can cleaning happen after office hours?'],
    ctaType: 'quote'
  },
  {
    id: 'manpower-staffing',
    keywords: ['manpower', 'staffing', 'labor', 'labour', 'workers', 'helpers', 'recruitment', 'factory workers', 'warehouse labor', 'temporary staff'],
    title: 'Contractual Manpower & Industrial Staffing',
    summary: '48-hour mobilization for skilled, semi-skilled, and general industrial labor.',
    detailedAnswer: `Originating from our foundation as JSMMANPOWER, we supply vetted workforce across Tamil Nadu:

• **Industrial Helpers & Machine Operators**: For manufacturing plants, assembly units, and engineering workshops.
• **Warehouse & Logistics Handlers**: Loading/unloading, inventory sorting, barcode scanning, packaging teams.
• **Administrative & Office Assistants**: Data entry, front-desk reception, and pantry staff.
• **Peak-Season Scalability**: Rapid workforce surge mobilization (20 to 100+ personnel) within 48 to 72 hours.
• **Statutory & Compliance Guarantee**: Full attendance logging, prompt 1st-of-the-month payroll, and zero labor compliance friction for clients.`,
    suggestedFollowups: ['Request manpower headcount', 'What is the minimum notice period?', 'Talk to HR team via Email'],
    ctaType: 'email'
  },
  {
    id: 'guard-verification-training',
    keywords: ['training', 'induction', 'verification', 'police verification', 'background check', 'aadhaar', '5-day', 'how are guards trained', 'standards'],
    title: '100% Background Verification & 5-Day Induction Syllabus',
    summary: 'No personnel deployed without verified identity and syllabus training.',
    detailedAnswer: `Every JSM personnel undergoes our mandatory 5-Day Induction Curriculum before deployment:

• **Stage 1: Identity & Background Check**: Aadhaar biometric validation, local police verification support, residential address physical check, and previous employer reference audit.
• **Day 1 Training**: JSM Core Values, Personal Grooming & Uniform Discipline.
• **Day 2 Training**: Gate Access Control, Visitor Management & Material Pass Protocols.
• **Day 3 Training**: Fire Safety (PASS method), First Aid Basics & Emergency Evacuation.
• **Day 4 Training**: Client Specific SOPs, Courtesy Communication & De-escalation.
• **Day 5 Training**: Supervised On-Site Field Shadowing with Senior Officer.`,
    suggestedFollowups: ['Explore Trust Center', 'View career progression ladder', 'Schedule a site audit'],
    ctaType: 'assessment'
  },
  {
    id: 'supervision-night-audits',
    keywords: ['supervision', 'night check', 'sleeping guard', 'patrol', 'alertness', 'field officer', 'absent', 'replacement', '2am'],
    title: 'Supervisory Audits & 2-Hour Replacement SLA',
    summary: 'Active supervision 24/7 with surprise 2:00 AM visits and rapid standby replacements.',
    detailedAnswer: `To guarantee round-the-clock alertness and zero duty abandonment:

• **Surprise Field Visits**: Mobile Operations Officers conduct unannounced physical site checks between **11:00 PM and 04:00 AM**.
• **Checkpoint Clocking**: Guard tour verification registers and perimeter patrols.
• **2-Hour Rapid Replacement Guarantee**: If an assigned guard is absent or unwell, our active reserve pool deploys a trained replacement within **120 minutes**.
• **Direct Leadership Line**: 24/7 escalation hotline directly connected to Managing Director Sweety R's operations desk.`,
    suggestedFollowups: ['Request emergency guard deployment', 'What is your escalation protocol?', 'Contact Operations Desk'],
    ctaType: 'email'
  },
  {
    id: 'locations-coverage',
    keywords: ['location', 'cities', 'where', 'service area', 'tamil nadu', 'trichy', 'chennai', 'coimbatore', 'madurai', 'salem', 'hosur', 'coverage'],
    title: 'Service Coverage Across Tamil Nadu & India',
    summary: 'Active operational hubs across all major industrial and commercial districts in Tamil Nadu.',
    detailedAnswer: `JSM Integrated Services operates regional teams and active client deployments across:

1. **Tiruchirappalli (Trichy)**: Regional Headquarters & Central Operations Hub.
2. **Chennai**: IT Corridors, Corporate Offices & Port Logistics.
3. **Coimbatore & Tirupur**: Textile, Engineering & Industrial Complexes.
4. **Madurai**: Healthcare, Educational Campuses & Retail Hubs.
5. **Salem & Erode**: Steel, Logistics & Manufacturing Facilities.
6. **Hosur & Krishnagiri**: Automotive, Electronics & Warehousing Parks.
7. **Rest of Tamil Nadu & South India**: Rapid site deployment for long-term commercial contracts.`,
    suggestedFollowups: ['Schedule site assessment in your city', 'Get in touch with Trichy HQ', 'Chat via Email'],
    ctaType: 'assessment'
  },
  {
    id: 'contact-details',
    keywords: ['contact', 'email', 'address', 'reach', 'office'],
    title: 'Official JSM Contact Channels',
    summary: '24/7 Active Operations Desk & Executive Office.',
    detailedAnswer: `You can reach JSM Integrated Services immediately through:

• **Email (Fastest):** jsmintegratedservices@outlook.com
• **Trichy Headquarters:** No.62/50, EVR Road, Puthur, Trichy - 620017, Tamil Nadu, India.
• **Executive Leadership**: Sweety R (Managing Director), Jan Steve Daniel R (CTO), Richard A (CEO).`,
    suggestedFollowups: ['Send an email inquiry', 'Book site assessment'],
    ctaType: 'assessment'
  }
];

export function findBestSemanticMatch(userQuery: string): KnowledgeTopic | null {
  const q = userQuery.toLowerCase().trim();
  if (!q) return null;

  let bestMatch: KnowledgeTopic | null = null;
  let highestScore = 0;

  for (const topic of JSM_ENTERPRISE_KNOWLEDGE) {
    let score = 0;
    for (const kw of topic.keywords) {
      if (q.includes(kw)) {
        score += kw.length > 4 ? 3 : 1.5;
      }
    }

    // Exact word boundary bonus
    const words = q.split(/\s+/);
    for (const w of words) {
      if (topic.keywords.includes(w)) {
        score += 2;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = topic;
    }
  }

  return highestScore >= 1.5 ? bestMatch : null;
}
