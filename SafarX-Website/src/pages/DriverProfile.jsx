import React from 'react';
import Navbar from '../components/Navbar';

const DriverProfile = () => {
  return (
    <div className="min-h-screen pt-20 flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <Navbar />

      {/* Left Image */}
      <div className="md:w-1/2 hidden md:flex items-center justify-center p-4">
        <img
          src="/Gemini_Generated_Image_bgnjgvbgnjgvbgnj.jpeg"
          alt="Driver in car"
          className="w-full h-96 object-cover rounded-xl shadow-lg"
        />
      </div>

      {/* Right Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center px-4 py-10 bg-white dark:bg-gray-800">
        <form className="w-full max-w-md space-y-5">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-green-600">Complete Your Driver Profile</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Tell us about your vehicle and upload your license to finish.
            </p>
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Vehicle Type</label>
            <input
              type="text"
              placeholder="e.g. Sedan"
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Vehicle Model */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Vehicle Model</label>
            <input
              type="text"
              placeholder="e.g. Toyota Corolla"
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Plate Number */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">License Plate Number</label>
            <input
              type="text"
              placeholder="e.g. AB123CD"
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* License Upload */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Upload Driving License</label>
            <input
              type="file"
              accept="application/pdf,image/*"
              className="w-full px-4 py-2 border rounded-md file:text-sm file:mr-4 file:bg-green-600 file:text-white file:py-2 file:px-4 file:rounded-md file:border-0 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition"
          >
            Submit Driver Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default DriverProfile;
