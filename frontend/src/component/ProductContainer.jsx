import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './ProductList';

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const baseUrl = '../../../Backend'

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/dashboard/products');
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err.response?.data || err.message);
        setError('Failed to fetch products. Please try again.');
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/dashboard/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      console.error('Error deleting product:', err.response?.data || err.message);
      setError('Failed to delete product. Please try again.');
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/dashboard/products/${updatedProduct.id}`, updatedProduct);
      setProducts(products.map(product => product.id === updatedProduct.id ? response.data : product));
    } catch (err) {
      console.error('Error updating product:', err.response?.data || err.message);
      setError('Failed to update product. Please try again.');
    }
  };

  return (
    <div>
      {error && <p className='text-red-500'>{error}</p>}
      <ProductList
        products={products.map(product => ({
          ...product,
          img: `${baseUrl}/${product.image}` // Construct full URL for the image
        }))}
        deleteProduct={deleteProduct}
        updateProduct={updateProduct}
      />
    </div>
  );
};

export default ProductContainer;