import React, { useState } from 'react';

const ProductForm = ({ addProduct }) => {
  const [product, setProduct] = useState({ title: '', description: '', price: '', img: '' });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(product);
    setProduct({ title: '', description: '', price: '', img: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={product.title} onChange={handleChange} placeholder="Title" required />
      <input type="text" name="description" value={product.description} onChange={handleChange} placeholder="Description" required />
      <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" required />
      <input type="text" name="img" value={product.img} onChange={handleChange} placeholder="Image URL" required />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;