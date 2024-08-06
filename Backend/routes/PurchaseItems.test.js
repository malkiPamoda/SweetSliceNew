const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const purchaseItemsRoutes = require('../routes/PurchaseItems');
const { User } = require('../models/User');
const { Product } = require('../models/Product');
const auth = require('../middleware/auth');
const app = express();

app.use(express.json());
app.use('/api/purchase', purchaseItemsRoutes);

jest.mock('../middleware/auth', () => (req, res, next) => {
  req.user = { _id: userId };
  next();
});

let mongoServer;
let userId;
let productId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  // Create a sample product
  const product = new Product({
    name: 'Test Product',
    description: 'Description for test product',
    price: 100
  });
  await product.save();
  productId = product._id;

  // Create a sample user
  const user = new User({
    email: 'test@example.com',
    password: 'password',
    cart: [{ productId, quantity: 2 }],
    purchasedItems: []
  });
  await user.save();
  userId = user._id;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Purchase Items API', () => {
  // Test POST /api/purchase
  it('should purchase all items from the cart and clear the cart', async () => {
    const res = await request(app)
      .post('/api/purchase')
      .expect(200);

    expect(res.text).toBe('Purchase successful and cart cleared.');

    const user = await User.findById(userId);
    expect(user.cart).toHaveLength(0);
    expect(user.purchasedItems).toHaveLength(1);
    expect(user.purchasedItems[0]).toHaveProperty('productId', productId);
    expect(user.purchasedItems[0]).toHaveProperty('quantity', 2);
  });

  // Test GET /api/purchase
  it('should get all purchased items', async () => {
    const res = await request(app)
      .get('/api/purchase')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('productId');
    expect(res.body[0]).toHaveProperty('quantity', 2);
  });
});