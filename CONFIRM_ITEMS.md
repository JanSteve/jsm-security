# JSM Integrated Services — Fact Integrity & Unresolved Items Register

**Status:** Active Working Register  
**Scope:** Phase 1 Marketing Site Rebuild  
**Governing Standard:** Requirement R3 (Fact Integrity, Tone, and Copy Rules)  
**Last Updated:** 2026-11-04  

---

## 1. Ground Truth: Verified Corporate Identity

The following details are strictly verified and authoritative. They must be rendered consistently across all pages, footers, meta schemas, and communications:

| Corporate Attribute | Verified Truth | Source / Authority |
|---|---|---|
| **Legal Entity** | JSM Integrated Services | Business Registration & GST Filings |
| **Business Vertical** | Executive Talent Acquisition & Recruitment | Strategic Mandate (2026 Rebuild) |
| **Primary Email** | `contact@jsmintegratedservices.com` | Official Corporate Domain Inbox |
| **Primary Phone / Desk** | `+91 90808 63448` | Operational Executive Desk |
| **Registered Office Address** | Door No.: 87, Plot No: 112, Gandhi Nagar, Kottapattu, Tiruchirappalli - 620021, Tamil Nadu, India | Verified Commercial Premises |
| **Operational Geography** | Tamil Nadu, Karnataka, Maharashtra, Delhi, Madhya Pradesh, Gujarat (6 Focus States) | Service Expansion Agreement |
| **Target Role Compensation** | ₹12 LPA to ₹1 Cr Fixed Annual CTC | Mandate Scope |
| **Commercial Model** | 100% Success-Based Contingency Fee Model | No Upfront Retainers |

---

## 2. Unresolved Items Register (`[CONFIRM]` Markers)

Every item below represents an unverified business claim or variable that has not yet been formally confirmed by the founding proprietor. In production code and copy, each item MUST carry its explicit confirmation tag until verified:

### 2.1 Role Bands & Functional Brackets — `[CONFIRM: role band]`

| Component / Section | Placeholder Claim / Value | Confirmation Tag | Resolution Requirement |
|---|---|---|---|
| Role Bands Overview | Band 1: ₹12 LPA – ₹25 LPA (Mid-Senior Executives) | `[CONFIRM: role band]` | Confirm exact band title, experience tier (e.g. 5–8 yrs), and typical functional disciplines. |
| Role Bands Overview | Band 2: ₹25 LPA – ₹50 LPA (Functional Heads / VP) | `[CONFIRM: role band]` | Confirm exact band title, experience tier (e.g. 9–15 yrs), and departmental scopes. |
| Role Bands Overview | Band 3: ₹50 LPA – ₹1 Cr+ (CXO & Board Leadership) | `[CONFIRM: role band]` | Confirm CXO scope (CEO, COO, CFO, CTO, MD) and placement methodology. |
| Interactive Calculator | Default bracket CTC presets (₹15L, ₹30L, ₹60L) | `[CONFIRM: role band]` | Confirm default slider steps and initial calculation values. |

### 2.2 Fee Model & Commercials — `[CONFIRM: fee %]`

| Component / Section | Placeholder Claim / Value | Confirmation Tag | Resolution Requirement |
|---|---|---|---|
| Fee Model Section | Contingency Placement Fee: 8.33% (1 Month Fixed CTC) | `[CONFIRM: fee %]` | Confirm whether standard fee is 8.33% across all bands or tiered (e.g. 8.33% up to ₹25L, 10%–12.5% for CXO). |
| Interactive Calculator | Fee multiplier applied to placed CTC | `[CONFIRM: fee %]` | Confirm if single flat % or dynamic band percentage is displayed to employers. |
| Payment Terms | Invoice Due Date: Net 15 or 30 days from joining | `[CONFIRM: fee %]` | Confirm statutory invoice credit window. |
| Replacement Guarantee | 90-Day Free Candidate Replacement Guarantee | `[CONFIRM: fee %]` | Confirm exact replacement warranty duration (60 days vs. 90 days vs. 120 days). |

### 2.3 Team Credentials & Track Record — `[CONFIRM: team credential]`

| Component / Section | Placeholder Claim / Value | Confirmation Tag | Resolution Requirement |
|---|---|---|---|
| Leadership Bio | Executive recruitment desk years of domain experience | `[CONFIRM: team credential]` | Verify individual recruiter certifications, tenure, and recruitment history. |
| Talent Network Size | Active candidate database volume | `[CONFIRM: team credential]` | Zero fabricated numbers allowed. Do NOT claim "50,000+ CXO pool" without internal database audit. |
| Turnaround Time SLA | First candidate dossier delivered within 5–7 working days | `[CONFIRM: team credential]` | Confirm realistic turnaround commitment before publishing. |

---

## 3. Strict Fabrication Quarantine (Prohibited Elements)

In compliance with Requirement R2 & R3, the following items are strictly quarantined and prohibited from the codebase:

1. **No Invented Clients or Corporate Logos**:
   - Do NOT display logos of multinational corporations, IT giants, or PSUs unless an active, signed contract allows public showcase.
   - The legacy Airports Authority of India (AAI) benchmark belongs to facility/security operations and must not be misrepresented as executive talent acquisition.
2. **No Fabricated Testimonials**:
   - Quotations attributed to fictional executives (e.g., "HR Director, Fortune 500 Co.") are strictly barred.
3. **No Unsubstantiated Turnaround Guarantees**:
   - Turnaround targets (e.g., "Placement within 21 days") must be phrased as operational targets or tagged `[CONFIRM: team credential]`.
4. **Prohibited Hype Terms**:
   - The following words are permanently quarantined and banned from all copy:
     * `world-class`
     * `cutting-edge`
     * `seamless`
     * `leverage`
     * `unlock your potential`
     * `revolutionize`

---

## 4. Client Sign-Off Workflow

To resolve items in this register:
1. Managing Director (Sweety J) reviews each `[CONFIRM]` section.
2. Verified figures (fee %, replacement days, role bands) are updated in `src/data/` configuration files.
3. Once verified, tags are systematically removed from components and marked resolved in this register.
