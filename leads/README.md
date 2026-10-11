# 📋 JSM Daily Leads Repository

This folder holds daily target leads for automated WhatsApp outreach executed via GitHub Actions.

## 📂 Supported Formats
You can upload either:
1. `leads/daily_leads.xlsx` (Standard Excel spreadsheet)
2. `leads/daily_leads.csv` (Comma Separated Values)

## 📊 Required Columns
Ensure your sheet contains the following headers in row 1:

| Column Header | Example Value | Description |
|---|---|---|
| `name` | Dr. Arul Nathan | Owner or Decision Maker's Name |
| `phone` | `9876543210` or `+919876543210` | Active WhatsApp phone number |
| `business` | Apollo Dental Care | Name of the shop, clinic, or business |
| `category` | `clinic`, `salon`, `restaurant`, `garage`, or `commercial` | Selects the personalized pitch message |
| `city` | Trichy or Chennai | Mentioned in the opening sentence |

---

## 🛡️ Anti-Spam Safeguards
1. **Deduplication:** Any number already listed in `leads/sent_history.json` will be automatically skipped.
2. **Safe Daily Cap:** Defaults to 30 contacts per run to protect your WhatsApp account from velocity blocks.
3. **Randomized Jitter:** Waits 8 to 16 seconds between each dispatch so sending patterns look natural.
