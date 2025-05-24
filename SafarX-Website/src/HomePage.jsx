import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-white transition-all">
      {/* Navbar */}
      <header className="bg-white dark:bg-gray-800 shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-green-600">SafarX</h1>
          <nav className="space-x-6">
            <a href="#" className="hover:text-green-500">Home</a>
            <a href="#" className="hover:text-green-500">Services</a>
            <a href="#" className="hover:text-green-500">About</a>
            <a href="#" className="hover:text-green-500">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow bg-gradient-to-br from-green-100 to-green-300 dark:from-gray-800 dark:to-gray-700 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Smart Transport for Somalia</h2>
          <p className="text-lg mb-8">Experience safe, fast, and reliable rides with SafarX. Built for your city.</p>
          <a
            href="#"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 grid gap-12 md:grid-cols-3 text-center">
          <div>
            <div className="text-green-600 text-4xl mb-4">🚗</div>
            <h3 className="text-xl font-semibold mb-2">Fast Booking</h3>
            <p>Book rides in seconds with live location and smart routing.</p>
          </div>
          <div>
            <div className="text-green-600 text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
            <p>Your safety is our top priority. Verified drivers and support.</p>
          </div>
          <div>
            <div className="text-green-600 text-4xl mb-4">📍</div>
            <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
            <p>Track your ride live with GPS and in-app communication.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-8 mt-10 text-center text-sm">
        <p className="text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} SafarX. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
