import React from 'react'
import image01 from '../../assets/Testimonial/image01.jpeg'
import image02 from '../../assets/Testimonial/image05.jpg'
import image03 from '../../assets/Testimonial/image04.jpg'
import image04 from '../../assets/Testimonial/image02.jpg'
import image05 from '../../assets/Testimonial/image03.jpg'
import Slider from 'react-slick'


const testimonialData= [

  {
    id: 1,
    name: "Ruwan De Silva",
    text: "Ordering from SweetSlice Cake Shop made our special occasion even more memorable. From the initial consultation to the final delivery, everything was seamless and professional. We'll definitely be returning for future events.",
    img: image01,
    
  },
  {
    id: 2,
    name: "Kamal Perera",
    text: "I'm absolutely thrilled with the quality of the cake I ordered from SweetSlice Cake Shop. The ingredients were fresh, and the flavors were perfectly balanced, making it a hit at my party.",
    img: image02,
  },
  {
    id: 3,
    name: "Pawani Mendis",
    text: "The cake design exceeded my expectations. It was not only visually stunning but also perfectly matched the theme of our event. SweetSlice truly brought our vision to life.",
    img: image03,
    
  },
  {
    id: 4,
    name: "Nuwan Viraj ",
    text: "The customer service at SweetSlice Cake Shop was outstanding. The staff was friendly, attentive, and went above and beyond to ensure our cake was exactly what we wanted.",
    img: image04,
    
  },
  {
    id: 5,
    name: "Maneesha De Silva",
    text: "Our celebration was significantly enhanced by the beautiful and delicious cake from SweetSlice. It was the centerpiece of our event, and everyone couldn't stop talking about how amazing it tasted.",
    img: image05,
    
  },
]
const Testimonials = () => {

  var settings={
    dots:true,
    arrows: false,
    infinite: true,
    speed: 500,
    //slisesToShow: 2,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus:true,
    responsive:[
      {
        breakpoint:10000,
        settings:{
          slidesToShow:3,
          slidesToScroll:1, 
          infinite:true,
        },
      },
      {
        breakpoint:1024,
        settings:{
          slidesToShow:2,
          slidesToScroll:1,
          initialSlide:2,
        },
      },
      {
        breakpoint:640,
        settings:{
          slidesToShow:1,
          slidesToScroll:1,
        },
      },
    ],
  }
  return (
    <section id="testimonials">
    <div className='py-10 mb-10'>
      <div className='container'>
        {/*header section*/}
        <div className='text-center mb-10 max-w-[600px] mx-auto'>
                <p data-aos="fade-up" className='text-1xl text-primary'> What our customers are saying </p>
                <h1 data-aos="fade-up"  className='text-3xl font-bold' >Testimonials </h1>
                <p data-aos="fade-up" className='text-1xl text-gray-400'> Explore testimonials from our satisfied customers at SweetSlice Cake Shop,</p>
                <p data-aos="fade-up" className='text-1xl text-gray-400'> showcasing how our cakes have made their celebrations truly special with 
                  delicious flavors and beautiful designs.
                </p>
                <p data-aos="fade-up" className='text-1xl text-gray-400'> 
                Join them in experiencing the difference our cakes make in elevating your special moments.</p>
          </div>
          {/*Testimonials cards */}
          <div
          data-aos="zoom-in">
            <Slider {... settings}>{
              testimonialData.map((data) =>(
                <div className='my-2'>
                <div 
                  key={data.id}
                  className='flex flex-col gap-6 shadow-lg py-8 px-6 mx-2
                max-4 rounded-xl dark:bg-gray-800 bg-primary/10 relative'
                >
                  <div className=''>
                    <img 
                    src={data.img}
                    className='rounded-full w-20 h-20' />
                  </div>
                  <div className='flex flex-col items-center gap-3'>
                    <div className='space-y-2'>
                      <p className='text-xs text-gray-500'>{data.text}</p>
                      <h1 className='text-xl font-bold text-black/80 dark:text-light'>{data.name} </h1>
                    </div>
                  </div>
                </div>
                </div>

              ))
            }
            </Slider>
          </div>
      </div>
    </div>
    </section>
  )
}

export default Testimonials