import { NextRequest, NextResponse } from 'next/server';
import { triggerLeadWebhook } from '@/lib/webhook';

// Verification token for Meta WhatsApp Cloud API Webhook setup
const META_VERIFY_TOKEN = process.env.META_WA_VERIFY_TOKEN || 'jsm_webhook_verify_2026';

/**
 * GET Handler: Verification handshake for Meta WhatsApp Cloud API
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === META_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

/**
 * Helper to craft smart automated conversational replies based on customer intent
 */
function generateAutomatedReply(incomingText: string): { replyText: string; intent: string } {
  const lower = incomingText.toLowerCase();

  if (lower.includes('price') || lower.includes('cost') || lower.includes('rate') || lower.includes('quote') || lower.includes('evlo')) {
    return {
      intent: 'PRICING_INQUIRY',
      replyText: 
        `Vanakkam! Thank you for your inquiry.\n\n` +
        `• Smart Review Filter NFC Standee: ₹1,499 (One-time, lifetime free)\n` +
        `• Missed-Call WhatsApp Lead Saver: ₹1,999 setup\n` +
        `• WhatsApp Direct Table Ordering: ₹2,499 setup\n` +
        `• Physical Security & Housekeeping: Customized statutory monthly rates\n\n` +
        `You can calculate your estimated ROI here: https://www.jsmintegratedservices.com/get-quote\n\n` +
        `Shall our technical lead give you a quick 2-minute phone call to explain?`
    };
  }

  if (lower.includes('demo') || lower.includes('video') || lower.includes('link') || lower.includes('yes') || lower.includes('ok') || lower.includes('sure') || lower.includes('send') || lower.includes('share')) {
    return {
      intent: 'DEMO_REQUEST',
      replyText:
        `Vanakkam! Great to connect with you.\n\n` +
        `Here is our live interactive demonstration page where you can test how our Smart Review Standee and Queue Trackers work in real time:\n` +
        `👉 https://www.jsmintegratedservices.com/services/smart-review-filter-nfc\n\n` +
        `Would you like us to dispatch a physical demo unit to your location, or prefer a quick phone briefing today?`
    };
  }

  // Default Warm Lead Reply
  return {
    intent: 'GENERAL_INQUIRY',
    replyText:
      `Vanakkam! Thank you for reaching out to JSM Integrated Services.\n\n` +
      `Our Chief Technical Officer, Jan Steve Daniel (+91 90808 63448), has been alerted with your message and will connect with you shortly.\n\n` +
      `In the meantime, feel free to explore our full service catalog at: https://www.jsmintegratedservices.com/services`
  };
}

/**
 * Helper to dispatch outbound reply back to WhatsApp
 */
async function sendWhatsAppReply(toPhone: string, message: string) {
  // Option 1: UltraMsg Gateway
  const instanceId = process.env.ULTRAMSG_INSTANCE_ID;
  const ultraToken = process.env.ULTRAMSG_TOKEN;
  if (instanceId && ultraToken) {
    try {
      await fetch(`https://api.ultramsg.com/${instanceId}/messages/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          token: ultraToken,
          to: toPhone.replace('+', ''),
          body: message
        })
      });
      return;
    } catch (err) {
      console.error('[WhatsApp Webhook] UltraMsg reply error:', err);
    }
  }

  // Option 2: Meta Cloud API
  const metaToken = process.env.META_WA_TOKEN;
  const phoneId = process.env.META_PHONE_NUMBER_ID;
  if (metaToken && phoneId) {
    try {
      await fetch(`https://graph.facebook.com/v20.0/${phoneId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${metaToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: toPhone.replace('+', ''),
          type: 'text',
          text: { body: message }
        })
      });
    } catch (err) {
      console.error('[WhatsApp Webhook] Meta Cloud reply error:', err);
    }
  }
}

/**
 * POST Handler: Processes incoming messages from prospects & auto-converts into conversations
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    let fromPhone = '';
    let incomingText = '';
    let contactName = 'Prospect';

    // 1. Detect Meta WhatsApp Cloud API format
    if (body.object === 'whatsapp_business_account' && body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]) {
      const msg = body.entry[0].changes[0].value.messages[0];
      const contact = body.entry[0].changes[0].value.contacts?.[0];
      fromPhone = msg.from;
      incomingText = msg.text?.body || '';
      contactName = contact?.profile?.name || 'Prospect';
    } 
    // 2. Detect UltraMsg Gateway format
    else if (body.data?.from && body.data?.body) {
      fromPhone = body.data.from.split('@')[0];
      incomingText = body.data.body;
      contactName = body.data.pushname || 'Prospect';
    }
    // 3. Detect generic webhook format
    else if (body.phone && body.message) {
      fromPhone = body.phone;
      incomingText = body.message;
      contactName = body.name || 'Prospect';
    }

    if (!fromPhone || !incomingText) {
      return NextResponse.json({ status: 'ignored_non_message_event' });
    }

    // Generate automated smart conversational response
    const { replyText, intent } = generateAutomatedReply(incomingText);

    // Send the reply back to the prospect on WhatsApp
    await sendWhatsAppReply(fromPhone, replyText);

    // Alert leadership immediately about the warm inbound reply
    triggerLeadWebhook({
      name: `${contactName} (WhatsApp Inbound - ${intent})`,
      phone: fromPhone,
      email: 'whatsapp-lead@jsmintegratedservices.com',
      serviceOrRequirement: `Incoming message: "${incomingText}". Automated reply sent: "${intent}".`,
      source: 'WhatsApp Inbound Automation Webhook',
      city: 'Inbound WhatsApp',
      referenceId: `WA-${Date.now()}`,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      sender: fromPhone,
      intent,
      autoReplied: true
    });
  } catch (error) {
    console.error('[WhatsApp Webhook Error]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
