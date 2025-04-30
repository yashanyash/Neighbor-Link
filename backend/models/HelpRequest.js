const mongoose = require('mongoose');
// new help
const helpRequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Request title is required'],
    minlength: [5, 'Title must be at least 5 characters long']
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [20, 'Description should be at least 20 characters']
  },
  urgency: {
    type: String,
    enum: ['low', 'normal', 'high'],
    default: 'normal'
  },
  timeline: {
    type: String,
    required: [true, 'Timeline information is required']
  },
  compensation: {
    type: String,
    default: ''
  },
  contactName: {
    type: String,
    required: [true, 'Contact name is required']
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  preferredContactMethod: {
    type: String,
    enum: ['email', 'phone', 'either'],
    default: 'email'
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'completed', 'cancelled'],
    default: 'open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the 'updatedAt' field before saving
helpRequestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const HelpRequest = mongoose.model('HelpRequest', helpRequestSchema);

module.exports = HelpRequest;