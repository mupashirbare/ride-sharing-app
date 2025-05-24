import React from 'react';
import { FaCheckCircle, FaClock, FaUserTie, FaCar, FaMoneyBill } from 'react-icons/fa';

const Notifications = () => {
  const mockNotifications = [
    {
      icon: <FaUserTie className="text-blue-500" />,
      message: 'New driver registration request from Abdi',
      time: '5 mins ago',
      type: 'driver'
    },
    {
      icon: <FaCar className="text-purple-500" />,
      message: 'Ride #A1234 completed successfully',
      time: '25 mins ago',
      type: 'ride'
    },
    {
      icon: <FaMoneyBill className="text-green-500" />,
      message: 'Payment received from Ahmed: $14.50',
      time: '1 hour ago',
      type: 'payment'
    },
    {
      icon: <FaClock className="text-yellow-500" />,
      message: 'Pending approval for vehicle license',
      time: '2 hours ago',
      type: 'approval'
    },
    {
      icon: <FaCheckCircle className="text-green-600" />,
      message: 'Driver Fatima’s documents verified',
      time: 'Yesterday',
      type: 'verification'
    }
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Notifications</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md divide-y divide-gray-200 dark:divide-gray-700">
        {mockNotifications.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <div className="text-xl">{item.icon}</div>
            <div>
              <p className="text-gray-800 dark:text-gray-100 text-sm">{item.message}</p>
              <span className="text-xs text-gray-500 dark:text-gray-400">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
