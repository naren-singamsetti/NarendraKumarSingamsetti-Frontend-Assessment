import {
  formatAccountNumber
} from './string.utils';

describe('String Utils', () => {
  describe('formatAccountNumber', () => {
    it('should format valid account numbers', () => {
      expect(formatAccountNumber('RBO1234567')).toBe('RBO 1234567');
      expect(formatAccountNumber('RBB9876543')).toBe('RBB 9876543');
    });

    it('should return unchanged for invalid account numbers', () => {
      expect(formatAccountNumber('INVALID')).toBe('INVALID');
      expect(formatAccountNumber('')).toBe('');
      expect(formatAccountNumber(null as unknown as string)).toBe('');
      expect(formatAccountNumber(undefined as unknown as string)).toBe('');
    });
  });
});
