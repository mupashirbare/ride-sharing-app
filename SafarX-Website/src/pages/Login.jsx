import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
  newErrors.email = 'Enter a valid email';
}


    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Logging in with:', form);
      // TODO: handle login API
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col items-center justify-center pt-20 px-4">
      <Navbar />

      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl">
        {/* Logo & Company Title */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/safarxlogo.jpg"
            alt="SafarX Logo"
            className="h-16 w-16 rounded-full object-cover shadow-md"
          />
          <h2 className="mt-3 text-2xl font-bold text-green-600">SafarX Driver Login</h2>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 dark:border-gray-600">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-white"
              />
            </div>
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 dark:border-gray-600">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-white"
              />
            </div>
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 font-semibold transition"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Don’t have an account? <a href="/register" className="text-green-600 hover:underline">Register now</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
