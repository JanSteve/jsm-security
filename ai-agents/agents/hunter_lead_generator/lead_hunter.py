"""
Agent 2: Hunter B2B Lead Generator & Outreach Engine for JSM Integrated Services.
Generates personalized, high-converting B2B cold proposals for Tamil Nadu enterprise targets.
"""

import os
import sys
import json
from datetime import datetime

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))
from integrations.ai_engine import call_ai

SYSTEM_PROMPT = """You are "Hunter", the elite B2B Cold Outreach & Sales Copy Specialist for JSM Integrated Services (jsmintegratedservices.in | jsmintegratedservices@outlook.com).
Your goal is to book on-site risk assessments and RFP consultations with Plant Managers, Facility Directors, Hospital Admins, and Operations Heads across Tamil Nadu.

Key Anchors:
- Managing Director Sweety R | Trichy Regional HQ
- Inaugural 2024 Trichy International Airport Operations Benchmark
- 2-Hour Relief Replacement SLA (Standby roving team)
- 2:00 AM Supervisor Night Audits with timestamped register
- 100% EPF, ESIC, Minimum Wages statutory legal coverage (Zero client liability)
"""

TARGET_PROSPECTS = [
  {
    "company": "Hyundai Auto Ancillary Supplier",
    "city": "Sriperumbudur / Chennai",
    "industry": "Automotive Manufacturing",
    "target_title": "Plant General Manager",
    "pain_point": "Shift absenteeism causing assembly gate bottlenecks and night perimeter vulnerabilities."
  },
  {
    "company": "Apollo / Kauvery Tier-1 Medical Center",
    "city": "Tiruchirappalli (Trichy)",
    "industry": "Healthcare & Hospitals",
    "target_title": "Hospital Administrator",
    "pain_point": "NABH hygiene audit compliance, ICU closed-loop sanitization, and patient-escort courtesy."
  },
  {
    "company": "Ascendas / ELCOT IT Tech Park",
    "city": "Coimbatore / Chennai",
    "industry": "IT & Tech Parks",
    "target_title": "Head of Corporate Facilities",
    "pain_point": "Managing 4 separate vendors for security, housekeeping, and staffing with fragmented billing."
  },
  {
    "company": "TVS / Ashok Leyland Component Hub",
    "city": "Hosur Industrial Complex",
    "industry": "Heavy Engineering",
    "target_title": "Operations & Logistics Director",
    "pain_point": "Surge seasonal manpower demand, EPF/ESI statutory inspection risks, and tool room theft."
  }
]

def run_lead_hunter():
    print(f"🎯 Hunter Agent is generating high-converting B2B cold outreach batches for {len(TARGET_PROSPECTS)} enterprise targets...")
    
    os.makedirs("output", exist_ok=True)
    today_str = datetime.now().strftime("%Y%m%d_%H%M%S")
    filepath = f"output/lead_outreach_batch_{today_str}.md"
    
    results = []
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(f"# 🎯 JSM B2B COLD OUTREACH CAMPAIGN BATCH\n")
        f.write(f"**Date**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S IST')}\n")
        f.write(f"**Sender**: Operations Executive Desk <jsmintegratedservices@outlook.com>\n\n---\n\n")

        for idx, prospect in enumerate(TARGET_PROSPECTS, 1):
            prompt = f"""Write a high-converting, personalized 3-paragraph B2B cold outreach email to:
- **Target Company**: {prospect['company']}
- **City/Zone**: {prospect['city']}
- **Industry**: {prospect['industry']}
- **Target Persona**: {prospect['target_title']}
- **Core Operational Challenge**: {prospect['pain_point']}

Include:
1. High-open rate Subject Line (customized to their zone & pain point)
2. Opening acknowledging their specific facility scale and the risk of {prospect['pain_point']}
3. Pitch anchored on JSM's PSARA 2005 licensing, 2-Hour Replacement SLA, 2:00 AM night audits, and 2024 Trichy International Airport benchmark
4. Frictionless CTA: Offer a complimentary 30-minute On-Site Risk & Manpower Audit or email reply to jsmintegratedservices@outlook.com
"""
            print(f"  [{idx}/{len(TARGET_PROSPECTS)}] Generating tailored copy for {prospect['company']} ({prospect['city']})...")
            pitch = call_ai(prompt, SYSTEM_PROMPT)
            
            f.write(f"## Target {idx}: {prospect['company']} ({prospect['city']})\n")
            f.write(f"**Industry**: {prospect['industry']} | **Recipient**: {prospect['target_title']}\n\n")
            f.write(pitch)
            f.write("\n\n---\n\n")
            results.append({"prospect": prospect, "pitch": pitch})

    print(f"✅ All B2B outreach pitches generated! Saved to: {filepath}")
    return filepath, results

if __name__ == "__main__":
    run_lead_hunter()
