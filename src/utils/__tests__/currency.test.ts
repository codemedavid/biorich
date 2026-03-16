import { describe, it, expect } from 'vitest';
import { formatPrice, formatPriceWithDecimals, CURRENCY_SYMBOL, CURRENCY_CODE } from '../currency';

describe('currency utilities', () => {
  describe('formatPrice', () => {
    it('formats a whole number price with peso symbol', () => {
      expect(formatPrice(1500)).toBe('₱1,500');
    });

    it('formats zero', () => {
      expect(formatPrice(0)).toBe('₱0');
    });

    it('rounds decimal values (no fraction digits)', () => {
      const result = formatPrice(1500.75);
      expect(result).toBe('₱1,501');
    });

    it('formats large numbers with comma separators', () => {
      expect(formatPrice(100000)).toBe('₱100,000');
    });

    it('formats small numbers without commas', () => {
      expect(formatPrice(500)).toBe('₱500');
    });
  });

  describe('formatPriceWithDecimals', () => {
    it('formats price with two decimal places', () => {
      expect(formatPriceWithDecimals(1500)).toBe('₱1,500.00');
    });

    it('formats price preserving decimals', () => {
      expect(formatPriceWithDecimals(1500.5)).toBe('₱1,500.50');
    });

    it('formats zero with decimals', () => {
      expect(formatPriceWithDecimals(0)).toBe('₱0.00');
    });
  });

  describe('constants', () => {
    it('exports correct currency symbol', () => {
      expect(CURRENCY_SYMBOL).toBe('₱');
    });

    it('exports correct currency code', () => {
      expect(CURRENCY_CODE).toBe('PHP');
    });
  });
});
