import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import 'flag-icons/css/flag-icons.min.css';

const DriverLogin = () => {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handlePhoneLogin = (e) => {
    e.preventDefault();
    if (phone.trim().length >= 7) {
      navigate('/driver/otp', { state: { phone: `+252${phone}` } });
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-20 flex flex-col justify-center items-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md space-y-6">
          
          {/* SafarX Logo */}
          <div className="flex justify-center">
            <img
              src="/safarxlogo.jpg" // Make sure the image exists in your public folder
              alt="SafarX Logo"
              className="h-16 w-16 object-cover rounded-full shadow-md border border-green-600"
            />
          </div>

          <h2 className="text-3xl font-bold text-center text-green-600">Driver Registration</h2>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">Login with your Somali phone number</p>

          <form onSubmit={handlePhoneLogin} className="space-y-4">
            <div className="relative w-full">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <span className="fi fi-so rounded-sm w-5 h-4"></span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">+252</span>
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="6XXXXXXXX"
                maxLength={9}
                className="w-full pl-20 pr-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 tracking-wide"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition"
            >
              Continue
            </button>
          </form>

          <div className="text-center text-gray-400 dark:text-gray-500">OR</div>

          <div className="flex flex-col gap-3">
            <button className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md">
              <FaGoogle /> Continue with Google
            </button>
            <button className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
              <FaFacebookF /> Continue with Facebook
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DriverLogin;
