const mongoose = require('mongoose');

// Define the Schema for Task
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true   // space cut
  },

  description: {
    type: String,
    default: '',
    trim: true   // psace cut
  },


  status: {
    type: String,
    enum: {
      values: ['pending', 'in-progress', 'completed'],
      message: '{VALUE} is not a valid status. Allowed values: pending, in-progress, completed'
    },
    default: 'pending'   // iska matlab hai agar user status nahi bhej rha hai to pending default aayega
  },

  priority: {
    type: String,
    enum: {
      values: ['low', 'medium', 'high'],
      message: '{VALUE} is not a valid priority. Allowed values: low, medium, high'
    },
    default: 'medium'  // iska matlab hai agar user status nhi bheja to meduim maan lega
  },

  dueDate: {     // taks date 
    type: Date,
    default: null
  },
 
  // task kab banya gya hai
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Task', taskSchema);
