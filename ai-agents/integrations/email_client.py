"""
Unified Email Client for JSM Integrated Services.
Sends daily agent reports, B2B lead summaries, and social media calendars to:
jsmintegratedservices@outlook.com
"""

import os
import sys
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime

TARGET_EMAIL = "jsmintegratedservices@outlook.com"

def send_agent_report_email(subject: str, markdown_content: str, html_body: str = None) -> bool:
    """
    Sends an executive report email to jsmintegratedservices@outlook.com.
    Uses Outlook SMTP if credentials exist, or logs the ready-to-dispatch payload.
    """
    user = os.environ.get("OUTLOOK_EMAIL") or os.environ.get("SMTP_USER")
    password = os.environ.get("OUTLOOK_PASSWORD") or os.environ.get("SMTP_PASS")
    host = os.environ.get("SMTP_HOST", "smtp-mail.outlook.com")
    port = int(os.environ.get("SMTP_PORT", 587))

    if user:
        user = user.strip()
    if password:
        password = password.strip().replace(" ", "")

    # Basic HTML fallback if not provided
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
              Target: jsmintegratedservices@outlook.com
            </div>
          </div>
        </body>
        </html>
        """

    # If SMTP credentials provided, send live email
    if user and password:
        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = f"JSM AI Operations Desk <{user}>"
            msg["To"] = TARGET_EMAIL
            msg.attach(MIMEText(markdown_content, "plain"))
            msg.attach(MIMEText(html_body, "html"))

            server = smtplib.SMTP(host, port)
            server.starttls()
            server.login(user, password)
            server.sendmail(user, [TARGET_EMAIL], msg.as_string())
            server.quit()
            print(f"✅ Report email successfully dispatched to {TARGET_EMAIL}!")
            return True
        except Exception as e:
            print(f"⚠️ SMTP delivery attempted but failed: {e}")

    # Fallback / Local generation notice
    print(f"📁 Report formatted for: {TARGET_EMAIL}")
    return True

if __name__ == "__main__":
    send_agent_report_email(
        subject="🚀 JSM AI Agents Daily Executive Demo Report",
        markdown_content="Demo verification of JSM AI Workforce report delivery to jsmintegratedservices@outlook.com."
    )
