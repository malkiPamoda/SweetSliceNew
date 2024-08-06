const request = require('supertest');
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/User');
const signup = require('./Signup'); 

const app = express();
app.use(express.json());
app.use('/api/signup', signup);

const mockingoose = require('mockingoose');

describe('Register API', () => {
  let server;
  let email;
  let password;
  let hashedPassword;
  const ADMIN_EMAIL = 'admin@example.com';

  beforeAll(() => {
    server = app.listen(3001); 

    email = 'testuser@example.com';
    password = 'password123';
    hashedPassword = bcrypt.hashSync(password, 10); 
  });

  afterAll(async () => {
    server.close();
  });

  test('POST /api/register - successful registration', async () => {
   
    const validateMock = jest.spyOn(validate, 'validate').mockReturnValue({ error: null });


    mockingoose(User).toReturn(null, 'findOne');
    mockingoose(User).toReturn({ 
      _id: 'fakeId',
      firstName: 'Test',
      lastName: 'User',
      email,
      password: hashedPassword,
      isAdmin: false,
      generateAuthToken: () => 'fakeToken'
    }, 'save');

    const res = await request(app)
      .post('/api/register')
      .send({ firstName: 'Test', lastName: 'User', email, password });

    expect(res.status).toBe(200);
    expect(res.header['x-auth-token']).toBe('fakeToken');
    expect(res.body).toEqual(expect.objectContaining({
      _id: 'fakeId',
      firstName: 'Test',
      lastName: 'User',
      email,
      isAdmin: false,
    }));

    validateMock.mockRestore();
  });

  test('POST /api/register - validation error', async () => {
    const errorMessage = 'Invalid input';
    jest.spyOn(validate, 'validate').mockReturnValue({ error: { details: [{ message: errorMessage }] } });

    const res = await request(app)
      .post('/api/register')
      .send({ email }); 

    expect(res.status).toBe(400);
    expect(res.text).toBe(errorMessage);
  });

  test('POST /api/register - user already exists', async () => {

    mockingoose(User).toReturn({ email }, 'findOne');

    const res = await request(app)
      .post('/api/register')
      .send({ firstName: 'Test', lastName: 'User', email, password });

    expect(res.status).toBe(400);
    expect(res.text).toBe('User already registered');
  });

  test('POST /api/register - unexpected error during user creation', async () => {

    mockingoose(User).toReturn(new Error('Database error'), 'save');

    const res = await request(app)
      .post('/api/register')
      .send({ firstName: 'Test', lastName: 'User', email, password });

    expect(res.status).toBe(500);
    expect(res.text).toBe('Error creating user: Database error');
  });
});