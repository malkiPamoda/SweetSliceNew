import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import ProductList from './ProductList';

jest.mock('axios');

describe('ProductList', () => {
  const mockProducts = [
    {
      _id: '1',
      name: 'Product 1',
      description: 'Description 1',
      price: '10.00',
      image: 'http://localhost:3000/image1.jpg',
    },
    {
      _id: '2',
      name: 'Product 2',
      description: 'Description 2',
      price: '20.00',
      image: 'http://localhost:3000/image2.jpg',
    },
  ];

  const mockDeleteProduct = jest.fn();
  const mockUpdateProduct = jest.fn();

  test('renders product list and update form', () => {
    render(<ProductList products={mockProducts} deleteProduct={mockDeleteProduct} updateProduct={mockUpdateProduct} />);

    expect(screen.getByText('Product List')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('10.00')).toBeInTheDocument();
    expect(screen.getByAltText('Product 1')).toBeInTheDocument();

    // Check for update form elements
    fireEvent.click(screen.getByText('Update'));
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Image/i)).toBeInTheDocument();
  });

  test('handles update form submission and success', async () => {
    const productToUpdate = mockProducts[0];
    const updatedProduct = {
      ...productToUpdate,
      name: 'Updated Product 1',
      description: 'Updated Description 1',
      price: '15.00',
    };
    const formData = new FormData();
    formData.append('name', updatedProduct.name);
    formData.append('description', updatedProduct.description);
    formData.append('price', parseFloat(updatedProduct.price));

    axios.put.mockResolvedValueOnce({ data: updatedProduct });

    render(<ProductList products={mockProducts} deleteProduct={mockDeleteProduct} updateProduct={mockUpdateProduct} />);

    fireEvent.click(screen.getByText('Update'));
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: updatedProduct.name } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: updatedProduct.description } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: updatedProduct.price } });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Product updated successfully!')).toBeInTheDocument();
    });

    expect(mockUpdateProduct).toHaveBeenCalledWith(productToUpdate._id, expect.any(FormData));
  });

  test('handles update form submission and error', async () => {
    const productToUpdate = mockProducts[0];
    axios.put.mockRejectedValueOnce(new Error('Network Error'));

    render(<ProductList products={mockProducts} deleteProduct={mockDeleteProduct} updateProduct={mockUpdateProduct} />);

    fireEvent.click(screen.getByText('Update'));
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Updated Product 1' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Updated Description 1' } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '15.00' } });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Failed to update product. Please try again.')).toBeInTheDocument();
    });

    expect(mockUpdateProduct).toHaveBeenCalledWith(productToUpdate._id, expect.any(FormData));
  });

  test('handles delete button click', () => {
    render(<ProductList products={mockProducts} deleteProduct={mockDeleteProduct} updateProduct={mockUpdateProduct} />);

    fireEvent.click(screen.getByText('Delete'));

    expect(mockDeleteProduct).toHaveBeenCalledWith('1');
  });
});