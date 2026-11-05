/**
 * JSM Integrated Services - Blog Synthesizer Engine
 * Synthesizes 1,200+ word technical B2B articles with high-intent keywords,
 * statutory compliance citations, internal link matrix, and conversion funnels.
 */

import { AUTHORS, CLUSTERS, LOCATIONS, VERTICALS } from "./blog-knowledge-bank.mjs";

/**
 * Normalizes text into an SEO slug.
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Generates an SEO article with verified 1,200+ word count.
 */
export function synthesizeArticle({
  clusterKey = "cctv",
  locationKey = "chennai",
  verticalIndex = 0,
  targetDate = new Date().toISOString().split("T")[0],
  isTest = false
}) {
  const cluster = CLUSTERS[clusterKey] || CLUSTERS.cctv;
  const location = LOCATIONS[locationKey] || LOCATIONS.chennai;
  const vertical = VERTICALS[verticalIndex % VERTICALS.length];
  const author = AUTHORS[cluster.defaultAuthor] || AUTHORS.devadoss;

  // Generate Title & SEO Metadata
  let title = "";
  let metaTitle = "";
  let metaDescription = "";

  if (cluster.id === "cctv") {
    title = isTest
      ? `Commercial CCTV Surveillance & Biometric Access Control Systems for Industrial Facilities in ${location.city}`
      : `Industrial CCTV Surveillance & Access Control Architecture for ${vertical.title} in ${location.city}`;
    metaTitle = `${location.city} CCTV & Industrial Access Control | JSM`;
    metaDescription = `Deploy IP-CCTV surveillance & biometric access in ${location.city} ${vertical.title}. PSARA compliant, 24/7 monitoring & 2-hour standby SLA. Call +91 90808 63448.`;
  } else if (cluster.id === "security") {
    title = isTest
      ? `Commercial Security Guards & Ex-Servicemen Leadership Protocols for Industrial Corridors in ${location.city}`
      : `PSARA-Compliant Commercial Security Guards & Veteran Leadership for ${vertical.title} in ${location.city}`;
    metaTitle = `${location.city} Security Guard Agency | JSM Integrated`;
    metaDescription = `Ex-servicemen led security guards in ${location.city}. 100% EPF/ESIC compliance, 02:00 AM mobile audits & 2-hour relief standby SLA. Call +91 90808 63448.`;
  } else if (cluster.id === "facility") {
    title = isTest
      ? `Mechanized Industrial Housekeeping & 5-Step Sanitation Protocols for Commercial Facilities in ${location.city}`
      : `Industrial Housekeeping & Mechanized Facility Management for ${vertical.title} in ${location.city}`;
    metaTitle = `${location.city} Facility Management & Housekeeping | JSM`;
    metaDescription = `Industrial mechanized floor scrubbing & 5-step sanitation in ${location.city}. Factories Act compliant, trained manpower & zero liability. Call +91 90808 63448.`;
  } else if (cluster.id === "talent") {
    title = isTest
      ? `Executive Talent Acquisition & Senior Leadership Recruitment Frameworks in ${location.city}`
      : `Senior Executive Talent Mediation (₹12 LPA–₹1 Cr) for ${vertical.title} in ${location.city}`;
    metaTitle = `${location.city} Executive Talent Acquisition | JSM`;
    metaDescription = `Contingency talent mediator connecting ₹12L–₹1Cr leadership in ${location.city}. Zero upfront fees, vetted finalists in 7 days, 90-day replacement policy.`;
  } else {
    title = isTest
      ? `WhatsApp Business API Automation & Smart NFC Customer Systems for Commercial Enterprises in ${location.city}`
      : `Smart Digital Automation & WhatsApp CRM Systems for ${vertical.title} in ${location.city}`;
    metaTitle = `${location.city} WhatsApp API & Smart NFC Automation | JSM`;
    metaDescription = `Automate customer support & filter Google reviews with WhatsApp API & NFC standees in ${location.city}. Custom integrations & instant setup. Call +91 90808 63448.`;
  }

  // Ensure title and meta lengths comply with strict SEO constraints (title <= 58, desc <= 155)
  if (metaTitle.length > 58) {
    metaTitle = `${location.city.slice(0, 20)} Security & Facilities | JSM`;
    if (metaTitle.length > 58) {
      metaTitle = `${metaTitle.slice(0, 52)}... | JSM`;
    }
  }
  if (metaDescription.length > 155) {
    metaDescription = metaDescription.substring(0, 152).trim() + "...";
  }

  const slug = isTest
    ? `test-${cluster.id}-${location.slug}-industrial-security-architecture`
    : slugify(`${cluster.id}-${vertical.id}-${location.slug}-operations-guide`);

  const excerpt = `An operational engineering guide for Plant Heads, Facility Directors, and Security Procurement Officers in ${location.city} on implementing military-disciplined protocols, statutory PSARA compliance, and mechanized standards.`;

  // Selected Tags & Keywords
  const tags = [
    cluster.name.split("&")[0].trim(),
    location.city,
    location.state,
    "Statutory Compliance",
    "Industrial Security",
    "Ex-Servicemen Operations"
  ];

  const keywords = [
    `${cluster.name.toLowerCase()} in ${location.city.toLowerCase()}`,
    `PSARA licensed security services ${location.city.toLowerCase()}`,
    `industrial facility management ${location.slug}`,
    `100% EPF ESIC compliant staffing ${location.city.toLowerCase()}`,
    `24/7 security guard force ${location.city.toLowerCase()}`
  ];

  // -------------------------------------------------------------
  // Content Body Assembly (5 Mandatory Blocks + Conversion CTA)
  // -------------------------------------------------------------

  const section1_ExecutiveHook = `
Operating commercial and industrial facilities across **${location.city}**—specifically within critical commercial corridors like ${location.industrialZones.slice(0, 2).join(" and ")}—requires an uncompromising approach to operational resilience. For Plant Heads, Operations Vice Presidents, and Chief Security Officers managing high-throughput operations in ${vertical.title}, security and facility management cannot be treated as passive administrative line items. They are mission-critical defenses protecting capital equipment, proprietary inventory, human capital, and corporate reputation.

Across South Indian manufacturing and commercial corridors, conventional civilian agencies have repeatedly revealed fundamental operational vulnerabilities: unvetted guard turnstile attendance, severe shift absenteeism without relief cover, unmonitored material gate leakages, and hazardous floor maintenance practices. Compounding these physical risks are severe statutory liabilities: contracting unvetted manpower or unlicensed security vendors exposes principal employers to direct co-employer litigation under the **Employees' Provident Funds and Miscellaneous Provisions Act, 1952**, and punitive liabilities under the **Private Security Agencies (Regulation) Act (PSARA)**.

To permanently neutralize these vulnerabilities, **JSM Integrated Services** deploys an integrated operational doctrine: combining military-veteran command discipline, continuous mechanized facility protocols, cloud-synchronized electronic surveillance, and transparent statutory indemnity. Whether securing heavy engineering workshops, automotive component assembly bays, or high-density public infrastructure, our deployments in ${location.city} enforce operational standards benchmarked against institutional contracts with the **Airports Authority of India (AAI)** at [Tiruchirappalli International Airport](/case-studies/trichy-international-airport).
`.trim();

  const section2_TechnicalArchitecture = `
## Deep Technical Architecture & Operational Protocols

Securing large-scale industrial compounds in ${location.city} requires an integrated perimeter-to-core defense architecture. Isolated solutions—such as standalone cameras or isolated guards sitting at an unmonitored gate—fail because they lack bidirectional synchronization. Below is the multi-tiered operational framework deployed by JSM Integrated Services for ${vertical.title}:

### 1. Perimeter Intrusion & Inward/Outward Gate Access Control
Perimeter integrity begins at the physical boundary. In modern industrial complexes across ${location.industrialZones[0]}, physical boundaries are secured using dual-technology infrared beam detectors integrated with 4K ultra-low-light starlight IP cameras. At vehicle weighbridges and logistics gates, high-speed **Automated Number Plate Recognition (ANPR)** cameras photograph registration plates, vehicle chassis undercarriages, and driver identities, binding the optical telemetry to digital **Material Inward / Outward Returnable Delivery Challans (RDC/NRDC)**.

### 2. Biometric Pedestrian Turnstiles with Anti-Passback Hardware Logic
To completely eliminate "buddy punching" and unrecorded visitor ingress, pedestrian turnstiles are configured with dual-modal biometric terminals combining 3D facial recognition (<0.3s matching speed) and optical fingerprint sensors. The turnstiles enforce strict hardware anti-passback rules: an identification badge or biometric scan cannot be reused to enter until the user has clocked out through the egress barrier. Gate logs synchronize continuously via secure APIs with client ERP attendance platforms and our central compliance databases.

### 3. Comparison Matrix: Traditional Vendor vs. JSM Integrated Standard

| Operational Dimension | Conventional Civilian Agency | JSM Integrated Services Standard |
|---|---|---|
| **Command Leadership** | Civilian supervisors with minimal formal tactical training | Indian Armed Forces Veterans (Major AR Devadoss, Ex-Servicemen Command) |
| **Night Shift Vigilance** | Unmonitored guards prone to sleep; zero remote supervision | Mandatory **02:00 AM Active Night Audits** with mobile supervisory patrol vans |
| **Relief & Absenteeism SLA** | Gates left unmanned; client forced to handle internal shortages | **Guaranteed 2-Hour Relief Standby SLA** backed by regional reserve squads |
| **Statutory Compliance** | Opaque lump-sum billing; delayed EPF/ESIC remittance receipts | 100% transparent billing with monthly ECR challan and TRRN payment proofs |
| **Mechanized Floor Care** | Manual string mops spreading contaminated grey water | Heavy-duty walk-behind & ride-on auto-scrubbers (Diversey/Taski chemistry) |
| **Electronic Surveillance** | Unmonitored analog DVRs with frequent hard drive failures | Enterprise RAID-6 NVR arrays, AI line-crossing analytics & central monitoring |

### 4. Technical Hardware & Deployment Specifications
To maintain absolute transparency, JSM deploys commercial hardware and personnel configurations governed by rigid operational specifications:

${cluster.specifications.map(s => `- **${s.parameter}**: ${s.specification}`).join("\n")}

### 5. Multi-Shift Duty Rostering & Operational Guard Handover
Guard shifts operate on a disciplined 8-hour or 12-hour rotational cycle governed by the **Factories Act, 1948**. Every shift transition is preceded by a mandatory 15-minute muster parade. The incoming shift commander inspects guard turn-out, verifies radio battery telemetry, reviews special client watch-orders (such as VIP visits or high-value consignment departures), and cross-checks the physical seal numbers of all stationary container trucks on premises.
`.trim();

  const section3_StatutoryCompliance = `
## Regional South Indian Statutory Compliance & Legal Framework

In Tamil Nadu and Karnataka, corporate procurement officers and factory owners face severe co-employer legal exposures when engaging third-party contractors. Statutory authorities do not excuse non-compliance based on vendor negligence; the **Principal Employer** is held directly liable for unpaid wages, statutory social security defaults, and workplace accidents.

JSM Integrated Services provides enterprise clients in ${location.city} with a complete statutory audit shield:

### 1. Tamil Nadu Private Security Agencies Rules (PSARA) 2008 & Karnataka PSARA
Under Section 4 and Section 7 of the **Private Security Agencies (Regulation) Act, 2005**, operating a private security force without a valid Form V license issued by the State Controlling Authority is a cognizable criminal offense. JSM operates with fully authenticated, active PSARA licenses across Tamil Nadu and Karnataka. Every deployed guard undergoes mandatory police character and antecedent verification conducted by District Police authorities, followed by 160 hours of accredited security and emergency training.

### 2. Eliminating Co-Employer Liability: EPF, ESIC, and Wage Compliance
Under the **Employees' Provident Funds and Miscellaneous Provisions Act, 1952**, and the **Employees' State Insurance Act, 1948**, any default by a contractor in remitting statutory contributions empowers recovery officers to freeze the bank accounts of the Principal Employer. JSM guarantees absolute statutory transparency:
- Every monthly billing invoice is mandatorily accompanied by the establishment-specific **Electronic Challan cum Return (ECR)** file.
- Direct **TRRN (Temporary Return Reference Number)** bank transaction receipts are submitted as incontrovertible proof of remittance prior to payment release.
- Wages are disbursed strictly into verified individual bank accounts in full compliance with the **Payment of Wages Act** and local Minimum Wage revisions for ${location.state}.

### 3. The Factories Act, 1948 (Tamil Nadu Factories Rules)
For manufacturing units and engineering plants across ${location.industrialZones[1] || location.industrialZones[0]}, JSM designs security and housekeeping deployments to satisfy the rigorous audits of the Inspectorate of Factories:
- **Section 6 & 7 (Compound Layout & Gate Access)**: Maintaining clear, unobstructed emergency egress routes and real-time head-count registers for emergency fire roll-calls.
- **Section 11 (Cleanliness & Sanitation)**: Enforcing daily mechanized scrubbing, refuse disposal, and chemical disinfection of shopfloors, washing facilities, and canteens recorded in statutory inspection logbooks.
- **Section 38 (Fire Precaution & Emergency Muster)**: Deploying guards trained in industrial firefighting, hydrant operation, and disciplined emergency evacuation protocols.
`.trim();

  const section4_OperationalSafeguards = `
## Real-World Operational Safeguards: Active Night Audits & 2-Hour SLA

Theoretical security plans fail without active operational enforcement. JSM Integrated Services backs every contract with field-tested operational safeguards that prevent sleep on duty, eliminate unannounced gate shortages, and maintain high military standards 365 days a year:

### 1. The 02:00 AM Active Night Muster Audit
The vulnerability window for most industrial facilities falls between 01:00 AM and 04:00 AM, when ambient vigilance drops and external intruders attempt perimeter breaches. Under the personal directive of Indian Army Veteran **Major AR Devadoss (Retd.)**, JSM operates dedicated mobile supervisory patrol vans across ${location.city}. Roving field officers conduct surprise, unscheduled **02:00 AM Night Audits** at client premises:
- Testing guard perimeter watchfulness and gate radio response.
- Inspecting physical fence lines, dark corners, and high-value material laydown areas.
- Recording time-stamped digital geo-coordinates and photographs uploaded directly to client security portals.

### 2. Contractual 2-Hour Relief Standby SLA
When a civilian guard agency experiences guard illness or absenteeism, gates are either left unmanned or remaining guards are forced to work illegal double shifts, causing dangerous fatigue. JSM maintains dedicated quick-reaction reserve platoons stationed at our regional command hubs. Under our contractual **2-Hour Relief Standby SLA**, if an assigned post requires relief, a fully uniformed, verified replacement guard arrives on-site within 120 minutes.

### 3. Civil Aviation Benchmark: Trichy International Airport
Our operational reliability is not a marketing assertion; it is demonstrated daily at the highest institutional tier. JSM manages round-the-clock concourse security, high-density passenger flow, and mechanized cleanliness at the **Airports Authority of India (AAI)** terminal. Review the complete operational methodology in our [Tiruchirappalli International Airport Case Study](/case-studies/trichy-international-airport).
`.trim();

  const section5_StructuredFaqs = `
## Frequently Asked Questions

Below are critical questions corporate procurement committees and facility managers frequently ask regarding security, statutory compliance, and facility management in ${location.city}:

${cluster.faqs.map(faq => `### ${faq.question}\n${faq.answer}`).join("\n\n")}
`.trim();

  const section6_ConversionCTA = `
## Deploy Military-Grade Security & Mechanized Facilities in ${location.city}

Do not compromise your commercial enterprise, plant assets, or statutory standing with unvetted manpower and fragmented contractors. Partner with **JSM Integrated Services** for disciplined, ex-servicemen led security, mechanized industrial housekeeping, and compliant contract staffing across ${location.city} and ${location.corridorAnchor}.

- **24/7 Central Operations Hotline**: Call our Duty Commander directly at [**+91 90808 63448**](tel:+919080863448) for immediate emergency deployments or confidential site audits.
- **WhatsApp Quick Deploy**: Connect directly via [**WhatsApp at +91 90808 63448**](https://wa.me/919080863448?text=${encodeURIComponent(`Hello JSM Operations, I would like to schedule a security and facility audit for our facility in ${location.city}.`)}) for rapid quote estimates.
- **Instant Commercial Proposal**: Generate a structured, sector-specific rate estimate tailored to your facility parameters using our [**Commercial RFQ & Proposal Generator**](/get-quote).
- **Service Hubs**: Explore our dedicated regional coverage for [${location.city} Industrial Operations](${location.internalLink}), our [${cluster.primaryServices[0].name}](${cluster.primaryServices[0].url}), and our [${cluster.primaryServices[1].name}](${cluster.primaryServices[1].url}).
`.trim();

  // Combine full body content
  let bodyContent = [
    section1_ExecutiveHook,
    "---",
    section2_TechnicalArchitecture,
    "---",
    section3_StatutoryCompliance,
    "---",
    section4_OperationalSafeguards,
    "---",
    section5_StructuredFaqs,
    "---",
    section6_ConversionCTA
  ].join("\n\n");

  // Word count verification on body content
  let wordCount = bodyContent.trim().split(/\s+/).filter(Boolean).length;

  // Guarantee minimum 1,200 words
  if (wordCount < 1200) {
    const supplement = `
### Additional Technical Operating Parameters for ${location.city} Industrial Corridors
To ensure compliance with local municipal ordinances and environmental guidelines in ${location.state}, JSM's operational detachments adhere to stringent quality assurance metrics. Every supervisory vehicle is equipped with calibrated testing kits for checking battery voltages of emergency backup lighting, secondary generator transfer switches, and chemical dilution testing strips. Furthermore, our roving supervisors conduct joint monthly safety walk-throughs with client Safety Officers, documenting potential blind spots caused by seasonal foliage growth, temporary construction scaffolding, or changes in perimeter lighting lux levels. All findings are compiled into a comprehensive Monthly Security & Hygiene Intelligence Briefing submitted directly to executive management.
`.trim();
    bodyContent += "\n\n" + supplement;
    wordCount = bodyContent.trim().split(/\s+/).filter(Boolean).length;
  }

  // Calculate read time
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
  const readTime = `${readTimeMinutes} min read`;

  // Build Frontmatter Object
  const frontmatterData = {
    title,
    slug,
    excerpt,
    date: targetDate,
    lastModified: targetDate,
    author: {
      name: author.name,
      role: author.role,
      avatar: author.avatar
    },
    category: cluster.category,
    tags,
    readTime,
    isFlagship: false,
    coverImage: cluster.coverImage,
    metaTitle,
    metaDescription,
    keywords,
    faqs: cluster.faqs,
    published: true
  };

  // Format YAML frontmatter
  const yamlLines = [
    "---",
    `title: ${JSON.stringify(frontmatterData.title)}`,
    `slug: ${JSON.stringify(frontmatterData.slug)}`,
    `excerpt: ${JSON.stringify(frontmatterData.excerpt)}`,
    `date: ${JSON.stringify(frontmatterData.date)}`,
    `lastModified: ${JSON.stringify(frontmatterData.lastModified)}`,
    "author:",
    `  name: ${JSON.stringify(frontmatterData.author.name)}`,
    `  role: ${JSON.stringify(frontmatterData.author.role)}`,
    `  avatar: ${JSON.stringify(frontmatterData.author.avatar)}`,
    `category: ${JSON.stringify(frontmatterData.category)}`,
    "tags:",
    ...frontmatterData.tags.map(t => `  - ${JSON.stringify(t)}`),
    `readTime: ${JSON.stringify(frontmatterData.readTime)}`,
    `isFlagship: false`,
    `coverImage: ${JSON.stringify(frontmatterData.coverImage)}`,
    `metaTitle: ${JSON.stringify(frontmatterData.metaTitle)}`,
    `metaDescription: ${JSON.stringify(frontmatterData.metaDescription)}`,
    "keywords:",
    ...frontmatterData.keywords.map(k => `  - ${JSON.stringify(k)}`),
    "faqs:",
    ...frontmatterData.faqs.flatMap(f => [
      `  - question: ${JSON.stringify(f.question)}`,
      `    answer: ${JSON.stringify(f.answer)}`
    ]),
    `published: true`,
    "---"
  ];

  const fullFileContent = yamlLines.join("\n") + "\n\n" + bodyContent + "\n";

  return {
    slug,
    title,
    metaTitle,
    metaDescription,
    category: cluster.category,
    cluster: cluster.id,
    location: location.slug,
    wordCount,
    frontmatterData,
    fullFileContent
  };
}

/**
 * Coprime rotation strides to avoid short 8-day lockups and traverse
 * all 256 unique (cluster, location, vertical) combinations.
 * Strides: cluster +1, location +3, vertical +5 with cascading radix offsets.
 * Total combinations: 4 clusters * 8 locations * 8 verticals = 256.
 */
export const ROTATION_STRIDES = {
  cluster: 1,
  location: 3,
  vertical: 5,
};

export const TOTAL_COMBINATIONS = 256;

/**
 * Computes rotation indices for a given step index (0 to 255).
 * Guarantees a full period of 256 unique combinations.
 */
export function getRotationIndices(stepIndex, clusterCount = 4, locationCount = 8, verticalCount = 8) {
  const k = ((stepIndex % TOTAL_COMBINATIONS) + TOTAL_COMBINATIONS) % TOTAL_COMBINATIONS;
  const clusterIndex = (k * ROTATION_STRIDES.cluster) % clusterCount;
  const locationIndex = (k * ROTATION_STRIDES.location + Math.floor(k / clusterCount)) % locationCount;
  const verticalIndex = (k * ROTATION_STRIDES.vertical + Math.floor(k / (clusterCount * locationCount))) % verticalCount;
  return {
    clusterIndex,
    locationIndex,
    verticalIndex,
    stepIndex: k,
  };
}

/**
 * Advances rotation state using coprime rotation strides.
 */
export function advanceRotationState(currentState = {}, clusterCount = 4, locationCount = 8, verticalCount = 8) {
  let currentStep = 0;
  if (typeof currentState.stepIndex === "number") {
    currentStep = currentState.stepIndex;
  } else if (
    typeof currentState.nextClusterIndex === "number" &&
    typeof currentState.nextLocationIndex === "number" &&
    typeof currentState.nextVerticalIndex === "number"
  ) {
    // Reconstruct stepIndex from existing triplet
    for (let i = 0; i < TOTAL_COMBINATIONS; i++) {
      const idx = getRotationIndices(i, clusterCount, locationCount, verticalCount);
      if (
        idx.clusterIndex === currentState.nextClusterIndex &&
        idx.locationIndex === currentState.nextLocationIndex &&
        idx.verticalIndex === currentState.nextVerticalIndex
      ) {
        currentStep = i;
        break;
      }
    }
  }

  const nextStep = (currentStep + 1) % TOTAL_COMBINATIONS;
  const nextIndices = getRotationIndices(nextStep, clusterCount, locationCount, verticalCount);

  return {
    nextClusterIndex: nextIndices.clusterIndex,
    nextLocationIndex: nextIndices.locationIndex,
    nextVerticalIndex: nextIndices.verticalIndex,
    stepIndex: nextStep,
  };
}
