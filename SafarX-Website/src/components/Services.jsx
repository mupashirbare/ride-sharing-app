import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Services = () => {
  const services = [
    {
      title: 'City Rides',
      description: 'Affordable everyday rides across your city.',
      image: '/service1.png'
    },
    {
      title: 'Intercity Travel',
      description: 'Go long distance in comfort with trusted drivers.',
      image: '/service2.png'
    },
    {
      title: 'Package Delivery',
      description: 'Send items quickly and reliably around town.',
      image: '/service3.png'
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
    })
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-extrabold text-gray-800 dark:text-white mb-12"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
        >
          Our Services
        </motion.h2>
        <Slider {...settings}>
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="px-4"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-65 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                  <button className="bg-green-600 text-white px-5 py-2 rounded-md font-medium hover:bg-green-700 transition">
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Services;
