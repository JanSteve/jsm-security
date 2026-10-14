import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { brandData } from '@/data/brand';
import { rateLimit, blockBadBots, sanitizeAndEscape } from '@/lib/security';
import { quotePdfSchema, formatZodErrors } from '@/lib/validations';
import { triggerLeadWebhook } from '@/lib/webhook';

export async function POST(request: Request) {
  try {
    // Security guards
    const botBlocked = blockBadBots(request);
    if (botBlocked) return botBlocked;
    const rateLimited = rateLimit(request, 15, 60_000);
    if (rateLimited) return rateLimited;

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    const validation = quotePdfSchema.safeParse(body);
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
    const companyName = sanitizeAndEscape(data.companyName || data.company || 'Not Specified');
    const contactPerson = sanitizeAndEscape(data.contactPerson || data.customerName || 'Not Provided');
    const email = sanitizeAndEscape(data.email);
    const phone = sanitizeAndEscape(data.phone);
    const city = sanitizeAndEscape(data.city || 'Tamil Nadu');
    const shiftPattern = data.shiftPattern || '24/7';
    const startDate = sanitizeAndEscape(data.startDate || 'Immediate');
    const specialReqs = sanitizeAndEscape(data.specialReqs || '');
    const defaultPersonnel = data.personnelCount || 1;
    const rawServices = data.services;
    const personnelCount = defaultPersonnel;
    const serviceNames = rawServices.map((s) => (typeof s === 'string' ? s : s.name));
    const serviceListString = sanitizeAndEscape(serviceNames.join(', '));

    // Clean Corporate HTML Email Template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; padding: 24px 16px; margin: 0; }
            .container { max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
            .header { background: #0f172a; color: #ffffff; padding: 20px 24px; text-align: left; }
            .header h1 { margin: 0; font-size: 17px; font-weight: 700; }
            .header p { margin: 4px 0 0 0; font-size: 12px; color: #94a3b8; }
            .content { padding: 24px; }
            .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px; }
            .field-row { margin-bottom: 14px; }
            .field-label { font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase; margin-bottom: 2px; }
            .field-value { font-size: 14px; font-weight: 600; color: #0f172a; }
            .field-value.highlight { background: #f8fafc; padding: 12px 14px; border-radius: 6px; border-left: 3px solid #0f172a; font-weight: 500; font-size: 13px; line-height: 1.5; color: #334155; }
            .footer { background: #f8fafc; padding: 14px 24px; font-size: 11px; color: #94a3b8; text-align: left; border-top: 1px solid #f1f5f9; }
            .action-btn { display: inline-block; background: #0f172a; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-weight: 600; font-size: 13px; margin-top: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Quote Proposal Request</h1>
              <p>Generated via Operational Proposal Portal</p>
            </div>

            <div class="content">
              <div class="section-title">Client & Organization</div>
              
              <div class="field-row">
                <div class="field-label">Company Name</div>
                <div class="field-value">${companyName || 'Not Specified'}</div>
              </div>

              <div class="field-row">
                <div class="field-label">Contact Person</div>
                <div class="field-value">${contactPerson || 'Not Provided'}</div>
              </div>

              <div class="field-row">
                <div class="field-label">Mobile / Phone Number</div>
                <div class="field-value"><a href="tel:${phone}" style="color: #0f172a; text-decoration: underline; font-weight: 700;">${phone || 'Not Provided'}</a></div>
              </div>

              <div class="field-row">
                <div class="field-label">Corporate Email</div>
                <div class="field-value"><a href="mailto:${email}" style="color: #0f172a; text-decoration: underline;">${email || 'Not Provided'}</a></div>
              </div>

              <div class="section-title" style="margin-top: 20px;">Scope & Operational Details</div>

              <div class="field-row">
                <div class="field-label">City / Location</div>
                <div class="field-value">${city || 'Tamil Nadu'}</div>
              </div>

              <div class="field-row">
                <div class="field-label">Services Selected</div>
                <div class="field-value">${serviceListString}</div>
              </div>

              <div class="field-row">
                <div class="field-label">Personnel Count</div>
                <div class="field-value">${personnelCount} Staff</div>
              </div>

              <div class="field-row">
                <div class="field-label">Shift Pattern</div>
                <div class="field-value">${shiftPattern}</div>
              </div>

              <div class="field-row">
                <div class="field-label">Target Start Date</div>
                <div class="field-value">${startDate || 'Immediate'}</div>
              </div>

              ${specialReqs ? `
              <div class="field-row" style="margin-top: 14px;">
                <div class="field-label">Special Requirements</div>
                <div class="field-value highlight">${specialReqs}</div>
              </div>
              ` : ''}

              <div style="margin-top: 20px; display: flex; gap: 10px;">
                ${phone ? `
                <a href="tel:${phone}" class="action-btn" target="_blank" style="margin-right: 8px;">
                  Call ${phone}
                </a>
                ` : ''}
                ${email ? `
                <a href="mailto:${email}?subject=JSM%20Integrated%20Services%20Proposal%20Confirmation" class="action-btn" target="_blank" style="background: #334155;">
                  Email Client
                </a>
                ` : ''}
              </div>
            </div>

            <div class="footer">
              Submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} via jsmintegratedservices.in/get-quote<br>
              JSM Integrated Services • Tiruchirappalli Headquarters
            </div>
          </div>
        </body>
      </html>
    `;

    const textEmail = `
NEW QUOTE PROPOSAL REQUEST - JSM INTEGRATED SERVICES
------------------------------------------------------
Company: ${companyName}
Contact Person: ${contactPerson}
Mobile Phone: ${phone}
Email: ${email}
City: ${city}
Services: ${serviceListString}
Personnel Count: ${personnelCount}
Shift Pattern: ${shiftPattern}
Start Date: ${startDate}
Special Requirements: ${specialReqs || 'None'}
------------------------------------------------------
Sent from jsmintegratedservices.in/get-quote
    `;

    const resendApiKey = process.env.RESEND_API_KEY;
    const targetRecipient = (process.env.CONTACT_NOTIFICATION_EMAIL || 'jsmintegratedservices@outlook.com').toLowerCase();

    if (resendApiKey) {
      try {
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey.trim()}`,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          },
          body: JSON.stringify({
            from: 'JSM Sales & Proposals <sales@jsmintegratedservices.com>',
            reply_to: email || 'sales@jsmintegratedservices.com',
            to: [targetRecipient],
            subject: `New Quote Request: ${companyName || 'Client'} (${city || 'Tamil Nadu'})`,
            text: textEmail,
            html: emailHtml,
          }),
        });

        if (!emailRes.ok) {
          const errBody = await emailRes.text();
          console.error('[QUOTE-PDF RESEND ERROR]:', emailRes.status, errBody);
        } else {
          console.log('[QUOTE-PDF RESEND SUCCESS]: Lead notification delivered to', targetRecipient);
        }
      } catch (err) {
        console.error('Resend quote notification error:', err);
      }
    }

    // Secondary: Outlook SMTP if configured
    if (process.env.OUTLOOK_EMAIL && process.env.OUTLOOK_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          host: 'smtp-mail.outlook.com',
          port: 587,
          secure: false,
          auth: {
            user: process.env.OUTLOOK_EMAIL,
            pass: process.env.OUTLOOK_PASSWORD.replace(/\s+/g, ''),
          },
          tls: { ciphers: 'SSLv3' },
        });

        await transporter.sendMail({
          from: `"JSM Quotes Portal" <${process.env.OUTLOOK_EMAIL}>`,
          to: targetRecipient,
          replyTo: email || process.env.OUTLOOK_EMAIL,
          subject: `🚨 New Commercial Quote Request: ${companyName} (${city})`,
          text: textEmail,
          html: emailHtml,
        });
      } catch (smtpErr) {
        console.warn('Outlook SMTP quote notification error:', smtpErr);
      }
    }

    // Pricing estimation logic
    let estimatesHtml = '';
    let monthlyTotalMin = 0;
    let monthlyTotalMax = 0;
    let totalPersonnel = 0;

    interface StructuredEstimate {
      service: string;
      shiftPattern: string;
      personnel: number;
      rateMin: number;
      rateMax: number;
      totalMin: number;
      totalMax: number;
      unit: string;
    }

    const structuredEstimates: StructuredEstimate[] = [];

    rawServices.forEach((item) => {
      const serviceName = typeof item === 'string' ? item : item.name;
      const count = typeof item === 'object' && item.quantity ? item.quantity : personnelCount;
      totalPersonnel += count;

      let min = 0;
      let max = 0;
      let unit = '';

      if (serviceName.includes('Private Security') || serviceName.includes('Security')) {
        if (shiftPattern === '8-hour') { min = 14000; max = 18000; }
        else if (shiftPattern === '12-hour') { min = 18000; max = 23000; }
        else { min = 38000; max = 48000; } // 24/7
        unit = 'per post/month';
      } else if (serviceName.includes('Commercial Housekeeping') || serviceName.includes('Housekeeping')) {
        min = 12000; max = 16000; unit = 'per personnel/month';
      } else if (serviceName.includes('Contractual Manpower') || serviceName.includes('Manpower') || serviceName.includes('Staffing')) {
        min = 11000; max = 15000; unit = 'per personnel/month';
      } else if (serviceName.includes('Ex-Servicemen') || serviceName.includes('ESM') || serviceName.includes('Supervisor')) {
        min = 22000; max = 28000; unit = 'per supervisor/month';
      } else {
        const itemRate = typeof item === 'object' && item.rate ? item.rate : 0;
        min = itemRate || 15000;
        max = itemRate ? Math.round(itemRate * 1.25) : 20000;
        unit = 'per resource/month';
      }

      const totalMin = min * count;
      const totalMax = max * count;
      monthlyTotalMin += totalMin;
      monthlyTotalMax += totalMax;

      structuredEstimates.push({
        service: serviceName,
        shiftPattern,
        personnel: count,
        rateMin: min,
        rateMax: max,
        totalMin,
        totalMax,
        unit,
      });

      const escapedServiceName = sanitizeAndEscape(serviceName);
      estimatesHtml += `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e4e4e7;"><strong>${escapedServiceName}</strong><br><span style="font-size: 12px; color: #71717a;">${shiftPattern} shifts</span></td>
          <td style="padding: 12px; border-bottom: 1px solid #e4e4e7; text-align: right;">${count}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e4e4e7; text-align: right;">₹${min.toLocaleString()} - ₹${max.toLocaleString()}<br><span style="font-size: 12px; color: #71717a;">${unit}</span></td>
          <td style="padding: 12px; border-bottom: 1px solid #e4e4e7; text-align: right; font-weight: bold;">₹${totalMin.toLocaleString()} - ₹${totalMax.toLocaleString()}</td>
        </tr>
      `;
    });

    const date = new Date();
    const dateStr = date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    const refNum = `JSM-Q-${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Non-blocking webhook dispatch
    triggerLeadWebhook({
      name: contactPerson,
      phone,
      email,
      serviceOrRequirement: serviceListString,
      source: 'Commercial Proposal Portal',
      city,
      referenceId: refNum,
      timestamp: dateStr,
    });

    // Generate HTML for quote (printable)
    const printHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Commercial Proposal - ${companyName}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          color: #0A1628;
          line-height: 1.6;
          margin: 0;
          padding: 40px;
          background: #fff;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 3px solid #000000;
          padding-bottom: 20px;
          margin-bottom: 40px;
        }
        .logo-area h1 {
          font-weight: 700;
          font-size: 24px;
          margin: 0 0 5px 0;
          letter-spacing: -0.5px;
          color: #1d1d1f;
        }
        .logo-area p {
          color: #86868b;
          margin: 0;
          font-size: 14px;
        }
        .meta-area {
          text-align: right;
          font-size: 14px;
        }
        .meta-area p { margin: 2px 0; }
        
        .client-section {
          background: #f5f5f7;
          padding: 24px;
          border-radius: 16px;
          margin-bottom: 40px;
        }
        .client-section h2 {
          font-size: 14px;
          text-transform: uppercase;
          color: #0A1322;
          margin-top: 0;
          margin-bottom: 16px;
          letter-spacing: 0.5px;
        }
        .client-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .client-info p { margin: 4px 0; font-size: 14px; }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 40px;
        }
        th {
          background: #1d1d1f;
          color: white;
          text-align: left;
          padding: 12px;
          font-size: 13px;
        }
        th.right { text-align: right; }
        
        .guarantees {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
          margin-bottom: 40px;
        }
        .guarantee-card {
          border: 1px solid #e5e5ea;
          background: #f5f5f7;
          padding: 16px;
          border-radius: 16px;
        }
        .guarantee-card h3 {
          font-size: 13px;
          color: #0A1322;
          margin-top: 0;
          margin-bottom: 8px;
        }
        .guarantee-card p {
          font-size: 12px;
          margin: 0;
          color: #515154;
        }
        
        .footer {
          margin-top: 60px;
          padding-top: 20px;
          border-top: 1px solid #e5e5ea;
          text-align: center;
          font-size: 12px;
          color: #86868b;
        }
        .disclaimer {
          background: #fffbeb;
          color: #92400e;
          padding: 12px;
          border-radius: 8px;
          font-size: 13px;
          text-align: center;
          margin-bottom: 20px;
          border: 1px solid #fde68a;
        }
        @media print {
          body { padding: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="background:#f5f5f7;border:1px solid #e5e5ea;color:#1d1d1f;padding:16px;text-align:center;border-radius:16px;margin-bottom:24px;">
        <button onclick="window.print()" style="background:#000000;border:none;color:white;padding:10px 24px;font-weight:600;border-radius:9999px;cursor:pointer;font-size:14px;">Print / Save as PDF</button>
      </div>

      <div class="header">
        <div class="logo-area">
          <h1>JSM INTEGRATED SERVICES</h1>
          <p>Deploy Security. Staff Excellence. Manage Assets.</p>
        </div>
        <div class="meta-area">
          <p><strong>Quote Ref:</strong> ${refNum}</p>
          <p><strong>Date:</strong> ${dateStr}</p>
        </div>
      </div>

      <div class="client-section">
        <h2>Client Details</h2>
        <div class="client-grid">
          <div class="client-info">
            <p><strong>Company:</strong> ${companyName}</p>
            <p><strong>Attention:</strong> ${contactPerson}</p>
            <p><strong>Location:</strong> ${city}</p>
          </div>
          <div class="client-info">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Proposed Start:</strong> ${startDate}</p>
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Service Description</th>
            <th class="right">Personnel</th>
            <th class="right">Est. Unit Rate</th>
            <th class="right">Est. Total / Month</th>
          </tr>
        </thead>
        <tbody>
          ${estimatesHtml}
        </tbody>
      </table>

      <div class="disclaimer">
        <strong>Note:</strong> This is an estimated commercial proposal. Final pricing is subject to a comprehensive site assessment, statutory wage revisions, and specific compliance requirements for your industry.
      </div>

      <h2 style="font-size: 18px; margin-bottom: 20px;">The JSM Guarantee</h2>
      <div class="guarantees">
        <div class="guarantee-card">
          <h3>2-Hour Replacement</h3>
          <p>Guaranteed replacement of personnel within 2 hours in case of absence or non-performance.</p>
        </div>
        <div class="guarantee-card">
          <h3>100% Compliant</h3>
          <p>Fully compliant with 100% EPF & ESIC Compliant, Minimum Wages Act, and 100% EPF/ESI contributions.</p>
        </div>
        <div class="guarantee-card">
          <h3>Trained Personnel</h3>
          <p>Rigorous 5-day induction training and thorough police verification for all deployed staff.</p>
        </div>
      </div>

      <div class="footer">
        <p>${brandData.name} | ${brandData.contact.address}</p>
        <p>Email: ${brandData.contact.email}</p>
        <p>${brandData.domain}</p>
      </div>
    </body>
    </html>
    `;

    const acceptsJson = request.headers.get('accept')?.includes('application/json');
    const isJsonFormat = data.format === 'json' || acceptsJson;

    if (isJsonFormat) {
      return NextResponse.json({
        success: true,
        referenceId: refNum,
        company: companyName,
        contactPerson,
        email,
        phone,
        city,
        estimates: structuredEstimates,
        monthlyTotal: {
          min: monthlyTotalMin,
          max: monthlyTotalMax,
        },
        shiftPattern,
        personnelCount: totalPersonnel,
        compliance: '100% EPF & ESIC Compliant, 100% EPF/ESI Indemnified, Minimum Wages Act 1948',
        date: dateStr,
      });
    }

    return new NextResponse(printHtml, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to process request';
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
