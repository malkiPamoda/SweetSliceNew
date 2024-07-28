import React from 'react';
import ContactUsImage from '../../assets/ContactUs/contact.png';

const ContactUs = () => {
  return (
    <section className="contact py-8" id="contact">
      <h1 className="heading text-center text-4xl mb-8">
        <span className="text-orange-500"
        data-aos="fade-up" 
        data-aos-delay="100">Contact Us</span> 
      </h1>

      <div className="row flex flex-wrap items-center justify-around">
        <div 
          className="image max-w-xs mx-auto" 
          data-aos="fade-up" 
          data-aos-delay="100"
        >
          <img src={ContactUsImage} alt="Contact Us" className="w-full rounded-lg " />
        </div>

        <form 
          className="w-full max-w-lg bg-gray-100 p-8 rounded-lg shadow-lg" 
          data-aos="fade-up" 
          data-aos-delay="100"
        >
          <h3 className="mb-4 text-xl text-gray-800">Get in Touch</h3>

          <label className="block mb-4">
            <span className="block text-gray-700">Your Name</span>
            <input type="text" className="box w-full mt-1 p-2 border border-gray-300 rounded-lg" />
          </label>

          <label className="block mb-4">
            <span className="block text-gray-700">Your Number</span>
            <input type="number" className="box w-full mt-1 p-2 border border-gray-300 rounded-lg" />
          </label>

          <label className="block mb-4">
            <span className="block text-gray-700">Your Email</span>
            <input type="email" className="box w-full mt-1 p-2 border border-gray-300 rounded-lg" />
          </label>

          <label className="block mb-4">
            <span className="block text-gray-700">Your Message</span>
            <textarea className="box w-full mt-1 p-2 border border-gray-300 rounded-lg" cols="30" rows="10"></textarea>
          </label>

          <input type="submit" value="Send Message" className="btn w-full py-3 bg-orange-400 text-white rounded-lg cursor-pointer transition duration-300 hover:bg-orange-600" />
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
