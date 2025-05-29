import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    profileImage: null,
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match');
    }

    console.log('Form data ready:', form);
    
    // Navigate to DriverProfile page after successful validation
    navigate('/driver_profile');
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <Navbar />

      {/* Left Image */}
      <div className="md:w-1/2 hidden md:flex items-center justify-center p-4">
        <img
          src="/Gemini_Generated_Image_bgnjgvbgnjgvbgnj.jpeg"
          alt="Driver on road"
          className="w-full h-96 object-cover rounded-xl shadow-lg"
        />
      </div>

      {/* Right Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center px-4 py-10 bg-white dark:bg-gray-800">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">Create Your Account</h2>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <input name="name" type="text" placeholder="Full Name" onChange={handleChange} required className="w-full border px-3 py-2 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          <input name="phone" type="tel" placeholder="Phone Number" onChange={handleChange} required className="w-full border px-3 py-2 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          <input name="email" type="email" placeholder="Email Address" onChange={handleChange} className="w-full border px-3 py-2 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full border px-3 py-2 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required className="w-full border px-3 py-2 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          <input name="profileImage" type="file" accept="image/*" onChange={handleChange} className="w-full border px-3 py-2 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />

          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 font-semibold transition">
            Continue to Driver Profile →
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
            Already have an account? <a href="/login" className="text-green-600 hover:underline">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
