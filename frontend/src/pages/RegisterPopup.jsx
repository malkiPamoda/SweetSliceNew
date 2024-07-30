import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import axios from 'axios'; 

const RegisterPopUp = ({ registerPopup, setRegisterPopup }) => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== e.target.confirmPassword.value) {
      setError('Passwords do not match');
      return;
    }

    try {

      const { confirmPassword, ...dataToSend } = formData;
    
      const response = await axios.post('http://localhost:3000/api/signup', dataToSend);
      console.log('Registration successful:', response.data);
      setRegisterPopup(false);
    } catch (err) {
      console.error('Error registering user:', err.response?.data || err.message);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <>
      {registerPopup && (
        <div className='popup'>
          <div className='h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm flex justify-center items-center'>
            <div className='relative p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[300px]'>
             
              <div className='flex items-center justify-between mb-4'>
                <h1>Register</h1>
                <IoCloseOutline
                  className='text-2xl cursor-pointer'
                  onClick={() => setRegisterPopup(false)}
                />
              </div>
            
              <form onSubmit={handleSubmit}>
                <input
                  type='text'
                  name='firstName'
                  placeholder='Enter First Name'
                  value={formData.firstName}
                  onChange={handleChange}
                  className='w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4'
                />
                <input
                  type='text'
                  name='lastName'
                  placeholder='Enter Last Name'
                  value={formData.lastName}
                  onChange={handleChange}
                  className='w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4'
                />
                <input
                  type='email'
                  name='email'
                  placeholder='Enter Your Email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4'
                />
                <input
                  type='password'
                  name='password'
                  placeholder='Enter Your Password'
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4'
                />
                <input
                  type='password'
                  name='confirmPassword'
                  placeholder='Confirm Your Password'
                  className='w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4'
                />
                {error && <p className='text-red-500 mb-4'>{error}</p>}
                <div className='flex justify-center'>
                  <button
                    type='submit'
                    className='bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full'
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterPopUp;
