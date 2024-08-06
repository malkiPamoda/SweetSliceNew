import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { UserProvider, useUserContext } from './UserContext';


jest.mock('axios');


const mockLocalStorage = (function () {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => (store[key] = value)),
    removeItem: jest.fn((key) => delete store[key]),
    clear: jest.fn(() => (store = {})),
  };
})();
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

const TestComponent = () => {
  const { user, isLoading } = useUserContext();
  if (isLoading) return <p>Loading...</p>;
  return user ? <p>User: {user.name}</p> : <p>No user</p>;
};

describe('UserProvider', () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
    axios.get.mockClear();
  });

  test('fetches user data and sets it in context', async () => {
    const mockUser = { name: 'John Doe' };
    mockLocalStorage.getItem.mockReturnValue('mockToken');
    axios.get.mockResolvedValueOnce({ data: mockUser });

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('User: John Doe')).toBeInTheDocument();
    });

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/api/users/me', {
      headers: { 'x-auth-token': 'mockToken' }
    });
  });

  test('handles no token case', async () => {
    mockLocalStorage.getItem.mockReturnValue(null);

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('No user')).toBeInTheDocument();
    });

    expect(axios.get).not.toHaveBeenCalled();
  });

  test('handles fetch user error', async () => {
    mockLocalStorage.getItem.mockReturnValue('mockToken');
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('No user')).toBeInTheDocument();
    });

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/api/users/me', {
      headers: { 'x-auth-token': 'mockToken' }
    });
  });
});