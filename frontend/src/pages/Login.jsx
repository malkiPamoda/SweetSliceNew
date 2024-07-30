import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import axios from 'axios'; 

const Login = ({ loginPopup, setLoginPopup, handleRegisterPopup }) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
 
  const [successMessage, setSuccessMessage] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post('http://localhost:3000/api/login', formData);
      console.log('Login successful:', response.data);
      setSuccessMessage('Login successful!');
      setLoginPopup(false);
    } catch (err) {
      console.error('Error logging in:', err.response?.data || err.message);
      setError('Login failed. Please check your email and password.');
    }
  };

  return (
    <>
      {loginPopup && (
        <div className='popup'>
          <div className='h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm flex justify-center items-center'>
            <div className='relative p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[300px]'>
            
              <div className='flex items-center justify-between mb-4'>
                <h1>Log In</h1>
                <IoCloseOutline
                  className='text-2xl cursor-pointer'
                  onClick={() => setLoginPopup(false)}
                />
              </div>
             
              <form onSubmit={handleSubmit}>
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
                {error && <p className='text-red-500 mb-4'>{error}</p>}
                {successMessage && <p className='text-green-500 mb-4'>{successMessage}</p>}
                <div className='flex justify-center'>
                  <button
                    type='submit'
                    className='bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full mr-2'
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      setLoginPopup(false);
                      handleRegisterPopup();
                    }}
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

export default Login;