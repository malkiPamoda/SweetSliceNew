import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import ProductContainer from './ProductContainer';
import mockAxios from 'jest-mock-axios';

jest.mock('./ProductList', () => ({ products, deleteProduct, updateProduct }) => (
  <div>
    {products.map(product => (
      <div key={product.id} data-testid="product">
        <span>{product.name}</span>
        <button onClick={() => deleteProduct(product.id)}>Delete</button>
      </div>
    ))}
  </div>
));

describe('ProductContainer', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  test('fetches and displays products', async () => {
    const products = [{ id: 1, name: 'Product 1', image: 'uploads/product1.jpg' }];
    mockAxios.get.mockResolvedValueOnce({ data: products });

    render(<ProductContainer />);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });
  });

  test('displays error message on fetch failure', async () => {
    mockAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    render(<ProductContainer />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch products. Please try again.')).toBeInTheDocument();
    });
  });

  test('deletes a product', async () => {
    const products = [{ id: 1, name: 'Product 1', image: 'uploads/product1.jpg' }];
    mockAxios.get.mockResolvedValueOnce({ data: products });
    mockAxios.delete.mockResolvedValueOnce({});

    render(<ProductContainer />);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
    });
  });

  test('displays error message on delete failure', async () => {
    const products = [{ id: 1, name: 'Product 1', image: 'uploads/product1.jpg' }];
    mockAxios.get.mockResolvedValueOnce({ data: products });
    mockAxios.delete.mockRejectedValueOnce(new Error('Network Error'));

    render(<ProductContainer />);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(screen.getByText('Failed to delete product. Please try again.')).toBeInTheDocument();
    });
  });
});