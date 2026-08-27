import os
import sys
import smtplib
import socket

user = os.environ.get("OUTLOOK_EMAIL", "JsmIntegratedServices@outlook.com").strip()
password = os.environ.get("OUTLOOK_PASSWORD", "").strip().replace(" ", "")

print(f"Testing SMTP connection to smtp-mail.outlook.com:587 for user: {user}...")

try:
    s = smtplib.SMTP("smtp-mail.outlook.com", 587, timeout=10)
    s.set_debuglevel(1)
    s.ehlo()
    s.starttls()
    s.ehlo()
    if password:
        s.login(user, password)
        print("🎉 SUCCESS: Logged in to Outlook SMTP!")
    else:
        print("ℹ️ No password provided in local environment.")
    s.quit()
except Exception as e:
    print(f"❌ SMTP Error: {e}")
