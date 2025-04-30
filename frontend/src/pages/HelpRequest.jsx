import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HelpRequest = () => {
  const navigate = useNavigate();
  
  // State for form 
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    urgency: 'normal',
    preferredDate: '',
    preferredTime: '',
    location: '',
    budget: '',
    contactName: '',
    contactNumber: '',
    email: '',
    additionalInfo: ''
  });

  // State for form validation errors
  const [errors, setErrors] = useState({});
  
  // State for form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', message: '' });
  const [requests, setRequests] = useState([]);

  // Categories for the dropdown
  const categories = [
    'Household Help',
    'Gardening',
    'Babysitting',
    'Pet Care',
    'Tutoring',
    'Tech Support',
    'Errands',
    'Transportation',
    'Cooking',
    'Other'
  ];

  // Urgency levels
  const urgencyLevels = [
    { value: 'low', label: 'Low - Flexible Timeline' },
    { value: 'normal', label: 'Normal - Within a Week' },
    { value: 'high', label: 'High - Within 48 Hours' },
    { value: 'urgent', label: 'Urgent - As Soon As Possible' }
  ];

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when user starts typing in a field
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  // Form validation function
  const validateForm = () => {
    const newErrors = {};
    
    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Request title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters long';
    }
    
    // Category validation
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description should be at least 20 characters';
    }
    
    // Location validation
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    // Contact Name validation
    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Contact name is required';
    }
    
    // Contact Number validation
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contactNumber.replace(/\s/g, ''))) {
      newErrors.contactNumber = 'Please enter a valid 10-digit phone number';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Preferred Date validation (if provided)
    if (formData.preferredDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(formData.preferredDate);
      
      if (selectedDate < today) {
        newErrors.preferredDate = 'Date cannot be in the past';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitMessage({ 
        type: 'error', 
        message: 'Please fix the errors in the form before submitting' 
      });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage({ type: '', message: '' });
    
    try {
      console.log('Attempting to submit help request...');
      console.log('Form data being sent:', formData);
      
      // Make sure this matches exactly what's in your backend index.js
      const response = await axios.post('http://localhost:5000/api/requests', formData);
      
      console.log('Success response:', response.data);
      
      setSubmitMessage({ 
        type: 'success', 
        message: 'Help request submitted successfully!' 
      });
      
      // Reset form after successful submission
      setFormData({
        title: '',
        category: '',
        description: '',
        urgency: 'normal',
        preferredDate: '',
        preferredTime: '',
        location: '',
        budget: '',
        contactName: '',
        contactNumber: '',
        email: '',
        additionalInfo: ''
      });
      
      // Redirect to requests list after 1.5 seconds
      setTimeout(() => {
        navigate('/requests');
      }, 1500);
      
    } catch (error) {
      console.error('Error submitting the form', error);
      console.error('Error response:', error.response); // Add this for more details
      setSubmitMessage({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to submit help request. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-2 text-blue-800">Request Help</h1>
        <p className="text-gray-600 mb-8">Let your neighbors know what you need assistance with</p>

        {submitMessage.message && (
          <div className={`mb-6 p-4 rounded-md ${
            submitMessage.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 
            'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {submitMessage.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Request Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
              Help Request Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="E.g., Need Help Moving Heavy Furniture"
            />
            {errors.title && <p className="mt-1 text-red-600 text-sm">{errors.title}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="category">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-red-600 text-sm">{errors.category}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Describe what you need help with in detail..."
            ></textarea>
            {errors.description && <p className="mt-1 text-red-600 text-sm">{errors.description}</p>}
          </div>

          {/* Urgency Level */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Urgency Level
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {urgencyLevels.map((level) => (
                <div key={level.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`urgency-${level.value}`}
                    name="urgency"
                    value={level.value}
                    checked={formData.urgency === level.value}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`urgency-${level.value}`} className="ml-2 text-sm text-gray-700">
                    {level.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Two column layout for date and time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Preferred Date */}
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="preferredDate">
                Preferred Date
              </label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                  errors.preferredDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.preferredDate && <p className="mt-1 text-red-600 text-sm">{errors.preferredDate}</p>}
            </div>

            {/* Preferred Time */}
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="preferredTime">
                Preferred Time
              </label>
              <input
                type="time"
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>
          </div>

          {/* Two column layout for location and budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="location">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="E.g., 123 Main St, Downtown"
              />
              {errors.location && <p className="mt-1 text-red-600 text-sm">{errors.location}</p>}
            </div>

            {/* Budget */}
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="budget">
                Budget (Optional)
              </label>
              <input
                type="text"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder="E.g., $20, Free, Negotiable"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Contact Information</h3>
            
            {/* Contact Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="contactName">
                Contact Name *
              </label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                  errors.contactName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your name"
              />
              {errors.contactName && <p className="mt-1 text-red-600 text-sm">{errors.contactName}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Number */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="contactNumber">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                    errors.contactNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="E.g., 0123456789"
                />
                {errors.contactNumber && <p className="mt-1 text-red-600 text-sm">{errors.contactNumber}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="E.g., your@email.com"
                />
                {errors.email && <p className="mt-1 text-red-600 text-sm">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="additionalInfo">
              Additional Information (Optional)
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Any other details you'd like to share..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Help Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HelpRequest;