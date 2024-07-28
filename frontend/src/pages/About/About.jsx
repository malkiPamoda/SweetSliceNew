import React from 'react'
import BannerImg from '../../assets/About/image01.png';


const About =  () =>{
  return (
    <section id="about">
    <div className='min-h-[550px] flex justify-center items-center py-12 sm:py-0'>
        <div className='container'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 items-center'>
            
            {/*image section*/}
            <div data-aos="zoom-in">
                <img src={BannerImg} 
                className='h-[500px] max-w-[350px] w-full mx-auto
                drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover'/>
            </div>


            {/*text details section*/}
            <div className='flex flex-col justify-center
            gap-6 sm:pt-0'>
                <h1 data-aos="fade-up" className='text-3xl sm:text-4xl font-bold'>About Us</h1>
                <p data-aos="fade-up" aosDelay="100"className='text-sm: text-gray-500 tracking-wide leading-5'>
                Welcome to SweetSlice Cake Shop, where we turn your sweetest dreams into reality. At SweetSlice, we are passionate about creating exquisite cakes that not only look stunning but taste divine. Our skilled bakers and artists use the finest ingredients and innovative techniques to craft cakes that are perfect for any occasion, from birthdays and weddings to anniversaries and corporate events.
                </p>
                <p data-aos="fade-up" aosDelay="100"className='text-sm: text-gray-500 tracking-wide leading-5'>
                  We believe every celebration deserves a special touch, and that's why we offer custom-designed cakes tailored to your unique vision. Whether you prefer classic flavors or adventurous combinations, our diverse menu has something to delight every palate.</p>

                  <p data-aos="fade-up" aosDelay="100"className='text-sm: text-gray-500 tracking-wide leading-5'>
                    At SweetSlice, our commitment to quality and customer satisfaction is paramount. We take pride in our attention to detail, creativity, and personalized service, ensuring that each cake we create is a true masterpiece.</p>

                    <p data-aos="fade-up" aosDelay="100"className='text-sm: text-gray-500 tracking-wide leading-5'>
                      Thank you for choosing SweetSlice Cake Shop to be a part of your special moments. Let us make your next celebration unforgettable with our delicious and beautiful cakes.</p>

                </div>

            </div>

            </div>

        </div>

        </section>
  )
}

export default About