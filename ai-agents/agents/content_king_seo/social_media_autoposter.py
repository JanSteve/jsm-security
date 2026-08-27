"""
Agent 3: Content King & Social Media Auto-Poster for JSM Integrated Services.
Generates 7-day high-converting LinkedIn & Instagram B2B marketing campaigns.
"""

import os
import sys
from datetime import datetime

# Ensure project root is on path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))
from integrations.ai_engine import call_ai

SYSTEM_PROMPT = """You are "Content King", the Lead B2B Marketing & Growth Strategist for JSM Integrated Services (jsmintegratedservices.in | jsmintegratedservices@outlook.com).
Company Facts:
- Managing Director: Sweety R | HQ: Tiruchirappalli (Trichy), Tamil Nadu
- Core Services: Private Security (PSARA 2005), Commercial Housekeeping (5-Step Hygiene), Contractual Manpower (JSMMANPOWER heritage)
- Landmarks: 2024 Trichy International Airport Operations Benchmark
- Non-negotiable USPs: 2-Hour Relief Replacement SLA, 2:00 AM Unannounced Night Audits, 100% EPF/ESI Legal Adherence
- Target Audience: Plant Managers, Facility Directors, Hospital Admins, Warehouse Heads across Tamil Nadu (Chennai, Coimbatore, Trichy, Hosur, Madurai, Salem)
"""

def generate_weekly_social_campaign():
    prompt = """Generate a complete 7-Day B2B Social Media Marketing Campaign (Monday to Sunday) for JSM Integrated Services.

For each day (Day 1 to Day 7), provide:
1. **LinkedIn Post**:
   - Compelling hook line (problem-first: e.g., absentee guards, NABH hospital hygiene audit failures, multi-vendor billing chaos)
   - Real-world solution anchored in JSM's proof (Trichy Airport benchmark, 2:00 AM night audits, 2-Hour SLA)
   - Clear CTA to email jsmintegratedservices@outlook.com or visit jsmintegratedservices.in
   - 5-7 high-reach B2B hashtags (#FacilityManagement #PSARASecurity #TamilNaduIndustry #ManpowerSolutions #CorporateSecurity)

2. **Instagram Post / Reel Concept**:
   - Visual Scene Concept (e.g. Cleanroom scrubbing, 2 AM security patrol log, Airport terminal crowd flow)
   - Caption in engaging Tanglish/English with emojis
   - 10 viral hashtags

3. **Weekly SEO Blog Article (1200+ words outline)**:
   - High-intent topic: "How to Choose a PSARA Licensed Security Agency in Tamil Nadu (2026 Checklist)"
   - Sections with statutory liability warnings, EPF/ESI compliance checks, and SLA negotiation tips.

Format cleanly in Markdown with dividers.
"""
    print("🤖 Content King Agent is generating 7-day multi-platform social campaign...")
    output = call_ai(prompt, SYSTEM_PROMPT)
    
    # Save output
    os.makedirs("output", exist_ok=True)
    today_str = datetime.now().strftime("%Y%m%d_%H%M%S")
    filepath = f"output/social_campaign_{today_str}.md"
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(f"# 📱 JSM 7-DAY SOCIAL MEDIA MARKETING CAMPAIGN\n")
        f.write(f"**Generated**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S IST')}\n")
        f.write(f"**Target Platforms**: LinkedIn B2B + Instagram Business\n\n---\n\n")
        f.write(output)
        
    print(f"✅ Social campaign generated successfully! Saved to: {filepath}")
    return filepath, output

if __name__ == "__main__":
    generate_weekly_social_campaign()
