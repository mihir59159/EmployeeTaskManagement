const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for admin
        if (email === 'admin@me.com' && password === '123') {
            const admin = await User.findOne({ email: 'admin@me.com' });
            if (!admin) {
                // Create admin if doesn't exist
                const newAdmin = new User({
                    firstName: 'Admin',
                    email: 'admin@me.com',
                    password: '123',
                    role: 'admin'
                });
                await newAdmin.save();
                return res.json({ role: 'admin', data: newAdmin });
            }
            return res.json({ role: 'admin', data: admin });
        }

        // Check for manager/employee
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({ role: user.role, data: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
