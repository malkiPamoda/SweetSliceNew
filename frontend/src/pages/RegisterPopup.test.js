import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import RegisterPopUp from './RegisterPopup';
import '@testing-library/jest-dom'

jest.mock('axios');

describe('RegisterPopUp Component', () => {
  const mockSetRegisterPopup = jest.fn();
  
  const setup = (registerPopup = true) => {
    render(<RegisterPopUp registerPopup={registerPopup} setRegisterPopup={mockSetRegisterPopup} />);
  };

  it('renders the RegisterPopUp component', () => {
    setup();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('handles input changes', () => {
    setup();

    const firstNameInput = screen.getByPlaceholderText('Enter First Name');
    fireEvent.change(firstNameInput, { target: { name: 'firstName', value: 'John' } });
    expect(firstNameInput.value).toBe('John');
  });

  it('shows error when passwords do not match', async () => {
    setup();

    fireEvent.change(screen.getByPlaceholderText('Enter Your Password'), {
      target: { name: 'password', value: 'password123' }
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Your Password'), {
      target: { name: 'confirmPassword', value: 'password456' }
    });

    fireEvent.submit(screen.getByRole('button', { name: /Register/i }));

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
  });

  it('handles successful registration', async () => {
    axios.post.mockResolvedValue({ data: { message: 'Registration successful' } });

    setup();

    fireEvent.change(screen.getByPlaceholderText('Enter First Name'), {
      target: { name: 'firstName', value: 'John' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Last Name'), {
      target: { name: 'lastName', value: 'Doe' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Your Email'), {
      target: { name: 'email', value: 'john.doe@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Your Password'), {
      target: { name: 'password', value: 'password123' }
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Your Password'), {
      target: { name: 'confirmPassword', value: 'password123' }
    });

    fireEvent.submit(screen.getByRole('button', { name: /Register/i }));

    await waitFor(() => {
      expect(mockSetRegisterPopup).toHaveBeenCalledWith(false);
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/api/signup', {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      });
    });
  });

  it('handles registration failure', async () => {
    axios.post.mockRejectedValue(new Error('Registration failed'));

    setup();

    fireEvent.change(screen.getByPlaceholderText('Enter First Name'), {
      target: { name: 'firstName', value: 'John' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Last Name'), {
      target: { name: 'lastName', value: 'Doe' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Your Email'), {
      target: { name: 'email', value: 'john.doe@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Your Password'), {
      target: { name: 'password', value: 'password123' }
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Your Password'), {
      target: { name: 'confirmPassword', value: 'password123' }
    });

    fireEvent.submit(screen.getByRole('button', { name: /Register/i }));

    await waitFor(() => {
      expect(screen.getByText('Registration failed. Please try again.')).toBeInTheDocument();
    });
  });
});