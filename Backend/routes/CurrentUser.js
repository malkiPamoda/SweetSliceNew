const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { User } = require('../models/User');
const auth = require('../middleware/auth');


router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) return res.status(404).send('User not found');


        res.send({
            ...user.toObject(),
            isAdmin: user.isAdmin 
        });
    } catch (ex) {
        console.error(ex.message);
        res.status(500).send('Server Error');
    }
});


router.put('/me', auth, async (req, res) => {
    try {
       
        const { error } = validateUserUpdate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

  
        const currentUser = await User.findById(req.user._id);
        if (!currentUser) return res.status(404).send('User not found');

      
        if (!currentUser.isAdmin && (req.body.isAdmin !== undefined)) {
            return res.status(403).send('Access denied');
        }


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


function validateUserUpdate(user) {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(50),
        lastName: Joi.string().min(2).max(50),
        isAdmin: Joi.boolean()
    });
    return schema.validate(user);
}

module.exports = router;