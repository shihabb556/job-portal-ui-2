// AdminRegister.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '@/utils/constant';

const AdminRegister = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(`${BASE_URL}/admin/register`, formData);

      setSuccess('Admin registered successfully');
      setFormData({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to register admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register Admin</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          {loading ? 'Registering...' : 'Register Admin'}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </form>
    </div>
  );
};

export default AdminRegister;
