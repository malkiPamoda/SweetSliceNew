import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const baseUrl = 'http://localhost:3000/'; // Replace with your actual base URL

function Menu() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseUrl}api/dashboard/products`);
        const data = await response.json();
        console.log('Fetched products:', data); // Check the structure here
        const updatedData = data.map(product => ({
          ...product,
          img: baseUrl + product.image?.replace("uploads/", "")
        }));
        setProducts(updatedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleOrderPopup = (_id) => {
    if (_id) {
      console.log(`Navigating to product with ID: ${_id}`);
      navigate(`/product-view/${_id}`);
    } else {
      console.error('Invalid product ID');
    }
  };

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
                         onClick={() => handleOrderPopup(product._id)}
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