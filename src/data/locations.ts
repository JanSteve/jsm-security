export interface SectorBattlecard {
  sector: string;
  painPoint: string;
  jsmSolution: string;
  sla: string;
}

export interface LocationData {
  slug: string;
  city: string;
  district: string;
  state: string;
  regionType: string;
  role: string;
  address: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  operationalOverview: string;
  operationalBadges?: string[];
  keyIndustrialZones: string[];
  deploymentSectors: string[];
  highIntentKeywords: string[];
  sectorBattlecards: SectorBattlecard[];
  responseSla: string;
  supervisoryModel: string;
  complianceHighlights: string[];
  localFaqs: { question: string; answer: string }[];
}

export const locationsData: LocationData[] = [
  {
    slug: "trichy",
    city: "Tiruchirappalli (Trichy)",
    district: "Tiruchirappalli",
    state: "Tamil Nadu",
    regionType: "Central Command & Corporate Headquarters",
    role: "Headquarters & 24/7 Operations Command",
    address: "D.No. 87, Plot No. 112, Gandhi Nagar, Kottapattu Block - R.V.S. Nagar 2nd Cross Road, Tiruchirappalli, Tamil Nadu - 620021",
    postalCode: "620021",
    latitude: 10.7905,
    longitude: 78.7047,
    phone: "+91 90808 63448",
    email: "contact@jsmintegratedservices.com",
    metaTitle: "Security Guard Agency & Facility Services in Trichy",
    metaDescription: "Ex-Servicemen led security guards, 100% EPF/ESIC compliant contract manpower, and mechanized housekeeping in Trichy. Headquarters with 2-hour relief standby guarantee.",
    heroHeadline: "Security Guard Forces & Integrated Facilities in Tiruchirappalli",
    heroSubheadline: "Headquartered in Trichy, JSM Integrated Services delivers veteran-led security forces, compliant industrial staffing, and mechanized facility management across Central Tamil Nadu.",
    operationalOverview: "Trichy Central Command coordinates 24/7 quick-reaction standby squads, AAI airport concourse detachments, and industrial guarding across the Thuvakudi-BHEL belt with daily 2:00 AM van audits.",
    operationalBadges: [
      "AAI Concourse Contractor",
      "2-Hour Standby SLA",
      "02:00 AM Audits"
    ],
    keyIndustrialZones: [
      "Thuvakudi & BHEL Industrial Belt",
      "Trichy International Airport Concourse & Cargo Complex",
      "Mathur & Viralimalai Manufacturing Clusters",
      "Cantonment & Thillai Nagar Commercial Enclaves"
    ],
    deploymentSectors: [
      "Aviation & High-Density Passenger Terminals",
      "Heavy Engineering & Fabrication Units",
      "Commercial Offices & Banking Institutions",
      "Healthcare Facilities & Residential Townships"
    ],
    highIntentKeywords: [
      "Security guard agency in Trichy",
      "Security services in Trichy",
      "Contract labour supplier in Trichy",
      "Manpower agency Trichy",
      "Housekeeping services Trichy",
      "Ex-servicemen security guards Trichy",
      "AAI airport security contractor Trichy"
    ],
    sectorBattlecards: [
      {
        sector: "Aviation & Transport Terminals",
        painPoint: "High crowd surges, unvetted civilian staff, passenger access disputes.",
        jsmSolution: "Concourse barrier crowd control verified at Trichy International Airport, strict AVSEC protocols, 100% police antecedent verification.",
        sla: "Zero Security Incident Track Record"
      },
      {
        sector: "BHEL & Thuvakudi Fabricators",
        painPoint: "Raw material theft, scrap shrinkage, unauthorized nocturnal trespassing.",
        jsmSolution: "Dual-barrier weighbridge logging, material gate-pass enforcement, 2:00 AM supervisor patrol van inspections.",
        sla: "2-Hour Emergency Relief Standby"
      },
      {
        sector: "Healthcare & Multi-Specialty Clinics",
        painPoint: "Cross-contamination risks, patient casualty crowding, receptionist overload.",
        jsmSolution: "Hospital-grade color-coded microfiber sanitation, trained patient escort marshals, automated WhatsApp token trackers.",
        sla: "Hourly Sanitization Logs"
      }
    ],
    responseSla: "2-Hour Emergency Standby Relief Guarantee",
    supervisoryModel: "Ex-Servicemen (ESM) Field Officers & Mobile Patrol Units",
    complianceHighlights: [
      "Tamil Nadu Home Department PSARA 2005 Licensed",
      "100% EPF & ESIC Monthly Remittance with ECR Challans",
      "Mandatory Police & Aadhaar Verified Personnel",
      "2-Hour Rapid Relief Standby Response Guarantee"
    ],
    localFaqs: [
      {
        question: "Where is the JSM Trichy headquarters located?",
        answer: "Our central operations headquarters is located at D.No. 87, Plot No. 112, Gandhi Nagar, Kottapattu Block - R.V.S. Nagar 2nd Cross Road, Tiruchirappalli - 620021. You can visit or call our 24/7 desk at +91 90808 63448."
      },
      {
        question: "How fast can JSM deploy security or manpower in Trichy?",
        answer: "For emergency relief deployments, we guarantee 2-hour response times. Full site onboarding with site-specific SOPs and trained muster teams is executed within 48 to 72 hours."
      },
      {
        question: "Does JSM provide Ex-Servicemen (ESM) security guards in Trichy?",
        answer: "Yes. Our operations are directed by decorated Indian Army veterans, and we deploy disciplined ESM supervisory marshals across central Tamil Nadu."
      }
    ]
  },
  {
    slug: "chennai",
    city: "Chennai",
    district: "Chennai & Kanchipuram",
    state: "Tamil Nadu",
    regionType: "IT Corridor & Commercial Division",
    role: "OMR IT Corridor & Commercial Operations Division",
    address: "Sholinganallur & Guindy Industrial Hub, Chennai, Tamil Nadu - 600119",
    postalCode: "600119",
    latitude: 13.0827,
    longitude: 80.2707,
    phone: "+91 90808 63448",
    email: "contact@jsmintegratedservices.com",
    metaTitle: "Security Guard Agency & Facility Management in Chennai",
    metaDescription: "100% EPF/ESIC compliant corporate security, OMR IT park guarding, and mechanized facility management across Chennai, Guindy, and Sriperumbudur.",
    heroHeadline: "Corporate Security & Commercial Facility Management in Chennai",
    heroSubheadline: "Dedicated operational divisions serving IT parks along OMR, industrial zones in Guindy and Sriperumbudur, and premium corporate offices across Chennai.",
    operationalOverview: "Enterprise corporate guarding, digital QR visitor management, and mechanized facility maintenance across OMR tech parks, Guindy industrial estates, and Sriperumbudur automotive plants.",
    operationalBadges: [
      "OMR Tech Corridor",
      "100% EPF & ESIC",
      "2-Hour Metro SLA"
    ],
    keyIndustrialZones: [
      "OMR IT Expressway (Sholinganallur to Siruseri SIPCOT)",
      "Guindy & Ambattur Industrial Estates",
      "Sriperumbudur & Oragadam Automotive Corridors",
      "Mount Road & T. Nagar Commercial Centers"
    ],
    deploymentSectors: [
      "IT / ITeS Tech Parks & Global Capability Centers",
      "Multi-Tenant Grade-A Commercial Towers",
      "Automotive & Electronics Assembly Plants",
      "Gated Residential Communities & Embassies"
    ],
    highIntentKeywords: [
      "Security services in Chennai",
      "Security guard agency OMR Chennai",
      "Corporate security guards Guindy",
      "Contract manpower supplier Chennai",
      "Commercial facility management Chennai",
      "Mechanized housekeeping Chennai",
      "Ex-servicemen security Chennai"
    ],
    sectorBattlecards: [
      {
        sector: "OMR Tech Parks & Global GCCs",
        painPoint: "High employee turnover, unpolished gate security, unverified delivery couriers.",
        jsmSolution: "Bilingual security guards (English + Tamil), digital QR visitor badges, strict badge access turnstiles, 2-hour relief standby.",
        sla: "100% Biometric Turnout Inspection"
      },
      {
        sector: "Automotive Hubs (Sriperumbudur / Oragadam)",
        painPoint: "Assembly shift absenteeism, unauthorized tool removal, contractor labor disputes.",
        jsmSolution: "100% EPF/ESIC statutory indemnified industrial staffing, vehicle search pits, strict RGP/NRGP material gate registers.",
        sla: "Zero Joint Labour Liability Guarantee"
      },
      {
        sector: "Multi-Tenant Commercial Basements",
        painPoint: "Basement oil spills, poor dust control, irregular contractor attendance.",
        jsmSolution: "Mechanized ride-on auto scrubbers, scheduled night cleaning shifts, daily photographic audit logs.",
        sla: "99.2% Mechanized Uptime"
      }
    ],
    responseSla: "2-Hour Standby Relief SLA across Chennai Metro",
    supervisoryModel: "24/7 Field Officers & Electronic Guard Patrol Logs",
    complianceHighlights: [
      "Full EPF/ESIC Monthly ECR Filings Provided with Invoices",
      "Strict Fire Safety & Emergency Evacuation Trained Guards",
      "Mechanized Ride-On Floor Scrubbers for Large Basements",
      "Single-Vendor SLA for Security, Cleaning & Support Staff"
    ],
    localFaqs: [
      {
        question: "Can JSM handle multi-building IT park security in Chennai?",
        answer: "Yes. We manage perimeter access control, visitor badge management, vehicle boom barriers, loading dock scrutiny, and CCTV telemetry for multi-acre commercial developments."
      },
      {
        question: "Do you supply mechanized housekeeping teams in Chennai?",
        answer: "Yes. We deploy automated ride-on scrubber-driers, high-pressure washers, and color-coded sanitization protocols for corporate offices and industrial campuses."
      }
    ]
  },
  {
    slug: "coimbatore",
    city: "Coimbatore",
    district: "Coimbatore",
    state: "Tamil Nadu",
    regionType: "Industrial & Manufacturing Division",
    role: "Industrial Manufacturing & Textile Operations Outpost",
    address: "Peelamedu & SIDCO Industrial Estate, Kurichi, Coimbatore, Tamil Nadu - 641004",
    postalCode: "641004",
    latitude: 11.0168,
    longitude: 76.9558,
    phone: "+91 90808 63448",
    email: "contact@jsmintegratedservices.com",
    metaTitle: "Security Guard Company & Industrial Manpower in Coimbatore",
    metaDescription: "100% EPF/ESIC compliant security guarding, contract factory manpower, and industrial housekeeping in Coimbatore, Peelamedu, and SIDCO Kurichi.",
    heroHeadline: "Industrial Security & Contract Workforce in Coimbatore",
    heroSubheadline: "Supporting Coimbatore's manufacturing, foundry, textile, and engineering enterprises with disciplined physical guarding and 100% compliant contract staffing.",
    operationalOverview: "Disciplined physical guarding, scrap-yard anti-theft controls, and 100% EPF/ESIC compliant manufacturing staffing across SIDCO Kurichi, Peelamedu, and Saravanampatti.",
    operationalBadges: [
      "Foundry & Textile SEZ",
      "Zero Labour Dispute",
      "Night Van Audits"
    ],
    keyIndustrialZones: [
      "SIDCO Industrial Estate, Kurichi",
      "Peelamedu & Ganapathy Engineering Belts",
      "Saravanampatti IT Corridor",
      "Malumichampatti & Pollachi Highway Clusters"
    ],
    deploymentSectors: [
      "Foundries & Precision Machining Units",
      "Textile Mills & Garment Manufacturing Hubs",
      "Automotive Component Manufacturers",
      "Warehousing & Logistics Distribution Centers"
    ],
    highIntentKeywords: [
      "Security guard company Coimbatore",
      "Industrial security Coimbatore",
      "Factory contract labour Coimbatore",
      "SIDCO Kurichi security agency",
      "Manpower supply Coimbatore",
      "Foundry security guards Coimbatore",
      "Housekeeping services Coimbatore"
    ],
    sectorBattlecards: [
      {
        sector: "Foundries & Heavy Fabrication",
        painPoint: "High scrap metal shrinkage, unauthorized night access, worker safety non-compliance.",
        jsmSolution: "Weighbridge gross-tare cross verification, unannounced 2:00 AM supervisor van audits, breathalyzer sobriety tests.",
        sla: "Zero Unchecked Material Dispatch"
      },
      {
        sector: "Textile & Garment Clusters",
        painPoint: "Seasonal production spikes, shift dropout rates, statutory audit notices.",
        jsmSolution: "Vetted assembly line staff with 100% EPF/ESIC challan transparency, rapid 48-hour shift mobilization.",
        sla: "100% Minimum Wage & ECR Compliance"
      }
    ],
    responseSla: "2-Hour Regional Standby Response",
    supervisoryModel: "Area Officers conducting Unannounced Night Van Audits",
    complianceHighlights: [
      "100% Minimum Wages Act & Overtime Compliance",
      "Zero Labor-Dispute Guarantee with Direct Statutory Liability Coverage",
      "Customized Material Gate Pass (RGP/NRGP) Digital Systems",
      "Daily Breathalyzer & Shift Turnout Audits"
    ],
    localFaqs: [
      {
        question: "How does JSM ensure statutory compliance for factory labor in Coimbatore?",
        answer: "We furnish EPF, ESIC, and wage muster challans every single month with our commercial invoices. Clients receive complete statutory indemnity under Contract Labour Act norms."
      },
      {
        question: "Can JSM provide night security guards for scrap and raw material yards in Coimbatore?",
        answer: "Yes. Our guards are equipped with high-beam searchlights, batons, and hourly QR checkpoint scanners, supported by unannounced 2:00 AM supervisor van inspections."
      }
    ]
  },
  {
    slug: "hosur",
    city: "Hosur",
    district: "Krishnagiri",
    state: "Tamil Nadu",
    regionType: "Automotive & Electronics SEZ Division",
    role: "Automotive & Electronics Manufacturing Division",
    address: "SIPCOT Industrial Complex, Phase 1 & 2, Hosur, Tamil Nadu - 635126",
    postalCode: "635126",
    latitude: 12.7409,
    longitude: 77.8253,
    phone: "+91 90808 63448",
    email: "contact@jsmintegratedservices.com",
    metaTitle: "Security Guard Agency & Contract Manpower in Hosur SIPCOT",
    metaDescription: "Enterprise security guarding and compliant assembly line manpower for automotive and electronics plants in Hosur SIPCOT SEZ.",
    heroHeadline: "Security Guarding & Manufacturing Staffing in Hosur",
    heroSubheadline: "Precision industrial security, material movement tracking, and compliant technical workforce for Hosur's high-tech manufacturing corridors.",
    operationalOverview: "Zero-tolerance EV and electronics assembly staffing, component anti-theft frisking, and dispatch bay security across SIPCOT Phase 1 & 2 corridors.",
    operationalBadges: [
      "EV & Auto Ancillary",
      "Cleanroom ESD Protocol",
      "48–72h Mobilization"
    ],
    keyIndustrialZones: [
      "SIPCOT Industrial Complex Phase 1 & 2",
      "Mookandapalli Industrial Corridor",
      "Bagalur EV Manufacturing Belt",
      "Zuzuvadi & Thally Road Hubs"
    ],
    deploymentSectors: [
      "Electric Vehicle (EV) & Auto Ancillary Plants",
      "Precision Electronics & Hardware Assembly",
      "Cold Chain & FMCG Logistics Warehouses",
      "Pharmaceutical Manufacturing Facilities"
    ],
    highIntentKeywords: [
      "Security guard agency in Hosur",
      "SIPCOT Hosur industrial security",
      "Automotive plant manpower Hosur",
      "Factory security guards Hosur",
      "Contract labour supplier Hosur",
      "Electronics SEZ security Hosur"
    ],
    sectorBattlecards: [
      {
        sector: "EV & Automotive Ancillary Plants",
        painPoint: "High-value battery pack theft, dispatch dock delays, contractor statutory non-compliance.",
        jsmSolution: "Security personnel equipped with metal detectors, strict dispatch bay seals, transparent monthly EPF/ESIC remittance.",
        sla: "100% Material Dispatch Reconciliation"
      },
      {
        sector: "Precision Electronics & Cleanrooms",
        painPoint: "ESD contamination, micro-component theft, unsanitized cleanroom floors.",
        jsmSolution: "ESD-trained housekeeping marshals, cleanroom microfiber protocols, thorough shift-end frisking.",
        sla: "Zero Contamination Breach"
      }
    ],
    responseSla: "2-Hour Emergency Standby Response",
    supervisoryModel: "Industrial Security Marshals & Digital Patrol Checkpoints",
    complianceHighlights: [
      "Strict Non-Disclosure & Anti-Theft Protection Protocols",
      "Comprehensive ESD/Cleanroom Trained Housekeeping Marshals",
      "EPF/ESIC Statutory Remittance Guarantee",
      "Rapid Mobilization within 48 to 72 Hours"
    ],
    localFaqs: [
      {
        question: "Do you supply trained workforce for EV assembly lines in Hosur?",
        answer: "Yes. We source and deploy line-trained operators, quality inspectors, and packaging staff with full EPF/ESIC statutory documentation."
      }
    ]
  },
  {
    slug: "salem",
    city: "Salem",
    district: "Salem",
    state: "Tamil Nadu",
    regionType: "Fabrication & Heavy Industry Division",
    role: "Heavy Engineering & Mineral Processing Division",
    address: "Steel Plant Road & Omalur Industrial Sector, Salem, Tamil Nadu - 636013",
    postalCode: "636013",
    latitude: 11.6643,
    longitude: 78.1460,
    phone: "+91 90808 63448",
    email: "contact@jsmintegratedservices.com",
    metaTitle: "Security Guards & Contract Labour Supplier in Salem",
    metaDescription: "100% EPF/ESIC compliant security guarding and industrial contract labor for steel plants, chemical processing, and fabrication units in Salem.",
    heroHeadline: "Industrial Guarding & Contract Labor Solutions in Salem",
    heroSubheadline: "Protecting Salem's heavy engineering, steel fabrication, and mineral processing assets with veteran-led discipline and compliant manpower.",
    operationalOverview: "High-vigilance perimeter security, weighbridge gross-tare logging, and compliant industrial staffing for steel fabrication and chemical plants across the Steel Plant Road belt.",
    operationalBadges: [
      "Heavy Steel Fabrication",
      "Weighbridge Controls",
      "100% PPE Compliance"
    ],
    keyIndustrialZones: [
      "Steel Plant Road Corridor",
      "Omalur Industrial Belt",
      "Magnesite & Mineral Processing Enclaves",
      "Karuppur & Shevapet Commercial Markets"
    ],
    deploymentSectors: [
      "Steel & Metal Fabrication Plants",
      "Chemical & Mineral Processing Units",
      "Sago & Agro-Food Processing Factories",
      "Educational Campuses & Hospitals"
    ],
    highIntentKeywords: [
      "Security guards in Salem",
      "Industrial security agency Salem",
      "Steel plant security Salem",
      "Contract manpower Salem",
      "Heavy engineering security contractors Salem",
      "Factory housekeeping Salem"
    ],
    sectorBattlecards: [
      {
        sector: "Steel & Heavy Metal Fabrication",
        painPoint: "High scrap leakage, hazardous yard trespassing, night guard negligence.",
        jsmSolution: "Physical perimeter patrols, mandatory PPE compliance checks at gate, 2:00 AM supervisor van audits.",
        sla: "100% Safety Compliance at Ingress"
      }
    ],
    responseSla: "2-Hour Relief SLA",
    supervisoryModel: "Ex-Servicemen Field Officers & Night Patrols",
    complianceHighlights: [
      "Mandatory Safety PPE Compliance for All Deployed Staff",
      "100% EPF/ESIC Statutory Verification",
      "Rigorous 5-Day Pre-Deployment Training",
      "Direct Founder & Operations Leadership Contact"
    ],
    localFaqs: [
      {
        question: "Can JSM handle heavy industry perimeter security in Salem?",
        answer: "Yes. We deploy guards trained in large-scale boundary patrolling, weighbridge verification, and scrap theft deterrence."
      }
    ]
  },
  {
    slug: "erode",
    city: "Erode",
    district: "Erode",
    state: "Tamil Nadu",
    regionType: "Textile & Agro-Processing Division",
    role: "Textile SEZ & Processing Operations Division",
    address: "Perundurai SIPCOT & Bhavani Road, Erode, Tamil Nadu - 638052",
    postalCode: "638052",
    latitude: 11.3410,
    longitude: 77.7172,
    phone: "+91 90808 63448",
    email: "contact@jsmintegratedservices.com",
    metaTitle: "Security Guard Agency & Facility Services in Erode SIPCOT",
    metaDescription: "100% EPF/ESIC compliant security guards and contract manpower for textile mills, processing units, and Perundurai SIPCOT in Erode.",
    heroHeadline: "Security & Contract Staffing in Erode & Perundurai",
    heroSubheadline: "Integrated security guarding, warehouse manpower, and commercial facility management across Erode's textile and agricultural processing belts.",
    operationalOverview: "Trained fire-safety wardens, textile mill dispatch guarding, and mechanized floor auto-scrubbing across Perundurai SIPCOT and Bhavani industrial zones.",
    operationalBadges: [
      "Perundurai SIPCOT",
      "Industrial Fire Wardens",
      "Mechanized Scrubbing"
    ],
    keyIndustrialZones: [
      "Perundurai SIPCOT Industrial Complex",
      "Bhavani & Chithode Textile Corridors",
      "Solar & Agro-Produce Trading Hubs",
      "Perundurai Leather & Chemical SEZ"
    ],
    deploymentSectors: [
      "Textile Spinning, Weaving & Processing Units",
      "Agro-Food Logistics & Storage Warehouses",
      "Paper & Packaging Manufacturing Plants",
      "Commercial Shopping Complexes & Hospitals"
    ],
    highIntentKeywords: [
      "Security services in Erode",
      "Perundurai SIPCOT security agency",
      "Textile mill security guards Erode",
      "Industrial manpower supplier Erode",
      "Warehouse labor contractor Erode",
      "Facility management Erode"
    ],
    sectorBattlecards: [
      {
        sector: "Textile Mills & Processing Units",
        painPoint: "Shift absenteeism during festival seasons, fire hazard vigilance, fabric dispatch tracking.",
        jsmSolution: "Trained industrial fire wardens on post, standby reserve force, physical dispatch count audits.",
        sla: "2-Hour Absenteeism Replacement"
      }
    ],
    responseSla: "2-Hour Standby Relief SLA",
    supervisoryModel: "Dedicated Regional Supervisor & Daily Logs",
    complianceHighlights: [
      "100% Statutory Labour Law Compliance",
      "Industrial Mechanized Cleaning Equipment",
      "Trained Fire Wardens on Site",
      "Transparent Monthly Invoicing"
    ],
    localFaqs: [
      {
        question: "Do you provide warehouse loading and unloading manpower in Erode?",
        answer: "Yes, we supply reliable, physical-verified material handling workforce on flexible contract terms."
      }
    ]
  },
  {
    slug: "madurai",
    city: "Madurai",
    district: "Madurai",
    state: "Tamil Nadu",
    regionType: "Southern Regional Hub",
    role: "Southern Regional Operations Division",
    address: "K.K. Nagar & Mattuthavani Sector, Madurai, Tamil Nadu - 625020",
    postalCode: "625020",
    latitude: 9.9252,
    longitude: 78.1198,
    phone: "+91 90808 63448",
    email: "contact@jsmintegratedservices.com",
    metaTitle: "Security Guard Agency & Facility Management in Madurai",
    metaDescription: "100% EPF/ESIC compliant security guarding, hospital facility management, and industrial staffing across Madurai, Kappalur, and Vadipatti.",
    heroHeadline: "Security Guarding & Enterprise Facilities in Madurai",
    heroSubheadline: "Southern Tamil Nadu's trusted partner for disciplined commercial guarding, hospital hygiene protocols, and industrial workforce management.",
    operationalOverview: "Clinical-grade 5-step hospital sanitation, patient casualty crowd marshals, and commercial guarding across Kappalur and Vadipatti industrial enclaves.",
    operationalBadges: [
      "Hospital Hygiene SLA",
      "Casualty Escort Marshals",
      "Surprise Night Audits"
    ],
    keyIndustrialZones: [
      "Kappalur & Sidco Industrial Estate",
      "Vadipatti Agro-Processing Cluster",
      "K.K. Nagar & Mattuthavani Commercial Hubs",
      "Ring Road Logistics & Transport Nodes"
    ],
    deploymentSectors: [
      "Healthcare Networks & Multi-Specialty Hospitals",
      "Automobile Ancillary & Rubber Industries",
      "Higher Educational Campuses & Universities",
      "Commercial Retail Malls & Banking Branches"
    ],
    highIntentKeywords: [
      "Security guard agency in Madurai",
      "Commercial security Madurai",
      "Hospital security services Madurai",
      "Contract labour contractor Madurai",
      "Facility management services Madurai",
      "Kappalur industrial security"
    ],
    sectorBattlecards: [
      {
        sector: "Multi-Specialty Hospitals & Diagnostic Centers",
        painPoint: "Emergency ward disturbances, unauthorized visitor crowding, high biohazard sanitation requirements.",
        jsmSolution: "Trained hospital security marshals, color-coded clinical hygiene routines, automated digital patient queues.",
        sla: "Zero Disruption Casualty Coverage"
      }
    ],
    responseSla: "2-Hour Regional Standby SLA",
    supervisoryModel: "Ex-Servicemen Field Officers & Surprise Night Audits",
    complianceHighlights: [
      "Hospital-Grade Color-Coded Microfiber Cleaning Standards",
      "Tamil Nadu Home Department Licensed Guard Forces",
      "Complete Statutory EPF/ESIC Coverage",
      "24/7 Central Helpline & Direct Escalation"
    ],
    localFaqs: [
      {
        question: "Does JSM provide hospital security and housekeeping in Madurai?",
        answer: "Yes. Our staff is trained in infection control, crowd management at casualty wings, and patient escort protocols."
      }
    ]
  },
  {
    slug: "tirunelveli",
    city: "Tirunelveli",
    district: "Tirunelveli & Tuticorin",
    state: "Tamil Nadu",
    regionType: "Renewable Energy & Infrastructure Unit",
    role: "Renewable Energy & Infrastructure Division",
    address: "Gangaikondan IT Park & Industrial Corridor, Tirunelveli, Tamil Nadu - 627352",
    postalCode: "627352",
    latitude: 8.7139,
    longitude: 77.7567,
    phone: "+91 90808 63448",
    email: "contact@jsmintegratedservices.com",
    metaTitle: "Security Guard Forces & Manpower in Tirunelveli",
    metaDescription: "100% EPF/ESIC compliant security guarding and technical workforce supply for solar parks, wind farms, and Gangaikondan IT SEZ in Tirunelveli.",
    heroHeadline: "Renewable Energy Security & Facility Services in Tirunelveli",
    heroSubheadline: "Protecting solar installations, wind farm substations, and IT infrastructure with ruggedized physical security and compliant manpower.",
    operationalOverview: "Motorized wide-acre perimeter patrols, copper cable anti-theft monitoring, and compliant workforce supply across Gangaikondan IT SEZ and renewable solar/wind installations.",
    operationalBadges: [
      "Solar & Wind Perimeter",
      "Gangaikondan IT SEZ",
      "Motorized Patrols"
    ],
    keyIndustrialZones: [
      "Gangaikondan IT SEZ & SIPCOT",
      "Kayathar & Muppandal Wind/Solar Energy Parks",
      "Palayamkottai Educational Belt",
      "Tuticorin Port Highway Industrial Cluster"
    ],
    deploymentSectors: [
      "Solar & Wind Renewable Energy Plants",
      "IT / Software Facilities in Gangaikondan SEZ",
      "Educational Institutions & Engineering Colleges",
      "Infrastructure & Highway Construction Camps"
    ],
    highIntentKeywords: [
      "Security services in Tirunelveli",
      "Solar farm security Tirunelveli",
      "Gangaikondan IT park security",
      "Industrial manpower Tirunelveli",
      "Windmill perimeter security Tamil Nadu",
      "Ex-servicemen security Tirunelveli"
    ],
    sectorBattlecards: [
      {
        sector: "Solar Farms & Remote Sub-stations",
        painPoint: "Cable theft across sprawling acreage, remote access without cellular connectivity, night intrusions.",
        jsmSolution: "Motorized security patrols, long-range searchlights, two-way radio telemetry, perimeter check logs.",
        sla: "Zero Copper/Cable Loss Track Record"
      }
    ],
    responseSla: "2-Hour Standby SLA",
    supervisoryModel: "Motorized Patrol Squads & Solar Perimeter Surveillance",
    complianceHighlights: [
      "Severe Weather & Remote Site Safety Trained Guards",
      "100% EPF/ESIC Remittance with Audit Trail",
      "Direct Communication with Central Command",
      "Zero Incident Track Record"
    ],
    localFaqs: [
      {
        question: "Can JSM handle remote solar farm or wind park security in Tirunelveli?",
        answer: "Yes. We operate motorized perimeter patrols, solar-powered communication radios, and ruggedized guard cabins for multi-megawatt remote installations."
      }
    ]
  }
];
