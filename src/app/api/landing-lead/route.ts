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

    const transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.OUTLOOK_EMAIL,
        pass: process.env.OUTLOOK_PASSWORD,
      },
      tls: {
        ciphers: 'SSLv3'
      }
    });

    const mailOptions = {
      from: process.env.OUTLOOK_EMAIL,
      to: process.env.OUTLOOK_EMAIL, // Send to self
      subject: `New Lead from Google Ads - ${source_page}`,
      text: `
        New Lead Details:
        -----------------
        Email: ${email || 'Not provided'}
        Requirement: ${requirement}
        
        Source Page: ${source_page}
        Time: ${new Date().toLocaleString()}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Failed to process lead' },
      { status: 500 }
    );
  }
}
