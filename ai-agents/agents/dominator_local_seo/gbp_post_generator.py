"""
Agent 4: Dominator Local SEO & Google Business Profile Post Generator.
Generates geo-targeted Google Maps updates for all 9 Tamil Nadu operational hubs.
"""

import os
import sys
from datetime import datetime

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))
from integrations.ai_engine import call_ai

CITIES = [
  {"city": "Tiruchirappalli (Trichy)", "focus": "Airport benchmark, Central Regional HQ, 24/7 Command Desk"},
  {"city": "Chennai", "focus": "IT Corridors, SEZ Industrial Plants, OMR/Guindy Corporate Housekeeping"},
  {"city": "Coimbatore", "focus": "Textile Mills, Heavy Engineering Foundries, Peelamedu IT Parks"},
  {"city": "Hosur", "focus": "Automotive Manufacturing, Warehouse Logistics, 48-Hour Surge Staffing"},
  {"city": "Madurai", "focus": "Multi-Specialty Healthcare Centers, Retail Commercial Complex Security"},
  {"city": "Salem & Erode", "focus": "Industrial Labor Contracting, Chemical & Steel Processing Facilities"},
  {"city": "Tirunelveli & Thanjavur", "focus": "Regional Commercial Outposts & Educational Institution Security"}
]

SYSTEM_PROMPT = """You are "Dominator", the Local SEO & Google Business Profile Optimizer for JSM Integrated Services (jsmintegratedservices.in).
Generate high-converting 120-150 word Google Maps / Local SEO posts designed to rank for "PSARA security guard agency near me" and "commercial housekeeping services".
"""

def generate_gbp_updates():
    print(f"📍 Dominator Agent is creating Google Business Profile updates for {len(CITIES)} Tamil Nadu hubs...")
    
    os.makedirs("output", exist_ok=True)
    today_str = datetime.now().strftime("%Y%m%d_%H%M%S")
    filepath = f"output/gbp_local_seo_{today_str}.md"
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(f"# 📍 JSM GOOGLE BUSINESS PROFILE & LOCAL SEO UPDATES\n")
        f.write(f"**Date**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S IST')}\n\n---\n\n")

        for idx, item in enumerate(CITIES, 1):
            prompt = f"""Write a high-converting 120-word Google Business Profile update for JSM Integrated Services in **{item['city']}**.

Focus: {item['focus']}
Include:
- Local city pain points and statutory PSARA compliance
- Mention of JSM's 2-Hour Replacement SLA and 2:00 AM Night Audits
- Call to Action: Email jsmintegratedservices@outlook.com or visit jsmintegratedservices.in for an immediate site proposal.
- 5 Local SEO hashtags (e.g. #{item['city'].split()[0]}Security #PSARAGuards)
"""
            print(f"  [{idx}/{len(CITIES)}] Generating local SEO update for {item['city']}...")
            post = call_ai(prompt, SYSTEM_PROMPT)
            
            f.write(f"## Hub {idx}: {item['city']}\n")
            f.write(post)
            f.write("\n\n---\n\n")

    print(f"✅ Local SEO updates generated! Saved to: {filepath}")
    return filepath

if __name__ == "__main__":
    generate_gbp_updates()
