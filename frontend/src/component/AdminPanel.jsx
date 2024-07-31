import React, { useState, useContext } from 'react';
import UserContext from './UserContext';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import ProductContainer from './ProductContainer';

const AdminPanel = () => {
  const { user, isLoading } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: products.length + 1 }]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const updateProduct = (updatedProduct) => {
    setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
  };

  if (isLoading) return <p>Loading...</p>;

  if (!user || !user.isAdmin) {
    return <p>Access Denied. Admins only.</p>;
  }

  return (
    <div className='container'>
      <h1>Admin Panel</h1>
      <ProductForm addProduct={addProduct} />
      <ProductList products={products} deleteProduct={deleteProduct} updateProduct={updateProduct} />
      <ProductContainer /> 
    </div>
  );
};

export default AdminPanel;