import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const team = [
  {
    name: 'Mr.Mupashir Bashiir',
    role: 'CEO & Co-Founder',
    image: '/17.jpg',
  },
  {
    name: 'Mrs. Jawahir Muse',
    role: 'CTO & Product Lead',
    image: '/shukri.jpg',
  },
  {
    name: 'Mr.Ahmed Hefow',
    role: 'Operations Manager',
    image: '/hefow.jpg',
  },
  {
    name: 'Mrs. Shukri Sharif',
    role: 'Marketing & Communications',
    image: '/shukri.jpg',
  },
];

const timeline = [
  {
    year: '2023',
    event: 'SafarX concept born to solve urban transport challenges.',
  },
  {
    year: '2024',
    event: 'Launched in Mogadishu with first 100 registered drivers.',
  },
  {
    year: '2025',
    event: 'Expanded to 5+ cities with 10,000+ rides completed.',
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="px-4 py-16 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 className="text-4xl md:text-5xl font-extrabold text-green-600 mb-4" initial="hidden" whileInView="visible" variants={fadeIn}>
            About SafarX
          </motion.h1>
          <motion.p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto" initial="hidden" whileInView="visible" variants={fadeIn}>
            SafarX is a local mobility platform revolutionizing transportation across Somalia. We empower both passengers and drivers through technology and community-driven service.
          </motion.p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" whileInView="visible" variants={fadeIn}>
            <img
              src="/Carpool-amico.png"
              alt="SafarX on the road"
              className="rounded-2xl shadow-lg object-cover w-full h-80 md:h-96"
              loading="lazy"
            />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" variants={fadeIn}>
            <h2 className="text-3xl font-bold mb-4 text-green-600">Our Vision</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We envision a Somalia where mobility is efficient, safe, and powered by local drivers. Every ride supports local livelihoods and contributes to our growing ecosystem.
            </p>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>🚗 Empower independent drivers across cities</li>
              <li>📱 Create tech-first, customer-centric mobility solutions</li>
              <li>🌍 Build a national transport infrastructure through innovation</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-green-50 dark:bg-green-900 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-8" initial="hidden" whileInView="visible" variants={fadeIn}>
            SafarX by the Numbers
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-green-800 dark:text-white">
            {['10,000+', '1,500+', '5+ Cities'].map((stat, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" variants={fadeIn}>
                <h3 className="text-4xl font-extrabold">{stat}</h3>
                <p className="mt-2 text-sm">
                  {i === 0 ? 'Rides Completed' : i === 1 ? 'Active Drivers' : 'Expanded Across Somalia'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow text-center transform hover:scale-105 transition duration-300"
                custom={index}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover mb-4 shadow-md"
                  loading="lazy"
                />
                <h4 className="font-semibold text-lg">{member.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-white dark:bg-gray-800 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-8">Our Journey</h2>
          <ol className="border-l border-green-600 dark:border-green-400 space-y-6 pl-6">
            {timeline.map((item, index) => (
              <motion.li key={index} custom={index} initial="hidden" whileInView="visible" variants={fadeIn}>
                <div className="mb-1 text-sm text-green-600 font-semibold">{item.year}</div>
                <p className="text-gray-600 dark:text-gray-400">{item.event}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <motion.h2 className="text-3xl font-bold text-green-600 mb-4" initial="hidden" whileInView="visible" variants={fadeIn}>
          Be Part of the Change
        </motion.h2>
        <motion.p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto" initial="hidden" whileInView="visible" variants={fadeIn}>
          Whether you're a rider or driver, SafarX is designed to move Somalia forward — one ride at a time.
        </motion.p>
        <motion.a
          href="/register"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition"
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
        >
          Join SafarX →
        </motion.a>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-600 dark:text-gray-400 mb-8 px-4">
        &copy; {new Date().getFullYear()} SafarX. Made with purpose in Somalia 🇸🇴
      </footer>
    </div>
  );
};

export default About;
