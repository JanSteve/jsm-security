/**
/**
 * Comprehensive Empirical Adversarial & Boundary Test Suite for JSM Backend APIs
 * Tests:
 * 1. /api/contact
 * 2. /api/landing-lead
 * 3. /api/quote-pdf
 * 4. Security guards (Bot filtering, Rate limiting, Sanitization, Malformed JSON)
 */

import { NextRequest } from 'next/server.js';
import { POST as contactHandler } from '../src/app/api/contact/route.ts';
import { POST as landingLeadHandler } from '../src/app/api/landing-lead/route.ts';
import { POST as quotePdfHandler } from '../src/app/api/quote-pdf/route.ts';

console.log('======================================================================');
console.log('  CHALLENGER 1: EMPIRICAL ADVERSARIAL BACKEND API TEST HARNESS');
console.log('======================================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

let ipCounter = 1;
function getUniqueIp() {
  ipCounter++;
  return `10.0.${Math.floor(ipCounter / 254)}.${(ipCounter % 254) + 1}`;
}

async function runTestCase({
  name,
  handler,
  url,
  method = 'POST',
  headers = {},
  rawBody,
  expectedStatus,
  expectedSuccess,
  expectedErrorMessageSubstring,
  customValidator,
}) {
  totalTests++;
  const testId = `[TEST ${String(totalTests).padStart(2, '0')}]`;

  const requestHeaders = new Headers({
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)',
    'x-forwarded-for': getUniqueIp(),
    'content-type': 'application/json',
    ...headers,
  });

  const request = new NextRequest(url, {
    method,
    headers: requestHeaders,
    body: rawBody,
  });

  try {
    const res = await handler(request);
    const status = res.status;
    const contentType = res.headers.get('content-type') || '';

    let jsonBody = null;
    let textBody = '';

    if (contentType.includes('application/json')) {
      jsonBody = await res.json();
    } else {
      textBody = await res.text();
    }

    let statusMatch = status === expectedStatus;
    let successMatch = true;
    if (expectedSuccess !== undefined && jsonBody) {
      successMatch = jsonBody.success === expectedSuccess;
    }

    let errorMsgMatch = true;
    if (expectedErrorMessageSubstring) {
      const err = jsonBody?.error || textBody;
      errorMsgMatch = typeof err === 'string' && err.toLowerCase().includes(expectedErrorMessageSubstring.toLowerCase());
    }

    let customPassed = true;
    let customError = '';
    if (customValidator) {
      try {
        const valResult = customValidator({ status, jsonBody, textBody, res });
        if (valResult !== true) {
          customPassed = false;
          customError = typeof valResult === 'string' ? valResult : 'Custom validation failed';
        }
      } catch (err) {
        customPassed = false;
        customError = `Custom validator exception: ${err.message}`;
      }
    }

    if (statusMatch && successMatch && errorMsgMatch && customPassed) {
      console.log(`✓ ${testId} PASS: ${name} (Status: ${status})`);
      passedTests++;
      return { pass: true, status, body: jsonBody || textBody };
    } else {
      const reason = [
        !statusMatch ? `Expected HTTP ${expectedStatus}, received ${status}` : null,
        !successMatch ? `Expected success=${expectedSuccess}, received ${jsonBody?.success}` : null,
        !errorMsgMatch ? `Expected error containing "${expectedErrorMessageSubstring}", received "${jsonBody?.error || textBody}"` : null,
        !customPassed ? customError : null,
      ]
        .filter(Boolean)
        .join('; ');

      console.error(`✗ ${testId} FAIL: ${name}`);
      console.error(`   Details: ${reason}`);
      console.error(`   Received body:`, jsonBody || textBody.slice(0, 200));
      failedTests++;
      failures.push({ name, reason });
      return { pass: false, status, body: jsonBody || textBody };
    }
  } catch (err) {
    console.error(`✗ ${testId} EXCEPTION: ${name} -> ${err.message}`);
    failedTests++;
    failures.push({ name, reason: `Unhandled Exception: ${err.message}` });
    return { pass: false, error: err };
  }
}

async function runAllTests() {
  // ==========================================================================
  // SECTION 1: /api/contact Adversarial & Boundary Tests
  // ==========================================================================
  console.log('\n--- SECTION 1: /api/contact ADVERSARIAL & BOUNDARY TESTS ---');

  // C1: Empty JSON payload
  await runTestCase({
    name: '/api/contact - Empty JSON payload {}',
    handler: contactHandler,
    url: 'http://localhost:3000/api/contact',
    rawBody: JSON.stringify({}),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'required',
    customValidator: ({ jsonBody }) => Array.isArray(jsonBody.details) && jsonBody.details.length >= 2,
  });

  // C2: Missing phone
  await runTestCase({
    name: '/api/contact - Missing required phone field',
    handler: contactHandler,
    url: 'http://localhost:3000/api/contact',
    rawBody: JSON.stringify({ name: 'Sweety J' }),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'phone',
  });

  // C3: Missing name
  await runTestCase({
    name: '/api/contact - Missing required name field',
    handler: contactHandler,
    url: 'http://localhost:3000/api/contact',
    rawBody: JSON.stringify({ phone: '9842472370' }),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'name',
  });

  // C4: Name boundary: 1 char (under min length 2)
  await runTestCase({
    name: '/api/contact - Boundary: name length = 1 (< min 2)',
    handler: contactHandler,
    url: 'http://localhost:3000/api/contact',
    rawBody: JSON.stringify({ name: 'A', phone: '9842472370' }),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'at least 2 characters',
  });

  // C5: Name boundary: 101 chars (over max length 100)
  await runTestCase({
    name: '/api/contact - Boundary: name length = 101 (> max 100)',
    handler: contactHandler,
    url: 'http://localhost:3000/api/contact',
    rawBody: JSON.stringify({ name: 'A'.repeat(101), phone: '9842472370' }),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'not exceed 100 characters',
  });

  // C6: Invalid phone format (letters)
  await runTestCase({
    name: '/api/contact - Malformed type: alphanumeric phone',
    handler: contactHandler,
    url: 'http://localhost:3000/api/contact',
    rawBody: JSON.stringify({ name: 'Sweety J', phone: 'not-a-valid-phone' }),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'phone',
  });

  // C7: Invalid phone format: too short (5 digits)
  await runTestCase({
    name: '/api/contact - Boundary: phone too short (5 digits < 10)',
    handler: contactHandler,
    url: 'http://localhost:3000/api/contact',
    rawBody: JSON.stringify({ name: 'Sweety J', phone: '12345' }),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: '10-15 digits',
  });

  // C8: Invalid phone format: too long (20 digits)
  await runTestCase({
    name: '/api/contact - Boundary: phone too long (20 digits > 15)',
    handler: contactHandler,
    url: 'http://localhost:3000/api/contact',
    rawBody: JSON.stringify({ name: 'Sweety J', phone: '12345678901234567890' }),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: '10-15 digits',
  });

  // C9: Invalid email format
  await runTestCase({
    name: '/api/contact - Malformed email format',
    handler: contactHandler,
    url: 'http://localhost:3000/api/contact',
    rawBody: JSON.stringify({ name: 'Sweety J', phone: '9842472370', email: 'not-an-email' }),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'invalid email',
  });

  // C10: Message boundary: 2001 chars (> max 2000)
  await runTestCase({
    name: '/api/contact - Boundary: message length 2001 (> max 2000)',
    handler: contactHandler,
    url: 'http://localhost:3000/api/contact',
    rawBody: JSON.stringify({ name: 'Sweety J', phone: '9842472370', message: 'X'.repeat(2001) }),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'not exceed 2000 characters',
  });

  // C11: Wrong types: numbers for name
  await runTestCase({
    name: '/api/contact - Type mismatch: number provided for name string',
    handler: contactHandler,
    url: 'http://localhost:3000/api/contact',
    rawBody: JSON.stringify({ name: 9876543, phone: '9842472370' }),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'expected string',
  });

  // C12: Honeypot bot trap triggered
  await runTestCase({
    name: '/api/contact - Bot defense: honeypot trap field filled',
    handler: contactHandler,
    url: 'http://localhost:3000/api/contact',
    rawBody: JSON.stringify({ name: 'Sweety J', phone: '9842472370', honeypot: 'spam_bot_data' }),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'spam bot detected',
  });

  // C13: Malformed JSON syntax
  await runTestCase({
    name: '/api/contact - Malformed JSON payload syntax',
    handler: contactHandler,
    url: 'http://localhost:3000/api/contact',
    rawBody: '{"name": "Sweety J", "phone": broken_json',
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'Invalid JSON payload',
  });

  // C14: Valid payload (standard)
  await runTestCase({
    name: '/api/contact - Valid payload returns 200 OK with referenceId',
    handler: contactHandler,
    url: 'http://localhost:3000/api/contact',
    rawBody: JSON.stringify({
      name: 'Sweety J',
      phone: '+91 98424 72370',
      email: 'contact@jsmintegratedservices.com',
      service: 'Physical Security Guarding',
      facilityName: 'Trichy Operations HQ',
      location: 'Tiruchirappalli',
      notes: 'Need 6 armed security guards for warehouse facility.',
    }),
    expectedStatus: 200,
    expectedSuccess: true,
    customValidator: ({ jsonBody }) => {
      return (
        typeof jsonBody.referenceId === 'string' &&
        jsonBody.referenceId.startsWith('JSM-REQ-')
      );
    },
  });

  // C15: Script injection & XSS payload resilience
  await runTestCase({
    name: '/api/contact - Script injection & XSS sanitization resilience',
    handler: contactHandler,
    url: 'http://localhost:3000/api/contact',
    rawBody: JSON.stringify({
      name: '<script>alert("xss")</script>Sweety J',
      phone: '9842472370',
      message: '<img src=x onerror=alert(1)>Critical inquiry<iframe src="evil.com"></iframe>',
      facilityName: '<b>Enterprise Unit</b>',
    }),
    expectedStatus: 200,
    expectedSuccess: true,
    customValidator: ({ jsonBody }) => jsonBody.success === true && typeof jsonBody.referenceId === 'string',
  });

  // ==========================================================================
  // SECTION 2: /api/landing-lead Adversarial & Boundary Tests
  // ==========================================================================
  console.log('\n--- SECTION 2: /api/landing-lead ADVERSARIAL & BOUNDARY TESTS ---');

  // L1: Empty JSON payload
  await runTestCase({
    name: '/api/landing-lead - Empty JSON payload {}',
    handler: landingLeadHandler,
    url: 'http://localhost:3000/api/landing-lead',
    rawBody: JSON.stringify({}),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'required',
  });

  // L2: Missing requirement and service
  await runTestCase({
    name: '/api/landing-lead - Missing both requirement and service',
    handler: landingLeadHandler,
    url: 'http://localhost:3000/api/landing-lead',
    rawBody: JSON.stringify({ name: 'Major Devadoss', phone: '9842472370' }),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'requirement or service',
  });

  // L3: Requirement too short (< 2 chars)
  await runTestCase({
    name: '/api/landing-lead - Boundary: requirement length 1 (< min 2)',
    handler: landingLeadHandler,
    url: 'http://localhost:3000/api/landing-lead',
    rawBody: JSON.stringify({ name: 'Major Devadoss', phone: '9842472370', requirement: 'X' }),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'min 2 characters',
  });

  // L4: Name too short (< 2 chars)
  await runTestCase({
    name: '/api/landing-lead - Boundary: name length 1 (< min 2)',
    handler: landingLeadHandler,
    url: 'http://localhost:3000/api/landing-lead',
    rawBody: JSON.stringify({ name: 'M', phone: '9842472370', requirement: 'Facility Guarding' }),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'at least 2 characters',
  });

  // L5: Malformed type: number instead of string for phone
  await runTestCase({
    name: '/api/landing-lead - Type mismatch: number provided for phone',
    handler: landingLeadHandler,
    url: 'http://localhost:3000/api/landing-lead',
    rawBody: JSON.stringify({ name: 'Major Devadoss', phone: 9842472370, requirement: 'Facility Guarding' }),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'expected string',
  });

  // L6: Invalid email format
  await runTestCase({
    name: '/api/landing-lead - Invalid email address format',
    handler: landingLeadHandler,
    url: 'http://localhost:3000/api/landing-lead',
    rawBody: JSON.stringify({
      name: 'Major Devadoss',
      phone: '9842472370',
      email: 'devadoss@invalid_domain',
      requirement: 'Industrial Staffing',
    }),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'invalid email',
  });

  // L7: Honeypot bot trap triggered
  await runTestCase({
    name: '/api/landing-lead - Bot defense: honeypot field filled',
    handler: landingLeadHandler,
    url: 'http://localhost:3000/api/landing-lead',
    rawBody: JSON.stringify({
      name: 'Major Devadoss',
      phone: '9842472370',
      requirement: 'Security',
      honeypot: 'crawler_bot_signature',
    }),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'spam bot detected',
  });

  // L8: Malformed JSON syntax
  await runTestCase({
    name: '/api/landing-lead - Malformed JSON syntax',
    handler: landingLeadHandler,
    url: 'http://localhost:3000/api/landing-lead',
    rawBody: '{name: "Unquoted key"}',
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'Invalid JSON payload',
  });

  // L9: Valid payload with requirement
  await runTestCase({
    name: '/api/landing-lead - Valid payload with requirement returns 200 OK',
    handler: landingLeadHandler,
    url: 'http://localhost:3000/api/landing-lead',
    rawBody: JSON.stringify({
      name: 'Major AR Devadoss',
      phone: '+91-98424-72370',
      email: 'devadoss@jsmintegratedservices.com',
      requirement: 'Industrial Factory Security & Surveillance',
      city: 'Chennai OMR',
      source_page: 'Google Ads Landing Page',
    }),
    expectedStatus: 200,
    expectedSuccess: true,
    customValidator: ({ jsonBody }) => typeof jsonBody.referenceId === 'string' && jsonBody.referenceId.startsWith('JSM-LEAD-'),
  });

  // L10: Valid payload with service instead of requirement
  await runTestCase({
    name: '/api/landing-lead - Valid payload using service fallback field returns 200 OK',
    handler: landingLeadHandler,
    url: 'http://localhost:3000/api/landing-lead',
    rawBody: JSON.stringify({
      name: 'R Jan Steve Daniel',
      phone: '9842472370',
      service: 'Mechanized Housekeeping and Manpower',
      city: 'Coimbatore',
    }),
    expectedStatus: 200,
    expectedSuccess: true,
    customValidator: ({ jsonBody }) => jsonBody.success === true,
  });

  // L11: Script injection & XSS sanitization
  await runTestCase({
    name: '/api/landing-lead - Script injection & XSS resilience',
    handler: landingLeadHandler,
    url: 'http://localhost:3000/api/landing-lead',
    rawBody: JSON.stringify({
      name: '<script>document.location="http://attacker.com"</script>CTO Daniel',
      phone: '9842472370',
      requirement: '<svg/onload=alert(1)>Urgent Corporate Manpower Requirement',
      city: '<b>Trichy</b>',
    }),
    expectedStatus: 200,
    expectedSuccess: true,
    customValidator: ({ jsonBody }) => jsonBody.success === true,
  });

  // ==========================================================================
  // SECTION 3: /api/quote-pdf Adversarial & Boundary Tests
  // ==========================================================================
  console.log('\n--- SECTION 3: /api/quote-pdf ADVERSARIAL & BOUNDARY TESTS ---');

  // Q1: Empty JSON payload
  await runTestCase({
    name: '/api/quote-pdf - Empty JSON payload {}',
    handler: quotePdfHandler,
    url: 'http://localhost:3000/api/quote-pdf',
    rawBody: JSON.stringify({}),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'required',
  });

  // Q2: Missing services field completely
  await runTestCase({
    name: '/api/quote-pdf - Missing required services field',
    handler: quotePdfHandler,
    url: 'http://localhost:3000/api/quote-pdf',
    rawBody: JSON.stringify({
      companyName: 'JSM Integrated Services',
      contactPerson: 'Steve Daniel',
      email: 'steve@jsmintegratedservices.com',
      phone: '9842472370',
    }),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'Services array is required',
  });

  // Q3: Empty services array []
  await runTestCase({
    name: '/api/quote-pdf - Boundary: services array is empty []',
    handler: quotePdfHandler,
    url: 'http://localhost:3000/api/quote-pdf',
    rawBody: JSON.stringify({
      companyName: 'JSM Integrated Services',
      contactPerson: 'Steve Daniel',
      email: 'steve@jsmintegratedservices.com',
      phone: '9842472370',
      services: [],
    }),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'At least one service must be selected',
  });

  // Q4: Services is a string instead of an array (malformed type)
  await runTestCase({
    name: '/api/quote-pdf - Type mismatch: services passed as string instead of array',
    handler: quotePdfHandler,
    url: 'http://localhost:3000/api/quote-pdf',
    rawBody: JSON.stringify({
      companyName: 'JSM Integrated Services',
      contactPerson: 'Steve Daniel',
      email: 'steve@jsmintegratedservices.com',
      phone: '9842472370',
      services: 'Private Security Guarding',
    }),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'Services must be an array',
  });

  // Q5: Services containing empty string
  await runTestCase({
    name: '/api/quote-pdf - Boundary: services array contains empty string',
    handler: quotePdfHandler,
    url: 'http://localhost:3000/api/quote-pdf',
    rawBody: JSON.stringify({
      companyName: 'JSM Integrated Services',
      contactPerson: 'Steve Daniel',
      email: 'steve@jsmintegratedservices.com',
      phone: '9842472370',
      services: [''],
    }),
    expectedStatus: 400,
    expectedSuccess: false,
  });

  // Q6: Services object with negative quantity
  await runTestCase({
    name: '/api/quote-pdf - Boundary: service quantity is negative',
    handler: quotePdfHandler,
    url: 'http://localhost:3000/api/quote-pdf',
    rawBody: JSON.stringify({
      companyName: 'JSM Integrated Services',
      contactPerson: 'Steve Daniel',
      email: 'steve@jsmintegratedservices.com',
      phone: '9842472370',
      services: [{ name: 'Security Guarding', quantity: -3 }],
    }),
    expectedStatus: 400,
    expectedSuccess: false,
  });

  // Q7: Missing required email
  await runTestCase({
    name: '/api/quote-pdf - Missing required email',
    handler: quotePdfHandler,
    url: 'http://localhost:3000/api/quote-pdf',
    rawBody: JSON.stringify({
      companyName: 'JSM Integrated Services',
      contactPerson: 'Steve Daniel',
      phone: '9842472370',
      services: ['Security Guarding'],
    }),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'Email is required',
  });

  // Q8: Invalid email format
  await runTestCase({
    name: '/api/quote-pdf - Invalid email address format',
    handler: quotePdfHandler,
    url: 'http://localhost:3000/api/quote-pdf',
    rawBody: JSON.stringify({
      companyName: 'JSM Integrated Services',
      contactPerson: 'Steve Daniel',
      email: 'invalid-email-string',
      phone: '9842472370',
      services: ['Security Guarding'],
    }),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'Valid email address',
  });

  // Q9: Company name too short (< 2 chars)
  await runTestCase({
    name: '/api/quote-pdf - Boundary: company name length 1 (< min 2)',
    handler: quotePdfHandler,
    url: 'http://localhost:3000/api/quote-pdf',
    rawBody: JSON.stringify({
      companyName: 'X',
      contactPerson: 'Steve Daniel',
      email: 'steve@example.com',
      phone: '9842472370',
      services: ['Security Guarding'],
    }),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'at least 2 characters',
  });

  // Q10: Contact person too short (< 2 chars)
  await runTestCase({
    name: '/api/quote-pdf - Boundary: contact person length 1 (< min 2)',
    handler: quotePdfHandler,
    url: 'http://localhost:3000/api/quote-pdf',
    rawBody: JSON.stringify({
      companyName: 'JSM Enterprises',
      contactPerson: 'Y',
      email: 'steve@example.com',
      phone: '9842472370',
      services: ['Security Guarding'],
    }),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'at least 2 characters',
  });

  // Q11: Personnel count boundary: 501 (> max 500)
  await runTestCase({
    name: '/api/quote-pdf - Boundary: personnelCount 501 (> max 500)',
    handler: quotePdfHandler,
    url: 'http://localhost:3000/api/quote-pdf',
    rawBody: JSON.stringify({
      companyName: 'JSM Enterprises',
      contactPerson: 'Steve Daniel',
      email: 'steve@example.com',
      phone: '9842472370',
      services: ['Security Guarding'],
      personnelCount: 501,
    }),
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'not exceed 500',
  });

  // Q12: Malformed JSON syntax
  await runTestCase({
    name: '/api/quote-pdf - Malformed JSON payload syntax',
    handler: quotePdfHandler,
    url: 'http://localhost:3000/api/quote-pdf',
    rawBody: '{broken_json_syntax',
    expectedStatus: 400,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'Invalid JSON payload',
  });

  // Q13: Valid payload returning HTML print view (default)
  await runTestCase({
    name: '/api/quote-pdf - Valid payload returns HTML printable document by default',
    handler: quotePdfHandler,
    url: 'http://localhost:3000/api/quote-pdf',
    rawBody: JSON.stringify({
      companyName: 'Apex Manufacturing Hub',
      contactPerson: 'R Jan Steve Daniel',
      email: 'daniel@apexmanufacturing.in',
      phone: '9842472370',
      services: ['Private Security Guarding', 'Commercial Housekeeping'],
      personnelCount: 10,
      shiftPattern: '24/7',
      city: 'Tiruchirappalli',
    }),
    expectedStatus: 200,
    customValidator: ({ textBody, res }) => {
      const isHtml = (res.headers.get('content-type') || '').includes('text/html');
      const hasTitle = textBody.includes('Commercial Proposal') || textBody.includes('JSM INTEGRATED SERVICES');
      const hasGuarantee = textBody.includes('The JSM Guarantee');
      const hasClient = textBody.includes('Apex Manufacturing Hub');
      return isHtml && hasTitle && hasGuarantee && hasClient;
    },
  });

  // Q14: Valid payload with format="json" returns structured estimate data
  await runTestCase({
    name: '/api/quote-pdf - Valid payload with format="json" returns structured calculation data',
    handler: quotePdfHandler,
    url: 'http://localhost:3000/api/quote-pdf',
    rawBody: JSON.stringify({
      companyName: 'Apex Manufacturing Hub',
      contactPerson: 'R Jan Steve Daniel',
      email: 'daniel@apexmanufacturing.in',
      phone: '9842472370',
      services: ['Private Security Guarding', 'Commercial Housekeeping'],
      personnelCount: 4,
      shiftPattern: '12-hour',
      city: 'Chennai',
      format: 'json',
    }),
    expectedStatus: 200,
    expectedSuccess: true,
    customValidator: ({ jsonBody }) => {
      const hasReference = typeof jsonBody.referenceId === 'string' && jsonBody.referenceId.startsWith('JSM-Q-');
      const hasEstimates = Array.isArray(jsonBody.estimates) && jsonBody.estimates.length === 2;
      const hasTotals = jsonBody.monthlyTotal && jsonBody.monthlyTotal.min > 0 && jsonBody.monthlyTotal.max > 0;
      const hasCompliance = typeof jsonBody.compliance === 'string' && jsonBody.compliance.includes('EPF');
      return hasReference && hasEstimates && hasTotals && hasCompliance;
    },
  });

  // Q15: Valid payload with Accept: application/json header triggers JSON dual-response
  await runTestCase({
    name: '/api/quote-pdf - Dual response: Accept: application/json header returns JSON format',
    handler: quotePdfHandler,
    url: 'http://localhost:3000/api/quote-pdf',
    headers: { accept: 'application/json' },
    rawBody: JSON.stringify({
      companyName: 'Salem Steel Works',
      contactPerson: 'Major Devadoss',
      email: 'devadoss@salemsteel.in',
      phone: '9842472370',
      services: ['Ex-Servicemen Armed Guarding'],
      personnelCount: 2,
    }),
    expectedStatus: 200,
    expectedSuccess: true,
    customValidator: ({ jsonBody }) => jsonBody.success === true && Array.isArray(jsonBody.estimates),
  });

  // Q16: Valid payload with structured service objects (custom quantity and rate)
  await runTestCase({
    name: '/api/quote-pdf - Structured service objects with individual quantities and rates',
    handler: quotePdfHandler,
    url: 'http://localhost:3000/api/quote-pdf',
    rawBody: JSON.stringify({
      companyName: 'Coimbatore Textile Mills',
      contactPerson: 'Murugan K.',
      email: 'murugan@textiles.in',
      phone: '9842472370',
      services: [
        { name: 'Private Security Guarding', quantity: 6 },
        { name: 'Specialized Drone Surveillance', quantity: 2, rate: 25000 },
      ],
      format: 'json',
    }),
    expectedStatus: 200,
    expectedSuccess: true,
    customValidator: ({ jsonBody }) => {
      const secEst = jsonBody.estimates.find((e) => e.service.includes('Security'));
      const droneEst = jsonBody.estimates.find((e) => e.service.includes('Drone'));
      return secEst?.personnel === 6 && droneEst?.personnel === 2 && droneEst?.rateMin === 25000;
    },
  });

  // Q17: Alternative field names (company, customerName)
  await runTestCase({
    name: '/api/quote-pdf - Alternative field aliases (company, customerName) supported',
    handler: quotePdfHandler,
    url: 'http://localhost:3000/api/quote-pdf',
    rawBody: JSON.stringify({
      company: 'Trichy Hospital & Diagnostics',
      customerName: 'Dr. Priya Sundaram',
      email: 'priya@trichyhospital.org',
      phone: '9842472370',
      services: ['Contractual Manpower'],
      format: 'json',
    }),
    expectedStatus: 200,
    expectedSuccess: true,
    customValidator: ({ jsonBody }) =>
      jsonBody.company === 'Trichy Hospital &amp; Diagnostics' ||
      jsonBody.company === 'Trichy Hospital & Diagnostics',
  });

  // Q18: Script injection & XSS resilience in Quote PDF
  await runTestCase({
    name: '/api/quote-pdf - Script injection & XSS HTML entity escaping',
    handler: quotePdfHandler,
    url: 'http://localhost:3000/api/quote-pdf',
    rawBody: JSON.stringify({
      companyName: '<script>alert("pwned")</script>Secure Corp',
      contactPerson: '<img src=x onerror=alert(2)>Daniel',
      email: 'safe@company.org',
      phone: '9842472370',
      services: ['<script>evil()</script>Security Guarding'],
      specialReqs: '<iframe src="malicious.site"></iframe>Urgent requirement',
      format: 'html',
    }),
    expectedStatus: 200,
    customValidator: ({ textBody }) => {
      // Must NOT contain raw unescaped script or iframe tags
      const rawScript = textBody.includes('<script>alert("pwned")</script>');
      const rawIframe = textBody.includes('<iframe src="malicious.site"></iframe>');
      // Must contain escaped entities
      const escapedScript = textBody.includes('&lt;script&gt;') || !rawScript;
      return !rawScript && !rawIframe && escapedScript;
    },
  });

  // ==========================================================================
  // SECTION 4: Security Layer Guards (Bot Filtering & Rate Limiting)
  // ==========================================================================
  console.log('\n--- SECTION 4: SECURITY GUARDS & THREAT MITIGATION TESTS ---');

  // S1: Bad Bot User-Agent blocked with 403 Forbidden
  await runTestCase({
    name: 'Security Guard - Bad Bot / Scraper blocked with 403 Forbidden',
    handler: contactHandler,
    url: 'http://localhost:3000/api/contact',
    headers: {
      'user-agent': 'Scrapy/2.11.0 (+https://scrapy.org) evil-scraper-bot',
    },
    rawBody: JSON.stringify({ name: 'Bot Crawler', phone: '9842472370' }),
    expectedStatus: 403,
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'Access denied',
  });

  // S2: Good Bot / Search Engine crawler whitelisted
  await runTestCase({
    name: 'Security Guard - Whitelisted crawler (Googlebot) allowed through bot filter',
    handler: contactHandler,
    url: 'http://localhost:3000/api/contact',
    headers: {
      'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    },
    rawBody: JSON.stringify({}), // Empty payload to check that it passed bot filter to Zod validation (400)
    expectedStatus: 400, // Passed 403 check, hit 400 validation error
    expectedSuccess: false,
    expectedErrorMessageSubstring: 'required',
  });

  // S3: In-Memory Rate Limiter - Enforce 429 Too Many Requests after threshold
  console.log('\nTesting In-Memory Rate Limiter (flooding /api/contact from fixed IP)...');
  const floodIp = '203.0.113.99';
  let floodResponses = [];
  for (let i = 1; i <= 15; i++) {
    const req = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: new Headers({
        'user-agent': 'Mozilla/5.0 Normal Browser',
        'content-type': 'application/json',
        'x-forwarded-for': floodIp,
      }),
      body: JSON.stringify({}),
    });
    const res = await contactHandler(req);
    floodResponses.push(res.status);
  }

  totalTests++;
  const testIdRateLimit = `[TEST ${String(totalTests).padStart(2, '0')}]`;
  const rateLimitTriggered = floodResponses.slice(10).some((code) => code === 429);
  if (rateLimitTriggered) {
    console.log(`✓ ${testIdRateLimit} PASS: Rate limiter throttled requests exceeding quota with 429 Too Many Requests`);
    passedTests++;
  } else {
    console.error(`✗ ${testIdRateLimit} FAIL: Rate limiter did not return 429. Statuses: ${floodResponses.join(', ')}`);
    failedTests++;
    failures.push({ name: 'Rate limiter enforcement', reason: 'Did not return 429 after 10 requests' });
  }

  // ==========================================================================
  // FINAL EMPIRICAL SUMMARY
  // ==========================================================================
  console.log('\n======================================================================');
  console.log(`  EMPIRICAL TEST SUITE SUMMARY: ${passedTests} PASSED / ${totalTests} TOTAL (${failedTests} FAILED)`);
  console.log('======================================================================\n');

  if (failedTests > 0) {
    console.error('FAILED TEST SUMMARY:');
    failures.forEach((f, idx) => {
      console.error(`  ${idx + 1}. ${f.name} -> ${f.reason}`);
    });
    process.exit(1);
  } else {
    console.log('ALL EMPIRICAL TEST CASES PASSED WITH 100% SUCCESS RATE.');
    process.exit(0);
  }
}

runAllTests().catch((err) => {
  console.error('Fatal test harness execution error:', err);
  process.exit(1);
});
