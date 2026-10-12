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
  phase: 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Auxiliary Capability' | 'Digital & Automation';
  isCoreLaunch: boolean;
  category: 'security' | 'facilities' | 'manpower' | 'tender' | 'digital' | 'csc' | 'logistics' | 'events' | 'property' | 'automation' | 'marketing' | 'software';
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
  'Digital: Web & Software Engineering',
  'Digital: WhatsApp & Customer Automation',
  'Digital: Smart NFC, QR & Review Systems',
  'Digital: Growth & Performance Marketing'
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
    description: 'JSM Integrated Services delivers structured, disciplined private security guarding across Tamil Nadu and South India. Operating under strict compliance with the Private Security Agencies (Regulation) Act (PSARA) and Tamil Nadu Home Department rules, our security personnel comprise disciplined Ex-Servicemen (ESM) officers, seasoned private security supervisors, and vetted male & female security guards.',
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
    complianceNotice: 'Governed by the Private Security Agencies Regulation Act (PSARA 2005) under the Controlling Authority, Home Department, Government of Tamil Nadu; 100% Aadhaar and police verified with mandatory pre-deployment training.',
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
    metaTitle: 'Security & Protection Services Tamil Nadu',
    metaDescription: 'PSARA-compliant security guarding (ESM & Private Male & Female) with 2-hour relief SLAs and 2:00 AM supervisor van audits across Tamil Nadu.'
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
    valueProposition: 'Pre-vetted industrial and technical contract staffing deployed within 48–72 hours with complete EPF/ESIC legal indemnity and monthly ECR verification.',
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
    metaTitle: 'Manpower & Corporate Staffing Solutions',
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
    metaTitle: 'Commercial Housekeeping & Facility Management',
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
    metaTitle: 'Tender Management, GeM Seller & Procurement',
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
    metaTitle: 'Document Scanning, OCR & Digitalization',
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
    metaTitle: 'CSC & Digital Citizen Services',
    metaDescription: 'Authorized digital citizen facilitation, e-governance applications, form filling, and document printing in Tiruchirappalli, Tamil Nadu.'
  },
  {
    slug: 'website-design-development',
    code: 'TECH-WEB-01',
    title: 'High-Converting Website Design & Custom Web Development',
    shortTitle: 'Website & Web Portals',
    workforceClassification: 'Enterprise Web Architecture & Digital Engineering (Led by CTO R Jan Steve Daniel)',
    gstSac: 'SAC 998314 – Information Technology Design and Development Services',
    officialDescription: 'Custom website design, high-converting landing pages, corporate web portals, e-commerce storefronts, and performance-optimized web architectures built with Next.js and Tailwind CSS.',
    phase: 'Digital & Automation',
    isCoreLaunch: true,
    category: 'software',
    categoryLabel: 'Digital: Web & Software Engineering',
    valueProposition: 'Sub-second load times, mobile-first responsive architecture, Core Web Vitals 95+, and built-in WhatsApp conversion funnels starting from ₹9,999.',
    description: 'Under the technical direction of Chief Technical Officer R Jan Steve Daniel, JSM Digital delivers enterprise-grade web development tailored for growing businesses across Tamil Nadu and South India. We replace slow, generic WordPress themes with custom-coded Next.js websites engineered for maximum search visibility, lightning-fast Core Web Vitals, and direct WhatsApp lead capture.',
    whoItIsFor: [
      'Local Service Businesses & Multi-Branch Contractors',
      'Hospitals, Clinics, Diagnostic Labs & Dental Centers',
      'Manufacturing Units, Exporters & Industrial Suppliers',
      'Real Estate Promoters, Builders & Architecture Studios',
      'Educational Academies, Colleges & Training Institutes',
      'Retail Showrooms, Cafes & Fine Dining Restaurants'
    ],
    icon: 'Globe',
    heroImage: '/images/real_jsm_airport_terminal_platoon.jpg',
    complianceNotice: '100% W3C, WCAG 2.1 AA accessibility compliant, ISO/IEC 27001 data protection protocols, SSL/TLS 1.3 encryption, and GDPR/DPDP Act 2023 privacy adherence.',
    features: [
      { title: 'Core Web Vitals 95+ Guarantee', description: 'Engineered with Next.js and Tailwind CSS for instant sub-second page loads and zero layout shifts.', icon: 'Zap' },
      { title: 'Direct WhatsApp Conversion Funnel', description: 'Custom floating action triggers and pre-filled inquiry buttons that route high-intent leads straight to WhatsApp.', icon: 'MessageSquare' },
      { title: 'Mobile-First Responsive Layout', description: 'Flawlessly optimized for 100% of mobile screen viewports, tablets, and desktop resolutions.', icon: 'Smartphone' },
      { title: 'Local Schema.org & GEO Architecture', description: 'Structured JSON-LD schemas for rich snippets, Google Maps citations, and AI search indexing (Gemini/ChatGPT/AIO).', icon: 'Search' },
      { title: 'Automated Lead Capture & CRM Sync', description: 'Instant email and webhook notifications to Google Sheets, CRMs, or Telegram whenever a form is submitted.', icon: 'CheckCircle' },
      { title: 'Zero Monthly Lock-In & Full Ownership', description: 'Complete source code transfer, free SSL certificates, and cost-effective cloud hosting setups.', icon: 'Lock' }
    ],
    process: [
      { step: 1, title: 'Conversion Wireframe & Business Audit', description: 'Detailed analysis of your service offerings, USP, competitor positioning, and customer acquisition channels.' },
      { step: 2, title: 'Custom UI/UX & Copywriting Formulation', description: 'Designing clean, high-conversion visual mockups with persuasive Tamil/English copy and strategic call-to-actions.' },
      { step: 3, title: 'Next.js Frontend & WhatsApp Flow Build', description: 'Writing clean, typed TypeScript code with micro-interactions, responsive grids, and instant lead triggers.' },
      { step: 4, title: 'Domain, SSL & Search Console Go-Live', description: 'DNS configuration, XML sitemap generation, indexing submission, and analytics tracking activation within 5–7 days.' }
    ],
    faqs: [
      { question: 'How much does a custom business website cost in Trichy or Chennai?', answer: 'Our starter conversion landing pages begin at ₹9,999 one-time. Comprehensive multi-page corporate portals with custom dynamic pages, CMS capabilities, and advanced schemas start from ₹24,999, with transparent annual domain and cloud maintenance support.' },
      { question: 'How long does development take from start to launch?', answer: 'A standard 5–8 page conversion website is fully designed, developed, reviewed, and deployed live within 5 to 7 business days once brand assets and content are confirmed.' },
      { question: 'Can customers message my business directly on WhatsApp from the website?', answer: 'Yes, every website includes contextual WhatsApp click-to-chat triggers with pre-filled service inquiries, enabling instant one-tap messaging without saving phone numbers.' },
      { question: 'Will my website appear on Google Search and Google Maps?', answer: 'Yes. We bake in comprehensive Schema.org structured data (LocalBusiness, Service, FAQPage), OpenGraph social metadata, and submit verified XML sitemaps to Google Search Console and Bing.' }
    ],
    relatedSlugs: ['local-seo-gbp-ranking', 'whatsapp-automation-crm', 'nfc-review-standees'],
    metaTitle: 'Website Design & Web Development Services | Trichy & Chennai',
    metaDescription: 'High-converting Next.js website design, local SEO, and WhatsApp lead capture portals by JSM Integrated Services. Launch your business online within 7 days.'
  },
  {
    slug: 'whatsapp-automation-crm',
    code: 'TECH-WA-02',
    title: 'Official WhatsApp Business API Automation & AI Chatbots',
    shortTitle: 'WhatsApp API & Chatbots',
    workforceClassification: 'Technology & Automation Systems Division (Led by CTO R Jan Steve Daniel)',
    gstSac: 'SAC 998313 – Information Technology Application & Automation Services',
    officialDescription: 'Official Meta WhatsApp Business Cloud API integration, automated customer lead capture, conversational chatbots, 24/7 interactive service menus, and multi-agent team inbox setups.',
    phase: 'Digital & Automation',
    isCoreLaunch: true,
    category: 'automation',
    categoryLabel: 'Digital: WhatsApp & Customer Automation',
    valueProposition: 'Automate 80% of customer inquiries, capture qualified leads 24/7, and broadcast festival campaigns with official Meta Cloud API starting from ₹4,999 setup.',
    description: 'Upgrade from manual personal WhatsApp chats to the official Meta WhatsApp Business Cloud API. JSM Integrated Services configures intelligent conversational bots that greet incoming prospects, present interactive service catalogs, collect lead details, and book appointments 24 hours a day without manual staff intervention.',
    whoItIsFor: [
      'High-Volume Retail Showrooms & Boutiques',
      'Polyclinics, Diagnostic Centers & Dental Clinics',
      'Real Estate Promoters & Property Developers',
      'Automotive Service Centers & Detailing Studios',
      'Wedding Caterers, Mandapams & Event Venues',
      'Educational Institutes & Coaching Academies'
    ],
    icon: 'MessageSquare',
    heroImage: '/images/real_jsm_shift_muster_day.jpg',
    complianceNotice: 'Fully compliant with Meta WhatsApp Business Messaging Policy, India Digital Personal Data Protection Act (DPDP), and TRAI commercial communication norms.',
    features: [
      { title: 'Official Meta Cloud API Infrastructure', description: 'Enterprise-grade setup with official Meta verified business account and Green Tick eligibility.', icon: 'CheckCircle' },
      { title: '24/7 Interactive Button & List Menus', description: 'Interactive clickable reply buttons for service selection, price quotes, and appointment booking.', icon: 'Bot' },
      { title: 'Multi-Agent Team Inbox Access', description: 'Allow multiple receptionists or sales executives to chat with customers from one single WhatsApp number.', icon: 'Users' },
      { title: 'Automated CRM & Google Sheets Sync', description: 'Instantly logs customer phone numbers, names, and inquiry choices into your centralized spreadsheet or CRM.', icon: 'Database' },
      { title: 'Scheduled Drip Sequences & Follow-Ups', description: 'Automated polite follow-up messages sent 24 hours after an inquiry to close undecided buyers.', icon: 'Clock' },
      { title: 'Official Media Broadcasts & Catalogs', description: 'Send approved rich media brochures, PDF rate cards, and festival offers without risk of phone number ban.', icon: 'Send' }
    ],
    process: [
      { step: 1, title: 'Meta Business Manager & Number Verification', description: 'Creating or verifying your Meta Business Portfolio, configuring phone numbers, and obtaining official API access.' },
      { step: 2, title: 'Conversational Workflow Architecture', description: 'Drafting intelligent logic branches for greetings, FAQs, pricing requests, and handover triggers.' },
      { step: 3, title: 'Webhook Integration & Database Binding', description: 'Connecting automated endpoints to your Google Sheet, billing CRM, or calendar scheduler.' },
      { step: 4, title: 'Staff Onboarding & Live Simulation Drill', description: 'Training your team on the live multi-agent dashboard and testing end-to-end user journeys.' }
    ],
    faqs: [
      { question: 'Will my phone number get banned by WhatsApp?', answer: 'No. We deploy the official Meta WhatsApp Business Cloud API, which is 100% authorized by Meta. Unlike unauthorized third-party bulk tools that get banned, the official API protects your business reputation and phone number permanently.' },
      { question: 'How much does the WhatsApp Business API setup cost?', answer: 'One-time onboarding and custom conversation flow setup begins at ₹4,999. Monthly server routing and flow optimization starts from ₹1,499/month, with Meta conversation fees billed directly at official wholesale rates.' },
      { question: 'Can multiple employees answer messages from the same number?', answer: 'Yes! The official WhatsApp Business API allows 5 to 50+ staff members across computers and mobile apps to handle incoming chats simultaneously under a unified business number.' }
    ],
    relatedSlugs: ['missed-call-lead-recovery', 'nfc-review-standees', 'website-design-development'],
    metaTitle: 'WhatsApp Business API Automation & Chatbots | Trichy & Chennai',
    metaDescription: 'Official Meta WhatsApp Business API integration, AI customer chatbots, and 24/7 automated lead recovery by JSM Integrated Services.'
  },
  {
    slug: 'missed-call-lead-recovery',
    code: 'TECH-LEAD-03',
    title: 'Automated Missed-Call to WhatsApp Lead Saver & Instant Callback',
    shortTitle: 'Missed-Call Lead Recovery',
    workforceClassification: 'Telephony & Intelligent Automation Systems (Led by CTO R Jan Steve Daniel)',
    gstSac: 'SAC 998313 – Telecommunications & IT Automation Services',
    officialDescription: 'Intelligent missed call detection and instant WhatsApp auto-responder system that immediately engages callers within 5 seconds of an unanswered or busy call.',
    phase: 'Digital & Automation',
    isCoreLaunch: true,
    category: 'automation',
    categoryLabel: 'Digital: WhatsApp & Customer Automation',
    valueProposition: 'Recover ₹25,000+ in lost business every month. Detects missed calls and automatically sends a personalized WhatsApp greeting within 5 seconds with an interactive service menu.',
    description: 'When a prospect calls your business while you are busy, driving, or in a meeting, they typically dial your nearest competitor within 60 seconds. JSM Missed-Call to WhatsApp Lead Saver captures that caller instantly. Within 5 seconds of the call disconnecting, an automated WhatsApp message arrives on the caller phone introducing your business, providing a direct menu, and offering an instant quote.',
    whoItIsFor: [
      'Wedding Mandapams & Event Caterers',
      'Automotive Garages & Mobile Car Detailers',
      'HVAC, AC Repair & Home Appliance Service Technicians',
      'Specialist Doctors, Pediatricians & Dental Clinics',
      'Advocates, Auditors & Corporate Consultants',
      'Packers & Movers and Emergency Logistics Operators'
    ],
    icon: 'PhoneForwarded',
    heroImage: '/images/real_jsm_guard_squad_night.jpg',
    complianceNotice: 'Operates strictly within TRAI telecommunication regulations and Meta WhatsApp Business Messaging guidelines.',
    features: [
      { title: 'Sub-5-Second Auto Response', description: 'Triggers a branded WhatsApp greeting before the prospective client can call your competitor.', icon: 'Zap' },
      { title: 'Interactive Service Menu', description: 'Provides clickable options for services, pricing estimation, and preferred callback times.', icon: 'Bot' },
      { title: 'Instant Owner Alert Notification', description: 'Sends a priority notification to the business owner or manager via WhatsApp or Telegram with the caller details.', icon: 'PhoneCall' },
      { title: 'After-Hours & Sunday Mode', description: 'Tailored automated messaging informing callers of office hours while capturing their inquiry details.', icon: 'Clock' },
      { title: 'Zero Special Hardware Required', description: 'Works seamlessly with your existing Android business smartphones or virtual cloud IVR numbers.', icon: 'Smartphone' },
      { title: 'Daily Lead Reconciliation Digest', description: 'Receive an automated evening summary of all missed calls recovered and resulting conversions.', icon: 'FileText' }
    ],
    process: [
      { step: 1, title: 'Number & Routing Audit', description: 'Evaluating your call volume, current SIM setup, or establishing cloud telephony listener hooks.' },
      { step: 2, title: 'Branded WhatsApp Flow Formulation', description: 'Crafting persuasive greeting copy with quick-reply buttons and digital portfolio links.' },
      { step: 3, title: 'Automation Engine Configuration', description: 'Installing the secure trigger daemon and testing sub-5-second delivery reliability.' },
      { step: 4, title: 'Live Simulation & Operational Handover', description: 'Conducting test calls to verify instantaneous delivery and alert notification pathways.' }
    ],
    faqs: [
      { question: 'How quickly does the WhatsApp message reach the caller?', answer: 'The automated greeting is dispatched within 3 to 5 seconds of the call ending or being rejected, ensuring the caller is engaged before searching for other providers.' },
      { question: 'What is the setup cost for missed call lead recovery?', answer: 'One-time setup is ₹2,499. Ongoing server maintenance, routing, and daily reporting is available at ₹799/month, saving tens of thousands in lost revenue.' },
      { question: 'Do I need to buy expensive PBX hardware or new SIM cards?', answer: 'No. The system works directly with your existing business Android mobile phones or can be linked to cloud IVR numbers.' }
    ],
    relatedSlugs: ['whatsapp-automation-crm', 'nfc-review-standees', 'website-design-development'],
    metaTitle: 'Missed-Call to WhatsApp Lead Recovery System | Trichy & Chennai',
    metaDescription: 'Recover lost inquiries instantly with sub-5-second WhatsApp auto-replies for missed phone calls by JSM Integrated Services.'
  },
  {
    slug: 'nfc-review-standees',
    code: 'TECH-NFC-04',
    title: 'Smart Review Filter NFC Standee & 5-Star Google Maps Booster',
    shortTitle: 'NFC Review Filter Standees',
    workforceClassification: 'Smart Hardware & Reputation Engineering (Led by CTO R Jan Steve Daniel)',
    gstSac: 'SAC 998314 & HSN 8523 – Smart NFC Technology & Reputation Systems',
    officialDescription: 'Custom UV-printed NFC and QR acrylic counter standees with dynamic intelligent review filtering that routes positive reviews to Google Maps and private complaints to WhatsApp.',
    phase: 'Digital & Automation',
    isCoreLaunch: true,
    category: 'automation',
    categoryLabel: 'Digital: Smart NFC, QR & Review Systems',
    valueProposition: 'Safeguard your reputation while doubling public 5-star Google reviews. 4–5 star ratings route to Google Maps; 1–3 star complaints redirect to your private WhatsApp desk for ₹1,499.',
    description: 'Public Google reviews make or break local businesses. JSM Smart Review Filter NFC Standee combines high-end acrylic hardware with smart cloud routing. When customers tap their smartphone (or scan the QR code), an elegant rating interface appears. If they choose 4 or 5 stars, they are instantly redirected to your Google Maps review box. If they choose 1 to 3 stars, they are routed to a private feedback form that alerts you directly on WhatsApp—stopping negative public reviews before they happen.',
    whoItIsFor: [
      'Hair Salons, Spas & Beauty Clinics',
      'Dental Clinics, Eye Hospitals & Pediatricians',
      'Cafes, Fine-Dining Restaurants & Bakeries',
      'Automotive Detailing Studios & Car Dealerships',
      'Hotels, Resorts & Guest Houses',
      'Retail Boutiques, Jewellery Showrooms & Opticians'
    ],
    icon: 'Star',
    heroImage: '/images/real_jsm_welcome_trichy_salute.jpg',
    complianceNotice: 'Complies with consumer electronics radio-frequency standards (NFC ISO/IEC 14443A) and Google Maps review guidelines.',
    features: [
      { title: 'Instant Tap & Scan Technology', description: 'High-sensitivity NTAG213/215 embedded chip for tap-and-go with high-res dynamic QR fallback.', icon: 'QrCode' },
      { title: 'Intelligent Sentiment Gatekeeper', description: 'Smart logic routes satisfied clients to public Google Maps and dissatisfied clients to private WhatsApp.', icon: 'Shield' },
      { title: 'Direct Google Place ID Deep Link', description: 'Opens the official 5-star Google review box directly without requiring customers to search your name.', icon: 'Search' },
      { title: 'Premium Laser-Cut Acrylic Design', description: 'Scratch-resistant, weighted acrylic standee with vibrant custom company branding and UV printing.', icon: 'Sparkles' },
      { title: 'Zero Customer App Required', description: 'Works instantaneously with standard iPhone (iOS) and Android cameras and NFC readers.', icon: 'Smartphone' },
      { title: 'Dynamic Link Management Dashboard', description: 'Update destination Google Place IDs or WhatsApp numbers remotely anytime without reprinting the standee.', icon: 'Database' }
    ],
    process: [
      { step: 1, title: 'Brand Asset & Google Place ID Integration', description: 'Extracting your official Google Business Profile Place ID and vectorizing your brand logo.' },
      { step: 2, title: 'Smart Filtering Route Configuration', description: 'Programming the sentiment gateway and connecting the private feedback channel to your WhatsApp.' },
      { step: 3, title: 'UV Printing & NFC Chip Encoding', description: 'Precision laser-cutting acrylic standees and encoding weatherproof NTAG microchips.' },
      { step: 4, title: 'Dispatch, Placement & Staff Coaching', description: 'Delivering the standee with our 60-second billing counter verbal script that gets 80%+ of customers to tap.' }
    ],
    faqs: [
      { question: 'Does this standee work on all smartphones?', answer: 'Yes. All modern iPhones and Android smartphones support instantaneous NFC tap. For older devices with NFC disabled, the high-resolution dynamic QR code provides the exact same instant filtering experience.' },
      { question: 'How much does the Smart Review Filter NFC Standee cost?', answer: 'A single custom-branded acrylic counter standee is ₹1,499 one-time. A 3-standee multi-counter bundle with dynamic URL cloud management is ₹3,499 with free shipping across Tamil Nadu.' },
      { question: 'What happens when a customer gives a 1 or 2-star rating?', answer: 'The customer is politely thanked and given a private feedback screen that sends their exact complaint directly to your personal WhatsApp. It does NOT open Google Maps, preventing harmful public 1-star ratings.' },
      { question: 'Can the link be changed if I change my Google Business Profile?', answer: 'Yes. Because our standees utilize dynamic redirection architecture, our technical team can update your destination link in the cloud anytime without replacing the physical standee.' }
    ],
    relatedSlugs: ['local-seo-gbp-ranking', 'whatsapp-automation-crm', 'qr-table-ordering'],
    metaTitle: 'Smart NFC Google Review Standee | Negative Review Filter Standee',
    metaDescription: 'Double your 5-star Google reviews and block negative public ratings with JSM Smart Review Filter NFC & QR standees. Custom branded acrylic standees for Tamil Nadu businesses.'
  },
  {
    slug: 'qr-table-ordering',
    code: 'TECH-QR-05',
    title: 'Direct-to-WhatsApp Table Ordering QR Menu (Zero-Commission)',
    shortTitle: 'QR Table Ordering Menu',
    workforceClassification: 'Digital Hospitality & Automation Systems (Led by CTO R Jan Steve Daniel)',
    gstSac: 'SAC 998314 – Digital Hospitality Ordering Solutions',
    officialDescription: 'Interactive digital restaurant menu allowing diners to scan a table QR code, browse high-resolution dish photos, and submit structured orders directly to the restaurant WhatsApp billing counter without commissions.',
    phase: 'Digital & Automation',
    isCoreLaunch: true,
    category: 'automation',
    categoryLabel: 'Digital: Smart NFC, QR & Review Systems',
    valueProposition: 'Bypass 30% Swiggy/Zomato dine-in commissions. Diners scan table QR codes, select dishes, and send structured orders straight to your WhatsApp billing desk.',
    description: 'Food businesses in Trichy and Chennai lose thousands of rupees to food aggregators and slow manual order taking. JSM Direct-to-WhatsApp Table Ordering QR Menu provides an ultra-fast digital dining experience. Diners scan an acrylic stand on their table, explore a mouth-watering visual menu with veg/non-veg tags, customize their items, and tap one button to send their exact order with their table number directly to the kitchen billing desk. Simultaneously, you capture their phone number for future festival marketing.',
    whoItIsFor: [
      'Family Restaurants & Non-Vegetarian Messes',
      'Specialty Cafes & Rooftop Lounges',
      'Cloud Kitchens & Takeaway Counters',
      'Dessert Parlors, Juice Bars & Tea Cafes',
      'Resort Dining Areas & Poolside Bars'
    ],
    icon: 'Utensils',
    heroImage: '/images/real_jsm_airport_drill.jpg',
    complianceNotice: 'Food service customer data handled in full compliance with FSSAI hygiene guidelines and IT Act data privacy standards.',
    features: [
      { title: 'Zero Commission Fees', description: 'Keep 100% of your dine-in and parcel revenue with zero aggregator cut or per-order commissions.', icon: 'Banknote' },
      { title: 'Mouthwatering Visual Menu', description: 'Showcase high-resolution photographs, ingredients, spicy ratings, and clear veg/non-veg badges.', icon: 'Sparkles' },
      { title: 'Table-Specific Order Formatting', description: 'Orders arrive pre-formatted on WhatsApp showing Table Number, Quantity, Special Instructions, and Total Bill.', icon: 'FileText' },
      { title: 'Instant Out-of-Stock Toggling', description: 'Hide sold-out dishes instantly from your phone without expensive paper reprints.', icon: 'CheckCircle' },
      { title: 'Customer Database Accumulator', description: 'Every order automatically stores the customer phone number for authorized Diwali and New Year festival promotions.', icon: 'Database' },
      { title: 'Durable Acrylic Table Stands Included', description: 'Supplied with waterproof, heat-resistant table tents and QR tent cards tailored to your restaurant decor.', icon: 'QrCode' }
    ],
    process: [
      { step: 1, title: 'Menu Digitization & Categorization', description: 'Transcribing your food items, pricing, combos, and curating vibrant dish imagery.' },
      { step: 2, title: 'WhatsApp Billing Desk Hook', description: 'Configuring the receiving phone number (cashier/kitchen) and automated order acknowledgement messages.' },
      { step: 3, title: 'Table QR Acrylic Standee Production', description: 'Printing table-coded QR stands (Table 1 through Table 50) on premium acrylic.' },
      { step: 4, title: 'Service Staff Operational Drill', description: 'Briefing floor captains and stewards on assisting diners with the 30-second ordering process.' }
    ],
    faqs: [
      { question: 'How much does the WhatsApp QR Table Ordering menu cost?', answer: 'Complete setup with menu digitization and 15 table acrylic stands is ₹4,999 one-time. Ongoing hosting, menu item updates, and promotional broadcast support is ₹999/month.' },
      { question: 'Do customers need to download an application to order?', answer: 'No. Diners simply scan the QR code with their default camera app, browse the fast mobile menu, and send the order via their standard WhatsApp.' },
      { question: 'Can we change prices or add new seasonal dishes easily?', answer: 'Yes! You can add, edit, or toggle items on/off within seconds from an easy mobile dashboard without reprinting any table QR codes.' }
    ],
    relatedSlugs: ['whatsapp-loyalty-punch-card', 'nfc-review-standees', 'whatsapp-automation-crm'],
    metaTitle: 'WhatsApp QR Table Ordering Menu | Zero-Commission Digital Menu',
    metaDescription: 'Cut food aggregator commissions with JSM Direct-to-WhatsApp Table Ordering QR Menu. Fast digital ordering for restaurants and cafes in Tamil Nadu.'
  },
  {
    slug: 'whatsapp-loyalty-punch-card',
    code: 'TECH-LOYAL-06',
    title: 'App-Free WhatsApp Digital Loyalty Punch Card & Repeat Rewards',
    shortTitle: 'Digital Loyalty Punch Card',
    workforceClassification: 'Customer Retention & Loyalty Systems (Led by CTO R Jan Steve Daniel)',
    gstSac: 'SAC 998313 – Customer Loyalty Software Services',
    officialDescription: 'Digital loyalty stamp and punch card engine operating entirely inside WhatsApp, allowing retail customers to collect digital visit stamps and redeem rewards without downloading any mobile app.',
    phase: 'Digital & Automation',
    isCoreLaunch: true,
    category: 'automation',
    categoryLabel: 'Digital: WhatsApp & Customer Automation',
    valueProposition: 'Boost repeat visits by 25%+. Replace lost paper punch cards with a digital stamp card inside WhatsApp with automated 30-day win-back alerts.',
    description: 'Paper loyalty punch cards get lost or forgotten in wallets, and proprietary mobile apps have a 95% download drop-off rate. JSM WhatsApp Digital Loyalty Punch Card brings customer retention into the messaging app they use daily. At the billing counter, customers scan a cashier QR code. Their visit is instantly recorded, and they receive a cheerful WhatsApp alert: "Visit 3 of 5 completed! Just 2 more visits to unlock your Free Hair Spa." Automated win-back reminders re-engage lapsed customers before they switch to competitors.',
    whoItIsFor: [
      'Hair Salons, Barber Shops & Nail Spas',
      'Car Detailing Studios & Foam Washes',
      'Specialty Bakeries, Waffle & Ice Cream Parlors',
      'Boutique Fitness Studios & Yoga Centers',
      'Pet Grooming & Veterinary Clinics'
    ],
    icon: 'Award',
    heroImage: '/images/real_jsm_welcome_trichy_salute.jpg',
    complianceNotice: 'Strictly opt-in retention mechanics adhering to Indian Consumer Protection (E-Commerce) Rules and Telecom messaging norms.',
    features: [
      { title: 'Zero App Downloads Required', description: 'Operates 100% inside WhatsApp—no app store downloads or forgotten passwords.', icon: 'CheckCircle' },
      { title: 'Instant WhatsApp Stamp Feedback', description: 'Customers receive an immediate digital card visualization showing current stamp count and reward goal.', icon: 'MessageSquare' },
      { title: 'Automated 30-Day Win-Back Engine', description: 'Automatically detects when a customer has not visited in 30 days and sends a friendly incentive to return.', icon: 'Clock' },
      { title: 'Cashier Fraud-Proof Authentication', description: 'PIN-protected cashier stamping screen ensures visits are only credited on verified paid transactions.', icon: 'Shield' },
      { title: 'Customer Lifetime Value Analytics', description: 'Track top spending clients, visit frequency, and campaign ROI on a live merchant dashboard.', icon: 'BarChart3' },
      { title: 'Seamless Counter QR Standee', description: 'Includes a branded acrylic counter QR standee placed right at the cash register.', icon: 'QrCode' }
    ],
    process: [
      { step: 1, title: 'Loyalty Reward Structure Design', description: 'Defining the optimal milestone (e.g., "5th Coffee Free" or "4th Car Wash at 50% Off") to maximize visit frequency.' },
      { step: 2, title: 'WhatsApp Template & Cashier PIN Setup', description: 'Configuring interactive stamp notification templates and secret cashier verification PINs.' },
      { step: 3, title: 'Acrylic Counter Standee Delivery', description: 'Deploying the durable QR display at the checkout desk with staff instructions.' },
      { step: 4, title: 'Automated Retention Launch', description: 'Activating automated milestone congratulation messages and inactivity win-back rules.' }
    ],
    faqs: [
      { question: 'How does the cashier verify a customer without cheating?', answer: 'The cashier scanning portal is secured with a secret 4-digit PIN. Only staff who enter the PIN can approve a visit stamp, eliminating fraudulent self-stamping.' },
      { question: 'What is the pricing for the WhatsApp Loyalty system?', answer: 'Initial setup, rule configuration, and counter acrylic standee is ₹3,999 one-time. Cloud loyalty database hosting and automated win-back message management is ₹999/month.' },
      { question: 'How does it help bring customers back?', answer: 'Our built-in win-back engine automatically scans for clients who have not returned within 30 or 45 days and dispatches a personalized WhatsApp reminder with an exclusive incentive.' }
    ],
    relatedSlugs: ['qr-table-ordering', 'nfc-review-standees', 'whatsapp-automation-crm'],
    metaTitle: 'WhatsApp Digital Loyalty Punch Card | Customer Retention System',
    metaDescription: 'Increase repeat customer visits by 25% with JSM App-Free WhatsApp Digital Loyalty Punch Card. Zero apps needed, 100% inside WhatsApp.'
  },
  {
    slug: 'clinic-token-tracker',
    code: 'TECH-CLINIC-07',
    title: 'Live Clinic & Hospital Waiting Token Queue Tracker on WhatsApp',
    shortTitle: 'Clinic Queue Token Tracker',
    workforceClassification: 'Healthcare Systems & Queue Optimization (Led by CTO R Jan Steve Daniel)',
    gstSac: 'SAC 998313 – Healthcare Queue Management & IT Services',
    officialDescription: 'Real-time patient queue monitoring system that delivers live token status updates via WhatsApp and web links, clearing crowded waiting rooms and eliminating repetitive reception inquiries.',
    phase: 'Digital & Automation',
    isCoreLaunch: true,
    category: 'automation',
    categoryLabel: 'Digital: WhatsApp & Customer Automation',
    valueProposition: 'Clear overcrowded hospital waiting lounges and eliminate 80% of repetitive receptionist inquiries. Patients track doctor consultation queues live from home or car.',
    description: 'Waiting 2 to 3 hours in a packed hospital waiting room is stressful for patients and exhausting for reception staff who answer "How many more patients before me?" 100 times daily. JSM Live Clinic Waiting Token Tracker solves this completely. When patients take a token, they receive a live tracking link via WhatsApp. As the doctor clicks Next Patient, the live web counter advances in real time. When only 2 patients remain, an automated WhatsApp alert notifies the patient to enter the consultation lobby.',
    whoItIsFor: [
      'High-Volume Pediatric & Child Care Clinics',
      'Orthopedic & Joint Care Centers',
      'Obstetrics & Gynecology Specialists',
      'Ophthalmology & Eye Hospitals',
      'Diagnostic Imaging & Blood Collection Centers',
      'Multi-Doctor Polyclinics across Thillai Nagar & Anna Nagar'
    ],
    icon: 'Stethoscope',
    heroImage: '/images/real_jsm_airport_terminal_platoon.jpg',
    complianceNotice: 'Fully HIPAA and Indian Electronic Health Record (EHR) privacy compliant. Zero patient medical data exposed.',
    features: [
      { title: 'Live Token Counter Web Link', description: 'Patients view real-time status on a lightweight web page: "Now Serving: Token 14 | You: Token 18".', icon: 'Globe' },
      { title: 'Automated WhatsApp 2-Patient Proximity Alert', description: 'Sends an automatic reminder alert when the patient is 2 tokens away, ensuring zero doctor idle time.', icon: 'MessageSquare' },
      { title: 'One-Click Receptionist Calling Portal', description: 'Receptionists or consulting nurses advance tokens with a single tap on any mobile or desktop screen.', icon: 'CheckCircle' },
      { title: 'Emergency Delay & Surgery Broadcast', description: 'Instantly notify all waiting patients via WhatsApp if the doctor is delayed for an emergency case.', icon: 'AlertTriangle' },
      { title: 'Thermal Slip QR Integration', description: 'Embeds a dynamic QR code directly onto your existing thermal token slips for instant patient scanning.', icon: 'QrCode' },
      { title: 'Doctor Efficiency Analytics', description: 'Monitor average consultation times, peak patient arrival hours, and total patient throughput.', icon: 'BarChart3' }
    ],
    process: [
      { step: 1, title: 'Clinic Workflow & Token Mapping', description: 'Reviewing current token issuance (physical paper, thermal roll, or appointment book) and doctor schedule.' },
      { step: 2, title: 'Receptionist Counter Dashboard Setup', description: 'Configuring the fast 1-tap counter advancement interface for receptionist workstations or smartphones.' },
      { step: 3, title: 'Live Patient Web Page & WhatsApp Hook', description: 'Styling the patient tracking portal with clinic branding, doctor name, and consultation guidelines.' },
      { step: 4, title: 'Front-Desk Training & Deployment', description: 'Training reception staff and deploying tabletop acrylic "Scan for Live Status" guidance displays.' }
    ],
    faqs: [
      { question: 'Does the patient need to install any hospital software or app?', answer: 'No. Patients either scan the QR code on their token slip or receive a direct WhatsApp message containing their personal live tracking link. It opens instantly in any mobile browser.' },
      { question: 'What is the implementation and retainer cost?', answer: 'One-time clinic setup and staff training is ₹6,999. Cloud queue server infrastructure, real-time sync, and unlimited patient WhatsApp notifications is ₹1,499/month.' },
      { question: 'What if a doctor arrives 45 minutes late due to an emergency?', answer: 'The receptionist can click "Broadcast Delay" to send an immediate WhatsApp announcement to all waiting patients, allowing them to relax at home rather than overcrowding the waiting lobby.' }
    ],
    relatedSlugs: ['whatsapp-automation-crm', 'missed-call-lead-recovery', 'nfc-review-standees'],
    metaTitle: 'Live Clinic Waiting Token Tracker | WhatsApp Patient Queue System',
    metaDescription: 'Clear crowded clinic waiting rooms with JSM Live Waiting Token Tracker. Real-time patient queue updates and automated WhatsApp alerts for Tamil Nadu clinics.'
  },
  {
    slug: 'garage-service-tracker',
    code: 'TECH-GARAGE-08',
    title: 'Garage Digital Job Card & WhatsApp Vehicle Service Stage Tracker',
    shortTitle: 'Garage Service Stage Tracker',
    workforceClassification: 'Automotive Service Technology (Led by CTO R Jan Steve Daniel)',
    gstSac: 'SAC 998313 – Workshop Automation & IT Systems',
    officialDescription: 'Digital vehicle repair job card and automated WhatsApp status tracking system that sends real-time photo inspection reports and spare part approval buttons to car owners.',
    phase: 'Digital & Automation',
    isCoreLaunch: true,
    category: 'automation',
    categoryLabel: 'Digital: WhatsApp & Customer Automation',
    valueProposition: 'Build 100% trust and speed up repair approvals. Send automated WhatsApp photo updates across vehicle repair stages with one-tap customer spare-part approvals.',
    description: 'Car and bike owners hate not knowing the real status of their vehicle in a repair garage or detailing studio, and mechanics waste hours calling customers for spare-part approvals. JSM Garage Digital Job Card & WhatsApp Vehicle Service Stage Tracker modernizes your workshop. As mechanics progress through vehicle intake, inspection, parts replacement, and final wash, automated photo updates and live stage alerts are sent to the owner WhatsApp, culminating in a digital GST invoice.',
    whoItIsFor: [
      'Multi-Brand Car Service Garages & Mechanics',
      'Ceramic Coating, PPF & Detailing Studios',
      'Premium Two-Wheeler & Superbike Workshops',
      'Automotive Body Shops, Denting & Painting Centers',
      'Fleet Maintenance Depots & Transport Hubs'
    ],
    icon: 'Wrench',
    heroImage: '/images/real_jsm_shift_muster_day.jpg',
    complianceNotice: 'Secure cloud document storage complying with Motor Vehicles Act record standards and GST invoice e-delivery rules.',
    features: [
      { title: 'Digital Mobile Job Card', description: 'Mechanics record fuel level, odometer, scratches, and customer requests directly on a smartphone.', icon: 'Smartphone' },
      { title: '4-Stage WhatsApp Progress Alerts', description: 'Sends automated alerts: 1. Vehicle Received, 2. In Progress, 3. Washing & Polish, 4. Ready for Delivery.', icon: 'CheckCircle' },
      { title: 'Photo/Video Spare Part Approvals', description: 'Send photos of worn brake pads or suspension parts with one-tap "Approve" or "Reject" WhatsApp buttons.', icon: 'Camera' },
      { title: 'Digital PDF Bill Delivery', description: 'Automatically sends the verified estimate and GST invoice directly to the customer on WhatsApp.', icon: 'FileText' },
      { title: 'Automated 6-Month Service Reminders', description: 'Re-engages vehicle owners 180 days after delivery to schedule their next routine oil change or detailing.', icon: 'Clock' },
      { title: 'Eliminates Phone Disagreements', description: 'Timestamped photo logs and digital approvals protect the workshop from post-delivery customer disputes.', icon: 'Shield' }
    ],
    process: [
      { step: 1, title: 'Workshop Workflow & Stage Mapping', description: 'Customizing service stages (Mechanical, Detailing, Tinkering) to reflect your garage operations.' },
      { step: 2, title: 'Technician Mobile Interface Setup', description: 'Configuring the fast 60-second mobile job card input screen for service advisors.' },
      { step: 3, title: 'WhatsApp Template Approvals', description: 'Configuring interactive spare-part approval cards and delivery notification flows.' },
      { step: 4, title: 'Garage Floor Rollout & Handover', description: 'Testing end-to-end vehicle intake, stage advancement, and customer invoice dispatch.' }
    ],
    faqs: [
      { question: 'Can basic mechanics with little tech experience use it?', answer: 'Yes! The interface is built with large buttons, intuitive icons, and Tamil/English prompts. Creating a job card takes less than 60 seconds on any smartphone.' },
      { question: 'How much does the garage tracking system cost?', answer: 'Initial workshop configuration and technician training is ₹5,499 one-time. Unlimited job cards, photo storage, and WhatsApp messaging is ₹1,299/month.' },
      { question: 'How does it help increase workshop revenue?', answer: 'Workshops report a 35% faster approval rate on high-margin spare parts when customers receive clear photo evidence on WhatsApp rather than a vague phone call.' }
    ],
    relatedSlugs: ['emergency-parking-qr', 'nfc-review-standees', 'whatsapp-automation-crm'],
    metaTitle: 'Garage Digital Job Card & WhatsApp Vehicle Stage Tracker',
    metaDescription: 'Automate vehicle service status updates and spare-part photo approvals on WhatsApp with JSM Garage Digital Job Card for automotive workshops.'
  },
  {
    slug: 'emergency-parking-qr',
    code: 'TECH-PARK-09',
    title: 'Privacy-Safe Vehicle Emergency Parking QR Tag (Contactless Call)',
    shortTitle: 'Emergency Parking QR Tag',
    workforceClassification: 'Smart Vehicle Telematics & Security (Led by CTO R Jan Steve Daniel)',
    gstSac: 'SAC 998314 & HSN 3919 – Smart Vehicle Safety Tags',
    officialDescription: 'Privacy-safe windshield QR decal that enables people to notify double-parked or blocked car owners via masked WhatsApp and phone calls without revealing the owner personal contact number.',
    phase: 'Digital & Automation',
    isCoreLaunch: true,
    category: 'automation',
    categoryLabel: 'Digital: Smart NFC, QR & Review Systems',
    valueProposition: 'Protect vehicle owner privacy and resolve double-parking emergencies. Anyone can notify the car owner via WhatsApp without seeing their personal phone number for ₹299.',
    description: 'Leaving a handwritten mobile number on your car windshield in crowded commercial areas invites spam calls, harassment, and privacy violations. JSM Privacy-Safe Vehicle Emergency Parking QR Tag solves this elegant problem. Applied to the windshield, anyone blocked by your car simply scans the QR code. A clean interface lets them tap "Car is Blocked", "Window Open", or "Tow Alert", immediately relaying an urgent alert to the owner WhatsApp with full privacy protection.',
    whoItIsFor: [
      'Car & SUV Owners in Crowded Urban Cities',
      'Female Drivers Prioritizing Personal Contact Privacy',
      'Apartment Residential Welfare Associations (RWAs)',
      'Corporate Parking Facilities & Executive Fleets',
      'Commercial Shopping Complex & Office Parkings'
    ],
    icon: 'Car',
    heroImage: '/images/real_jsm_welcome_trichy_salute.jpg',
    complianceNotice: '100% compliant with Indian Telecom privacy regulations and Digital Personal Data Protection (DPDP) Act 2023.',
    features: [
      { title: '100% Personal Number Masking', description: 'Callers never see your private phone number; all alerts are securely routed via masked cloud endpoints.', icon: 'Shield' },
      { title: 'Instant Pre-Set Emergency Messages', description: 'Scanners tap 1-click options: "Car is Blocking Gate", "Lights Left On", "Window Open", or "Tow Alert".', icon: 'AlertTriangle' },
      { title: 'Direct WhatsApp Delivery', description: 'Urgent alerts arrive instantly on the car owner personal WhatsApp with vehicle location details.', icon: 'MessageSquare' },
      { title: 'Weatherproof & UV-Resistant Vinyl', description: 'Engineered with high-grade thermal-laminated vinyl that withstands tropical heat and sunlight.', icon: 'CheckCircle' },
      { title: 'Zero App Download for Scanner', description: 'Works with any smartphone camera—no specialized applications or registration required.', icon: 'Smartphone' },
      { title: 'Apartment Security Scanner Utility', description: 'Gate guards can scan to identify resident apartment flat numbers during parking disputes.', icon: 'Building' }
    ],
    process: [
      { step: 1, title: 'Cryptographic QR Token Generation', description: 'Generating unique, encrypted QR tokens tied to the vehicle registration number.' },
      { step: 2, title: 'Precision Thermal Vinyl Printing', description: 'Manufacturing automotive-grade UV-coated static-cling windshield decals.' },
      { step: 3, title: 'Doorstep Courier Dispatch', description: 'Delivering the decal with simple 60-second mobile activation instructions.' },
      { step: 4, title: 'Instant Phone Number Binding', description: 'Owner scans the tag once to link their WhatsApp number securely in under 30 seconds.' }
    ],
    faqs: [
      { question: 'Can someone find my name or phone number by scanning the QR code?', answer: 'No. The scanning screen reveals zero personal data. It only shows a safe vehicle identifier and pre-formatted emergency contact buttons.' },
      { question: 'What is the cost of the emergency parking tag?', answer: 'A single premium weatherproof windshield tag is ₹299. Bulk packs for residential gated societies and corporate employee car fleets are available at discounted rates.' },
      { question: 'What happens if I sell my car or change my phone number?', answer: 'You can update your linked WhatsApp number or transfer the vehicle registration inside your secure online profile within seconds.' }
    ],
    relatedSlugs: ['garage-service-tracker', 'nfc-review-standees', 'whatsapp-automation-crm'],
    metaTitle: 'Privacy-Safe Vehicle Emergency Parking QR Tag | Masked Car Call',
    metaDescription: 'Protect your privacy with JSM Emergency Parking QR Tag for car windshields. Masked WhatsApp notifications for double-parking without revealing your phone number.'
  },
  {
    slug: 'local-seo-gbp-ranking',
    code: 'TECH-GBP-10',
    title: 'Google Business Profile (GBP) Local 3-Pack SEO & Maps Ranking Retainer',
    shortTitle: 'Local GBP 3-Pack SEO',
    workforceClassification: 'Search Engine Optimization & Local Discovery (Led by CTO R Jan Steve Daniel)',
    gstSac: 'SAC 998311 – Local Search Engine Optimization & Marketing Consulting',
    officialDescription: 'Comprehensive Google Business Profile (GBP) optimization, local 3-pack map ranking retainers, geotagged content uploads, citation building, and review velocity acceleration.',
    phase: 'Digital & Automation',
    isCoreLaunch: true,
    category: 'marketing',
    categoryLabel: 'Digital: Growth & Performance Marketing',
    valueProposition: 'Dominate the top 3 spots on Google Maps. Capture high-intent nearby customers searching "near me" for doctors, salons, contractors, and retail shops.',
    description: 'Over 70% of local phone calls and foot traffic go to the top 3 businesses shown in the Google Maps Local 3-Pack. JSM Integrated Services provides comprehensive monthly GBP management. We optimize your primary and secondary categories, build 40+ high-authority Indian local citations, publish geotagged photos with embedded EXIF metadata, write weekly localized updates, and accelerate verified review velocity to keep you ranking #1.',
    whoItIsFor: [
      'Dental Clinics, Eye Care & Specialist Hospitals',
      'Hair Salons, Spas & Aesthetic Centers',
      'Civil Contractors, Electricians & Plumbers',
      'Restaurants, Cafes & Traditional Messes',
      'Automotive Repair Workshops & Car Detailing Centers',
      'Coaching Centers, Tuition Hubs & Computer Institutes'
    ],
    icon: 'MapPin',
    heroImage: '/images/real_jsm_airport_drill.jpg',
    complianceNotice: '100% white-hat optimization adhering to Google Business Profile Guidelines for Representing Your Business on Google.',
    features: [
      { title: 'Local 3-Pack Map Dominance', description: 'Systematic algorithmic optimization to elevate your business into the top 3 Google Maps positions.', icon: 'TrendingUp' },
      { title: 'Geotagged Photo & EXIF Publishing', description: 'Weekly photo uploads with embedded GPS coordinates and local metadata verifying your physical presence.', icon: 'Camera' },
      { title: '40+ High-Authority Indian Citations', description: 'Consistent Name, Address, and Phone (NAP) distribution across Justdial, Sulekha, IndiaMART, and mapping portals.', icon: 'Layers' },
      { title: 'Review Velocity Acceleration & AI Replies', description: 'Consistent collection of fresh reviews and professional keyword-rich responses to every public review.', icon: 'Star' },
      { title: 'Weekly Keyword-Rich Google Updates', description: 'Targeting high-intent search queries (e.g., "best dentist in Thillai Nagar Trichy") via native Google posts.', icon: 'FileText' },
      { title: 'Monthly Insights & Call Tracking Report', description: 'Transparent monthly reporting on phone calls generated, direction requests, and keyword rank positions.', icon: 'BarChart3' }
    ],
    process: [
      { step: 1, title: 'Local Search & Competitor Gap Audit', description: 'Analyzing your current rankings against top 3 competitors across your target radius.' },
      { step: 2, title: 'Profile Overhaul & NAP Consistency Cleanup', description: 'Optimizing primary categories, service menus, business descriptions, and fixing broken directory citations.' },
      { step: 3, title: 'Weekly Geotagged Media & Post Cadence', description: 'Publishing optimized photo content, promotional offers, and service highlights every 7 days.' },
      { step: 4, title: 'Monthly Review Strategy & Geo-Grid Audit', description: 'Running geo-grid ranking scans to monitor neighborhood rank improvements and delivering performance reports.' }
    ],
    faqs: [
      { question: 'How long does it take to see results in Google Maps?', answer: 'Most local businesses see noticeable ranking improvements and an increase in phone calls within 30 to 45 days of consistent category optimization, citation building, and geotagged uploads.' },
      { question: 'What is the monthly retainer fee?', answer: 'Our monthly GBP Local 3-Pack management retainers range from ₹4,999 to ₹8,999/month depending on local competition density and geographical target radius.' },
      { question: 'Can you help reinstate a suspended Google Business Profile?', answer: 'Yes. We audit business licenses, GST certificates, utility bills, and submit formal reinstatement appeals to Google support to recover suspended profiles.' }
    ],
    relatedSlugs: ['nfc-review-standees', 'website-design-development', 'social-media-meta-ads'],
    metaTitle: 'Google Business Profile (GBP) Local SEO & Maps Ranking | Trichy',
    metaDescription: 'Dominate Google Maps Local 3-Pack rankings in Trichy and Tamil Nadu. Proven local SEO, geotagged citations, and review management by JSM Integrated Services.'
  },
  {
    slug: 'social-media-meta-ads',
    code: 'TECH-SMM-11',
    title: 'Social Media Marketing (SMM) & High-ROI Meta Ad Campaigns',
    shortTitle: 'Social Media & Meta Ads',
    workforceClassification: 'Performance Marketing & Creative Production (Led by CTO R Jan Steve Daniel)',
    gstSac: 'SAC 998311 – Advertising and Performance Marketing Services',
    officialDescription: 'Paid customer acquisition on Facebook and Instagram, hyper-local pin-code ad targeting, direct WhatsApp Click-to-Chat campaigns, and high-converting creative design.',
    phase: 'Digital & Automation',
    isCoreLaunch: true,
    category: 'marketing',
    categoryLabel: 'Digital: Growth & Performance Marketing',
    valueProposition: 'Stop wasting money boosting random posts. Run laser-targeted Facebook & Instagram lead ads that deliver qualified inquiries straight into your WhatsApp inbox for under ₹40/lead.',
    description: 'Boosting posts directly on the Instagram app is a proven way to burn money without measurable sales. JSM Performance Marketing team builds data-driven Meta Ad campaigns inside Ads Manager. We create scroll-stopping visual creatives, craft persuasive Tamil and English ad copy, configure the Meta Conversions API (CAPI), and run hyper-targeted Click-to-WhatsApp (CTWA) ads that put ready-to-buy inquiries into your hands.',
    whoItIsFor: [
      'Real Estate Promoters, Builders & Villa Plots',
      'Coaching Institutes, Tuition Centers & NEET Academies',
      'Dental Clinics, Hair Transplant & Cosmetic Centers',
      'Luxury Grooming Salons & Bridal Makeup Studios',
      'Wedding Photographers & Banquet Mandapams',
      'Fitness Gyms, CrossFit Studios & Martial Arts Hubs'
    ],
    icon: 'Share2',
    heroImage: '/images/real_jsm_terminal_entry_salute.jpg',
    complianceNotice: 'Strictly adheres to Meta Advertising Standards, ASCI Guidelines, and Indian Consumer Protection Advertising Regulations.',
    features: [
      { title: 'Hyper-Local Pin-Code Targeting', description: 'Zero in on affluent neighborhoods and target radii (1 km to 15 km) around your business location.', icon: 'MapPin' },
      { title: 'Direct Click-to-WhatsApp (CTWA) Ads', description: 'Eliminates friction: prospects click the ad and immediately start a conversation on your WhatsApp.', icon: 'MessageSquare' },
      { title: 'High-Converting Creatives & Copy', description: 'Eye-catching graphic banners, video hooks, and persuasive Tamil and English copy tailored to regional consumers.', icon: 'Palette' },
      { title: 'Meta Conversions API (CAPI) Integration', description: 'Server-side tracking that bypasses iOS ad-blockers to accurately measure lead costs and conversion ROI.', icon: 'Zap' },
      { title: 'A/B Split Testing & Bid Optimization', description: 'Continuous testing of headlines, creative angles, and target demographics to lower Cost-Per-Lead (CPL).', icon: 'TrendingUp' },
      { title: 'Weekly Transparent ROAS Dashboards', description: 'Clear weekly reporting tracking ad spend, clicks, conversations generated, and estimated cost per customer.', icon: 'BarChart3' }
    ],
    process: [
      { step: 1, title: 'Audience Persona & Competitor Ad Scraping', description: 'Researching top performing ad angles, local demographics, and customer buying motives.' },
      { step: 2, title: 'Creative Production & Tamil/English Copywriting', description: 'Designing static banners, carousel cards, and scripting short video hooks.' },
      { step: 3, title: 'Meta Ads Manager Campaign Formulation', description: 'Setting up CAPI, custom audiences, geographic boundaries, and lead-gen objectives.' },
      { step: 4, title: 'Daily Bid Management & Lead Scale', description: 'Pruning underperforming ad sets and allocating budget to high-converting creative winners.' }
    ],
    faqs: [
      { question: 'How much should I spend on ads per day?', answer: 'For local businesses in Trichy, Chennai, or Coimbatore, we recommend starting with an ad budget of ₹300 to ₹700 per day. Our management fee is separate and transparent.' },
      { question: 'What is your monthly management fee?', answer: 'Our Meta Ads management packages start at ₹7,999/month for local service businesses, which includes ad creation, copywriting, daily bid optimization, and weekly reporting.' },
      { question: 'How do leads reach me?', answer: 'We specialize in Click-to-WhatsApp ad funnels where interested prospects land directly in your WhatsApp with a pre-filled service inquiry message ready for you to close.' }
    ],
    relatedSlugs: ['local-seo-gbp-ranking', 'whatsapp-automation-crm', 'website-design-development'],
    metaTitle: 'Meta Ads & Social Media Marketing | Facebook & Instagram Ads Tamil Nadu',
    metaDescription: 'Generate qualified customer inquiries with high-ROI Meta Ad campaigns and Click-to-WhatsApp ads by JSM Integrated Services in Tamil Nadu.'
  },
  {
    slug: 'linkedin-b2b-growth',
    code: 'TECH-B2B-12',
    title: 'LinkedIn B2B Lead Generation & Executive Authority Branding',
    shortTitle: 'LinkedIn B2B & Executive Branding',
    workforceClassification: 'B2B Strategic Marketing & Executive Communications (Led by CTO R Jan Steve Daniel)',
    gstSac: 'SAC 998311 – Professional B2B Marketing & Consulting Services',
    officialDescription: 'Executive personal branding on LinkedIn, C-suite thought leadership ghostwriting, targeted corporate decision-maker outreach, and high-ticket B2B institutional lead generation.',
    phase: 'Digital & Automation',
    isCoreLaunch: true,
    category: 'marketing',
    categoryLabel: 'Digital: Growth & Performance Marketing',
    valueProposition: 'Position company founders as industry thought leaders while opening doors to high-ticket corporate contracts, industrial suppliers, and institutional procurement heads.',
    description: 'High-value B2B contracts are not won on Instagram; they are won on LinkedIn. JSM LinkedIn B2B Growth division helps corporate founders, managing directors, and enterprise executives establish commanding authority. We overhaul your personal profile, ghostwrite data-driven industry articles, and execute disciplined, zero-spam outreach to Operations Heads, HR Directors, and Procurement Officers across South India.',
    whoItIsFor: [
      'Industrial Manufacturers & Engineering Exporters',
      'Commercial Manpower, Facility & Security Contractors',
      'Corporate Legal, Tax, Auditing & Management Consultancies',
      'Logistics, Warehousing & Supply Chain Providers',
      'B2B SaaS Founders & Enterprise IT Service Companies'
    ],
    icon: 'Briefcase',
    heroImage: '/images/real_jsm_airport_terminal_platoon.jpg',
    complianceNotice: 'Strict adherence to LinkedIn Professional Community Policies and User Agreement guidelines with zero spam scripts.',
    features: [
      { title: 'Executive Profile Transformation', description: 'Overhaul your banner, headline, featured section, and about story to position you as an undisputed authority.', icon: 'UserCheck' },
      { title: 'Weekly Thought Leadership Ghostwriting', description: '2 to 3 high-impact industry articles and case studies drafted weekly capturing your authentic executive voice.', icon: 'FileText' },
      { title: 'Targeted C-Suite Decision-Maker Outreach', description: 'Connecting directly with Plant Heads, VP Operations, and Procurement Managers in target industries.', icon: 'Users' },
      { title: 'Relationship-First DM Nurturing', description: 'Polite, value-first conversation frameworks that secure corporate discovery calls without cheesy sales pitches.', icon: 'MessageSquare' },
      { title: 'Corporate Company Page Optimization', description: 'Establish an authoritative company showcase page for institutional credibility and talent recruitment.', icon: 'Building' },
      { title: 'Pipeline Review & Meeting Coordination', description: 'Regular briefings reviewing qualified B2B discussions and scheduling executive introduction meetings.', icon: 'Calendar' }
    ],
    process: [
      { step: 1, title: 'Executive Story & ICP Mapping', description: 'Interviewing leadership to capture personal milestones, expertise, and defining the Ideal Customer Profile (ICP).' },
      { step: 2, title: 'Profile Re-Engineering & Visual Assets', description: 'Designing custom corporate banners, copywriting credentials, and highlighting flagship assignments.' },
      { step: 3, title: 'Content Engine & Authority Publishing', description: 'Publishing weekly thought pieces on manufacturing discipline, compliance standards, and leadership.' },
      { step: 4, title: 'Targeted Outreach & Relationship Pipeline', description: 'Initiating structured connection requests and nurturing executive discussions into formal commercial meetings.' }
    ],
    faqs: [
      { question: 'How much time do I need to invest each week?', answer: 'Less than 30 minutes. Our team handles content strategy, ghostwriting, graphic design, and message drafting. You simply review content drafts and attend the booked discovery calls.' },
      { question: 'What is the pricing for LinkedIn Executive Branding?', answer: 'Our monthly executive branding and targeted B2B lead generation packages range from ₹9,999 to ₹18,000/month based on the frequency of thought leadership publishing and target outreach volume.' },
      { question: 'Do you use automated spam bots that risk account restriction?', answer: 'Never. All connection management, relationship touches, and content distribution are executed manually and organically following strict human usage limits to protect account longevity.' }
    ],
    relatedSlugs: ['email-marketing-automation', 'website-design-development', 'custom-software-web-apps'],
    metaTitle: 'LinkedIn B2B Lead Generation & Executive Branding | Tamil Nadu',
    metaDescription: 'Transform company founders into industry authorities and generate enterprise B2B contracts with JSM LinkedIn Growth division.'
  },
  {
    slug: 'custom-software-web-apps',
    code: 'TECH-ERP-13',
    title: 'Custom Business Software, Internal ERP & Workflow Portals',
    shortTitle: 'Custom Software & ERP',
    workforceClassification: 'Enterprise Software Architecture (Led by CTO R Jan Steve Daniel)',
    gstSac: 'SAC 998314 – Custom Software Development Services',
    officialDescription: 'Bespoke web applications, internal operational ERPs, client management portals, digital inspection registers, and custom workflow automation systems built on modern cloud databases.',
    phase: 'Digital & Automation',
    isCoreLaunch: true,
    category: 'software',
    categoryLabel: 'Digital: Web & Software Engineering',
    valueProposition: 'Replace messy Excel sheets and disconnected tools. Custom cloud web portals and internal business ERPs built to match your exact workflow with zero monthly per-user software fees.',
    description: 'Off-the-shelf software packages are either too bloated, too rigid, or charge steep monthly per-user licensing fees. Under the architectural guidance of Chief Technical Officer R Jan Steve Daniel, JSM builds custom business tools, internal ERPs, client portals, and inventory trackers designed specifically for your organization unique operational processes.',
    whoItIsFor: [
      'Manufacturing Plants & Fabrication Units',
      'Security Agencies & Contract Staffing Providers',
      'Wholesale Distributors, Dealers & Stockists',
      'Educational Institutions & Private Colleges',
      'Equipment Rental & Heavy Machinery Operators',
      'Multi-Location Retail Chains & Franchises'
    ],
    icon: 'Database',
    heroImage: '/images/real_jsm_airport_terminal_platoon.jpg',
    complianceNotice: 'Enterprise data security with AES-256 encryption, role-based access control (RBAC), and automated off-site cloud backups.',
    features: [
      { title: 'Role-Based Access Control (RBAC)', description: 'Dedicated permissions and distinct portal views for Admins, Supervisors, Field Staff, and Clients.', icon: 'Shield' },
      { title: 'Zero Per-User Software Licensing Fees', description: 'You own the software completely. Add 5 or 500 team members without paying recurring per-seat fees.', icon: 'CheckCircle' },
      { title: 'Automated Billing & GST Invoicing', description: 'Generate GST-compliant invoices, track overdue payments, and dispatch instant payment links via WhatsApp.', icon: 'FileText' },
      { title: 'Live Dashboards & Real-Time Analytics', description: 'Visual charts and KPI meters tracking daily revenue, employee attendance, and operational status.', icon: 'BarChart3' },
      { title: 'Automated Webhooks & WhatsApp Alerts', description: 'Trigger automated messages to clients and management upon critical operational milestones.', icon: 'Zap' },
      { title: 'Cloud Database & Automatic Backups', description: 'Secure PostgreSQL / Firebase cloud architecture with automated daily backups and 99.9% uptime.', icon: 'Database' }
    ],
    process: [
      { step: 1, title: 'Workflow Blueprinting & Scope Architecture', description: 'Mapping out data fields, user roles, approval hierarchies, and key business logic rules.' },
      { step: 2, title: 'Database Schema & Interactive Wireframing', description: 'Prototyping responsive dashboard screens and data relationships for client sign-off.' },
      { step: 3, title: 'Full-Stack Development & API Integration', description: 'Building fast, typed frontend interfaces backed by robust cloud databases and authentication.' },
      { step: 4, title: 'Deployment, User Training & AMC Support', description: 'Live server launch, importing legacy spreadsheet data, staff onboarding, and ongoing technical support.' }
    ],
    faqs: [
      { question: 'How much does custom business software cost?', answer: 'Custom business software and internal ERP portals start from ₹29,999 depending on workflow complexity, modules, and role tiers, with milestone-based delivery.' },
      { question: 'Do I have to pay recurring monthly user fees like Zoho or SAP?', answer: 'No. You own the software and pay zero monthly per-seat licensing fees. You only pay for standard minimal cloud database hosting (often under ₹1,000/month).' },
      { question: 'Can the software connect with our WhatsApp or SMS notifications?', answer: 'Yes! We integrate automated webhooks that dispatch transactional updates, payment receipts, and shift alerts straight to staff and customer WhatsApp numbers.' }
    ],
    relatedSlugs: ['website-design-development', 'whatsapp-automation-crm', 'scanning-digitalization-it'],
    metaTitle: 'Custom Business Software & ERP Development | Tamil Nadu',
    metaDescription: 'Replace messy spreadsheets with custom cloud web applications and internal ERP portals by JSM Integrated Services.'
  },
  {
    slug: 'email-marketing-automation',
    code: 'TECH-EMAIL-14',
    title: 'Enterprise B2B Email Outreach & Drip Nurturing Automations',
    shortTitle: 'Email Marketing & Drip Automations',
    workforceClassification: 'Outbound Systems & Infrastructure Engineering (Led by CTO R Jan Steve Daniel)',
    gstSac: 'SAC 998311 – Direct B2B Marketing & Electronic Messaging Services',
    officialDescription: 'Enterprise B2B email infrastructure setup, dedicated inbox warmup, secondary domain isolation, verified prospect data enrichment, and automated multi-step cold drip sequences.',
    phase: 'Digital & Automation',
    isCoreLaunch: true,
    category: 'marketing',
    categoryLabel: 'Digital: Growth & Performance Marketing',
    valueProposition: 'Build a predictable B2B sales pipeline. Enterprise cold email infrastructure boasting 60%+ open rates, secondary domain protection, and automated multi-step drip nurturing.',
    description: 'Reaching corporate buyers through cold calling is increasingly difficult. JSM Enterprise B2B Email Outreach service builds industrial-grade outbound infrastructure. We configure secondary domains with full SPF/DKIM/DMARC authentication, run automated AI warm-up sequences, enrich verified corporate contact databases, and launch personalized drip campaigns that reliably land in the primary inbox.',
    whoItIsFor: [
      'Industrial Machinery & Component Manufacturers',
      'B2B Software, IT & Technology Providers',
      'Corporate Legal, Auditing & Facility Vendors',
      'Exporters, Logistics & Freight Forwarders',
      'Corporate Training & Executive Coaching Companies'
    ],
    icon: 'Mail',
    heroImage: '/images/real_jsm_airport_drill.jpg',
    complianceNotice: 'Fully compliant with CAN-SPAM Act, GDPR B2B data standards, and IT Act electronic communication norms.',
    features: [
      { title: 'Secondary Domain & Domain Shielding', description: 'Protects your primary company domain reputation by deploying isolated secondary domains for outreach.', icon: 'Shield' },
      { title: '100% DNS Deliverability Configuration', description: 'Flawless setup of SPF, DKIM, DMARC, and Custom Tracking Domains ensuring 99%+ primary inbox delivery.', icon: 'CheckCircle' },
      { title: 'Automated AI Inbox Warmup', description: 'Gradually warms up newly provisioned mailboxes over 14 days to establish pristine sender reputation scores.', icon: 'Zap' },
      { title: 'Triple-Verified B2B Prospect Data', description: 'Scrapes and verifies direct decision-maker email addresses with zero bounce rate guarantees.', icon: 'Database' },
      { title: 'Personalized Spintax Copywriting', description: 'Crafts unique variations of persuasive cold pitches with zero spam trigger words and natural human tone.', icon: 'FileText' },
      { title: 'Automated 4-Step Follow-Up Sequences', description: 'Automates polite follow-ups that automatically pause as soon as a prospect replies.', icon: 'Clock' }
    ],
    process: [
      { step: 1, title: 'Outreach Infrastructure & DNS Hardening', description: 'Purchasing dedicated secondary domains and configuring Google Workspace / Microsoft 365 DNS records.' },
      { step: 2, title: 'Automated 14-Day Mailbox Warmup', description: 'Running automated peer-to-peer warm-up exchanges to build 100% inbox deliverability scores.' },
      { step: 3, title: 'Target Prospect Scraping & Verification', description: 'Extracting verified decision-maker records matching your target geography, company turnover, and role.' },
      { step: 4, title: 'Cold Sequence Deployment & Reply Handover', description: 'Launching campaigns and handing off positive sales replies to your commercial sales desk.' }
    ],
    faqs: [
      { question: 'Will this risk our main company email domain getting blacklisted?', answer: 'No. We strictly configure isolated secondary domains (e.g., yourcompany-group.com) so your primary corporate domain remains 100% pristine and unaffected.' },
      { question: 'What is the setup and monthly fee?', answer: 'Complete deliverability infrastructure setup with 2 warm mailboxes and DNS records is ₹6,999 one-time. Monthly campaign execution and prospect enrichment is ₹4,999/month.' },
      { question: 'What open rates and reply rates can we expect?', answer: 'Because of our rigorous DNS authentication and inbox warmup, our clients consistently achieve 60% to 75% open rates and 8% to 15% reply rates on qualified B2B campaigns.' }
    ],
    relatedSlugs: ['linkedin-b2b-growth', 'website-design-development', 'custom-software-web-apps'],
    metaTitle: 'Enterprise B2B Cold Email Outreach & Deliverability | Tamil Nadu',
    metaDescription: 'Generate enterprise corporate leads with JSM B2B cold email infrastructure and automated follow-up sequences in Tamil Nadu.'
  },
  {
    slug: 'commercial-video-production',
    code: 'TECH-VIDEO-15',
    title: 'Commercial Video Production, YouTube Authority & Video Ads',
    shortTitle: 'Video Production & YouTube',
    workforceClassification: 'Audiovisual Media & Commercial Cinematography (Led by CTO R Jan Steve Daniel)',
    gstSac: 'SAC 998314 & SAC 999612 – Commercial Audiovisual & Media Production Services',
    officialDescription: 'On-site 4K corporate video production, industrial facility walkthroughs, customer case study filming, YouTube channel optimization, and social media video ad creative production.',
    phase: 'Digital & Automation',
    isCoreLaunch: true,
    category: 'marketing',
    categoryLabel: 'Digital: Growth & Performance Marketing',
    valueProposition: 'Elevate brand prestige with 4K on-site commercial video shoots, facility walkthroughs, customer case-study interviews, and high-retention social media reels.',
    description: 'Text and static images no longer command the attention they once did. JSM Commercial Video Production unit delivers cinematic corporate video assets. From on-site factory walkthroughs and drone aerial cinematography to customer interview case studies and high-converting YouTube and Instagram video ads, we capture your scale, quality, and operational discipline in stunning 4K.',
    whoItIsFor: [
      'Manufacturing Plants, SEZ Factories & Foundries',
      'Luxury Jewellery, Silk & Wedding Textile Showrooms',
      'Hospitals, Surgical Centers & Specialized Clinics',
      'Private International Schools, Colleges & Universities',
      'Real Estate Builders, High-Rise Enclaves & Resorts',
      'Automotive Dealerships & Large Detailing Centers'
    ],
    icon: 'Film',
    heroImage: '/images/real_jsm_airport_drill.jpg',
    complianceNotice: 'Licensed aerial drone videography adhering to Directorate General of Civil Aviation (DGCA) flight safety norms.',
    features: [
      { title: '4K Cinema Cameras & Drone Aerials', description: 'Crisp 4K camera gear, cinema lenses, motorized gimbals, and licensed drone aerial facility sweeps.', icon: 'Camera' },
      { title: 'Professional Lighting & Wireless Audio', description: 'Broadcast-grade wireless lavalier microphones and studio lighting for crystal-clear executive interviews.', icon: 'Video' },
      { title: 'Customer Case Study & Testimonial Filming', description: 'Structured on-camera client interviews highlighting problem, solution, and verifiable ROI outcomes.', icon: 'Users' },
      { title: 'High-Retention Short-Form Reels', description: 'Dynamic editing, sound design, animated captions, and trending hooks for Instagram and YouTube Shorts.', icon: 'Share2' },
      { title: 'Bilingual Voiceover & Motion Graphics', description: 'Native Tamil and English voiceover talent with branded 3D lower-thirds and animated logo stings.', icon: 'Sparkles' },
      { title: 'YouTube SEO & Custom Thumbnail Design', description: 'High-CTR thumbnail creation, video chapter markers, and keyword-optimized metadata descriptions.', icon: 'TrendingUp' }
    ],
    process: [
      { step: 1, title: 'Concept Scripting & Storyboarding', description: 'Formulating shot lists, interview question blueprints, visual angles, and location scheduling.' },
      { step: 2, title: 'On-Location 4K Production Shoot', description: 'Deploying the camera crew, lighting grid, audio rigs, and drone operators at your facility.' },
      { step: 3, title: 'Post-Production, Color Grading & Sound Mix', description: 'Editing footage with cinematic color LUTs, motion graphics, captions, and commercial music licensing.' },
      { step: 4, title: 'Multi-Format Export & Channel Publishing', description: 'Delivering widescreen 16:9 4K masters and vertical 9:16 mobile formats ready for immediate ad campaigns.' }
    ],
    faqs: [
      { question: 'Do you travel across Tamil Nadu for on-site video shoots?', answer: 'Yes! Our camera crew regularly travels to facilities across Trichy, Chennai, Coimbatore, Madurai, Salem, Hosur, and throughout South India.' },
      { question: 'What is the pricing for a corporate video shoot?', answer: 'A focused on-site corporate showcase shoot with 4K camera, drone coverage, and post-production editing starts from ₹14,999. Monthly ongoing social video and YouTube retainer packages start at ₹19,999/month.' },
      { question: 'How quickly are the final edited videos delivered?', answer: 'Standard delivery for first-cut video reviews is 5 to 7 business days following the on-site production shoot.' }
    ],
    relatedSlugs: ['social-media-meta-ads', 'website-design-development', 'linkedin-b2b-growth'],
    metaTitle: 'Commercial Video Production & Corporate Video | Tamil Nadu',
    metaDescription: 'Cinematic 4K corporate video production, facility walkthroughs, drone shoots, and YouTube video ads by JSM Integrated Services in Tamil Nadu.'
  }
];

export const services = servicesData;
