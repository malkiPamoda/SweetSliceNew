import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const baseUrl = 'http://localhost:3000/'; // Replace with your actual base URL

function ProductView() {
  const { id } = useParams(); // Extract ID from URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for quantity input
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      console.error('Product ID is not defined');
      return;
    }

    const fetchProduct = async () => {
      try {
        console.log(`Fetching product with ID: ${id}`); // Debug log
        const response = await fetch(`${baseUrl}api/dashboard/products/${id}`);
        console.log('Response:', response);

        if (!response.ok) {
          const errorData = await response.text(); // Use text() to get raw response
          console.error('Error Data:', errorData);
          throw new Error(errorData);
        }

        const data = await response.json();
        console.log('Fetched Product Data:', data);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.message);
      }
    };

    fetchProduct();
  }, [id]);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('x-auth-token'); // Assuming token is stored in localStorage
    console.log('x-auth-token:', token); // Log the token for debugging
    if (!token) {
        alert('You need to log in first!');
        return;
    }

    try {
      const response = await fetch(`${baseUrl}api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({
          productId: id,
          quantity,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData);
      }

      const data = await response.json();
      console.log('Order placed:', data);
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order: ' + error.message);
    }
  };

  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <section id="product-view" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Product Details</h1>
        </div>
        <div style={styles.productCard}>
          <img
            src={product.image.includes('http') ? product.image : baseUrl + product.image.replace("uploads/", "")}
            alt={product.title}
            className="h-[220px] w-[150px] object-cover rounded-md"
          />
          <div style={styles.productInfo}>
            <h2 style={styles.productTitle}>{product.name}</h2>
            <p style={styles.productDescription}>{product.description}</p>
            <p style={styles.productPrice}>{product.price}</p>
            <form onSubmit={handleOrderSubmit}>
              <label>
                Quantity:
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  style={styles.quantityInput}
                />
              </label>
              <button type="submit" style={{ ...styles.orderButton, float: 'right' }}>
                Add to Cart
              </button>
            </form>
          </div>
        </div>
        <div style={styles.policies}>
          <h3>Delivery Policies</h3>
          <ul>
            <li>Delivery Methods: We offer standard and express delivery options.</li>
            <li>Delivery Time: Standard delivery takes 3-5 business days. Express delivery is 1-2 business days.</li>
            <li>Return Policies: Returns are accepted within 30 days of purchase.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#333',
  },
  productCard: {
    background: '#fff',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
    padding: '1rem',
    marginBottom: '2rem',
  },
  productImage: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  },
  productInfo: {
    padding: '1rem',
  },
  productTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  productDescription: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '1rem',
  },
  productPrice: {
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '1rem',
  },
  quantityInput: {
    marginLeft: '0.5rem',
    marginRight: '1rem',
    padding: '0.25rem',
    border: '1px solid #ccc',
    borderRadius: '0.25rem',
  },
  orderButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  policies: {
    backgroundColor: '#f9f9f9',
    padding: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  orderButtonHover: {
    backgroundColor: '#0056b3',
  }
};

export default ProductView;