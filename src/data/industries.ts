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
    recommendedServices: ['private-security', 'housekeeping', 'manpower'],
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
    recommendedServices: ['private-security', 'manpower', 'housekeeping'],
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
    jsmSolution: 'We provide customer-friendly security guards, continuous floor housekeeping, and structured cash handling security protocols.',
    recommendedServices: ['private-security', 'housekeeping', 'manpower'],
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
  }
];
