"""
CONTENT KING — AI Social Media & SEO Blog Engine
Generates 7-day social media calendars (LinkedIn/Instagram/Facebook) and SEO articles.
"""
import sys
import os
import json
from datetime import datetime

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))
from integrations.gemini_client import call_gemini

def generate_weekly_social_calendar() -> str:
    """
    Generates ready-to-publish social media posts for the week.
    """
    prompt = """
Generate a 7-day multi-platform social media calendar for JSM Integrated Services (Tamil Nadu's premier PSARA-licensed security and integrated facility management agency).

Key Details to Feature:
- Managing Director: Sweety R
- Flagship 2024 Trichy International Airport Operations benchmark
- 2-Hour Relief Replacement SLA
- 2:00 AM Active Night Audits
- 100% EPF/ESI Legal Compliance
- Mix Tamil & English phrases naturally (Tanglish) for local engagement

For each day (Monday to Sunday), provide:
1. Platform: LinkedIn (B2B corporate), Instagram (visual training/guards), or Facebook
2. Post Caption: Complete with emojis, call to action, and hashtags
3. Visual Concept: Recommended Canva image/video description
"""
    system_instruction = "You are an expert South Indian digital marketer specializing in high-trust B2B security and facility management brands."
    return call_gemini(prompt, system_instruction=system_instruction)

def generate_seo_article(keyword: str) -> str:
    """
    Generates a comprehensive 1200+ word SEO blog article targeting a specific South Indian keyword.
    """
    prompt = f"""
Write an authoritative, high-ranking 1200+ word SEO blog post for JSM Integrated Services targeting the keyword: "{keyword}".

Article Requirements:
- Engaging H1 Title including the keyword
- Clear H2 and H3 Subheadings
- Focus on corporate safety, PSARA compliance in Tamil Nadu, and operational discipline
- Natural mentions of JSM Integrated Services, Trichy Airport landmark, and 2-Hour Relief SLA
- Clear FAQ section (3 Q&As) schema-ready
- Strong Call-to-Action with phone: +91 94431 52000 and website: jsmintegratedservices.in
"""
    return call_gemini(prompt)

if __name__ == "__main__":
    print(f"[{datetime.now()}] 👑 CONTENT KING AI Agent is running...")
    
    calendar = generate_weekly_social_calendar()
    output_dir = os.path.join(os.path.dirname(__file__), "output")
    os.makedirs(output_dir, exist_ok=True)
    
    cal_file = os.path.join(output_dir, f"social_calendar_{datetime.now().strftime('%Y%m%d')}.md")
    with open(cal_file, "w", encoding="utf-8") as f:
        f.write(f"# JSM Weekly Social Media Calendar ({datetime.now().strftime('%d %B %Y')})\n\n")
        f.write(calendar)
        
    print(f"✅ Weekly social calendar generated and saved to: {cal_file}")
