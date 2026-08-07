export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  category: 'security' | 'facilities' | 'digital' | 'events' | 'property';
  description: string;
  shortDescription: string;
  icon: string;
  heroImage: string;
  features: { title: string; description: string; icon: string }[];
  process: { step: number; title: string; description: string }[];
  stats: { value: string; label: string }[];
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[];
  metaTitle: string;
  metaDescription: string;
}

export const services: Service[] = [
  {
    slug: 'private-security',
    title: 'Elite Private Security Services',
    shortTitle: 'Private Security',
    category: 'security',
    description: 'Our elite private security services are designed to offer unparalleled protection for high-net-worth individuals, corporate executives, and sensitive operations. Leveraging former military and intelligence operatives, we provide a discrete yet formidable presence. Every security detail is tailored through comprehensive threat assessments.',
    shortDescription: 'Unparalleled protection for individuals and corporate executives.',
    icon: 'Shield',
    heroImage: '/images/services/private-security-hero.jpg',
    features: [
      { title: 'Close Protection', description: 'Highly trained personnel ensuring personal safety.', icon: 'UserCheck' },
      { title: 'Secure Transport', description: 'Armored and discreet vehicle logistics.', icon: 'Car' },
      { title: 'Threat Assessment', description: 'Proactive evaluation of potential risks.', icon: 'Target' },
      { title: 'Residential Security', description: '24/7 protection of primary and secondary residences.', icon: 'Home' },
      { title: 'Travel Security', description: 'International travel risk management and accompaniment.', icon: 'Globe' },
      { title: 'Emergency Response', description: 'Rapid extraction and crisis management capabilities.', icon: 'AlertTriangle' }
    ],
    process: [
      { step: 1, title: 'Initial Consultation', description: 'Understanding your unique risk profile and concerns.' },
      { step: 2, title: 'Vulnerability Assessment', description: 'Identifying potential weaknesses in your current security posture.' },
      { step: 3, title: 'Detail Deployment', description: 'Assigning specialized personnel tailored to your operational needs.' },
      { step: 4, title: 'Continuous Monitoring', description: 'Ongoing adaptation to changing threat landscapes.' }
    ],
    stats: [
      { value: '100+', label: 'Executive Details' },
      { value: '0', label: 'Security Breaches' },
      { value: '24/7', label: 'Active Protection' }
    ],
    faqs: [
      { question: 'Are your close protection officers armed?', answer: 'Depending on local jurisdiction and specific threat levels, our operatives can be deployed armed or unarmed.' },
      { question: 'Do you operate internationally?', answer: 'Yes, we provide seamless global security logistics.' },
      { question: 'How discreet is your service?', answer: 'Discretion is a core pillar. We blend into your lifestyle or corporate environment.' },
      { question: 'Can you secure my family?', answer: 'Absolutely. We offer specialized family protection details.' },
      { question: 'What backgrounds do your personnel have?', answer: 'Most of our operatives are drawn from elite military, police, and intelligence units.' }
    ],
    relatedSlugs: ['cctv-monitoring', 'risk-assessment', 'event-security'],
    metaTitle: 'Elite Private Security Services | JSM Security',
    metaDescription: 'Discreet, highly-trained close protection and private security services for executives and high-net-worth individuals.'
  },
  {
    slug: 'housekeeping',
    title: 'Professional Housekeeping & Facilities',
    shortTitle: 'Housekeeping',
    category: 'facilities',
    description: 'Maintain pristine operational environments with our premium housekeeping services. We integrate seamlessly into corporate offices, luxury residences, and commercial facilities to deliver uncompromising cleanliness and hygiene standards. Our staff are vetted, trained, and equipped with eco-friendly solutions.',
    shortDescription: 'Premium cleaning and maintenance for commercial and luxury spaces.',
    icon: 'Sparkles',
    heroImage: '/images/services/housekeeping-hero.jpg',
    features: [
      { title: 'Corporate Cleaning', description: 'Daily maintenance of office environments.', icon: 'Building' },
      { title: 'Deep Sanitization', description: 'Medical-grade disinfection protocols.', icon: 'ShieldPlus' },
      { title: 'Luxury Residential', description: 'Discreet housekeeping for high-end properties.', icon: 'Home' },
      { title: 'Eco-Friendly', description: 'Sustainable and non-toxic cleaning agents.', icon: 'Leaf' },
      { title: 'Specialized Surfaces', description: 'Care for marble, hardwood, and delicate materials.', icon: 'Layers' },
      { title: 'Flexible Scheduling', description: 'Out-of-hours service to minimize disruption.', icon: 'Clock' }
    ],
    process: [
      { step: 1, title: 'Site Inspection', description: 'Evaluating the scale and specific requirements of your facility.' },
      { step: 2, title: 'Custom Protocol Design', description: 'Creating a tailored cleaning schedule and checklist.' },
      { step: 3, title: 'Staff Allocation', description: 'Assigning dedicated personnel to your premises.' },
      { step: 4, title: 'Quality Assurance', description: 'Regular management audits to ensure standards are exceeded.' }
    ],
    stats: [
      { value: '500k+', label: 'Sq Ft Managed' },
      { value: '99%', label: 'Client Retention' },
      { value: '100%', label: 'Vetted Staff' }
    ],
    faqs: [
      { question: 'Do you provide out-of-hours cleaning?', answer: 'Yes, we operate 24/7 to ensure zero disruption to your business.' },
      { question: 'Are your cleaning staff background-checked?', answer: 'All staff undergo rigorous vetting and background checks.' },
      { question: 'What cleaning products do you use?', answer: 'We prioritize premium, eco-friendly, and non-toxic products.' },
      { question: 'Can you handle large corporate buildings?', answer: 'Yes, we scale our teams to manage facilities of any size.' },
      { question: 'Do you offer one-off deep cleans?', answer: 'While we focus on ongoing contracts, we do offer specialized one-off services for clients.' }
    ],
    relatedSlugs: ['manpower', 'real-estate', 'event-management'],
    metaTitle: 'Professional Housekeeping Services | JSM Security',
    metaDescription: 'Top-tier housekeeping and facility management for corporate and luxury residential spaces.'
  },
  {
    slug: 'manpower',
    title: 'Strategic Manpower & Staffing Solutions',
    shortTitle: 'Manpower Supply',
    category: 'facilities',
    description: 'Deploying reliable, skilled, and fully vetted personnel across multiple sectors. Whether you need administrative support, specialized operational staff, or rapid-deployment labor forces, our manpower solutions provide the human capital necessary to scale your operations efficiently and securely.',
    shortDescription: 'Reliable, vetted personnel for diverse operational needs.',
    icon: 'Users',
    heroImage: '/images/services/manpower-hero.jpg',
    features: [
      { title: 'Rapid Deployment', description: 'Quickly fill vital roles on short notice.', icon: 'Zap' },
      { title: 'Vetted Personnel', description: 'Comprehensive background checks and screening.', icon: 'UserCheck' },
      { title: 'Skill Matching', description: 'Precise alignment of candidate skills to role requirements.', icon: 'Target' },
      { title: 'Scalable Teams', description: 'From individuals to entire departments.', icon: 'TrendingUp' },
      { title: 'Payroll Management', description: 'End-to-end administration and compliance.', icon: 'FileText' },
      { title: 'Specialized Roles', description: 'Access to niche skills across industries.', icon: 'Briefcase' }
    ],
    process: [
      { step: 1, title: 'Requirement Analysis', description: 'Defining the exact skillsets and cultural fit needed.' },
      { step: 2, title: 'Sourcing & Screening', description: 'Leveraging our extensive network to identify candidates.' },
      { step: 3, title: 'Deployment', description: 'Onboarding and integrating staff into your operations.' },
      { step: 4, title: 'Performance Review', description: 'Ongoing evaluation to ensure optimal productivity.' }
    ],
    stats: [
      { value: '2,000+', label: 'Active Personnel' },
      { value: '<48h', label: 'Deployment Time' },
      { value: '5+', label: 'Industries Served' }
    ],
    faqs: [
      { question: 'What industries do you cover?', answer: 'We cover security, hospitality, corporate administration, and industrial sectors.' },
      { question: 'Do you handle payroll and taxes?', answer: 'Yes, we provide fully managed manpower services including payroll.' },
      { question: 'How fast can you deploy staff?', answer: 'Depending on the role, we can deploy staff within 24 to 48 hours.' },
      { question: 'Are temporary contracts available?', answer: 'Yes, we offer short-term, long-term, and permanent staffing solutions.' },
      { question: 'How do you vet candidates?', answer: 'Through multi-stage interviews, background checks, and skill verifications.' }
    ],
    relatedSlugs: ['housekeeping', 'event-management', 'private-security'],
    metaTitle: 'Strategic Manpower Solutions | JSM Security',
    metaDescription: 'Access vetted, reliable manpower and staffing solutions tailored for your operational scaling.'
  },
  {
    slug: 'cash-in-transit',
    title: 'Secure Cash-in-Transit (CIT) Operations',
    shortTitle: 'Cash-in-Transit',
    category: 'security',
    description: 'Safeguard your high-value assets and currency with our fortified Cash-in-Transit services. Utilizing armored vehicles, advanced tracking technology, and heavily armed personnel, we ensure the secure transfer of assets between financial institutions, retail centers, and corporate vaults.',
    shortDescription: 'Armored transport and secure logistics for high-value assets.',
    icon: 'Banknote',
    heroImage: '/images/services/cit-hero.jpg',
    features: [
      { title: 'Armored Fleet', description: 'State-of-the-art secure transport vehicles.', icon: 'Truck' },
      { title: 'Armed Personnel', description: 'Highly trained guards securing the transfer.', icon: 'ShieldAlert' },
      { title: 'Real-Time Tracking', description: 'GPS and communication monitoring of all routes.', icon: 'MapPin' },
      { title: 'Vault Storage', description: 'Secure overnight and long-term asset holding.', icon: 'Lock' },
      { title: 'Risk Mitigation', description: 'Dynamic routing and threat intelligence.', icon: 'Activity' },
      { title: 'Fully Insured', description: 'Comprehensive liability coverage for all transits.', icon: 'CheckCircle' }
    ],
    process: [
      { step: 1, title: 'Logistics Planning', description: 'Mapping secure routes and establishing protocols.' },
      { step: 2, title: 'Secure Collection', description: 'Procedural handover of assets at the client site.' },
      { step: 3, title: 'Monitored Transit', description: 'Active oversight from our 24/7 command center.' },
      { step: 4, title: 'Verified Delivery', description: 'Confirmed deposit and receipt generation.' }
    ],
    stats: [
      { value: '100%', label: 'Delivery Success' },
      { value: '$500M+', label: 'Assets Moved Monthly' },
      { value: '24/7', label: 'Command Oversight' }
    ],
    faqs: [
      { question: 'Are your vehicles armored?', answer: 'Yes, we utilize top-tier armored vehicles equipped with defensive countermeasures.' },
      { question: 'Is the cash fully insured during transit?', answer: 'Absolutely. We hold comprehensive insurance policies for all assets in our custody.' },
      { question: 'Can I track my deposit?', answer: 'Clients have access to verified delivery reports and tracking.' },
      { question: 'Do you service retail businesses?', answer: 'Yes, we provide scheduled and on-call collection for retail centers.' },
      { question: 'How do you handle routing?', answer: 'Routes are randomized and dynamically altered based on threat intelligence.' }
    ],
    relatedSlugs: ['private-security', 'cctv-monitoring', 'risk-assessment'],
    metaTitle: 'Secure Cash-in-Transit Services | JSM Security',
    metaDescription: 'Armored, secure, and fully insured cash-in-transit and asset logistics services.'
  },
  {
    slug: 'cctv-monitoring',
    title: '24/7 CCTV & Command Center Monitoring',
    shortTitle: 'CCTV Monitoring',
    category: 'digital',
    description: 'Transform passive surveillance into active defense. Our state-of-the-art Command Center provides real-time CCTV monitoring, utilizing AI-driven analytics to detect anomalies instantly. We bridge the gap between technology and human intelligence to secure your premises round the clock.',
    shortDescription: 'Active surveillance and AI-driven monitoring from our command center.',
    icon: 'Video',
    heroImage: '/images/services/cctv-hero.jpg',
    features: [
      { title: 'AI Intrusion Detection', description: 'Smart algorithms flag unauthorized access instantly.', icon: 'Brain' },
      { title: '24/7 Oversight', description: 'Continuous monitoring by trained analysts.', icon: 'Eye' },
      { title: 'Rapid Deployment', description: 'Immediate dispatch of response teams upon verification.', icon: 'Siren' },
      { title: 'System Integration', description: 'Seamless connection with existing security hardware.', icon: 'Link' },
      { title: 'Remote Access Control', description: 'Managing gates and barriers from the command center.', icon: 'Unlock' },
      { title: 'Incident Reporting', description: 'Detailed logs and video evidence provision.', icon: 'FileText' }
    ],
    process: [
      { step: 1, title: 'System Audit', description: 'Evaluating your current camera layout and hardware.' },
      { step: 2, title: 'Integration', description: 'Connecting your feeds to our secure Command Center.' },
      { step: 3, title: 'Rule Configuration', description: 'Setting specific alert parameters and AI zones.' },
      { step: 4, title: 'Active Monitoring', description: '24/7 vigilance and immediate incident response.' }
    ],
    stats: [
      { value: '10,000+', label: 'Cameras Monitored' },
      { value: '<5s', label: 'Alert Verification' },
      { value: '24/7/365', label: 'Command Center Uptime' }
    ],
    faqs: [
      { question: 'Can you monitor my existing cameras?', answer: 'Yes, our systems integrate with 95% of standard IP and analog camera systems.' },
      { question: 'What happens when an alarm triggers?', answer: 'Our analysts instantly verify the feed. If a threat is real, we dispatch response teams and notify authorities.' },
      { question: 'Do you use AI?', answer: 'Yes, we utilize advanced AI for motion, facial, and license plate recognition to reduce false alarms.' },
      { question: 'Is the command center secure?', answer: 'Our command center is a fortified, redundant facility designed for continuous operation.' },
      { question: 'Can you manage access control remotely?', answer: 'Yes, we can verify identities via camera and remotely unlock doors or gates.' }
    ],
    relatedSlugs: ['private-security', 'risk-assessment', 'software-solutions'],
    metaTitle: '24/7 CCTV Monitoring | JSM Security',
    metaDescription: 'Proactive CCTV monitoring and AI-driven surveillance from our state-of-the-art Command Center.'
  },
  {
    slug: 'event-security',
    title: 'Specialized Event Security & Crowd Control',
    shortTitle: 'Event Security',
    category: 'events',
    description: 'Ensure the safety and success of your large-scale gatherings. From corporate conferences to major festivals, our event security teams specialize in crowd management, VIP protection, and emergency response, delivering a safe environment without compromising the guest experience.',
    shortDescription: 'Crowd management and VIP protection for large-scale events.',
    icon: 'Ticket',
    heroImage: '/images/services/event-security-hero.jpg',
    features: [
      { title: 'Crowd Management', description: 'Strategic flow control and density monitoring.', icon: 'Users' },
      { title: 'Access Control', description: 'Ticket verification and perimeter security.', icon: 'Shield' },
      { title: 'VIP Protection', description: 'Dedicated details for high-profile attendees.', icon: 'Star' },
      { title: 'Emergency Planning', description: 'Comprehensive evacuation and crisis protocols.', icon: 'AlertOctagon' },
      { title: 'Bag Screening', description: 'Thorough but efficient entry point checks.', icon: 'Search' },
      { title: 'Medical Response', description: 'First-aid trained personnel on standby.', icon: 'HeartPulse' }
    ],
    process: [
      { step: 1, title: 'Site Survey', description: 'Analyzing the venue layout for vulnerabilities.' },
      { step: 2, title: 'Operational Plan', description: 'Drafting specific deployments for entry, stage, and perimeter.' },
      { step: 3, title: 'Briefing & Deployment', description: 'Pre-event staff alignment and positioning.' },
      { step: 4, title: 'Live Coordination', description: 'Real-time adjustments via on-site command post.' }
    ],
    stats: [
      { value: '500+', label: 'Events Secured' },
      { value: '1M+', label: 'Attendees Protected' },
      { value: '100%', label: 'Safety Record' }
    ],
    faqs: [
      { question: 'Do you handle festivals?', answer: 'Yes, we specialize in high-capacity events including music festivals.' },
      { question: 'Can you provide plainclothes security?', answer: 'Absolutely. We offer discreet security for corporate or VIP-heavy events.' },
      { question: 'Are your staff trained in conflict de-escalation?', answer: 'De-escalation is a core component of our event security training.' },
      { question: 'How early do you begin planning?', answer: 'For major events, we prefer to begin risk assessment months in advance.' },
      { question: 'Do you coordinate with local police?', answer: 'Yes, we always establish communication channels with local law enforcement.' }
    ],
    relatedSlugs: ['event-management', 'private-security', 'manpower'],
    metaTitle: 'Event Security & Crowd Control | JSM Security',
    metaDescription: 'Professional event security, crowd management, and VIP protection for events of all sizes.'
  },
  {
    slug: 'risk-assessment',
    title: 'Comprehensive Risk & Threat Assessment',
    shortTitle: 'Risk Assessment',
    category: 'security',
    description: 'Intelligence-led security begins with understanding your vulnerabilities. Our elite consultants conduct exhaustive risk assessments of physical premises, digital infrastructure, and operational procedures, delivering actionable blueprints to fortify your enterprise against modern threats.',
    shortDescription: 'Exhaustive audits of physical and digital vulnerabilities.',
    icon: 'Radar',
    heroImage: '/images/services/risk-hero.jpg',
    features: [
      { title: 'Site Penetration', description: 'Simulated physical breaches to test defenses.', icon: 'Target' },
      { title: 'Policy Audit', description: 'Review of current security protocols and compliance.', icon: 'FileSearch' },
      { title: 'Digital Footprint', description: 'Assessing OSINT vulnerabilities of key personnel.', icon: 'Monitor' },
      { title: 'Threat Modeling', description: 'Scenario-based analysis of potential attacks.', icon: 'Box' },
      { title: 'Architectural Review', description: 'Security evaluations of building layouts (CPTED).', icon: 'Building' },
      { title: 'Executive Reporting', description: 'Actionable intelligence briefs for board members.', icon: 'PieChart' }
    ],
    process: [
      { step: 1, title: 'Scope Definition', description: 'Identifying the assets and areas to be audited.' },
      { step: 2, title: 'Data Gathering', description: 'On-site inspections and intelligence collection.' },
      { step: 3, title: 'Vulnerability Analysis', description: 'Identifying gaps in physical and procedural security.' },
      { step: 4, title: 'Strategic Blueprint', description: 'Delivering a prioritized roadmap for mitigation.' }
    ],
    stats: [
      { value: '250+', label: 'Corporate Audits' },
      { value: '100%', label: 'Actionable Reports' },
      { value: 'Global', label: 'Coverage Area' }
    ],
    faqs: [
      { question: 'Who conducts the assessments?', answer: 'Former intelligence officers and certified security management professionals (CPP).' },
      { question: 'How long does an assessment take?', answer: 'Depending on scale, from a few days for a single site to weeks for an enterprise.' },
      { question: 'Do you implement the recommendations?', answer: 'Yes, we offer end-to-end solutions to fix identified vulnerabilities.' },
      { question: 'What is CPTED?', answer: 'Crime Prevention Through Environmental Design—using architecture to naturally deter threats.' },
      { question: 'Are the reports confidential?', answer: 'Extremely. All data is handled under strict NDAs and secure channels.' }
    ],
    relatedSlugs: ['private-security', 'cctv-monitoring', 'software-solutions'],
    metaTitle: 'Risk & Threat Assessment | JSM Security',
    metaDescription: 'Intelligence-led security audits and vulnerability assessments to fortify your enterprise.'
  },
  {
    slug: 'software-solutions',
    title: 'Custom Digital & Software Solutions',
    shortTitle: 'Software Solutions',
    category: 'digital',
    description: 'Empower your operations with custom-engineered software solutions. From bespoke access control dashboards to integrated resource planning systems, our digital division builds secure, scalable technology tailored to your exact operational requirements.',
    shortDescription: 'Secure, scalable custom software and IT infrastructure.',
    icon: 'Code2',
    heroImage: '/images/services/software-hero.jpg',
    features: [
      { title: 'Custom Dashboards', description: 'Unified interfaces for disparate security systems.', icon: 'LayoutDashboard' },
      { title: 'Mobile Applications', description: 'Field reporting and workforce management apps.', icon: 'Smartphone' },
      { title: 'API Integration', description: 'Connecting legacy systems with modern cloud infra.', icon: 'Network' },
      { title: 'Data Analytics', description: 'Turning operational data into actionable insights.', icon: 'BarChart' },
      { title: 'Secure Architecture', description: 'Built from the ground up with zero-trust principles.', icon: 'ShieldCheck' },
      { title: 'Cloud Infrastructure', description: 'Scalable and redundant hosting solutions.', icon: 'Cloud' }
    ],
    process: [
      { step: 1, title: 'Requirements Gathering', description: 'Deep dive into your operational bottlenecks.' },
      { step: 2, title: 'System Architecture', description: 'Designing secure and scalable software blueprints.' },
      { step: 3, title: 'Agile Development', description: 'Iterative coding with continuous client feedback.' },
      { step: 4, title: 'Deployment & Training', description: 'Secure rollout and comprehensive user training.' }
    ],
    stats: [
      { value: '50+', label: 'Enterprise Platforms' },
      { value: '99.9%', label: 'Uptime SLA' },
      { value: 'ISO 27001', label: 'Compliant' }
    ],
    faqs: [
      { question: 'Do you build native mobile apps?', answer: 'Yes, we develop for both iOS and Android platforms.' },
      { question: 'Is your software secure?', answer: 'Security is in our DNA. All software undergoes rigorous penetration testing.' },
      { question: 'Can you integrate with our existing hardware?', answer: 'We specialize in writing custom APIs to bridge old and new technologies.' },
      { question: 'Do you provide ongoing support?', answer: 'Yes, we offer 24/7 SLA-backed maintenance and support.' },
      { question: 'Who owns the intellectual property?', answer: 'Depending on the contract, source code IP is typically transferred to the client upon completion.' }
    ],
    relatedSlugs: ['cctv-monitoring', 'risk-assessment', 'creative-media'],
    metaTitle: 'Custom Digital & Software Solutions | JSM Security',
    metaDescription: 'Bespoke, highly secure software and digital platforms for enterprise operations.'
  },
  {
    slug: 'creative-media',
    title: 'Creative Media & Digital Branding',
    shortTitle: 'Creative Media',
    category: 'digital',
    description: 'Communicate your brand authority with high-end creative media services. From corporate videography and digital marketing to complete brand identity overhauls, our creative team ensures your visual presence is as strong as your physical security.',
    shortDescription: 'High-end corporate videography, branding, and digital marketing.',
    icon: 'Palette',
    heroImage: '/images/services/creative-hero.jpg',
    features: [
      { title: 'Brand Identity', description: 'Logos, guidelines, and corporate visual language.', icon: 'Brush' },
      { title: 'Corporate Videography', description: 'Cinematic promotional and training films.', icon: 'Video' },
      { title: 'Web Design', description: 'Premium, conversion-optimized corporate websites.', icon: 'Laptop' },
      { title: 'Digital Marketing', description: 'Targeted campaigns to elevate brand authority.', icon: 'Megaphone' },
      { title: 'Content Creation', description: 'Copywriting, photography, and social assets.', icon: 'Image' },
      { title: 'UI/UX Design', description: 'Intuitive interfaces for custom applications.', icon: 'MousePointer' }
    ],
    process: [
      { step: 1, title: 'Discovery', description: 'Understanding your brand values and target audience.' },
      { step: 2, title: 'Concept Creation', description: 'Developing mood boards and visual directions.' },
      { step: 3, title: 'Production', description: 'Shooting, designing, and coding the assets.' },
      { step: 4, title: 'Launch', description: 'Deploying the creative across chosen channels.' }
    ],
    stats: [
      { value: '200+', label: 'Brands Elevated' },
      { value: '4K', label: 'Cinematic Production' },
      { value: '360°', label: 'Campaign Management' }
    ],
    faqs: [
      { question: 'Why does a security company offer creative media?', answer: 'Our clients demanded the same level of excellence in their public image as they do in their security. We integrated to provide a holistic service.' },
      { question: 'Do you build websites?', answer: 'Yes, we design and develop high-performance corporate websites.' },
      { question: 'Can you produce corporate training videos?', answer: 'Absolutely, we specialize in high-quality internal training media.' },
      { question: 'Do you handle SEO?', answer: 'Yes, digital marketing and SEO are core competencies.' },
      { question: 'Can we hire you just for design?', answer: 'Yes, our creative services can be engaged independently.' }
    ],
    relatedSlugs: ['software-solutions', 'event-management', 'wedding-planning'],
    metaTitle: 'Creative Media & Branding | JSM Security',
    metaDescription: 'Elevate your corporate identity with premium videography, branding, and digital design.'
  },
  {
    slug: 'wedding-planning',
    title: 'Luxury Wedding & Event Planning',
    shortTitle: 'Wedding Planning',
    category: 'events',
    description: 'Experience flawless execution on your most important day. Our luxury wedding planning service combines meticulous design, elite vendor management, and discreet on-site coordination, ensuring your celebration is breathtaking and completely secure.',
    shortDescription: 'Meticulous coordination and design for luxury weddings.',
    icon: 'Heart',
    heroImage: '/images/services/wedding-hero.jpg',
    features: [
      { title: 'Venue Sourcing', description: 'Access to exclusive and secure global locations.', icon: 'Map' },
      { title: 'Design & Decor', description: 'Bespoke aesthetics tailored to your vision.', icon: 'Sparkles' },
      { title: 'Vendor Management', description: 'Coordinating elite caterers, florists, and entertainers.', icon: 'Users' },
      { title: 'Discreet Security', description: 'Seamless integration of close protection elements.', icon: 'ShieldCheck' },
      { title: 'Guest Concierge', description: 'Managing travel and accommodation for VIP guests.', icon: 'ConciergeBell' },
      { title: 'Day-of Coordination', description: 'Flawless minute-by-minute execution.', icon: 'Clock' }
    ],
    process: [
      { step: 1, title: 'Vision Consultation', description: 'Defining the aesthetic, scale, and specific requirements.' },
      { step: 2, title: 'Curated Proposals', description: 'Presenting venue and vendor options.' },
      { step: 3, title: 'Detailed Planning', description: 'Managing timelines, logistics, and security protocols.' },
      { step: 4, title: 'Event Execution', description: 'Orchestrating the event seamlessly behind the scenes.' }
    ],
    stats: [
      { value: '100+', label: 'Luxury Weddings' },
      { value: 'Global', label: 'Destination Capability' },
      { value: '0', label: 'Details Missed' }
    ],
    faqs: [
      { question: 'Do you handle destination weddings?', answer: 'Yes, we manage complex logistics for international celebrations.' },
      { question: 'How is security integrated?', answer: 'We provide plainclothes operatives who blend in as event staff or guests to ensure safety without altering the atmosphere.' },
      { question: 'Can you secure high-profile guests?', answer: 'Yes, we manage VIP arrivals, secure routing, and close protection.' },
      { question: 'Do you design the event?', answer: 'Yes, we offer full creative direction and floral design coordination.' },
      { question: 'How far in advance should we book?', answer: 'For luxury events, we recommend engaging us 9-12 months prior.' }
    ],
    relatedSlugs: ['event-security', 'event-management', 'creative-media'],
    metaTitle: 'Luxury Wedding Planning | JSM Security',
    metaDescription: 'Flawless, secure, and breathtaking luxury wedding planning and coordination.'
  },
  {
    slug: 'event-management',
    title: 'Corporate Event Management',
    shortTitle: 'Event Management',
    category: 'events',
    description: 'Deliver impactful corporate experiences with precision. From high-stakes board retreats and product launches to massive industry conferences, our event management team handles logistics, production, and security to guarantee absolute success.',
    shortDescription: 'Precision logistics and production for corporate events.',
    icon: 'Calendar',
    heroImage: '/images/services/event-mgt-hero.jpg',
    features: [
      { title: 'End-to-End Logistics', description: 'Travel, freight, and schedule management.', icon: 'Truck' },
      { title: 'AV & Production', description: 'State-of-the-art lighting, sound, and staging.', icon: 'Mic' },
      { title: 'Venue Management', description: 'Contract negotiation and spatial planning.', icon: 'Building' },
      { title: 'Delegate Registration', description: 'Secure and smooth check-in processes.', icon: 'ClipboardCheck' },
      { title: 'Risk Management', description: 'Integrated health, safety, and security protocols.', icon: 'Shield' },
      { title: 'Post-Event Analytics', description: 'ROI reporting and attendee feedback analysis.', icon: 'BarChart' }
    ],
    process: [
      { step: 1, title: 'Strategic Brief', description: 'Aligning the event goals with corporate objectives.' },
      { step: 2, title: 'Logistics Mapping', description: 'Securing venues, tech, and creating the run-of-show.' },
      { step: 3, title: 'Live Management', description: 'On-the-ground coordination of all moving parts.' },
      { step: 4, title: 'Debrief', description: 'Analyzing success metrics and financial reconciliation.' }
    ],
    stats: [
      { value: '300+', label: 'Corporate Events' },
      { value: '50K+', label: 'Delegates Managed' },
      { value: '100%', label: 'SLA Compliance' }
    ],
    faqs: [
      { question: 'Can you manage international conferences?', answer: 'Yes, we have global logistical capabilities.' },
      { question: 'Do you handle the technical production?', answer: 'We manage full AV, staging, and broadcast production.' },
      { question: 'How do you ensure data security at registration?', answer: 'We use encrypted, GDPR-compliant registration platforms.' },
      { question: 'Do you organize team-building retreats?', answer: 'Yes, including secure, exclusive locations for executives.' },
      { question: 'Can you integrate security into the management?', answer: 'As an integrated services provider, security is seamlessly built into our event management.' }
    ],
    relatedSlugs: ['event-security', 'creative-media', 'wedding-planning'],
    metaTitle: 'Corporate Event Management | JSM Security',
    metaDescription: 'Impactful, flawlessly executed corporate events, conferences, and product launches.'
  },
  {
    slug: 'real-estate',
    title: 'Premium Real Estate Security & Management',
    shortTitle: 'Real Estate',
    category: 'property',
    description: 'Protect and elevate the value of your property assets. We provide integrated security, concierge, and facility management services for luxury residential towers, commercial estates, and private complexes, ensuring a premium environment for tenants and residents.',
    shortDescription: 'Integrated security and concierge for luxury and commercial properties.',
    icon: 'Building2',
    heroImage: '/images/services/real-estate-hero.jpg',
    features: [
      { title: 'Concierge Security', description: 'Front-of-house staff trained in both hospitality and security.', icon: 'UserCircle' },
      { title: 'Access Control', description: 'Managing tenant and visitor entry systems.', icon: 'Key' },
      { title: 'Patrol Services', description: 'Visible deterrent patrols across the estate.', icon: 'Footprints' },
      { title: 'Facility Maintenance', description: 'Coordination of cleaning and technical maintenance.', icon: 'Wrench' },
      { title: 'Emergency Protocols', description: 'Fire marshal and evacuation management.', icon: 'Flame' },
      { title: 'Asset Protection', description: 'Preventing vandalism and property degradation.', icon: 'Shield' }
    ],
    process: [
      { step: 1, title: 'Property Audit', description: 'Assessing the security and facility needs of the estate.' },
      { step: 2, title: 'System Upgrades', description: 'Modernizing access control and CCTV infrastructure.' },
      { step: 3, title: 'Staff Deployment', description: 'Positioning trained concierge and security personnel.' },
      { step: 4, title: 'Ongoing Management', description: '24/7 support and regular tenant satisfaction reviews.' }
    ],
    stats: [
      { value: '50+', label: 'Estates Managed' },
      { value: '10K+', label: 'Tenants Secured' },
      { value: '24/7', label: 'Concierge Support' }
    ],
    faqs: [
      { question: 'Do your guards wear uniforms?', answer: 'Yes, typically premium concierge-style suits rather than tactical gear.' },
      { question: 'Can you manage the cleaning as well?', answer: 'Yes, via our integrated housekeeping division.' },
      { question: 'How do you handle disgruntled visitors?', answer: 'Our staff are experts in de-escalation and customer service.' },
      { question: 'Do you monitor the fire alarms?', answer: 'We integrate with building management systems for total oversight.' },
      { question: 'Is this for commercial or residential?', answer: 'We service both high-end commercial and luxury residential properties.' }
    ],
    relatedSlugs: ['housekeeping', 'cctv-monitoring', 'auction-houses'],
    metaTitle: 'Real Estate Security & Management | JSM Security',
    metaDescription: 'Premium security, concierge, and facility management for high-end properties.'
  },
  {
    slug: 'auction-houses',
    title: 'Auction House & Fine Art Security',
    shortTitle: 'Auction Security',
    category: 'property',
    description: 'Securing the world\'s most valuable artifacts. We provide specialized, discreet security for fine art galleries, auction houses, and private collectors. From preview exhibitions to live bidding floors, we ensure zero loss without disrupting the luxury experience.',
    shortDescription: 'Discreet, high-stakes security for fine art and auctions.',
    icon: 'Gavel',
    heroImage: '/images/services/auction-hero.jpg',
    features: [
      { title: 'Exhibition Security', description: 'Static guarding for high-value items during viewings.', icon: 'Eye' },
      { title: 'Covert Surveillance', description: 'Plainclothes operatives identifying suspicious behavior.', icon: 'UserSearch' },
      { title: 'Secure Transport', description: 'Armored logistics for art pieces and jewelry.', icon: 'Truck' },
      { title: 'Access Management', description: 'Vetting and controlling entry to private bidding rooms.', icon: 'Lock' },
      { title: 'Anti-Theft Protocols', description: 'Rapid lockdown procedures and asset tracking.', icon: 'ShieldAlert' },
      { title: 'White-Glove Service', description: 'Security personnel trained in luxury etiquette.', icon: 'Gem' }
    ],
    process: [
      { step: 1, title: 'Item Valuation Assessment', description: 'Understanding the specific risks tied to the inventory.' },
      { step: 2, title: 'Venue Fortification', description: 'Implementing temporary physical and electronic barriers.' },
      { step: 3, title: 'Live Event Security', description: 'Managing the floor during previews and active auctions.' },
      { step: 4, title: 'Secure Load-Out', description: 'Ensuring safe handover and transport post-sale.' }
    ],
    stats: [
      { value: '$2B+', label: 'Assets Protected' },
      { value: '0', label: 'Loss Incidents' },
      { value: 'Top Tier', label: 'Gallery Partners' }
    ],
    faqs: [
      { question: 'Are your guards visible?', answer: 'We use a mix of highly visible deterrent guards and covert plainclothes operatives.' },
      { question: 'Do you understand art handling?', answer: 'Yes, our teams are briefed on the fragility and value of specific pieces.' },
      { question: 'Can you secure high-value jewelry?', answer: 'Absolutely. We have specific protocols for small, ultra-high-value items.' },
      { question: 'Do you protect the bidders?', answer: 'Yes, we ensure the safety and anonymity of high-net-worth clients.' },
      { question: 'Is transport included?', answer: 'We provide secure, climate-controlled armored transport via our CIT division.' }
    ],
    relatedSlugs: ['private-security', 'cash-in-transit', 'real-estate'],
    metaTitle: 'Auction House & Fine Art Security | JSM Security',
    metaDescription: 'Specialized security services for fine art, jewelry, auction houses, and private collectors.'
  }
];

export const servicesData = services;
export const serviceCategories = ['All', 'Security', 'Facilities', 'Digital', 'Events', 'Property'];

