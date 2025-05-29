import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Apply dark mode
  useEffect(() => {
    const root = document.documentElement;
    darkMode ? root.classList.add('dark') : root.classList.remove('dark');
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-sm fixed w-full z-50 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left - Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/safarxlogo.jpg"
              alt="SafarX Logo"
              className="h-10 w-10 object-cover rounded-2xl"
            />
            <span className="text-xl font-bold tracking-wide">SafarX</span>
          </Link>

          {/* Center - Navigation */}
          <div className="hidden md:flex flex-1 justify-center space-x-6">
            <Link to="/" className="hover:text-green-600 dark:hover:text-green-400 transition">Home</Link>
            <Link to="/support" className="hover:text-green-600 dark:hover:text-green-400 transition">Support</Link>
            <Link to="/about" className="hover:text-green-600 dark:hover:text-green-400 transition">About</Link>
            <Link to="/driver-info" className="hover:text-green-600 dark:hover:text-green-400 transition">Driver</Link>
          </div>

          {/* Right - Auth + Dark Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="hover:text-green-600 dark:hover:text-green-400 transition">Login</Link>
            <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">Sign up</Link>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-xl focus:outline-none"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-2xl" aria-label="Toggle Menu">
              {isOpen ? <HiOutlineX /> : <HiOutlineMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden bg-white dark:bg-gray-900 ${isOpen ? 'max-h-screen py-4 px-4' : 'max-h-0'}`}>
        <Link to="/" className="block py-2 hover:text-green-600 dark:hover:text-green-400">Home</Link>
        <Link to="/support" className="block py-2 hover:text-green-600 dark:hover:text-green-400">Support</Link>
        <Link to="/about" className="block py-2 hover:text-green-600 dark:hover:text-green-400">About</Link>
        <Link to="/driver-info" className="block py-2 hover:text-green-600 dark:hover:text-green-400">Driver</Link>
        <hr className="my-2 border-gray-300 dark:border-gray-700" />
        <Link to="/login" className="block py-2 hover:text-green-600 dark:hover:text-green-400">Login</Link>
        <Link to="/register" className="block text-center text-white bg-green-600 px-4 py-2 rounded-md mt-2 hover:bg-green-700">
          Sign up
        </Link>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mt-4 flex justify-center w-full text-xl"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
