export const brandData = {
  name: "JSM Integrated Services",
  shortName: "JSM",
  legalEntityNote: "Originally established as JSMMANPOWER; rebranded as JSM Integrated Services for comprehensive multi-vertical operations.",
  tagline: "One Partner. Every Solution.",
  subTagline: "Disciplined Manpower, Security, Housekeeping & Integrated Facility Operations across Tamil Nadu & India.",
  establishedYear: "2024",
  inauguralProject: "Trichy International Airport Operations (2024)",
  
  leadership: [
    {
      name: "Sweety R",
      role: "Managing Director",
      bio: "Founding leader driving the strategic vision, operational governance, and statutory compliance of JSM Integrated Services."
    },
    {
      name: "Major A Richard D",
      role: "Operation-Head",
      bio: "Decorated ex-serviceman directing enterprise security deployments, tactical operations, supervisory audits, and field discipline across South India."
    },
    {
      name: "Jan Steve Daniel R",
      role: "Chief Technology Officer",
      bio: "Leading technology-enabled operations, digital attendance systems, OCR scanning digitization, and client command platforms."
    }
  ],

  contact: {
    email: "jsmintegratedservices@outlook.com",
    phone: "+919080863448",
    phoneDisplay: "+91 90808 63448",
    whatsapp: "919080863448",
    whatsappDisplay: "+91 90808 63448",
    address: "Plot No: 112, SF No 122, RVS Nagar, Kottapattu Post, Tiruchirappalli Distt, Tamil Nadu State, Pin: 620 021",
    primaryCity: "Tiruchirappalli (Trichy)",
    state: "Tamil Nadu",
    country: "India",
    pinCode: "620021",
    operatingCities: [
      "Tiruchirappalli (Trichy)",
      "Chennai",
      "Coimbatore",
      "Madurai",
      "Salem",
      "Tirunelveli",
      "Hosur",
      "Erode",
      "Thanjavur"
    ]
  },

  gstRegistrationDetails: {
    panLegalName: "JSM Integrated Services",
    commencementDate: "01.09.2026",
    businessPremises: "Own",
    fullAddress: "Plot No: 112, SF No 122, RVS Nagar, Kottapattu Post, Tiruchirappalli Distt, Tamil Nadu State, Pin: 620 021",
    email: "jsmintegratedservices@outlook.com",
    mobile: "+91-9080863448",
    bankAccountStatus: "Yes (Current Account)",
    constitutionOfBusiness: "Proprietorship Concern",
    taxpayerType: "Regular",
    compositionScheme: "No (Recommended for multi-service/tender model)"
  },

  sixCoreVerticals: [
    {
      code: "JSM-01",
      name: "Security & Protection Services",
      shortTitle: "Security",
      workforceType: "Ex-Servicemen (ESM) & Private (Pvt) Supervisors & Guards (Male & Female)",
      gstSac: "SAC 998525 – Guard Services",
      gstDescription: "Security and protection services including security guarding, industrial security, commercial security, security supervision and related security services, subject to applicable statutory licenses.",
      priority: "CORE",
      activities: ["Security guards (ESM & Pvt Male & Female)", "Industrial security", "Access control & gate management", "2:00 AM supervisor van audits", "Security consultancy"]
    },
    {
      code: "JSM-02",
      name: "Manpower & Workforce Solutions",
      shortTitle: "Manpower",
      workforceType: "Ex-Servicemen (ESM) & Private (Pvt) Supervisors & Workforce (Male & Female)",
      gstSac: "SAC 998513 – Contract Staffing Services",
      gstDescription: "Manpower and workforce solutions including contract staffing, manpower supply, outsourced workforce and related employment support services.",
      priority: "CORE",
      activities: ["Contract staffing", "Industrial line workforce", "Skilled technical trades", "Recruitment & payroll support", "100% EPF/ESIC statutory compliance"]
    },
    {
      code: "JSM-03",
      name: "Facility Management & Housekeeping",
      shortTitle: "Facility Management",
      workforceType: "Private (Pvt) Male & Female Housekeeping & Facility Marshals",
      gstSac: "SAC 998533 – Cleaning & Facility Support Services",
      gstDescription: "Facility management services including housekeeping, cleaning, facility support, office support and allied maintenance-support services.",
      priority: "CORE",
      activities: ["Mechanized ride-on auto scrubbers", "5-step closed-loop hygiene protocol", "Corporate & healthcare deep sanitization", "Solid waste management"]
    },
    {
      code: "JSM-04",
      name: "Tender, Procurement, Seller & Business Support",
      shortTitle: "Tender & Procurement",
      workforceType: "Tender & Commercial Contracts Team",
      gstSac: "Appropriate SAC / HSN based on actual contract / supply",
      gstDescription: "Tender management, procurement support, documentation, bid preparation support, contract administration and business support services.",
      priority: "CORE",
      activities: ["GeM Seller listing & bidding", "Tamil Nadu e-Procurement tenders", "Central Government & PSU supply", "Vendor onboarding & PO fulfilment"]
    },
    {
      code: "JSM-05",
      name: "Scanning, Digitalization & IT Services",
      shortTitle: "Scanning & IT",
      workforceType: "Digital Operations & Technical Specialists",
      gstSac: "Applicable IT/data-processing SAC (NIC 62/63/82)",
      gstDescription: "Document scanning, digitization, OCR, indexing, data entry, digital archiving, document management, data processing, IT support and related digital services.",
      priority: "CORE",
      activities: ["Bulk document digitization (JSM-05.2)", "OCR conversion & indexing (JSM-05.3)", "Data entry & digital archiving (JSM-05.5)", "IT & network support (JSM-05.12)"]
    },
    {
      code: "JSM-06",
      name: "CSC & Digital Citizen Services",
      shortTitle: "CSC / Citizen Services",
      workforceType: "CSC & e-Governance Facilitation Officers",
      gstSac: "Applicable SAC for actual digital facilitation service",
      gstDescription: "Digital citizen facilitation and authorised CSC-related services including online application assistance, digital form support, scanning, printing, document upload and other permitted digital facilitation services.",
      priority: "CORE",
      activities: ["Online government application assistance", "Digital form filling & status tracking", "e-Governance & citizen digital services", "Printing, scanning, lamination & bill payment facilitation"]
    }
  ],

  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://www.jsmintegratedservices.com",

  compliance: {
    psaraStatus: "PSARA Compliant (Private Security Agencies Regulation Act, 2005)",
    psaraAuthority: "Controlling Authority, Home Department, Government of Tamil Nadu",
    statutoryCompliance: "100% PF, ESI, Minimum Wages Act & Labour Department Registered",
    policeVerification: "Mandatory Aadhaar & Police Verification for All Deployed Guards",
    trainingStandard: "Mandatory 5-Day Pre-Deployment Security Syllabus as per PSARA Norms",
  },
  
  corePillars: [
    {
      title: "One Accountable Partner",
      description: "Eliminate vendor fragmentation. Manage security, housekeeping, staffing, and facility maintenance under one unified, single-point contact."
    },
    {
      title: "Disciplined Personnel",
      description: "Rigorous 5-day structured induction training, verified identity checks, strict grooming codes, and shift accountability."
    },
    {
      title: "Documented SOPs",
      description: "Service is not a promise; it is a process. Every deployment operates under transparent checklists, shift handovers, and inspection logs."
    },
    {
      title: "Transparent Reporting",
      description: "Real-time attendance logs, supervisor round registers, verified incident escalation, and prompt monthly audit reports."
    },
    {
      title: "Technology Enablement",
      description: "Digital attendance tracking, QR-code patrol checkpoints, automated billing, and instant email operational escalations."
    },
    {
      title: "Founder-Led Responsiveness",
      description: "Direct executive accountability. Our leadership team actively reviews operational quality and responds swiftly to client requirements."
    }
  ]
};
