import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OfferService = () => {
  const navigate = useNavigate();
  

    /*gasw*/
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    availability: '',
    rate: '',
    experience: '',
    contactNumber: '',
    email: '',
    location: ''
  });

  const [errors, setErrors] = useState({});
  const [services, setServices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', message: '' });

  // Categories for dropdown
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

  const validateForm = () => {
    const newErrors = {};
    
    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Service title is required';
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
    
    // Availability validation
    if (!formData.availability.trim()) {
      newErrors.availability = 'Availability information is required';
    }
    
    // Rate validation
    if (!formData.rate.trim()) {
      newErrors.rate = 'Rate information is required';
    } else if (isNaN(formData.rate) && formData.rate.toLowerCase() !== 'free') {
      newErrors.rate = 'Rate must be a number or "free"';
    }
    
    // Contact number validation
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
    
    // Location validation
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing in a field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

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
      console.log('Attempting to submit data to API...');
      console.log('Form data being sent:', formData);
      
      const response = await axios.post('http://localhost:5000/api/services', formData);
      console.log('Success response:', response.data);
      
      setSubmitMessage({ 
        type: 'success', 
        message: 'Service offered successfully!' 
      });
      
      // Reset form after successful submission
      setFormData({
        title: '',
        category: '',
        description: '',
        availability: '',
        rate: '',
        experience: '',
        contactNumber: '',
        email: '',
        location: ''
      });
      
      // Redirect to services list after 1.5 seconds
      setTimeout(() => {
        navigate('/services');
      }, 1500);
      
    } catch (error) {
      console.error('Error details:', error);
      setSubmitMessage({ 
        type: 'error', 
        message: `Failed to submit service: ${error.message}` 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-2 text-blue-800">Offer Your Services</h1>
        <p className="text-gray-600 mb-8">Share your skills with neighbors who need help</p>

        {submitMessage.message && (
          <div className={`mb-6 p-4 rounded-md ${
            submitMessage.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 
            'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {submitMessage.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
              Service Title *
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
              placeholder="E.g., Professional Gardening Services"
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
              placeholder="Describe the services you offer in detail..."
            ></textarea>
            {errors.description && <p className="mt-1 text-red-600 text-sm">{errors.description}</p>}
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Availability */}
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="availability">
                Availability *
              </label>
              <input
                type="text"
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                  errors.availability ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="E.g., Weekends, Evenings after 6 PM"
              />
              {errors.availability && <p className="mt-1 text-red-600 text-sm">{errors.availability}</p>}
            </div>

            {/* Rate */}
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="rate">
                Rate ($ per hour or "Free") *
              </label>
              <input
                type="text"
                id="rate"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                  errors.rate ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="E.g., 15, Free, Negotiable"
              />
              {errors.rate && <p className="mt-1 text-red-600 text-sm">{errors.rate}</p>}
            </div>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="experience">
              Experience (Optional)
            </label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              rows="2"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Any relevant experience or qualifications you have..."
            ></textarea>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone Number */}
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
              placeholder="E.g., Downtown, North Side"
            />
            {errors.location && <p className="mt-1 text-red-600 text-sm">{errors.location}</p>}
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
              {isSubmitting ? 'Submitting...' : 'Offer Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfferService;