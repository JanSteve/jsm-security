import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, requirement, source_page } = body;

    if (!name || !phone || !requirement) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const targetRecipient = process.env.CONTACT_NOTIFICATION_EMAIL || 'jsmintegratedservices@outlook.com';

    const mailText = `
NEW AD LANDING LEAD - JSM INTEGRATED SERVICES
------------------------------------------------
Name: ${name || 'N/A'}
Phone: ${phone || 'N/A'}
Email: ${email || 'Not provided'}
Requirement: ${requirement}
Source Page: ${source_page}
Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
------------------------------------------------
Sent from jsmintegratedservices.in
    `;

    if (resendApiKey) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey.trim()}`,
        },
        body: JSON.stringify({
          from: 'JSM Landing Leads <onboarding@resend.dev>',
          to: [targetRecipient],
          subject: `🚨 New Campaign Lead: ${name} (${source_page})`,
          text: mailText,
        }),
      });

      if (res.ok) {
        return NextResponse.json({ success: true });
      }
    }

    return NextResponse.json({ success: true, message: 'Lead logged' });
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Failed to process lead' },
      { status: 500 }
    );
  }
}
