const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

// Create a new help request
router.post('/', async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(400).json({ 
      message: error.message,
      details: error.errors ? Object.values(error.errors).map(e => e.message) : []
    });
  }
});

// Get all help requests
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific help request
router.get('/:id', async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Help request not found' });
    }
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a help request
router.put('/:id', async (req, res) => {
  try {
    console.log('Updating request with ID:', req.params.id);
    console.log('Update data:', req.body);
    
    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: false } // Set runValidators to false to avoid strict validation
    );
    
    if (!updatedRequest) {
      return res.status(404).json({ message: 'Help request not found' });
    }
    
    console.log('Request updated successfully:', updatedRequest);
    res.json(updatedRequest);
  } catch (error) {
    console.error('Error updating request:', error);
    res.status(400).json({ message: error.message });
  }
});

// When making an axios request to update:

try {
  console.log("Updating with ID:", id);
  console.log("Data being sent:", editForm);
  
  const response = await axios.put(`http://localhost:5000/api/services/${id}`, editForm);
  console.log("Update successful, response:", response.data);
  
  // Rest of success code
} catch (err) {
  console.error("Update failed");
  console.error("Error object:", err);
  console.error("Error response data:", err.response?.data);
  console.error("Error status:", err.response?.status);
  
  // Show a more detailed error message
  alert(`Failed to update: ${err.response?.data?.message || err.message}`);
}

// Delete a help request
router.delete('/:id', async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);
    
    if (!request) {
      return res.status(404).json({ message: 'Help request not found' });
    }
    
    res.json({ message: 'Help request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;