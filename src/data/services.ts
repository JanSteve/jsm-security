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
  phase: 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Auxiliary Capability';
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
  'All Capabilities',
  'Tier 1: Security & Protection',
  'Tier 2: Manpower & Staffing',
  'Tier 3: Facility Management',
  'Auxiliary: GeM & Procurement',
  'Auxiliary: IT & Digitization',
  'Auxiliary: Citizen Services'
];

export const servicesData: Service[] = [
  {
    slug: 'private-security',
    code: 'TIER-1',
    title: 'Security Supervisors & Marshals (ESM / Private)',
    shortTitle: 'Security & Protection',
    workforceClassification: 'Ex-Servicemen (ESM) Supervisors & Guards, Private Supervisors & Guards (Male & Female)',
    gstSac: 'SAC 998525 – Guard Services (Ex-service men & Private Male & Female)',
    officialDescription: 'Security and protection services including security guarding, industrial security, commercial security, security supervision and related security services, subject to applicable statutory licenses.',
    phase: 'Tier 1',
    isCoreLaunch: true,
    category: 'security',
    categoryLabel: 'Tier 1: Security & Protection',
    valueProposition: 'Disciplined on-site guarding led by Ex-Servicemen & certified private security marshals with 2:00 AM supervisor spot-audits.',
    description: 'JSM Integrated Services delivers structured, disciplined private security guarding across Tamil Nadu and South India. Operating with PSARA 2005 compliance, our security personnel comprise disciplined Ex-Servicemen (ESM) officers, seasoned private security supervisors, and vetted male & female security guards.',
    whoItIsFor: [
      'Corporate IT Parks & SEZ Campuses (OMR, Sholinganallur)',
      'Manufacturing Plants & Industrial Warehouses',
      'Automotive & Electronics Facilities (Hosur, Sriperumbudur)',
      'Healthcare Institutions & Hospital Campuses',
      'Civil Aviation Infrastructure (Trichy Landmark Assignment)',
      'Residential Societies & Commercial Gated Enclaves'
    ],
    icon: 'Shield',
    heroImage: '/images/real_jsm_welcome_trichy_salute.jpg',
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
    metaTitle: 'Security & Protection Services Tamil Nadu | JSM Integrated Services',
    metaDescription: 'PSARA compliant security guarding (ESM & Private Male & Female) with 2-hour relief SLAs and 2:00 AM supervisor van audits across Tamil Nadu.'
  },
  {
    slug: 'manpower',
    code: 'TIER-2',
    title: 'Corporate, IT & Multi-Skill Staffing Solutions',
    shortTitle: 'Manpower & Staffing',
    workforceClassification: 'Ex-Servicemen (ESM) Supervisors & Guards, Private Supervisors & Workforce (Male & Female)',
    gstSac: 'SAC 998513 – Contract Staffing & Manpower Supply Services',
    officialDescription: 'Manpower and workforce solutions including contract staffing, manpower supply, outsourced workforce and related employment support services.',
    phase: 'Tier 2',
    isCoreLaunch: true,
    category: 'manpower',
    categoryLabel: 'Tier 2: Manpower & Staffing',
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
    heroImage: '/images/real_jsm_shift_muster_day.jpg',
    complianceNotice: '100% EPF/ESIC compliant under the Ministry of Labour & Employment. Zero co-employer liability with verified monthly ECR challan submissions.',
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
    metaTitle: 'Manpower & Corporate Staffing Solutions Tamil Nadu | JSM Integrated Services',
    metaDescription: 'Reliable contractual manpower supply and industrial staffing (ESM & Private Male/Female) in Chennai, Coimbatore, Hosur, and Trichy.'
  },
  {
    slug: 'housekeeping',
    code: 'TIER-3',
    title: 'Integrated Facility Management & Housekeeping',
    shortTitle: 'Facility & Housekeeping',
    workforceClassification: 'Private (Pvt) Male & Female Housekeeping & Facility Marshals',
    gstSac: 'SAC 998533 – Cleaning & Facility Support Services',
    officialDescription: 'Facility management services including housekeeping, cleaning, facility support, office support and allied maintenance-support services.',
    phase: 'Tier 3',
    isCoreLaunch: true,
    category: 'facilities',
    categoryLabel: 'Tier 3: Facility Management',
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
    heroImage: '/images/real_jsm_terminal_entry_salute.jpg',
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
    metaTitle: 'Commercial Housekeeping & Facility Management | JSM Integrated Services',
    metaDescription: 'Mechanized commercial housekeeping and corporate facility management across Tamil Nadu with 5-step hygiene protocols.'
  },
  {
    slug: 'tender-procurement-supply',
    code: 'AUX-GEM',
    title: 'Tender, GeM Bidding & Procurement Support',
    shortTitle: 'GeM & Procurement',
    workforceClassification: 'Tender & Commercial Contracts Team',
    gstSac: 'Appropriate SAC / HSN based on actual service / supply contract',
    officialDescription: 'Tender management, procurement support, documentation, bid preparation support, contract administration and business support services.',
    phase: 'Auxiliary Capability',
    isCoreLaunch: false,
    category: 'tender',
    categoryLabel: 'Auxiliary: GeM & Procurement',
    valueProposition: 'Turnkey government and corporate tender bidding, GeM Seller listing, PSU supply fulfilment, and procurement administration.',
    description: 'JSM Integrated Services manages end-to-end tender lifecycle operations for government departments, PSUs, and private enterprises. From technical bid preparation on Tamil Nadu e-Procurement and GeM to vendor onboarding and contract delivery, we ensure seamless procurement execution.',
    whoItIsFor: [
      'Government Departments & Municipal Corporations',
      'Public Sector Undertakings (PSUs) & Defense Entities',
      'Corporate Enterprises needing Vendor Consolidation',
      'Manufacturers needing GeM & Tender Distribution'
    ],
    icon: 'FileText',
    heroImage: '/images/real_jsm_airport_drill.jpg',
    complianceNotice: 'All tender activities adhere to CVC guidelines, GeM procurement norms, and Tamil Nadu Transparency in Tenders Act.',
    features: [
      { title: 'GeM Seller Listing & Bidding', description: 'Product and service cataloging, L1 bid tracking, and direct purchase compliance.', icon: 'CheckCircle' },
      { title: 'Government & PSU Supply', description: 'Turnkey supply of manpower, equipment, PPE, consumables, and facility goods.', icon: 'Building' },
      { title: 'Bid Documentation & EMD Support', description: 'Preparation of technical eligibility forms, affidavits, solvency, and compliance dossiers.', icon: 'FileText' },
      { title: 'Tender Identification & Evaluation', description: 'Discovery and qualification of Central, State, and PSU procurement opportunities.', icon: 'Search' },
      { title: 'Vendor Management & Sourcing', description: 'Direct manufacturer sourcing, wholesale rate negotiations, and delivery tracking.', icon: 'Layers' },
      { title: 'Contract PO Fulfilment', description: 'End-to-end work order execution, delivery challans, and GST invoicing management.', icon: 'Zap' }
    ],
    process: [
      { step: 1, title: 'Tender Discovery & Eligibility Audit', description: 'Scrutiny of technical criteria, turnover mandates, and EMD requirements.' },
      { step: 2, title: 'Bid Dossier Formulation', description: 'Compilation of statutory declarations, experience certificates, and pricing sheets.' },
      { step: 3, title: 'Electronic Bid Submission', description: 'Timely portal submission with digital signature certificates (DSC).' },
      { step: 4, title: 'Contract Execution & Supply Delivery', description: 'Full supply chain fulfillment, inspection clearances, and milestone billing.' }
    ],
    faqs: [
      { question: 'Can JSM participate as a seller on GeM and Tamil Nadu e-Procurement?', answer: 'Yes, JSM operates as an active supplier and service provider across GeM, Tamil Nadu e-Procurement, and PSU portals.' },
      { question: 'How are goods and services classified for GST?', answer: 'Under GST rules, services use appropriate SAC codes while physical goods (PPE, stationery, equipment) use specific HSN codes.' }
    ],
    relatedSlugs: ['scanning-digitalization-it', 'private-security', 'manpower'],
    metaTitle: 'Tender Management, GeM Seller & Procurement Support | JSM Integrated Services',
    metaDescription: 'End-to-end tender management, GeM bidding, government/PSU supply, and procurement administration in Tamil Nadu.'
  },
  {
    slug: 'scanning-digitalization-it',
    code: 'AUX-TECH',
    title: 'Document Scanning, Digitalization & IT Support',
    shortTitle: 'IT & Digitalization',
    workforceClassification: 'Digital Operations & Technical Specialists (NIC 62099)',
    gstSac: 'Applicable IT & Data Processing SAC (NIC 62/63/82)',
    officialDescription: 'Document scanning, digitization, OCR, indexing, data entry, digital archiving, document management, data processing, IT support and related digital services.',
    phase: 'Auxiliary Capability',
    isCoreLaunch: false,
    category: 'digital',
    categoryLabel: 'Auxiliary: IT & Digitization',
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
    heroImage: '/images/real_jsm_guard_squad_night.jpg',
    complianceNotice: 'All document scanning and digitalization operations comply with ISO document security norms and strict non-disclosure data privacy protocols.',
    features: [
      { title: 'Bulk Document Digitization', description: 'High-speed flatbed and ADF scanning up to 1200 DPI for books, deeds, and case files.', icon: 'Layers' },
      { title: 'OCR Conversion & Searchable PDFs', description: 'Optical Character Recognition enabling instant keyword searching within scanned files.', icon: 'Search' },
      { title: 'Document Indexing & Metadata', description: 'Systematic tagging by file number, date, department, and custom classification.', icon: 'FileText' },
      { title: 'Data Entry & Data Processing', description: 'Double-blind verified data entry for surveys, application forms, and registers.', icon: 'CheckCircle' },
      { title: 'Digital Archiving & DMS', description: 'Cloud or on-premise secure document management software implementation.', icon: 'Lock' },
      { title: 'IT & Network Support', description: 'On-site workstation maintenance, local networking, and peripheral troubleshooting.', icon: 'Zap' }
    ],
    process: [
      { step: 1, title: 'Volume & Document Condition Assessment', description: 'Cataloging physical file condition, page counts, staple removal, and indexing schema.' },
      { step: 2, title: 'High-Speed Secure Scanning', description: 'Production scanning with auto deskew, contrast correction, and blank page removal.' },
      { step: 3, title: 'OCR & Metadata Tagging', description: 'Text extraction and structured indexing for rapid digital retrieval.' },
      { step: 4, title: 'Digital Delivery & Re-binding', description: 'Encrypted transfer or DMS upload with original document re-filing.' }
    ],
    faqs: [
      { question: 'Can you perform scanning at our premises (on-site scanning)?', answer: 'Yes, for confidential records (legal, banking, medical), we deploy our high-speed scanners and vetted operators directly inside client facilities.' },
      { question: 'What is the Udyam NIC classification?', answer: 'It sits under NIC 62099 (Other information technology and computer service activities) and related data processing SACs.' }
    ],
    relatedSlugs: ['csc-digital-citizen-services', 'tender-procurement-supply', 'private-security'],
    metaTitle: 'Document Scanning, OCR & Digitalization Services | JSM Integrated Services',
    metaDescription: 'Enterprise document scanning, bulk digitization, OCR indexing, data entry, and IT support services in Tamil Nadu.'
  },
  {
    slug: 'csc-digital-citizen-services',
    code: 'AUX-CSC',
    title: 'CSC & Digital Citizen Facilitation Services',
    shortTitle: 'Citizen Services',
    workforceClassification: 'CSC & e-Governance Facilitation Officers',
    gstSac: 'Applicable SAC based on actual digital facilitation service supplied',
    officialDescription: 'Digital citizen facilitation and authorised CSC-related services including online application assistance, digital form support, scanning, printing, document upload and other permitted digital facilitation services.',
    phase: 'Auxiliary Capability',
    isCoreLaunch: false,
    category: 'csc',
    categoryLabel: 'Auxiliary: Citizen Services',
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
    heroImage: '/images/real_jsm_welcome_trichy_salute.jpg',
    complianceNotice: 'Operated strictly as per government portal guidelines and authorized citizen service facilitation norms.',
    features: [
      { title: 'Online Govt Application Assistance', description: 'Guidance and submission on central, state, and municipal e-governance portals.', icon: 'CheckCircle' },
      { title: 'Digital Form Filling & Status Tracking', description: 'Error-free document upload, application tracking, and certificate downloads.', icon: 'FileText' },
      { title: 'Document Scanning & Upload', description: 'Fast document compression and sizing for government upload portals.', icon: 'Layers' },
      { title: 'Printing, Photocopy & Lamination', description: 'High-speed black & white / color printing and protective thermal lamination.', icon: 'Printer' },
      { title: 'Utility & Bill Payment Facilitation', description: 'Electricity, water, property tax, and telecom bill payment support.', icon: 'CreditCard' },
      { title: 'Digital Literacy Assistance', description: 'Empowering first-time digital users with secure online navigation guidance.', icon: 'HelpCircle' }
    ],
    process: [
      { step: 1, title: 'Requirement Identification', description: 'Determining the exact citizen service, government portal, and mandatory documents.' },
      { step: 2, title: 'Document Digitization & Verification', description: 'Scanning and resizing proof of identity and address documents.' },
      { step: 3, title: 'Portal Submission & Acknowledgement', description: 'Accurate form entry with instant generation of government application reference numbers.' },
      { step: 4, title: 'Status Tracking & Delivery', description: 'Regular follow-up until certificate or approval download is completed.' }
    ],
    faqs: [
      { question: 'What citizen services are offered?', answer: 'We facilitate online government portal applications, digital form filling, document scanning, color printing, lamination, and utility bill payments.' }
    ],
    relatedSlugs: ['scanning-digitalization-it', 'tender-procurement-supply'],
    metaTitle: 'CSC & Digital Citizen Services | JSM Integrated Services',
    metaDescription: 'Authorized digital citizen facilitation, e-governance applications, form filling, and document printing in Tiruchirappalli, Tamil Nadu.'
  }
];

export const services = servicesData;
