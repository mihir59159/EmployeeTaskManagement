const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Create task
router.post('/create', async (req, res) => {
    try {
        const { taskTitle, taskDescription, taskDate, category, assignTo, assignedBy } = req.body;
        
        const employee = await User.findOne({ firstName: assignTo });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const newTask = {
            taskTitle,
            taskDescription,
            taskDate,
            category,
            assignedBy,
            active: false,
            newTask: true,
            completed: false,
            failed: false,
            withdrawn: false
        };

        employee.tasks.push(newTask);
        employee.taskCounts.newTask += 1;
        await employee.save();

        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update task status
router.put('/update-status/:employeeId/:taskId', async (req, res) => {
    try {
        const { status } = req.body;
        const employee = await User.findById(req.params.employeeId);
        
        const task = employee.tasks.id(req.params.taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Update task counts
        if (task.newTask) employee.taskCounts.newTask -= 1;
        if (task.active) employee.taskCounts.active -= 1;
        if (task.completed) employee.taskCounts.completed -= 1;
        if (task.failed) employee.taskCounts.failed -= 1;

        // Reset all status
        task.newTask = false;
        task.active = false;
        task.completed = false;
        task.failed = false;

        // Set new status
        task[status] = true;
        employee.taskCounts[status] += 1;

        await employee.save();
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Withdraw task
router.put('/withdraw/:employeeId/:taskId', async (req, res) => {
    try {
        const employee = await User.findById(req.params.employeeId);
        const task = employee.tasks.id(req.params.taskId);
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Update task counts
        if (task.newTask) employee.taskCounts.newTask -= 1;
        if (task.active) employee.taskCounts.active -= 1;

        task.withdrawn = true;
        task.newTask = false;
        task.active = false;

        await employee.save();
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
