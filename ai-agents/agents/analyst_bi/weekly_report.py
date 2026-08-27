"""
Executive Weekly Operational & Commercial Summary for JSM Integrated Services.
Runs every Saturday between 7:00 PM and 8:00 PM IST.
Written in a natural, executive business tone (zero emojis, clean concise human memo).
"""

import os
import sys
from datetime import datetime

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))
from integrations.ai_engine import call_ai
from integrations.email_client import send_agent_report_email

SYSTEM_PROMPT = """You are the Senior Operations & Commercial Director for JSM Integrated Services writing a direct internal memo to Managing Director Sweety R.
Rules:
- Strictly NO emojis.
- Write like an experienced operations director (concise, factual, professional corporate English).
- Focus on hard operational realities: guard attendance, 2-Hour relief SLA compliance, night inspection logs, factory/hospital client satisfaction, and billing collections.
- Clear financial tracking towards the net annual profit target of 1 Crore.
"""

def generate_executive_brief(metrics: dict = None):
    print("Compiling Saturday Weekly Operations Summary...")
    
    if not metrics:
        metrics = {
            "active_client_facilities": 52,
            "deployed_workforce_count": 520,
            "sla_compliance_rate": "99.4%",
            "active_leads_pipeline": 14,
            "pipeline_potential_mrr": "Rs 18.50 Lakhs",
            "closed_deals_this_month": 3,
            "new_mrr_added": "Rs 4.20 Lakhs",
            "ytd_net_profit_accumulated": "Rs 28.60 Lakhs",
            "target_net_profit": "Rs 1.00 Crore"
        }

    date_str = datetime.now().strftime("%d %B %Y")

    prompt = f"""Draft the Saturday Executive Summary for the week ending {date_str} to Managing Director Sweety R.

Performance Overview:
- Active Client Facilities: {metrics['active_client_facilities']}
- Guard & Facility Staff Deployed: {metrics['deployed_workforce_count']}
- 2-Hour Relief SLA Adherence: {metrics['sla_compliance_rate']}
- Active B2B Lead Inquiries: {metrics['active_leads_pipeline']} accounts ({metrics['pipeline_potential_mrr']} MRR pipeline)
- Net Profit Progress: {metrics['ytd_net_profit_accumulated']} towards {metrics['target_net_profit']} annual target

Include the following sections in clean text:
1. EXECUTIVE OVERVIEW (Short 2-3 sentence high-level summary of the week)
2. DEPLOYMENT & SLA HEALTH (Guard post stability, 2:00 AM night audit findings, zero-liability EPF/ESI records)
3. COMMERCIAL PIPELINE & TENDERS (Key B2B outreach progress in Chennai automotive belt, Coimbatore engineering plants, and Trichy healthcare facilities)
4. PRIORITIES FOR NEXT WEEK (3 direct operational action items for the field supervisors)

Keep formatting completely clean, plain, and professional. No asterisks overload, no emojis.
"""
    output = call_ai(prompt, SYSTEM_PROMPT)
    
    # Save to summaries folder
    summary_dir = os.path.join(os.path.dirname(__file__), "../../output/summaries")
    os.makedirs(summary_dir, exist_ok=True)
    today_str = datetime.now().strftime("%Y%m%d")
    filepath = os.path.join(summary_dir, f"weekly_summary_{today_str}.md")
    
    full_report = f"""JSM INTEGRATED SERVICES
WEEKLY OPERATIONS & COMMERCIAL SUMMARY
Date: {date_str}
Recipient: Managing Director Sweety R
Headquarters: Tiruchirappalli, Tamil Nadu

--------------------------------------------------------------------------------

{output}

--------------------------------------------------------------------------------
End of Weekly Summary. Prepared by Operations Desk.
"""

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(full_report)

    print(f"Weekly summary saved to: {filepath}")
    
    subject = f"JSM Operations — Weekly Executive Summary ({date_str})"
    send_agent_report_email(subject, full_report)
    
    return filepath, full_report

if __name__ == "__main__":
    generate_executive_brief()
