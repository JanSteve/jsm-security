import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      phone,
      email,
      facilityName,
      service,
      headcount,
      location,
      notes,
      referenceId,
    } = body;

    const ticketRef = referenceId || `JSM-REQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const targetRecipient = process.env.CONTACT_NOTIFICATION_EMAIL || 'jsmintegratedservices@outlook.com';

    // HTML Email Template for JSM Operations Desk
    const htmlEmail = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fbf9f4; color: #1b1c19; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e4e2dd; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .header { background: #000000; color: #ffffff; padding: 24px; text-align: left; border-bottom: 3px solid #e9c176; }
            .header h1 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
            .header p { margin: 4px 0 0 0; font-size: 12px; color: #e9c176; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
            .badge { display: inline-block; background: #e9c176; color: #000000; padding: 4px 12px; border-radius: 99px; font-size: 11px; font-weight: 800; font-family: monospace; margin-top: 10px; }
            .content { padding: 24px; }
            .section-title { font-size: 11px; font-weight: 800; text-transform: uppercase; color: #76767e; letter-spacing: 1px; margin-bottom: 12px; border-bottom: 1px solid #f0eee9; padding-bottom: 6px; }
            .field-row { margin-bottom: 14px; }
            .field-label { font-size: 11px; color: #5f5e5e; font-weight: 600; text-transform: uppercase; margin-bottom: 2px; }
            .field-value { font-size: 15px; font-weight: 700; color: #000000; }
            .field-value.highlight { color: #000000; background: #fbf9f4; padding: 10px 14px; border-radius: 8px; border-left: 3px solid #000000; font-weight: 600; font-size: 13px; line-height: 1.5; }
            .footer { background: #f0eee9; padding: 16px 24px; font-size: 11px; color: #76767e; text-align: center; border-top: 1px solid #e4e2dd; }
            .action-btn { display: inline-block; background: #25D366; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; font-size: 13px; margin-top: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚨 New Client Lead • JSM Operations</h1>
              <p>Site Assessment & Commercial Proposal Request</p>
              <div class="badge">REFERENCE: ${ticketRef}</div>
            </div>

            <div class="content">
              <div class="section-title">Client Contact Details</div>
              
              <div class="field-row">
                <div class="field-label">Full Name</div>
                <div class="field-value">${name || 'Not Provided'}</div>
              </div>


              <div class="field-row">
                <div class="field-label">Corporate Email</div>
                <div class="field-value"><a href="mailto:${email}" style="color: #000000; text-decoration: underline;">${email || 'Not Provided'}</a></div>
              </div>

              <div class="section-title" style="margin-top: 24px;">Facility & Service Scope</div>

              <div class="field-row">
                <div class="field-label">Facility / Property Name</div>
                <div class="field-value">${facilityName || 'Not Specified'}</div>
              </div>

              <div class="field-row">
                <div class="field-label">Service Category</div>
                <div class="field-value">${service || 'General Integrated Facility Support'}</div>
              </div>

              <div class="field-row">
                <div class="field-label">Location / City</div>
                <div class="field-value">${location || 'Tamil Nadu'}</div>
              </div>

              ${headcount ? `
              <div class="field-row">
                <div class="field-label">Estimated Headcount / Posts</div>
                <div class="field-value">${headcount} Personnel</div>
              </div>
              ` : ''}

              ${notes ? `
              <div class="field-row" style="margin-top: 16px;">
                <div class="field-label">Client Notes & Requirements</div>
                <div class="field-value highlight">${notes}</div>
              </div>
              ` : ''}

              <div style="margin-top: 24px; text-align: center;">
                <a href="mailto:${email}?subject=JSM%20Site%20Assessment%20Request%20(${ticketRef})" class="action-btn" target="_blank">
                  📧 Email Client
                </a>
              </div>
            </div>

            <div class="footer">
              Submitted on ${timestamp} via jsmintegratedservices.in<br>
              JSM Integrated Services • Trichy Headquarters
            </div>
          </div>
        </body>
      </html>
    `;

    // Plain text alternative
    const textEmail = `
NEW CLIENT INQUIRY - JSM INTEGRATED SERVICES
Reference: ${ticketRef}
Submitted: ${timestamp}
---------------------------------------------
Client Name: ${name || 'N/A'}
Email: ${email || 'N/A'}
Facility: ${facilityName || 'N/A'}
Service: ${service || 'N/A'}
City/Location: ${location || 'N/A'}
Headcount: ${headcount || 'N/A'}
Notes: ${notes || 'None'}
---------------------------------------------
Sent from jsmintegratedservices.in
    `;

    const resendApiKey = process.env.RESEND_API_KEY;

    // 1. Primary: Dispatch directly via Resend API to Outlook
    if (resendApiKey) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey.trim()}`,
          },
          body: JSON.stringify({
            from: 'JSM Leads Portal <onboarding@resend.dev>',
            to: [targetRecipient],
            subject: `🚨 New Lead: ${name || 'Client'} - ${service || 'Site Assessment'} [${ticketRef}]`,
            html: htmlEmail,
          }),
        });

        if (res.ok) {
          return NextResponse.json({
            success: true,
            referenceId: ticketRef,
            message: 'Lead notification dispatched directly via Resend to Outlook inbox.',
          });
        }
      } catch (err) {
        console.warn('Resend primary dispatch failed, trying SMTP fallback:', err);
      }
    }

    // 2. Secondary: Try sending via Outlook SMTP if configured
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
          from: `"JSM Leads Portal" <${process.env.OUTLOOK_EMAIL}>`,
          to: targetRecipient,
          replyTo: email || process.env.OUTLOOK_EMAIL,
          subject: `🚨 New Lead: ${name || 'Client'} - ${service || 'Site Assessment'} [${ticketRef}]`,
          text: textEmail,
          html: htmlEmail,
        });

        return NextResponse.json({
          success: true,
          referenceId: ticketRef,
          message: 'Lead notification dispatched directly to Outlook inbox.',
        });
      } catch (smtpErr) {
        console.warn('SMTP fallback failed:', smtpErr);
      }
    }

    // 3. Fallback: Log lead securely and return success with reference ID for WhatsApp fast-track
    console.log(`[JSM LEAD CAPTURE - ${ticketRef}]:`, {
      name,
      phone,
      email,
      facilityName,
      service,
      location,
      notes,
      timestamp,
    });

    return NextResponse.json({
      success: true,
      referenceId: ticketRef,
      message: 'Request logged successfully. Set OUTLOOK_EMAIL & OUTLOOK_PASSWORD in Vercel to activate direct SMTP delivery.',
    });
  } catch (error: any) {
    console.error('Error handling contact form lead:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to dispatch notification email',
      },
      { status: 500 }
    );
  }
}
