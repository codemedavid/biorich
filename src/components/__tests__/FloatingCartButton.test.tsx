import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FloatingCartButton from '../FloatingCartButton';

describe('FloatingCartButton', () => {
  it('renders nothing when item count is 0', () => {
    const { container } = render(
      <FloatingCartButton itemCount={0} onCartClick={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders button when items are in cart', () => {
    render(<FloatingCartButton itemCount={3} onCartClick={vi.fn()} />);
    expect(screen.getByLabelText('View cart')).toBeInTheDocument();
  });

  it('displays correct item count', () => {
    render(<FloatingCartButton itemCount={5} onCartClick={vi.fn()} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows plural text for multiple items', () => {
    render(<FloatingCartButton itemCount={3} onCartClick={vi.fn()} />);
    expect(screen.getByText('3 items in cart')).toBeInTheDocument();
  });

  it('shows singular text for one item', () => {
    render(<FloatingCartButton itemCount={1} onCartClick={vi.fn()} />);
    expect(screen.getByText('1 item in cart')).toBeInTheDocument();
  });

  it('calls onCartClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<FloatingCartButton itemCount={2} onCartClick={onClick} />);
    await user.click(screen.getByLabelText('View cart'));

    expect(onClick).toHaveBeenCalledOnce();
  });
});
