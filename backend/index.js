const path = require('path');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL (Vite typically uses 5173)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Add a debug middleware to log requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Request Headers:', req.headers);
  next();
});

// For debugging - to check what's in your connection string
// NOTE: Remove this in production as it might expose your credentials
console.log("MongoDB URI:", process.env.MONGODB_URI ? "URI found (first 10 chars: " + 
  process.env.MONGODB_URI.substring(0, 10) + "...)" : "URI is undefined");

// Replace this with your actual connection string
const mongoURI = "mongodb+srv://yashanmanuka:JIc7VioFapzFSGhy@cluster0.8yoyg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err.message));

// Import your routes
const serviceRoutes = require('./routes/serviceRoutes');
const requestRoutes = require('./routes/requestRoutes'); // Add this line if missing

// Register the routes
app.use('/api/services', serviceRoutes);
app.use('/api/requests', requestRoutes); // Add this line if missing

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});