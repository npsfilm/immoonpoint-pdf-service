import { z } from "zod";

export const PdfDataSchema = z.object({
  contact: z.object({
    salutation: z.string().default(""),
    firstName: z.string().min(1, "firstName is required"),
    lastName: z.string().min(1, "lastName is required"),
    company: z.string().default(""),
    email: z.string().email("Invalid email"),
    phone: z.string().default(""),
    street: z.string().optional(),
    zipCode: z.string().optional(),
    city: z.string().optional(),
  }),
  project: z.object({
    shootingType: z.string().min(1, "shootingType is required"),
    address: z.string().min(1, "address is required"),
    packageName: z.string().min(1, "packageName is required"),
    packagePrice: z.number().min(0),
    packageImages: z.number().optional(),
    packageDuration: z.string().optional(),
    packageFeatures: z.array(z.string()).optional(),
  }),
  upgrades: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
      details: z.string().optional(),
    })
  ).default([]),
  pricing: z.object({
    netPrice: z.string(),
    vatAmount: z.string(),
    grossPrice: z.string(),
    travelCost: z.number().optional(),
  }),
});
