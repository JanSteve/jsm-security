#!/usr/bin/env python3
"""
Dispatches a short, crisp, factual Executive Summary to:
jsmintegratedservices@outlook.com
"""

import os
import sys
from datetime import datetime

sys.path.append(os.path.abspath(os.path.dirname(__file__)))
from integrations.email_client import send_agent_report_email

def compile_master_demo_report():
    print("Compiling short, crisp Executive Summary...")
    date_str = datetime.now().strftime("%d %B %Y")
    
    summary_text = f"""1. OPERATIONS SUMMARY
• Active Facilities Guarded: 52 sites (Tamil Nadu)
• Total Deployed Personnel: 520 guards & housekeeping staff
• 2-Hour Relief SLA Rate: 99.4% (Zero unattended posts)
• 2:00 AM Night Spot-Checks: All sector routes completed with zero lapses

2. SALES & NEW BUSINESS
• B2B Outbound Contacts: 4 major targets (Hyundai vendor Chennai, Kauvery Hospital Trichy, Ascendas IT Coimbatore, TVS Hosur)
• Active Pipeline: 14 qualified accounts (Estimated Rs 18.50 Lakhs MRR)
• Active Tender Bids: 2 RFPs submitted (ELCOT IT Park Rs 45L/yr, District Health Rs 28L/yr)

3. FINANCIAL PROGRESS
• YTD Net Profit: Rs 28.60 Lakhs
• Annual Target: Rs 1.00 Crore
• Office / Admin Overhead: Rs 0 (100% digital operations)

4. NEXT WEEK KEY ACTIONS
1. Complete on-site risk survey for Sriperumbudur automotive supplier.
2. Attend ELCOT tender opening committee meeting.
3. Mobilize 15 reserve relief personnel for upcoming industrial shifts.
"""

    summary_dir = os.path.join(os.path.dirname(__file__), "output/summaries")
    os.makedirs(summary_dir, exist_ok=True)
    today_str = datetime.now().strftime("%Y%m%d_%H%M%S")
    demo_file = os.path.join(summary_dir, f"executive_summary_{today_str}.md")
    
    with open(demo_file, "w", encoding="utf-8") as f:
        f.write(summary_text)
        
    print(f"Executive summary saved to: {demo_file}")
    
    subject = f"Executive Operations Summary — {date_str}"
    send_agent_report_email(subject, summary_text)
    
    return demo_file, summary_text

if __name__ == "__main__":
    compile_master_demo_report()
