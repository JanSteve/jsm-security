"""
Agent 5: Analyst BI — Executive Operations & Revenue Intelligence Engine.
Runs every Saturday evening (7:00 PM - 8:00 PM IST), compiling the master weekly summary
for Managing Director Sweety R and delivering it to JsmIntegratedServices@outlook.com.
"""

import os
import sys
from datetime import datetime

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))
from integrations.ai_engine import call_ai
from integrations.email_client import send_agent_report_email

SYSTEM_PROMPT = """You are "Analyst BI", Chief Operating Intelligence Officer for JSM Integrated Services reporting directly to Managing Director Sweety R.
Financial Roadmap Target: ₹1 Crore (₹1,00,00,000) Net Annual Profit with ₹0 Human Office/Admin Overhead.
"""

def generate_executive_brief(metrics: dict = None):
    print("📈 Analyst BI Agent is analyzing weekly operations and revenue metrics...")
    
    if not metrics:
        metrics = {
            "active_client_facilities": 52,
            "deployed_workforce_count": 520,
            "sla_compliance_rate": "99.4%",
            "active_leads_pipeline": 14,
            "pipeline_potential_mrr": "₹18,50,000",
            "closed_deals_this_month": 3,
            "new_mrr_added": "₹4,20,000",
            "ytd_net_profit_accumulated": "₹28,60,000",
            "target_net_profit": "₹1,00,00,000 (₹1 Crore)"
        }

    date_str = datetime.now().strftime("%d %B %Y")

    prompt = f"""Generate a Comprehensive Saturday Weekly Executive Intelligence Summary for Managing Director Sweety R:

Current Performance Snapshot:
- Active Client Facilities: {metrics['active_client_facilities']}
- Total Deployed Guard & Staff Workforce: {metrics['deployed_workforce_count']} personnel
- SLA Fulfillment Rate: {metrics['sla_compliance_rate']}
- Active B2B Pipeline: {metrics['active_leads_pipeline']} deals ({metrics['pipeline_potential_mrr']} MRR)
- New Contracts Signed This Month: {metrics['closed_deals_this_month']} ({metrics['new_mrr_added']} added)
- Progress to ₹1 Crore Net Profit: {metrics['ytd_net_profit_accumulated']} / {metrics['target_net_profit']}

Deliver:
1. **Executive Financial Health Assessment**: Margin analysis and roadmap trajectory to ₹1 Crore.
2. **Top 3 High-Impact Operational Priorities for the upcoming week**: Focusing on industrial hubs in Chennai, Coimbatore, and Hosur.
3. **Risk Radar & Capacity Safeguards**: Ensuring 2-Hour Relief SLA is maintained during workforce scaling.
4. **Action Items for Head of Operations & Sales Desk**.
"""
    output = call_ai(prompt, SYSTEM_PROMPT)
    
    # Save into output/summaries folder
    summary_dir = os.path.join(os.path.dirname(__file__), "../../output/summaries")
    os.makedirs(summary_dir, exist_ok=True)
    today_str = datetime.now().strftime("%Y%m%d")
    filepath = os.path.join(summary_dir, f"weekly_summary_{today_str}.md")
    
    full_report = f"""# 📈 JSM WEEKLY EXECUTIVE SUMMARY ({date_str})
**Generated**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S IST')}
**Official Recipient**: JsmIntegratedServices@outlook.com
**Managing Director**: Sweety R | Tiruchirappalli Headquarters

---

{output}
"""

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(full_report)

    print(f"✅ Weekly summary saved locally to: {filepath}")
    
    # Send email
    subject = f"📈 [WEEKLY EXECUTIVE SUMMARY] JSM Integrated Services — {date_str}"
    send_agent_report_email(subject, full_report)
    
    return filepath, full_report

if __name__ == "__main__":
    generate_executive_brief()
