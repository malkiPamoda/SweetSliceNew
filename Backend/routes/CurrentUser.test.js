const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const mockingoose = require('mockingoose');
const { User } = require('../models/User');
const currentUserRoute = require('../routes/CurrentUser');
const auth = require('../middleware/auth');


const app = express();
app.use(express.json());
app.use('/api/users', currentUserRoute);


jest.mock('../middleware/auth', () => (req, res, next) => {
    req.user = { _id: 'userId' }; 
    next();
});

describe('Current User API', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/SweetSliceTest', { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    test('GET /api/users/me - success', async () => {

        mockingoose(User).toReturn({
            _id: 'userId',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            isAdmin: false,
            toObject: () => ({
                _id: 'userId',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                isAdmin: false
            })
        }, 'findById');

        const res = await request(app).get('/api/users/me');

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            _id: 'userId',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            isAdmin: false
        });
    });

    test('GET /api/users/me - user not found', async () => {
  
        mockingoose(User).toReturn(null, 'findById');

        const res = await request(app).get('/api/users/me');

        expect(res.status).toBe(404);
        expect(res.text).toBe('User not found');
    });

    test('PUT /api/users/me - success', async () => {
      
        mockingoose(User).toReturn({
            _id: 'userId',
            firstName: 'John',
            lastName: 'Doe',
            isAdmin: false
        }, 'findById');

    
        mockingoose(User).toReturn({
            _id: 'userId',
            firstName: 'Jane',
            lastName: 'Doe',
            isAdmin: false
        }, 'findByIdAndUpdate');

        const res = await request(app)
            .put('/api/users/me')
            .send({ firstName: 'Jane', lastName: 'Doe' });

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            firstName: 'Jane',
            lastName: 'Doe'
        });
    });

    test('PUT /api/users/me - validation error', async () => {
        const res = await request(app)
            .put('/api/users/me')
            .send({ firstName: 'J', lastName: 'Doe' }); 

        expect(res.status).toBe(400);
        expect(res.text).toBe('\"firstName\" length must be at least 2 characters long');
    });

    test('PUT /api/users/me - user not found', async () => {
       
        mockingoose(User).toReturn(null, 'findById');

        const res = await request(app)
            .put('/api/users/me')
            .send({ firstName: 'Jane', lastName: 'Doe' });

        expect(res.status).toBe(404);
        expect(res.text).toBe('User not found');
    });

    test('PUT /api/users/me - access denied', async () => {
     
        mockingoose(User).toReturn({
            _id: 'userId',
            isAdmin: false
        }, 'findById');

   
        mockingoose(User).toReturn({
            _id: 'userId',
            firstName: 'Jane',
            lastName: 'Doe',
            isAdmin: false
        }, 'findByIdAndUpdate');

        const res = await request(app)
            .put('/api/users/me')
            .send({ firstName: 'Jane', lastName: 'Doe', isAdmin: true });

        expect(res.status).toBe(403);
        expect(res.text).toBe('Access denied');
    });

    test('PUT /api/users/me - unexpected error', async () => {

        mockingoose(User).toReturn({
            _id: 'userId'
        }, 'findById');

        mockingoose(User).toReturn(new Error('Database error'), 'findByIdAndUpdate');

        const res = await request(app)
            .put('/api/users/me')
            .send({ firstName: 'Jane', lastName: 'Doe' });

        expect(res.status).toBe(500);
        expect(res.text).toBe('Server Error');
    });
});