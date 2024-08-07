import React, { useContext } from 'react';
import UserContext from '../UserContext';
import logo from '../../assets/logo.png';
import { MdOutlineSearch } from 'react-icons/md';
import { FaCartShopping } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa';
import DarkMode from './DarkMode';
import { Link } from 'react-router-dom';

const Navbar = ({ handleOrderPopup, handleLoginPopup }) => {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) return <div>Loading...</div>;
  console.log('User:', user);
  console.log('Is Admin:', user && user.isAdmin);

  return (
    <div className='shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40'>
      {/* upper Navbar */}
      <div className='bg-primary/40 py-2'>
        <div className='container flex justify-between items-center'>
          <div>
            <Link to='/' className='font-bold text-2xl sm:3xl flex gap-2'>
              <img src={logo} alt='logo' className='w-10'></img>
              SweetSlice
            </Link>
          </div>
          {/* search bar */}
          <div className='flex justify-between items-center gap-4'>
            <div className='relative group hidden sm:block'>
              <input 
                type='text' 
                placeholder='Search' 
                className='w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800'  
              />
              <MdOutlineSearch className='text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3' />
            </div>
            {/* order button */}
            <button onClick={handleOrderPopup} className='bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group'>
              <span className='group-hover:block hidden transition-all duration-200'>Order</span>
              <FaCartShopping className='text-xl text-white drop-shadow-sm cursor-pointer' />
            </button>
            {/* user button */}
            <button onClick={handleLoginPopup} className='userbutton bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group'>
              <span id='loginbutton' className='group-hover:block hidden transition-all duration-200'>User</span>
              <FaUser className='text-xl text-white drop-shadow-sm cursor-pointer' />
            </button>
            {/* dark mode switch */}
            <div>
              <DarkMode />
            </div>
            {/* Add Products button */}
            {user && user.isAdmin && (
              <Link to="admin">
                <button className='bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full ml-4'>
                  Add Products
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* lower Navbar */}
      <div className="flex justify-center">
        <ul className="sm:flex hidden items-center gap-4">
          <li>
            <Link to="/" className="inline-block px-4 hover:text-primary duration-200">Home</Link>
          </li>
          <li>
            <a href="#about" className="inline-block px-4 hover:text-primary duration-200">About</a>
          </li>
          <li>
            <a href="#menu" className="inline-block px-4 hover:text-primary duration-200">Menu</a>
          </li>
          <li>
            <a href="#services" className="inline-block px-4 hover:text-primary duration-200">Services</a>
          </li>
          <li>
            <a href="#subscribe" className="inline-block px-4 hover:text-primary duration-200">Subscribe</a>
          </li>
          <li>
            <a href="#testimonials" className="inline-block px-4 hover:text-primary duration-200">Testimonials</a>
          </li>
          <li>
            <a href="#contact" className="inline-block px-4 hover:text-primary duration-200">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;