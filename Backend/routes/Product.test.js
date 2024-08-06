const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { Product } = require('../models/Product');
const productRoutes = require('../routes/Product');
const upload = require('../multer-config'); // Mock this if needed

const app = express();
app.use(express.json());
app.use('/api/dashboard/products', productRoutes);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Product API', () => {
  let productId;


  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/dashboard/products')
      .send({
        name: 'Product 1',
        description: 'Product description',
        price: 100
      })
      .expect(200);

    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('name', 'Product 1');
    expect(res.body).toHaveProperty('description', 'Product description');
    expect(res.body).toHaveProperty('price', 100);

    productId = res.body._id; 
  });


  it('should get all products', async () => {
    const res = await request(app)
      .get('/api/dashboard/products')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });


  it('should get a product by ID', async () => {
    const res = await request(app)
      .get(`/api/dashboard/products/${productId}`)
      .expect(200);

    expect(res.body).toHaveProperty('_id', productId);
    expect(res.body).toHaveProperty('name', 'Product 1');
  });


  it('should update a product', async () => {
    const res = await request(app)
      .put(`/api/dashboard/products/${productId}`)
      .send({
        name: 'Updated Product',
        description: 'Updated description',
        price: 200
      })
      .expect(200);

    expect(res.body).toHaveProperty('_id', productId);
    expect(res.body).toHaveProperty('name', 'Updated Product');
    expect(res.body).toHaveProperty('description', 'Updated description');
    expect(res.body).toHaveProperty('price', 200);
  });

  it('should delete a product', async () => {
    const res = await request(app)
      .delete(`/api/dashboard/products/${productId}`)
      .expect(200);

    expect(res.body).toHaveProperty('message', 'Product 1 deleted successfully');
  });
});