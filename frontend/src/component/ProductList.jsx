import React from 'react';

const ProductList = ({ products, deleteProduct, updateProduct }) => {
  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <img src={product.img} alt={product.title} />
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
            <button onClick={() => updateProduct(product)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;