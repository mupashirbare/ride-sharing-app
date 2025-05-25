import React from 'react';
import Navbar from '../components/Navbar';
import { FaPhoneAlt, FaEnvelope, FaQuestionCircle } from 'react-icons/fa';

const Support = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white pt-20">
      <Navbar />

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 py-12 shadow-sm text-center px-4">
        <h1 className="text-4xl font-bold text-green-600 mb-2">Support Center</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Need help? Browse our FAQs or reach out directly. We’re here for you 24/7.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* FAQs */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-6">
            <FaQuestionCircle className="text-green-500 text-xl" />
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-green-600">How do I become a driver?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sign up and fill out your profile. Upload your license and vehicle info to get approved.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-green-600">How are rides priced?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Fares are based on distance, time, and demand in your area (surge may apply).
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-green-600">How do I contact my rider or driver?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                During active rides, you can use the in-app call or message feature.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-6">
            <FaEnvelope className="text-green-500 text-xl" />
            <h2 className="text-2xl font-bold">Send Us a Message</h2>
          </div>
          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition font-semibold"
            >
              Submit Message
            </button>
          </form>
        </section>
      </main>

      {/* Contact Info */}
      <footer className="text-center mt-12 mb-6 text-sm text-gray-600 dark:text-gray-400 px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-green-600" />
            <a href="mailto:support@safarx.com" className="hover:underline text-green-600">support@safarx.com</a>
          </div>
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-green-600" />
            <span>+252 61 6 91 75 40</span>
          </div>
        </div>
        <p className="mt-4 text-xs opacity-70">&copy; {new Date().getFullYear()} SafarX. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Support;
