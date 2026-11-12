#!/usr/bin/env node

/**
 * JSM Integrated Services — Lead Magnet PDF Generator
 * Requirement R2: Dynamic PDF Lead Magnet Generation
 *
 * Generates two high-value executive B2B lead magnets:
 * 1. "The 2026 ATS-Bypass & Hidden Job Market Playbook" (Job Seeker / Candidate Focus)
 * 2. "The Founder's Guide to Zero-Retainer Contingency Hiring & Eliminating Day-1 Ghosting" (Employer / Founder Focus)
 *
 * Specifications:
 * - Engine: @playwright/test with Google Chrome (/Applications/Google Chrome.app/Contents/MacOS/Google Chrome)
 * - Format: Vector A4 PDF (%PDF-1.4 standard), printBackground: true
 * - Design System: Warm Editorial palette (#F6F3EE, #0E1116, #FFFFFF, #1F4E5F, #C8553D, #6B7280)
 * - Typography: Fraunces (headings), Inter (body, tables, labels), tabular numbers
 * - Strict Invariants: Zero prohibited hype words, zero purple gradients, zero neon glows, zero raw emojis
 * - Tags: Preserves [CONFIRM: fee %] and [CONFIRM: role band]
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT_DIR, 'public', 'lead-magnets');

const CHROME_PATH = process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

// Ensure output directory exists
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

/**
 * Common Warm Editorial CSS styles embedded into both documents
 */
const COMMON_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');

  @page {
    size: A4;
    margin: 12mm 14mm 14mm 14mm;
    @bottom-center {
      content: counter(page);
    }
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    background-color: #F6F3EE;
    color: #0E1116;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 11pt;
    line-height: 1.5;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page {
    page-break-after: always;
    min-height: 270mm;
    position: relative;
    padding-bottom: 12mm;
  }

  .page:last-child {
    page-break-after: avoid;
  }

  /* Running Header */
  .running-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(14, 17, 22, 0.12);
    padding-bottom: 5mm;
    margin-bottom: 7mm;
    font-size: 8pt;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #6B7280;
    font-weight: 600;
  }

  .running-header .brand {
    color: #1F4E5F;
    font-weight: 700;
  }

  /* Running Footer */
  .running-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(14, 17, 22, 0.12);
    padding-top: 4mm;
    font-size: 8pt;
    color: #6B7280;
  }

  .running-footer .contact-info {
    font-weight: 500;
  }

  /* Typography */
  h1, h2, h3, h4 {
    font-family: 'Fraunces', Georgia, serif;
    font-weight: 600;
    color: #0E1116;
    line-height: 1.18;
    letter-spacing: -0.02em;
  }

  h1 {
    font-size: 26pt;
    margin-bottom: 4mm;
    color: #0E1116;
  }

  h2 {
    font-size: 16pt;
    margin-bottom: 3.5mm;
    color: #1F4E5F;
    border-left: 3px solid #C8553D;
    padding-left: 3mm;
  }

  h3 {
    font-size: 13pt;
    margin-bottom: 2.5mm;
    color: #0E1116;
  }

  p {
    margin-bottom: 3mm;
    color: #0E1116;
  }

  p.lead {
    font-size: 12pt;
    color: #374151;
    line-height: 1.55;
    margin-bottom: 5mm;
  }

  .text-muted {
    color: #6B7280;
  }

  .text-terracotta {
    color: #C8553D;
    font-weight: 700;
  }

  .text-teal {
    color: #1F4E5F;
    font-weight: 700;
  }

  .tabular-nums {
    font-variant-numeric: tabular-nums;
  }

  /* Cards & Containers */
  .card {
    background-color: #FFFFFF;
    border: 1px solid rgba(14, 17, 22, 0.12);
    border-radius: 6px;
    padding: 5mm 6mm;
    margin-bottom: 5mm;
  }

  .card-highlight {
    background-color: #FFFFFF;
    border: 1px solid rgba(31, 78, 95, 0.25);
    border-left: 4px solid #1F4E5F;
    border-radius: 6px;
    padding: 5mm 6mm;
    margin-bottom: 5mm;
  }

  .card-alert {
    background-color: #FFFFFF;
    border: 1px solid rgba(200, 85, 61, 0.25);
    border-left: 4px solid #C8553D;
    border-radius: 6px;
    padding: 5mm 6mm;
    margin-bottom: 5mm;
  }

  /* Grid Layouts */
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5mm;
    margin-bottom: 5mm;
  }

  .grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 4mm;
    margin-bottom: 5mm;
  }

  /* Badges & Pills */
  .badge {
    display: inline-block;
    padding: 1.5mm 3mm;
    border-radius: 4px;
    font-size: 7.5pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 2mm;
  }

  .badge-teal {
    background-color: #1F4E5F;
    color: #FFFFFF;
  }

  .badge-terracotta {
    background-color: #C8553D;
    color: #FFFFFF;
  }

  .badge-outline {
    background-color: transparent;
    border: 1px solid #1F4E5F;
    color: #1F4E5F;
  }

  .badge-tag {
    background-color: #EDE8DF;
    color: #0E1116;
    border: 1px solid rgba(14, 17, 22, 0.15);
    font-family: 'Inter', monospace;
    font-size: 7.5pt;
    font-weight: 600;
  }

  /* Tables */
  table.data-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 5mm;
    font-size: 9pt;
    background-color: #FFFFFF;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid rgba(14, 17, 22, 0.12);
  }

  table.data-table th {
    background-color: #1F4E5F;
    color: #FFFFFF;
    text-align: left;
    padding: 3mm 4mm;
    font-weight: 600;
    font-size: 8.5pt;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  table.data-table td {
    padding: 3mm 4mm;
    border-bottom: 1px solid rgba(14, 17, 22, 0.08);
    color: #0E1116;
    vertical-align: top;
  }

  table.data-table tr:last-child td {
    border-bottom: none;
  }

  table.data-table tr:nth-child(even) td {
    background-color: #FAFAF7;
  }

  /* Metric Highlights */
  .metric-box {
    text-align: center;
    padding: 4mm 3mm;
    background-color: #FFFFFF;
    border: 1px solid rgba(14, 17, 22, 0.12);
    border-radius: 6px;
  }

  .metric-number {
    font-family: 'Fraunces', Georgia, serif;
    font-size: 20pt;
    font-weight: 700;
    color: #C8553D;
    line-height: 1.1;
    margin-bottom: 1.5mm;
    font-variant-numeric: tabular-nums;
  }

  .metric-label {
    font-size: 8pt;
    color: #6B7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
  }

  /* Templates & Code Blocks */
  .template-box {
    background-color: #FFFFFF;
    border: 1px solid rgba(14, 17, 22, 0.15);
    border-radius: 6px;
    padding: 4.5mm 5mm;
    margin-bottom: 4.5mm;
    font-size: 9.5pt;
  }

  .template-box .meta-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(14, 17, 22, 0.08);
    padding-bottom: 2mm;
    margin-bottom: 3mm;
    font-size: 8pt;
  }

  .template-box .subject-line {
    font-weight: 600;
    color: #1F4E5F;
    margin-bottom: 2.5mm;
    padding: 1.5mm 2.5mm;
    background-color: #F6F3EE;
    border-radius: 4px;
    font-size: 9pt;
  }

  .template-box .body-text {
    line-height: 1.55;
    color: #1F2937;
    white-space: pre-line;
  }

  /* Checklist items */
  .checklist {
    list-style: none;
    margin-bottom: 4mm;
  }

  .checklist li {
    position: relative;
    padding-left: 6mm;
    margin-bottom: 2.5mm;
    font-size: 9.5pt;
    line-height: 1.45;
  }

  .checklist li::before {
    content: "[CHECK]";
    position: absolute;
    left: 0;
    color: #1F4E5F;
    font-weight: 700;
    font-size: 7.5pt;
    letter-spacing: 0.02em;
  }

  /* Verification Footer Block */
  .contact-card {
    background-color: #1F4E5F;
    color: #FFFFFF;
    border-radius: 6px;
    padding: 5mm 6mm;
    margin-top: 4mm;
  }

  .contact-card h3 {
    color: #FFFFFF;
    margin-bottom: 2mm;
    font-size: 13pt;
  }

  .contact-card p {
    color: #EDE8DF;
    font-size: 9pt;
    margin-bottom: 2mm;
  }

  .contact-card .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3mm;
    font-size: 8.5pt;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding-top: 3mm;
    margin-top: 3mm;
  }

  .contact-card .contact-grid span {
    color: #FFFFFF;
    font-weight: 600;
  }
`;

/**
 * HTML content for Lead Magnet 1:
 * "The 2026 ATS-Bypass & Hidden Job Market Playbook"
 */
function getJobSeekerHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The 2026 ATS-Bypass & Hidden Job Market Playbook — JSM Integrated Services</title>
  <style>${COMMON_CSS}</style>
</head>
<body>

  <!-- ================= PAGE 1 ================= -->
  <div class="page">
    <div class="running-header">
      <span class="brand">JSM Integrated Services</span>
      <span>Executive Career Mediation • Confidential Candidate Series</span>
    </div>

    <div style="margin-top: 4mm; margin-bottom: 6mm;">
      <span class="badge badge-teal">Confidential Brief • 2026 Edition</span>
      <h1>The 2026 ATS-Bypass &amp; Hidden Job Market Playbook</h1>
      <p class="lead">Direct Founder Outreach Protocols, 6-State Compensation Benchmarks, and Precision Resume Calibration for Senior Leaders (₹12 LPA to ₹1 Cr).</p>
    </div>

    <div class="grid-3">
      <div class="metric-box">
        <div class="metric-number">75%+</div>
        <div class="metric-label">Resumes Screened Out by ATS Bots</div>
      </div>
      <div class="metric-box">
        <div class="metric-number">80%</div>
        <div class="metric-label">Executive Roles Filled Off-Market</div>
      </div>
      <div class="metric-box">
        <div class="metric-number">₹0</div>
        <div class="metric-label">Candidate Fee (100% Free Forever)</div>
      </div>
    </div>

    <h2>1. The Breakdown of Automated Job Boards in 2026</h2>
    <p>Senior professionals with 8 to 20 years of demonstrable operational achievements routinely experience radio silence on public job portals. In 2026, applicant tracking systems (ATS) use crude keyword filters that reward keyword-stuffed templates while rejecting seasoned leaders with nuanced plant management, P&amp;L turnaround, and cross-functional engineering experience.</p>
    
    <div class="card-highlight">
      <h3>The Three Realities of Executive Hiring</h3>
      <p style="margin-bottom: 2mm;"><strong>1. High-Stakes Mandates Are Never Public:</strong> Business owners and boards do not broadcast leadership vacancies (₹12 LPA to ₹1 Cr <span class="badge-tag">[CONFIRM: role band]</span>) to competitors, vendors, or current teams. Over 80% of executive positions are mediated discretely.</p>
      <p style="margin-bottom: 2mm;"><strong>2. ATS Bots Parse for Keywords, Not Accomplishments:</strong> Automated scrapers prioritize arbitrary word density over operational metrics such as scrap rate reductions, OEE enhancements, and working capital savings.</p>
      <p style="margin-bottom: 0;"><strong>3. Direct Mediator Outreach Wins:</strong> Promoters and Vice Presidents respond to concise, metric-backed business proposals that address their active throughput bottlenecks.</p>
    </div>

    <h2>2. The Confidential Human Mediation Protocol</h2>
    <p>JSM Integrated Services bridges senior candidates directly to Managing Directors, Promoters, and Chief Executive Officers across Tamil Nadu, Karnataka, Maharashtra, Delhi NCR, Gujarat, and Madhya Pradesh. Our representation operates under strict principles:</p>
    
    <div class="grid-2">
      <div class="card">
        <h3>100% Blind Confidentiality</h3>
        <p class="text-muted" style="font-size: 9pt;">Your identity, current employer, and sensitive achievements remain shielded behind blinded dossiers until mutual interest is formally confirmed by the hiring promoter.</p>
      </div>
      <div class="card">
        <h3>Zero Candidate Fees Forever</h3>
        <p class="text-muted" style="font-size: 9pt;">Candidates never pay for representation, dossier packaging, or placement mediation. JSM is engaged strictly on an employer contingency model.</p>
      </div>
    </div>

    <div class="running-footer">
      <span class="contact-info">JSM Integrated Services • Operational Desk: +91 90808 63448</span>
      <span>Page 1 of 4</span>
    </div>
  </div>

  <!-- ================= PAGE 2 ================= -->
  <div class="page">
    <div class="running-header">
      <span class="brand">JSM Integrated Services</span>
      <span>Direct Founder Outreach Protocols • Under 120 Words</span>
    </div>

    <h2>3. Direct Founder Outreach Templates</h2>
    <p>Promoters and senior executives do not read lengthy cover letters. These three tested email and InMail frameworks are calibrated for maximum response: concise, metric-driven, and strictly under 120 words.</p>

    <!-- Template 1 -->
    <div class="template-box">
      <div class="meta-row">
        <span><strong style="color: #1F4E5F;">[TEMPLATE 1: PROMOTER &amp; MANAGING DIRECTOR OUTREACH]</strong></span>
        <span class="badge-tag">Word Count: 91 words</span>
      </div>
      <div class="subject-line">Subject: Operational stability and plant scrap reduction for [Target Company]</div>
      <div class="body-text">Dear [Promoter Name],

I noticed [Target Company] is expanding production lines across [City/State]. In my previous role directing plant operations at [Previous Facility], I reduced line scrap rates by 34% and stabilized shift turnaround to 98.6% on-time delivery without expanding headcount.

I understand how critical line continuity is at this operating scale. I am currently evaluating confidential leadership transitions in [State] and would appreciate 10 minutes to discuss where your current throughput bottlenecks lie.

I am available for a brief introductory call this Thursday or Friday.

Regards,
[Your Name] | [Phone Number]</div>
    </div>

    <!-- Template 2 -->
    <div class="template-box">
      <div class="meta-row">
        <span><strong style="color: #1F4E5F;">[TEMPLATE 2: VP OPERATIONS &amp; ENGINEERING OUTREACH]</strong></span>
        <span class="badge-tag">Word Count: 92 words</span>
      </div>
      <div class="subject-line">Subject: Engineering architecture &amp; shift efficiency for [Target Company]</div>
      <div class="body-text">Hi [VP Name],

Following [Target Company]'s recent capacity expansion, I wanted to reach out regarding your technical execution goals. Over the past 6 years leading engineering at [Previous Firm], I reduced unplanned downtime by 41% and managed an annual P&amp;L of [₹XX Cr] across multi-state facilities.

I specialize in aligning cross-functional shop-floor engineering with commercial targets. If your desk is currently addressing capacity constraints or automation bottlenecks, I would welcome a concise, 10-minute technical exchange.

Are you open to a brief call early next week?

Best regards,
[Your Name] | [LinkedIn Profile / Phone]</div>
    </div>

    <!-- Template 3 -->
    <div class="template-box">
      <div class="meta-row">
        <span><strong style="color: #1F4E5F;">[TEMPLATE 3: CONFIDENTIAL MEDIATOR REPRESENTATION BRIEF]</strong></span>
        <span class="badge-tag">Word Count: 96 words</span>
      </div>
      <div class="subject-line">Subject: Confidential executive representation — [Your Domain] leadership mandate</div>
      <div class="body-text">Dear [Executive Desk / Promoter],

I am writing confidentially through JSM Integrated Services regarding executive leadership opportunities within [Target Industry / State]. With 12+ years directing [Operations / P&amp;L / Technology], I have consistently delivered [Key Metric, e.g., ₹18 Cr revenue turnaround or 28% OEE improvement].

My search is strictly discrete: I am exploring organizations with active leadership needs in [Focus State]. JSM Integrated Services represents my candidacy with zero candidate fees and complete confidentiality.

Could you share 10 minutes to review my blind executive dossier and discuss confidential alignment with your upcoming leadership mandates?

Sincerely,
[Candidate Reference ID] via JSM Integrated Services Desk (+91 90808 63448)</div>
    </div>

    <div class="card" style="background-color: #EDE8DF; border: 1px solid rgba(14, 17, 22, 0.15); padding: 3mm 4mm; font-size: 8.5pt;">
      <strong>Invariant Rule for All Outbound Messages:</strong> State one concrete verified achievement, identify the target firm's operational context, and ask for a 10-minute discovery exchange. Never attach an unsolicited resume on initial contact.
    </div>

    <div class="running-footer">
      <span class="contact-info">JSM Integrated Services • Operational Desk: +91 90808 63448</span>
      <span>Page 2 of 4</span>
    </div>
  </div>

  <!-- ================= PAGE 3 ================= -->
  <div class="page">
    <div class="running-header">
      <span class="brand">JSM Integrated Services</span>
      <span>2026 Executive Compensation Benchmarks Across 6 States</span>
    </div>

    <h2>4. 2026 Executive Salary Benchmarks Across 6 States</h2>
    <p>Compensation data compiled across active executive search engagements in key industrial and technology corridors. Figures represent total guaranteed annual CTC with typical variable splits.</p>

    <table class="data-table">
      <thead>
        <tr>
          <th>State &amp; Primary Hubs</th>
          <th>Band 1: Mid-Senior<br><span style="font-weight: 400; font-size: 7.5pt;">₹12L – ₹25L [CONFIRM: role band]</span></th>
          <th>Band 2: Functional Heads<br><span style="font-weight: 400; font-size: 7.5pt;">₹25L – ₹50L [CONFIRM: role band]</span></th>
          <th>Band 3: Executive &amp; CXO<br><span style="font-weight: 400; font-size: 7.5pt;">₹50L – ₹1 Cr [CONFIRM: role band]</span></th>
          <th>Variable Structure</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Tamil Nadu (TN)</strong><br><span class="text-muted" style="font-size: 8pt;">Chennai, Trichy, Coimbatore, Hosur</span></td>
          <td class="tabular-nums">₹14 LPA – ₹22 LPA</td>
          <td class="tabular-nums">₹26 LPA – ₹42 LPA</td>
          <td class="tabular-nums">₹50 LPA – ₹85 LPA</td>
          <td>10% – 15% Performance linked</td>
        </tr>
        <tr>
          <td><strong>Karnataka (KA)</strong><br><span class="text-muted" style="font-size: 8pt;">Bengaluru, Mysuru, Hubbali</span></td>
          <td class="tabular-nums">₹16 LPA – ₹25 LPA</td>
          <td class="tabular-nums">₹28 LPA – ₹48 LPA</td>
          <td class="tabular-nums">₹55 LPA – ₹1 Cr</td>
          <td>15% – 25% + ESOP/LTIP</td>
        </tr>
        <tr>
          <td><strong>Maharashtra (MH)</strong><br><span class="text-muted" style="font-size: 8pt;">Mumbai, Pune, Nashik, Aurangabad</span></td>
          <td class="tabular-nums">₹15 LPA – ₹24 LPA</td>
          <td class="tabular-nums">₹28 LPA – ₹46 LPA</td>
          <td class="tabular-nums">₹52 LPA – ₹95 LPA</td>
          <td>12% – 20% Performance linked</td>
        </tr>
        <tr>
          <td><strong>Delhi NCR (DL)</strong><br><span class="text-muted" style="font-size: 8pt;">Gurgaon, Noida, Okhla, Faridabad</span></td>
          <td class="tabular-nums">₹15 LPA – ₹25 LPA</td>
          <td class="tabular-nums">₹27 LPA – ₹45 LPA</td>
          <td class="tabular-nums">₹50 LPA – ₹90 LPA</td>
          <td>12% – 18% Annual incentive</td>
        </tr>
        <tr>
          <td><strong>Madhya Pradesh (MP)</strong><br><span class="text-muted" style="font-size: 8pt;">Indore, Pithampur, Bhopal, Dewas</span></td>
          <td class="tabular-nums">₹12 LPA – ₹18 LPA</td>
          <td class="tabular-nums">₹22 LPA – ₹35 LPA</td>
          <td class="tabular-nums">₹40 LPA – ₹65 LPA</td>
          <td>8% – 12% Shop-floor productivity</td>
        </tr>
        <tr>
          <td><strong>Gujarat (GJ)</strong><br><span class="text-muted" style="font-size: 8pt;">Ahmedabad, Vadodara, Sanand, Surat</span></td>
          <td class="tabular-nums">₹13 LPA – ₹20 LPA</td>
          <td class="tabular-nums">₹24 LPA – ₹38 LPA</td>
          <td class="tabular-nums">₹45 LPA – ₹75 LPA</td>
          <td>10% – 15% Profitability share</td>
        </tr>
      </tbody>
    </table>

    <div class="grid-2">
      <div class="card">
        <h3>Role Band Profiles &amp; Scopes</h3>
        <p style="font-size: 8.5pt; margin-bottom: 2mm;"><strong>Band 1 (₹12L–₹25L <span class="badge-tag">[CONFIRM: role band]</span>):</strong> 5–9 years experience. Operational plant managers, technical systems architects, senior controllers, and regional sales directors.</p>
        <p style="font-size: 8.5pt; margin-bottom: 2mm;"><strong>Band 2 (₹25L–₹50L <span class="badge-tag">[CONFIRM: role band]</span>):</strong> 10–16 years experience. Vice Presidents of Operations, Chief Technology Officers, General Counsels, and CHROs.</p>
        <p style="font-size: 8.5pt; margin-bottom: 0;"><strong>Band 3 (₹50L–₹1 Cr <span class="badge-tag">[CONFIRM: role band]</span>):</strong> 15+ years P&amp;L ownership. Chief Executive Officers, Chief Operating Officers, and Managing Directors.</p>
      </div>
      <div class="card">
        <h3>Transition &amp; Offer Structuring</h3>
        <p style="font-size: 8.5pt; margin-bottom: 2mm;"><strong>Notice Period Buy-Outs:</strong> Senior candidates with 60–90 day notice periods can negotiate joining settlements when a company has urgent line vacancy drag.</p>
        <p style="font-size: 8.5pt; margin-bottom: 2mm;"><strong>Fixed vs Variable Calibration:</strong> Do not accept higher than 25% variable unless linked to objective OEE, revenue, or EBITDA metrics you directly manage.</p>
        <p style="font-size: 8.5pt; margin-bottom: 0;"><strong>Contingency Model Advantage:</strong> Employers working with JSM pay ₹0 upfront fees, allowing them to allocate budget toward competitive candidate compensation.</p>
      </div>
    </div>

    <div class="running-footer">
      <span class="contact-info">JSM Integrated Services • Operational Desk: +91 90808 63448</span>
      <span>Page 3 of 4</span>
    </div>
  </div>

  <!-- ================= PAGE 4 ================= -->
  <div class="page">
    <div class="running-header">
      <span class="brand">JSM Integrated Services</span>
      <span>Resume Calibration Rubrics &amp; Verification Desk</span>
    </div>

    <h2>5. The Resume Calibration Rubric (3-Second Scan)</h2>
    <p>Executive screeners spend an average of 3 to 5 seconds on initial resume review. Calibrate your profile using these three mandatory structural rules:</p>

    <div class="card-highlight">
      <h3>The 3-Second Visual Architecture</h3>
      <p style="font-size: 9pt; margin-bottom: 2mm;"><strong>Header (Top 25%):</strong> Candidate Name, Verified Contact Info, Target Functional Title, and 3 Verified Operational Anchors (e.g., "14 Years Heavy Engineering Operations • P&amp;L ₹85 Cr • Multi-Plant Leadership TN/MH").</p>
      <p style="font-size: 9pt; margin-bottom: 2mm;"><strong>Strict Single-Column Layout:</strong> Eliminate multi-column tables, visual progress bars, graphic icons, and embedded text boxes that crash ATS parsers and confuse human screeners.</p>
      <p style="font-size: 9pt; margin-bottom: 0;"><strong>Chronological Reverse Order:</strong> Current role listed first with exact months, verified company legal names, and reporting hierarchies.</p>
    </div>

    <div class="card">
      <h3>The XYZ Achievement Formula</h3>
      <p style="font-size: 9pt; margin-bottom: 2mm;">Every bullet point under professional experience must adhere to the formula: <em>"Accomplished [X] as measured by [Y] by doing [Z]"</em>.</p>
      <div style="font-size: 8.5pt; background-color: #F6F3EE; padding: 2.5mm 3.5mm; border-radius: 4px; margin-bottom: 2mm;">
        <strong>[WEAK]:</strong> Responsible for supervising shop-floor production and improving quality standards.<br>
        <strong>[CALIBRATED]:</strong> Reduced automotive stamping scrap from 4.8% to 1.9% within 9 months by standardizing preventive die maintenance routines across 3 operating shifts.
      </div>
      <div style="font-size: 8.5pt; background-color: #F6F3EE; padding: 2.5mm 3.5mm; border-radius: 4px;">
        <strong>[WEAK]:</strong> Managed regional warehouse operations and vendor relationships.<br>
        <strong>[CALIBRATED]:</strong> Cut logistics turnaround time by 32 hours across 6 South Indian distribution hubs by re-negotiating freight SLAs and deploying daily route batching.
      </div>
    </div>

    <h2>6. Zero Buzzwords Checklist</h2>
    <ul class="checklist">
      <li><strong>Delete generic claims:</strong> Remove "dynamic leader", "result-oriented professional", "strategic visionary", "team player", "seasoned executive".</li>
      <li><strong>Replace with hard metrics:</strong> Substitute claims with team size, P&amp;L volume, OEE figures, scrap percentage, and audited delivery accuracy.</li>
      <li><strong>Standard formatting:</strong> Export clean PDF or DOCX using standard system fonts (Inter, Arial, Calibri) at 10pt–11pt body text.</li>
    </ul>

    <!-- Contact & Verification Desk -->
    <div class="contact-card">
      <h3>Confidential Career Mediation Desk</h3>
      <p>Submit your profile directly to our executive search team for discrete matching with verified hiring companies across our 6 focus states. 100% Free forever for candidates.</p>
      <div class="contact-grid">
        <div>
          Executive Desk: <span>+91 90808 63448</span><br>
          Direct Email: <span>contact@jsmintegratedservices.com</span>
        </div>
        <div>
          Registered Office: <span>Door No.: 87, Plot No: 112, Gandhi Nagar,<br>Kottapattu, Tiruchirappalli - 620021, Tamil Nadu</span><br>
          Web Portal: <span>https://www.jsmintegratedservices.com</span>
        </div>
      </div>
    </div>

    <div class="running-footer">
      <span class="contact-info">JSM Integrated Services • Operational Desk: +91 90808 63448</span>
      <span>Page 4 of 4</span>
    </div>
  </div>

</body>
</html>`;
}

/**
 * HTML content for Lead Magnet 2:
 * "The Founder's Guide to Zero-Retainer Contingency Hiring & Eliminating Day-1 Ghosting"
 */
function getEmployerHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Founder's Guide to Zero-Retainer Contingency Hiring — JSM Integrated Services</title>
  <style>${COMMON_CSS}</style>
</head>
<body>

  <!-- ================= PAGE 1 ================= -->
  <div class="page">
    <div class="running-header">
      <span class="brand">JSM Integrated Services</span>
      <span>Executive Search Briefing • Managing Directors &amp; Promoters</span>
    </div>

    <div style="margin-top: 4mm; margin-bottom: 6mm;">
      <span class="badge badge-terracotta">Founder &amp; Promoter Briefing • 2026 Edition</span>
      <h1>The Founder's Guide to Zero-Retainer Contingency Hiring</h1>
      <p class="lead">Candidate Vetting SLAs, Vacancy Cost Financial Drag Models, and the 90-Day Replacement Shield for High-Stakes Leadership Roles (₹12 LPA to ₹1 Cr).</p>
    </div>

    <div class="grid-3">
      <div class="metric-box">
        <div class="metric-number">₹0</div>
        <div class="metric-label">Upfront Retainer Fee</div>
      </div>
      <div class="metric-box">
        <div class="metric-number">7 Days</div>
        <div class="metric-label">3 Blind Finalist Dossiers SLA</div>
      </div>
      <div class="metric-box">
        <div class="metric-number">90 Days</div>
        <div class="metric-label">Candidate Replacement Shield</div>
      </div>
    </div>

    <h2>1. The Retained Executive Search Model Teardown</h2>
    <p>Traditional executive search agencies demand a 33% upfront retainer fee regardless of outcome: one-third paid at contract signing, one-third at shortlist delivery, and the final third upon offer issuance. When a role remains vacant for 60 to 90 days, or when an executive candidate ghosts on Day 1, the employer absorbs 100% of the operational loss.</p>

    <div class="card-alert">
      <h3>The Three Sunk Capital Risks of Retained Search</h3>
      <p style="margin-bottom: 2mm;"><strong>1. Advance Capital Lockup:</strong> Paying ₹3,00,000 to ₹10,00,000 in retainers before reviewing a single vetted candidate dossier creates zero performance urgency for the agency.</p>
      <p style="margin-bottom: 2mm;"><strong>2. 60–90 Day Timeline Drag:</strong> Traditional search agencies run prolonged research phases while your production lines, engineering delivery, or regional sales sit unmanaged.</p>
      <p style="margin-bottom: 0;"><strong>3. No Protection Against Day-1 Ghosting:</strong> If an accepted candidate takes a counter-offer on their joining date, retained agencies retain your advance and restart their lengthy process without financial penalty.</p>
    </div>

    <h2>2. The JSM Zero-Retainer Contingency Model</h2>
    <p>JSM Integrated Services aligns executive search incentives with business reality. We operate on a <strong>100% Success-Based Contingency Placement Model</strong>:</p>

    <div class="grid-2">
      <div class="card-highlight">
        <h3>₹0 Upfront Retainer</h3>
        <p class="text-muted" style="font-size: 9pt;">Zero advance fees. Our recruitment desk initiates candidate mapping, discrete interviews, and dossier preparation at our own financial risk.</p>
      </div>
      <div class="card-highlight">
        <h3>Invoiced Strictly Post-Joining</h3>
        <p class="text-muted" style="font-size: 9pt;">Our standard 8.33% contingency fee <span class="badge-tag">[CONFIRM: fee %]</span> is invoiced only after the executive joins your organization, backed by Net 15/30 credit terms.</p>
      </div>
    </div>

    <div class="running-footer">
      <span class="contact-info">JSM Integrated Services • Operational Desk: +91 90808 63448</span>
      <span>Page 1 of 4</span>
    </div>
  </div>

  <!-- ================= PAGE 2 ================= -->
  <div class="page">
    <div class="running-header">
      <span class="brand">JSM Integrated Services</span>
      <span>Candidate Vetting SLAs • 7-Day Sprint Architecture</span>
    </div>

    <h2>3. Candidate Vetting Service Level Agreements (SLAs)</h2>
    <p>We replace vague recruitment promises with contractual turnaround commitments across every mandate from ₹12 LPA to ₹1 Cr <span class="badge-tag">[CONFIRM: role band]</span>.</p>

    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.5mm;">
        <h3 style="color: #1F4E5F;">SLA 1: 15-Minute Mandate Calibration</h3>
        <span class="badge badge-outline">Turnaround: Day 1</span>
      </div>
      <p style="font-size: 9pt; margin-bottom: 1.5mm;">No lengthy, generic 10-page job descriptions. We conduct a structured 15-minute operational briefing with the Promoter, Plant Head, or HR Director to calibrate:</p>
      <ul class="checklist">
        <li>Exact operational deliverables (scrap reduction, line OEE targets, team restructuring, revenue milestones).</li>
        <li>Hard non-negotiables: specific industry tenure, verified shop-floor credentials, and reporting lines.</li>
        <li>Confidential compensation boundaries (₹12L to ₹1Cr <span class="badge-tag">[CONFIRM: role band]</span>) and notice period buy-out parameters.</li>
      </ul>
    </div>

    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.5mm;">
        <h3 style="color: #1F4E5F;">SLA 2: 7-Day 3-Blind-Dossier Sprint</h3>
        <span class="badge badge-outline">Turnaround: Guaranteed by Day 7</span>
      </div>
      <p style="font-size: 9pt; margin-bottom: 1.5mm;">Within 7 business days of calibration, our desk delivers exactly 3 pre-vetted, interview-ready candidate dossiers:</p>
      <ul class="checklist">
        <li><strong>Blind Confidential Format:</strong> Identifies achievements, team size, and P&amp;L scale while protecting passive candidate discretion.</li>
        <li><strong>Audited Track Record:</strong> Verification of scrap metrics, OEE improvements, and past employer tenure.</li>
        <li><strong>Confirmed Financials:</strong> Verified current compensation, expected fixed/variable CTC, and confirmed notice period.</li>
      </ul>
    </div>

    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.5mm;">
        <h3 style="color: #1F4E5F;">SLA 3: 48-Hour Interview Scheduling Window</h3>
        <span class="badge badge-outline">Turnaround: Within 48 Hours</span>
      </div>
      <p style="font-size: 9pt; margin-bottom: 0;">Once an employer greenlights a dossier, our desk coordinates direct Promoter or MD interviews within 48 hours. Rapid interview momentum eliminates candidate drop-off and prevents counter-offers.</p>
    </div>

    <h2>4. Retained Agency vs JSM Contingency Model</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th>Hiring Dimension</th>
          <th>Traditional Retained Search</th>
          <th>JSM Integrated Services</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Upfront Capital</strong></td>
          <td>33% Advance retainer required</td>
          <td class="text-terracotta"><strong>₹0 Advance Retainer (Pure Contingency)</strong></td>
        </tr>
        <tr>
          <td><strong>Shortlist Delivery</strong></td>
          <td>30 to 60 Days average</td>
          <td class="text-teal"><strong>7-Day 3-Blind-Dossier Sprint SLA</strong></td>
        </tr>
        <tr>
          <td><strong>Invoicing Milestone</strong></td>
          <td>1/3 kickoff, 1/3 shortlist, 1/3 offer</td>
          <td>Strictly Net 15/30 days post-joining <span class="badge-tag">[CONFIRM: fee %]</span></td>
        </tr>
        <tr>
          <td><strong>Placement Fee</strong></td>
          <td>15% – 25% of annual CTC</td>
          <td class="tabular-nums"><strong>8.33% of Annual CTC [CONFIRM: fee %]</strong></td>
        </tr>
        <tr>
          <td><strong>Replacement Guarantee</strong></td>
          <td>30 Days (partial credit note)</td>
          <td><strong>90-Day Free Candidate Replacement Shield [CONFIRM: fee %]</strong></td>
        </tr>
      </tbody>
    </table>

    <div class="running-footer">
      <span class="contact-info">JSM Integrated Services • Operational Desk: +91 90808 63448</span>
      <span>Page 2 of 4</span>
    </div>
  </div>

  <!-- ================= PAGE 3 ================= -->
  <div class="page">
    <div class="running-header">
      <span class="brand">JSM Integrated Services</span>
      <span>Vacancy Cost Calculator • Financial Drag Analysis</span>
    </div>

    <h2>5. The True Cost of an Open Leadership Role</h2>
    <p>Business owners often view hiring fees as an expense while ignoring the invisible operational drain of an empty executive desk. An open leadership position causes line scrap escalation, supervisor overtime, and delayed customer dispatches.</p>

    <div class="card-highlight">
      <h3>The Daily Cost of Vacancy (COV) Formula</h3>
      <p style="font-size: 9.5pt; margin-bottom: 2mm;"><code>Daily Vacancy Drag = (Annual Operational Value of Role / 220 Working Days) + Supervisory Drag</code></p>
      <p style="font-size: 9pt; margin-bottom: 0;">For a Plant Manager or Operations Head (Band 1/2: ₹18L–₹35L CTC <span class="badge-tag">[CONFIRM: role band]</span>), the benchmark financial drag is <strong>₹35,000 per working day</strong> in unrecovered overhead, scrap penalties, and production downtime.</p>
    </div>

    <h2>6. Comparative Financial Analysis: 60-Day Retained vs JSM 7-Day Sprint</h2>
    
    <div class="grid-2">
      <div class="card-alert">
        <h3 style="color: #C8553D;">Traditional 60-Day Retained Delay</h3>
        <div style="font-size: 18pt; font-weight: 700; color: #C8553D; margin-bottom: 2mm; font-family: 'Fraunces', serif;">₹21,00,000 Loss</div>
        <p style="font-size: 8.5pt; color: #4B5563; margin-bottom: 2mm;"><strong>Vacancy Drag:</strong> 60 Days × ₹35,000/day = ₹21,00,000</p>
        <p style="font-size: 8.5pt; color: #4B5563; margin-bottom: 2mm;"><strong>Upfront Retainer:</strong> ₹3,00,000 to ₹5,00,000 paid at Day 1</p>
        <p style="font-size: 8.5pt; color: #4B5563; margin-bottom: 0;"><strong>Total Operational Sunk Capital:</strong> ₹24,00,000+</p>
      </div>

      <div class="card-highlight">
        <h3 style="color: #1F4E5F;">JSM 7-Day Contingency Sprint</h3>
        <div style="font-size: 18pt; font-weight: 700; color: #1F4E5F; margin-bottom: 2mm; font-family: 'Fraunces', serif;">₹18,55,000 Saved</div>
        <p style="font-size: 8.5pt; color: #4B5563; margin-bottom: 2mm;"><strong>Shortlist Delivered:</strong> Day 7 (Vacancy drag: ₹2,45,000)</p>
        <p style="font-size: 8.5pt; color: #4B5563; margin-bottom: 2mm;"><strong>Days Saved:</strong> 53 Days of operational recovery</p>
        <p style="font-size: 8.5pt; color: #4B5563; margin-bottom: 0;"><strong>Direct Net Savings:</strong> 53 × ₹35,000 = <strong>₹18,55,000</strong></p>
      </div>
    </div>

    <h2>7. Daily Vacancy Drag Across Executive Role Bands</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th>Role Compensation Band</th>
          <th>Daily Vacancy Drag</th>
          <th>30-Day Drag Loss</th>
          <th>60-Day Drag Loss</th>
          <th>JSM 7-Day Savings</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Band 1: Mid-Senior (₹15 LPA)</strong><br><span class="text-muted" style="font-size: 8pt;">Plant Mgr / Tech Architect [CONFIRM: role band]</span></td>
          <td class="tabular-nums">₹22,000 / day</td>
          <td class="tabular-nums">₹6,60,000</td>
          <td class="tabular-nums">₹13,20,000</td>
          <td class="tabular-nums text-teal"><strong>₹11,66,000</strong></td>
        </tr>
        <tr>
          <td><strong>Band 1/2: Operations Head (₹25 LPA)</strong><br><span class="text-muted" style="font-size: 8pt;">General Mgr Ops [CONFIRM: role band]</span></td>
          <td class="tabular-nums"><strong>₹35,000 / day</strong></td>
          <td class="tabular-nums">₹10,50,000</td>
          <td class="tabular-nums text-terracotta"><strong>₹21,00,000</strong></td>
          <td class="tabular-nums text-teal"><strong>₹18,55,000</strong></td>
        </tr>
        <tr>
          <td><strong>Band 2: Functional Head (₹40 LPA)</strong><br><span class="text-muted" style="font-size: 8pt;">VP Engineering / Ops [CONFIRM: role band]</span></td>
          <td class="tabular-nums">₹55,000 / day</td>
          <td class="tabular-nums">₹16,50,000</td>
          <td class="tabular-nums">₹33,00,000</td>
          <td class="tabular-nums text-teal"><strong>₹29,15,000</strong></td>
        </tr>
        <tr>
          <td><strong>Band 3: Executive CXO (₹75 LPA – ₹1 Cr)</strong><br><span class="text-muted" style="font-size: 8pt;">CEO / COO / MD [CONFIRM: role band]</span></td>
          <td class="tabular-nums">₹1,10,000 / day</td>
          <td class="tabular-nums">₹33,00,000</td>
          <td class="tabular-nums">₹66,00,000</td>
          <td class="tabular-nums text-teal"><strong>₹58,30,000</strong></td>
        </tr>
      </tbody>
    </table>

    <div class="running-footer">
      <span class="contact-info">JSM Integrated Services • Operational Desk: +91 90808 63448</span>
      <span>Page 3 of 4</span>
    </div>
  </div>

  <!-- ================= PAGE 4 ================= -->
  <div class="page">
    <div class="running-header">
      <span class="brand">JSM Integrated Services</span>
      <span>90-Day Replacement Shield &amp; Mandate Activation</span>
    </div>

    <h2>8. The 90-Day Free Replacement Guarantee Terms</h2>
    <p>Our commitment to operational continuity extends beyond the joining date. Every executive placement is shielded by our 90-Day Guarantee:</p>

    <div class="card-highlight">
      <h3>Terms of the 90-Day Replacement Shield</h3>
      <p style="font-size: 9pt; margin-bottom: 2mm;"><strong>1. 100% Free Replacement Sprint:</strong> If a placed candidate resigns, fails probation, or experiences health incapacity within 90 calendar days of joining, JSM initiates an immediate priority sprint to provide a replacement at <strong>₹0 additional fee</strong> <span class="badge-tag">[CONFIRM: fee %]</span>.</p>
      <p style="font-size: 9pt; margin-bottom: 2mm;"><strong>2. No Credit Notes or Delays:</strong> Unlike traditional agencies that issue non-refundable credit vouchers, JSM immediately activates active candidate matching within 48 hours of notification.</p>
      <p style="font-size: 9pt; margin-bottom: 0;"><strong>3. Post-Joining Invoicing:</strong> Placement fees (8.33% fixed CTC <span class="badge-tag">[CONFIRM: fee %]</span>) are invoiced Net 15 or 30 days from joining, ensuring the candidate is actively delivering before your accounting settlement.</p>
    </div>

    <h2>9. The 4-Step Protocol to Eliminate Day-1 Ghosting</h2>
    <p>Senior candidate ghosting occurs when communication lapses during notice periods. JSM executes a rigorous 4-step transition protocol:</p>

    <div class="grid-2">
      <div class="card">
        <h3>Step 1: Resignation Verification</h3>
        <p class="text-muted" style="font-size: 8.5pt;">Candidate provides formal proof of resignation submission and acceptance within 48 hours of offer letter countersigning.</p>
      </div>
      <div class="card">
        <h3>Step 2: Weekly Touchpoint Cadence</h3>
        <p class="text-muted" style="font-size: 8.5pt;">Our desk maintains weekly structured check-ins during the notice period, monitoring counter-offer attempts and family relocation logistics.</p>
      </div>
      <div class="card">
        <h3>Step 3: Buy-Out Settlement</h3>
        <p class="text-muted" style="font-size: 8.5pt;">If a current employer holds notice period release, JSM negotiates formal buyout terms to expedite line handover.</p>
      </div>
      <div class="card">
        <h3>Step 4: Day-1 On-Site Escort</h3>
        <p class="text-muted" style="font-size: 8.5pt;">JSM desk confirms candidate physical muster at your facility on Day 1, verifying on-site onboarding with your HR team.</p>
      </div>
    </div>

    <!-- Activation Block -->
    <div class="contact-card">
      <h3>Initiate a 7-Day Contingency Mandate</h3>
      <p>Initiate your executive search with ₹0 upfront retainer. Book a 15-minute mandate calibration with our executive desk today.</p>
      <div class="contact-grid">
        <div>
          Executive Desk: <span>+91 90808 63448</span><br>
          Direct Email: <span>contact@jsmintegratedservices.com</span>
        </div>
        <div>
          Registered Office: <span>Door No.: 87, Plot No: 112, Gandhi Nagar,<br>Kottapattu, Tiruchirappalli - 620021, Tamil Nadu</span><br>
          Web Portal: <span>https://www.jsmintegratedservices.com</span>
        </div>
      </div>
    </div>

    <div class="running-footer">
      <span class="contact-info">JSM Integrated Services • Operational Desk: +91 90808 63448</span>
      <span>Page 4 of 4</span>
    </div>
  </div>

</body>
</html>`;
}

/**
 * Main PDF Generation Pipeline
 */
async function main() {
  console.log('======================================================================');
  console.log('  JSM INTEGRATED SERVICES — DYNAMIC PDF LEAD MAGNET GENERATOR');
  console.log('======================================================================\n');
  console.log(`[INFO] Output Directory: ${OUTPUT_DIR}`);
  console.log(`[INFO] Chrome Binary:    ${CHROME_PATH}`);

  let browser;
  try {
    // Attempt launching with system Chrome
    browser = await chromium.launch({
      executablePath: CHROME_PATH,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });
  } catch (err) {
    console.warn(`[WARN] System Google Chrome failed at ${CHROME_PATH}: ${err.message}`);
    console.log('[INFO] Falling back to bundled Chromium...');
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  const context = await browser.newContext();
  const page = await context.newPage();

  // 1. Generate Job Seeker Playbook
  console.log('\n[1/2] Generating: The 2026 ATS-Bypass & Hidden Job Market Playbook...');
  const seekerHtml = getJobSeekerHtml();
  await page.setContent(seekerHtml, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const seekerPdfPath = path.join(OUTPUT_DIR, 'the-2026-ats-bypass-hidden-job-market-playbook.pdf');
  await page.pdf({
    path: seekerPdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '12mm',
      bottom: '14mm',
      left: '14mm',
      right: '14mm'
    }
  });

  const seekerStats = fs.statSync(seekerPdfPath);
  console.log(`  ✓ Generated: ${seekerPdfPath} (${(seekerStats.size / 1024).toFixed(1)} KB)`);

  // 2. Generate Employer Guide
  console.log('\n[2/2] Generating: The Founder\'s Guide to Zero-Retainer Contingency Hiring...');
  const employerHtml = getEmployerHtml();
  await page.setContent(employerHtml, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const employerPdfPath = path.join(OUTPUT_DIR, 'the-founders-guide-to-zero-retainer-contingency-hiring.pdf');
  await page.pdf({
    path: employerPdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '12mm',
      bottom: '14mm',
      left: '14mm',
      right: '14mm'
    }
  });

  const employerStats = fs.statSync(employerPdfPath);
  console.log(`  ✓ Generated: ${employerPdfPath} (${(employerStats.size / 1024).toFixed(1)} KB)`);

  await browser.close();

  // Validate PDF headers
  const seekerBytes = fs.readFileSync(seekerPdfPath);
  const employerBytes = fs.readFileSync(employerPdfPath);

  const isSeekerValid = seekerBytes.slice(0, 5).toString('ascii').startsWith('%PDF-');
  const isEmployerValid = employerBytes.slice(0, 5).toString('ascii').startsWith('%PDF-');

  if (!isSeekerValid || !isEmployerValid) {
    throw new Error('PDF header verification failed: file does not begin with %PDF-');
  }

  console.log('\n======================================================================');
  console.log('  SUCCESS: Both Lead Magnet PDFs successfully generated and verified!');
  console.log('======================================================================\n');
}

// Export for test suite inspection
export { getJobSeekerHtml, getEmployerHtml, OUTPUT_DIR };

// Execute if run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(err => {
    console.error('\n✗ FATAL GENERATION ERROR:', err);
    process.exit(1);
  });
}
