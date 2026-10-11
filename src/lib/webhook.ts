/**
 * Non-blocking webhook notification dispatcher for immediate WhatsApp / CRM / Zapier lead alerts.
 */

export interface LeadWebhookPayload {
  name: string;
  phone: string;
  email?: string | null;
  serviceOrRequirement: string;
  source: string;
  city?: string;
  referenceId?: string;
  timestamp: string;
}

/**
 * Triggers an external webhook dispatch asynchronously without blocking the response cycle.
 */
export async function triggerLeadWebhook(payload: LeadWebhookPayload): Promise<void> {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL || process.env.WHATSAPP_WEBHOOK_URL;
  if (!webhookUrl) {
    return;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4-second timeout limit

    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-JSM-Source': 'jsm-security-api',
      },
      body: JSON.stringify({
        event: 'new_lead_captured',
        timestamp: payload.timestamp,
        data: payload,
        meta: {
          organization: 'JSM Integrated Services',
          routing: 'Tamil Nadu Central Command Desk',
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
  } catch (err: unknown) {
    // Non-blocking catch to ensure API stability
    console.warn('[WEBHOOK DISPATCH WARNING]: External notification could not be delivered:', err);
  }
}
