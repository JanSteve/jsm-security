"""
Monthly Strategic Operations & Revenue Review for JSM Integrated Services.
Runs on the 1st of every month at 7:30 PM IST.
Written in natural executive English (zero emojis, concise human memo format).
"""

import os
import sys
from datetime import datetime

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))
from integrations.ai_engine import call_ai
from integrations.email_client import send_agent_report_email

SYSTEM_PROMPT = """You are the Chief Operating Officer for JSM Integrated Services writing the Monthly Master Summary for Managing Director Sweety R.
Rules:
- Strictly NO emojis.
- Write like a professional C-level executive presenting a board-level monthly memorandum.
- Focus on operational milestones, workforce retention, margin health, and progress toward the 1 Crore Net Profit target.
- Keep tone direct, practical, and grounded in Tamil Nadu industrial realities.
"""

def generate_monthly_summary():
    print("Compiling Monthly Operations Summary...")
    
    current_month_str = datetime.now().strftime("%B %Y")
    
    prompt = f"""Draft the Monthly Strategic Review for {current_month_str} to Managing Director Sweety R.

Monthly Operational Benchmark:
- Total Deployed Personnel: 540 across 54 sites in Tamil Nadu
- 2-Hour Relief SLA Compliance: 99.6%
- Active B2B Lead Accounts: 120 targeted factory & healthcare prospects
- Active Tender Pipeline Value: Rs 1.45 Crores
- YTD Net Profit: Rs 34.20 Lakhs against Rs 1.00 Crore Annual Target

Structure the report clearly:
1. EXECUTIVE SUMMARY (High-level monthly milestone statement)
2. REGIONAL PERFORMANCE REVIEW (Trichy Central, Chennai IT & Industrial SEZ, Coimbatore Engineering Hub, Hosur Logistics Corridor)
3. STATUTORY COMPLIANCE & AUDIT HEALTH (PSARA verification records, EPF/ESI spotless returns, zero client labour disputes)
4. COMMERCIAL GROWTH & PROFIT MARGINS (Contract additions, billing consolidation savings, net profit trajectory)
5. STRATEGIC PRIORITIES FOR NEXT MONTH (Key focus areas for field operations and tender closures)

Keep formatting crisp and clean. No emojis.
"""
    summary_content = call_ai(prompt, SYSTEM_PROMPT)
    
    summary_dir = os.path.join(os.path.dirname(__file__), "../../output/summaries")
    os.makedirs(summary_dir, exist_ok=True)
    today_str = datetime.now().strftime("%Y%m")
    filepath = os.path.join(summary_dir, f"monthly_summary_{today_str}.md")
    
    full_report = f"""JSM INTEGRATED SERVICES
MONTHLY STRATEGIC OPERATIONS REVIEW — {current_month_str}
Recipient: Managing Director Sweety R
Headquarters: Tiruchirappalli, Tamil Nadu

--------------------------------------------------------------------------------

{summary_content}

--------------------------------------------------------------------------------
End of Monthly Review. Prepared by Operations Desk.
"""
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(full_report)
        
    print(f"Monthly summary saved to: {filepath}")
    
    subject = f"JSM Operations — Monthly Strategic Review ({current_month_str})"
    send_agent_report_email(subject, full_report)
    
    return filepath, full_report

if __name__ == "__main__":
    generate_monthly_summary()
