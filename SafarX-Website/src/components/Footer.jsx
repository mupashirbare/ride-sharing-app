import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-600 dark:bg-green-900 text-white pt-12 pb-6 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        
        {/* Company Info */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4">SafarX</h3>
          <p className="text-white text-opacity-90">Your trusted ride-sharing partner in Somalia.</p>
        </div>

        {/* Quick Links */}
        <div className="flex-1">
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline text-white hover:text-gray-200">Home</a></li>
            <li><a href="#" className="hover:underline text-white hover:text-gray-200">Support</a></li>
            <li><a href="#" className="hover:underline text-white hover:text-gray-200">About</a></li>
            <li><a href="#" className="hover:underline text-white hover:text-gray-200">Driver</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex-1">
          <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
          <p className="text-white text-opacity-90">Email: support@safarx.com</p>
          <p className="text-white text-opacity-90">Phone: +252 61 6 91 75 40</p>
          <p className="text-white text-opacity-90">Address: Mogadishu, Somalia</p>
        </div>
      </div>

      {/* Optional Map Image */}
      <div className="absolute top-0 right-4 mt-2 hidden md:block">
        <img
          src="/footermaps.png"
          alt="SafarX map view"
          className="w-40 rounded-lg shadow-md"
        />
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 text-center border-t border-white border-opacity-20 pt-4">
        <p className="text-sm text-white text-opacity-70">
          &copy; {new Date().getFullYear()} SafarX. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
