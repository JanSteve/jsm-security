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
  title: string;
  shortTitle: string;
  phase: 'Phase 1 - Launch Service' | 'Phase 2 - Expansion Service';
  isCoreLaunch: boolean;
  category: 'security' | 'facilities' | 'manpower' | 'logistics' | 'events' | 'property' | 'digital' | 'creative';
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
  'All Services',
  'Core Operations (Phase 1)',
  'Integrated Business Solutions (Phase 2)',
  'Security & Guarding',
  'Facility & Housekeeping',
  'Manpower & Staffing'
];

export const servicesData: Service[] = [
  {
    slug: 'private-security',
    title: 'Private Security & Guarding Operations',
    shortTitle: 'Private Security',
    phase: 'Phase 1 - Launch Service',
    isCoreLaunch: true,
    category: 'security',
    categoryLabel: 'Security Services',
    valueProposition: 'Professional on-site protection built around discipline, supervision, and clear reporting.',
    description: 'JSM Integrated Services delivers structured, disciplined on-site private security guarding for commercial complexes, industrial plants, residential societies, educational institutions, and corporate facilities. We focus on rigorous guard vetting, clear post duties, supervisor spot-checks, and transparent daily reporting.',
    whoItIsFor: [
      'Corporate Offices & IT Parks',
      'Residential Societies & Gated Communities',
      'Factories & Manufacturing Units',
      'Warehouses & Logistics Hubs',
      'Hospitals & Healthcare Facilities',
      'Educational Campuses & Schools',
      'Retail Showrooms & Commercial Malls'
    ],
    icon: 'Shield',
    heroImage: '/images/protective_guard.jpg',
    complianceNotice: '100% PSARA (Private Security Agencies Regulation Act, 2005) compliant operations under the Controlling Authority, Government of Tamil Nadu. All guarding deployments comply with mandatory police background verification, statutory EPF/ESI, and minimum wage norms.',
    features: [
      { title: 'Verified Unarmed Guarding', description: 'Trained, uniformed, and background-checked personnel deployed with defined post orders.', icon: 'UserCheck' },
      { title: 'Gate & Visitor Management', description: 'Digital or structured manual visitor logging, vehicle inspection, and material pass checks.', icon: 'ClipboardCheck' },
      { title: 'Perimeter & Night Patrolling', description: 'Scheduled and surprise patrol rounds to prevent unauthorized intrusion and safety hazards.', icon: 'Eye' },
      { title: 'Supervisory Oversight', description: 'Dedicated field officers conduct unannounced spot-checks to ensure alertness and adherence to SOPs.', icon: 'CheckCircle' },
      { title: 'Emergency Response Protocols', description: 'Trained response procedures for fire alarms, medical emergencies, and perimeter breaches.', icon: 'AlertTriangle' },
      { title: 'Daily Shift Handover Reports', description: 'Documented logbooks ensuring seamless transition of duties and incident tracking.', icon: 'FileText' }
    ],
    process: [
      { step: 1, title: 'Site Risk Assessment', description: 'We evaluate entry/exit points, perimeter vulnerabilities, visitor volumes, and specific client requirements.' },
      { step: 2, title: 'Custom Post Orders & SOP', description: 'We prepare clear, site-specific standing orders detailing duty rosters, dress codes, and emergency actions.' },
      { step: 3, title: 'Trained Deployment', description: 'Verified personnel are briefed on the client environment and deployed with standard uniforms and gear.' },
      { step: 4, title: 'Continuous Supervision & Reporting', description: 'Field supervisors conduct regular rounds, audit attendance, and provide documented operational reviews.' }
    ],
    faqs: [
      { question: 'How do you verify the background of security personnel?', answer: 'Every candidate undergoes police verification support, address authentication, prior employment references, and document checks before deployment.' },
      { question: 'What training do JSM security guards receive?', answer: 'Our personnel undergo a comprehensive 5-day induction program covering values, post discipline, fire safety, first aid basics, visitor etiquette, and site-specific SOPs.' },
      { question: 'How do you ensure guards stay alert during night shifts?', answer: 'Our field supervisory officers carry out surprise night visits, structured checkpoint checks, and mandatory shift logging to maintain peak alertness.' },
      { question: 'Can we scale the number of guards for special events or emergencies?', answer: 'Yes, JSM maintains reserve personnel capacity to scale up guard deployment on short notice for client emergencies or events.' }
    ],
    relatedSlugs: ['housekeeping', 'manpower', 'cash-in-transit', 'event-support'],
    metaTitle: 'Professional Private Security Services in Tamil Nadu | JSM Integrated Services',
    metaDescription: 'Disciplined, vetted private security guarding, gate management, and patrol operations for corporate, residential, industrial, and institutional premises across Tamil Nadu.'
  },
  {
    slug: 'housekeeping',
    title: 'Housekeeping & Integrated Facility Management',
    shortTitle: 'Housekeeping & Facilities',
    phase: 'Phase 1 - Launch Service',
    isCoreLaunch: true,
    category: 'facilities',
    categoryLabel: 'Facility Services',
    valueProposition: 'Service is not a promise. It is a process. Structured hygiene, daily checklists, and reliable facility upkeep.',
    description: 'JSM Integrated Services approaches housekeeping as a facility operating system. From daily workspace sanitization and restroom hygiene schedules to pantry support and waste segregation, we maintain clean, hygienic, and productive commercial and residential environments.',
    whoItIsFor: [
      'Commercial Buildings & IT Offices',
      'Hospitals, Clinics & Diagnostic Labs',
      'Shopping Centers & Retail Stores',
      'Industrial Floors & Production Units',
      'Schools, Colleges & Training Institutes',
      'Apartment Complexes & Residential Communities'
    ],
    icon: 'Sparkles',
    heroImage: '/images/facility_lobby.jpg',
    features: [
      { title: 'Daily Workspace Cleaning', description: 'Systematic dusting, vacuuming, mopping, and desk sanitization before and during office hours.', icon: 'Building' },
      { title: 'Restroom Hygiene Cycles', description: 'Hourly inspection schedules, fragrance management, and continuous restocking of supplies.', icon: 'CheckCircle' },
      { title: 'Waste Segregation & Disposal', description: 'Eco-conscious sorting of dry, wet, and recyclable waste according to municipal norms.', icon: 'Leaf' },
      { title: 'Deep Cleaning & Machine Scrubbing', description: 'Periodic high-pressure floor scrubbing, carpet cleaning, and hard surface revitalization.', icon: 'Layers' },
      { title: 'Pantry & Cafeteria Support', description: 'Hygiene maintenance in pantries, dishwashing assistance, and refreshment area upkeep.', icon: 'Coffee' },
      { title: 'Daily Inspection Checklists', description: 'Supervisors inspect tasks against strict checklists: Clean → Inspect → Report → Correct → Verify.', icon: 'ClipboardCheck' }
    ],
    process: [
      { step: 1, title: 'Facility Space Survey', description: 'We map floor areas, footfall patterns, restroom density, surface materials, and timing preferences.' },
      { step: 2, title: 'Hygiene Schedule Design', description: 'We build a tailored operating schedule detailing daily routines, hourly cycles, and periodic deep cleans.' },
      { step: 3, title: 'Groomed Staff Deployment', description: 'Trained personnel are equipped with professional tools, eco-friendly chemicals, and protective equipment.' },
      { step: 4, title: 'Quality Audits & Verification', description: 'Supervisors conduct daily checklist verifications and monthly client reviews to ensure immaculate standards.' }
    ],
    faqs: [
      { question: 'Do you provide the cleaning chemicals and equipment?', answer: 'We offer both options: we can supply high-grade, eco-friendly cleaning materials and machinery, or utilize client-approved consumables based on agreement.' },
      { question: 'Can housekeeping be scheduled outside business hours?', answer: 'Yes. We customize shifts for early morning, evening, or night hours to ensure zero operational disruption to your team.' },
      { question: 'How do you monitor hygiene quality?', answer: 'Our supervisors use physical and digital checklists with sign-off sheets placed in restrooms and utility areas, inspected multiple times daily.' }
    ],
    relatedSlugs: ['private-security', 'manpower', 'real-estate-support'],
    metaTitle: 'Corporate Housekeeping & Facility Management in Tamil Nadu | JSM Integrated Services',
    metaDescription: 'Reliable, checklist-driven commercial housekeeping, restroom hygiene, and facility upkeep for corporate offices, hospitals, and residential complexes.'
  },
  {
    slug: 'manpower',
    title: 'Manpower & Temporary Staffing Solutions',
    shortTitle: 'Manpower & Staffing',
    phase: 'Phase 1 - Launch Service',
    isCoreLaunch: true,
    category: 'manpower',
    categoryLabel: 'Staffing Solutions',
    valueProposition: 'Right people. Right role. Right process. Reliable workforce deployment for operations that cannot stop.',
    description: 'Rooted in our heritage as JSMMANPOWER, we provide reliable, vetted skilled and semi-skilled staffing solutions. Whether you need industrial helpers, warehouse operators, administrative personnel, or peak-season workforce surges, JSM coordinates recruitment, onboarding, and attendance.',
    whoItIsFor: [
      'Factories & Manufacturing Units',
      'Warehouses & Distribution Centers',
      'E-commerce Logistics & Fulfillment Hubs',
      'Hospitality & Catering Businesses',
      'Construction & Infrastructure Projects',
      'Retail Chains & Hypermarkets'
    ],
    icon: 'Users',
    heroImage: '/images/hero_operations.jpg',
    features: [
      { title: 'Skilled & Semi-Skilled Staffing', description: 'Electricians, machine assistants, warehouse handlers, data entry staff, and supervisors.', icon: 'Briefcase' },
      { title: 'General & Industrial Workforce', description: 'Dependable manual labor, loading/unloading teams, and production line assistants.', icon: 'TrendingUp' },
      { title: 'Peak-Season Scalability', description: 'Rapid workforce surge capacity to handle festive demands, audits, or sudden production increases.', icon: 'Zap' },
      { title: 'Rigorous Background Checks', description: 'Identity verification, Aadhaar/address validation, and prior work background screening.', icon: 'UserCheck' },
      { title: 'Statutory & Payroll Support', description: 'Streamlined documentation, attendance tracking, and transparent contractual records.', icon: 'FileText' },
      { title: 'Dedicated Field Coordinator', description: 'A single JSM coordinator manages daily roll-calls, replacements, and client communications.', icon: 'CheckCircle' }
    ],
    process: [
      { step: 1, title: 'Manpower Requirement Mapping', description: 'We analyze the exact job roles, skill criteria, shift timings, headcount, and physical site requirements.' },
      { step: 2, title: 'Screening & Sourcing', description: 'Candidates are evaluated for trade skills, physical fitness, discipline, and background history.' },
      { step: 3, title: 'Induction & Briefing', description: 'Staff are briefed on workplace safety, attendance rules, and client-specific operational standards.' },
      { step: 4, title: 'Deployment & Attendance Management', description: 'Daily attendance is monitored with backup reserves in place to prevent operational bottlenecks.' }
    ],
    faqs: [
      { question: 'How fast can JSM deploy contractual manpower?', answer: 'For standard skilled and unskilled roles, we can mobilize deployment within 48 to 72 hours depending on headcount.' },
      { question: 'Do you manage replacement for absent workers?', answer: 'Yes. We maintain an active standby pool to replace unexpected absenteeism promptly.' },
      { question: 'Are workers verified before deployment?', answer: 'Yes. All candidates undergo strict identity validation and background verification before placement.' }
    ],
    relatedSlugs: ['private-security', 'housekeeping', 'real-estate-support'],
    metaTitle: 'Contract Manpower & Staffing Agency in Tamil Nadu | JSM Integrated Services',
    metaDescription: 'Dependable skilled, semi-skilled, and industrial manpower supply for factories, warehouses, retail, and corporate operations across Tamil Nadu.'
  },
  {
    slug: 'cash-in-transit',
    title: 'Secure Cash-in-Transit & Logistics Support',
    shortTitle: 'Cash-in-Transit',
    phase: 'Phase 1 - Launch Service',
    isCoreLaunch: true,
    category: 'logistics',
    categoryLabel: 'Secure Logistics',
    valueProposition: 'Disciplined two-person custody transfers, documentation, and secure transit protocols.',
    description: 'JSM Integrated Services coordinates professional cash movement and valuables logistics support for retail chains, financial outlets, fuel stations, and corporate collections. Every operation adheres strictly to documented handover logs, route timing discipline, and dual-custody verification.',
    whoItIsFor: [
      'Retail Chains & Supermarket Groups',
      'Commercial Banks & ATM Operators',
      'Fuel Stations & Highway Toll Plazas',
      'Jewellery Showrooms & High-Value Retail',
      'Corporate Cash Collection Counters'
    ],
    icon: 'Banknote',
    heroImage: '/images/hero_operations.jpg',
    complianceNotice: 'Cash-in-Transit services are provided strictly subject to applicable regulatory licensing, permissions, documentation, and client insurance frameworks. Route and security details are strictly confidential.',
    features: [
      { title: 'Two-Person Custody Model', description: 'Strict dual-signoff handover procedures ensuring total asset accountability at pickup and deposit.', icon: 'Lock' },
      { title: 'Secure Route Planning', description: 'Planned transit windows and randomized movement schedules to prevent predictability.', icon: 'MapPin' },
      { title: 'Documented Handover Receipts', description: 'Tamper-evident bags and physical/digital verification logs provided at every step.', icon: 'FileText' },
      { title: 'Trained Custody Officers', description: 'Disciplined personnel trained in defensive observation and protocol compliance.', icon: 'Shield' },
      { title: 'Daily Retail Cash Pickup', description: 'Scheduled daily or on-call collection services for multi-outlet retail enterprises.', icon: 'Clock' },
      { title: 'Direct Management Oversight', description: 'Senior operational coordinators track mission completion with immediate escalation channels.', icon: 'CheckCircle' }
    ],
    process: [
      { step: 1, title: 'Risk & Route Protocol Review', description: 'We assess collection locations, handover safety, deposit timing windows, and document requirements.' },
      { step: 2, title: 'Custody Protocol Setup', description: 'Establishment of authorized signatory registers, seal numbers, and verification procedures.' },
      { step: 3, title: 'Execution of Transfer', description: 'Trained custody personnel execute the transfer using dual-verification and tamper-proof bags.' },
      { step: 4, title: 'Reconciliation & Reporting', description: 'Prompt generation of signed collection slips and digital reconciliation with client accounts.' }
    ],
    faqs: [
      { question: 'What safety measures do you take during cash collection?', answer: 'We implement tamper-evident sealing, two-person verified handovers, time-variance protocols, and strict identity authentication.' },
      { question: 'Do you provide daily scheduled collections for multi-branch retailers?', answer: 'Yes, we design custom collection routes covering multiple branches with standardized deposit reporting.' }
    ],
    relatedSlugs: ['private-security', 'manpower'],
    metaTitle: 'Secure Cash-in-Transit & Cash Logistics in Tamil Nadu | JSM Integrated Services',
    metaDescription: 'Disciplined, protocol-driven cash-in-transit, retail cash collection, and valuable asset logistics across Tamil Nadu.'
  },
  {
    slug: 'event-support',
    title: 'Event & Wedding Security + Planning Support',
    shortTitle: 'Event & Wedding Support',
    phase: 'Phase 2 - Expansion Service',
    isCoreLaunch: false,
    category: 'events',
    categoryLabel: 'Events & Weddings',
    valueProposition: 'Because a great event should feel effortless — even when the operation behind it isn’t.',
    description: 'From grand weddings and celebrity functions to corporate conferences and exhibitions, JSM provides hospitality-focused crowd coordination, VIP handling, gate entry security, valet traffic coordination, and partner-assisted event media coverage.',
    whoItIsFor: [
      'Wedding Planners & Family Hosts',
      'Corporate Event Organizers & Summits',
      'Exhibition & Trade Fair Managers',
      'College Festivals & Public Gatherings',
      'Celebrity & VIP Private Receptions'
    ],
    icon: 'Ticket',
    heroImage: '/images/protective_guard.jpg',
    features: [
      { title: 'Crowd & Gate Management', description: 'Smooth guest entry, invitation verification, queue control, and exit flow management.', icon: 'Users' },
      { title: 'VIP & Celebrity Handling', description: 'Discreet escorting and dedicated protection details for high-profile dignitaries and artists.', icon: 'Star' },
      { title: 'Valet & Traffic Coordination', description: 'Organized parking management and vehicular flow control outside the venue.', icon: 'Car' },
      { title: 'Hospitality-Trained Bouncers', description: 'Polite, imposing yet respectful physical security personnel trained in courteous de-escalation.', icon: 'Shield' },
      { title: 'Emergency & Medical Standby', description: 'First-aid trained officers and clear emergency exit corridors.', icon: 'AlertTriangle' },
      { title: 'Partner Media Documentation', description: 'Coordinated photography, videography, and audiovisual coverage through verified partners.', icon: 'Camera' }
    ],
    process: [
      { step: 1, title: 'Venue Walkthrough & Flow Mapping', description: 'We evaluate hall layout, stage access, VIP lounges, emergency exits, and parking capacity.' },
      { step: 2, title: 'Manpower & Security Blueprint', description: 'We assign specific officer posts: entrance greeting, parking, backstage, and roaming crowd control.' },
      { step: 3, title: 'Pre-Event Briefing', description: 'Staff are briefed on guest lists, dress codes, emergency contacts, and special instructions.' },
      { step: 4, title: 'Live Execution & Coordination', description: 'An on-site supervisor oversees operations from guest arrival until post-event wrap-up.' }
    ],
    faqs: [
      { question: 'Are your event security staff trained in hospitality?', answer: 'Yes. We specifically train event personnel to maintain a welcoming, respectful demeanor while ensuring firm perimeter and crowd control.' },
      { question: 'Can you handle both small private functions and large college festivals?', answer: 'Yes. We scale from 4-person private wedding details up to 50+ personnel for large public conventions.' }
    ],
    relatedSlugs: ['private-security', 'creative-media', 'manpower'],
    metaTitle: 'Event Security & Wedding Management Support in Tamil Nadu | JSM Integrated Services',
    metaDescription: 'Hospitality-driven event security, crowd management, VIP escorts, and wedding coordination across Tamil Nadu.'
  },
  {
    slug: 'real-estate-support',
    title: 'Real Estate & Auction Site Support',
    shortTitle: 'Real Estate & Auctions',
    phase: 'Phase 2 - Expansion Service',
    isCoreLaunch: false,
    category: 'property',
    categoryLabel: 'Property Support',
    valueProposition: 'Securing construction progress, finished assets, model apartments, and organized auction bidder verification.',
    description: 'JSM provides specialized operational support for real estate developers, builders, and auction organizers. We safeguard construction materials from pilferage, manage model flat sales galleries with professional concierge staff, and maintain orderly entry control during high-stakes auctions.',
    whoItIsFor: [
      'Real Estate Builders & Developers',
      'Construction Project Contractors',
      'Property Management Companies',
      'Auction Houses & Asset Disposal Agencies',
      'Financial Institutions & Asset Recoveries'
    ],
    icon: 'Building',
    heroImage: '/images/facility_lobby.jpg',
    features: [
      { title: 'Construction Site Security', description: '24/7 material gate passes, night vigilance, and equipment protection against theft and damage.', icon: 'Shield' },
      { title: 'Sales Gallery & Model Flat Hosting', description: 'Courteous concierge staff and front-desk personnel welcoming prospective property buyers.', icon: 'Home' },
      { title: 'Finished Property Handover Protection', description: 'Safeguarding completed apartments and villas prior to tenant occupancy.', icon: 'Lock' },
      { title: 'Auction Bidder Verification', description: 'Structured token verification, identification checks, and orderly auction hall entry.', icon: 'ClipboardCheck' },
      { title: 'Material Inward/Outward Registers', description: 'Strict logging of steel, cement, fixtures, and contractor machinery.', icon: 'FileText' },
      { title: 'Worker ID Tagging & Gate Control', description: 'Daily worker identification checks to prevent unauthorized labor on construction sites.', icon: 'UserCheck' }
    ],
    process: [
      { step: 1, title: 'Site Inspection & Ingress Mapping', description: 'We inspect perimeter fences, storage sheds, entry gates, and visitor reception zones.' },
      { step: 2, title: 'Material Register Protocol', description: 'We implement standard inward/outward gate passes and supervisor sign-offs.' },
      { step: 3, title: 'Deployment & Shift Rostering', description: 'Stationed guards and roaming officers are deployed with clear standing instructions.' },
      { step: 4, title: 'Daily Log Submission', description: 'Daily vehicle logs, material movement registers, and incident summaries sent to project managers.' }
    ],
    faqs: [
      { question: 'How do you prevent construction material theft?', answer: 'We implement 100% material pass verification, physical bag checks of exiting labor, night illumination checks, and perimeter patrols.' },
      { question: 'Can you provide front-desk hosts for luxury property sales lounges?', answer: 'Yes. We deploy well-groomed, articulate personnel to manage reception and guide visitors to sales executives.' }
    ],
    relatedSlugs: ['private-security', 'housekeeping', 'manpower'],
    metaTitle: 'Real Estate Construction Site Security & Auction Support | JSM Integrated Services',
    metaDescription: 'Construction site material guarding, sales gallery hosting, and auction bidder verification services across Tamil Nadu.'
  },
  {
    slug: 'software-solutions',
    title: 'Software & Web Solutions for Business',
    shortTitle: 'Software Solutions',
    phase: 'Phase 2 - Expansion Service',
    isCoreLaunch: false,
    category: 'digital',
    categoryLabel: 'Digital Solutions',
    valueProposition: 'Integrated business technology: custom landing pages, visitor management software, and lead automation.',
    description: 'As part of our integrated corporate support, JSM builds streamlined digital tools for modern enterprises. From clean high-conversion business websites and landing pages to digital visitor logging and attendance automation, we empower businesses with modern technology.',
    whoItIsFor: [
      'SMEs & Growing Enterprises',
      'Real Estate & Property Developers',
      'Healthcare Clinics & Educational Institutes',
      'Event & Wedding Organizers',
      'Logistics & Service Companies'
    ],
    icon: 'Monitor',
    heroImage: '/images/portal_laptop.jpg',
    features: [
      { title: 'High-Conversion Business Websites', description: 'Fast, responsive, mobile-first websites designed for lead generation and brand authority.', icon: 'Globe' },
      { title: 'Digital Visitor Logging Systems', description: 'QR-code and tablet-based visitor check-ins replacing messy manual paper registers.', icon: 'Tablet' },
      { title: 'Lead Capture & WhatsApp Automation', description: 'Instant routing of customer inquiries to your sales team via WhatsApp and email.', icon: 'Zap' },
      { title: 'Staff Attendance & Reporting Portals', description: 'Cloud-enabled attendance logs and daily operational checklist tracking.', icon: 'FileText' },
      { title: 'Search Engine Optimization (SEO)', description: 'Local SEO architecture ensuring high search ranking for key regional service keywords.', icon: 'Search' },
      { title: 'Domain & Hosting Management', description: 'Reliable deployment, SSL certificates, business emails, and maintenance.', icon: 'Lock' }
    ],
    process: [
      { step: 1, title: 'Requirement & Goal Discovery', description: 'We identify your operational bottlenecks, target audience, and lead generation targets.' },
      { step: 2, title: 'UI/UX & Architecture Design', description: 'We create clean, modern wireframes and mobile-first user journeys.' },
      { step: 3, title: 'Development & Testing', description: 'We code fast, secure, search-optimized applications with seamless form integrations.' },
      { step: 4, title: 'Deployment & Training', description: 'We launch the system on fast servers and train your staff on daily operations.' }
    ],
    faqs: [
      { question: 'Is technology support a standalone service or integrated with manpower?', answer: 'We offer it both ways: as an integrated tech layer for clients using our security/facility services, or as standalone digital development for businesses.' },
      { question: 'Can you integrate digital visitor logs at our security gate?', answer: 'Yes. We provide tablet-based visitor management tools that work in sync with our on-site security guards.' }
    ],
    relatedSlugs: ['creative-media', 'private-security', 'manpower'],
    metaTitle: 'Business Software, Web Solutions & Digital Tools | JSM Integrated Services',
    metaDescription: 'Modern web design, digital visitor management systems, and lead automation for businesses across Tamil Nadu.'
  },
  {
    slug: 'creative-media',
    title: 'Creative Media & Corporate Documentation',
    shortTitle: 'Creative Media',
    phase: 'Phase 2 - Expansion Service',
    isCoreLaunch: false,
    category: 'creative',
    categoryLabel: 'Media & Branding',
    valueProposition: 'Professional corporate videography, event documentation, asset photography, and visual branding.',
    description: 'JSM Creative Media provides professional visual documentation for corporate operations, industrial plants, events, and real estate developments. We produce high-resolution photography, aerial drone surveys, and corporate videos that build trust and credibility for your brand.',
    whoItIsFor: [
      'Corporate Enterprises & Brands',
      'Industrial Plant Operators',
      'Real Estate Builders & Architects',
      'Event & Wedding Hosts',
      'Educational & Healthcare Campuses'
    ],
    icon: 'Palette',
    heroImage: '/images/facility_lobby.jpg',
    features: [
      { title: 'Corporate Facility Photography', description: 'High-definition captures of office interiors, industrial machinery, and infrastructure.', icon: 'Camera' },
      { title: 'Event & Conference Videography', description: 'Complete cinematic documentation and highlight reels of seminars and celebrations.', icon: 'Video' },
      { title: 'Real Estate & Property Showcases', description: 'Architectural photography, model apartment walkthroughs, and brochure assets.', icon: 'Home' },
      { title: 'Brand Identity & Marketing Collateral', description: 'Clean brochures, company profiles, signage design, and visual brand assets.', icon: 'Layers' },
      { title: 'Social Media Visual Packages', description: 'Engaging photo and video snippets formatted for LinkedIn, Instagram, and web display.', icon: 'Share2' },
      { title: 'Safety & Training Video Production', description: 'Custom visual SOP and safety induction videos for client workforce training.', icon: 'Film' }
    ],
    process: [
      { step: 1, title: 'Visual Concept & Shot Planning', description: 'We map required angles, lighting conditions, personnel coordination, and brand guidelines.' },
      { step: 2, title: 'On-Site Production Shoot', description: 'Professional crew executes photography and filming with minimal disruption to operations.' },
      { step: 3, title: 'Post-Production & Editing', description: 'Color grading, audio enhancement, title cards, and brand alignment.' },
      { step: 4, title: 'High-Res Asset Delivery', description: 'Optimized delivery for print, website, social media, and internal presentation use.' }
    ],
    faqs: [
      { question: 'Can you produce worker safety and induction videos for our factory?', answer: 'Yes. We script and produce site-specific visual safety induction videos to train incoming manpower effectively.' },
      { question: 'Do you provide full event photography and videography coverage?', answer: 'Yes. Our creative team captures corporate summits, milestone celebrations, and family weddings from start to finish.' }
    ],
    relatedSlugs: ['software-solutions', 'event-support', 'real-estate-support'],
    metaTitle: 'Corporate Photography, Video & Creative Media in Tamil Nadu | JSM Integrated Services',
    metaDescription: 'Professional corporate facility photography, event videography, and brand documentation services across Tamil Nadu.'
  }
];

export const services = servicesData;
