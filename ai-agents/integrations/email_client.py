"""
Executive Email Client for JSM Integrated Services.
Delivers short, crisp, fact-based summaries to jsmintegratedservices@outlook.com.
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
    Sends ultra-crisp, spacious executive summaries to jsmintegratedservices@outlook.com.
    """
    if not html_body:
        html_body = f"""
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 32px 16px; }}
            .container {{ max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 36px 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }}
            .header {{ border-bottom: 2px solid #0f172a; padding-bottom: 14px; margin-bottom: 24px; }}
            .brand {{ font-size: 13px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: #64748b; }}
            .title {{ font-size: 19px; font-weight: 800; color: #0f172a; margin: 4px 0 0 0; }}
            .meta {{ font-size: 12px; color: #94a3b8; margin-top: 4px; }}
            .content {{ font-size: 14px; line-height: 1.8; color: #334155; white-space: pre-wrap; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }}
            .footer {{ border-top: 1px solid #f1f5f9; margin-top: 32px; padding-top: 16px; font-size: 11px; color: #94a3b8; text-align: left; }}
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="brand">JSM Integrated Services</div>
              <div class="title">{subject}</div>
              <div class="meta">Recipient: Managing Director Sweety R | Tiruchirappalli HQ</div>
            </div>
            <div class="content">{text_content}</div>
            <div class="footer">
              Confidential internal operational update.
            </div>
          </div>
        </body>
        </html>
        """

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

    return False

if __name__ == "__main__":
    send_agent_report_email(
        subject="JSM Operations — Executive Summary Test",
        text_content="Clean executive summary."
    )
