/**
 * Server-side rate limiter and security utilities for API routes.
 * Usage in API routes:
 * 
 *   import { rateLimit, blockBadBots } from '@/lib/security';
 *   
 *   export async function POST(request: Request) {
 *     const blocked = blockBadBots(request);
 *     if (blocked) return blocked;
 *     
 *     const limited = rateLimit(request);
 *     if (limited) return limited;
 *     
 *     // ... your handler
 *   }
 */

import { NextResponse } from 'next/server';

// ──────────────────────────────────────────────────
//  In-Memory Rate Limiter
// ──────────────────────────────────────────────────

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

let lastCleanup = Date.now();
function cleanupStaleEntries() {
  const now = Date.now();
  if (now - lastCleanup > 60_000) {
    for (const [ip, data] of rateLimitMap.entries()) {
      if (data.resetTime < now) rateLimitMap.delete(ip);
    }
    lastCleanup = now;
  }
}

/**
 * Rate limit API requests.
 * Returns a 429 NextResponse if rate limit exceeded, otherwise null (allow).
 * 
 * @param request - The incoming Request object
 * @param maxRequests - Max requests per window (default: 30)
 * @param windowMs - Window duration in ms (default: 60000 = 1 minute)
 */
export function rateLimit(
  request: Request,
  maxRequests = 30,
  windowMs = 60_000
): NextResponse | null {
  cleanupStaleEntries();

  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || 'unknown';

  const now = Date.now();
  let entry = rateLimitMap.get(ip);

  if (!entry || entry.resetTime < now) {
    entry = { count: 1, resetTime: now + windowMs };
  } else {
    entry.count++;
  }
  rateLimitMap.set(ip, entry);

  if (entry.count > maxRequests) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((entry.resetTime - now) / 1000)),
          'X-RateLimit-Limit': String(maxRequests),
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  return null; // Allow
}

// ──────────────────────────────────────────────────
//  Bot/Crawler Protection
// ──────────────────────────────────────────────────

const BAD_BOT_PATTERNS = [/bot/i, /spider/i, /crawl/i, /scrape/i];
const GOOD_BOT_WHITELIST = [
  /Googlebot/i,
  /Bingbot/i,
  /PerplexityBot/i,
  /GPTBot/i,
  /ChatGPT-User/i,
  /ClaudeBot/i,
  /Applebot/i,
  /DuckDuckBot/i,
  /Slurp/i,
  /YandexBot/i,
];

/**
 * Block known bad bots while allowing search engine and AI crawlers.
 * Returns a 403 NextResponse for bad bots, otherwise null (allow).
 */
export function blockBadBots(request: Request): NextResponse | null {
  const ua = request.headers.get('user-agent') || '';
  if (!ua) return null;

  const isBot = BAD_BOT_PATTERNS.some((p) => p.test(ua));
  if (!isBot) return null;

  const isGoodBot = GOOD_BOT_WHITELIST.some((p) => p.test(ua));
  if (isGoodBot) return null;

  return NextResponse.json(
    { error: 'Access denied.' },
    { status: 403 }
  );
}

// ──────────────────────────────────────────────────
//  Input Sanitization
// ──────────────────────────────────────────────────

const DANGEROUS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  /<iframe/gi,
  /<object/gi,
  /<embed/gi,
  /eval\s*\(/gi,
];

/**
 * Sanitize a string by removing dangerous HTML/JS patterns.
 * Use on user-submitted form fields before processing.
 */
export function sanitizeInput(input: string): string {
  let clean = input;
  for (const pattern of DANGEROUS_PATTERNS) {
    clean = clean.replace(pattern, '');
  }
  // Also strip null bytes
  clean = clean.replace(/\0/g, '');
  return clean.trim();
}

/**
 * Validate that the request origin/referer is from our own domain.
 * Helps prevent CSRF-style attacks on API endpoints.
 */
export function validateOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  
  const allowedOrigins = [
    'https://www.jsmintegratedservices.com',
    'https://jsmintegratedservices.com',
    'http://localhost:3000',
    'http://localhost:3001',
  ];

  if (origin && allowedOrigins.some((o) => origin.startsWith(o))) return true;
  if (referer && allowedOrigins.some((o) => referer.startsWith(o))) return true;

  // Allow requests without origin (server-to-server, curl, etc.)
  if (!origin && !referer) return true;

  return false;
}
