import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    category: '',
    description: '',
    urgency: '',
    location: ''
  });

  // Fetch all requests on component mount
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/requests');
      setRequests(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching requests:', err);
      setError('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      try {
        await axios.delete(`http://localhost:5000/api/requests/${id}`);
        setRequests(requests.filter(request => request._id !== id));
      } catch (err) {
        console.error('Error deleting request:', err);
        alert('Failed to delete request');
      }
    }
  };

  const startEditing = (request) => {
    setEditingId(request._id);
    setEditForm({
      title: request.title || '',
      category: request.category || '',
      description: request.description || '',
      urgency: request.urgency || 'normal',
      location: request.location || ''
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
      console.log("Updating request with ID:", id);
      console.log("Update data:", editForm);
      
      const response = await axios.put(`http://localhost:5000/api/requests/${id}`, editForm);
      
      setRequests(requests.map(request => 
        request._id === id ? { ...request, ...editForm } : request
      ));
      
      setEditingId(null);
      alert('Request updated successfully');
    } catch (err) {
      console.error('Error updating request:', err);
      console.error('Error response:', err.response?.data);
      alert('Failed to update request. ' + (err.response?.data?.message || err.message));
    }
  };

  // Helper function to get urgency badge color
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  // Helper function to get urgency label
  const getUrgencyLabel = (urgency) => {
    switch (urgency) {
      case 'low': return 'Low';
      case 'normal': return 'Normal';
      case 'high': return 'High';
      case 'urgent': return 'Urgent';
      default: return 'Normal';
    }
  };

  if (loading) return <div className="text-center py-10">Loading requests...</div>;
  
  if (error) return <div className="text-center text-red-600 py-10">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">Help Requests</h1>
        <Link to="/request-help" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Submit New Request
        </Link>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No help requests have been submitted yet</p>
          <Link to="/request-help" className="text-blue-600 underline mt-2 inline-block">Submit the first help request!</Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {requests.map(request => (
            <div key={request._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {editingId === request._id ? (
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-3">Edit Request</h3>
                  
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
                    <label className="block text-gray-700 mb-1">Urgency</label>
                    <select
                      name="urgency"
                      value={editForm.urgency}
                      onChange={handleEditChange}
                      className="w-full border rounded-md px-3 py-2"
                    >
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={editForm.location}
                      onChange={handleEditChange}
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleUpdate(request._id)} 
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
                        {request.category}
                      </span>
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getUrgencyColor(request.urgency)}`}>
                        {getUrgencyLabel(request.urgency)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mt-2">{request.title}</h3>
                    <p className="text-gray-600 mt-2">{request.description}</p>
                    
                    <div className="mt-4 flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-600">{request.location}</span>
                    </div>
                    
                    <div className="mt-2 text-sm text-gray-500">
                      <p>Contact: {request.contactName}</p>
                      <p>Phone: {request.contactNumber}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-5 py-3 flex justify-end space-x-2">
                    <button 
                      onClick={() => startEditing(request)} 
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(request._id)} 
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

export default RequestsList;