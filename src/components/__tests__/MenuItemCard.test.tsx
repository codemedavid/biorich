import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuItemCard from '../MenuItemCard';
import {
  mockProduct,
  mockProductNoVariations,
  mockProductOutOfStock,
  mockProductUnavailable,
} from '../../test/fixtures';

describe('MenuItemCard', () => {
  it('renders product name and description', () => {
    render(<MenuItemCard product={mockProduct} />);

    expect(screen.getByText('BPC-157')).toBeInTheDocument();
    expect(screen.getByText('Research-grade peptide for laboratory use')).toBeInTheDocument();
  });

  it('renders variation buttons for products with variations', () => {
    render(<MenuItemCard product={mockProduct} />);

    expect(screen.getByText('5mg')).toBeInTheDocument();
    expect(screen.getByText('10mg')).toBeInTheDocument();
  });

  it('shows "Featured" badge for featured products', () => {
    render(<MenuItemCard product={mockProduct} />);
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('does not show "Featured" badge for non-featured products', () => {
    render(<MenuItemCard product={mockProductNoVariations} />);
    expect(screen.queryByText('Featured')).not.toBeInTheDocument();
  });

  it('shows discount badge and strikethrough price for discounted variations', async () => {
    const user = userEvent.setup();
    render(<MenuItemCard product={mockProduct} />);

    // Click the discounted variation (10mg)
    await user.click(screen.getByText('10mg'));

    expect(screen.getByText(/% OFF/)).toBeInTheDocument();
  });

  it('shows "Out of Stock" overlay when product has no stock', () => {
    render(<MenuItemCard product={mockProductOutOfStock} />);
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });

  it('shows "Unavailable" overlay when product is unavailable', () => {
    render(<MenuItemCard product={mockProductUnavailable} />);
    expect(screen.getByText('Unavailable')).toBeInTheDocument();
  });

  it('disables Add to Cart button for out-of-stock products', () => {
    render(<MenuItemCard product={mockProductOutOfStock} />);

    const addButton = screen.getByRole('button', { name: /add to cart/i });
    expect(addButton).toBeDisabled();
  });

  it('calls onAddToCart when Add to Cart is clicked', async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();

    render(<MenuItemCard product={mockProduct} onAddToCart={onAddToCart} />);

    await user.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(onAddToCart).toHaveBeenCalledWith(
      mockProduct,
      mockProduct.variations![0], // first variation selected by default
      1
    );
  });

  it('calls onProductClick when product image area is clicked', async () => {
    const user = userEvent.setup();
    const onProductClick = vi.fn();

    render(<MenuItemCard product={mockProduct} onProductClick={onProductClick} />);

    // Click on the overlay div (image area)
    const overlay = screen.getByTitle('View details');
    await user.click(overlay);

    expect(onProductClick).toHaveBeenCalledWith(mockProduct);
  });

  it('shows cart quantity indicator when items are in cart', () => {
    render(<MenuItemCard product={mockProduct} cartQuantity={3} />);
    expect(screen.getByText('3 in cart')).toBeInTheDocument();
  });

  it('does not show cart quantity indicator when zero', () => {
    render(<MenuItemCard product={mockProduct} cartQuantity={0} />);
    expect(screen.queryByText(/in cart/)).not.toBeInTheDocument();
  });

  it('shows discount price for products without variations', () => {
    render(<MenuItemCard product={mockProductNoVariations} />);

    // Should show discount price ₱1,800 and strikethrough ₱2,000
    expect(screen.getByText(/% OFF/)).toBeInTheDocument();
  });

  it('switches variation on button click', async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();

    render(<MenuItemCard product={mockProduct} onAddToCart={onAddToCart} />);

    // Click second variation
    await user.click(screen.getByText('10mg'));
    // Then add to cart
    await user.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(onAddToCart).toHaveBeenCalledWith(
      mockProduct,
      mockProduct.variations![1], // second variation
      1
    );
  });

  it('shows fallback icon when no image URL', () => {
    render(<MenuItemCard product={mockProduct} />);
    // Product has no image_url, should show Package icon placeholder
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
