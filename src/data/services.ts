export interface ServiceFeature {
  title: string;
  description: string;
  icon: string;
}

export interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  code: string;
  title: string;
  shortTitle: string;
  workforceClassification?: string;
  gstSac: string;
  officialDescription: string;
  phase: 'Phase 1 - Core Business Vertical' | 'Phase 2 - Expansion Service';
  isCoreLaunch: boolean;
  category: 'security' | 'facilities' | 'manpower' | 'tender' | 'digital' | 'csc' | 'logistics' | 'events' | 'property';
  categoryLabel: string;
  valueProposition: string;
  description: string;
  whoItIsFor: string[];
  icon: string;
  heroImage: string;
  complianceNotice?: string;
  features: ServiceFeature[];
  process: ServiceProcessStep[];
  faqs: ServiceFAQ[];
  relatedSlugs: string[];
  metaTitle: string;
  metaDescription: string;
}

export const serviceCategories = [
  'All Verticals',
  'Core Business Verticals (JSM 1-6)',
  'Security & Protection (JSM-01)',
  'Manpower & Workforce (JSM-02)',
  'Facility Management (JSM-03)',
  'Tender & Procurement (JSM-04)',
  'Scanning, Digitization & IT (JSM-05)',
  'CSC Citizen Services (JSM-06)'
];

export const servicesData: Service[] = [
  {
    slug: 'private-security',
    code: 'JSM-01',
    title: 'Security & Protection Services',
    shortTitle: 'Security & Protection',
    workforceClassification: 'Ex-Servicemen (ESM) Supervisors & Guards, Private Supervisors & Guards (Male & Female)',
    gstSac: 'SAC 998525 – Guard Services (Ex-service men & Private Male & Female)',
    officialDescription: 'Security and protection services including security guarding, industrial security, commercial security, security supervision and related security services, subject to applicable statutory licenses.',
    phase: 'Phase 1 - Core Business Vertical',
    isCoreLaunch: true,
    category: 'security',
    categoryLabel: 'Security & Protection (JSM-01)',
    valueProposition: 'Disciplined on-site guarding led by Ex-Servicemen & certified private security marshals with 2:00 AM supervisor spot-audits.',
    description: 'JSM Integrated Services delivers structured, disciplined private security guarding across Tamil Nadu and South India. Operating with PSARA 2005 compliance, our security personnel comprise disciplined Ex-Servicemen (ESM) officers, seasoned private security supervisors, and vetted male & female security guards.',
    whoItIsFor: [
      'Corporate IT Parks & SEZ Campuses',
      'Manufacturing Plants & Industrial Warehouses',
      'Automotive & Electronics Facilities (Hosur, Sriperumbudur)',
      'Healthcare Institutions & Hospital Campuses',
      'Aviation & Airport Infrastructure (Trichy Landmark)',
      'Residential Societies & Commercial Gated Enclaves'
    ],
    icon: 'Shield',
    heroImage: '/images/protective_guard.jpg',
    complianceNotice: '100% PSARA Act (2005) compliant under the Controlling Authority, Home Department, Government of Tamil Nadu. Deployed guards are 100% Aadhaar & Police verified with mandatory 5-day pre-deployment training.',
    features: [
      { title: 'Ex-Servicemen & Private Marshals', description: 'Trained, vetted male and female guards backed by ex-defense supervisors.', icon: 'UserCheck' },
      { title: 'Strict Gate & Visitor Registers', description: 'Dual-barrier access control, under-vehicle mirrors, and barcode visitor passes.', icon: 'ClipboardCheck' },
      { title: '2:00 AM Unannounced Night Audits', description: 'Mobile supervisor patrol vans conducting surprise vigilance and sobriety checks.', icon: 'Eye' },
      { title: 'Guaranteed 2-Hour Relief SLA', description: 'Roving reserve pools in Trichy, Chennai, and Coimbatore replace absent guards within 120 mins.', icon: 'Clock' },
      { title: 'Emergency Fire & Evacuation Ready', description: 'Certified in industrial fire extinguisher operation and emergency medical assistance.', icon: 'AlertTriangle' },
      { title: 'Daily Digital Logbook Handovers', description: 'Transparent shift registers with digital photo-verified timestamps.', icon: 'FileText' }
    ],
    process: [
      { step: 1, title: 'Site Threat & Vulnerability Audit', description: 'Physical perimeter inspection, gate assessment, and post identification.' },
      { step: 2, title: 'Post Order & SLA Formulation', description: 'Site-specific SOPs for vehicle entries, employee registers, and emergency protocols.' },
      { step: 3, title: 'Deployment of Vetted Marshals', description: 'Police-verified Ex-Servicemen and private personnel deployed in crisp uniforms.' },
      { step: 4, title: 'Continuous Van Supervision', description: 'Regular surprise inspections, unannounced night audits, and monthly client reviews.' }
    ],
    faqs: [
      { question: 'Do you deploy both Male and Female security guards?', answer: 'Yes, we deploy qualified and police-verified Ex-Servicemen (ESM) and private supervisors and guards (both Male and Female) tailored to facility requirements.' },
      { question: 'What is your relief replacement guarantee?', answer: 'We maintain contractually binding 2-Hour Relief SLAs backed by reserve marshals across Tamil Nadu.' },
      { question: 'What is the GST SAC code for private security?', answer: 'Security services fall under SAC 998525 (Guard Services - Ex-servicemen & Private Male & Female).' }
    ],
    relatedSlugs: ['manpower', 'housekeeping', 'tender-procurement-supply'],
    metaTitle: 'Security & Protection Services Tamil Nadu (JSM-01) | JSM Integrated Services',
    metaDescription: 'PSARA compliant security guarding (ESM & Private Male & Female) with 2-hour relief SLAs and 2:00 AM supervisor van audits across Tamil Nadu.'
  },
  {
    slug: 'manpower',
    code: 'JSM-02',
    title: 'Manpower & Workforce Solutions',
    shortTitle: 'Manpower & Workforce',
    workforceClassification: 'Ex-Servicemen (ESM) Supervisors & Guards, Private Supervisors & Workforce (Male & Female)',
    gstSac: 'SAC 998513 – Contract Staffing & Manpower Supply Services',
    officialDescription: 'Manpower and workforce solutions including contract staffing, manpower supply, outsourced workforce and related employment support services.',
    phase: 'Phase 1 - Core Business Vertical',
    isCoreLaunch: true,
    category: 'manpower',
    categoryLabel: 'Manpower & Workforce (JSM-02)',
    valueProposition: 'Vetted skilled, semi-skilled, and industrial workforce deployed within 48–72 hours with 100% EPF/ESIC legal indemnity.',
    description: 'Originating as JSMMANPOWER, JSM Integrated Services supplies reliable, compliant, and pre-trained workforce for manufacturing assembly lines, warehouse logistics, facility operations, and administrative functions across South India.',
    whoItIsFor: [
      'Automotive & Engineering Assembly Plants',
      'E-Commerce Fulfilment & Logistics Warehouses',
      'FMCG, Food Processing & Packaging Lines',
      'Textile & Garment Manufacturing Mills',
      'Corporate Offices & Utility Operations'
    ],
    icon: 'Users',
    heroImage: '/images/industrial_workforce.jpg',
    complianceNotice: '100% statutory adherence to the Minimum Wages Act of Tamil Nadu, EPF, and ESIC. Verified monthly ECR challans provided with every invoice for zero co-employer liability.',
    features: [
      { title: '48–72h Rapid Mobilization', description: 'Quick onboarding for seasonal surges, production peaks, and plant expansions.', icon: 'Zap' },
      { title: '100% Statutory EPF & ESIC ECR', description: 'Zero co-employer liability with transparent monthly government challan submissions.', icon: 'CheckCircle' },
      { title: 'Ex-Servicemen & Private Line Supervisors', description: 'Experienced supervisors enforcing shop-floor productivity, PPE compliance, and attendance.', icon: 'UserCheck' },
      { title: 'Aadhaar & Police Verified Labor', description: 'Rigorous 100% identification checks before entering client industrial gates.', icon: 'Shield' },
      { title: 'Digital Shift Attendance', description: 'Biometric and app-based time-tracking with automated muster roll generation.', icon: 'ClipboardCheck' },
      { title: 'Direct Wage Transfer', description: 'Strict compliance with banking wage disbursals adhering to state wage notifications.', icon: 'Banknote' }
    ],
    process: [
      { step: 1, title: 'Headcount & Skill Mapping', description: 'Assessment of trade skills, shift patterns, and production volume targets.' },
      { step: 2, title: 'Sourcing & Identity Vetting', description: 'Aadhaar authentication, police record screening, and medical fitness checks.' },
      { step: 3, title: 'Safety & PPE Induction', description: 'Mandatory briefing on industrial safety, machinery protocols, and facility rules.' },
      { step: 4, title: 'On-Site Mobilization & Payroll', description: 'Supervised deployment with integrated biometric attendance and compliant billing.' }
    ],
    faqs: [
      { question: 'How do you protect clients from statutory labor disputes?', answer: 'We issue complete monthly EPF/ESIC TRRN payment proofs, ECR sheets, and legal indemnity contracts ensuring zero co-employer liability.' },
      { question: 'What trades and roles do you provide?', answer: 'We supply assembly technicians, warehouse loaders, packing operators, CNC machine assistants, office helpers, and shop-floor supervisors.' }
    ],
    relatedSlugs: ['private-security', 'housekeeping', 'tender-procurement-supply'],
    metaTitle: 'Manpower & Workforce Solutions Tamil Nadu (JSM-02) | JSM Integrated Services',
    metaDescription: 'Reliable contractual manpower supply and industrial staffing (ESM & Private Male/Female) in Chennai, Coimbatore, Hosur, and Trichy.'
  },
  {
    slug: 'housekeeping',
    code: 'JSM-03',
    title: 'Facility Management & Housekeeping',
    shortTitle: 'Facility & Housekeeping',
    workforceClassification: 'Private (Pvt) Male & Female Housekeeping & Facility Marshals',
    gstSac: 'SAC 998533 – Cleaning & Facility Support Services',
    officialDescription: 'Facility management services including housekeeping, cleaning, facility support, office support and allied maintenance-support services.',
    phase: 'Phase 1 - Core Business Vertical',
    isCoreLaunch: true,
    category: 'facilities',
    categoryLabel: 'Facility Management (JSM-03)',
    valueProposition: 'Mechanized ride-on auto scrubbers, 5-step closed-loop hygiene protocols, and hospital-grade eco consumables.',
    description: 'JSM Integrated Services delivers spotless commercial, healthcare, and industrial facility management. We replace ineffective manual mopping with industrial ride-on scrubbers, color-coded microfiber sanitization, and structured supervisor checklists.',
    whoItIsFor: [
      'Corporate Headquarters & IT Parks',
      'Industrial Shop Floors & Cleanrooms',
      'Hospitals, Clinics & Diagnostic Labs',
      'Shopping Malls & Retail Showrooms',
      'Educational Institutions & Universities'
    ],
    icon: 'Sparkles',
    heroImage: '/images/housekeeping_hygiene.jpg',
    complianceNotice: 'All housekeeping staff are deployed with complete safety gear (PPE), eco-certified cleaning chemicals, and full statutory PF/ESI coverage.',
    features: [
      { title: '5-Step Closed-Loop Hygiene', description: 'Clean → Inspect → Report → Correct → Verify workflow for pristine corporate presentation.', icon: 'CheckCircle' },
      { title: 'Mechanized Ride-On Auto Scrubbers', description: 'High-speed industrial floor scrubbing for large production floors and concourses.', icon: 'Zap' },
      { title: 'Color-Coded Cross-Contamination Control', description: 'Dedicated microfiber zones for washrooms, executive cabins, and cafeterias.', icon: 'Layers' },
      { title: 'Hourly Washroom Audit Logs', description: 'Signed and time-stamped checklist audits displayed in every sanitation zone.', icon: 'Clock' },
      { title: 'Hospital-Grade Eco Consumables', description: 'Biodegradable, non-corrosive, and skin-safe certified chemical cleaning solutions.', icon: 'Shield' },
      { title: 'Solid Waste & Deep Sanitization', description: 'Segregated waste disposal and periodic antimicrobial misting protocols.', icon: 'Trash' }
    ],
    process: [
      { step: 1, title: 'Square Footage & Floor Type Audit', description: 'Analysis of marble, epoxy, granite, or vinyl flooring and footfall density.' },
      { step: 2, title: 'Machine & Chemical Schedule', description: 'Assignment of auto-scrubbers, single-disc polishers, and consumable allocations.' },
      { step: 3, title: 'Induction & Uniform Deployment', description: 'Trained private male and female staff deployed in professional corporate attire.' },
      { step: 4, title: 'Quality Audits & ATP Testing', description: 'Daily supervisor checks, luminescence testing, and monthly client satisfaction surveys.' }
    ],
    faqs: [
      { question: 'Do you provide cleaning machinery and chemicals?', answer: 'Yes, we provide turnkey solutions including industrial ride-on scrubbers, wet/dry vacuums, and eco-certified chemicals, or manpower-only models.' },
      { question: 'What is the GST SAC code for housekeeping?', answer: 'Housekeeping and cleaning services fall under SAC 998533 (Cleaning and facility support services).' }
    ],
    relatedSlugs: ['private-security', 'manpower', 'tender-procurement-supply'],
    metaTitle: 'Commercial Housekeeping & Facility Management (JSM-03) | JSM Integrated Services',
    metaDescription: 'Mechanized commercial housekeeping and corporate facility management across Tamil Nadu with 5-step hygiene protocols.'
  },
  {
    slug: 'tender-procurement-supply',
    code: 'JSM-04',
    title: 'Tender, Procurement, Seller & Business Support',
    shortTitle: 'Tender & Procurement',
    workforceClassification: 'Tender & Commercial Contracts Team',
    gstSac: 'Appropriate SAC / HSN based on actual service / supply contract',
    officialDescription: 'Tender management, procurement support, documentation, bid preparation support, contract administration and business support services.',
    phase: 'Phase 1 - Core Business Vertical',
    isCoreLaunch: true,
    category: 'tender',
    categoryLabel: 'Tender & Procurement (JSM-04)',
    valueProposition: 'Turnkey government and corporate tender bidding, GeM Seller listing, PSU supply fulfilment, and procurement administration.',
    description: 'JSM Integrated Services manages end-to-end tender lifecycle operations for government departments, PSUs, and private enterprises. From technical bid preparation on Tamil Nadu e-Procurement and GeM to vendor onboarding and contract delivery, we ensure seamless procurement execution.',
    whoItIsFor: [
      'Government Departments & Municipal Corporations',
      'Public Sector Undertakings (PSUs) & Defense Entities',
      'Corporate Enterprises needing Vendor Consolidation',
      'Manufacturers needing GeM & Tender Distribution'
    ],
    icon: 'FileText',
    heroImage: '/images/hero_operations.jpg',
    complianceNotice: 'All tender activities adhere to CVC guidelines, GeM procurement norms, and Tamil Nadu Transparency in Tenders Act.',
    features: [
      { title: 'GeM Seller Listing & Bidding (JSM-04.5)', description: 'Product and service cataloging, L1 bid tracking, and direct purchase compliance.', icon: 'CheckCircle' },
      { title: 'Government & PSU Supply (JSM-04.6)', description: 'Turnkey supply of manpower, equipment, PPE, consumables, and facility goods.', icon: 'Building' },
      { title: 'Bid Documentation & EMD Support (JSM-04.11)', description: 'Preparation of technical eligibility forms, affidavits, solvency, and compliance dossiers.', icon: 'FileText' },
      { title: 'Tender Identification & Evaluation (JSM-04.1)', description: 'Discovery and qualification of Central, State, and PSU procurement opportunities.', icon: 'Search' },
      { title: 'Vendor Management & Sourcing (JSM-04.8)', description: 'Direct manufacturer sourcing, wholesale rate negotiations, and delivery tracking.', icon: 'Layers' },
      { title: 'Contract PO Fulfilment (JSM-04.10)', description: 'End-to-end work order execution, delivery challans, and GST invoicing management.', icon: 'Zap' }
    ],
    process: [
      { step: 1, title: 'Tender Discovery & Eligibility Audit', description: 'Scrutiny of technical criteria, turnover mandates, and EMD requirements.' },
      { step: 2, title: 'Bid Dossier Formulation', description: 'Compilation of statutory declarations, experience certificates, and pricing sheets.' },
      { step: 3, title: 'Electronic Bid Submission', description: 'Timely portal submission with digital signature certificates (DSC).' },
      { step: 4, title: 'Contract Execution & Supply Delivery', description: 'Full supply chain fulfillment, inspection clearances, and milestone billing.' }
    ],
    faqs: [
      { question: 'Can JSM participate as a seller on GeM and Tamil Nadu e-Procurement?', answer: 'Yes, JSM operates as an active supplier and service provider across GeM, Tamil Nadu e-Procurement, and PSU portals.' },
      { question: 'How are goods and services classified under JSM-04 for GST?', answer: 'Under GST rules, services use appropriate SAC codes while physical goods (PPE, stationery, equipment) use specific HSN codes.' }
    ],
    relatedSlugs: ['scanning-digitalization-it', 'private-security', 'manpower'],
    metaTitle: 'Tender Management, GeM Seller & Procurement Support (JSM-04) | JSM Integrated',
    metaDescription: 'End-to-end tender management, GeM bidding, government/PSU supply, and procurement administration in Tamil Nadu.'
  },
  {
    slug: 'scanning-digitalization-it',
    code: 'JSM-05',
    title: 'Scanning, Digitalization & IT Services',
    shortTitle: 'Scanning & IT Services',
    workforceClassification: 'Digital Operations & Technical Specialists (NIC 62099)',
    gstSac: 'Applicable IT & Data Processing SAC (NIC 62/63/82)',
    officialDescription: 'Document scanning, digitization, OCR, indexing, data entry, digital archiving, document management, data processing, IT support and related digital services.',
    phase: 'Phase 1 - Core Business Vertical',
    isCoreLaunch: true,
    category: 'digital',
    categoryLabel: 'Scanning & IT (JSM-05)',
    valueProposition: 'High-speed bulk document scanning, OCR conversion, electronic archiving, and enterprise IT support.',
    description: 'JSM Integrated Services delivers comprehensive digital document management and IT support. Recognized under Government Udyam NIC 62099, we help government departments, corporate legal teams, healthcare institutions, and banks transition from physical paper archives to secure, searchable digital databases.',
    whoItIsFor: [
      'Government Departments & Public Records Offices',
      'Banks, NBFCs & Financial Institutions',
      'Corporate Legal, HR & Operations Records',
      'Hospitals & Medical History Archives',
      'Educational Institutions & Universities'
    ],
    icon: 'Monitor',
    heroImage: '/images/portal_laptop.jpg',
    complianceNotice: 'All document scanning and digitalization operations comply with ISO document security norms and strict non-disclosure data privacy protocols.',
    features: [
      { title: 'Bulk Document Digitization (JSM-05.2)', description: 'High-speed flatbed and ADF scanning up to 1200 DPI for books, deeds, and case files.', icon: 'Layers' },
      { title: 'OCR Conversion & Searchable PDFs (JSM-05.3)', description: 'Optical Character Recognition enabling instant keyword searching within scanned files.', icon: 'Search' },
      { title: 'Document Indexing & Metadata (JSM-05.4)', description: 'Systematic tagging by file number, date, department, and custom classification.', icon: 'FileText' },
      { title: 'Data Entry & Data Processing (JSM-05.5)', description: 'Double-blind verified data entry for surveys, application forms, and registers.', icon: 'CheckCircle' },
      { title: 'Digital Archiving & DMS (JSM-05.6)', description: 'Cloud or on-premise secure document management software implementation.', icon: 'Lock' },
      { title: 'IT & Network Support (JSM-05.12)', description: 'On-site workstation maintenance, local networking, and peripheral troubleshooting.', icon: 'Zap' }
    ],
    process: [
      { step: 1, title: 'Volume & Document Condition Assessment', description: 'Cataloging physical file condition, page counts, staple removal, and indexing schema.' },
      { step: 2, title: 'High-Speed Secure Scanning', description: 'Production scanning with auto deskew, contrast correction, and blank page removal.' },
      { step: 3, title: 'OCR & Metadata Tagging', description: 'Text extraction and structured indexing for rapid digital retrieval.' },
      { step: 4, title: 'Digital Delivery & Re-binding', description: 'Encrypted transfer or DMS upload with original document re-filing.' }
    ],
    faqs: [
      { question: 'Can you perform scanning at our premises (on-site scanning)?', answer: 'Yes, for confidential records (legal, banking, medical), we deploy our high-speed scanners and vetted operators directly inside client facilities.' },
      { question: 'What is the Udyam NIC classification for JSM-05?', answer: 'It sits under NIC 62099 (Other information technology and computer service activities) and related data processing SACs.' }
    ],
    relatedSlugs: ['csc-digital-citizen-services', 'tender-procurement-supply', 'software-solutions'],
    metaTitle: 'Document Scanning, OCR & Digitalization Services (JSM-05) | JSM Integrated',
    metaDescription: 'Enterprise document scanning, bulk digitization, OCR indexing, data entry, and IT support services in Tamil Nadu.'
  },
  {
    slug: 'csc-digital-citizen-services',
    code: 'JSM-06',
    title: 'CSC & Digital Citizen Services',
    shortTitle: 'CSC & Citizen Services',
    workforceClassification: 'CSC & e-Governance Facilitation Officers',
    gstSac: 'Applicable SAC based on actual digital facilitation service supplied',
    officialDescription: 'Digital citizen facilitation and authorised CSC-related services including online application assistance, digital form support, scanning, printing, document upload and other permitted digital facilitation services.',
    phase: 'Phase 1 - Core Business Vertical',
    isCoreLaunch: true,
    category: 'csc',
    categoryLabel: 'CSC & Citizen Services (JSM-06)',
    valueProposition: 'Authorized e-Governance facilitation, digital citizen assistance, online government applications, and document services.',
    description: 'JSM Integrated Services delivers accessible digital citizen and e-governance services. From assisting citizens with government portal applications to providing high-speed printing, scanning, lamination, and bill-payment facilitation, we bridge the digital divide.',
    whoItIsFor: [
      'Citizens & Local Residents',
      'Industrial Workers needing Statutory e-Seva Support',
      'Students applying for Exams & Scholarships',
      'Senior Citizens requiring Certificate Facilitation',
      'Businesses requiring E-way Bills & Online Filings'
    ],
    icon: 'UserCheck',
    heroImage: '/images/facility_lobby.jpg',
    complianceNotice: 'Operated strictly as per government portal guidelines and authorized citizen service facilitation norms.',
    features: [
      { title: 'Online Govt Application Assistance (JSM-06.1)', description: 'Guidance and submission on central, state, and municipal e-governance portals.', icon: 'CheckCircle' },
      { title: 'Digital Form Filling & Status Tracking (JSM-06.2)', description: 'Error-free document upload, application tracking, and certificate downloads.', icon: 'FileText' },
      { title: 'Document Scanning & Upload (JSM-06.5)', description: 'Fast document compression and sizing for government upload portals.', icon: 'Layers' },
      { title: 'Printing, Photocopy & Lamination (JSM-06.3)', description: 'High-speed black & white / color printing and protective thermal lamination.', icon: 'Printer' },
      { title: 'Utility & Bill Payment Facilitation (JSM-06.9)', description: 'Electricity, water, property tax, and telecom bill payment support.', icon: 'CreditCard' },
      { title: 'Digital Literacy Assistance (JSM-06.12)', description: 'Empowering first-time digital users with secure online navigation guidance.', icon: 'HelpCircle' }
    ],
    process: [
      { step: 1, title: 'Requirement Identification', description: 'Determining the exact citizen service, government portal, and mandatory documents.' },
      { step: 2, title: 'Document Digitization & Verification', description: 'Scanning and resizing proof of identity and address documents.' },
      { step: 3, title: 'Portal Submission & Acknowledgement', description: 'Accurate form entry with instant generation of government application reference numbers.' },
      { step: 4, title: 'Status Tracking & Delivery', description: 'Regular follow-up until certificate or approval download is completed.' }
    ],
    faqs: [
      { question: 'What services are offered under JSM-06?', answer: 'We facilitate online government portal applications, digital form filling, document scanning, color printing, lamination, and utility bill payments.' }
    ],
    relatedSlugs: ['scanning-digitalization-it', 'tender-procurement-supply'],
    metaTitle: 'CSC & Digital Citizen Services (JSM-06) | JSM Integrated Services',
    metaDescription: 'Authorized digital citizen facilitation, e-governance applications, form filling, and document printing in Tiruchirappalli, Tamil Nadu.'
  },
  {
    slug: 'cash-in-transit',
    code: 'JSM-08',
    title: 'Secure Cash-in-Transit & Valuables Logistics',
    shortTitle: 'Cash-in-Transit',
    gstSac: 'Applicable SAC under passenger/cargo transport',
    officialDescription: 'Disciplined two-person custody transfers, documentation, and secure transit protocols.',
    phase: 'Phase 2 - Expansion Service',
    isCoreLaunch: false,
    category: 'logistics',
    categoryLabel: 'Transport & Logistics',
    valueProposition: 'Disciplined two-person custody transfers, documentation, and secure transit protocols.',
    description: 'JSM Integrated Services coordinates professional cash movement and valuables logistics support for retail chains, financial outlets, fuel stations, and corporate collections.',
    whoItIsFor: ['Retail Chains', 'Commercial Banks', 'Fuel Stations', 'Jewellery Showrooms'],
    icon: 'Banknote',
    heroImage: '/images/hero_operations.jpg',
    features: [
      { title: 'Two-Person Custody Model', description: 'Strict dual-signoff handover procedures ensuring total asset accountability.', icon: 'Lock' },
      { title: 'Secure Route Planning', description: 'Planned transit windows and randomized movement schedules.', icon: 'MapPin' }
    ],
    process: [
      { step: 1, title: 'Risk Review', description: 'Assessment of collection locations and handover safety.' },
      { step: 2, title: 'Transfer Execution', description: 'Execution with tamper-proof security bags.' }
    ],
    faqs: [
      { question: 'How do you secure transit?', answer: 'We use tamper-evident bags, two-person verified handovers, and strict identity authentication.' }
    ],
    relatedSlugs: ['private-security', 'manpower'],
    metaTitle: 'Secure Cash Logistics in Tamil Nadu | JSM Integrated Services',
    metaDescription: 'Disciplined, protocol-driven cash-in-transit and valuable asset logistics across Tamil Nadu.'
  },
  {
    slug: 'event-support',
    code: 'JSM-07',
    title: 'Event, Wedding & VIP Security Management',
    shortTitle: 'Event & VIP Security',
    gstSac: 'SAC 998525 – Guard & Event Security Services',
    officialDescription: 'Hospitality-focused crowd coordination, VIP handling, gate entry security, and bouncer details.',
    phase: 'Phase 2 - Expansion Service',
    isCoreLaunch: false,
    category: 'events',
    categoryLabel: 'Event Operations',
    valueProposition: 'Hospitality-focused crowd coordination, VIP handling, and gate entry security.',
    description: 'From grand weddings and celebrity functions to corporate conferences and exhibitions, JSM provides hospitality-focused crowd coordination and VIP protection.',
    whoItIsFor: ['Wedding Planners', 'Corporate Summits', 'Exhibitions & Trade Fairs'],
    icon: 'Users',
    heroImage: '/images/protective_guard.jpg',
    features: [
      { title: 'Crowd & Gate Management', description: 'Smooth guest entry and queue control.', icon: 'Users' },
      { title: 'VIP Dignitary Escort', description: 'Dedicated protection details for high-profile guests.', icon: 'Shield' }
    ],
    process: [
      { step: 1, title: 'Venue Walkthrough', description: 'Inspection of halls, exits, and parking.' },
      { step: 2, title: 'Deployment', description: 'Deployment of polite, imposing bouncers and greeters.' }
    ],
    faqs: [
      { question: 'Are event staff trained?', answer: 'Yes, all event personnel are trained in respectful hospitality and courteous crowd control.' }
    ],
    relatedSlugs: ['private-security', 'manpower'],
    metaTitle: 'Event Security & VIP Management Tamil Nadu | JSM Integrated Services',
    metaDescription: 'Hospitality-driven event security, crowd management, and VIP escort details in Tamil Nadu.'
  },
  {
    slug: 'real-estate-support',
    code: 'JSM-03',
    title: 'Real Estate Construction Site & Auction Support',
    shortTitle: 'Real Estate Support',
    gstSac: 'SAC 998525 / SAC 998533',
    officialDescription: 'Securing construction progress, finished assets, model flats, and auction bidder verification.',
    phase: 'Phase 2 - Expansion Service',
    isCoreLaunch: false,
    category: 'property',
    categoryLabel: 'Property Support',
    valueProposition: 'Securing construction progress, finished assets, and organized auction entry.',
    description: 'JSM provides specialized operational support for real estate builders, safeguarding materials and providing courteous model flat concierges.',
    whoItIsFor: ['Builders & Developers', 'Auction Houses', 'Property Management'],
    icon: 'Building',
    heroImage: '/images/facility_lobby.jpg',
    features: [
      { title: 'Construction Site Guarding', description: '24/7 material gate passes and night vigilance.', icon: 'Shield' },
      { title: 'Sales Gallery Hosting', description: 'Courteous concierge staff welcoming buyers.', icon: 'Users' }
    ],
    process: [
      { step: 1, title: 'Ingress Mapping', description: 'Perimeter checks and material registers.' },
      { step: 2, title: 'Vigilance', description: '24/7 stationary and roving security.' }
    ],
    faqs: [
      { question: 'How do you prevent theft?', answer: 'We enforce 100% material pass verification and physical inspections of exiting vehicles.' }
    ],
    relatedSlugs: ['private-security', 'housekeeping'],
    metaTitle: 'Real Estate & Construction Security | JSM Integrated Services',
    metaDescription: 'Construction site material guarding and model flat hosting across Tamil Nadu.'
  },
  {
    slug: 'software-solutions',
    code: 'JSM-05',
    title: 'Software, Web Portals & Business Automation',
    shortTitle: 'Software & Portals',
    gstSac: 'NIC 62099 – IT & Computer Services SAC',
    officialDescription: 'Custom landing pages, visitor management software, and lead automation.',
    phase: 'Phase 2 - Expansion Service',
    isCoreLaunch: false,
    category: 'digital',
    categoryLabel: 'Software & Portals',
    valueProposition: 'Custom landing pages, visitor management software, and attendance automation.',
    description: 'JSM builds streamlined digital tools for modern enterprises, from high-conversion websites to digital visitor logging systems.',
    whoItIsFor: ['SMEs', 'Property Developers', 'Healthcare Clinics'],
    icon: 'Monitor',
    heroImage: '/images/portal_laptop.jpg',
    features: [
      { title: 'Digital Visitor Logging', description: 'Tablet-based check-ins replacing paper books.', icon: 'Tablet' },
      { title: 'High-Conversion Web Portals', description: 'Mobile-first fast web applications.', icon: 'Globe' }
    ],
    process: [
      { step: 1, title: 'Scoping', description: 'Understanding business workflows.' },
      { step: 2, title: 'Deployment', description: 'Fast cloud deployment.' }
    ],
    faqs: [
      { question: 'Can visitor tools integrate with security?', answer: 'Yes, tablet visitor apps sync directly with our on-site security guards.' }
    ],
    relatedSlugs: ['scanning-digitalization-it', 'creative-media'],
    metaTitle: 'Business Software & Visitor Automation | JSM Integrated Services',
    metaDescription: 'Modern web portals, digital visitor logs, and business automation in Tamil Nadu.'
  },
  {
    slug: 'creative-media',
    code: 'JSM-12',
    title: 'Creative Media & Corporate Documentation',
    shortTitle: 'Creative Media',
    gstSac: 'IT / Professional Support SAC',
    officialDescription: 'Professional corporate videography, event documentation, and visual branding.',
    phase: 'Phase 2 - Expansion Service',
    isCoreLaunch: false,
    category: 'digital',
    categoryLabel: 'Creative Media',
    valueProposition: 'Corporate facility photography, event videography, and brand documentation.',
    description: 'JSM Creative Media provides high-resolution photography, aerial drone surveys, and corporate videos for industrial facilities and events.',
    whoItIsFor: ['Corporate Brands', 'Industrial Plants', 'Real Estate Builders'],
    icon: 'Camera',
    heroImage: '/images/facility_lobby.jpg',
    features: [
      { title: 'Facility Photography', description: 'High-resolution industrial and office interior captures.', icon: 'Camera' },
      { title: 'Event Videography', description: 'Cinematic documentation of corporate conferences.', icon: 'Video' }
    ],
    process: [
      { step: 1, title: 'Shot Planning', description: 'Mapping required visual angles.' },
      { step: 2, title: 'Delivery', description: 'High-res optimized media files.' }
    ],
    faqs: [
      { question: 'Do you cover events?', answer: 'Yes, we provide complete photography and videography coverage.' }
    ],
    relatedSlugs: ['software-solutions', 'event-support'],
    metaTitle: 'Corporate Media & Video Documentation | JSM Integrated Services',
    metaDescription: 'Professional corporate facility photography and event videography in Tamil Nadu.'
  }
];

export const services = servicesData;
