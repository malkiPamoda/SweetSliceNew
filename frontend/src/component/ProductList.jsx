import React, { useState } from 'react';
import axios from 'axios';

const ProductList = ({ products, deleteProduct, updateProduct }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const productItemStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const productImgStyle = {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '10px',
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProductData = new FormData();
    updatedProductData.append('name', formData.name);
    updatedProductData.append('description', formData.description);
    updatedProductData.append('price', parseFloat(formData.price));
    if (formData.image) {
      updatedProductData.append('image', formData.image);
    }

    try {
      await updateProduct(selectedProduct.id, updatedProductData);
      setSuccessMessage('Product updated successfully!');
      setSelectedProduct(null);
    } catch (err) {
      console.error('Error updating product:', err.response?.data || err.message);
      setError('Failed to update product. Please try again.');
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} style={productItemStyle}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <img src={product.image} alt={product.name} style={productImgStyle} />
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
            <button onClick={() => handleUpdate(product)}>Update</button>
          </li>
        ))}
      </ul>

      {selectedProduct && (
        <div>
          <h2>Update Product</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Image</label>
              <input type="file" name="image" onChange={handleInputChange} />
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setSelectedProduct(null)}>Cancel</button>
          </form>
          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default ProductList;