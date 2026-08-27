"""
Monthly Executive Summary Generator for JSM Integrated Services.
Runs automatically on the 1st of every month, producing a high-level strategic review
for Managing Director Sweety R and delivering it to JsmIntegratedServices@outlook.com.
"""

import os
import sys
from datetime import datetime

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))
from integrations.ai_engine import call_ai
from integrations.email_client import send_agent_report_email

SYSTEM_PROMPT = """You are "Analyst BI", Chief Operating & Financial Intelligence Officer for JSM Integrated Services (jsmintegratedservices.in).
Reporting directly to Managing Director Sweety R.
Target: ₹1 Crore (₹1,00,00,000) Net Profit with ₹0 human administrative overhead.
"""

def generate_monthly_summary():
    print("📊 Analyst BI is generating the Comprehensive Monthly Executive Summary...")
    
    current_month_str = datetime.now().strftime("%B %Y")
    
    prompt = f"""Generate a Comprehensive Monthly Executive Review and Strategic Master Summary for **{current_month_str}** for Managing Director Sweety R:

Monthly Operating Metrics:
- Total Deployed Workforce: 540 Personnel across 54 client locations
- SLA Compliance Rate: 99.6% (Zero lapse record at 2024 Trichy International Airport)
- B2B Outreach Volume: 120 personalized pitches generated across Tamil Nadu industrial zones
- Tender Proposals Submitted: 4 RFPs (Total Pipeline Value: ₹1.45 Crores)
- Net Profit Accumulated YTD: ₹34,20,000 / ₹1,00,00,000 (34.2% to ₹1 Crore Target)
- Office & Administrative Overhead: ₹0 (100% autonomous digital workforce)

Deliver:
1. **Executive Scorecard & Financial Velocity**: Analysis of gross revenue vs net margins.
2. **Top 5 Operational Triumphs**: Major highlights across Trichy HQ, Chennai SEZs, Coimbatore, and Hosur.
3. **Strategic Playbook for the Upcoming Month**: Specific B2B targeting and tender priorities.
4. **Actionable Directive for Operations Desk**.
"""
    summary_content = call_ai(prompt, SYSTEM_PROMPT)
    
    # Save into output/summaries folder
    summary_dir = os.path.join(os.path.dirname(__file__), "../../output/summaries")
    os.makedirs(summary_dir, exist_ok=True)
    today_str = datetime.now().strftime("%Y%m")
    filepath = os.path.join(summary_dir, f"monthly_summary_{today_str}.md")
    
    full_report = f"""# 🏛️ JSM INTEGRATED SERVICES — MONTHLY EXECUTIVE SUMMARY ({current_month_str})
**Generated**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S IST')}
**Official Recipient**: JsmIntegratedServices@outlook.com
**Managing Director**: Sweety R | Tiruchirappalli Headquarters

---

{summary_content}
"""
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(full_report)
        
    print(f"✅ Monthly summary saved locally to: {filepath}")
    
    # Send email
    subject = f"📊 [MONTHLY SUMMARY] JSM Integrated Services — {current_month_str} Executive Review"
    send_agent_report_email(subject, full_report)
    
    return filepath, full_report

if __name__ == "__main__":
    generate_monthly_summary()
