"""
Agent 6: Tender Hawk — Government & GeM Tender Pitch & Feasibility Evaluator.
Scans and drafts compliant RFP bids for Tamil Nadu public and enterprise security tenders.
"""

import os
import sys
from datetime import datetime

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))
from integrations.ai_engine import call_ai

SYSTEM_PROMPT = """You are "Tender Hawk", Senior Government Tender & RFP Bid Architect for JSM Integrated Services (jsmintegratedservices.in | jsmintegratedservices@outlook.com).
Your job is to evaluate tender requirements against JSM's verified credentials and draft winning executive bid pitches.

JSM Bid Credentials:
- Legal Entity: JSM Integrated Services (formerly JSMMANPOWER)
- Controlling Authority: Home Department, Govt of Tamil Nadu (PSARA Act 2005)
- Landmark Benchmark: 2024 Trichy International Airport Terminal Passenger Flow & Security Coordination
- Compliance: 100% EPF, ESIC, Minimum Wages Act, GST Registered, Zero Statutory Arrears
- Operations: Trichy HQ, Chennai, Coimbatore, Madurai, Salem, Hosur
"""

SAMPLE_TENDERS = [
  {
    "title": "Provision of Security Guarding & Facility Upkeep at ELCOT IT Park, Navalpattu, Trichy",
    "authority": "Electronics Corporation of Tamil Nadu (ELCOT)",
    "value_estimate": "₹45,00,000 / Year",
    "scope": "24/7 Security guarding (18 guards + 2 supervisors) and mechanized housekeeping for IT park campus."
  },
  {
    "title": "Comprehensive Housekeeping and Waste Management Services for District Healthcare Facility",
    "authority": "Tamil Nadu Health System Reform Project (TNHSRP)",
    "value_estimate": "₹28,00,000 / Year",
    "scope": "Sanitization of OPDs, ICUs, emergency wards, and biometric attendance compliance."
  }
]

def evaluate_and_draft_tenders():
    print(f"🦅 Tender Hawk Agent is analyzing active Tamil Nadu tenders...")
    
    os.makedirs("output", exist_ok=True)
    today_str = datetime.now().strftime("%Y%m%d_%H%M%S")
    filepath = f"output/tender_evaluation_{today_str}.md"
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(f"# 🦅 JSM GOVERNMENT & GeM TENDER EVALUATION REPORT\n")
        f.write(f"**Date**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S IST')}\n\n---\n\n")

        for idx, tender in enumerate(SAMPLE_TENDERS, 1):
            prompt = f"""Evaluate this active public tender for JSM Integrated Services and draft a winning Executive Summary & Technical Compliance Pitch:

- **Tender Title**: {tender['title']}
- **Issuing Authority**: {tender['authority']}
- **Estimated Value**: {tender['value_estimate']}
- **Operational Scope**: {tender['scope']}

Deliver:
1. **Feasibility Score (0-100%)** based on JSM's PSARA compliance, Airport milestone, and Trichy local dispatch.
2. **Win Strategy & Technical Differentiators** (highlighting the 2-Hour Relief SLA and 2:00 AM Night Audits).
3. **Drafted 3-Paragraph Executive Pitch to the Tender Committee** signed by Managing Director Sweety R.
"""
            print(f"  [{idx}/{len(SAMPLE_TENDERS)}] Evaluating {tender['title'][:40]}...")
            analysis = call_ai(prompt, SYSTEM_PROMPT)
            
            f.write(f"## Tender {idx}: {tender['title']}\n")
            f.write(f"**Authority**: {tender['authority']} | **Value**: {tender['value_estimate']}\n\n")
            f.write(analysis)
            f.write("\n\n---\n\n")

    print(f"✅ Tender analysis complete! Saved to: {filepath}")
    return filepath

if __name__ == "__main__":
    evaluate_and_draft_tenders()
