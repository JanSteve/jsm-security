export interface Industry {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  tagline: string;
  summary: string;
  operationalChallenges: string[];
  jsmSolution: string;
  recommendedServices: string[];
  keyBenefits: string[];
  metaTitle: string;
  metaDescription: string;
}

export const industriesData: Industry[] = [
  {
    slug: 'residential-societies',
    title: 'Residential Societies & Gated Communities',
    shortTitle: 'Residential Communities',
    icon: 'Home',
    tagline: 'Courteous gate vigilance, common area hygiene, and resident peace of mind.',
    summary: 'Residential apartments and gated villa communities require a delicate balance of firm access control and respectful, resident-friendly hospitality. JSM provides trained gatekeepers, visitor verification, perimeter patrolling, and common-area housekeeping.',
    operationalChallenges: [
      'Managing high-volume delivery personnel, domestic staff, and guest entries.',
      'Maintaining spotless hygiene across clubhouses, elevators, and corridors.',
      'Preventing unauthorized night parking and perimeter trespassing.'
    ],
    jsmSolution: 'We deploy groomed security personnel trained in courteous communication and digital visitor logging, backed by dedicated morning housekeeping crews for common areas.',
    recommendedServices: ['private-security', 'housekeeping', 'manpower'],
    keyBenefits: [
      '100% visitor and delivery vehicle logging',
      'Daily scheduled cleaning of corridors, lobbies, and amenity spaces',
      'Single monthly consolidated invoice for security and cleaning'
    ],
    metaTitle: 'Security & Facility Management for Residential Societies in Tamil Nadu | JSM',
    metaDescription: 'Trusted gate security, visitor management, and common area housekeeping for apartments and gated communities across Tamil Nadu.'
  },
  {
    slug: 'corporate-offices',
    title: 'Corporate Offices & IT Parks',
    shortTitle: 'Corporate & IT Parks',
    icon: 'Building2',
    tagline: 'Professional front-desk security, immaculate workspace hygiene, and tech integration.',
    summary: 'Corporate headquarters and tech facilities demand high operational standards, structured visitor badges, clean workstations, hygienic restrooms, and uninterrupted facility uptime.',
    operationalChallenges: [
      'Maintaining continuous washroom sanitization and pantry hygiene during peak hours.',
      'Controlling access to sensitive server rooms and executive floors.',
      'Managing coordination across multiple unaligned service vendors.'
    ],
    jsmSolution: 'JSM unifies front-desk concierge guarding, discreet floor security, hourly restroom cleaning schedules, and pantry assistance under a single site supervisor.',
    recommendedServices: ['private-security', 'housekeeping', 'manpower', 'software-solutions'],
    keyBenefits: [
      'Pristine workspace environment elevating client and employee experience',
      'Zero-trust access control for sensitive office zones',
      'Consolidated operational reporting and single-point escalation'
    ],
    metaTitle: 'Facility Management & Security for Corporate Offices | JSM Integrated Services',
    metaDescription: 'Complete office facility support: corporate security, daily housekeeping, pantry management, and visitor logging across Tamil Nadu.'
  },
  {
    slug: 'factories-manufacturing',
    title: 'Factories & Manufacturing Plants',
    shortTitle: 'Factories & Industrial',
    icon: 'Factory',
    tagline: 'Material gate control, industrial labor supply, and workplace safety compliance.',
    summary: 'Manufacturing facilities operate in high-risk environments with substantial movement of heavy machinery, raw materials, finished inventory, and shift workers.',
    operationalChallenges: [
      'Preventing unauthorized raw material and tool pilferage at dispatch gates.',
      'Sourcing reliable shift labor and loading/unloading manpower on short notice.',
      'Ensuring strict adherence to factory safety gear (PPE) at entrance points.'
    ],
    jsmSolution: 'We implement disciplined gate-pass verification, physical worker baggage checks, perimeter night vigilance, and supply vetted industrial labor teams.',
    recommendedServices: ['private-security', 'manpower', 'housekeeping'],
    keyBenefits: [
      'Strict inward/outward material register logging',
      'Dependable semi-skilled labor deployment with statutory compliance',
      'Round-the-clock supervisor oversight and perimeter vigilance'
    ],
    metaTitle: 'Industrial Security & Factory Manpower Supply in Tamil Nadu | JSM',
    metaDescription: 'Reliable industrial security guarding, gate pass control, and factory manpower supply for manufacturing plants across Tamil Nadu.'
  },
  {
    slug: 'warehouses-logistics',
    title: 'Warehouses & Logistics Hubs',
    shortTitle: 'Warehouses & Logistics',
    icon: 'Warehouse',
    tagline: 'Dock security, inventory movement logging, and dependable freight handlers.',
    summary: 'Logistics hubs require fast vehicle turnaround, strict seal checks on shipping containers, 24/7 yard surveillance, and experienced material handling manpower.',
    operationalChallenges: [
      'Long queues of transport trucks requiring fast, error-free gate documentation.',
      'High risk of inventory shrinkage during night loading cycles.',
      'Managing sudden workforce surges during festive shopping periods.'
    ],
    jsmSolution: 'JSM deploys trained transport gate officers, perimeter patrolling guards, and scalable warehouse pick-and-pack staffing pools.',
    recommendedServices: ['private-security', 'manpower', 'cash-in-transit'],
    keyBenefits: [
      'Truck driver ID checks and vehicle seal verification registers',
      'Scalable manpower pool for peak dispatch hours',
      'Unbroken night security preventing yard trespassing'
    ],
    metaTitle: 'Warehouse Security & Logistics Manpower in Tamil Nadu | JSM Integrated Services',
    metaDescription: 'Complete security and staffing support for warehouses, distribution centers, and freight logistics yards in Tamil Nadu.'
  },
  {
    slug: 'retail-shopping',
    title: 'Retail Showrooms & Shopping Malls',
    shortTitle: 'Retail & Showrooms',
    icon: 'ShoppingBag',
    tagline: 'Welcoming customer security, loss prevention, and gleaming showroom cleanliness.',
    summary: 'Retail environments require friendly, well-groomed entrance guards who deter shoplifting while maintaining a warm, hospitable atmosphere for shoppers.',
    operationalChallenges: [
      'Preventing merchandise loss without intimidating genuine customers.',
      'Maintaining spotless glass facades and spotless floor luster during peak shopping hours.',
      'Managing daily cash collections and secure transit to bank branches.'
    ],
    jsmSolution: 'We provide customer-friendly security guards, continuous floor housekeeping, and structured cash-in-transit collection routines.',
    recommendedServices: ['private-security', 'housekeeping', 'cash-in-transit'],
    keyBenefits: [
      'Courteous loss-prevention personnel at entrances and exits',
      'High-gloss floor maintenance and spotless glass fixtures',
      'Secure daily cash custody handovers'
    ],
    metaTitle: 'Retail Showroom Security & Housekeeping Services | JSM Integrated Services',
    metaDescription: 'Professional security guarding, housekeeping, and cash collection for shopping malls and retail showrooms across Tamil Nadu.'
  },
  {
    slug: 'hospitals-healthcare',
    title: 'Hospitals & Healthcare Facilities',
    shortTitle: 'Hospitals & Healthcare',
    icon: 'Hospital',
    tagline: 'Empathetic patient guidance, emergency room order, and rigorous hospital sanitization.',
    summary: 'Healthcare facilities operate 24/7 under high emotional tension. Staff must be empathetic, calm under pressure, and trained to maintain strict bio-cleanliness.',
    operationalChallenges: [
      'Crowd control in emergency departments during critical admissions.',
      'Preventing unauthorized entry into intensive care and surgical suites.',
      'Adhering to strict hospital sanitation and infection-control protocols.'
    ],
    jsmSolution: 'We deploy calm, de-escalation trained security guards for casualty and ICU zones, alongside trained hospital housekeeping staff.',
    recommendedServices: ['private-security', 'housekeeping', 'manpower'],
    keyBenefits: [
      'Trained de-escalation personnel maintaining hospital decorum',
      'Structured patient escorting and ambulance bay traffic clearance',
      'Rigorous hospital hygiene and infection control routines'
    ],
    metaTitle: 'Hospital Security & Healthcare Housekeeping in Tamil Nadu | JSM',
    metaDescription: 'Empathetic hospital security, casualty crowd control, and healthcare sanitization services across Tamil Nadu.'
  },
  {
    slug: 'educational-institutions',
    title: 'Educational Institutions & Campuses',
    shortTitle: 'Schools & Colleges',
    icon: 'GraduationCap',
    tagline: 'Child-safe gate protocols, campus perimeter protection, and hygienic classrooms.',
    summary: 'Schools and universities demand uncompromised child safety, strict pickup verification, anti-ragging perimeter patrols, and hygienic learning spaces.',
    operationalChallenges: [
      'Verifying parents and authorized guardians during school dismissal rush.',
      'Preventing unauthorized outsiders from entering college campus grounds.',
      'Daily sanitization of classrooms, computer labs, and student restrooms.'
    ],
    jsmSolution: 'JSM assigns thoroughly vetted personnel for gate access control, bus boarding supervision, and clean classroom maintenance.',
    recommendedServices: ['private-security', 'housekeeping', 'manpower'],
    keyBenefits: [
      '100% parent/guardian pickup verification checks',
      'Child-safe, background-verified security and support staff',
      'Spotless campus sanitation ensuring a healthy student environment'
    ],
    metaTitle: 'Campus Security & School Housekeeping Services | JSM Integrated Services',
    metaDescription: 'Trusted school gate security, campus perimeter protection, and educational facility housekeeping across Tamil Nadu.'
  },
  {
    slug: 'banks-financial',
    title: 'Banks & Financial Businesses',
    shortTitle: 'Banks & Financial',
    icon: 'Landmark',
    tagline: 'Compliant branch guarding, ATM surveillance checks, and secure cash logistics.',
    summary: 'Financial institutions require alert, disciplined security officers trained in statutory protocols, customer queue order, and dual-custody asset transfer procedures.',
    operationalChallenges: [
      'Maintaining vigilant branch entry control without slowing legitimate customer service.',
      'Strict adherence to banking security standing orders and regulatory guidelines.',
      'Secure transit of currency between branches and currency chests.'
    ],
    jsmSolution: 'We provide disciplined, vetted security guards for banking halls, structured ATM checks, and two-person custody cash-in-transit transfers where permitted.',
    recommendedServices: ['private-security', 'cash-in-transit', 'housekeeping'],
    keyBenefits: [
      'Disciplined branch entry and queue management',
      'Verified two-person cash transfer documentation',
      'Confidential and compliant operational standards'
    ],
    metaTitle: 'Bank Security Guarding & Cash Logistics Support | JSM Integrated Services',
    metaDescription: 'Disciplined security personnel, branch gatekeeping, and secure cash transfer support for banks and financial institutions in Tamil Nadu.'
  },
  {
    slug: 'events-weddings',
    title: 'Events & Wedding Functions',
    shortTitle: 'Events & Weddings',
    icon: 'PartyPopper',
    tagline: 'Smooth guest arrivals, VIP protection, valet flow, and partner media coverage.',
    summary: 'Grand marriages, corporate product launches, and public exhibitions require seamless hospitality, orderly parking management, and unobtrusive security.',
    operationalChallenges: [
      'Traffic gridlocks and chaotic parking near marriage halls and banquet venues.',
      'Managing stage access during VIP visits and celebrity attendance.',
      'Maintaining clean banquet facilities throughout multi-day wedding festivities.'
    ],
    jsmSolution: 'JSM organizes dedicated valet traffic wardens, polite bouncer teams for stage/VIP zones, guest ushers, and continuous banquet cleaning crews.',
    recommendedServices: ['event-support', 'private-security', 'creative-media'],
    keyBenefits: [
      'Stress-free parking and welcoming guest reception',
      'Courteous VIP escorting without disrupting the celebration',
      'Integrated event videography and photography through partner networks'
    ],
    metaTitle: 'Wedding Security & Event Management Support in Tamil Nadu | JSM',
    metaDescription: 'Hospitality-trained bouncers, wedding valet coordination, VIP protection, and event support across Tamil Nadu.'
  },
  {
    slug: 'real-estate-construction',
    title: 'Real Estate Construction & Builders',
    shortTitle: 'Real Estate & Builders',
    icon: 'HardHat',
    tagline: 'Construction material safeguarding, labor gate-pass control, and sales flat hosting.',
    summary: 'Builders and property developers need to prevent costly theft of raw materials (steel, copper wire, cement) while maintaining an impressive sales gallery for buyers.',
    operationalChallenges: [
      'Pilferage of valuable construction inventory during night and weekend hours.',
      'Tracking daily movement of external contractor labor across large sites.',
      'Hosting prospective home buyers in model apartments with a luxury touch.'
    ],
    jsmSolution: 'We deploy perimeter construction guards with material inward/outward registers, plus well-groomed hosts for model flat sales lounges.',
    recommendedServices: ['real-estate-support', 'private-security', 'housekeeping'],
    keyBenefits: [
      'Strict material gate passes preventing construction inventory loss',
      'Daily contractor worker ID checks',
      'Pristine model flat cleanliness and courteous buyer reception'
    ],
    metaTitle: 'Construction Site Security & Builder Support in Tamil Nadu | JSM',
    metaDescription: 'Construction inventory security, labor gate control, and model apartment concierge hosting for real estate builders in Tamil Nadu.'
  },
  {
    slug: 'auction-operations',
    title: 'Auction Houses & Site Operations',
    shortTitle: 'Auction Houses & Sites',
    icon: 'Gavel',
    tagline: 'Bidder verification, high-value asset safeguarding, and orderly bidding floor management.',
    summary: 'Commercial, vehicle, and real estate auctions involve fast-paced financial transactions and high-value physical asset inspections requiring tight access control.',
    operationalChallenges: [
      'Verifying registered bidders and preventing unvetted attendees from disrupting proceedings.',
      'Securing high-value assets and machinery on display prior to auction gavel.',
      'Maintaining calm, disciplined crowd management during competitive bidding.'
    ],
    jsmSolution: 'JSM coordinates token verification at registration desks, asset perimeter protection, and orderly hall management.',
    recommendedServices: ['real-estate-support', 'private-security', 'cash-in-transit'],
    keyBenefits: [
      'Structured bidder entry authentication',
      'Physical protection for assets under auction',
      'Disciplined hall coordination and cashier desk security'
    ],
    metaTitle: 'Auction Security & Bidder Management in Tamil Nadu | JSM Integrated Services',
    metaDescription: 'Bidder verification, high-value asset protection, and orderly hall security for auction sites across Tamil Nadu.'
  },
  {
    slug: 'smes-commercial',
    title: 'SMEs & Growing Commercial Businesses',
    shortTitle: 'SMEs & Businesses',
    icon: 'Briefcase',
    tagline: 'Affordable, professional integrated operations scaling with your business growth.',
    summary: 'Small and medium enterprises need professional security and cleaning standards without the complexity of managing multiple vendors or bloated overheads.',
    operationalChallenges: [
      'Managing multiple individual vendors for office cleaning, night guarding, and temp staff.',
      'Lack of accountability and frequent absenteeism from unorganized local agencies.',
      'Needing flexible terms that adapt as the business expands.'
    ],
    jsmSolution: 'JSM provides flexible, bundled packages combining part-time/full-time security, daily cleaning, and temporary manpower under one contract.',
    recommendedServices: ['private-security', 'housekeeping', 'manpower', 'software-solutions'],
    keyBenefits: [
      'Single bundled monthly invoice saving administrative time',
      'Guaranteed replacement coverage for staff absences',
      'Transparent pricing and founder-led client communication'
    ],
    metaTitle: 'Integrated Security & Housekeeping for SMEs in Tamil Nadu | JSM',
    metaDescription: 'Affordable, bundled security guarding, housekeeping, and staffing packages tailored for growing small and medium businesses in Tamil Nadu.'
  }
];
