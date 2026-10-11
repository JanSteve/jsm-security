export interface BdeInternRole {
  id: string;
  title: string;
  roleType: 'Inside Sales (Remote Calling)' | 'Field Sales (On-Ground Acquisition)';
  workMode: 'Remote (Tamil Nadu)' | 'On-Ground / Field (Chennai or Trichy)';
  locations: string;
  duration: string;
  stipendType: string;
  compensationDetails: string;
  openings: number;
  badge: string;
  summary: string;
  keyResponsibilities: string[];
  dailyWorkflow: string[];
  whatYouWillPitch: string[];
  requirements: string[];
  perks: string[];
  idealFor: string;
}

export interface CareerRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  whatWeOffer: string[];
}

export const internshipPerksOverview = [
  {
    title: "Leadership-Provided Daily Leads",
    description: "Zero blind searching. Company leadership supplies pre-verified phone numbers and business profiles every single morning.",
    icon: "Target"
  },
  {
    title: "Lucrative Deal Closure Commissions",
    description: "Uncapped per-deal cash incentives for every physical security, facility, or digital automation deal procured.",
    icon: "TrendingUp"
  },
  {
    title: "1-on-1 Founder & CTO Mentorship",
    description: "Daily coaching from CTO R Jan Steve Daniel on commercial objection handling, consultative selling, and deal mechanics.",
    icon: "Award"
  },
  {
    title: "Verified LOR & Full-Time PPO Track",
    description: "Official Letter of Recommendation (LOR), Internship Certificate, and fast-track Pre-Placement Offer for full-time BDE roles.",
    icon: "FileCheck"
  }
];

export const internshipWorkflowSteps = [
  {
    step: "01",
    title: "Morning Lead Dispatch",
    desc: "Leadership hands you targeted prospect phone numbers (clinics, salons, restaurants, factories) with background context."
  },
  {
    step: "02",
    title: "Outreach & Pitching",
    desc: "Dial prospects remotely or walk in on-ground to demonstrate JSM's physical and smart digital solutions."
  },
  {
    step: "03",
    title: "Discovery & Qualification",
    desc: "Uncover pain points (negative reviews, missed calls, high Swiggy fees, staff shortages) and quantify ROI."
  },
  {
    step: "04",
    title: "Executive Handoff & Closure",
    desc: "Lock in merchant commitment and connect them with leadership to finalize commercial contracts and close the deal."
  }
];

export const openInternshipRoles: BdeInternRole[] = [
  {
    id: "bde-intern-remote-calling",
    title: "Business Development Executive Intern (Inside Sales & Remote Outreach)",
    roleType: "Inside Sales (Remote Calling)",
    workMode: "Remote (Tamil Nadu)",
    locations: "Remote (Chennai or Trichy candidates preferred)",
    duration: "3 to 6 Months (Flexible Tenure)",
    stipendType: "Unpaid Internship + Performance Deal Commissions",
    compensationDetails: "Unpaid baseline with generous per-deal cash closing incentives, performance milestone bonuses, official LOR, and direct Pre-Placement Offer (PPO) pathway.",
    openings: 1,
    badge: "Inside Sales & Tele-Calling",
    summary: "Are you an articulate, confident communicator with a passion for high-velocity sales? We are seeking 1 Remote BDE Intern to spearhead telephonic outreach across Chennai, Trichy, and Tamil Nadu. Every day, leadership will provide you with verified lead lists and phone numbers of business owners (clinics, diagnostic labs, salons, family restaurants, and commercial firms). Your mission: dial decision-makers, deliver high-impact value pitches, qualify requirements, warm up prospects, and secure deal commitments before handing them to our Founder/CTO for final contract closure.",
    keyResponsibilities: [
      "Conduct structured outbound calls daily from verified lead sheets provided by leadership.",
      "Deliver punchy, value-first phone pitches introducing JSM's physical operations and smart automation tools.",
      "Engage business owners, clinic managers, and proprietors in consultative discovery conversations.",
      "Overcome initial skepticism, answer product queries, and communicate clear return on investment (ROI).",
      "Qualify prospect interest, capture specific business requirements, and schedule closing calls for the Founder/CTO.",
      "Log daily call outcomes, follow-up dates, and feedback into the central sales CRM tracker."
    ],
    dailyWorkflow: [
      "9:30 AM: Morning alignment with leadership & download of daily verified lead lists (40-60 target numbers).",
      "10:00 AM - 1:00 PM: High-focus outbound telephonic outreach and discovery calls.",
      "2:00 PM - 4:30 PM: Follow-up calls, WhatsApp pitch deck dispatches, and prospect requirement mapping.",
      "4:30 PM - 5:30 PM: Lead qualification handoff meetings with Founder/CTO for hot prospects ready to close.",
      "5:30 PM - 6:00 PM: Daily pipeline review and review of deal commissions earned."
    ],
    whatYouWillPitch: [
      "Smart Review Filter NFC Standees: Doubling 5-star Google Maps reviews while routing 1-3 star complaints to WhatsApp.",
      "Missed-Call to WhatsApp Lead Recovery: Recovering ₹25,000+ monthly in lost inquiries within 5 seconds.",
      "WhatsApp Direct Table Ordering QR Menus: Zero-commission dining menus eliminating 30% aggregator commissions.",
      "Live Clinic Waiting Token Tracker: Real-time patient queue updates eliminating reception chaos.",
      "Corporate Security & Facility Manpower: Armed/unarmed guard platoons, mechanized housekeeping, and industrial staffing."
    ],
    requirements: [
      "Enrolled in or recent graduate of an undergraduate/postgraduate degree (BBA, B.Com, B.E./B.Tech, MBA, or any discipline).",
      "Exceptional verbal communication skills in Tamil and working fluency in English.",
      "Unafraid of the telephone: highly energetic, resilient, polite, and persistent telephone demeanor.",
      "Strong active listening skills with the ability to identify client pain points quickly.",
      "Disciplined self-starter with reliable personal laptop/smartphone and high-speed internet connection.",
      "Hungry to learn B2B deal negotiation and sales psychology directly from experienced founders."
    ],
    perks: [
      "Attractive cash commission on every deal closed and signed from your qualified pipeline.",
      "Official JSM Internship Certificate of Completion upon 3–6 months tenure.",
      "Personalized, verified Letter of Recommendation (LOR) signed by the Founder & CTO.",
      "Direct pathway to a full-time Pre-Placement Offer (PPO) as Full-Time Business Development Executive.",
      "Real-world sales experience pitching both high-ticket physical contracts and high-growth digital tech."
    ],
    idealFor: "Ambitious students or freshers who love talking to people over the phone, want to master cold calling & B2B sales psychology, and want to build a standout sales resume."
  },
  {
    id: "bde-intern-field-sales",
    title: "Field Business Development Executive Intern (On-Ground Merchant Acquisition)",
    roleType: "Field Sales (On-Ground Acquisition)",
    workMode: "On-Ground / Field (Chennai or Trichy)",
    locations: "Chennai (OMR, Anna Nagar, T. Nagar) OR Tiruchirappalli (Thillai Nagar, Cantonment, Central)",
    duration: "3 to 6 Months (Flexible Tenure)",
    stipendType: "Unpaid Internship + Field Incentives + Deal Commissions",
    compensationDetails: "Unpaid baseline with generous per-signed-merchant cash commissions, travel/conveyance expense support, official LOR, and priority PPO for City Sales Lead.",
    openings: 1,
    badge: "Field Sales & Merchant Acquisition",
    summary: "Do you thrive in the real world meeting business owners face-to-face? We are hiring 1 Field BDE Intern to hit the ground running across high-density commercial markets in Chennai or Trichy. Armed with live product samples (such as our Smart NFC Review Filter Standees and WhatsApp QR Ordering demos), you will walk into local businesses—salons, clinics, specialty cafes, auto detailing garages, wedding venues, and commercial complexes. You will give live in-person demos, build instant rapport with store owners, secure deals on the spot, and hand off client requirements to leadership for contract execution.",
    keyResponsibilities: [
      "Execute territory coverage across prime commercial hubs in Chennai (OMR, Anna Nagar, T. Nagar) or Trichy (Thillai Nagar, Cantonment).",
      "Conduct 15 to 20 in-person walk-ins daily to meet business proprietors, clinic directors, and store managers.",
      "Demonstrate live smart hardware on-the-spot (tap the NFC standee on the owner's phone to prove instant Google Review capture).",
      "Diagnose business vulnerabilities (poor Google ratings, lost phone enquiries, high delivery commissions, hygiene/guarding needs).",
      "Pitch JSM's integrated value proposition, procure commercial intent, and capture contract requirements.",
      "Secure immediate deals and coordinate with leadership to execute service agreements and collect onboarding deposits."
    ],
    dailyWorkflow: [
      "10:00 AM: Territory planning & collection of demonstration kits (NFC standees, QR samples, brochure dossiers).",
      "10:30 AM - 1:30 PM: Morning commercial merchant visits & live on-ground product demonstrations.",
      "2:30 PM - 5:00 PM: Afternoon visits to clinics, diagnostic centers, automotive workshops, and restaurants.",
      "5:00 PM - 6:00 PM: Closing walk-ins, collecting warm owner contacts, and logging deal commitments with Founder/CTO.",
      "6:00 PM: Daily debrief, commission tracking, and mapping tomorrow's commercial street route."
    ],
    whatYouWillPitch: [
      "Smart Review Filter NFC Standee (Live Demo Kit): Physical standee that business owners instantly test on their own phone.",
      "WhatsApp Direct Table Ordering QR Standees: Proven solution to eliminate 30% food aggregator deductions.",
      "WhatsApp Digital Loyalty Punch Cards: Instant loyalty capture for premium grooming salons and bakeries.",
      "Live Clinic Waiting Token System: Clean waiting room technology for high-volume doctors.",
      "Commercial Facility Management & Security: Physical security guard Platoons and mechanized housekeeping contracts."
    ],
    requirements: [
      "Must be based locally in Chennai or Tiruchirappalli (Trichy) with reliable local two-wheeler transit.",
      "Charismatic, confident, and professional in-person presence with neat business-casual attire.",
      "Fluent in spoken Tamil; natural ease in striking up conversations with shop owners and managers.",
      "High stamina and enthusiasm for on-ground fieldwork and door-to-door commercial pitching.",
      "Strong observational skills: spotting businesses that clearly suffer from negative reviews or poor signage.",
      "Goal-driven attitude: passionate about closing real-world deals and pocketing substantial commission payouts."
    ],
    perks: [
      "High-ticket cash commissions paid on every onboarded merchant and signed physical contract.",
      "Travel and fuel conveyance allowance to support daily territory field visits.",
      "Official JSM Internship Certificate of Completion upon 3–6 months tenure.",
      "Personalized Letter of Recommendation (LOR) highlighting proven on-ground commercial acumen.",
      "Fast-track Pre-Placement Offer (PPO) for Full-Time Territory Sales Lead / City Commercial Head.",
      "Hands-on merchant acquisition experience that sets you apart from 99% of peers sitting behind desks."
    ],
    idealFor: "Energetic individuals who love being on the move, enjoy meeting store owners and doctors face-to-face, and want to master the art of in-person dealmaking."
  }
];

// Open roles mapped for standard interfaces and schema compatibility
export const openRoles: CareerRole[] = openInternshipRoles.map((intern) => ({
  id: intern.id,
  title: intern.title,
  department: "Business Development & Commercial Growth",
  location: intern.locations,
  type: `Internship (Unpaid + Performance Commission) • ${intern.duration}`,
  experience: "Fresher / College Student / Ambitious Go-Getter",
  description: intern.summary,
  responsibilities: intern.keyResponsibilities,
  requirements: intern.requirements,
  whatWeOffer: intern.perks
}));
