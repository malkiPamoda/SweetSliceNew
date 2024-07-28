import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';

const Login = ({ loginPopup, setLoginPopup, handleRegisterPopup }) => {
  return (
    <>
      {loginPopup && (
        <div className='popup'>
          <div className='h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm flex justify-center items-center'>
            <div className='relative p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[300px]'>
              {/* header */}
              <div className='flex items-center justify-between mb-4'>
                <h1>Log In</h1>
                <IoCloseOutline
                  className='text-2xl cursor-pointer'
                  onClick={() => setLoginPopup(false)}
                />
              </div>
              {/* form section */}
              <div>
                <input
                  type='email'
                  placeholder='Enter Your Email'
                  className='w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4'
                />
                <input
                  type='password'
                  placeholder='Enter Your Password'
                  className='w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4'
                />
                <div className='flex justify-center'>
                  <button className='bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full mr-2'>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
