const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/User');
const login = require('./Login'); 

const app = express();
app.use(express.json());
app.use('/api/login', login);

const mockingoose = require('mockingoose');

describe('Auth API', () => {
  let server;
  let email;
  let password;
  let hashedPassword;

  beforeAll(async () => {
    server = app.listen(3000); 


    email = 'testuser@example.com';
    password = 'password123';
    hashedPassword = await bcrypt.hash(password, 10); 

    mockingoose(User).toReturn({ 
      email,
      password: hashedPassword,
      generateAuthToken: () => 'fakeToken',
    }, 'findOne');
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  test('POST /api/auth - successful login', async () => {
    const res = await request(app)
      .post('/api/auth')
      .send({ email, password });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toEqual(expect.objectContaining({
      _id: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
      email,
      isAdmin: expect.any(Boolean),
    }));
  });

  test('POST /api/auth - invalid email', async () => {
    mockingoose(User).toReturn(null, 'findOne'); 

    const res = await request(app)
      .post('/api/auth')
      .send({ email, password });

    expect(res.status).toBe(400);
    expect(res.text).toBe('Invalid email or password');
  });

  test('POST /api/auth - invalid password', async () => {

    const wrongPassword = 'wrongPassword';
    mockingoose(User).toReturn({
      email,
      password: await bcrypt.hash(wrongPassword, 10), 
      generateAuthToken: () => 'fakeToken',
    }, 'findOne');

    const res = await request(app)
      .post('/api/auth')
      .send({ email, password });

    expect(res.status).toBe(400);
    expect(res.text).toBe('Invalid email or password');
  });
});