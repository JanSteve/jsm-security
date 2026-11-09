/**
 * JSM Integrated Services - Blog Knowledge Bank & Combinatorial Matrix
 * Authoritative regional B2B dataset for South Indian industrial corridors.
 */

export const AUTHORS = {
  devadoss: {
    name: "Major AR Devadoss (Retd.)",
    role: "Head of Operations & Audits, JSM Integrated Services",
    avatar: "/images/leadership/major-ar-devadoss.jpg",
    bio: "Indian Army Veteran commanding operational vigilance, PSARA statutory compliance, and 02:00 AM Active Night Audits across Tamil Nadu and Karnataka industrial corridors."
  },
  daniel: {
    name: "R Jan Steve Daniel",
    role: "Chief Technical Officer, JSM Integrated Services",
    avatar: "/images/leadership/r-jan-steve-daniel.jpg",
    bio: "Systems architect overseeing IP CCTV surveillance topologies, biometric access control integration, and WhatsApp Business API automation."
  },
  sweety: {
    name: "Sweety J",
    role: "Proprietor & Managing Director, JSM Integrated Services",
    avatar: "/images/leadership/sweety-j.jpg",
    bio: "Institutional contractor directing facility governance, AAI civil aviation concourse operations, and 100% EPF/ESIC statutory compliance frameworks."
  }
};

export const CLUSTERS = {
  cctv: {
    id: "cctv",
    name: "CCTV Surveillance & Industrial Access Control",
    category: "CCTV & Access Control",
    defaultAuthor: "daniel",
    coverImage: "/images/trichy-airport/trichy_airport_night_security_post.jpg",
    primaryServices: [
      { name: "PSARA-licensed industrial security forces", url: "/services/private-security" },
      { name: "secure records and IT systems digitization", url: "/services/scanning-digitalization-it" },
      { name: "custom enterprise security applications", url: "/services/custom-software-web-apps" }
    ],
    keywordPool: [
      "commercial IP CCTV surveillance South India",
      "industrial biometric access control Tamil Nadu",
      "AI video analytics factory security Chennai",
      "turnstile barrier gate management Coimbatore",
      "Tamil Nadu Factories Act CCTV compliance",
      "ANPR automated number plate recognition Bangalore Hosur",
      "warehouse perimeter intrusion detection Trichy",
      "centralized security operations center NVR storage"
    ],
    coreProtocols: [
      "Multi-Sensor IP Camera Topology with H.265+ Compression and 4K Perimeter FOV Calibration",
      "Biometric Turnstile & Flap Barrier Integration with Anti-Passback Hardware Logic",
      "Automated Number Plate Recognition (ANPR) at Inward/Outward Industrial Weighbridges",
      "Cloud-Synchronized NVR Storage Arrays with RAID-6 Redundancy and 45-Day Archive Retention",
      "AI Deep Learning Intrusion Analytics (Line-Crossing, Loitering, and Camera Tampering Alarms)"
    ],
    specifications: [
      { parameter: "Optical Resolution & Sensor", specification: "4MP to 8MP (4K) Starlight Ultra-Low-Light CMOS Sensors" },
      { parameter: "Video Compression Standard", specification: "H.265+ Smart Codec (65% bandwidth and storage optimization)" },
      { parameter: "Access Control Verification", specification: "Dual-Modal Facial Recognition (<0.3s) + Optical Fingerprint + RFID" },
      { parameter: "Archive Storage Architecture", specification: "Enterprise RAID-6 NVR Chassis with Hot-Swappable Surveillance HDDs" },
      { parameter: "Power & Lightning Hardening", specification: "Industrial IEEE 802.3at PoE+ Switches with 6kV Surge Suppression" },
      { parameter: "Response Integration", specification: "Real-time relay trigger to Central Operations Desk and Armed Patrol" }
    ],
    faqs: [
      {
        question: "What are the statutory CCTV footage retention mandates for industrial facilities in Tamil Nadu?",
        answer: "Under the Tamil Nadu CCTV Surveillance Rules and the Tamil Nadu Factories Rules, commercial and industrial establishments with over 50 workers or hazardous machinery must maintain continuous 30 to 45 days of unedited, timestamped video footage stored in tamper-proof RAID storage."
      },
      {
        question: "Why does standalone electronic CCTV fail without physical security guard interception?",
        answer: "CCTV cameras are passive recording instruments. Without disciplined physical security guards on-site to respond within 60 seconds to tripwire alerts and perimeter breaches, video footage merely documents loss after inventory or equipment has already left the compound."
      },
      {
        question: "Can biometric access control systems eliminate buddy punching and contractor time fraud?",
        answer: "Yes. Biometric turnstiles equipped with 3D facial recognition and anti-passback logic prevent employees and contract labourers from clocking in for absent peers. JSM synchronizes gate biometric logs directly with EPF/ESIC payroll systems to ensure 100% attendance transparency."
      },
      {
        question: "How does JSM handle CCTV and access control maintenance across multi-site facilities?",
        answer: "JSM provides comprehensive Annual Maintenance Contracts (AMC) with guaranteed 4-hour SLA response for camera offline alerts, scheduled fortnightly lens and housing de-dusting, and weekly UPS battery health verifications across South Indian corridors."
      }
    ]
  },
  security: {
    id: "security",
    name: "Commercial Security Guards & Ex-Servicemen Leadership",
    category: "Commercial Security",
    defaultAuthor: "devadoss",
    coverImage: "/images/real_jsm_airport_terminal_platoon.jpg",
    primaryServices: [
      { name: "PSARA-compliant commercial security guarding", url: "/services/private-security" },
      { name: "100% EPF/ESIC compliant contract manpower", url: "/services/manpower" },
      { name: "institutional security and facility supply", url: "/services/tender-procurement-supply" }
    ],
    keywordPool: [
      "commercial security guard agency Tamil Nadu",
      "ex-servicemen industrial security contractors Chennai",
      "PSARA licensed security services Coimbatore",
      "24/7 industrial factory guards Trichy",
      "2-hour relief standby security force Bangalore Hosur",
      "police verified security guards Madurai",
      "material gate pass security management Salem",
      "EPF ESIC compliant security contractor South India"
    ],
    coreProtocols: [
      "Military-Disciplined Daily Muster Drill and Shift Handover Briefings",
      "Digital Material Gate Pass Verification (Returnable & Non-Returnable Challan Tracking)",
      "Strict Inward Raw Material and Outward Finished Goods Truck Inspection Checklists",
      "02:00 AM Active Night Audits with Roving Mobile Supervisory Patrol Vans",
      "120-Minute Emergency Relief SLA Backed by Regional Reserve Platoon Squads"
    ],
    specifications: [
      { parameter: "Statutory Security Licensing", specification: "Valid Form V License under Tamil Nadu PSARA Rules 2008 & Karnataka PSARA" },
      { parameter: "Supervisory Leadership", specification: "Indian Armed Forces Veterans (Ex-Servicemen Command & Audit)" },
      { parameter: "Vetting & Verification", specification: "100% District Police Background Verification + Permanent Address KYC" },
      { parameter: "Mandatory Training Standard", specification: "160 Hours (Home Ministry / PSARA Syllabus: Drill, Fire, First Aid, Gate SOP)" },
      { parameter: "Relief Standby Guarantee", specification: "Guaranteed replacement within 2 hours from Central Operations Desk" },
      { parameter: "Statutory Wage Remittance", specification: "100% ECR and TRRN Bank Challan proofs submitted with monthly invoices" }
    ],
    faqs: [
      {
        question: "What legal liabilities do plant owners face when hiring non-PSARA licensed security agencies?",
        answer: "Under Section 20 of the Private Security Agencies (Regulation) Act 2005, engaging an unlicensed security agency exposes principal employers to substantial financial penalties and legal prosecution. Furthermore, the principal employer becomes co-liable for any criminal misconduct committed by unvetted personnel."
      },
      {
        question: "How does JSM Integrated Services eliminate co-employer statutory liability for clients?",
        answer: "JSM adheres strictly to statutory transparent billing. Every monthly invoice is accompanied by employee-wise Electronic Challan cum Return (ECR) receipts for EPF, ESIC challan payment tokens (TRRN), and certified bank disbursement records, completely shielding clients from labor inspections."
      },
      {
        question: "What happens if a security guard is absent or falls ill during a night shift?",
        answer: "Under JSM's contractual 2-Hour Relief Standby SLA, our 24/7 Central Operations Command dispatches a fully uniform-vetted, trained replacement guard from our roving reserve squad within 120 minutes, ensuring your gates are never left unmanned."
      },
      {
        question: "How does Ex-Servicemen military leadership impact commercial factory security?",
        answer: "Under the direct command of Indian Army Veteran Major AR Devadoss, guards undergo rigorous physical drill, anti-pilferage training, and strict operational discipline. Roving supervisors conduct surprise 02:00 AM audits to ensure perimeter vigilance is maintained around the clock."
      }
    ]
  },
  facility: {
    id: "facility",
    name: "Facility Management & Mechanized Housekeeping",
    category: "Facility Management",
    defaultAuthor: "sweety",
    coverImage: "/images/trichy-airport/trichy_airport_concourse_autoscrubber_cleaning.jpg",
    primaryServices: [
      { name: "commercial mechanized housekeeping and floor care", url: "/services/housekeeping" },
      { name: "statutory industrial staffing and skilled manpower", url: "/services/manpower" },
      { name: "institutional facility procurement and supply", url: "/services/tender-procurement-supply" }
    ],
    keywordPool: [
      "commercial housekeeping services Chennai OMR",
      "mechanized industrial floor scrubbing Coimbatore",
      "corporate facility management Bangalore Hosur",
      "hospital NABH hygiene cleaning services Trichy",
      "5-step industrial sanitation protocol Salem",
      "cleanroom disinfection services South India",
      "ride-on scrubber industrial cleaning Madurai",
      "Factories Act Section 11 industrial sanitation"
    ],
    coreProtocols: [
      "5-Step Colour-Coded Cross-Contamination Prevention Hygiene Protocol",
      "Heavy-Duty Mechanized Ride-On and Walk-Behind Auto-Scrubber Deployment",
      "Eco-Certified Industrial Chemical Dilution Systems (Diversey/Taski Standard)",
      "Daily Preventive High-Level Glass, Truss, and HVAC Louver Dusting",
      "NABH/ISO-Compliant Deep Disinfection & Bio-Load Sterilization Routines"
    ],
    specifications: [
      { parameter: "Floor Scrubbing Capability", specification: "Heavy-Duty Walk-Behind & Ride-On Auto-Scrubbers (2,500 - 4,500 m²/hr)" },
      { parameter: "Sanitization Chemistry", specification: "Certified Hospital-Grade Diversey Taski R-Series Formulations (R1 to R9)" },
      { parameter: "Cross-Contamination Control", specification: "Colour-Coded Microfiber System (Red: Restrooms, Blue: General, Yellow: Lab)" },
      { parameter: "Statutory Hygiene Compliance", specification: "Factories Act 1948 Section 11 Cleanliness and Periodic White-Washing Registers" },
      { parameter: "Consumable Inventory Auditing", specification: "Automated digital stock ledger with 15-day buffer threshold" },
      { parameter: "Supervisory Quality Index", specification: "Digital ATP surface swab bioluminescence audits and daily client sign-offs" }
    ],
    faqs: [
      {
        question: "How does mechanized auto-scrubbing reduce industrial operating costs compared to manual mopping?",
        answer: "Manual mop-and-bucket cleaning merely spreads dirt across porous concrete, leaves slip-hazard moisture for hours, and requires 4 times more labor. Industrial walk-behind auto-scrubbers scrub, wash, and vacuum-dry floors in a single pass, cutting chemical usage by 35% and labor hours by 50% while eliminating wet floor slip liabilities."
      },
      {
        question: "What compliance standards must contract housekeeping satisfy under the Factories Act 1948?",
        answer: "Under Section 11 of The Factories Act, 1948, all factory floors, workrooms, passages, and stairways must be cleaned daily using disinfectants, refuse must be cleared continuously, and records of periodic lime-washing or mechanical scrubbing must be maintained in Form 7."
      },
      {
        question: "How does JSM manage high-traffic public facility maintenance such as airports?",
        answer: "At Tiruchirappalli International Airport, JSM manages round-the-clock concourse hygiene across thousands of square meters of polished granite. Our teams deploy synchronized teams using commercial ride-on scrubbers and electrostatic sprayers during flight lulls to maintain world-class cleanliness."
      },
      {
        question: "Are your housekeeping staff covered under mandatory EPF and ESIC statutory benefits?",
        answer: "Yes, 100% of JSM facility personnel are enrolled under EPF and ESIC with individualized UAN numbers and active biometric insurance cards. We furnish audited monthly compliance certificates with every invoice."
      }
    ]
  },
  automation: {
    id: "automation",
    name: "Smart Digital Automation (WhatsApp API & Smart NFC)",
    category: "Digital Systems",
    defaultAuthor: "daniel",
    coverImage: "/images/real_jsm_printed_card.jpg",
    primaryServices: [
      { name: "WhatsApp Business API automated workflows", url: "/services/whatsapp-automation-crm" },
      { name: "smart NFC Google review filter standees", url: "/services/nfc-review-standees" },
      { name: "real-time OPD clinic token queue tracker", url: "/services/clinic-token-tracker" },
      { name: "contactless QR restaurant table ordering", url: "/services/qr-table-ordering" }
    ],
    keywordPool: [
      "WhatsApp Business API CRM automation Trichy",
      "smart NFC Google review filter standee Tamil Nadu",
      "QR code restaurant table ordering Chennai",
      "real-time clinic token tracker Coimbatore",
      "missed call lead recovery system Bangalore",
      "automated WhatsApp customer support Hosur",
      "digital reputation management NFC standee South India",
      "interactive queue management software Madurai"
    ],
    coreProtocols: [
      "Meta-Verified WhatsApp Business Cloud API Integration with Webhook Architecture",
      "Smart Dynamic NFC Dual-Path Review Routing (5-Star Google Review vs. Private Feedback)",
      "Real-Time Patient & Customer Queue Telemetry with Live WhatsApp Status Pushes",
      "Instant Missed-Call Lead Capture with Sub-10 Second Automated WhatsApp Callback",
      "Encrypted Cloud Webhook Pipeline with 99.9% Uptime and SOC-2 Compliant Storage"
    ],
    specifications: [
      { parameter: "API Infrastructure", specification: "Meta Cloud API v19.0+ with Asynchronous Webhook Architecture" },
      { parameter: "Hardware Construction", specification: "Brushed Acrylic & Titanium NFC Counter Standees with NTAG215 High-Frequency Chips" },
      { parameter: "Queue Synchronization Speed", specification: "Sub-second WebSocket state distribution to digital TV displays and mobile browsers" },
      { parameter: "Review Filtering Logic", specification: "Dynamic logic gate: 4-5 stars direct to Google Maps; 1-3 stars routed to executive WhatsApp" },
      { parameter: "Message Delivery SLA", specification: "<3 seconds latency for automated booking confirmations and invoice notifications" },
      { parameter: "Security & Encryption", specification: "End-to-end 256-bit TLS encryption with zero third-party data broker sharing" }
    ],
    faqs: [
      {
        question: "How does the Smart NFC Google Review standee protect business reputation?",
        answer: "When a customer taps their smartphone against the JSM NFC standee, an intuitive web interface prompts for a star rating. If the customer rates 5 stars, they are instantly redirected to your Google Maps review page. If they rate 1 to 3 stars, they are directed to a private management feedback form on WhatsApp, allowing you to resolve complaints before negative reviews appear online."
      },
      {
        question: "Can WhatsApp Business API automate industrial order tracking and appointment bookings?",
        answer: "Yes. JSM integrates WhatsApp API with internal ERP and CRM databases. Customers and procurement officers can check material dispatch status, book clinical appointments, or request equipment service by typing simple keywords, operating 24/7 without extra call center staff."
      },
      {
        question: "Do customers need to download a separate mobile application to use the clinic queue or QR ordering?",
        answer: "No. All JSM digital systems operate natively in mobile browsers or via standard WhatsApp chats. Patients and diners simply scan an encrypted QR code or tap an NFC tag to view real-time queue position or place orders instantly."
      },
      {
        question: "How reliable is the automated WhatsApp missed-call lead recovery system?",
        answer: "The system captures incoming missed calls via a cloud telephony gateway and instantly triggers a personalized WhatsApp message with your digital catalog or booking link within 8 seconds, recovering up to 40% of lost commercial inquiries."
      }
    ]
  },
  talent: {
    id: "talent",
    name: "Executive Talent Acquisition & Senior Leadership Recruitment",
    category: "Talent Acquisition",
    defaultAuthor: "daniel",
    coverImage: "/images/leadership/r-jan-steve-daniel.jpg",
    primaryServices: [
      { name: "Senior Talent Acquisition (₹12 LPA - ₹1 Cr)", url: "/services/talent-acquisition" },
      { name: "Executive Search & Board Advisory", url: "/services/executive-search" },
      { name: "100% Contingency Success Fee Model", url: "/services/contingency-recruitment" }
    ],
    keywordPool: [
      "executive talent acquisition mediator India",
      "senior leadership recruitment ₹12 LPA to ₹1 Cr",
      "contingency executive search firm Tamil Nadu",
      "CXO headhunting and talent mediation Karnataka",
      "plant operations director hiring Maharashtra",
      "VP Engineering technical talent acquisition Delhi NCR",
      "senior management recruitment Gujarat manufacturing",
      "executive placement 90-day replacement guarantee",
      "plant head hiring chennai sriperumbudur 2026",
      "automotive tier 1 operations head hosur salary benchmark",
      "six sigma black belt vp quality recruitment tamil nadu",
      "ev powertrain manufacturing general manager bangalore",
      "contract logistics warehousing operations director coimbatore",
      "precision machining die casting plant manager pune chakan",
      "contingency headhunter 8.33 fee zero advance retainer",
      "leadership talent mediation 90-day replacement warranty"
    ],
    coreProtocols: [
      "15-Minute Mandate Calibration to lock role competencies and compensation benchmarks",
      "Confidential Multi-State Talent Mapping across active corporate networks",
      "Pre-Vetting & Competency Screening delivering 3 finalist dossiers within 7 business days",
      "100% Contingency Success Model with zero advance retainers and payment strictly upon joining",
      "90-Day Free Replacement Assurance protecting client executive investments"
    ],
    specifications: [
      { parameter: "Target Compensation Horizon", specification: "₹12 LPA to ₹1 Cr Annual Fixed Gross CTC" },
      { parameter: "Geographic Coverage", specification: "Tamil Nadu, Karnataka, Maharashtra, Delhi, Madhya Pradesh, Gujarat" },
      { parameter: "Commercial Invariant", specification: "Zero Upfront Retainer (100% Pure Contingency on Joining)" },
      { parameter: "Candidate Delivery Turnaround", specification: "3 Pre-Vetted Finalist Dossiers within 7 Business Days" },
      { parameter: "Replacement Policy", specification: "90-Day Free Replacement Search Assurance" },
      { parameter: "Screening Methodology", specification: "Bespoke Behavioral Competency + P&L Verification + Reference Audits" }
    ],
    faqs: [
      {
        question: "How does JSM's talent mediation model differ from traditional executive search retainers?",
        answer: "Traditional headhunting agencies charge 30% to 50% upfront non-refundable retainers before sending a single resume. JSM operates as a pure mediator on a 100% contingency success model: we charge zero upfront fees. Our commercial fee is invoiced strictly after your selected executive reports on Day 1."
      },
      {
        question: "What happens if a placed executive resigns or underperforms within the probation period?",
        answer: "Every executive placement by JSM is backed by our standard 90-day replacement policy. If the selected candidate departs or fails to meet verified benchmarks within 90 calendar days of joining, our desk immediately initiates a priority replacement search at zero extra fee."
      },
      {
        question: "Which states does JSM Integrated Services cover for senior executive search?",
        answer: "JSM actively handles leadership mandates across 6 primary industrial and corporate states: Tamil Nadu, Karnataka, Maharashtra, Delhi NCR, Madhya Pradesh, and Gujarat, covering both metropolitan headquarters and remote industrial manufacturing belts."
      },
      {
        question: "How long does it take to receive shortlisted leadership profiles?",
        answer: "Following our initial mandate calibration briefing, our executive sourcing desk delivers a dossier of 3 thoroughly vetted, confidential candidates ready for client interviews within 7 business days."
      }
    ]
  }
};

export const LOCATIONS = {
  trichy: {
    slug: "trichy",
    city: "Tiruchirappalli (Trichy)",
    state: "Tamil Nadu",
    role: "Central Command Headquarters & Operations Base",
    industrialZones: [
      "Thuvakudi & BHEL Fabrication Industrial Corridor",
      "Tiruchirappalli International Airport Concourse & Cargo Complex",
      "Viralimalai & Mathur Automotive Component Manufacturing Belt",
      "Cantonment & Thillai Nagar Commercial & Healthcare Enclaves"
    ],
    localContext: "As JSM Integrated Services' central headquarters, Trichy coordinates 24/7 rapid deployment platoons, round-the-clock control room surveillance, and daily 02:00 AM mobile supervisory audits across Central Tamil Nadu.",
    corridorAnchor: "Central Tamil Nadu Manufacturing & Logistics Nexus",
    internalLink: "/locations/trichy"
  },
  chennai: {
    slug: "chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    role: "Automotive, Electronics & IT Corridor Detachments",
    industrialZones: [
      "Sriperumbudur-Oragadam Automotive & Electronics SEZ Corridor",
      "Old Mahabalipuram Road (OMR) & Guindy Technology Parks",
      "Ambattur & Maraimalai Nagar Industrial Estates",
      "Madhavaram Multi-Modal Logistics & Warehousing Hub"
    ],
    localContext: "Serving tier-1 multinational automotive plants, electronics OEMs, and multi-tenant tech parks across Chennai requiring strict anti-theft gate controls, turnstile integrations, and PSARA-certified bilingual guards.",
    corridorAnchor: "Chennai Metropolitan & Industrial Belt",
    internalLink: "/locations/chennai"
  },
  coimbatore: {
    slug: "coimbatore",
    city: "Coimbatore",
    state: "Tamil Nadu",
    role: "Engineering, Foundries & Precision Manufacturing Hub",
    industrialZones: [
      "Saravanampatti & Peelamedu IT SEZ Corridor",
      "Kurichi & SIDCO Heavy Engineering & Foundry Belts",
      "Ganapathy & Eachanari Industrial Machinery Hubs",
      "Tirupur Textile Export & Garment Manufacturing Outskirts"
    ],
    localContext: "Providing heavy-duty perimeter guarding, metal scrap pilferage protection, and mechanized factory auto-scrubbing for Coimbatore's precision engineering foundries and high-throughput textile mills.",
    corridorAnchor: "Kongu Region Engineering & Textile Corridor",
    internalLink: "/locations/coimbatore"
  },
  hosur: {
    slug: "hosur",
    city: "Hosur",
    state: "Tamil Nadu",
    role: "Automotive, EV & Electronics SIPCOT Border Corridor",
    industrialZones: [
      "SIPCOT Industrial Complexes Phase I, II, & III",
      "Bangalore-Hosur Electronics City Border Expressway",
      "Bagalur Industrial Area & EV Manufacturing Clusters",
      "Mookandapalli Light Engineering Industrial Hub"
    ],
    localContext: "Stationed on the Tamil Nadu-Karnataka border, JSM provides cross-state statutory compliant security and automated access management for automotive majors, electric vehicle manufacturers, and logistics depots.",
    corridorAnchor: "Hosur-Bangalore Industrial & EV Hub",
    internalLink: "/locations/hosur"
  },
  bangalore: {
    slug: "bangalore",
    city: "Bangalore",
    state: "Karnataka",
    role: "Technology Parks & Corporate Facilities Corridor",
    industrialZones: [
      "Electronic City & Whitefield Technology Enclaves",
      "Bommasandra & Attibele Industrial Estates",
      "Peenya Industrial Area & Heavy Engineering Hub",
      "Nelamangala Multi-Modal Logistics & Warehousing Parks"
    ],
    localContext: "Supporting enterprise technology parks, logistics fulfillment centers, and commercial corporate headquarters operating under Karnataka PSARA compliance with 24/7 centralized monitoring and bilingual security personnel.",
    corridorAnchor: "Greater Bangalore Technology & Logistics Belt",
    internalLink: "/locations/hosur" // Links to Hosur-Bangalore corridor page
  },
  madurai: {
    slug: "madurai",
    city: "Madurai",
    state: "Tamil Nadu",
    role: "Southern Commercial, Healthcare & Textile Gateway",
    industrialZones: [
      "Kappalur Industrial Estate & Automobile Clusters",
      "Mattuthavani Commercial & Inter-City Transit Hubs",
      "Vadipatti Agro & Food Processing Parks",
      "Super-Specialty Hospital & Medical College Campuses"
    ],
    localContext: "Securing high-footfall commercial transit hubs, textile manufacturing plants, and healthcare institutions across South Tamil Nadu with disciplined guard forces and NABH-compliant facility hygiene teams.",
    corridorAnchor: "South Tamil Nadu Commercial Gateway",
    internalLink: "/locations/madurai"
  },
  salem: {
    slug: "salem",
    city: "Salem",
    state: "Tamil Nadu",
    role: "Metallurgical, Steel & Heavy Engineering Corridor",
    industrialZones: [
      "Salem Steel Plant & Metallurgical SEZ",
      "Jagirammapalayam Heavy Fabrication Belt",
      "Shevapet Commercial Trading & Commodity Warehouses",
      "Sankari Cement & Chemical Manufacturing Corridor"
    ],
    localContext: "Deploying high-vigilance industrial detachments specialized in heavy raw material weighbridge audits, metal theft prevention, and Factories Act compliance across Salem's metallurgical complexes.",
    corridorAnchor: "Central-Western Metallurgical Corridor",
    internalLink: "/locations/salem"
  },
  erode: {
    slug: "erode",
    city: "Erode",
    state: "Tamil Nadu",
    role: "Textile Wet-Processing & Agro-Industrial Center",
    industrialZones: [
      "Perundurai SIPCOT Industrial Growth Center",
      "Textile Dyeing, Weaving & Processing Enclaves",
      "Chithode Agro-Processing & Cold Storage Facilities",
      "Bhavani Carpet & Handloom Export Clusters"
    ],
    localContext: "Delivering specialized industrial housekeeping, chemical effluent zone safety, and 24/7 security watch for textile dyeing factories and agricultural warehouses in Erode and Perundurai.",
    corridorAnchor: "Erode Industrial & Textile Processing Belt",
    internalLink: "/locations/erode"
  },
  mumbai: {
    slug: "mumbai",
    city: "Mumbai & Pune",
    state: "Maharashtra",
    role: "Western Financial, CXO & Industrial Manufacturing Corridor",
    industrialZones: [
      "Bandra-Kurla Complex (BKC) & Nariman Point BFSI Enclaves",
      "Chakan, Bhosari & Talegaon Automotive & Heavy Engineering Belts",
      "MIDC Thane-Belapur & Taloja Industrial Corridors",
      "Hinjawadi & Magarpatta Information Technology Parks"
    ],
    localContext: "Brokering senior executive search and confidential CXO transitions for automotive OEMs, engineering conglomerates, and BFSI headquarters across Maharashtra.",
    corridorAnchor: "Mumbai-Pune Western Industrial Corridor",
    internalLink: "/locations/mumbai"
  },
  delhi: {
    slug: "delhi",
    city: "Delhi NCR",
    state: "Delhi",
    role: "Northern Corporate Headquarters & Enterprise Technology Corridor",
    industrialZones: [
      "Gurugram Cyber City & Golf Course Extension Corporate Belts",
      "Noida Enterprise SaaS & Industrial Electronics Clusters",
      "Manesar Heavy Automotive & Manufacturing Corridors",
      "Okhla & Faridabad Light Engineering & Industrial Hubs"
    ],
    localContext: "Connecting enterprise headquarters and fast-growing companies in Delhi NCR with proven CXOs, VP Engineering leads, and commercial directors on contingency terms.",
    corridorAnchor: "National Capital Corporate & Tech Corridor",
    internalLink: "/locations/delhi"
  },
  gujarat: {
    slug: "gujarat",
    city: "Ahmedabad & Vadodara",
    state: "Gujarat",
    role: "Chemical, Pharma, Ports & Manufacturing Nexus",
    industrialZones: [
      "Sanand & Changodar Automotive & Engineering Belts",
      "Vatva, Naroda & Ankleshwar Chemical & Pharmaceutical Hubs",
      "Mundra & Dahej Special Economic Zones & Maritime Logistics",
      "Makarpura & Savli Heavy Fabrication & Precision Machinery Belts"
    ],
    localContext: "Delivering vetted plant heads, technical operations directors, and C-suite talent for Gujarat's premier chemical, pharmaceutical, and manufacturing industries.",
    corridorAnchor: "Gujarat Industrial & Petrochemical Gateway",
    internalLink: "/locations/gujarat"
  },
  indore: {
    slug: "indore",
    city: "Indore & Pithampur",
    state: "Madhya Pradesh",
    role: "Central Indian Automotive, Pharma & Logistics Corridor",
    industrialZones: [
      "Pithampur Industrial Area Sector 1, 2 & 3 Auto Clusters",
      "Sanwer Road Light Engineering & Metal Fabrication Belts",
      "Super Corridor IT & Technology Parks",
      "Dewas Chemical, Soya & FMCG Industrial Hubs"
    ],
    localContext: "Sourcing senior plant managers, supply chain heads, and executive directors for multinational manufacturing plants across Central India's industrial backbone.",
    corridorAnchor: "Central India Industrial & Logistics Axis",
    internalLink: "/locations/indore"
  }
};

export const VERTICALS = [
  {
    id: "automotive",
    title: "Automotive & Heavy Component Manufacturing",
    challenges: "High-value spare parts pilferage, non-returnable scrap leakages, unverified driver turnstile entry, and multi-shift contractor attendance discrepancies.",
    operationalFocus: "Weighbridge ANPR cameras, dual-barrier biometric turnstiles, scrap yard patrol tags, and strict material outward gate registers."
  },
  {
    id: "tech-park",
    title: "Technology Parks & Corporate IT Campuses",
    challenges: "Unregulated visitor entry, intellectual property theft, after-hours data center access vulnerabilities, and employee safety during twilight shift commutes.",
    operationalFocus: "Bilingual security marshals, automated QR visitor passes, 24/7 CCTV surveillance room monitoring, and escort protocols."
  },
  {
    id: "healthcare",
    title: "Hospitals & Super-Specialty Medical Facilities",
    challenges: "Cross-contamination risks in ICU corridors, unmanaged patient attendant crowd density, emergency ward security incidents, and bio-medical waste handling.",
    operationalFocus: "NABH-standard colour-coded mechanized sanitation, hospital OPD queue tracking via WhatsApp, and disciplined security marshals trained in de-escalation."
  },
  {
    id: "logistics",
    title: "Multi-Modal Warehousing & Logistics Parks",
    challenges: "Inventory shrinkage during cross-docking, dock door tampering, perimeter fence breaches at night, and driver queue congestion blocking access gates.",
    operationalFocus: "High-bay IP surveillance, perimeter tripwire analytics, dock marshal checkpoints, and 02:00 AM mobile inspection patrols."
  },
  {
    id: "heavy-engineering",
    title: "Heavy Engineering & Metal Fabrication Belts",
    challenges: "Unauthorized scrap removal, contractor overtime falsification, industrial fire emergencies, and strict Factories Act safety compliance.",
    operationalFocus: "Ex-servicemen industrial gate commanders, PPE enforcement checkpoints, hot-work fire watch details, and police-verified labor registers."
  },
  {
    id: "commercial-retail",
    title: "Commercial Malls, Luxury Venues & Retail Chains",
    challenges: "Shoplifting, customer vehicle parking congestion, negative Google reviews from unresolved grievances, and peak festival crowd surges.",
    operationalFocus: "Smart NFC Google review standees, uniformed mall patrol officers, emergency parking QR decals, and rapid incident response teams."
  },
  {
    id: "textile",
    title: "Textile Processing & Garment Export Mills",
    challenges: "Fabric roll inventory shrinkage, hazardous chemical storage safety, high humidity floor slip accidents, and labor union gate disputes.",
    operationalFocus: "Continuous auto-scrubber moisture extraction, chemical storage access logs, 24/7 gate muster checks, and statutory labor compliance audits."
  },
  {
    id: "infrastructure",
    title: "Civil Aviation, Transit Terminals & Public Infrastructure",
    challenges: "High passenger throughput, zero-tolerance security screening, round-the-clock concourse hygiene, and strict civil aviation regulatory audits.",
    operationalFocus: "Military-grade platoon drill, disciplined ceremonial marshals, continuous mechanized floor scrubbing (as proven at Trichy International Airport)."
  }
];
