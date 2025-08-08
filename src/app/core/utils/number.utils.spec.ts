import { formatCurrency } from './number.utils';

describe('Number Utils', () => {
  describe('formatCurrency', () => {
    it('should format positive numbers correctly', () => {
      expect(formatCurrency(1000)).toBe("€ 1.000");
      expect(formatCurrency(1234567)).toBe("€ 1.234.567");
      expect(formatCurrency(100)).toBe("€ 100");
      expect(formatCurrency(1)).toBe("€ 1");
    });

    it('should format zero correctly', () => {
      expect(formatCurrency(0)).toBe("€ 0");
    });

    it('should format negative numbers correctly', () => {
      expect(formatCurrency(-1000)).toBe("€ -1.000");
      expect(formatCurrency(-500)).toBe("€ -500");
      expect(formatCurrency(-1234567)).toBe("€ -1.234.567");
    });

    it('should handle decimal numbers by rounding', () => {
      expect(formatCurrency(1234.56)).toBe("€ 1.235");
      expect(formatCurrency(1234.44)).toBe("€ 1.234");
      expect(formatCurrency(999.99)).toBe("€ 1.000");
      expect(formatCurrency(123.1)).toBe("€ 123");
    });

    it('should handle very large numbers', () => {
      expect(formatCurrency(999999999)).toBe("€ 999.999.999");
      expect(formatCurrency(1000000000)).toBe("€ 1.000.000.000");
    });

    it('should handle very small positive numbers', () => {
      expect(formatCurrency(0.01)).toBe("€ 0");
      expect(formatCurrency(0.99)).toBe("€ 1");
      expect(formatCurrency(0.5)).toBe("€ 1");
      expect(formatCurrency(0.4)).toBe("€ 0");
    });

    it('should handle invalid inputs gracefully', () => {
      expect(formatCurrency(NaN)).toBe("€ 0");
      expect(formatCurrency(Infinity)).toBe("€ 0");
      expect(formatCurrency(-Infinity)).toBe("€ 0");
    });

    it('should handle non-number inputs gracefully', () => {
      expect(formatCurrency(null as unknown as number)).toBe("€ 0");
      expect(formatCurrency(undefined as unknown as number)).toBe("€ 0");
      expect(formatCurrency('string' as unknown as number)).toBe("€ 0");
      expect(formatCurrency({} as unknown as number)).toBe("€ 0");
      expect(formatCurrency([] as unknown as number)).toBe("€ 0");
      expect(formatCurrency(true as unknown as number)).toBe("€ 0");
    });

    it('should use Dutch locale formatting', () => {
      // Dutch locale uses dots as thousands separators
      expect(formatCurrency(1234)).toBe("€ 1.234");
      expect(formatCurrency(12345)).toBe("€ 12.345");
      expect(formatCurrency(123456)).toBe("€ 123.456");
    });

    it('should format currency without decimal places', () => {
      // Should not show cents/decimal places
      expect(formatCurrency(1000.00)).toBe("€ 1.000");
      expect(formatCurrency(1500.50)).toBe("€ 1.501");
      expect(formatCurrency(2000.25)).toBe("€ 2.000");
    });
  });
});