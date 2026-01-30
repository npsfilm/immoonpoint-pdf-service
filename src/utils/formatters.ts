/**
 * Utility formatters for PDF generation
 * All price formatting uses German locale (comma decimal, € suffix)
 */

/**
 * Format a number as German currency (EUR)
 * e.g., 249 → "249,00 €"
 */
export const formatCurrency = (amount: number): string => {
  return amount.toFixed(2).replace('.', ',') + ' €';
};

/**
 * Alias for formatCurrency - formats price in German notation
 */
export const formatPrice = (price: number): string => {
  return formatCurrency(price);
};

/**
 * Formats a number with German comma notation (without currency symbol)
 * e.g., 249.00 → "249,00"
 */
export const formatGermanPrice = (price: number): string => {
  return price.toFixed(2).replace('.', ',');
};

/**
 * Format a pre-formatted price string to German notation with € symbol
 * Handles strings like "296.31" → "296,31 €"
 * Also handles strings that may already have € or be in German format
 */
export const formatPriceString = (priceStr: string): string => {
  if (!priceStr) return '0,00 €';
  
  // Remove existing € symbol and trim
  let cleaned = priceStr.replace(/€/g, '').trim();
  
  // Replace dot with comma for German format
  cleaned = cleaned.replace('.', ',');
  
  // Ensure € symbol is at the end
  if (!cleaned.includes('€')) {
    cleaned = cleaned + ' €';
  }
  
  return cleaned;
};

/**
 * Format a date in German format (DD.MM.YYYY)
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/**
 * Format date in German format with day name
 */
export const formatGermanDate = (date: Date): string => {
  return date.toLocaleDateString('de-DE', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

/**
 * Get current date formatted in German
 */
export const getCurrentGermanDate = (): string => {
  return formatDate(new Date());
};

/**
 * Removes country suffix from address string
 * e.g., "Musterstraße 1, 12345 Berlin, Germany" → "Musterstraße 1, 12345 Berlin"
 */
export const cleanAddress = (address: string): string => {
  if (!address) return '';
  return address
    .replace(/, Germany$/i, '')
    .replace(/, Deutschland$/i, '')
    .trim();
};

/**
 * Extracts city name from a full address string
 * Handles format: "Street, Postal City, Country"
 * e.g., "Musterstraße 1, 12345 Berlin, Germany" → "Berlin"
 */
export const extractCity = (address: string): string => {
  if (!address) return 'Ihrer Region';
  
  const parts = address.split(',').map(part => part.trim());
  
  if (parts.length >= 2) {
    const cityPart = parts[parts.length - 2];
    const cityMatch = cityPart.match(/\d{5}\s+(.+)/);
    if (cityMatch && cityMatch[1]) {
      return cityMatch[1].trim();
    }
    return cityPart || 'Ihrer Region';
  }
  
  return parts[0] || 'Ihrer Region';
};

/**
 * Get display text for salutation
 * e.g., "Herr" → "Herr", "Frau" → "Frau"
 */
export const getSalutationDisplay = (salutation: string): string => {
  if (!salutation) return 'Herr';
  
  const lower = salutation.toLowerCase().trim();
  
  if (lower.includes('frau')) {
    return 'Frau';
  }
  if (lower.includes('herr')) {
    return 'Herr';
  }
  
  return 'Herr';
};

/**
 * Generate a unique offer number
 * Format: IOP-YYMMDD-XXX (e.g., IOP-260130-547)
 */
export const generateOfferNumber = (): string => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 900) + 100;
  
  return `IOP-${year}${month}${day}-${random}`;
};

/**
 * Calculate expiry date (30 days from now)
 */
export const getExpiryDate = (): string => {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return formatDate(date);
};
