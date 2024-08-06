import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import Login from './Login';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Create a mock instance of axios
const mock = new MockAdapter(axios);

describe('Login Component', () => {
  let setLoginPopupMock, handleRegisterPopupMock;

  beforeEach(() => {
    setLoginPopupMock = jest.fn();
    handleRegisterPopupMock = jest.fn();
  });

  it('renders the login form', () => {
    render(<Login loginPopup={true} setLoginPopup={setLoginPopupMock} handleRegisterPopup={handleRegisterPopupMock} />);

    expect(screen.getByPlaceholderText('Enter Your Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Your Password')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('handles input changes', () => {
    render(<Login loginPopup={true} setLoginPopup={setLoginPopupMock} handleRegisterPopup={handleRegisterPopupMock} />);

    fireEvent.change(screen.getByPlaceholderText('Enter Your Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Your Password'), { target: { value: 'password123' } });

    expect(screen.getByPlaceholderText('Enter Your Email').value).toBe('test@example.com');
    expect(screen.getByPlaceholderText('Enter Your Password').value).toBe('password123');
  });

  it('submits the form and handles successful login', async () => {
    mock.onPost('http://localhost:3000/api/login').reply(200, { token: 'fake-token' });

    render(<Login loginPopup={true} setLoginPopup={setLoginPopupMock} handleRegisterPopup={handleRegisterPopupMock} />);

    fireEvent.change(screen.getByPlaceholderText('Enter Your Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Your Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Log In'));

    await waitFor(() => expect(screen.getByText('Login successful!')).toBeInTheDocument());

    expect(localStorage.getItem('x-auth-token')).toBe('fake-token');
    expect(setLoginPopupMock).toHaveBeenCalledWith(false);
  });

  it('handles login error', async () => {
    mock.onPost('http://localhost:3000/api/login').reply(400, 'Login failed');

    render(<Login loginPopup={true} setLoginPopup={setLoginPopupMock} handleRegisterPopup={handleRegisterPopupMock} />);

    fireEvent.change(screen.getByPlaceholderText('Enter Your Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Your Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Log In'));

    await waitFor(() => expect(screen.getByText('Login failed. Please check your email and password.')).toBeInTheDocument());
  });

  it('opens the register popup when clicking Register', () => {
    render(<Login loginPopup={true} setLoginPopup={setLoginPopupMock} handleRegisterPopup={handleRegisterPopupMock} />);

    fireEvent.click(screen.getByText('Register'));

    expect(setLoginPopupMock).toHaveBeenCalledWith(false);
    expect(handleRegisterPopupMock).toHaveBeenCalled();
  });
});