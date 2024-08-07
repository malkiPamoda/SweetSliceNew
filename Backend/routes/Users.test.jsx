const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const usersRoutes = require('./Users');
const { User } = require('../models/User');

const app = express();

app.use(express.json());
app.use('/api/dashboard/users', usersRoutes);

let mongoServer;
let userId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  // Create a sample user
  const user = new User({
    email: 'test@example.com',
    password: 'password',
    firstName: 'John',
    lastName: 'Doe'
  });
  await user.save();
  userId = user._id;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Users API', () => {
  // Test GET /api/users
  it('should get all users', async () => {
    const res = await request(app)
      .get('/api/users')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('firstName', 'John');
    expect(res.body[0]).toHaveProperty('lastName', 'Doe');
    expect(res.body[0]).not.toHaveProperty('password');
  });

  // Test PUT /api/users/:id
  it('should update a user', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send({ firstName: 'Jane', lastName: 'Smith' })
      .expect(200);

    expect(res.body).toHaveProperty('firstName', 'Jane');
    expect(res.body).toHaveProperty('lastName', 'Smith');
    expect(res.body).not.toHaveProperty('password');
  });

  // Test DELETE /api/users/:id
  it('should delete a user', async () => {
    const res = await request(app)
      .delete(`/api/users/${userId}`)
      .expect(200);

    expect(res.body).toHaveProperty('firstName', 'Jane');
    expect(res.body).toHaveProperty('lastName', 'Smith');

    // Check if the user is deleted
    await request(app)
      .get(`/api/users/${userId}`)
      .expect(404);
  });
});