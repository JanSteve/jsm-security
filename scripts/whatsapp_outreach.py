#!/usr/bin/env python3
"""
JSM Integrated Services - WhatsApp Automated Outreach Engine
Designed for GitHub Actions Workflow & Local Terminal Execution.

Supports:
1. UltraMsg / Whapi / Gateway APIs (Telegram-style simple bot token)
2. Meta Official WhatsApp Cloud API (Enterprise template messages)
3. Dry-Run / Test Mode (Validates phone numbers & templates without sending)
"""

import os
import sys
import json
import time
import random
import csv
from datetime import datetime

# Optional dependency check for openpyxl (Excel parsing)
try:
    import openpyxl
    HAS_OPENPYXL = True
except ImportError:
    HAS_OPENPYXL = False

try:
    import requests
    HAS_REQUESTS = True
except ImportError:
    HAS_REQUESTS = False


def clean_phone_number(raw_phone: str) -> str:
    """Sanitizes raw phone numbers into clean international E.164 format for India (+91)."""
    if not raw_phone:
        return ""
    digits = "".join(ch for ch in str(raw_phone) if ch.isdigit())
    
    # 10-digit Indian mobile number
    if len(digits) == 10:
        return f"+91{digits}"
    # 12-digit Indian number starting with 91
    if len(digits) == 12 and digits.startswith("91"):
        return f"+{digits}"
    # 11-digit starting with 0
    if len(digits) == 11 and digits.startswith("0"):
        return f"+91{digits[1:]}"
    # Already has country code
    if len(digits) >= 10:
        return f"+{digits}"
    return ""


def load_sent_history(history_file: str) -> dict:
    """Loads previous outreach history to prevent spamming the same number twice."""
    if os.path.exists(history_file):
        try:
            with open(history_file, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"[WARN] Could not parse {history_file}: {e}. Creating new log.")
    return {}


def save_sent_history(history_file: str, history: dict):
    """Saves updated outreach history back to disk."""
    os.makedirs(os.path.dirname(history_file) or ".", exist_ok=True)
    with open(history_file, "w", encoding="utf-8") as f:
        json.dump(history, f, indent=2, ensure_ascii=False)


def load_leads(leads_file: str) -> list:
    """Reads leads from Excel (.xlsx) or CSV (.csv)."""
    leads = []
    if not os.path.exists(leads_file):
        print(f"[ERROR] Leads file not found at: {leads_file}")
        return leads

    if leads_file.endswith(".xlsx"):
        if not HAS_OPENPYXL:
            raise RuntimeError("openpyxl is required to read .xlsx files. Run: pip install openpyxl")
        wb = openpyxl.load_workbook(leads_file)
        sheet = wb.active
        headers = [str(cell.value or "").strip().lower() for cell in sheet[1]]
        
        for row in sheet.iter_rows(min_row=2, values_only=True):
            if not any(row):
                continue
            item = dict(zip(headers, row))
            leads.append(item)
    else:
        # Standard CSV
        with open(leads_file, "r", encoding="utf-8-sig") as f:
            reader = csv.DictReader(f)
            for row in reader:
                leads.append({k.strip().lower(): (v or "").strip() for k, v in row.items()})

    return leads


def craft_conversational_message(lead: dict) -> str:
    """
    Crafts an engaging, non-pushy Tamil Nadu B2B cold message designed
    to spark an instant reply and start a warm conversation.
    """
    name = lead.get("name") or lead.get("owner_name") or "Sir / Madam"
    business = lead.get("business") or lead.get("business_name") or lead.get("company") or "your business"
    city = lead.get("city") or "Trichy / Chennai"
    category = (lead.get("category") or lead.get("industry") or "").lower()

    if "clinic" in category or "doctor" in category or "hospital" in category:
        return (
            f"Vanakkam Dr. / Manager ({business}),\n\n"
            f"I came across your clinic in {city}. We recently developed a live **WhatsApp Clinic Waiting Token Tracker** "
            f"that lets patients check their live queue status on their phone instead of crowding reception.\n\n"
            f"It saves receptionists from answering 50+ 'when is my turn?' calls every day.\n\n"
            f"Would it be helpful if I share a 1-minute video demo of how it works on WhatsApp?\n\n"
            f"— Jan Steve Daniel | CTO, JSM Integrated Services (Trichy & Chennai)\n"
            f"🌐 jsmintegratedservices.com"
        )
    elif "restaurant" in category or "cafe" in category or "food" in category:
        return (
            f"Vanakkam {name} ({business}),\n\n"
            f"Hope you are having a busy week! Quick question: are you currently paying 28–30% commissions on Swiggy & Zomato?\n\n"
            f"We set up a **Zero-Commission WhatsApp QR Menu** for local restaurants in {city} where customers can scan the table QR, "
            f"order on WhatsApp, and pay directly to your UPI.\n\n"
            f"Shall I send you a 45-second demo link to test it on your phone?\n\n"
            f"— Jan Steve Daniel | CTO, JSM Integrated Services\n"
            f"🌐 jsmintegratedservices.com"
        )
    elif "salon" in category or "spa" in category or "garage" in category or "retail" in category:
        return (
            f"Vanakkam {name} ({business}),\n\n"
            f"We noticed your business profile in {city}. We developed a **Smart Review Filter NFC Standee** for counter desks.\n\n"
            f"When happy customers tap it, it opens Google Maps for 5-star reviews. If a customer is unhappy (1–3 stars), "
            f"it privately routes their complaint directly to your personal WhatsApp so your Google rating stays protected at 4.9⭐.\n\n"
            f"Would you like to see a quick photo demo of the standee?\n\n"
            f"— Jan Steve Daniel | CTO, JSM Integrated Services\n"
            f"🌐 jsmintegratedservices.com"
        )
    else:
        # General B2B Commercial & Security / Facilities
        return (
            f"Vanakkam {name},\n\n"
            f"Reaching out from JSM Integrated Services ({city}). We provide 100% EPF/ESIC compliant commercial security guard Platoons, "
            f"facility housekeeping, and modern WhatsApp business automations for top enterprises across Tamil Nadu.\n\n"
            f"If {business} is looking to optimize facility costs or automate customer enquiries, may I share our 1-page company rate card with you?\n\n"
            f"— Jan Steve Daniel | CTO, JSM Integrated Services\n"
            f"📞 +91 90808 63448 | 🌐 jsmintegratedservices.com"
        )


def send_via_ultramsg(phone: str, message: str, instance_id: str, token: str) -> bool:
    """Sends message using UltraMsg WhatsApp API gateway."""
    if not HAS_REQUESTS:
        raise RuntimeError("requests library is required. Run: pip install requests")
    
    clean_num = phone.replace("+", "")
    url = f"https://api.ultramsg.com/{instance_id}/messages/chat"
    payload = {
        "token": token,
        "to": clean_num,
        "body": message
    }
    headers = {"content-type": "application/x-www-form-urlencoded"}
    res = requests.post(url, data=payload, headers=headers, timeout=15)
    if res.status_code == 200 and res.json().get("sent") in ("true", True):
        return True
    print(f"[FAIL] UltraMsg error: {res.text}")
    return False


def send_via_meta_cloud(phone: str, lead: dict, phone_number_id: str, token: str, template_name: str) -> bool:
    """Sends an official approved marketing/utility template via Meta Cloud API."""
    if not HAS_REQUESTS:
        raise RuntimeError("requests library is required. Run: pip install requests")
    
    clean_num = phone.replace("+", "")
    url = f"https://graph.facebook.com/v20.0/{phone_number_id}/messages"
    
    name = lead.get("name") or "Partner"
    business = lead.get("business") or lead.get("business_name") or "Business"

    payload = {
        "messaging_product": "whatsapp",
        "to": clean_num,
        "type": "template",
        "template": {
            "name": template_name,
            "language": {"code": "en"},
            "components": [
                {
                    "type": "body",
                    "parameters": [
                        {"type": "text", "text": name},
                        {"type": "text", "text": business}
                    ]
                }
            ]
        }
    }
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    res = requests.post(url, json=payload, headers=headers, timeout=15)
    if res.status_code in (200, 201):
        return True
    print(f"[FAIL] Meta Cloud API error: {res.text}")
    return False


def main():
    print("=" * 65)
    print("🚀 JSM Integrated Services - WhatsApp Automated Outreach")
    print("=" * 65)

    leads_file = os.environ.get("LEADS_FILE", "leads/daily_leads.csv")
    history_file = os.environ.get("HISTORY_FILE", "leads/sent_history.json")
    provider = os.environ.get("PROVIDER", "dry_run").lower()
    daily_limit = int(os.environ.get("DAILY_LIMIT", "30"))
    min_delay = int(os.environ.get("MIN_DELAY_SECONDS", "8"))
    max_delay = int(os.environ.get("MAX_DELAY_SECONDS", "16"))

    print(f"📂 Leads File:    {leads_file}")
    print(f"⚙️ Provider:      {provider.upper()}")
    print(f"🎯 Daily Cap:     {daily_limit} contacts")
    print(f"⏱️ Delay Window:  {min_delay}s to {max_delay}s (Anti-Spam Jitter)")
    print("-" * 65)

    if not os.path.exists(leads_file):
        print(f"[ERROR] File not found: {leads_file}")
        print("Please upload your daily leads file to the 'leads/' directory.")
        sys.exit(1)

    leads = load_leads(leads_file)
    print(f"📊 Found {len(leads)} total rows in {leads_file}.")

    history = load_sent_history(history_file)
    sent_today = 0
    skipped_existing = 0
    failed = 0

    for idx, lead in enumerate(leads, start=1):
        if sent_today >= daily_limit:
            print(f"🛑 Reached daily limit cap ({daily_limit}). Stopping batch for safety.")
            break

        raw_phone = lead.get("phone") or lead.get("mobile") or lead.get("whatsapp") or lead.get("contact")
        phone = clean_phone_number(raw_phone)

        if not phone:
            print(f"[SKIP #{idx}] Missing or invalid phone: {raw_phone}")
            continue

        if phone in history:
            skipped_existing += 1
            continue

        message = craft_conversational_message(lead)
        name = lead.get("name") or lead.get("business") or "Contact"

        print(f"\n[{sent_today + 1}/{daily_limit}] Preparing message for {name} ({phone})...")

        success = False
        if provider == "dry_run":
            print(f"🧪 [DRY RUN SIMULATION] Message Preview:\n{'-'*40}\n{message}\n{'-'*40}")
            success = True
        elif provider == "ultramsg":
            instance_id = os.environ.get("ULTRAMSG_INSTANCE_ID")
            token = os.environ.get("ULTRAMSG_TOKEN")
            if not instance_id or not token:
                print("[ERROR] ULTRAMSG_INSTANCE_ID and ULTRAMSG_TOKEN environment variables required!")
                sys.exit(1)
            success = send_via_ultramsg(phone, message, instance_id, token)
        elif provider == "meta":
            phone_id = os.environ.get("META_PHONE_NUMBER_ID")
            token = os.environ.get("META_WA_TOKEN")
            template = os.environ.get("META_TEMPLATE_NAME", "jsm_lead_intro")
            if not phone_id or not token:
                print("[ERROR] META_PHONE_NUMBER_ID and META_WA_TOKEN environment variables required!")
                sys.exit(1)
            success = send_via_meta_cloud(phone, lead, phone_id, token, template)
        else:
            print(f"[ERROR] Unknown provider: {provider}. Options: dry_run, ultramsg, meta.")
            sys.exit(1)

        if success:
            sent_today += 1
            history[phone] = {
                "name": name,
                "business": lead.get("business") or "",
                "category": lead.get("category") or "",
                "sent_at": datetime.now().isoformat(),
                "status": "SENT",
                "provider": provider
            }
            save_sent_history(history_file, history)
            print(f"✅ Successfully dispatched to {phone}")

            # Humanized jitter delay to prevent spam velocity flags
            if sent_today < daily_limit:
                jitter = random.randint(min_delay, max_delay)
                print(f"⏳ Waiting {jitter}s anti-spam jitter before next message...")
                time.sleep(jitter)
        else:
            failed += 1
            print(f"❌ Failed sending to {phone}")

    print("\n" + "=" * 65)
    print("📊 BATCH SUMMARY")
    print(f"• Successfully Dispatched: {sent_today}")
    print(f"• Previously Contacted:    {skipped_existing} (Skipped)")
    print(f"• Failures:                {failed}")
    print(f"• History Saved:           {history_file}")
    print("=" * 65)


if __name__ == "__main__":
    main()
