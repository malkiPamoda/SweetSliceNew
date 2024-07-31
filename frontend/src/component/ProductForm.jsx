import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [product, setProduct] = useState({ name: '', description: '', price: '', img: null });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'img') {
      setProduct({ ...product, [name]: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', product.name); // Changed from 'title' to 'name'
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('image', product.img); // Ensure this matches the backend field name

    try {
      const response = await axios.post('http://localhost:3000/api/dashboard/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Product added successfully:', response.data);
      setSuccessMessage('Product added successfully!');
      setProduct({ name: '', description: '', price: '', img: null });
    } catch (err) {
      console.error('Error adding product:', err.response?.data || err.message);
      setError('Failed to add product. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name" // Changed from 'title' to 'name'
          value={product.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          type="file"
          name="img"
          onChange={handleChange}
          required
        />
        <button type="submit">Add Product</button>
      </form>
      {error && <p className='text-red-500'>{error}</p>}
      {successMessage && <p className='text-green-500'>{successMessage}</p>}
    </div>
  );
};

export default ProductForm;