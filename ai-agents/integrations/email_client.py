"""
Corporate Email Client for JSM Integrated Services.
Strictly sends 1 clean, professional email per day to jsmintegratedservices@outlook.com.
Zero emojis, zero markdown asterisks (**), pure human corporate format.
"""

import os
import sys
import re
import json
import urllib.request
import certifi
import ssl

TARGET_EMAIL = "jsmintegratedservices@outlook.com"

def clean_text_formatting(raw_text: str) -> str:
    """
    Strips raw markdown syntax like **, __, ##, and ensures clean line breaks.
    """
    if not raw_text:
        return ""
    # Remove markdown bold/italic asterisks and underscores
    cleaned = re.sub(r"\*\*([^*]+)\*\*", r"\1", raw_text)
    cleaned = re.sub(r"__([^_]+)__", r"\1", cleaned)
    cleaned = re.sub(r"^#+\s*", "", cleaned, flags=re.MULTILINE)
    # Remove any emojis
    cleaned = re.sub(r"[\U00010000-\U0010ffff]", "", cleaned)
    cleaned = re.sub(r"[\u2600-\u27ff]", "", cleaned)
    # Normalize multiple line breaks to max 2
    cleaned = re.sub(r"\n{3,}", "\n\n", cleaned)
    return cleaned.strip()

def send_agent_report_email(subject: str, text_content: str, html_body: str = None) -> bool:
    """
    Dispatches a clean corporate executive briefing to jsmintegratedservices@outlook.com.
    """
    clean_text = clean_text_formatting(text_content)
    clean_subject = clean_text_formatting(subject)

    if not html_body:
        # Format clean HTML without markdown syntax
        html_paragraphs = clean_text.replace("\n\n", "<br><br>").replace("\n", "<br>")
        html_body = f"""
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {{
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
              background-color: #f8fafc;
              color: #0f172a;
              margin: 0;
              padding: 32px 16px;
            }}
            .container {{
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 6px;
              padding: 36px 32px;
              box-shadow: 0 1px 3px rgba(0,0,0,0.03);
            }}
            .header {{
              border-bottom: 2px solid #0f172a;
              padding-bottom: 14px;
              margin-bottom: 24px;
            }}
            .brand {{
              font-size: 12px;
              font-weight: 700;
              letter-spacing: 0.5px;
              text-transform: uppercase;
              color: #64748b;
            }}
            .title {{
              font-size: 17px;
              font-weight: 700;
              color: #0f172a;
              margin: 4px 0 0 0;
            }}
            .meta {{
              font-size: 12px;
              color: #94a3b8;
              margin-top: 4px;
            }}
            .content {{
              font-size: 13.5px;
              line-height: 1.7;
              color: #334155;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            }}
            .footer {{
              border-top: 1px solid #f1f5f9;
              margin-top: 32px;
              padding-top: 14px;
              font-size: 11px;
              color: #94a3b8;
            }}
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="brand">JSM Integrated Services</div>
              <div class="title">{clean_subject}</div>
              <div class="meta">Recipient: Managing Director Sweety R | Headquarters: Tiruchirappalli</div>
            </div>
            <div class="content">{html_paragraphs}</div>
            <div class="footer">
              Confidential internal operations memorandum.
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
                    "subject": clean_subject,
                    "text": clean_text,
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
