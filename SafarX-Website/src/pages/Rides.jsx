import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Rides = () => {
  const allRides = [
    { id: 1, driver: 'Ahmed Ali', customer: 'Mohamed', pickup: 'Hodan', dropoff: 'KM4', fare: '$3.50', status: 'Completed' },
    { id: 2, driver: 'Fatima Yusuf', customer: 'Asha', pickup: 'Bakara', dropoff: 'Airport', fare: '$4.20', status: 'Pending' },
    { id: 3, driver: 'Layla Osman', customer: 'Abdullahi', pickup: 'KPP', dropoff: 'Peace Garden', fare: '$5.10', status: 'Cancelled' },
    { id: 4, driver: 'Ali Noor', customer: 'Zahra', pickup: 'Taleex', dropoff: 'KM4', fare: '$3.90', status: 'Completed' },
    { id: 5, driver: 'Amina Abdi', customer: 'Ismail', pickup: 'Hodan', dropoff: 'Bakara', fare: '$2.80', status: 'Pending' },
    { id: 6, driver: 'Khadija', customer: 'Hassan', pickup: 'KM5', dropoff: 'Pepsi', fare: '$3.70', status: 'Completed' },
  ];

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const ridesPerPage = 5;

  const filteredRides = allRides.filter(
    (ride) =>
      (statusFilter === 'All' || ride.status === statusFilter) &&
      (ride.driver.toLowerCase().includes(search.toLowerCase()) ||
        ride.customer.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredRides.length / ridesPerPage);
  const currentRides = filteredRides.slice(
    (currentPage - 1) * ridesPerPage,
    currentPage * ridesPerPage
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-900';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-200 dark:text-yellow-900';
      case 'Cancelled':
        return 'bg-red-100 text-red-700 dark:bg-red-200 dark:text-red-900';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Ride History</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search by driver or customer..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-white focus:outline-none"
            />
          </div>

          {/* Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-40 px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            {['All', 'Completed', 'Pending', 'Cancelled'].map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-4 text-left">Driver</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Pickup</th>
              <th className="p-4 text-left">Dropoff</th>
              <th className="p-4 text-left">Fare</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentRides.map((ride) => (
              <tr key={ride.id} className="border-t border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="p-4 whitespace-nowrap">{ride.driver}</td>
                <td className="p-4 whitespace-nowrap">{ride.customer}</td>
                <td className="p-4 whitespace-nowrap">{ride.pickup}</td>
                <td className="p-4 whitespace-nowrap">{ride.dropoff}</td>
                <td className="p-4 whitespace-nowrap">{ride.fare}</td>
                <td className="p-4 whitespace-nowrap">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(ride.status)}`}>
                    {ride.status}
                  </span>
                </td>
              </tr>
            ))}
            {currentRides.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No rides found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-4 gap-2 text-sm">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === i + 1
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Rides;
