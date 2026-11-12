/**
 * Tier 2: Viral Comment-to-DM & Follower Gating Staging Integration Test Suite
 * File: tests/tier2-viral-comment-gating.mjs
 *
 * Verifies Requirement R3:
 * 1. Meta Webhook GET Handshake verification (valid token returns 200 + challenge; invalid returns 403)
 * 2. Word-boundary regex intent classification for 'JOB', 'HIRE', 'SWITCH', 'TALENT'
 * 3. Case insensitivity ('job', 'Hire', 'sWiTcH', 'talent')
 * 4. Word-boundary false positive rejection ('jobless', 'switching', 'reshire', 'Worcestershire', 'talentedly')
 * 5. Public reply formatting: tags @username without exclamation mark, directs user to DMs
 * 6. DM payload generator: contains @jsmintegratedservices follower gate prompt and appropriate PDF URL
 * 7. Operational constraints: native Next.js execution (0 Make.com polling ops) and Make budget audit (<= 250 ops/month)
 * 8. Serverless POST route: handles Instagram and Facebook comment webhooks, malformed JSON, and ignores unmatched comments cleanly
 */

import { NextRequest } from 'next/server.js';
import { GET as metaGetHandler, POST as metaPostHandler } from '../src/app/api/webhook/meta/route.ts';
import {
  classifyCommentIntent,
  generatePublicCommentReply,
  generateDirectMessagePayload,
  auditMakeOperationsBudget,
  extractCommentsFromMetaPayload,
  processMetaCommentEvent,
  processMetaWebhookPayload,
  LEAD_MAGNET_CONFIG,
  FOLLOWER_GATE_PROMPT,
} from '../src/lib/viral-comment-gating.ts';

console.log('======================================================================');
console.log('  TIER 2: VIRAL COMMENT-TO-DM & FOLLOWER GATING INTEGRATION HARNESS');
console.log('======================================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failureDetails = [];

async function test(title, testFn) {
  totalTests++;
  const label = `[TEST ${String(totalTests).padStart(2, '0')}] ${title}`;
  try {
    await testFn();
    passedTests++;
    console.log(`  ✓ PASS: ${label}`);
  } catch (err) {
    failedTests++;
    console.error(`  ✗ FAIL: ${label}`);
    console.error(`          Reason: ${err.message}`);
    failureDetails.push({ label, error: err.message });
  }
}

// -----------------------------------------------------------------------------
// Test Group 1: Meta Webhook GET Handshake Verification (/api/webhook/meta)
// -----------------------------------------------------------------------------

await test('GET /api/webhook/meta: Valid subscription handshake returns HTTP 200 with challenge text', async () => {
  const challenge = 'challenge_test_token_88910';
  const url = `http://localhost:3000/api/webhook/meta?hub.mode=subscribe&hub.verify_token=jsm_webhook_verify_2026&hub.challenge=${challenge}`;
  const req = new NextRequest(url, { method: 'GET' });

  const res = await metaGetHandler(req);
  if (res.status !== 200) {
    throw new Error(`Expected HTTP 200, received HTTP ${res.status}`);
  }

  const text = await res.text();
  if (text !== challenge) {
    throw new Error(`Expected challenge '${challenge}', received '${text}'`);
  }
});

await test('GET /api/webhook/meta: Invalid verify_token returns HTTP 403 Forbidden', async () => {
  const url =
    'http://localhost:3000/api/webhook/meta?hub.mode=subscribe&hub.verify_token=unauthorized_token&hub.challenge=test_123';
  const req = new NextRequest(url, { method: 'GET' });

  const res = await metaGetHandler(req);
  if (res.status !== 403) {
    throw new Error(`Expected HTTP 403 Forbidden, received HTTP ${res.status}`);
  }

  const json = await res.json();
  if (json.error !== 'Forbidden') {
    throw new Error(`Expected error: 'Forbidden', got: ${JSON.stringify(json)}`);
  }
});

await test('GET /api/webhook/meta: Invalid hub.mode returns HTTP 403 Forbidden', async () => {
  const url =
    'http://localhost:3000/api/webhook/meta?hub.mode=unsubscribe&hub.verify_token=jsm_webhook_verify_2026&hub.challenge=test_123';
  const req = new NextRequest(url, { method: 'GET' });

  const res = await metaGetHandler(req);
  if (res.status !== 403) {
    throw new Error(`Expected HTTP 403 Forbidden for non-subscribe mode, received HTTP ${res.status}`);
  }
});

await test('GET /api/webhook/meta: Missing challenge parameter returns HTTP 403 Forbidden', async () => {
  const url =
    'http://localhost:3000/api/webhook/meta?hub.mode=subscribe&hub.verify_token=jsm_webhook_verify_2026';
  const req = new NextRequest(url, { method: 'GET' });

  const res = await metaGetHandler(req);
  if (res.status !== 403) {
    throw new Error(`Expected HTTP 403 Forbidden for missing challenge, received HTTP ${res.status}`);
  }
});

// -----------------------------------------------------------------------------
// Test Group 2: Word-Boundary Regex Intent Classification
// -----------------------------------------------------------------------------

await test("classifyCommentIntent: 'JOB' keyword maps to 'job_seeker' intent", () => {
  const res = classifyCommentIntent('JOB');
  if (res.intent !== 'job_seeker' || res.matchedKeyword !== 'JOB') {
    throw new Error(`Expected { intent: 'job_seeker', matchedKeyword: 'JOB' }, got ${JSON.stringify(res)}`);
  }
});

await test("classifyCommentIntent: 'SWITCH' keyword maps to 'job_seeker' intent", () => {
  const res = classifyCommentIntent('SWITCH');
  if (res.intent !== 'job_seeker' || res.matchedKeyword !== 'SWITCH') {
    throw new Error(`Expected { intent: 'job_seeker', matchedKeyword: 'SWITCH' }, got ${JSON.stringify(res)}`);
  }
});

await test("classifyCommentIntent: 'HIRE' keyword maps to 'employer' intent", () => {
  const res = classifyCommentIntent('HIRE');
  if (res.intent !== 'employer' || res.matchedKeyword !== 'HIRE') {
    throw new Error(`Expected { intent: 'employer', matchedKeyword: 'HIRE' }, got ${JSON.stringify(res)}`);
  }
});

await test("classifyCommentIntent: 'TALENT' keyword maps to 'employer' intent", () => {
  const res = classifyCommentIntent('TALENT');
  if (res.intent !== 'employer' || res.matchedKeyword !== 'TALENT') {
    throw new Error(`Expected { intent: 'employer', matchedKeyword: 'TALENT' }, got ${JSON.stringify(res)}`);
  }
});

await test('classifyCommentIntent: Case-insensitivity across uppercase, lowercase, and mixed cases', () => {
  const cases = [
    { text: 'job', expectedIntent: 'job_seeker', expectedKeyword: 'JOB' },
    { text: 'Job', expectedIntent: 'job_seeker', expectedKeyword: 'JOB' },
    { text: 'switch', expectedIntent: 'job_seeker', expectedKeyword: 'SWITCH' },
    { text: 'sWiTcH', expectedIntent: 'job_seeker', expectedKeyword: 'SWITCH' },
    { text: 'hire', expectedIntent: 'employer', expectedKeyword: 'HIRE' },
    { text: 'Hire', expectedIntent: 'employer', expectedKeyword: 'HIRE' },
    { text: 'talent', expectedIntent: 'employer', expectedKeyword: 'TALENT' },
    { text: 'TaLeNt', expectedIntent: 'employer', expectedKeyword: 'TALENT' },
  ];

  for (const c of cases) {
    const res = classifyCommentIntent(c.text);
    if (res.intent !== c.expectedIntent || res.matchedKeyword !== c.expectedKeyword) {
      throw new Error(
        `Failed for '${c.text}': expected ${c.expectedIntent} (${c.expectedKeyword}), got ${res.intent} (${res.matchedKeyword})`
      );
    }
  }
});

await test('classifyCommentIntent: Contextual sentences correctly isolated', () => {
  const s1 = classifyCommentIntent('Please share details, I am looking for a JOB in Trichy');
  if (s1.intent !== 'job_seeker' || s1.matchedKeyword !== 'JOB') {
    throw new Error(`Sentence 1 failed: got ${JSON.stringify(s1)}`);
  }

  const s2 = classifyCommentIntent('We want to HIRE senior operations directors for our plant');
  if (s2.intent !== 'employer' || s2.matchedKeyword !== 'HIRE') {
    throw new Error(`Sentence 2 failed: got ${JSON.stringify(s2)}`);
  }

  const s3 = classifyCommentIntent('Ready to SWITCH from manufacturing to engineering leadership');
  if (s3.intent !== 'job_seeker' || s3.matchedKeyword !== 'SWITCH') {
    throw new Error(`Sentence 3 failed: got ${JSON.stringify(s3)}`);
  }

  const s4 = classifyCommentIntent('Looking for verified executive TALENT in Coimbatore');
  if (s4.intent !== 'employer' || s4.matchedKeyword !== 'TALENT') {
    throw new Error(`Sentence 4 failed: got ${JSON.stringify(s4)}`);
  }
});

await test('classifyCommentIntent: Strict word boundary rejection of substring false positives', () => {
  const falsePositives = [
    'jobless',
    'jobseeker',
    'goodjob',
    'switching',
    'switched',
    'reshire',
    'unhired',
    'Worcestershire',
    'talentedly',
    'talentless',
    'Great reel, thank you!',
    'Interested in knowing more',
    '',
  ];

  for (const fp of falsePositives) {
    const res = classifyCommentIntent(fp);
    if (res.intent !== 'unknown' || res.matchedKeyword !== null) {
      throw new Error(`False positive matched for '${fp}': got ${JSON.stringify(res)}`);
    }
  }
});

// -----------------------------------------------------------------------------
// Test Group 3: Automated Public Comment Reply Generator
// -----------------------------------------------------------------------------

await test('generatePublicCommentReply: Tags @username without exclamation mark and directs to DMs', () => {
  const replySeeker = generatePublicCommentReply('karthik_tn', 'job_seeker');
  if (!replySeeker.includes('@karthik_tn')) {
    throw new Error(`Expected reply to tag @karthik_tn, got: ${replySeeker}`);
  }
  if (replySeeker.includes('@karthik_tn!')) {
    throw new Error(`Forbidden exclamation mark found after username tag: ${replySeeker}`);
  }
  if (!replySeeker.toLowerCase().includes('direct messages')) {
    throw new Error(`Expected prompt directing to direct messages, got: ${replySeeker}`);
  }

  const replyEmployer = generatePublicCommentReply('anand_enterprises', 'employer');
  if (!replyEmployer.includes('@anand_enterprises')) {
    throw new Error(`Expected reply to tag @anand_enterprises, got: ${replyEmployer}`);
  }
  if (replyEmployer.includes('@anand_enterprises!')) {
    throw new Error(`Forbidden exclamation mark found after username tag: ${replyEmployer}`);
  }
  if (!replyEmployer.toLowerCase().includes('direct messages')) {
    throw new Error(`Expected prompt directing to direct messages, got: ${replyEmployer}`);
  }
});

await test('generatePublicCommentReply: Strictly zero prohibited hype words and zero raw emojis', () => {
  const bannedWords = ['world-class', 'cutting-edge', 'seamless', 'leverage', 'unlock your potential', 'revolutionize'];
  const emojiRegex = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

  for (const intent of ['job_seeker', 'employer', 'unknown']) {
    const reply = generatePublicCommentReply('test_user', intent);
    for (const banned of bannedWords) {
      if (reply.toLowerCase().includes(banned)) {
        throw new Error(`Prohibited hype word '${banned}' found in public reply: ${reply}`);
      }
    }
    if (emojiRegex.test(reply)) {
      throw new Error(`Raw emoji character found in public reply: ${reply}`);
    }
  }
});

// -----------------------------------------------------------------------------
// Test Group 4: Direct Message Payload & Follower Gate Prompt Generator
// -----------------------------------------------------------------------------

await test('generateDirectMessagePayload: Job Seeker delivers ATS-Bypass Playbook and follower gate', () => {
  const dm = generateDirectMessagePayload('karthik_tn', 'job_seeker');

  if (dm.intent !== 'job_seeker') {
    throw new Error(`Expected intent 'job_seeker', got ${dm.intent}`);
  }
  if (!dm.resourceDownloadUrl.includes('the-2026-ats-bypass-hidden-job-market-playbook.pdf')) {
    throw new Error(`Expected Job Seeker PDF URL in payload, got: ${dm.resourceDownloadUrl}`);
  }
  if (!dm.messageText.includes(LEAD_MAGNET_CONFIG.job_seeker.fullUrl)) {
    throw new Error(`Expected full download URL in messageText, got: ${dm.messageText}`);
  }
  if (!dm.followerGatePrompt.includes('@jsmintegratedservices')) {
    throw new Error(`Expected @jsmintegratedservices in followerGatePrompt, got: ${dm.followerGatePrompt}`);
  }
  if (!dm.messageText.includes('@jsmintegratedservices')) {
    throw new Error(`Expected @jsmintegratedservices in messageText, got: ${dm.messageText}`);
  }
});

await test('generateDirectMessagePayload: Employer delivers Contingency Hiring Guide and follower gate', () => {
  const dm = generateDirectMessagePayload('anand_enterprises', 'employer');

  if (dm.intent !== 'employer') {
    throw new Error(`Expected intent 'employer', got ${dm.intent}`);
  }
  if (!dm.resourceDownloadUrl.includes('the-founders-guide-to-zero-retainer-contingency-hiring.pdf')) {
    throw new Error(`Expected Employer PDF URL in payload, got: ${dm.resourceDownloadUrl}`);
  }
  if (!dm.messageText.includes(LEAD_MAGNET_CONFIG.employer.fullUrl)) {
    throw new Error(`Expected full download URL in messageText, got: ${dm.messageText}`);
  }
  if (!dm.followerGatePrompt.includes('@jsmintegratedservices')) {
    throw new Error(`Expected @jsmintegratedservices in followerGatePrompt, got: ${dm.followerGatePrompt}`);
  }
  if (!dm.messageText.includes('@jsmintegratedservices')) {
    throw new Error(`Expected @jsmintegratedservices in messageText, got: ${dm.messageText}`);
  }
});

await test('generateDirectMessagePayload: Follower gate specifies openings, rosters, and salary updates', () => {
  const dm = generateDirectMessagePayload('test_leader', 'job_seeker');
  const gateText = dm.followerGatePrompt.toLowerCase();

  if (!gateText.includes('executive openings')) {
    throw new Error(`Follower gate missing 'executive openings': ${dm.followerGatePrompt}`);
  }
  if (!gateText.includes('talent rosters')) {
    throw new Error(`Follower gate missing 'talent rosters': ${dm.followerGatePrompt}`);
  }
  if (!gateText.includes('salary updates')) {
    throw new Error(`Follower gate missing 'salary updates': ${dm.followerGatePrompt}`);
  }
});

await test('generateDirectMessagePayload: Strictly zero prohibited hype words and zero raw emojis in DM text', () => {
  const bannedWords = ['world-class', 'cutting-edge', 'seamless', 'leverage', 'unlock your potential', 'revolutionize'];
  const emojiRegex = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

  for (const intent of ['job_seeker', 'employer']) {
    const dm = generateDirectMessagePayload('vip_user', intent);
    for (const banned of bannedWords) {
      if (dm.messageText.toLowerCase().includes(banned)) {
        throw new Error(`Prohibited hype word '${banned}' found in DM message: ${dm.messageText}`);
      }
    }
    if (emojiRegex.test(dm.messageText)) {
      throw new Error(`Raw emoji character found in DM message: ${dm.messageText}`);
    }
  }
});

// -----------------------------------------------------------------------------
// Test Group 5: Operational Constraints & Make.com Operations Budget Audit
// -----------------------------------------------------------------------------

await test('auditMakeOperationsBudget: Native Next.js execution consumes 0 Make.com polling calls', () => {
  const audit = auditMakeOperationsBudget();
  if (audit.commentToDmMakeOps !== 0) {
    throw new Error(`Expected 0 Make.com ops for comment-to-DM, got ${audit.commentToDmMakeOps}`);
  }
  if (audit.pollingTriggersActive !== false) {
    throw new Error(`Expected pollingTriggersActive to be false, got ${audit.pollingTriggersActive}`);
  }
  if (audit.executionMode !== 'native_nextjs_webhook') {
    throw new Error(`Expected executionMode 'native_nextjs_webhook', got ${audit.executionMode}`);
  }
});

await test('auditMakeOperationsBudget: Proves total projected Make operations <= 250 ops/month budget cap', () => {
  const audit = auditMakeOperationsBudget();

  if (audit.totalProjectedMakeOps > audit.monthlyBudgetCap) {
    throw new Error(
      `Projected Make ops (${audit.totalProjectedMakeOps}) exceeds monthly budget cap (${audit.monthlyBudgetCap})`
    );
  }
  if (!audit.underBudgetCap) {
    throw new Error('Expected audit.underBudgetCap to be true');
  }
  if (audit.totalProjectedMakeOps !== 180) {
    throw new Error(`Expected exactly 180 ops for 2 reels/day * 30 days * 3 ops, got ${audit.totalProjectedMakeOps}`);
  }
  if (audit.remainingMakeOpsBuffer < 70) {
    throw new Error(`Expected safety buffer of at least 70 ops, got ${audit.remainingMakeOpsBuffer}`);
  }
  if (!audit.underAccountLimit) {
    throw new Error('Expected audit.underAccountLimit to be true');
  }
});

// -----------------------------------------------------------------------------
// Test Group 6: Synthetic Webhook Ingestion & Action Dispatch (POST /api/webhook/meta)
// -----------------------------------------------------------------------------

function createMetaPostRequest(body, isRaw = false) {
  const headers = new Headers({
    'content-type': 'application/json',
    'user-agent': 'Meta-Webhooks/2.0 (+https://developers.facebook.com)',
  });

  return new NextRequest('http://localhost:3000/api/webhook/meta', {
    method: 'POST',
    headers,
    body: isRaw ? body : JSON.stringify(body),
  });
}

await test('POST /api/webhook/meta: Rejects malformed JSON with HTTP 400 Bad Request', async () => {
  const req = createMetaPostRequest('{ invalid_json_meta_payload: ', true);
  const res = await metaPostHandler(req);

  if (res.status !== 400) {
    throw new Error(`Expected HTTP 400 Bad Request, received HTTP ${res.status}`);
  }
  const json = await res.json();
  if (json.success !== false) {
    throw new Error(`Expected success: false, got: ${JSON.stringify(json)}`);
  }
});

await test("POST /api/webhook/meta: Synthetic Instagram comment with 'JOB' triggers public reply and Job Seeker DM", async () => {
  const payload = {
    object: 'instagram',
    entry: [
      {
        id: '17841400000000000',
        time: 1731315600,
        changes: [
          {
            field: 'comments',
            value: {
              id: 'comment_ig_job_101',
              text: 'Interested in this opening, please send JOB playbook',
              from: {
                id: 'user_ig_202',
                username: 'sundar_chennai',
              },
              media: {
                id: 'media_reel_901',
              },
            },
          },
        ],
      },
    ],
  };

  const req = createMetaPostRequest(payload);
  const res = await metaPostHandler(req);

  if (res.status !== 200) {
    throw new Error(`Expected HTTP 200, received HTTP ${res.status}`);
  }

  const json = await res.json();
  if (!json.success || json.matched !== 1) {
    throw new Error(`Expected 1 matched action, got: ${JSON.stringify(json)}`);
  }

  // Validate actions generated
  const replyAction = json.actions.find((a) => a.type === 'public_reply');
  const dmAction = json.actions.find((a) => a.type === 'direct_message');

  if (!replyAction) throw new Error('Missing public_reply action');
  if (!dmAction) throw new Error('Missing direct_message action');

  if (!replyAction.message.includes('@sundar_chennai')) {
    throw new Error(`Reply action did not tag @sundar_chennai: ${replyAction.message}`);
  }
  if (dmAction.intent !== 'job_seeker') {
    throw new Error(`Expected DM intent 'job_seeker', got: ${dmAction.intent}`);
  }
  if (!dmAction.resourceDownloadUrl.includes('the-2026-ats-bypass-hidden-job-market-playbook.pdf')) {
    throw new Error(`DM action missing Job Seeker PDF URL: ${dmAction.resourceDownloadUrl}`);
  }
  if (!dmAction.followerGatePrompt.includes('@jsmintegratedservices')) {
    throw new Error(`DM action missing @jsmintegratedservices follower prompt: ${dmAction.followerGatePrompt}`);
  }
});

await test("POST /api/webhook/meta: Synthetic Instagram comment with 'HIRE' triggers public reply and Employer DM", async () => {
  const payload = {
    object: 'instagram',
    entry: [
      {
        id: '17841400000000000',
        time: 1731315600,
        changes: [
          {
            field: 'comments',
            value: {
              id: 'comment_ig_hire_102',
              text: 'We are expanding our Trichy plant and looking to HIRE leaders',
              from: {
                id: 'user_ig_303',
                username: 'krishna_manufacturing',
              },
              media: {
                id: 'media_reel_902',
              },
            },
          },
        ],
      },
    ],
  };

  const req = createMetaPostRequest(payload);
  const res = await metaPostHandler(req);

  if (res.status !== 200) {
    throw new Error(`Expected HTTP 200, received HTTP ${res.status}`);
  }

  const json = await res.json();
  if (!json.success || json.matched !== 1) {
    throw new Error(`Expected 1 matched action, got: ${JSON.stringify(json)}`);
  }

  const dmAction = json.actions.find((a) => a.type === 'direct_message');
  if (!dmAction) throw new Error('Missing direct_message action');

  if (dmAction.intent !== 'employer') {
    throw new Error(`Expected DM intent 'employer', got: ${dmAction.intent}`);
  }
  if (!dmAction.resourceDownloadUrl.includes('the-founders-guide-to-zero-retainer-contingency-hiring.pdf')) {
    throw new Error(`DM action missing Employer PDF URL: ${dmAction.resourceDownloadUrl}`);
  }
  if (!dmAction.followerGatePrompt.includes('@jsmintegratedservices')) {
    throw new Error(`DM action missing @jsmintegratedservices follower prompt: ${dmAction.followerGatePrompt}`);
  }
});

await test("POST /api/webhook/meta: Synthetic Instagram comment with 'SWITCH' triggers Job Seeker DM", async () => {
  const payload = {
    object: 'instagram',
    entry: [
      {
        id: '17841400000000000',
        time: 1731315600,
        changes: [
          {
            field: 'comments',
            value: {
              id: 'comment_ig_switch_103',
              text: 'SWITCH',
              from: { id: 'user_ig_404', username: 'priya_dev' },
            },
          },
        ],
      },
    ],
  };

  const req = createMetaPostRequest(payload);
  const res = await metaPostHandler(req);
  const json = await res.json();

  if (json.matched !== 1) {
    throw new Error(`Expected 1 matched action, got: ${json.matched}`);
  }
  const dmAction = json.actions.find((a) => a.type === 'direct_message');
  if (dmAction.intent !== 'job_seeker') {
    throw new Error(`Expected intent 'job_seeker' for 'SWITCH', got: ${dmAction.intent}`);
  }
});

await test("POST /api/webhook/meta: Synthetic Instagram comment with 'TALENT' triggers Employer DM", async () => {
  const payload = {
    object: 'instagram',
    entry: [
      {
        id: '17841400000000000',
        time: 1731315600,
        changes: [
          {
            field: 'comments',
            value: {
              id: 'comment_ig_talent_104',
              text: 'TALENT',
              from: { id: 'user_ig_505', username: 'ramesh_hr' },
            },
          },
        ],
      },
    ],
  };

  const req = createMetaPostRequest(payload);
  const res = await metaPostHandler(req);
  const json = await res.json();

  if (json.matched !== 1) {
    throw new Error(`Expected 1 matched action, got: ${json.matched}`);
  }
  const dmAction = json.actions.find((a) => a.type === 'direct_message');
  if (dmAction.intent !== 'employer') {
    throw new Error(`Expected intent 'employer' for 'TALENT', got: ${dmAction.intent}`);
  }
});

await test("POST /api/webhook/meta: Synthetic Facebook comment with 'HIRE' on page feed triggers Employer actions", async () => {
  const payload = {
    object: 'page',
    entry: [
      {
        id: 'page_fb_12345',
        time: 1731315600,
        changes: [
          {
            field: 'feed',
            value: {
              item: 'comment',
              comment_id: 'fb_comm_555',
              message: 'We want to HIRE new engineering leaders',
              from: { id: 'fb_user_888', name: 'Saravanan Muthu' },
              post_id: 'fb_post_999',
            },
          },
        ],
      },
    ],
  };

  const req = createMetaPostRequest(payload);
  const res = await metaPostHandler(req);
  const json = await res.json();

  if (res.status !== 200) {
    throw new Error(`Expected HTTP 200, received HTTP ${res.status}`);
  }
  if (json.matched !== 1) {
    throw new Error(`Expected 1 match, got: ${json.matched}`);
  }

  const dmAction = json.actions.find((a) => a.type === 'direct_message');
  if (dmAction.platform !== 'facebook') {
    throw new Error(`Expected platform 'facebook', got: ${dmAction.platform}`);
  }
  if (dmAction.intent !== 'employer') {
    throw new Error(`Expected intent 'employer', got: ${dmAction.intent}`);
  }
});

await test('POST /api/webhook/meta: Unmatched comment cleanly ignored with HTTP 200 and 0 actions', async () => {
  const payload = {
    object: 'instagram',
    entry: [
      {
        id: '17841400000000000',
        time: 1731315600,
        changes: [
          {
            field: 'comments',
            value: {
              id: 'comment_ig_noise_999',
              text: 'Very informative video, thank you for sharing this update.',
              from: { id: 'user_ig_999', username: 'random_follower' },
            },
          },
        ],
      },
    ],
  };

  const req = createMetaPostRequest(payload);
  const res = await metaPostHandler(req);
  const json = await res.json();

  if (res.status !== 200) {
    throw new Error(`Expected HTTP 200 for unmatched comment, received HTTP ${res.status}`);
  }
  if (json.matched !== 0 || json.actions.length !== 0) {
    throw new Error(`Expected 0 matched actions for noise comment, got: ${JSON.stringify(json)}`);
  }
  if (json.status !== 'ignored_non_trigger') {
    throw new Error(`Expected status 'ignored_non_trigger', got: ${json.status}`);
  }
});

await test('POST /api/webhook/meta: Non-comment webhook event returns HTTP 200 with ignored status', async () => {
  const payload = {
    object: 'instagram',
    entry: [
      {
        id: '17841400000000000',
        time: 1731315600,
        changes: [],
      },
    ],
  };

  const req = createMetaPostRequest(payload);
  const res = await metaPostHandler(req);
  const json = await res.json();

  if (res.status !== 200) {
    throw new Error(`Expected HTTP 200, received HTTP ${res.status}`);
  }
  if (json.status !== 'ignored_non_comment_event') {
    throw new Error(`Expected status 'ignored_non_comment_event', got: ${json.status}`);
  }
  if (json.processed !== 0 || json.actions.length !== 0) {
    throw new Error(`Expected 0 processed, got: ${json.processed}`);
  }
});

// -----------------------------------------------------------------------------
// Summary
// -----------------------------------------------------------------------------
console.log('\n----------------------------------------------------------------------');
console.log(`TIER 2 VIRAL COMMENT GATING SUMMARY: ${passedTests}/${totalTests} tests passed (${failedTests} failed)`);
console.log('----------------------------------------------------------------------\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
