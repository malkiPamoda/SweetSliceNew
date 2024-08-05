import React, { useEffect, useState } from 'react';
import image1 from "../../assets/Menu/image01.jpg";
import image2 from "../../assets/Menu/image2.jpg";
import image3 from "../../assets/Menu/image3.jpg";
import image4 from "../../assets/Menu/image4.jpg";
import image5 from "../../assets/Menu/image5.jpg";
import image6 from "../../assets/Menu/image6.jpg";
import image7 from "../../assets/Menu/image7.jpg";
import image8 from "../../assets/Menu/image8.jpg";
import image9 from "../../assets/Menu/image9.jpg";
import image10 from "../../assets/Menu/image10.jpg";

const staticProducts = [
  {
    id: 1,
    image: image1,
    title: "Birthday Cake-Butter",
    price: "$20",
    aosDelay: "0",
  },
  {
    id: 2,
    image: image2,
    title: "Birthday Cake-Chocolate",
    price: "$20",
    aosDelay: "200",
  },
  {
    id: 3,
    image: image3,
    title: "Wedding Cake",
    price: "$20",
    aosDelay: "400",
  },
  {
    id: 4,
    image: image4,
    title: "Wedding Cake",
    price: "$20",
    aosDelay: "600",
  },
  {
    id: 5,
    image: image5,
    title: "Birthday Cake-Chocolate",
    price: "$20",
    aosDelay: "800",
  },
  {
    id: 6,
    image: image6,
    title: "Wedding Cake",
    price: "$20",
    aosDelay: "0",
  },
  {
    id: 7,
    image: image7,
    title: "Birthday Cake-Chocolate",
    price: "$20",
    aosDelay: "200",
  },
  {
    id: 8,
    image: image8,
    title: "Cup Cake-Chocolate",
    price: "$20",
    aosDelay: "400",
  },
  {
    id: 9,
    image: image9,
    title: "Birthday Cake-Butter",
    price: "$20",
    aosDelay: "600",
  },
  {
    id: 10,
    image: image10,
    title: "Birthday Cake-Chocolate",
    price: "$20",
    aosDelay: "800",
  },
];

const baseUrl = 'http://localhost:3000/'; // Replace with your actual base URL

function Menu({ handleOrderPopup }) {
  const [products, setProducts] = useState(staticProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseUrl}api/dashboard/products`); // Replace with your backend URL
        const data = await response.json();
        const updatedData = data.map(product => ({
          ...product,
          img: baseUrl + product.image?.replace("uploads/", "") // Construct full URL for the image
        }));
        setProducts([...staticProducts, ...updatedData]);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);


  return (
    <section id="menu">
      <div className='mt-14 mb-12'>
        <div className='container'>
          {/* Header section */}
          <div className='text-center mb-10 max-w-[600px] mx-auto'>
            <p data-aos="fade-up" className='text-1xl text-primary'> Our Menu</p>
            <h1 data-aos="fade-up" className='text-3xl font-bold'>Products </h1>
            <p data-aos="fade-up" className='text-1xl text-gray-400'> Delicious, Elegant, Memorable.</p>
            <p data-aos="fade-up" className='text-1xl text-gray-400'> Quality, Taste, Style</p>
          </div>
          {/* Body section */}
          <div>
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5'>
              {/* card section */}
              {products.map((product) => (
                <div
                  data-aos="fade-up"
                  data-aos-delay={product.aosDelay}
                  key={product.id}
                  className='space-y-3'>
                 <div>
                    <img
                       src={product.image.includes('http') ? product.image : baseUrl + product.image.replace("uploads/", "")}
                      alt={product.title}
                      className="h-[220px] w-[150px] object-cover rounded-md"
                    />
                    <div>
                      <h3 className='font-semibold mt-2'>{product.name}</h3>
                      <p className='text-sm text-primary mt-2'>{product.price}</p>
                      <div data-aos="fade-up" className='mt-2'>
                        <button
                          onClick={() => handleOrderPopup()}
                          className='cursor-pointer bg-primary text-white py-1 px-5 rounded-md'>
                          Order Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Menu;