import { CURRENCY_CONFIG } from '../constants';

/**
 * Number utilities
 * Contains functions for numbers formatting
 */

/**
 * Formats currency amount for display in EUR
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(value: number): string {
  if (typeof value !== 'number' || !isFinite(value)) {
    return "€ 0";
  }
  const rounded = Math.round(value);
  const formatted = new Intl.NumberFormat(CURRENCY_CONFIG.LOCALE).format(Math.abs(rounded));
  const sign = rounded < 0 ? '-' : '';
  // Replace any non-breaking space with a regular space
  return `€ ${sign}${formatted}`.replace(/\u00A0/g, ' ');
}
