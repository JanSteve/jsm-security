"""
Unified Email Client for JSM Integrated Services.
Sends daily agent reports, B2B lead summaries, and social media calendars to:
JsmIntegratedServices@outlook.com
"""

import os
import sys
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime

TARGET_EMAIL = "JsmIntegratedServices@outlook.com"

def send_agent_report_email(subject: str, markdown_content: str, html_body: str = None) -> bool:
    """
    Sends an executive report email to JsmIntegratedServices@outlook.com.
    Uses Outlook SMTP with verbose diagnostics.
    """
    user = (os.environ.get("OUTLOOK_EMAIL") or os.environ.get("SMTP_USER") or "").strip()
    password = (os.environ.get("OUTLOOK_PASSWORD") or os.environ.get("SMTP_PASS") or "").strip().replace(" ", "")
    host = os.environ.get("SMTP_HOST", "smtp-mail.outlook.com")
    port = int(os.environ.get("SMTP_PORT", 587))

    print(f"📧 Preparing to dispatch report email...")
    print(f"   Target: {TARGET_EMAIL}")
    print(f"   SMTP Host: {host}:{port}")
    print(f"   SMTP User: {user if user else 'NOT SET'}")
    print(f"   Password Length: {len(password)} chars (hidden)")

    if not user or not password:
        print("⚠️ Missing OUTLOOK_EMAIL or OUTLOOK_PASSWORD environment variable!")
        return False

    # HTML Email Template
    if not html_body:
        html_body = f"""
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0A1628; color: #ffffff; padding: 20px; }}
            .card {{ max-width: 680px; margin: 0 auto; background: #0f1c30; border: 1px solid #C5A880; border-radius: 16px; padding: 28px; box-shadow: 0 12px 36px rgba(0,0,0,0.5); }}
            .header {{ border-bottom: 2px solid #C5A880; padding-bottom: 14px; margin-bottom: 20px; }}
            .header h1 {{ color: #ffffff; margin: 0; font-size: 20px; font-weight: 800; }}
            .header p {{ color: #C5A880; margin: 4px 0 0 0; font-size: 12px; font-weight: bold; text-transform: uppercase; }}
            .content {{ line-height: 1.6; font-size: 14px; color: #e2e8f0; white-space: pre-wrap; }}
            .footer {{ border-top: 1px solid #1e293b; margin-top: 24px; padding-top: 14px; font-size: 11px; color: #94a3b8; text-align: center; }}
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1>🏛️ JSM AUTONOMOUS AI WORKFORCE REPORT</h1>
              <p>Daily Operations, B2B Leads & Social Intelligence</p>
            </div>
            <div class="content">{markdown_content}</div>
            <div class="footer">
              Generated automatically by JSM AI Digital Workforce • Tiruchirappalli HQ<br>
              Target: {TARGET_EMAIL}
            </div>
          </div>
        </body>
        </html>
        """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"JSM Operations Desk <{user}>"
    msg["To"] = TARGET_EMAIL
    msg.attach(MIMEText(markdown_content, "plain"))
    msg.attach(MIMEText(html_body, "html"))

    try:
        print(f"🔌 Connecting to {host}:{port}...")
        server = smtplib.SMTP(host, port, timeout=20)
        server.set_debuglevel(1)
        server.ehlo()
        server.starttls()
        server.ehlo()
        
        print(f"🔐 Authenticating with Microsoft as {user}...")
        server.login(user, password)
        
        print(f"🚀 Sending message to {TARGET_EMAIL}...")
        server.sendmail(user, [TARGET_EMAIL], msg.as_string())
        server.quit()
        
        print(f"🎉 SUCCESS: Report email delivered to {TARGET_EMAIL}!")
        return True
    except Exception as e:
        print(f"❌ SMTP Error occurred: {e}")
        raise e

if __name__ == "__main__":
    send_agent_report_email(
        subject="🚀 JSM AI Agents Daily Executive Demo Report",
        markdown_content="Demo verification of JSM AI Workforce report delivery."
    )
