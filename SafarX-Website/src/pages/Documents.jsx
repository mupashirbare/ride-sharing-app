import React, { useState } from 'react';

const Documents = () => {
  const allDocuments = [
    { id: 1, name: 'Ahmed Ali', type: 'Driver License', status: 'Approved', fileUrl: 'https://example.com/license1.jpg' },
    { id: 2, name: 'Fatima Yusuf', type: 'ID Card', status: 'Pending', fileUrl: 'https://example.com/id2.jpg' },
    { id: 3, name: 'Layla Osman', type: 'Vehicle Registration', status: 'Pending', fileUrl: 'https://example.com/vehicle3.jpg' },
  ];

  const [statusFilter, setStatusFilter] = useState('All');
  const [previewDoc, setPreviewDoc] = useState(null);

  const filteredDocuments = allDocuments.filter(
    (doc) => statusFilter === 'All' || doc.status === statusFilter
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-900';
      case 'Pending':
      default:
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-200 dark:text-yellow-900';
    }
  };

  return (
    <div className="p-6 w-full relative">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Driver Documents</h2>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-48 px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          {['All', 'Approved', 'Pending'].map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="w-full text-sm min-w-[600px]">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-4 text-left">Driver</th>
              <th className="p-4 text-left">Document Type</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map((doc) => (
              <tr
                key={doc.id}
                className="border-t border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="p-4 whitespace-nowrap">{doc.name}</td>
                <td className="p-4 whitespace-nowrap">{doc.type}</td>
                <td className="p-4 whitespace-nowrap">
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyle(doc.status)}`}>
                    {doc.status}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700">
                    Approve
                  </button>
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white px-3 py-1 rounded text-xs hover:bg-gray-300 dark:hover:bg-gray-500"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {filteredDocuments.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No documents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Preview */}
      {previewDoc && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Document Preview</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              <strong>Driver:</strong> {previewDoc.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              <strong>Type:</strong> {previewDoc.type}
            </p>
            <div className="mb-4">
              <img
                src={previewDoc.fileUrl}
                alt={previewDoc.type}
                className="w-full h-64 object-cover rounded-md border dark:border-gray-700"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setPreviewDoc(null)}
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

export default Documents;
