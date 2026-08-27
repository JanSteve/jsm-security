# 📘 JSM AI Agents — Zero-Cost Step-by-Step Setup Guide

Follow this guide to launch your 7 AI agents in under 15 minutes. Everything is **100% free forever** and requires **zero human employees**.

---

## 🔑 Step 1: Get Your Free AI Brain (Google Gemini API)

1. Open [https://aistudio.google.com/](https://aistudio.google.com/) in your browser.
2. Sign in with your Google account.
3. Click the blue **"Get API Key"** button at the top left.
4. Click **"Create API Key"** and copy the string (e.g., `AIzaSy...`).
5. *Free Allowance:* ~1,500 free requests every single day (more than enough for daily operations).

*(Optional Backup):* Sign up at [https://openrouter.ai/](https://openrouter.ai/) and create a free key to enable automatic failover.

---

## 📊 Step 2: Set Up Your Google Sheets CRM ("Command Center")

1. Open [Google Sheets](https://sheets.new) and create a spreadsheet titled: **`JSM AI Command Center`**.
2. Create these tabs along the bottom:
   - **`Leads`** (Columns: `Date`, `Name`, `Phone`, `Email`, `Company`, `Service`, `Location`, `Staff Count`, `Budget`, `Status`, `AI Summary`)
   - **`Outreach Log`** (Columns: `Date`, `Company`, `City`, `Industry`, `Contact`, `Email`, `Subject`, `Status`)
   - **`Content Calendar`** (Columns: `Date`, `Platform`, `Post Text`, `Visual Concept`, `Status`)
   - **`Tender Tracker`** (Columns: `Date`, `Title`, `Authority`, `Value`, `Deadline`, `Status`)
   - **`Weekly Dashboard`** (Columns: `Week`, `New Leads`, `Site Visits`, `Closed Deals`, `MRR Added`)

---

## 🤖 Step 3: Deploy Priya (24/7 AI Receptionist)

1. In your Google Sheet, click **Extensions > Apps Script**.
2. Delete everything inside the editor.
3. Open `agents/priya_sales_receptionist/google_apps_script.js` from this repo, copy all code, and paste it into the editor.
4. Replace `"YOUR_GEMINI_API_KEY_HERE"` on line 13 with your actual Gemini API key.
5. Click **Deploy (top right) > New Deployment**:
   - Select type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy**, authorize permissions with your Google account, and copy the **Web App URL**.
7. *To add to your website:* Open `agents/priya_sales_receptionist/website_widget_snippet.html`, replace `YOUR_APPS_SCRIPT_WEBAPP_URL` with your URL, and paste it before `</body>` in your website code.

---

## ⚡ Step 4: Enable Automated Cloud Cron Workers (GitHub Actions)

Your repository includes GitHub Actions workflows that run the Python AI agents on a schedule completely free in the cloud:

1. Open your GitHub Repository: `https://github.com/richyexports82-cloud/jsm-ai-agents`
2. Click **Settings > Secrets and variables > Actions > New repository secret**.
3. Add these secrets:
   - `GEMINI_API_KEY` : (Your Google Gemini API Key)
   - `OPENROUTER_API_KEY` : (Your OpenRouter Key, or leave empty if only using Gemini)
   - `ALERT_EMAIL` : `jsmintegratedservices@outlook.com`
4. Click **Actions** tab in GitHub to see your automated workers:
   - **Daily AI Lead Hunter:** Runs daily at 10:00 AM IST.
   - **Weekly AI Social Content:** Runs Mondays at 7:00 AM IST.
   - **Tender Hawk Monitor:** Runs every 12 hours.

---

## 🎯 Step 5: Start Scaling to ₹1 Crore

1. **Daily Leads:** Review generated proposals in the `output/` folder or Google Sheet.
2. **Instant Follow-ups:** Priya will automatically qualify website visitors and email you hot leads immediately.
3. **Local SEO Dominance:** Post the generated Google Business Profile updates weekly to maintain the #1 map ranking in Trichy, Chennai, and Coimbatore.
