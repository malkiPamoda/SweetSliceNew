const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { User } = require('../models/User');
const { Product } = require('../models/Product');
const cart = require('./Cart'); 
const auth = require('../middleware/auth');
jest.setTimeout(30000); 

const app = express();
app.use(express.json());
app.use('/api/cart', cart);


jest.mock('../middleware/auth', () => (req, res, next) => {
  req.user = { _id: 'testUserId' }; 
  next();
});

describe('Cart API', () => {
  let server;
  let token;
  let userId;
  let productId;

  beforeAll(async () => {
    server = app.listen(3001); 
    await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });


    const user = new User({
      firstName: 'Test',
      lastName: 'User',
      email: `test${Date.now()}@example.com`,
      password: 'password123',
    });
    await user.save();
    userId = user._id;

    const product = new Product({
      name: 'Test Product',
      description: 'Test Description',
      price: 10,
      image: './uploads/image-1722583073514.png'
    });
    await product.save();
    productId = product._id;


    token = user.generateAuthToken(); 
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Product.deleteMany({});
  });

  test('POST /api/cart - add product to cart', async () => {
    const res = await request(app)
      .post('/api/cart')
      .set('x-auth-token', token)
      .send({ productId, quantity: 1 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([
      expect.objectContaining({ productId: productId.toString(), quantity: 1 })
    ]));
  });

  test('POST /api/cart - invalid user', async () => {
    jest.resetModules(); 

    jest.mock('../middleware/auth', () => (req, res, next) => {
      req.user = null; 
      next();
    });

    const res = await request(app)
      .post('/api/cart')
      .set('x-auth-token', token)
      .send({ productId, quantity: 1 });

    expect(res.status).toBe(400);
    expect(res.text).toBe('Invalid user.');
  });

  test('POST /api/cart - invalid product', async () => {
    const res = await request(app)
      .post('/api/cart')
      .set('x-auth-token', token)
      .send({ productId: 'invalidproductid', quantity: 1 });

    expect(res.status).toBe(400);
    expect(res.text).toBe('Invalid product.');
  });

  test('GET /api/cart - retrieve user\'s cart', async () => {
    await request(app)
      .post('/api/cart')
      .set('x-auth-token', token)
      .send({ productId, quantity: 1 });

    const res = await request(app)
      .get('/api/cart')
      .set('x-auth-token', token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([
      expect.objectContaining({ productId: productId.toString(), quantity: 1 })
    ]));
  });

  test('GET /api/cart - invalid user', async () => {
    jest.resetModules(); 

    jest.mock('../middleware/auth', () => (req, res, next) => {
      req.user = null; 
      next();
    });

    const res = await request(app)
      .get('/api/cart')
      .set('x-auth-token', token);

    expect(res.status).toBe(400);
    expect(res.text).toBe('Invalid user.');
  });

  test('DELETE /api/cart/:cartItemId - remove product from cart', async () => {
    const addRes = await request(app)
      .post('/api/cart')
      .set('x-auth-token', token)
      .send({ productId, quantity: 1 });

    const cartItemId = addRes.body[0]._id; 

    const deleteRes = await request(app)
      .delete(`/api/cart/${cartItemId}`)
      .set('x-auth-token', token);

    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body).not.toContainEqual(expect.objectContaining({ _id: cartItemId }));
  });

  test('DELETE /api/cart/:cartItemId - item not found', async () => {
    const res = await request(app)
      .delete('/api/cart/invalidcartitemid')
      .set('x-auth-token', token);

    expect(res.status).toBe(404);
    expect(res.text).toBe('Item not found in cart.');
  });

  test('DELETE /api/cart/:cartItemId - invalid user', async () => {
    jest.resetModules(); 

    jest.mock('../middleware/auth', () => (req, res, next) => {
      req.user = null; 
      next();
    });

    const res = await request(app)
      .delete('/api/cart/invalidcartitemid')
      .set('x-auth-token', token);

    expect(res.status).toBe(400);
    expect(res.text).toBe('Invalid user.');
  });
});