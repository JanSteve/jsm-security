import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Serverless API Route: /api/lead-magnet
 * Delivers executive lead magnet documents for JSM Integrated Services:
 * 1. Job Seeker: "The 2026 ATS-Bypass & Hidden Job Market Playbook"
 * 2. Employer: "The Founder's Guide to Zero-Retainer Contingency Hiring & Eliminating Day-1 Ghosting"
 *
 * Supported Methods:
 * - GET: Binary PDF download/streaming with Content-Type: application/pdf
 * - POST: Intent-based lead registration returning direct download URL
 */

const LEAD_MAGNETS = {
  'job-seeker': {
    filename: 'the-2026-ats-bypass-hidden-job-market-playbook.pdf',
    title: 'The 2026 ATS-Bypass & Hidden Job Market Playbook',
    aliases: ['job-seeker', 'seeker', 'candidate', 'resume', 'switch', 'job'],
  },
  employer: {
    filename: 'the-founders-guide-to-zero-retainer-contingency-hiring.pdf',
    title: "The Founder's Guide to Zero-Retainer Contingency Hiring & Eliminating Day-1 Ghosting",
    aliases: ['employer', 'founder', 'company', 'hire', 'talent', 'mediator'],
  },
} as const;

type LeadMagnetKey = keyof typeof LEAD_MAGNETS;

function resolveMagnetKey(rawType: string | null | undefined): LeadMagnetKey | null {
  if (!rawType) return null;
  const clean = rawType.trim().toLowerCase();

  const seekerAliases: readonly string[] = LEAD_MAGNETS['job-seeker'].aliases;
  if (seekerAliases.includes(clean)) {
    return 'job-seeker';
  }

  const employerAliases: readonly string[] = LEAD_MAGNETS.employer.aliases;
  if (employerAliases.includes(clean)) {
    return 'employer';
  }

  return null;
}

/**
 * GET Handler — Streams the pre-generated binary PDF
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawType = searchParams.get('type');
    const isAttachment = searchParams.get('download') === 'true';

    const key = resolveMagnetKey(rawType);
    if (!key) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid or missing lead magnet type. Permitted values: 'job-seeker', 'employer'.",
        },
        { status: 400 }
      );
    }

    const magnet = LEAD_MAGNETS[key];
    const filePath = path.join(process.cwd(), 'public', 'lead-magnets', magnet.filename);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        {
          success: false,
          error: `Lead magnet document '${magnet.filename}' is currently being generated. Please retry shortly.`,
        },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(filePath);
    const disposition = isAttachment
      ? `attachment; filename="${magnet.filename}"`
      : `inline; filename="${magnet.filename}"`;

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': disposition,
        'Content-Length': String(fileBuffer.length),
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        'X-Lead-Magnet-Title': magnet.title,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}

/**
 * POST Handler — Captures enquiry details and returns resource download metadata
 */
export async function POST(req: NextRequest) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    const { email, name, phone, type } = body || {};

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const key = resolveMagnetKey(type);
    if (!key) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid or missing lead magnet type. Permitted values: 'job-seeker', 'employer'.",
        },
        { status: 400 }
      );
    }

    const magnet = LEAD_MAGNETS[key];
    const downloadUrl = `/lead-magnets/${magnet.filename}`;

    return NextResponse.json(
      {
        success: true,
        message: 'Lead magnet access granted.',
        resourceTitle: magnet.title,
        downloadUrl,
        lead: {
          email: email.trim().toLowerCase(),
          name: typeof name === 'string' ? name.trim() : undefined,
          phone: typeof phone === 'string' ? phone.trim() : undefined,
          type: key,
        },
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
