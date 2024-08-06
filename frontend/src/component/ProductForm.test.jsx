import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import ProductForm from './ProductForm';
import mockAxios from 'jest-mock-axios';

jest.mock('axios');

describe('ProductForm', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  test('renders form elements', () => {
    render(<ProductForm />);

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Price')).toBeInTheDocument();
    expect(screen.getByLabelText('img')).toBeInTheDocument(); // Ensure this is correct based on the actual label or placeholder used
    expect(screen.getByText('Add Product')).toBeInTheDocument();
  });

  test('handles form submission and success', async () => {
    const product = {
      name: 'Product 1',
      description: 'Description 1',
      price: '10.00',
      img: new File(['dummy content'], 'image.jpg', { type: 'image/jpeg' })
    };

    mockAxios.post.mockResolvedValueOnce({ data: 'Product added successfully' });

    render(<ProductForm />);

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: product.name } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: product.description } });
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: product.price } });
    fireEvent.change(screen.getByLabelText('img'), { target: { files: [product.img] } });

    fireEvent.click(screen.getByText('Add Product'));

    await waitFor(() => {
      expect(screen.getByText('Product added successfully!')).toBeInTheDocument();
    });

    expect(mockAxios.post).toHaveBeenCalledWith(
      'http://localhost:3000/api/dashboard/products',
      expect.any(FormData),
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
  });

  test('handles form submission and error', async () => {
    mockAxios.post.mockRejectedValueOnce(new Error('Network Error'));

    render(<ProductForm />);

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Product 1' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Description 1' } });
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: '10.00' } });
    fireEvent.change(screen.getByLabelText('img'), { target: { files: [new File(['dummy content'], 'image.jpg', { type: 'image/jpeg' })] } });

    fireEvent.click(screen.getByText('Add Product'));

    await waitFor(() => {
      expect(screen.getByText('Failed to add product. Please try again.')).toBeInTheDocument();
    });

    expect(mockAxios.post).toHaveBeenCalledWith(
      'http://localhost:3000/api/dashboard/products',
      expect.any(FormData),
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
  });
});