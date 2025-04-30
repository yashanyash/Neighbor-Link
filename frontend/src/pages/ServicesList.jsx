import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    category: '',
    description: '',
    price: ''
  });

  // Fetch all services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/services');
      setServices(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services');
    } finally {
      setLoading(false);
    }
  };
//Update new
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`http://localhost:5000/api/services/${id}`);
        setServices(services.filter(service => service._id !== id));
      } catch (err) {
        console.error('Error deleting service:', err);
        alert('Failed to delete service');
      }
    }
  };
//read
  const startEditing = (service) => {
    setEditingId(service._id);
    setEditForm({
      title: service.title || '',
      category: service.category || '',
      description: service.description || '',
      price: service.price || ''
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (id) => {
    try {
      console.log("Updating service with ID:", id);
      console.log("Update data:", editForm);
      
      const response = await axios.put(`http://localhost:5000/api/services/${id}`, editForm);
      
      setServices(services.map(service => 
        service._id === id ? { ...service, ...editForm } : service
      ));
      
      setEditingId(null);
      alert('Service updated successfully');
    } catch (err) {
      console.error('Error updating service:', err);
      console.error('Error response:', err.response?.data);
      alert('Failed to update service. ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <div className="text-center py-10">Loading services...</div>;
  
  if (error) return <div className="text-center text-red-600 py-10">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">Services Offered</h1>
        <Link to="/offer-service" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Offer a New Service
        </Link>
      </div>

      {services.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No services have been offered yet</p>
          <Link to="/offer-service" className="text-blue-600 underline mt-2 inline-block">Be the first to offer a service!</Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(service => (
            <div key={service._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {editingId === service._id ? (
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-3">Edit Service</h3>
                  
                  <div className="mb-3">
                    <label className="block text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={editForm.title}
                      onChange={handleEditChange}
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-gray-700 mb-1">Category</label>
                    <input
                      type="text"
                      name="category"
                      value={editForm.category}
                      onChange={handleEditChange}
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      className="w-full border rounded-md px-3 py-2"
                      rows="3"
                    ></textarea>
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-gray-700 mb-1">Price</label>
                    <input
                      type="text"
                      name="price"
                      value={editForm.price}
                      onChange={handleEditChange}
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleUpdate(service._id)} 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    >
                      Save Changes
                    </button>
                    <button 
                      onClick={cancelEditing}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-5">
                    <div className="flex justify-between">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {service.category}
                      </span>
                      <span className="font-bold text-green-600">
                        {service.price}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mt-2">{service.title}</h3>
                    <p className="text-gray-600 mt-2">{service.description}</p>
                    
                    <div className="mt-4 text-sm text-gray-500">
                      <p>Contact: {service.contactName}</p>
                      <p>Phone: {service.contactNumber}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-5 py-3 flex justify-end space-x-2">
                    <button 
                      onClick={() => startEditing(service)} 
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(service._id)} 
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesList;