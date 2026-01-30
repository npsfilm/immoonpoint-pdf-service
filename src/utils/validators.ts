import { z } from 'zod';

export const PdfContactSchema = z.object({
  salutation: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  company: z.string().optional().default(''),
  email: z.string().email(),
  phone: z.string().optional().default(''),
  street: z.string().optional(),
  zipCode: z.string().optional(),
  city: z.string().optional(),
});

export const PdfProjectSchema = z.object({
  shootingType: z.string(),
  address: z.string(),
  packageName: z.string(),
  packagePrice: z.number(),
  packageImages: z.number().optional(),
  packageDuration: z.string().optional(),
  packageFeatures: z.array(z.string()).optional(),
  imageCount: z.number().optional(),
  roomCount: z.number().optional(),
});

export const PdfUpgradeSchema = z.object({
  name: z.string(),
  price: z.number(),
  details: z.string().optional(),
});

export const PdfPricingSchema = z.object({
  netPrice: z.string(),
  vatAmount: z.string(),
  grossPrice: z.string(),
  travelCost: z.number().optional().default(0),
  packagePrice: z.number().optional(),
  upgradesTotal: z.number().optional().default(0),
  totalPrice: z.number().optional(),
});

export const PdfDataSchema = z.object({
  contact: PdfContactSchema,
  project: PdfProjectSchema,
  upgrades: z.array(PdfUpgradeSchema),
  pricing: PdfPricingSchema,
});
