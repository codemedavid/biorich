import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCart } from '../useCart';
import {
  mockProduct,
  mockProductNoVariations,
  mockProductOutOfStock,
  mockVariation,
  mockVariationDiscounted,
} from '../../test/fixtures';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock alert
const alertMock = vi.fn();
window.alert = alertMock;

describe('useCart', () => {
  beforeEach(() => {
    localStorageMock.clear();
    alertMock.mockClear();
    vi.clearAllMocks();
  });

  it('initializes with empty cart', () => {
    const { result } = renderHook(() => useCart());
    expect(result.current.cartItems).toEqual([]);
    expect(result.current.getTotalItems()).toBe(0);
    expect(result.current.getTotalPrice()).toBe(0);
  });

  it('loads cart from localStorage on mount', () => {
    const savedCart = [{ product: mockProduct, variation: mockVariation, quantity: 2 }];
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(savedCart));

    const { result } = renderHook(() => useCart());
    expect(result.current.cartItems).toEqual(savedCart);
  });

  describe('addToCart', () => {
    it('adds a product with variation to the cart', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(mockProduct, mockVariation, 1);
      });

      expect(result.current.cartItems).toHaveLength(1);
      expect(result.current.cartItems[0].product.id).toBe('prod-1');
      expect(result.current.cartItems[0].variation?.id).toBe('var-1');
      expect(result.current.cartItems[0].quantity).toBe(1);
    });

    it('adds a product without variation', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(mockProductNoVariations, undefined, 1);
      });

      expect(result.current.cartItems).toHaveLength(1);
      expect(result.current.cartItems[0].variation).toBeUndefined();
    });

    it('increments quantity when adding existing item', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(mockProduct, mockVariation, 1);
      });
      act(() => {
        result.current.addToCart(mockProduct, mockVariation, 2);
      });

      expect(result.current.cartItems).toHaveLength(1);
      expect(result.current.cartItems[0].quantity).toBe(3);
    });

    it('treats different variations as separate items', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(mockProduct, mockVariation, 1);
      });
      act(() => {
        result.current.addToCart(mockProduct, mockVariationDiscounted, 1);
      });

      expect(result.current.cartItems).toHaveLength(2);
    });

    it('prevents adding out-of-stock product', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(mockProductOutOfStock, undefined, 1);
      });

      expect(result.current.cartItems).toHaveLength(0);
      expect(alertMock).toHaveBeenCalledWith(expect.stringContaining('out of stock'));
    });

    it('caps quantity at available stock for new items', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(mockProduct, mockVariation, 999);
      });

      expect(result.current.cartItems[0].quantity).toBe(mockVariation.stock_quantity);
      expect(alertMock).toHaveBeenCalled();
    });

    it('caps quantity at available stock for existing items', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(mockProduct, mockVariation, 8);
      });
      act(() => {
        result.current.addToCart(mockProduct, mockVariation, 5);
      });

      // stock is 10, already have 8, adding 5 should cap
      expect(result.current.cartItems[0].quantity).toBe(10);
    });
  });

  describe('updateQuantity', () => {
    it('updates item quantity', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(mockProduct, mockVariation, 1);
      });
      act(() => {
        result.current.updateQuantity(0, 5);
      });

      expect(result.current.cartItems[0].quantity).toBe(5);
    });

    it('removes item when quantity is set to 0', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(mockProduct, mockVariation, 1);
      });
      act(() => {
        result.current.updateQuantity(0, 0);
      });

      expect(result.current.cartItems).toHaveLength(0);
    });

    it('caps quantity at available stock', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(mockProduct, mockVariation, 1);
      });
      act(() => {
        result.current.updateQuantity(0, 999);
      });

      expect(result.current.cartItems[0].quantity).toBe(mockVariation.stock_quantity);
    });
  });

  describe('removeFromCart', () => {
    it('removes item at given index', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(mockProduct, mockVariation, 1);
      });
      act(() => {
        result.current.addToCart(mockProductNoVariations, undefined, 1);
      });
      act(() => {
        result.current.removeFromCart(0);
      });

      expect(result.current.cartItems).toHaveLength(1);
      expect(result.current.cartItems[0].product.id).toBe('prod-2');
    });
  });

  describe('clearCart', () => {
    it('removes all items and clears localStorage', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(mockProduct, mockVariation, 2);
      });
      act(() => {
        result.current.clearCart();
      });

      expect(result.current.cartItems).toHaveLength(0);
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('peptide_cart');
    });
  });

  describe('getTotalPrice', () => {
    it('calculates total for variation items', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(mockProduct, mockVariation, 3);
      });

      // variation price: 1500 * 3 = 4500
      expect(result.current.getTotalPrice()).toBe(4500);
    });

    it('calculates total using discount price when active', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(mockProductNoVariations, undefined, 2);
      });

      // discount_active=true, discount_price=1800, qty=2 => 3600
      expect(result.current.getTotalPrice()).toBe(3600);
    });

    it('calculates total for mixed cart', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(mockProduct, mockVariation, 2);
      });
      act(() => {
        result.current.addToCart(mockProductNoVariations, undefined, 1);
      });

      // variation: 1500*2 = 3000, discounted product: 1800*1 = 1800 => 4800
      expect(result.current.getTotalPrice()).toBe(4800);
    });
  });

  describe('getTotalItems', () => {
    it('sums all item quantities', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(mockProduct, mockVariation, 3);
      });
      act(() => {
        result.current.addToCart(mockProductNoVariations, undefined, 2);
      });

      expect(result.current.getTotalItems()).toBe(5);
    });
  });

  describe('localStorage persistence', () => {
    it('saves cart to localStorage on change', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(mockProduct, mockVariation, 1);
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'peptide_cart',
        expect.any(String)
      );
    });
  });
});
