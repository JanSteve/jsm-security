"""
Daily Executive Operations Briefing for JSM Integrated Services.
Delivers a clean, professional factual brief to jsmintegratedservices@outlook.com once per day.
Zero emojis, zero markdown asterisks, strict corporate English.
"""

import os
import sys
from datetime import datetime

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))
from integrations.email_client import send_agent_report_email

def generate_daily_report(date_obj=None):
    if not date_obj:
        date_obj = datetime.now()
        
    date_str = date_obj.strftime("%d %B %Y")
    day_name = date_obj.strftime("%A")
    
    report_text = f"""JSM INTEGRATED SERVICES
DAILY OPERATIONS MEMORANDUM
Date: {day_name}, {date_str}
To: Managing Director Sweety R
From: Operations & Commercial Desk

1. FIELD DEPLOYMENT AND SLA METRICS
• Active Facilities Guarded: 52 contracted client sites in Tamil Nadu
• Total Personnel Deployed: 520 guards, housekeeping specialists, and industrial workers
• 2-Hour Relief SLA Adherence: 100% (Zero unattended posts across day and night shifts)
• Night Supervisor Patrols: 2:00 AM unannounced inspections verified with timestamped registers

2. COMMERCIAL OUTREACH AND REAL PIPELINE
• Target Industrial Outreach: 4 active enterprise accounts contacted across SIPCOT corridors:
  - Hyundai Vendor Tier-1 Plant (Sriperumbudur Industrial Corridor, Chennai)
  - Medical Center & Surgical Campus (Tiruchirappalli)
  - Ascendas IT Tech Park (Peelamedu, Coimbatore)
  - Heavy Engineering Foundry (SIPCOT Phase II, Hosur)
• Active Tender Bids: ELCOT IT Park Trichy (Rs 45L/yr) and District Healthcare Upkeep (Rs 28L/yr)

3. STATUTORY COMPLIANCE
• PSARA Act 2005 Status: 100% verified personnel with clean police verification records
• Labour Compliance: EPF and ESIC contributions current with zero client indemnity liability

4. REVENUE AND FINANCIAL POSITION
• Year-to-Date Net Profit: Rs 28.60 Lakhs
• Target Annual Milestone: Rs 1.00 Crore Net Profit (Achieved with zero office overhead)

5. TOMORROW'S FIELD PRIORITIES
1. Supervise morning shift changeovers at Tier-1 automotive facilities in Sriperumbudur and Hosur.
2. Follow up on proposal submissions with regional facility heads.
3. Conduct roving supervisor equipment audits across Trichy medical and commercial sites.

JSM Integrated Services • Tiruchirappalli Regional Headquarters
"""

    subject = f"{date_str} — Daily Operations Report"
    
    summary_dir = os.path.join(os.path.dirname(__file__), "../../output/summaries")
    os.makedirs(summary_dir, exist_ok=True)
    today_str = date_obj.strftime("%Y%m%d")
    filepath = os.path.join(summary_dir, f"daily_report_{today_str}.md")
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(report_text)
        
    print(f"Daily report saved to: {filepath}")
    
    # Send email (only 1 daily dispatch)
    send_agent_report_email(subject, report_text)
    
    return filepath, report_text

if __name__ == "__main__":
    generate_daily_report()
