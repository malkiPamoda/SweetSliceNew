const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/User');

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password');

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    // Generate the token
    const token = user.generateAuthToken();

    // Respond with user details and token
    res.send({
        token: token,
        user: _.pick(user, ['_id', 'firstName', 'lastName', 'email', 'isAdmin'])
    });
});

module.exports = router;