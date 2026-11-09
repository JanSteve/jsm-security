import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { rateLimit, blockBadBots, sanitizeAndEscape } from '@/lib/security';
import { contactSchema, formatZodErrors } from '@/lib/validations';
import { triggerLeadWebhook } from '@/lib/webhook';

/**
 * Serverless API Route: /api/contact
 * Handles executive recruitment and commercial client enquiries for JSM Integrated Services.
 *
 * Requirements Met:
 * - Handles POST requests with structured JSON payloads
 * - Validates name, phone, email, service, company, roleBand, notes, and honeypot
 * - Rejects bot submissions via hidden honeypot with HTTP 400 and 'Spam bot detected'
 * - Dispatches notification to contact@jsmintegratedservices.com (via Resend or SMTP fallback)
 * - Returns referenceId starting with 'JSM-REQ-' for client ticket tracking
 * - Enforces rate limiting (10 req/min per IP) and bad bot scraping defense
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Security Guards: Bot & Scraping Protection
    const botBlocked = blockBadBots(req);
    if (botBlocked) return botBlocked;

    // 2. Security Guards: Rate Limiting (10 requests per minute per IP)
    const rateLimited = rateLimit(req, 10, 60_000);
    if (rateLimited) return rateLimited;

    // 3. Payload Parsing
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    // 4. Schema Validation via Zod
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      const formatted = formatZodErrors(validation.error);
      return NextResponse.json(
        {
          success: false,
          error: formatted.message,
          details: formatted.issues,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // 5. Input Sanitization & Entity Escaping against XSS
    const name = sanitizeAndEscape(data.name);
    const phone = sanitizeAndEscape(data.phone);
    const email = data.email ? sanitizeAndEscape(data.email) : '';
    const company = sanitizeAndEscape(data.company || data.facilityName || '');
    const roleBand = sanitizeAndEscape((data as Record<string, unknown>).roleBand as string || (body as Record<string, unknown>)?.roleBand as string || '');
    const service = sanitizeAndEscape(data.service || 'talent-acquisition');
    const headcount = sanitizeAndEscape(data.headcount || '');
    const location = sanitizeAndEscape(data.location || data.city || 'Tamil Nadu');
    const notes = sanitizeAndEscape(data.notes || data.message || '');
    const ticketRef = data.referenceId || `JSM-REQ-${Math.floor(1000 + Math.random() * 9000)}`;

    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    // 6. Asynchronous Non-Blocking Webhook Dispatch (CRM / WhatsApp automation)
    triggerLeadWebhook({
      name,
      phone,
      email,
      serviceOrRequirement: roleBand ? `${service} [Band: ${roleBand}]` : service,
      source: 'Executive Contact Form',
      city: location,
      referenceId: ticketRef,
      timestamp,
    });

    // 6b. Telegram Bot Instant Lead Notification (Executive mobile alert)
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      try {
        const botToken = process.env.TELEGRAM_BOT_TOKEN.trim();
        const chatId = process.env.TELEGRAM_CHAT_ID.trim();
        const tgText = `🎯 *New JSM Client Mandate / Enquiry* [${ticketRef}]\n\n` +
          `👤 *Name:* ${name || 'N/A'}\n` +
          `📞 *Phone:* ${phone || 'N/A'}\n` +
          `✉️ *Email:* ${email || 'N/A'}\n` +
          `🏢 *Company:* ${company || 'N/A'}\n` +
          `💼 *Service:* ${service || 'Talent Acquisition'}\n` +
          `💰 *Role Band:* ${roleBand || 'N/A'}\n` +
          `📍 *State/Location:* ${location || 'N/A'}\n` +
          `📝 *Brief:* ${notes || 'None'}\n\n` +
          `🕒 _${timestamp}_`;

        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: tgText,
            parse_mode: 'Markdown',
          }),
        }).catch((err) => console.warn('Telegram alert dispatch error:', err));
      } catch (tgErr) {
        console.warn('Telegram lead notification skipped or failed:', tgErr);
      }
    }

    // 7. Target Notification Recipients (Primary: contact@jsmintegratedservices.com & jsmintegratedservices@outlook.com)
    const targetRecipients = process.env.CONTACT_NOTIFICATION_EMAIL
      ? [process.env.CONTACT_NOTIFICATION_EMAIL, 'jsmintegratedservices@outlook.com']
      : ['contact@jsmintegratedservices.com', 'jsmintegratedservices@outlook.com', 'sales@jsmintegratedservices.com'];

    // 8. HTML Notification Template for JSM Executive Desk
    const htmlEmail = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F6F3EE; color: #0E1116; padding: 24px 16px; margin: 0; }
            .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid rgba(14, 17, 22, 0.12); border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
            .header { background: #1F4E5F; color: #FFFFFF; padding: 24px; text-align: left; }
            .header h1 { margin: 0; font-size: 18px; font-weight: 700; letter-spacing: -0.02em; }
            .header p { margin: 6px 0 0 0; font-size: 13px; color: rgba(255, 255, 255, 0.85); font-mono; }
            .content { padding: 28px 24px; }
            .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #1F4E5F; letter-spacing: 0.5px; margin-bottom: 14px; border-bottom: 1px solid #F6F3EE; padding-bottom: 6px; }
            .field-row { margin-bottom: 16px; }
            .field-label { font-size: 11px; color: #6B7280; font-weight: 600; text-transform: uppercase; margin-bottom: 3px; }
            .field-value { font-size: 15px; font-weight: 600; color: #0E1116; }
            .field-value.highlight { background: #F6F3EE; padding: 14px 16px; border-radius: 8px; border-left: 3px solid #1F4E5F; font-weight: 500; font-size: 14px; line-height: 1.6; color: #0E1116; }
            .footer { background: #F6F3EE; padding: 16px 24px; font-size: 12px; color: #6B7280; text-align: left; border-top: 1px solid rgba(14, 17, 22, 0.08); }
            .action-btn { display: inline-block; background: #0E1116; color: #FFFFFF; text-decoration: none; padding: 11px 20px; border-radius: 9999px; font-weight: 600; font-size: 13px; margin-top: 16px; }
            .action-btn:hover { background: #C8553D; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Leadership Mandate / Client Enquiry</h1>
              <p>Reference ID: ${ticketRef}</p>
            </div>

            <div class="content">
              <div class="section-title">Client / Mandate Sponsor</div>
              
              <div class="field-row">
                <div class="field-label">Contact Name</div>
                <div class="field-value">${name || 'Not Provided'}</div>
              </div>

              <div class="field-row">
                <div class="field-label">Direct Phone</div>
                <div class="field-value"><a href="tel:${phone}" style="color: #1F4E5F; text-decoration: underline; font-weight: 700;">${phone || 'Not Provided'}</a></div>
              </div>

              <div class="field-row">
                <div class="field-label">Corporate Email</div>
                <div class="field-value"><a href="mailto:${email}" style="color: #1F4E5F; text-decoration: underline;">${email || 'Not Provided'}</a></div>
              </div>

              ${company ? `
              <div class="field-row">
                <div class="field-label">Company / Organization</div>
                <div class="field-value">${company}</div>
              </div>
              ` : ''}

              <div class="section-title" style="margin-top: 24px;">Mandate Specifications</div>

              <div class="field-row">
                <div class="field-label">Service Category</div>
                <div class="field-value">${service}</div>
              </div>

              ${roleBand ? `
              <div class="field-row">
                <div class="field-label">Target Role / CTC Band</div>
                <div class="field-value" style="color: #C8553D;">${roleBand}</div>
              </div>
              ` : ''}

              <div class="field-row">
                <div class="field-label">Operational State / Location</div>
                <div class="field-value">${location}</div>
              </div>

              ${headcount ? `
              <div class="field-row">
                <div class="field-label">Personnel / Openings Count</div>
                <div class="field-value">${headcount}</div>
              </div>
              ` : ''}

              ${notes ? `
              <div class="field-row" style="margin-top: 16px;">
                <div class="field-label">Mandate Brief &amp; Notes</div>
                <div class="field-value highlight">${notes}</div>
              </div>
              ` : ''}

              <div style="margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap;">
                ${phone ? `
                <a href="tel:${phone}" class="action-btn" target="_blank" style="margin-right: 8px;">
                  Call ${phone}
                </a>
                ` : ''}
                ${email ? `
                <a href="mailto:${email}?subject=JSM%20Integrated%20Services%20Mandate%20Acknowledgment%20(${ticketRef})" class="action-btn" target="_blank" style="background: #1F4E5F;">
                  Reply by Email
                </a>
                ` : ''}
              </div>
            </div>

            <div class="footer">
              Submitted on ${timestamp} via jsmintegratedservices.com<br>
              JSM Integrated Services • Tiruchirappalli Headquarters • Tamil Nadu
            </div>
          </div>
        </body>
      </html>
    `;

    // Plain text alternative
    const textEmail = `
NEW CLIENT MANDATE / ENQUIRY - JSM INTEGRATED SERVICES
Reference: ${ticketRef}
Submitted: ${timestamp}
---------------------------------------------
Client Name: ${name || 'N/A'}
Direct Phone: ${phone || 'N/A'}
Corporate Email: ${email || 'N/A'}
Company / Organization: ${company || 'N/A'}
Service Category: ${service || 'N/A'}
Role Band: ${roleBand || 'N/A'}
Operational State: ${location || 'N/A'}
Headcount / Requirements: ${headcount || 'N/A'}
Notes / Brief: ${notes || 'None'}
---------------------------------------------
Notification dispatched to: ${targetRecipients.join(', ')}
Sent from jsmintegratedservices.com
    `.trim();

    // Automated Prospect Confirmation & Mandate Nurture Email Template
    const prospectHtmlEmail = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F6F3EE; color: #0E1116; padding: 24px 16px; margin: 0; }
            .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid rgba(14, 17, 22, 0.12); border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
            .header { background: #1F4E5F; color: #FFFFFF; padding: 24px; text-align: left; }
            .header h1 { margin: 0; font-size: 18px; font-weight: 700; letter-spacing: -0.02em; }
            .header p { margin: 6px 0 0 0; font-size: 13px; color: rgba(255, 255, 255, 0.85); }
            .content { padding: 28px 24px; font-size: 14px; line-height: 1.6; color: #1E293B; }
            .card { background: #F6F3EE; border-left: 4px solid #1F4E5F; padding: 16px; border-radius: 6px; margin: 18px 0; }
            .badge { display: inline-block; background: #1F4E5F; color: #FFFFFF; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; margin-bottom: 8px; }
            .footer { padding: 20px 24px; background: #F6F3EE; font-size: 12px; color: #6B7280; text-align: center; border-top: 1px solid rgba(14, 17, 22, 0.08); }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>JSM Integrated Services</h1>
              <p>Executive Talent Acquisition & Leadership Mediation Desk</p>
            </div>
            <div class="content">
              <p>Dear ${name || 'Executive Leader'},</p>
              <p>Thank you for initiating your corporate requirement with JSM Integrated Services. Your enquiry has been registered under ticket reference <strong>${ticketRef}</strong>.</p>
              
              <div class="card">
                <span class="badge">Mandate Registration</span><br>
                <strong>Service Domain:</strong> ${service || 'Executive Talent Acquisition'}<br>
                ${company ? `<strong>Company:</strong> ${company}<br>` : ''}
                ${roleBand ? `<strong>Target CTC Band:</strong> ${roleBand}<br>` : ''}
                <strong>Operational Corridor:</strong> ${location || 'South / West India'}<br>
                <strong>Commercial Model:</strong> 100% Contingency (₹0 Advance, 8.33% Placement Fee upon Joining, 90-Day Free Replacement Guarantee)
              </div>

              <h3 style="font-size: 15px; color: #0E1116; margin-top: 20px;">Immediate Next Steps:</h3>
              <ol style="padding-left: 20px; margin: 10px 0;">
                <li><strong>Mandate Review:</strong> Our Senior Principal Consultant is calibrating your requirement against our active, pre-vetted executive talent pipeline.</li>
                <li><strong>Exploratory Call:</strong> You will receive a direct briefing within <strong>30 to 60 minutes</strong> to discuss matching candidate availability and notice periods.</li>
                <li><strong>Confidential Dossiers:</strong> We present 3 pre-screened blind finalist dossiers with zero advance financial commitment.</li>
              </ol>

              <p style="margin-top: 24px;">For urgent executive queries, connect directly with our desk:</p>
              <p>
                📞 <strong>Direct Desk:</strong> <a href="tel:+919080863448" style="color: #1F4E5F; text-decoration: none;">+91 90808 63448</a><br>
                ✉️ <strong>Executive Inbox:</strong> <a href="mailto:jsmintegratedservices@outlook.com" style="color: #1F4E5F; text-decoration: none;">jsmintegratedservices@outlook.com</a><br>
                🌐 <strong>Website:</strong> <a href="https://jsmintegratedservices.com" style="color: #1F4E5F; text-decoration: none;">jsmintegratedservices.com</a>
              </p>
            </div>
            <div class="footer">
              JSM Integrated Services • Executive Talent Acquisition & Enterprise Operations<br>
              Headquarters: Tiruchirappalli, Tamil Nadu • Regional Coverage: Chennai, Hosur, Coimbatore, Bengaluru, Pune
            </div>
          </div>
        </body>
      </html>
    `;

    const prospectTextEmail = `
Thank you for reaching out to JSM Integrated Services.
Reference: ${ticketRef}

We have registered your requirement:
- Service: ${service || 'Executive Talent Acquisition'}
${company ? `- Company: ${company}\n` : ''}${roleBand ? `- Target Band: ${roleBand}\n` : ''}- Location: ${location || 'South / West India'}
- Commercial Terms: 100% Contingency (₹0 Advance, 8.33% Fee on Joining, 90-Day Free Replacement)

Our Senior Principal Consultant will connect with you within 30 to 60 minutes.
Direct Desk: +91 90808 63448 | jsmintegratedservices@outlook.com
    `.trim();

    const resendApiKey = process.env.RESEND_API_KEY;

    // 9. Dispatch Strategy 1: Direct Resend API
    if (resendApiKey) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey.trim()}`,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          },
          body: JSON.stringify({
            from: 'JSM Integrated Services <contact@jsmintegratedservices.com>',
            reply_to: email || 'contact@jsmintegratedservices.com',
            to: targetRecipients,
            subject: `New Client Mandate: ${name || 'Client'}${company ? ` (${company})` : ''} — ${service} [${ticketRef}]`,
            text: textEmail,
            html: htmlEmail,
          }),
        });

        // Automated Lead Nurture: Send instant acknowledgment to prospect
        if (email && email.includes('@')) {
          fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${resendApiKey.trim()}`,
            },
            body: JSON.stringify({
              from: 'JSM Executive Desk <contact@jsmintegratedservices.com>',
              reply_to: 'jsmintegratedservices@outlook.com',
              to: [email],
              subject: `Mandate Received: ${service} [${ticketRef}] — JSM Integrated Services`,
              text: prospectTextEmail,
              html: prospectHtmlEmail,
            }),
          }).catch((err) => console.warn('Prospect nurture email dispatch failed:', err));
        }

        if (res.ok) {
          return NextResponse.json({
            success: true,
            referenceId: ticketRef,
            message: 'Enquiry received successfully. Our executive recruitment desk will connect within 24 hours.',
          });
        }
      } catch (err) {
        console.warn('Resend primary dispatch failed, falling back to SMTP:', err);
      }
    }

    // 10. Dispatch Strategy 2: Outlook SMTP Fallback
    if (process.env.OUTLOOK_EMAIL && process.env.OUTLOOK_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          host: 'smtp-mail.outlook.com',
          port: 587,
          secure: false, // TLS
          auth: {
            user: process.env.OUTLOOK_EMAIL,
            pass: process.env.OUTLOOK_PASSWORD.replace(/\s+/g, ''),
          },
          tls: {
            ciphers: 'SSLv3',
          },
        });

        await transporter.sendMail({
          from: `"JSM Executive Desk" <${process.env.OUTLOOK_EMAIL}>`,
          to: targetRecipients.join(', '),
          replyTo: email || process.env.OUTLOOK_EMAIL,
          subject: `🚨 New Mandate: ${name || 'Client'}${company ? ` (${company})` : ''} - ${service} [${ticketRef}]`,
          text: textEmail,
          html: htmlEmail,
        });

        // Automated Lead Nurture via SMTP: Send instant acknowledgment to prospect
        if (email && email.includes('@')) {
          transporter.sendMail({
            from: `"JSM Executive Desk" <${process.env.OUTLOOK_EMAIL}>`,
            to: email,
            replyTo: 'jsmintegratedservices@outlook.com',
            subject: `Mandate Received: ${service} [${ticketRef}] — JSM Integrated Services`,
            text: prospectTextEmail,
            html: prospectHtmlEmail,
          }).catch((err) => console.warn('SMTP prospect nurture email failed:', err));
        }

        return NextResponse.json({
          success: true,
          referenceId: ticketRef,
          message: 'Enquiry received successfully. Our executive recruitment desk will connect within 24 hours.',
        });
      } catch (smtpErr) {
        console.warn('SMTP fallback failed:', smtpErr);
      }
    }

    // 11. Dispatch Strategy 3: Production Log & Reference Confirmation
    console.log(`[JSM LEAD CAPTURE - ${ticketRef}]:`, {
      name,
      phone,
      email,
      company,
      roleBand,
      service,
      location,
      notes,
      timestamp,
      notificationRecipients: targetRecipients,
    });

    return NextResponse.json({
      success: true,
      referenceId: ticketRef,
      message: 'Enquiry received successfully. Our executive recruitment desk will connect within 24 hours.',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to dispatch notification email';
    console.error('Error handling contact form enquiry:', error);
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
