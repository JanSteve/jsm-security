"""
Executive Email Client for JSM Integrated Services.
Delivers clean, human-style operational memos and reports to jsmintegratedservices@outlook.com.
"""

import os
import sys
import json
import urllib.request
import smtplib
import certifi
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime

TARGET_EMAIL = "jsmintegratedservices@outlook.com"

def send_agent_report_email(subject: str, text_content: str, html_body: str = None) -> bool:
    """
    Sends clean, professional executive summaries to jsmintegratedservices@outlook.com.
    """
    # Clean executive HTML memo template (clean white background, sharp typography, zero emojis)
    if not html_body:
        html_body = f"""
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; color: #18181b; margin: 0; padding: 24px; }}
            .memo-container {{ max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e4e4e7; border-radius: 8px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }}
            .memo-header {{ border-bottom: 1px solid #e4e4e7; padding-bottom: 16px; margin-bottom: 20px; }}
            .company-name {{ font-size: 15px; font-weight: 700; color: #09090b; letter-spacing: 0.5px; text-transform: uppercase; }}
            .memo-title {{ font-size: 18px; font-weight: 700; color: #18181b; margin: 6px 0 0 0; }}
            .memo-meta {{ font-size: 12px; color: #71717a; margin-top: 6px; }}
            .memo-body {{ font-size: 14px; line-height: 1.65; color: #27272a; white-space: pre-wrap; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }}
            .memo-footer {{ border-top: 1px solid #f4f4f5; margin-top: 28px; padding-top: 14px; font-size: 12px; color: #a1a1aa; }}
          </style>
        </head>
        <body>
          <div class="memo-container">
            <div class="memo-header">
              <div class="company-name">JSM Integrated Services</div>
              <div class="memo-title">{subject}</div>
              <div class="memo-meta">To: Managing Director | Desk: Operations & Business Development</div>
            </div>
            <div class="memo-body">{text_content}</div>
            <div class="memo-footer">
              Confidential internal memorandum • Tiruchirappalli Headquarters
            </div>
          </div>
        </body>
        </html>
        """

    # 1. Try Resend API (Sender display: JSM Integrated Services)
    resend_key = os.environ.get("RESEND_API_KEY")
    if resend_key:
        try:
            req = urllib.request.Request(
                "https://api.resend.com/emails",
                data=json.dumps({
                    "from": "JSM Integrated Services <onboarding@resend.dev>",
                    "reply_to": TARGET_EMAIL,
                    "to": [TARGET_EMAIL],
                    "subject": subject,
                    "text": text_content,
                    "html": html_body
                }).encode("utf-8"),
                headers={
                    "Authorization": f"Bearer {resend_key.strip()}",
                    "Content-Type": "application/json",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
                }
            )
            ctx = ssl.create_default_context(cafile=certifi.where())
            with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
                res = json.loads(resp.read().decode("utf-8"))
                print(f"Delivered to {TARGET_EMAIL} via Resend (ID: {res.get('id')})")
                return True
        except Exception as e:
            print(f"Resend dispatch error: {e}")

    # 2. Try Gmail SMTP if provided
    gmail_user = os.environ.get("GMAIL_EMAIL") or os.environ.get("GMAIL_USER")
    gmail_pass = os.environ.get("GMAIL_APP_PASSWORD") or os.environ.get("GMAIL_PASS")
    if gmail_user and gmail_pass:
        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = f"JSM Integrated Services <{gmail_user}>"
            msg["To"] = TARGET_EMAIL
            msg.attach(MIMEText(text_content, "plain"))
            msg.attach(MIMEText(html_body, "html"))

            server = smtplib.SMTP("smtp.gmail.com", 587, timeout=20)
            server.starttls()
            server.login(gmail_user.strip(), gmail_pass.strip().replace(" ", ""))
            server.sendmail(gmail_user, [TARGET_EMAIL], msg.as_string())
            server.quit()
            print(f"Delivered to {TARGET_EMAIL} via Gmail SMTP")
            return True
        except Exception as e:
            print(f"Gmail SMTP error: {e}")

    # 3. Try Outlook SMTP
    outlook_user = (os.environ.get("OUTLOOK_EMAIL") or "").strip()
    outlook_pass = (os.environ.get("OUTLOOK_PASSWORD") or "").strip().replace(" ", "")
    if outlook_user and outlook_pass:
        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = f"JSM Integrated Services <{outlook_user}>"
            msg["To"] = TARGET_EMAIL
            msg.attach(MIMEText(text_content, "plain"))
            msg.attach(MIMEText(html_body, "html"))

            server = smtplib.SMTP("smtp-mail.outlook.com", 587, timeout=20)
            server.starttls()
            server.login(outlook_user, outlook_pass)
            server.sendmail(outlook_user, [TARGET_EMAIL], msg.as_string())
            server.quit()
            print(f"Delivered to {TARGET_EMAIL} via Outlook SMTP")
            return True
        except Exception as e:
            print(f"Outlook SMTP error: {e}")

    return False

if __name__ == "__main__":
    send_agent_report_email(
        subject="JSM Operations — Executive Summary Test",
        text_content="This is a clean executive summary test."
    )
