import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { rateLimit, blockBadBots, sanitizeAndEscape } from '@/lib/security';
import { landingLeadSchema, formatZodErrors } from '@/lib/validations';
import { triggerLeadWebhook } from '@/lib/webhook';

export async function POST(req: Request) {
  try {
    // Security guards
    const botBlocked = blockBadBots(req);
    if (botBlocked) return botBlocked;
    const rateLimited = rateLimit(req, 20, 60_000);
    if (rateLimited) return rateLimited;

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    const validation = landingLeadSchema.safeParse(body);
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
    const name = sanitizeAndEscape(data.name);
    const phone = sanitizeAndEscape(data.phone);
    const email = data.email ? sanitizeAndEscape(data.email) : '';
    const requirement = sanitizeAndEscape(data.requirement || data.service || '');
    const sourcePage = sanitizeAndEscape(data.source_page || data.source || 'Direct Landing Campaign');
    const city = sanitizeAndEscape(data.city || 'Tamil Nadu');
    const leadRef = `JSM-LEAD-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Non-blocking webhook dispatch for immediate notifications
    triggerLeadWebhook({
      name,
      phone,
      email,
      serviceOrRequirement: requirement,
      source: sourcePage,
      city,
      referenceId: leadRef,
      timestamp,
    });

    const resendApiKey = process.env.RESEND_API_KEY;
    const targetRecipient = process.env.CONTACT_NOTIFICATION_EMAIL || 'jsmintegratedservices@outlook.com';

    const mailText = `
NEW AD LANDING LEAD - JSM INTEGRATED SERVICES
Reference: ${leadRef}
------------------------------------------------
Name: ${name}
Phone: ${phone}
Email: ${email || 'Not provided'}
Requirement: ${requirement}
City/Location: ${city}
Source Page: ${sourcePage}
Timestamp: ${timestamp}
------------------------------------------------
Sent from jsmintegratedservices.in
    `;

    const mailHtml = `
      <div style="font-family: sans-serif; padding: 20px; color: #0f172a;">
        <h2 style="color: #0A1322; margin-bottom: 4px;">🚨 New Ad Campaign Lead</h2>
        <p style="color: #64748b; font-size: 13px; margin-top: 0;">Ref: <strong>${leadRef}</strong> | ${timestamp}</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
        <p><strong>Email:</strong> ${email ? `<a href="mailto:${email}">${email}</a>` : 'Not provided'}</p>
        <p><strong>Requirement:</strong> ${requirement}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Source:</strong> ${sourcePage}</p>
      </div>
    `;

    // 1. Primary: Dispatch via Resend API
    if (resendApiKey) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey.trim()}`,
          },
          body: JSON.stringify({
            from: 'JSM Integrated Services <contact@jsmintegratedservices.com>',
            reply_to: email || 'contact@jsmintegratedservices.com',
            to: [targetRecipient],
            subject: `🚨 New Campaign Lead: ${name} (${city}) [${leadRef}]`,
            text: mailText,
            html: mailHtml,
          }),
        });

        if (res.ok) {
          return NextResponse.json({
            success: true,
            referenceId: leadRef,
            message: 'Lead notification dispatched via Resend',
          });
        }
      } catch (err) {
        console.warn('Resend lead dispatch failed, trying fallback:', err);
      }
    }

    // 2. Secondary: Outlook SMTP if configured
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
          from: `"JSM Leads Portal" <${process.env.OUTLOOK_EMAIL}>`,
          to: targetRecipient,
          replyTo: email || process.env.OUTLOOK_EMAIL,
          subject: `🚨 New Campaign Lead: ${name} (${city}) [${leadRef}]`,
          text: mailText,
          html: mailHtml,
        });

        return NextResponse.json({
          success: true,
          referenceId: leadRef,
          message: 'Lead notification dispatched via Outlook SMTP',
        });
      } catch (smtpErr) {
        console.warn('Outlook SMTP fallback failed for lead:', smtpErr);
      }
    }

    // 3. Fallback: Log and return success
    console.log(`[JSM LANDING LEAD - ${leadRef}]:`, {
      name,
      phone,
      email,
      requirement,
      sourcePage,
      city,
      timestamp,
    });

    return NextResponse.json({
      success: true,
      referenceId: leadRef,
      message: 'Lead captured and logged successfully',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to process lead';
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
