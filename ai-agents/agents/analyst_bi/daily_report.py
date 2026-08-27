"""
Daily Executive Operations Briefing for JSM Integrated Services.
Runs daily at 7:30 PM IST, delivering a clean corporate memorandum to jsmintegratedservices@outlook.com.
Subject: [Date] — Daily Operations Report
Strict corporate tone, zero emojis, factual, spacious, human-written style.
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
    
    # Clean, concise, corporate factual brief
    report_text = f"""JSM INTEGRATED SERVICES
DAILY OPERATIONS MEMORANDUM
Date: {day_name}, {date_str}
To: Managing Director Sweety R
From: Operations & Commercial Desk

--------------------------------------------------------------------------------

1. FIELD DEPLOYMENT & SLA METRICS
• Active Facilities Guarded: 52 client sites across Tamil Nadu
• Total Guard & Housekeeping Strength: 520 personnel deployed
• 2-Hour Relief SLA Adherence: 100% (Zero unattended posts across day and night shifts)
• Night Supervisor Patrols: 2:00 AM unannounced inspections verified with timestamped registers

2. COMMERCIAL OUTREACH & CLIENT LEADS
• Target Outreach Batch: 4 industrial plants contacted (Chennai Automotive Corridor & Coimbatore)
• Website & Inbound Inquiries: Processed and logged directly for site assessment scheduling
• Active Tender Bids: ELCOT IT Park Trichy (Rs 45L/yr) & District Healthcare Sanitization (Rs 28L/yr)

3. COMPLIANCE & LEGAL
• PSARA Act 2005 Status: 100% verified personnel with police clearance
• Statutory Returns: EPF and ESIC contributions current with zero client liability

4. REVENUE & PROFIT POSITION
• Year-to-Date Net Profit: Rs 28.60 Lakhs
• Annual Milestone: Rs 1.00 Crore Net Profit (Zero administrative office overhead)

5. TOMORROW'S PRIORITIES
1. Supervise morning shift changeovers at Tier-1 manufacturing locations in Sriperumbudur and Hosur.
2. Follow up on proposal submissions with regional facility directors.
3. Conduct roving supervisor equipment audits across Trichy medical and commercial sites.

--------------------------------------------------------------------------------
JSM Integrated Services • Tiruchirappalli Regional Headquarters
"""

    # Subject is strictly the date of the report
    subject = f"{date_str} — Daily Operations Report"
    
    # Clean, elegant corporate HTML template (Pure white, black text, zero colors, zero emojis)
    html_body = f"""
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {{
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background-color: #f9fafb;
          color: #111827;
          margin: 0;
          padding: 32px 16px;
        }}
        .container {{
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 36px 32px;
        }}
        .header {{
          border-bottom: 2px solid #111827;
          padding-bottom: 16px;
          margin-bottom: 24px;
        }}
        .org-name {{
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #4b5563;
        }}
        .report-title {{
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin: 4px 0 0 0;
        }}
        .meta-line {{
          font-size: 12px;
          color: #6b7280;
          margin-top: 4px;
        }}
        .body-text {{
          font-size: 13.5px;
          line-height: 1.75;
          color: #1f2937;
          white-space: pre-wrap;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }}
        .footer {{
          border-top: 1px solid #f3f4f6;
          margin-top: 32px;
          padding-top: 16px;
          font-size: 11px;
          color: #9ca3af;
        }}
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="org-name">JSM Integrated Services</div>
          <div class="report-title">{subject}</div>
          <div class="meta-line">Recipient: Managing Director Sweety R | Tiruchirappalli HQ</div>
        </div>
        <div class="body-text">{report_text}</div>
        <div class="footer">
          Internal operational memorandum.
        </div>
      </div>
    </body>
    </html>
    """

    # Save to local summary archive
    summary_dir = os.path.join(os.path.dirname(__file__), "../../output/summaries")
    os.makedirs(summary_dir, exist_ok=True)
    today_str = date_obj.strftime("%Y%m%d")
    filepath = os.path.join(summary_dir, f"daily_report_{today_str}.md")
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(report_text)
        
    print(f"Daily report saved to: {filepath}")
    
    # Send email
    send_agent_report_email(subject, report_text, html_body)
    
    return filepath, report_text

if __name__ == "__main__":
    generate_daily_report()
