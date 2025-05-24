import React, { useState } from 'react';

const Reports = () => {
  const allReports = [
    { id: 1, user: 'Mohamed Ali', issue: 'Driver was late', type: 'Complaint', status: 'Open', description: 'The driver arrived 15 minutes late.' },
    { id: 2, user: 'Fatima Noor', issue: 'App crashed during payment', type: 'Bug', status: 'Resolved', description: 'The app crashed when attempting to pay with Visa.' },
    { id: 3, user: 'Layla Ahmed', issue: 'Driver took longer route', type: 'Complaint', status: 'Open', description: 'Trip route was extended unnecessarily.' },
    { id: 4, user: 'Ali Jama', issue: 'App froze at booking', type: 'Bug', status: 'Open', description: 'App stuck on loading screen.' },
    { id: 5, user: 'Nasra Osman', issue: 'Driver rude', type: 'Complaint', status: 'Resolved', description: 'Driver was impolite to the customer.' },
    { id: 6, user: 'Khadija Noor', issue: 'Payment failed', type: 'Bug', status: 'Open', description: 'Couldn’t complete payment.' }
  ];

  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedReport, setSelectedReport] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5;

  const filteredReports = allReports.filter(
    (item) => typeFilter === 'All' || item.type === typeFilter
  );

  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * reportsPerPage,
    currentPage * reportsPerPage
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-900';
      case 'Open':
      default:
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-200 dark:text-yellow-900';
    }
  };

  return (
    <div className="p-6 w-full relative">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">User Reports & Feedback</h2>
        <select
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-48 px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          {['All', 'Complaint', 'Bug'].map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Issue</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedReports.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="p-4">{item.user}</td>
                <td className="p-4">{item.issue}</td>
                <td className="p-4">{item.type}</td>
                <td className="p-4">
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyle(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700">Resolve</button>
                  <button
                    onClick={() => setSelectedReport(item)}
                    className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 px-3 py-1 rounded text-xs hover:bg-gray-300 dark:hover:bg-gray-500"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {paginatedReports.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No reports found.
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

      {/* Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Report Details</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              <strong>User:</strong> {selectedReport.user}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              <strong>Issue:</strong> {selectedReport.issue}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              <strong>Type:</strong> {selectedReport.type}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              <strong>Description:</strong> {selectedReport.description}
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 text-sm rounded bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
