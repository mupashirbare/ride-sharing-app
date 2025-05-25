
import React from 'react';
import Services from '../components/Services';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  const features = [
    {
      icon: '/earnings-green.png',
      title: 'Flexible Earnings',
      text: 'Drive anytime. No shifts, no restrictions. Work on your terms.'
    },
    {
      icon: '/car-access-green.png',
      title: 'Car Access Support',
      text: 'Need a car? We’ll connect you with local partners to help you start earning.'
    },
    {
      icon: '/support-green.png',
      title: '24/7 Local Support',
      text: 'We’re here for you — in your language, with real human help.'
    }
  ];

  const testimonials = [
    {
      name: 'Ahmed Ibrahim Hefow.',
      text: 'SafarX has given me the freedom to earn while studying. I set my own schedule and earn more than I expected.',
      image: '/hefow.jpg'
    },
    {
      name: 'Shukri Muse.',
      text: 'The app is so easy to use and the support team actually helps. Driving with SafarX has been life-changing.',
      image: '/shukri.jpg'
    }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
    })
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <Navbar />

      <section className="w-full bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col-reverse md:flex-row items-center gap-12">
          <motion.div className="md:w-1/2 text-center md:text-left" initial="hidden" whileInView="visible" variants={fadeUp}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white leading-tight">
              Drive with <span className="text-green-600">Confidence.</span><br />
              Earn On Your Schedule.
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
              Join our trusted ride-sharing platform and become a verified driver today.
            </p>
            <div className="mt-6 flex justify-center md:justify-start gap-4">
              <Link to="/register" className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition">
                Register Now
              </Link>
              <button className="border border-green-600 text-green-600 px-6 py-3 rounded-md font-medium hover:bg-green-50 dark:hover:bg-gray-800 transition">
                Get Started
              </button>
            </div>
          </motion.div>
          <motion.div className="md:w-1/2 w-full" initial="hidden" whileInView="visible" variants={fadeUp}>
            <img src="/Carpool-amico.png" alt="SafarX Ride" className="w-full h-auto mt-10 rounded-2xl shadow-lg object-cover" loading="lazy" />
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-6">Why Drive with SafarX?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            SafarX gives you full control over your earnings and schedule with tools designed to support you. Our drivers enjoy unmatched freedom, reliable income, and professional support that makes driving easier and more rewarding.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-transform duration-300"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <img src={feature.icon} alt={feature.title} className="mx-auto w-14 h-14 mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     
       {/* Driver Requirements Section */}
        <section className="bg-gray-50 dark:bg-gray-900 py-20 px-4">
        <div className="max-w-7xl mx-auto">
            <motion.h2 
            className="text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-12"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            >
            Driver Requirements
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700 dark:text-gray-300">
            {/* Minimum Requirements */}
            <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center hover:shadow-xl transition"
                whileHover={{ scale: 1.05 }}
            >
                <img src="/car-green.png" alt="Car Icon" className="mx-auto w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Minimum Requirements</h3>
                <ul className="text-sm leading-relaxed space-y-1">
                <li> At least 20 years old</li>
                <li> Valid driver's license</li>
                <li> Own or access to 4-door car</li>
                </ul>
            </motion.div>

            {/* Required Documents */}
            <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center hover:shadow-xl transition"
                whileHover={{ scale: 1.05 }}
            >
                <img src="/documents-green.png" alt="Documents Icon" className="mx-auto w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Required Documents</h3>
                <ul className="text-sm leading-relaxed space-y-1">
                <li> Government-issued license</li>
                <li> Proof of residency</li>
                <li> Insurance proof</li>
                <li> Profile photo</li>
                </ul>
            </motion.div>

            {/* Screening */}
            <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center hover:shadow-xl transition"
                whileHover={{ scale: 1.05 }}
            >
                <img src="/check-green.png" alt="Check Icon" className="mx-auto w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Driver Screening</h3>
                <p className="text-sm leading-relaxed">
                Complete our online background check process. We’ll verify your driving record and identity to keep our riders safe.
                </p>
            </motion.div>
            </div>

            {/* Getting Started Steps */}
            <motion.h3 
            className="text-2xl font-semibold mt-16 mb-8 text-center text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            >
            It’s Easy to Get Started
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
                whileHover={{ scale: 1.05 }}
            >
                <img src="/user-green.png" alt="User Icon" className="mx-auto w-10 h-10 mb-3" />
                <h4 className="text-lg font-semibold mb-1">1. Sign Up</h4>
                <p className="text-sm">Create your SafarX account and provide your contact and vehicle info.</p>
            </motion.div>

            <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
                whileHover={{ scale: 1.05 }}
            >
                <img src="/upload-green.png" alt="Upload Icon" className="mx-auto w-10 h-10 mb-3" />
                <h4 className="text-lg font-semibold mb-1">2. Upload Documents</h4>
                <p className="text-sm">Upload necessary documents including ID, insurance, and license photos.</p>
            </motion.div>

            <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
                whileHover={{ scale: 1.05 }}
            >
                <img src="/steering-green.png" alt="Steering Icon" className="mx-auto w-10 h-10 mb-3" />
                <h4 className="text-lg font-semibold mb-1">3. Start Driving</h4>
                <p className="text-sm">Once approved, open the app and begin accepting trip requests!</p>
            </motion.div>
            </div>
        </div>
        </section>

     


      <Services />

      {/* // Testimonials Section – Real feedback from SafarX drivers */}
<section className="bg-white dark:bg-gray-900 py-20">
  <div className="max-w-7xl mx-auto px-4 text-center">
    {/* Section Heading */}
    <motion.h2
      className="text-4xl font-extrabold text-gray-800 dark:text-white mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      What Our Drivers Say
    </motion.h2>

    {/* Section Subtitle */}
    <motion.p
      className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      viewport={{ once: true }}
    >
      Hear directly from SafarX drivers who share how the platform empowers their journey.
      Real stories from real people.
    </motion.p>

    {/* Testimonials Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {testimonials.map((t, i) => (
        <motion.div
          key={i}
          className="relative bg-white/90 dark:bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 text-left hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Decorative Quote Icon */}
          <div className="absolute top-4 right-4 text-green-500 text-4xl opacity-10 pointer-events-none">
            “
          </div>

          {/* Avatar & Name */}
          <div className="flex items-center gap-4 mb-5">
            <img
              src={t.image}
              alt={t.name}
              className="w-16 h-16 rounded-full object-cover border-4 border-green-500 shadow-sm"
              loading="lazy"
            />
            <div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{t.name}</h4>
              <p className="text-xs text-gray-400 dark:text-gray-500">Verified SafarX Driver</p>
            </div>
          </div>

          {/* Testimonial Text */}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
            “{t.text}”
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>



      <Footer />
    </div>
  );
};

export default Home;
