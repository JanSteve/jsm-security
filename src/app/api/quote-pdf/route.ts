import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { brandData } from '@/data/brand';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      companyName,
      contactPerson,
      email,
      phone,
      services,
      city,
      personnelCount,
      shiftPattern,
      startDate,
      specialReqs,
    } = data;

    const resendApiKey = process.env.RESEND_API_KEY;
    const targetRecipient = process.env.CONTACT_NOTIFICATION_EMAIL || 'jsmintegratedservices@outlook.com';

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
              <p>Generated via Instant Quote Calculator</p>
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
                <div class="field-value">${Array.isArray(services) ? services.join(', ') : services}</div>
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
Services: ${Array.isArray(services) ? services.join(', ') : services}
Personnel Count: ${personnelCount}
Shift Pattern: ${shiftPattern}
Start Date: ${startDate}
Special Requirements: ${specialReqs || 'None'}
------------------------------------------------------
Sent from jsmintegratedservices.in/get-quote
    `;

    if (resendApiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey.trim()}`,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          },
          body: JSON.stringify({
            from: 'JSM Quote Desk <onboarding@resend.dev>',
            reply_to: email || targetRecipient,
            to: [targetRecipient],
            subject: `New Quote Request: ${companyName || 'Client'} (${city || 'Tamil Nadu'})`,
            text: textEmail,
            html: emailHtml,
          }),
        });
      } catch (err) {
        console.warn('Resend quote notification error:', err);
      }
    }

    // Pricing estimation logic
    let estimatesHtml = '';
    const personnel = parseInt(personnelCount) || 1;
    
    services.forEach((service: string) => {
      let min = 0;
      let max = 0;
      let unit = '';
      
      if (service === 'Private Security') {
        if (shiftPattern === '8-hour') { min = 14000; max = 18000; }
        else if (shiftPattern === '12-hour') { min = 18000; max = 23000; }
        else { min = 38000; max = 48000; } // 24/7
        unit = 'per post/month';
      } else if (service === 'Commercial Housekeeping') {
        min = 12000; max = 16000; unit = 'per personnel/month';
      } else if (service === 'Contractual Manpower') {
        min = 11000; max = 15000; unit = 'per personnel/month';
      } else {
        min = 15000; max = 20000; unit = 'per resource/month';
      }
      
      const totalMin = min * personnel;
      const totalMax = max * personnel;
      
      estimatesHtml += `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e4e4e7;"><strong>${service}</strong><br><span style="font-size: 12px; color: #71717a;">${shiftPattern} shifts</span></td>
          <td style="padding: 12px; border-bottom: 1px solid #e4e4e7; text-align: right;">${personnel}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e4e4e7; text-align: right;">₹${min.toLocaleString()} - ₹${max.toLocaleString()}<br><span style="font-size: 12px; color: #71717a;">${unit}</span></td>
          <td style="padding: 12px; border-bottom: 1px solid #e4e4e7; text-align: right; font-weight: bold;">₹${totalMin.toLocaleString()} - ₹${totalMax.toLocaleString()}</td>
        </tr>
      `;
    });

    const date = new Date();
    const dateStr = date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    const refNum = `JSM-Q-${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Generate HTML for quote (printable)
    const printHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Commercial Proposal - \${companyName}</title>
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
          border-bottom: 3px solid #C5A880;
          padding-bottom: 20px;
          margin-bottom: 40px;
        }
        .logo-area h1 {
          font-weight: 900;
          font-size: 24px;
          margin: 0 0 5px 0;
          letter-spacing: -0.5px;
        }
        .logo-area p {
          color: #71717a;
          margin: 0;
          font-size: 14px;
        }
        .meta-area {
          text-align: right;
          font-size: 14px;
        }
        .meta-area p { margin: 2px 0; }
        
        .client-section {
          background: #fbf9f4;
          padding: 24px;
          border-radius: 12px;
          margin-bottom: 40px;
        }
        .client-section h2 {
          font-size: 16px;
          text-transform: uppercase;
          color: #C5A880;
          margin-top: 0;
          margin-bottom: 16px;
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
          background: #0A1628;
          color: white;
          text-align: left;
          padding: 12px;
          font-size: 14px;
        }
        th.right { text-align: right; }
        
        .guarantees {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
          margin-bottom: 40px;
        }
        .guarantee-card {
          border: 1px solid #e4e4e7;
          padding: 16px;
          border-radius: 8px;
        }
        .guarantee-card h3 {
          font-size: 14px;
          color: #C5A880;
          margin-top: 0;
          margin-bottom: 8px;
        }
        .guarantee-card p {
          font-size: 12px;
          margin: 0;
          color: #52525b;
        }
        
        .footer {
          margin-top: 60px;
          padding-top: 20px;
          border-top: 1px solid #e4e4e7;
          text-align: center;
          font-size: 12px;
          color: #71717a;
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
      <div class="no-print" style="background:#0A1628;color:white;padding:16px;text-align:center;border-radius:8px;margin-bottom:24px;">
        <button onclick="window.print()" style="background:#C5A880;border:none;color:white;padding:10px 20px;font-weight:bold;border-radius:6px;cursor:pointer;font-size:16px;">Print / Save as PDF</button>
      </div>

      <div class="header">
        <div class="logo-area">
          <h1>JSM INTEGRATED SERVICES</h1>
          <p>One Partner. Every Solution.</p>
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
          <p>Fully compliant with PSARA, Minimum Wages Act, and 100% EPF/ESI contributions.</p>
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

    return new NextResponse(printHtml, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
