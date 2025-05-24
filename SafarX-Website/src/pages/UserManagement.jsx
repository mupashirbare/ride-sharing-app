import React from 'react';

const UserManagement = () => {
  const users = [
    { id: 1, name: 'Abdi Ali', email: 'abdi@safarx.com', role: 'Driver' },
    { id: 2, name: 'Nimo Hussein', email: 'nimo@safarx.com', role: 'Admin' },
    { id: 3, name: 'Layla Ahmed', email: 'layla@safarx.com', role: 'Passenger' },
  ];

  const getRoleStyle = (role) => {
    switch (role) {
      case 'Admin':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-200 dark:text-purple-900';
      case 'Driver':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-200 dark:text-blue-900';
      case 'Passenger':
        return 'bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-900';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Manage Users</h2>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="w-full text-sm min-w-[600px]">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="p-4 whitespace-nowrap">{user.name}</td>
                <td className="p-4 whitespace-nowrap">{user.email}</td>
                <td className="p-4 whitespace-nowrap">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getRoleStyle(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4 whitespace-nowrap flex gap-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700">Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
