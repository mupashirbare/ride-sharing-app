// Profile.jsx
import React from 'react';
import { FaUserCircle, FaEnvelope, FaPhone, FaLock, FaSignOutAlt } from 'react-icons/fa';

const Profile = () => {
  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-4 mb-6">
        <FaUserCircle className="text-green-600 text-5xl" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
          <p className="text-sm text-gray-500">Manage your account settings</p>
        </div>
      </div>
      <form className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
            <FaUserCircle /> Full Name
          </label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
            <FaEnvelope /> Email Address
          </label>
          <input
            type="email"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
            <FaPhone /> Phone Number
          </label>
          <input
            type="tel"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="+252612345678"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
            <FaLock /> Change Password
          </label>
          <input
            type="password"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="••••••••"
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
          <button
            type="submit"
            className="bg-green-600 text-white w-full sm:w-auto px-6 py-2 rounded-md hover:bg-green-700 transition"
          >
            Update Profile
          </button>
          <button
            type="button"
            className="bg-red-500 text-white w-full sm:w-auto px-6 py-2 rounded-md hover:bg-red-600 transition flex items-center justify-center gap-2"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
