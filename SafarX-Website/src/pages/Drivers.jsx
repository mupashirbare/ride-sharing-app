import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Drivers = () => {
  const allDrivers = [
    { id: 1, name: 'Ahmed Ali', phone: '+252612345678', vehicle: 'Toyota Corolla', status: 'Approved' },
    { id: 2, name: 'Fatima Yusuf', phone: '+252615678901', vehicle: 'Hyundai Accent', status: 'Pending' },
    { id: 3, name: 'Mohamed Abdi', phone: '+252611112223', vehicle: 'Nissan Sunny', status: 'Blocked' },
    { id: 4, name: 'Layla Osman', phone: '+252612223344', vehicle: 'Kia Rio', status: 'Approved' },
    { id: 5, name: 'Ali Noor', phone: '+252617890123', vehicle: 'Toyota Vitz', status: 'Pending' },
    { id: 6, name: 'Hodan Said', phone: '+252618456789', vehicle: 'Honda Fit', status: 'Approved' },
    { id: 7, name: 'Ismail Mohamed', phone: '+252615432100', vehicle: 'Mazda Demio', status: 'Blocked' },
  ];

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const driversPerPage = 5;

  const filteredDrivers = allDrivers.filter(driver =>
    (statusFilter === 'All' || driver.status === statusFilter) &&
    driver.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDrivers.length / driversPerPage);
  const currentDrivers = filteredDrivers.slice(
    (currentPage - 1) * driversPerPage,
    currentPage * driversPerPage
  );

  const statusOptions = ['All', 'Approved', 'Pending', 'Blocked'];

  return (
    <div className="p-6 w-full">
      {/* Header and Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Manage Drivers</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
            {statusOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Vehicle</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentDrivers.map(driver => (
              <tr key={driver.id} className="border-t border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="p-4 whitespace-nowrap">{driver.name}</td>
                <td className="p-4 whitespace-nowrap">{driver.phone}</td>
                <td className="p-4 whitespace-nowrap">{driver.vehicle}</td>
                <td className="p-4">
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    driver.status === 'Approved' ? 'bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-900'
                    : driver.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-200 dark:text-yellow-900'
                    : 'bg-red-100 text-red-700 dark:bg-red-200 dark:text-red-900'
                  }`}>
                    {driver.status}
                  </span>
                </td>
                <td className="p-4 space-x-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-xs">Approve</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs">Block</button>
                  <button className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-500 text-xs">Details</button>
                </td>
              </tr>
            ))}
            {currentDrivers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No drivers found.
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

export default Drivers;
