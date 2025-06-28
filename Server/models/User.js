const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskTitle: { type: String, required: true },
  taskDescription: { type: String, required: true },
  taskDate: { type: String, required: true },
  category: { type: String, required: true },
  active: { type: Boolean, default: false },
  newTask: { type: Boolean, default: true },
  completed: { type: Boolean, default: false },
  failed: { type: Boolean, default: false },
  withdrawn: { type: Boolean, default: false },
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'manager', 'employee'], required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  managedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // For employees
  tasks: [taskSchema],
  taskCounts: {
    active: { type: Number, default: 0 },
    newTask: { type: Number, default: 0 },
    completed: { type: Number, default: 0 },
    failed: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
