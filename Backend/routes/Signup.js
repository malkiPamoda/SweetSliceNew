const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/User');


const ADMIN_EMAIL = 'admin@example.com'; 

router.post('/', async (req, res) => {
  
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered');


    const isAdmin = req.body.email === ADMIN_EMAIL;

 
    user = new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'password']));
    user.isAdmin = isAdmin;

  
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    try {

        await user.save();
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'firstName', 'lastName', 'email', 'isAdmin']));
    } catch (ex) {
        res.status(500).send('Error creating user: ' + ex.message);
    }
});

module.exports = router;