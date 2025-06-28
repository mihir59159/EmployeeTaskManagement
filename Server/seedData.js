const mongoose = require('mongoose');
const User = require('./models/User');

const seedData = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/employee-task-management');
        
        // Clear existing data
        await User.deleteMany({});

        // Create admin
        const admin = new User({
            firstName: 'Admin',
            email: 'admin@me.com',
            password: '123',
            role: 'admin'
        });
        await admin.save();

        // Create a manager
        const manager = new User({
            firstName: 'Manager',
            email: 'manager@me.com',
            password: '123',
            role: 'manager',
            createdBy: admin._id
        });
        await manager.save();

        // Create employees with existing data
        const employees = [
            {
                firstName: "Arjun",
                email: "e@e.com",
                password: "123",
                role: "employee",
                createdBy: manager._id,
                managedBy: manager._id,
                taskCounts: {
                    active: 2,
                    newTask: 1,
                    completed: 1,
                    failed: 0
                },
                tasks: [
                    {
                        active: true,
                        newTask: true,
                        completed: false,
                        failed: false,
                        taskTitle: "Update website",
                        taskDescription: "Revamp the homepage design",
                        taskDate: "2024-10-12",
                        category: "Design",
                        assignedBy: manager._id
                    },
                    {
                        active: false,
                        newTask: false,
                        completed: true,
                        failed: false,
                        taskTitle: "Client meeting",
                        taskDescription: "Discuss project requirements",
                        taskDate: "2024-10-10",
                        category: "Meeting",
                        assignedBy: manager._id
                    },
                    {
                        active: true,
                        newTask: false,
                        completed: false,
                        failed: false,
                        taskTitle: "Fix bugs",
                        taskDescription: "Resolve bugs reported in issue tracker",
                        taskDate: "2024-10-14",
                        category: "Development",
                        assignedBy: manager._id
                    }
                ]
            },
            {
                firstName: "Sneha",
                email: "employee2@example.com",
                password: "123",
                role: "employee",
                createdBy: manager._id,
                managedBy: manager._id,
                taskCounts: {
                    active: 1,
                    newTask: 0,
                    completed: 1,
                    failed: 0
                },
                tasks: [
                    {
                        active: true,
                        newTask: false,
                        completed: false,
                        failed: false,
                        taskTitle: "Database optimization",
                        taskDescription: "Optimize queries for better performance",
                        taskDate: "2024-10-11",
                        category: "Database",
                        assignedBy: manager._id
                    },
                    {
                        active: false,
                        newTask: false,
                        completed: true,
                        failed: false,
                        taskTitle: "Design new feature",
                        taskDescription: "Create mockups for the new feature",
                        taskDate: "2024-10-09",
                        category: "Design",
                        assignedBy: manager._id
                    }
                ]
            }
        ];

        for (let empData of employees) {
            const employee = new User(empData);
            await employee.save();
        }

        console.log('Seed data created successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
