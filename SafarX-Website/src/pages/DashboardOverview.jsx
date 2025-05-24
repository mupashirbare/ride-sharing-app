import React from 'react';
import { FaUserTie, FaCar, FaMoneyBill, FaChartLine, FaChartBar, FaChartPie } from 'react-icons/fa';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts';

const COLORS = ['#16A34A', '#FBBF24', '#60A5FA', '#F87171'];

const rideData = [
  { name: 'Jan', rides: 300 },
  { name: 'Feb', rides: 500 },
  { name: 'Mar', rides: 800 },
  { name: 'Apr', rides: 600 },
  { name: 'May', rides: 1000 },
];

const driverDistribution = [
  { name: 'Approved', value: 120 },
  { name: 'Pending', value: 40 },
  { name: 'Blocked', value: 20 },
];

const DashboardCard = ({ icon: Icon, title, value }) => (
  <div className="bg-white shadow rounded-lg p-6 flex items-center gap-4 border-l-4 border-green-600">
    <Icon className="text-green-600 text-2xl" />
    <div>
      <h3 className="text-sm text-gray-600">{title}</h3>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const DashboardTable = () => (
  <div className="mt-8">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest Rides</h2>
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100 text-gray-700 text-sm">
          <tr>
            <th className="p-4">Driver</th>
            <th className="p-4">Customer</th>
            <th className="p-4">Location</th>
            <th className="p-4">Fare</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-600">
          <tr className="border-t">
            <td className="p-4">Ahmed</td>
            <td className="p-4">Fatima</td>
            <td className="p-4">Hodan, Mogadishu</td>
            <td className="p-4">$3.50</td>
            <td className="p-4 text-green-600">Completed</td>
          </tr>
          <tr className="border-t">
            <td className="p-4">Ali</td>
            <td className="p-4">Yasmin</td>
            <td className="p-4">KM4, Mogadishu</td>
            <td className="p-4">$4.00</td>
            <td className="p-4 text-yellow-500">Pending</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const DashboardOverview = () => {
  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard icon={FaUserTie} title="Total Drivers" value="128" />
        <DashboardCard icon={FaCar} title="Total Rides" value="980" />
        <DashboardCard icon={FaMoneyBill} title="Revenue" value="$2,340" />
        <DashboardCard icon={FaChartLine} title="Active Today" value="27" />
      </div>

      {/* Latest Rides Table */}
      <DashboardTable />

      {/* Analytics Section */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <FaChartBar /> Monthly Rides
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={rideData}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="rides" fill="#16A34A" barSize={40} radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <FaChartPie /> Driver Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={driverDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {driverDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
