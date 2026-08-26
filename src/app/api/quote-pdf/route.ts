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

    // Build Email HTML
    const emailHtml = `
      <h2>New Quote Request via Website</h2>
      <p><strong>Company:</strong> ${companyName}</p>
      <p><strong>Contact Person:</strong> ${contactPerson}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>City:</strong> ${city}</p>
      <p><strong>Services Requested:</strong> ${services.join(', ')}</p>
      <p><strong>Personnel Required:</strong> ${personnelCount}</p>
      <p><strong>Shift Pattern:</strong> ${shiftPattern}</p>
      <p><strong>Start Date:</strong> ${startDate}</p>
      <p><strong>Special Requirements:</strong> ${specialReqs || 'None'}</p>
    `;

    // Only attempt sending if env vars exist
    if (process.env.OUTLOOK_EMAIL && process.env.OUTLOOK_PASSWORD) {
       try {
         const transporter = nodemailer.createTransport({
           host: 'smtp-mail.outlook.com',
           port: 587,
           secure: false, // true for 465, false for other ports
           auth: {
             user: process.env.OUTLOOK_EMAIL,
             pass: process.env.OUTLOOK_PASSWORD,
           },
           tls: {
             ciphers: 'SSLv3',
           }
         });
         
         await transporter.sendMail({
            from: process.env.OUTLOOK_EMAIL,
            to: process.env.CONTACT_NOTIFICATION_EMAIL || process.env.OUTLOOK_EMAIL,
            subject: `New Quote Request: ${companyName}`,
            html: emailHtml,
         });
       } catch (emailError) {
         console.error('Failed to send email:', emailError);
         // Continue even if email fails
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
            <p><strong>Phone:</strong> ${phone}</p>
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
        <p>Email: ${brandData.contact.email} | Phone: ${brandData.contact.phone}</p>
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
