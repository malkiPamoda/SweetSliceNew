import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import ProductView from './ProductView';
import '@testing-library/jest-dom'

const mockProduct = {
  id: 1,
  name: 'Test Product',
  description: 'This is a test product',
  price: '$10.00',
  image: 'http://localhost:3000/test-image.jpg',
};

global.fetch = jest.fn();

describe('ProductView Component', () => {
  const setup = (id) => {
    render(
      <MemoryRouter initialEntries={[`/products/${id}`]}>
        <Route path="/products/:id">
          <ProductView />
        </Route>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders the ProductView component', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProduct,
    });

    setup(mockProduct.id);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('This is a test product')).toBeInTheDocument();
      expect(screen.getByText('$10.00')).toBeInTheDocument();
    });
  });

  it('handles fetch error', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      text: async () => 'Product not found',
    });

    setup(mockProduct.id);

    await waitFor(() => {
      expect(screen.getByText('Error: Product not found')).toBeInTheDocument();
    });
  });

  it('handles quantity input change', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProduct,
    });

    setup(mockProduct.id);

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    const quantityInput = screen.getByLabelText('Quantity:');
    fireEvent.change(quantityInput, { target: { value: '3' } });
    expect(quantityInput.value).toBe('3');
  });

  it('handles order submission', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProduct,
    });

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Order placed successfully' }),
    });

    setup(mockProduct.id);

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    localStorage.setItem('x-auth-token', 'test-token');

    fireEvent.change(screen.getByLabelText('Quantity:'), { target: { value: '2' } });
    fireEvent.submit(screen.getByRole('button', { name: /Add to Cart/i }));

    await waitFor(() => {
      expect(screen.getByText('Order placed successfully!')).toBeInTheDocument();
    });

    localStorage.removeItem('x-auth-token');
  });

  it('shows alert when no token is found', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProduct,
    });

    setup(mockProduct.id);

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    fireEvent.change(screen.getByLabelText('Quantity:'), { target: { value: '2' } });
    fireEvent.submit(screen.getByRole('button', { name: /Add to Cart/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('You need to log in first!');
    });
  });
});