import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // ✅ REQUIRED for Link to work
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const features = [
  {
    icon: '/earnings-green.png',
    title: 'Flexible Earnings',
    desc: 'Drive whenever it suits you. No fixed schedules or bosses.',
  },
  {
    icon: '/support-green.png',
    title: '24/7 Local Support',
    desc: 'We provide assistance in your language around the clock.',
  },
  {
    icon: '/car-access-green.png',
    title: 'Vehicle Access',
    desc: 'No car? No problem. Get matched with vehicle partners.',
  },
];

const DriverInfo = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* Navbar */}
      <Navbar />

      {/* ✅ Hero Section */}
      <section className="w-full py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-10">
          {/* Text Content */}
          <motion.div
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white leading-tight">
              Become a <span className="text-green-600">SafarX Driver</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Join our trusted platform and unlock freedom, flexibility, and earnings—all on your terms.
            </p>
            <button className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition">
              Register Now
            </button>
          </motion.div>

          {/* Image */}
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <img
              src="/hero.jpeg"
              alt="SafarX driver"
              className="w-full rounded-xl shadow-lg"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* ✅ Features Section */}
      <section className="bg-white dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-8 text-gray-800 dark:text-white">Why Drive with Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition transform hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <img src={feature.icon} alt={feature.title} className="w-12 h-12 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{feature.title}</h4>
                <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Call to Action */}
      <section className="bg-green-600 py-16 text-center text-white">
        <motion.h3
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Ready to Start Earning?
        </motion.h3>
        <motion.p
          className="mb-6 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Sign up today and become a SafarX driver to enjoy freedom, income, and support like never before.
        </motion.p>
        <Link
          to="/register"
          className="inline-block bg-white text-green-600 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition"
        >
          Join Now →
        </Link>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DriverInfo;
