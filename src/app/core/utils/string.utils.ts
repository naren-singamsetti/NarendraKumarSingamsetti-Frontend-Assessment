/**
 * String utilities
 * Contains functions for string formatting
 */

/**
 * Formats account number for display with proper spacing
 * @param accountNumber - The account number to format
 * @returns Formatted account number with space after prefix
 */
export function formatAccountNumber(accountNumber: string): string {
  if (!accountNumber || typeof accountNumber !== 'string') {
    return '';
  }

  return accountNumber.replace(/(.{3})(.{7})/, '$1 $2');
}
