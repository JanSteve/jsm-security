export interface KnowledgeArticle {
  slug: string;
  title: string;
  category: "PSARA Regulation" | "Statutory Compliance" | "DGR Guidelines" | "Vendor Auditing";
  categoryBadge: string;
  readTime: string;
  publishDate: string;
  lastUpdated: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  keyTakeaways: string[];
  content: string[];
  actionChecklist?: string[];
}

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    slug: "psara-license-renewal-tamil-nadu-2026",
    title: "PSARA License Renewal Process in Tamil Nadu (2026 Regulatory Guide)",
    category: "PSARA Regulation",
    categoryBadge: "PSARA 2005 Norms",
    readTime: "6 min read",
    publishDate: "2026-03-01",
    lastUpdated: "2026-03-24",
    author: {
      name: "Major AR Devadoss (Army-Veteran)",
      role: "Head of Operations & Audit, JSM Integrated Services"
    },
    metaTitle: "PSARA License Renewal Process Tamil Nadu 2026",
    metaDescription: "Step-by-step guide to PSARA license renewal in Tamil Nadu. Timeline, controlling authority procedures, police verification, and training compliance.",
    excerpt: "The Private Security Agencies Regulation Act (PSARA 2005) mandates that private security licenses in Tamil Nadu be renewed every 5 years. Here is the operational protocol for maintaining continuous compliance without site disruption.",
    keyTakeaways: [
      "Applications for renewal must be submitted at least 45 to 90 days before expiration to the Controlling Authority, Home Department, Government of Tamil Nadu.",
      "Mandatory fresh character & antecedent verification of all directors/proprietor and guard training institute affiliation agreements.",
      "Operating with an expired PSARA license exposes the principal employer to legal sanctions under Section 20 of PSARA 2005."
    ],
    content: [
      "The Private Security Agencies (Regulation) Act, 2005, enforced by the Controlling Authority under the Home Department of the Government of Tamil Nadu, establishes mandatory standards for all private security service providers operating in the state.",
      "Under Section 7 of the Act, a license issued to an agency is valid for five years from the date of issuance unless cancelled earlier. To maintain uninterrupted operational legality, agencies must submit their renewal petitions strictly within the prescribed statutory window.",
      "Key documents required for the 5-year renewal cycle include: updated Form-V application, valid MoUs with recognized Security Training Institutes, updated police verification reports for all controlling executives, EPF and ESIC registration compliance certificates, and the requisite government treasury challan.",
      "For commercial clients and facility managers, verifying that your security partner holds an active, unexpired PSARA license is a core fiduciary requirement. Contracts executed with un-licensed agencies place the principal employer under statutory vulnerability in case of security or criminal incidents on site."
    ],
    actionChecklist: [
      "Verify Controlling Authority license number and valid expiry date.",
      "Inspect Form-V renewal filing acknowledgment if within 90 days of expiration.",
      "Confirm agency's empanelled training institute tie-up certificate.",
      "Ensure all deployed guards carry valid PSARA photo identity cards."
    ]
  },
  {
    slug: "epf-esic-statutory-obligations-security-manpower",
    title: "EPF & ESIC Statutory Obligations When Outsourcing Security & Manpower",
    category: "Statutory Compliance",
    categoryBadge: "Labour Law & EPF/ESIC",
    readTime: "7 min read",
    publishDate: "2026-02-15",
    lastUpdated: "2026-03-20",
    author: {
      name: "Sweety J",
      role: "Proprietor & Managing Director, JSM Integrated Services"
    },
    metaTitle: "EPF & ESIC Statutory Compliance for Outsourced Manpower",
    metaDescription: "Understand Principal Employer liability under EPF & ESIC Acts. How to verify ECR challans, wage registers, and eliminate joint liability.",
    excerpt: "Under Indian labour jurisprudence, the Principal Employer bears joint liability for statutory defaults committed by contract staffing agencies. Learn how to structure watertight compliance verification.",
    keyTakeaways: [
      "Under Section 8A of the Employees' Provident Funds Act, the Principal Employer is legally empowered and obligated to recover contractor PF defaults.",
      "Monthly invoices must be matched against Electronic Challan Receipts (ECRs) showing individual member Universal Account Numbers (UANs).",
      "Contract clauses must mandate 100% minimum wages, overtime registers, and direct bank account salary disbursements."
    ],
    content: [
      "When outsourcing security guards, facility housekeeping, or assembly line factory workers, organizations often mistakenly assume that all legal liabilities rest solely with the contractor. Under the Contract Labour (Regulation and Abolition) Act, 1970, and the EPF & MP Act, 1952, the Principal Employer remains co-responsible for unpaid statutory contributions.",
      "A compliant vendor must provide three non-negotiable documents alongside each monthly billing cycle: (1) The bank confirmation of salary disbursement directly into employee accounts, (2) The EPF Monthly Electronic Challan Cum Return (ECR) receipt with employee-wise breakdown, and (3) The ESIC monthly contribution receipt.",
      "At JSM Integrated Services, we operate a 100% digital compliance governance model. Every deployed employee has an active UAN and ESIC IP number, and verified monthly challans are submitted transparently with our commercial invoices."
    ],
    actionChecklist: [
      "Demand monthly ECR (Electronic Challan Return) matched to the site muster roll.",
      "Verify that EPF contributions are deposited before the 15th of each calendar month.",
      "Check ESIC identity cards for all on-site personnel.",
      "Include explicit statutory indemnity clauses in vendor agreements."
    ]
  },
  {
    slug: "dgr-empanelment-ex-servicemen-security-guidelines",
    title: "DGR Empanelment & Ex-Servicemen Security Guidelines Explained",
    category: "DGR Guidelines",
    categoryBadge: "Defense Resettlement",
    readTime: "5 min read",
    publishDate: "2026-01-20",
    lastUpdated: "2026-03-10",
    author: {
      name: "Major AR Devadoss (Army-Veteran)",
      role: "Head of Operations & Audit, JSM Integrated Services"
    },
    metaTitle: "DGR Security Guidelines & ESM Ratios Explained",
    metaDescription: "Overview of Directorate General Resettlement (DGR) guidelines, Ex-Servicemen wage structures, and supervisory ratios for public and private enterprises.",
    excerpt: "Directorate General Resettlement (DGR), Ministry of Defence, establishes strict operational frameworks for employing Ex-Servicemen (ESM) in enterprise security. Here is how DGR wage norms and supervisory structures work.",
    keyTakeaways: [
      "DGR security structures enforce high discipline standards with verified military discharge records (Ex-JCOs / NCOs).",
      "DGR guidelines specify structured wage structures indexed to consumer price indices with mandatory gratuity and uniform allowances.",
      "ESM supervisory units provide unmatched turnout, command integrity, and anti-pilferage vigilance in heavy industry."
    ],
    content: [
      "The Directorate General Resettlement (DGR), under the Department of Ex-Servicemen Welfare (Ministry of Defence), formulates guidelines to rehabilitate defense veterans while supplying disciplined security forces to public and private sector enterprises across India.",
      "Under DGR norms, security guard forces must maintain high ESM composition ratios, supervised by Ex-Junior Commissioned Officers (JCOs) or Non-Commissioned Officers (NCOs) who bring decades of military discipline, gate perimeter vigilance, and anti-sabotage training.",
      "JSM Integrated Services integrates military veterans directly into our operational hierarchy. Directed by decorated veterans, our supervisory corps applies defense-grade standard operating procedures to commercial, aviation, and industrial premises."
    ],
    actionChecklist: [
      "Verify military discharge books and ESM identity credentials for supervisory officers.",
      "Ensure DGR-aligned wage structures and allowances are strictly honored.",
      "Establish military-grade shift muster and pre-turnout briefing routines.",
      "Institute radio check protocols across wide-perimeter installations."
    ]
  },
  {
    slug: "how-to-audit-your-security-facility-vendor-checklist",
    title: "How to Audit Your Current Security & Facility Vendor (10-Point Checklist)",
    category: "Vendor Auditing",
    categoryBadge: "Operations Audit",
    readTime: "6 min read",
    publishDate: "2026-03-05",
    lastUpdated: "2026-03-24",
    author: {
      name: "R Jan Steve Daniel",
      role: "Chief Technical Officer, JSM Integrated Services"
    },
    metaTitle: "10-Point Security & Facility Vendor Audit Checklist",
    metaDescription: "Actionable 10-point audit checklist for corporate and facility leaders. Evaluate guard turnout, 2:00 AM vigilance, ECR challans, and relief SLAs.",
    excerpt: "Most facility managers discover vendor gaps only after a major theft, absenteeism crisis, or labour department inspection. Use this practical 10-point audit framework to evaluate your current service provider.",
    keyTakeaways: [
      "Conduct unannounced 2:00 AM spot-checks to inspect perimeter vigilance, sleeping on duty, and radio telemetry.",
      "Match daily physical gate registers against monthly billing hours to identify ghost billing or double-shift fatigue.",
      "Verify emergency relief response times — a reliable agency must guarantee replacements within 2 hours."
    ],
    content: [
      "A physical security and facility management contract is only as strong as its daily execution. Over time, without structured audits, vendor standards often degrade: guards work double shifts without rest, uniforms deteriorate, attendance is inflated, and statutory filings fall behind.",
      "To safeguard your premises and ensure full value for your operational expenditure, facility managers should conduct structured quarterly audits evaluating three core dimensions: (1) Turnout & Physical Vigilance, (2) Statutory & Legal Indemnity, and (3) Relief SLAs & Escalation Responsiveness.",
      "At JSM Integrated Services, our Head of Operations conducts routine unannounced mobile van audits across all client sites to guarantee 100% compliance with client SOPs."
    ],
    actionChecklist: [
      "1. Check PSARA license validity and TN Home Department authorization.",
      "2. Perform unannounced 2:00 AM physical security checks at all access gates.",
      "3. Inspect daily breathalyzer testing logs and guard turnout.",
      "4. Audit monthly EPF/ESIC challans matched directly to site UANs.",
      "5. Test the vendor's emergency relief SLA by requesting an unscheduled replacement.",
      "6. Verify mechanized cleaning equipment maintenance and chemical dilution ratios.",
      "7. Review visitor gate-pass records and material returnable/non-returnable registers.",
      "8. Audit fire safety awareness and emergency evacuation readiness among guards.",
      "9. Check salary disbursement dates (must be on or before the 7th/10th of every month).",
      "10. Verify direct founder or senior operational escalation contact accessibility."
    ]
  }
];
