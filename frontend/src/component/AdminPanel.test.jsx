import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserContext from './UserContext';
import AdminPanel from './AdminPanel';


jest.mock('./ProductForm', () => ({ addProduct }) => (
  <button onClick={() => addProduct({ name: 'New Product' })}>Add Product</button>
));

jest.mock('./ProductList', () => ({ products, deleteProduct, updateProduct }) => (
  <>
    {products.map(product => (
      <div key={product.id}>
        <span>{product.name}</span>
        <button onClick={() => deleteProduct(product.id)}>Delete</button>
      </div>
    ))}
  </>
));

jest.mock('./ProductContainer', () => () => <div>Product Container</div>);

describe('AdminPanel', () => {
  const mockUser = { isAdmin: true };
  const mockSetProducts = jest.fn();

  const renderAdminPanel = (user, isLoading = false) => {
    return render(
      <UserContext.Provider value={{ user, isLoading }}>
        <AdminPanel />
      </UserContext.Provider>
    );
  };

  test('renders loading state', () => {
    renderAdminPanel(mockUser, true);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders access denied for non-admin users', () => {
    renderAdminPanel({ isAdmin: false });
    expect(screen.getByText('Access Denied. Admins only.')).toBeInTheDocument();
  });

  test('renders admin panel for admin users', () => {
    renderAdminPanel(mockUser);
    expect(screen.getByText('Admin Panel')).toBeInTheDocument();
  });

  test('adds a product', () => {
    renderAdminPanel(mockUser);

    fireEvent.click(screen.getByText('Add Product'));
    expect(screen.getByText('New Product')).toBeInTheDocument();
  });

  test('deletes a product', () => {
    renderAdminPanel(mockUser);

    fireEvent.click(screen.getByText('Add Product'));
    expect(screen.getByText('New Product')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Delete'));
    expect(screen.queryByText('New Product')).not.toBeInTheDocument();
  });
});