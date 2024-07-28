import React from 'react';
import Hero from '../Hero/Hero';
import About from '../About/About';
import Menu from '../Menu/Menu';
import Banner from '../Banner/Banner';
import Subscribe from '../Subscribe/Subscribe';
import Testimonials from '../Testimonials/Testimonials';
import ContactUs from '../ContactUs/ContactUs';

const Home = ({ handleOrderPopup }) => {
  return (
    <>
      <Hero handleOrderPopup={handleOrderPopup} />
      <About />
      <Menu />
      <Banner />
      <Subscribe />
      <Testimonials />
      <ContactUs />
    </>
  );
};

export default Home;
