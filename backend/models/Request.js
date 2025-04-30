const mongoose = require('mongoose');
//gdvh

const requestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [5, 'Title must be at least 5 characters long']
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [20, 'Description must be at least 20 characters long']
  },
  urgency: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  preferredDate: {
    type: Date
  },
  preferredTime: {
    type: String
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  budget: {
    type: String
  },
  contactName: {
    type: String,
    required: [true, 'Contact name is required']
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v.replace(/\s/g, ''));
      },
      message: 'Please enter a valid 10-digit phone number'
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
  },
  additionalInfo: {
    type: String
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'completed', 'cancelled'],
    default: 'open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;