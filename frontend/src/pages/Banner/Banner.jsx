import React from 'react'
import BannerImg from '../../assets/Banner/image01.jpg';
import {GrSecure} from "react-icons/gr";
import {IoFastFood} from "react-icons/io5";
import {GiFoodTruck} from "react-icons/gi";


const Banner =  () =>{
  return (
    <section id="services">
    <div className='min-h-[550px] flex justify-center items-center py-12 sm:py-0'>
        <div className='container'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 items-center'>
            
            {/*image section*/}
            <div data-aos="zoom-in">
                <img src={BannerImg} 
                className='h-[350px] max-w-[400px] w-full mx-auto
                drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover'/>
            </div>


            {/*text details section*/}
            <div className='flex flex-col justify-center
            gap-6 sm:pt-0'>
                <h1 data-aos="fade-up" className='text-3xl sm:text-4xl font-bold'>Your special occasions, our specialty cakes</h1>
                <p data-aos="fade-up" aosDelay="100"className='text-sm: text-gray-500 tracking-wide leading-5'>
                At SweetSlice, we understand that every special occasion deserves a cake that is as unique and memorable as the event itself. Whether you're celebrating a birthday, wedding, anniversary, or any other milestone, our specialty cakes are designed to add that extra touch of sweetness and elegance to your festivities.
                </p>
                <div data-aos="fade-up" className='flex flex-col gap-4'>
                    <div data-aos="fade-up" aosDelay="100"className='flex items-center gap-4'>
                        <GrSecure 
                        className='text-4xl h-12 w-12 shadow-sm
                        p-4 rounded-full bg-violet-100 dark:bg-violet-400'/>
                        <p>Quality Products</p>
                    </div>
                    <div data-aos="fade-up" aosDelay="150" className='flex items-center gap-4'>
                        <IoFastFood 
                        className='text-4xl h-12 w-12 shadow-sm
                        p-4 rounded-full bg-orange-100 dark:bg-orange-400'/>
                        <p>Fast Delivery</p>
                    </div>
                    <div data-aos="fade-up" aosDelay="200" className='flex items-center gap-4'>
                        <GiFoodTruck 
                        className='text-4xl h-12 w-12 shadow-sm
                        p-4 rounded-full bg-green-100 dark:bg-green-400'/>
                        <p>Easy Payment Method</p>
                    </div>
                    <div data-aos="fade-up" aosDelay="250" className='flex items-center gap-4'>
                        <GiFoodTruck 
                        className='text-4xl h-12 w-12 shadow-sm
                        p-4 rounded-full bg-yellow-100 dark:bg-yellow-400'/>
                        <p>Get Offer</p>
                    </div>
                </div>

            </div>

            </div>

        </div>

    </div>
    </section>
  )
}

export default Banner