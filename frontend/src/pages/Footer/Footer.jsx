import React from 'react'
import footerLogo from "../../assets/logo.png"
import Banner from '../../assets/Banner/black-bg.jpg'
import{
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaLocationArrow,
    FaMobileAlt,
} from "react-icons/fa"; 

const BannerImg={
    backgroundImage: `url(${Banner})`,
    backgrountPosition: 'bottom',
    bachgroundRepeat: 'no-repeat',
    bachgroundSize: 'cover',
    height: '100%',
    width: '100%',
}

const FooterLinks=[
    {
        title:"Home",
        link: "/#",
    },
    {
        title:"About",
        link: "/#About",
    },
    {
        title:"Contact",
        link: "/#Contact",
    },
    {
        title:"Blog",
        link: "/#Blog",
    },
]
const Footer = () => {
  return (
    <div style={BannerImg}
    className='text-white '>
        <div className='container'>
            <div data-aos="zoom-in" className='grid md:grid-cols-3 pb-10 '>
                  {/*company details*/}
                  <div className='py-8 px-4'>
                    <h1 className='sm:text-3xl text-xl font-bold
                    sm:text-left text-justify mb-3 flex items-center gap-3'>
                        <img src={footerLogo} className='max-w-[50px]'/>
                        SweetSlice</h1>
                    <p>SweetSlice is your go-to online bakery for delicious, handcrafted cakes. We specialize in custom designs for every occasion, using the finest ingredients to create memorable, mouthwatering treats delivered right to your door. Indulge in the sweetness of SweetSlice, where every slice is a piece of joy.</p>

                  </div>
                  {/*Footer Links*/}
                  <div className='grid grid-cols-2 sm:grid-cols-3
                  col-span-2 md:pl-10'>
                    <div>
                        <div className='py-8 px-4'>
                            <h1 
                            className='sm:text-3xl text-xl font-bold
                            sm:text-left text-justify mb-3'>Important Links</h1>
                        <ul className='flex flex-col gap-3'>
                            {
                                FooterLinks.map((link)=> (
                                    <li 
                                    className='cursor-pointer hover:text-primary hover:translate-x-1
                                    duration-300 text-gray-200'
                                    key={link.title}>
                                        <span>{link.title}</span>

                                    </li>
                                ))
                            }
                            </ul>
                        </div>
                        
                        
                    </div>
                    <div className='py-8 px-4'>
                            <h1 
                            className='sm:text-3xl text-xl font-bold
                            sm:text-left text-justify mb-3'>Links</h1>
                        <ul className='flex flex-col gap-3'>
                            {
                                FooterLinks.map((link)=> (
                                    <li 
                                    className='cursor-pointer hover:text-primary hover:translate-x-1
                                    duration-300 text-gray-200'
                                    key={link.title}>
                                        <span>{link.title}</span>

                                    </li>
                                ))
                            }
                        </ul>
                        </div>
                    {/*Social Links*/}
                    <div>
                        <div className='flex items-center gap-3 mt-9'>
                            <a href="#">
                                <FaInstagram className='text-3xl' />
                            </a>
                            <a href="#">
                                <FaFacebook className='text-3xl'/>
                            </a>
                            <a href="#">
                                <FaLinkedin className='text-3xl'/>
                            </a>
                        </div>
                        <div className='mt-6'>
                            <div className='flex items-center gap-3 mt-3'>
                                <FaLocationArrow/>
                                <p>No:23, Galle Road, Colombo-03</p>
                            </div>
                            <div className='flex items-center gap-3 mt-3'>
                                <FaMobileAlt/>
                                <p>+94 1122334444</p>
                            </div>
                        </div>
                    </div>


                  </div>
            </div>

        </div>

    </div>
  )
}

export default Footer