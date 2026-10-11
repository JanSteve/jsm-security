import { z } from 'zod';

const phoneRegex = /^[0-9+() -]{10,15}$/;

/**
 * Validation schema for /api/contact endpoint.
 * Supports web form fields and API contract specifications.
 */
export const contactSchema = z
  .object({
    name: z
      .string({ required_error: 'Name is required' })
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must not exceed 100 characters'),
    phone: z
      .string({ required_error: 'Phone number is required' })
      .trim()
      .regex(phoneRegex, 'Invalid phone number format (must be 10-15 digits)'),
    email: z
      .string()
      .trim()
      .email('Invalid email address')
      .optional()
      .or(z.literal(''))
      .nullable(),
    service: z.string().trim().optional().default('General Integrated Facility Support'),
    facilityName: z.string().trim().max(150).optional().default(''),
    company: z.string().trim().max(150).optional().default(''),
    headcount: z.string().trim().max(50).optional().default(''),
    location: z.string().trim().max(100).optional().default('Tamil Nadu'),
    city: z.string().trim().max(100).optional().default(''),
    notes: z.string().trim().max(2000, 'Notes must not exceed 2000 characters').optional().default(''),
    message: z.string().trim().max(2000, 'Message must not exceed 2000 characters').optional().default(''),
    referenceId: z.string().trim().optional(),
    honeypot: z.string().optional().default(''),
  })
  .refine((data) => !data.honeypot || data.honeypot.trim() === '', {
    message: 'Spam bot detected',
    path: ['honeypot'],
  });

export type ContactInput = z.infer<typeof contactSchema>;

/**
 * Validation schema for /api/landing-lead endpoint.
 * Used by ad landing pages and lead generation campaigns.
 */
export const landingLeadSchema = z
  .object({
    name: z
      .string({ required_error: 'Name is required' })
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must not exceed 100 characters'),
    phone: z
      .string({ required_error: 'Phone number is required' })
      .trim()
      .regex(phoneRegex, 'Invalid phone number format (must be 10-15 digits)'),
    email: z
      .string()
      .trim()
      .email('Invalid email address')
      .optional()
      .or(z.literal(''))
      .nullable(),
    requirement: z.string().trim().max(1000).optional().default(''),
    service: z.string().trim().max(100).optional().default(''),
    city: z.string().trim().max(100).optional().default('Tamil Nadu'),
    source: z.string().trim().max(100).optional(),
    source_page: z.string().trim().max(150).optional().default('Direct Landing Campaign'),
    honeypot: z.string().optional().default(''),
  })
  .refine((data) => !data.honeypot || data.honeypot.trim() === '', {
    message: 'Spam bot detected',
    path: ['honeypot'],
  })
  .refine(
    (data) => {
      const req = (data.requirement || data.service || '').trim();
      return req.length >= 2;
    },
    {
      message: 'Requirement or service description is required (min 2 characters)',
      path: ['requirement'],
    }
  );

export type LandingLeadInput = z.infer<typeof landingLeadSchema>;

/**
 * Item schema for quote services.
 * Can be a plain string name or structured object.
 */
const serviceItemSchema = z.union([
  z.string().trim().min(1, 'Service name cannot be empty'),
  z.object({
    name: z.string().trim().min(1, 'Service name is required'),
    quantity: z.coerce.number().int().positive('Quantity must be a positive integer').optional().default(1),
    rate: z.coerce.number().nonnegative().optional(),
  }),
]);

/**
 * Validation schema for /api/quote-pdf endpoint.
 * Ensures services is a non-empty array with positive quantities.
 */
export const quotePdfSchema = z
  .object({
    companyName: z.string().trim().optional().default(''),
    company: z.string().trim().optional().default(''),
    contactPerson: z.string().trim().optional().default(''),
    customerName: z.string().trim().optional().default(''),
    email: z.string({ required_error: 'Email is required' }).trim().email('Valid email address is required'),
    phone: z
      .string({ required_error: 'Phone number is required' })
      .trim()
      .regex(phoneRegex, 'Valid phone number is required (10-15 digits)'),
    services: z
      .array(serviceItemSchema, {
        required_error: 'Services array is required',
        invalid_type_error: 'Services must be an array',
      })
      .min(1, 'At least one service must be selected'),
    city: z.string().trim().max(100).optional().default('Tamil Nadu'),
    personnelCount: z.coerce
      .number({ invalid_type_error: 'Personnel count must be a number' })
      .int('Personnel count must be an integer')
      .min(1, 'Personnel count must be at least 1')
      .max(500, 'Personnel count must not exceed 500')
      .optional()
      .default(1),
    shiftPattern: z
      .enum(['8-hour', '12-hour', '24/7'])
      .or(z.string().trim())
      .optional()
      .default('24/7'),
    startDate: z.string().trim().max(100).optional().default('Immediate Deployment'),
    specialReqs: z.string().trim().max(2000).optional().default(''),
    format: z.enum(['html', 'json', 'pdf']).optional().default('html'),
  })
  .refine(
    (data) => {
      const comp = (data.companyName || data.company || '').trim();
      return comp.length >= 2;
    },
    {
      message: 'Company name must be at least 2 characters',
      path: ['companyName'],
    }
  )
  .refine(
    (data) => {
      const contact = (data.contactPerson || data.customerName || '').trim();
      return contact.length >= 2;
    },
    {
      message: 'Contact person name must be at least 2 characters',
      path: ['contactPerson'],
    }
  );

export type QuotePdfInput = z.infer<typeof quotePdfSchema>;

/**
 * Format Zod validation errors into a client-friendly list and message.
 */
export function formatZodErrors(error: z.ZodError) {
  const issues = error.issues.map((issue) => ({
    field: issue.path.join('.') || 'payload',
    message: issue.message,
  }));

  const primaryMessage = issues[0]?.message || 'Validation error';

  return {
    message: primaryMessage,
    issues,
  };
}
