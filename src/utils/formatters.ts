/**
 * Format a number as German currency (€)
 * @param amount - The amount to format
 * @returns Formatted string like "1.234,56 €"
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Alias for formatCurrency (backward compatibility)
 */
export const formatGermanPrice = formatCurrency;

/**
 * Format a date in German format
 * @param date - Date object or ISO string
 * @returns Formatted string like "30. Januar 2026"
 */
export const formatGermanDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(dateObj);
};

/**
 * Get current date formatted in German
 * @returns Current date like "30. Januar 2026"
 */
export const getCurrentGermanDate = (): string => {
  return formatGermanDate(new Date());
};
