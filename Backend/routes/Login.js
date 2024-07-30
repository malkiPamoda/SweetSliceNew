const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/User');


router.post('/', async (req, res) => {

    const { email, password } = req.body;


    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password');


    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');


    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'firstName', 'lastName', 'email']));
});

module.exports = router;