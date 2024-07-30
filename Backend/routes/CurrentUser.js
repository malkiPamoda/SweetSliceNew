const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { User } = require('../models/User');
const auth = require('../middleware/auth');

// Route to get the current user info
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) return res.status(404).send('User not found');

        // Optional: You might want to include specific responses or data based on admin status
        res.send({
            ...user.toObject(),
            isAdmin: user.isAdmin  // Include isAdmin in response if needed
        });
    } catch (ex) {
        console.error(ex.message);
        res.status(500).send('Server Error');
    }
});

// Route to update the current user's info
router.put('/me', auth, async (req, res) => {
    try {
        // Validate user input
        const { error } = validateUserUpdate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Check if the user is an admin before updating
        const currentUser = await User.findById(req.user._id);
        if (!currentUser) return res.status(404).send('User not found');

        // Optionally, restrict updates based on admin status
        // Example: Only admins can update certain fields
        if (!currentUser.isAdmin && (req.body.isAdmin !== undefined)) {
            return res.status(403).send('Access denied');
        }

        // Update the user
        const user = await User.findByIdAndUpdate(req.user._id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }, { new: true }).select('-_id -password');

        res.send(user);
    } catch (ex) {
        console.error(ex.message);
        res.status(500).send('Server Error');
    }
});

// Validation function for user updates
function validateUserUpdate(user) {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(50),
        lastName: Joi.string().min(2).max(50),
        isAdmin: Joi.boolean() // Add validation for isAdmin if needed
    });
    return schema.validate(user);
}

module.exports = router;