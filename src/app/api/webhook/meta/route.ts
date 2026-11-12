import { NextRequest, NextResponse } from 'next/server';
import { triggerLeadWebhook } from '@/lib/webhook';
import { processMetaWebhookPayload } from '@/lib/viral-comment-gating';

// Verification token for Meta Graph API Webhook Handshake
const META_VERIFY_TOKEN =
  process.env.META_WEBHOOK_VERIFY_TOKEN ||
  process.env.META_VERIFY_TOKEN ||
  'jsm_webhook_verify_2026';

/**
 * GET Handler: Subscription verification handshake for Meta Graph API.
 * Validates hub.mode === 'subscribe' and matching hub.verify_token.
 * Responds with hub.challenge as plain text upon success, or 403 Forbidden.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    if (mode === 'subscribe' && token === META_VERIFY_TOKEN && challenge) {
      return new NextResponse(challenge, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }

    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

/**
 * POST Handler: Ingests Meta Graph API comment webhooks for Instagram & Facebook.
 * Extracts comments, executes intent classification with word-boundary matching,
 * generates public comment replies, and dispatches follower-gated direct messages.
 */
export async function POST(req: NextRequest) {
  let body: any;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON payload' },
      { status: 400 }
    );
  }

  try {
    const { processed, matched, actions } = processMetaWebhookPayload(body);

    // Asynchronously dispatch lead notification for internal CRM/ledger tracking
    for (const action of actions) {
      if (action.type === 'direct_message') {
        triggerLeadWebhook({
          name: `@${action.recipient} (${action.platform} - ${action.intent})`,
          phone: 'Social Direct Message',
          email: null,
          serviceOrRequirement: `Viral comment trigger for ${action.resourceTitle}. Follower gate dispatched.`,
          source: `Meta ${action.platform} Viral Webhook`,
          referenceId: `META-${Date.now()}`,
          timestamp: new Date().toISOString(),
        });
      }
    }

    if (processed === 0) {
      return NextResponse.json(
        {
          success: true,
          status: 'ignored_non_comment_event',
          processed: 0,
          matched: 0,
          actions: [],
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        status: matched > 0 ? 'processed' : 'ignored_non_trigger',
        processed,
        matched,
        actions,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
