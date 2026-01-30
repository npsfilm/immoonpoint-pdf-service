export interface PdfContact {
  salutation: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  street?: string;
  zipCode?: string;
  city?: string;
}

export interface PdfProject {
  shootingType: string;
  address: string;
  packageName: string;
  packagePrice: number;
  packageImages?: number;
  packageDuration?: string;
  packageFeatures?: string[];
}

export interface PdfUpgrade {
  name: string;
  price: number;
  details?: string;
}

export interface PdfPricing {
  netPrice: string;
  vatAmount: string;
  grossPrice: string;
  travelCost?: number;
}

export interface PdfData {
  contact: PdfContact;
  project: PdfProject;
  upgrades: PdfUpgrade[];
  pricing: PdfPricing;
}
