const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get all employees (for admin)
router.get('/', async (req, res) => {
    try {
        const employees = await User.find({ role: { $in: ['manager', 'employee'] } })
            .populate('createdBy', 'firstName email')
            .populate('managedBy', 'firstName email');
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get employees under a manager
router.get('/managed/:managerId', async (req, res) => {
    try {
        const employees = await User.find({ managedBy: req.params.managerId });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        // console.log("first")
        const employee = await User.find({ _id: req.params.id });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/managed/:managerId', async (req, res) => {
    try {
        const employees = await User.find({ managedBy: req.params.managerId });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create manager (admin only)
router.post('/create-manager', async (req, res) => {
    try {
        const { firstName, email, password, createdBy } = req.body;

        if (!firstName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const manager = new User({
            firstName,
            email,
            password,
            role: 'manager',
            createdBy
        });

        await manager.save();
        res.status(201).json(manager);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create employee (manager only)
router.post('/create-employee', async (req, res) => {
    try {
        const { firstName, email, password, createdBy, managedBy } = req.body;

        if (!firstName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!createdBy || !managedBy) {
            return res.status(400).json({ message: 'createdBy and managedBy are required' });
        }


        const employee = new User({
            firstName,
            email,
            password,
            role: 'employee',
            createdBy,
            managedBy
        });

        await employee.save();
        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user role (admin promoting to manager)
router.put('/update-role/:id', async (req, res) => {
    try {
        const { role } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        );
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
