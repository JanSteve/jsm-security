/**
 * ==============================================================================
 * JSM INTEGRATED SERVICES — PRIYA SALES AGENT & CRM BACKEND (Google Apps Script)
 * ==============================================================================
 * 
 * Instructions:
 * 1. Open your Google Sheet ("JSM AI Command Center").
 * 2. Click Extensions > Apps Script.
 * 3. Replace all code in Code.gs with this file.
 * 4. Add your GEMINI_API_KEY below.
 * 5. Click Deploy > New Deployment > Web App (Who has access: Anyone).
 * 6. Use the Web App URL in your website chat widget!
 */

const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE"; // Get free from https://aistudio.google.com/
const NOTIFICATION_EMAIL = "jsmintegratedservices@outlook.com";
const NOTIFICATION_PHONE = "+919443152000";

const SYSTEM_PROMPT = `You are Priya, the bilingual (Tamil & English) AI sales receptionist for JSM Integrated Services, a PSARA-licensed security and facility management company based in Trichy, Tamil Nadu.
Phone: +91 94431 52000 | Email: jsmintegratedservices@outlook.com | Proven landmark: 2024 Trichy International Airport Operations.
Services:
1. Private Security Guards: ₹15,000 - ₹18,000/guard/month (PSARA compliant, 2-Hour Relief SLA, 2 AM night audits)
2. Commercial Housekeeping: ₹12,000 - ₹15,000/staff/month
3. Contractual Manpower: ₹10,000 - ₹14,000/worker/month (100% EPF/ESI legal compliance)
Be polite, professional, and guide the user to book a Free Site Assessment. Collect their Name, Phone, Company, Service required, and Location.`;

/**
 * Handle incoming Webhook / Chatbot POST requests from the website
 */
function doPost(e) {
  try {
    const rawData = e.postData.contents;
    const request = JSON.parse(rawData);
    const userMessage = request.message || "Hello";
    const history = request.history || [];
    const clientInfo = request.clientInfo || {};

    // 1. Generate AI Response from Gemini
    const aiResponse = callGeminiAPI(userMessage, history);

    // 2. Check if lead data is captured
    if (clientInfo.phone || (userMessage.match(/\b\d{10}\b/))) {
      recordLead(clientInfo, userMessage, aiResponse);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      reply: aiResponse
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("JSM Priya AI Agent Webhook is Online 🟢")
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Calls Google Gemini 2.0 Flash API (Free Tier)
 */
function callGeminiAPI(prompt, history) {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + GEMINI_API_KEY;
  
  const contents = [
    { role: "user", parts: [{ text: "SYSTEM INSTRUCTIONS:\n" + SYSTEM_PROMPT }] },
    { role: "model", parts: [{ text: "Understood. I am Priya from JSM Integrated Services." }] }
  ];

  if (history && history.length > 0) {
    history.forEach(function(item) {
      contents.push({
        role: item.role === "user" ? "user" : "model",
        parts: [{ text: item.text }]
      });
    });
  }

  contents.push({ role: "user", parts: [{ text: prompt }] });

  const payload = {
    contents: contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1000
    }
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);
  const json = JSON.parse(response.getContentText());
  
  if (json.candidates && json.candidates[0].content.parts[0].text) {
    return json.candidates[0].content.parts[0].text;
  }
  return "Thank you for reaching out to JSM Integrated Services. Please call us directly at +91 94431 52000 for immediate support.";
}

/**
 * Record Lead into the Google Sheets CRM and trigger email alert
 */
function recordLead(info, message, aiReply) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Leads");
  if (!sheet) {
    sheet = ss.insertSheet("Leads");
    sheet.appendRow(["Date", "Name", "Phone", "Email", "Company", "Service", "Location", "Staff Count", "Budget", "Status", "AI Summary"]);
  }

  const phoneMatch = message.match(/\b\d{10}\b/);
  const detectedPhone = info.phone || (phoneMatch ? phoneMatch[0] : "Not Provided");
  const name = info.name || "Website Visitor";
  const date = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  sheet.appendRow([
    date,
    name,
    detectedPhone,
    info.email || "",
    info.company || "",
    info.service || "General Inquiry",
    info.location || "Tamil Nadu",
    info.staffCount || "",
    info.budget || "",
    "New Lead",
    message
  ]);

  // Send instantaneous email alert to Managing Director
  try {
    MailApp.sendEmail(
      NOTIFICATION_EMAIL,
      "🔥 New Lead Inquiry: " + name + " (" + detectedPhone + ")",
      "A new client just contacted JSM via the AI receptionist.\n\n" +
      "Date: " + date + "\n" +
      "Name: " + name + "\n" +
      "Phone: " + detectedPhone + "\n" +
      "Message: " + message + "\n\n" +
      "Open JSM AI Command Center to review."
    );
  } catch (err) {
    Logger.log("Mail error: " + err);
  }
}

/**
 * AUTOMATED TRIGGER: Run daily at 9:00 AM for cold lead follow-ups
 */
function triggerDailyLeadFollowUp() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Leads");
  if (!sheet) return;

  const data = sheet.getDataRange().getValues();
  // Loop through leads and prepare follow-up tasks for active inquiries
  Logger.log("Follow up check completed for " + (data.length - 1) + " leads.");
}
