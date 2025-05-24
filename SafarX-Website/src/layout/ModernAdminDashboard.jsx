import React, { useState, useEffect, useRef } from 'react';
import {
  FaUserTie, FaCar, FaUsers, FaClipboard, FaMoneyBill, FaHome,
  FaMoon, FaSun, FaBell, FaUserCircle, FaBars, FaTimes
} from 'react-icons/fa';
import { HiOutlineSearch } from 'react-icons/hi';
import { Link, Outlet, useLocation } from 'react-router-dom';

const SidebarLink = ({ icon: Icon, label, to, active, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors text-sm font-medium hover:bg-green-600 hover:text-white ${
      active ? 'bg-green-600 text-white' : 'text-gray-600 dark:text-gray-300'
    }`}
  >
    <Icon className="text-lg" />
    <span>{label}</span>
  </Link>
);

const ModernAdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Auto close sidebar for small screen on nav
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  // Auto close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`bg-white dark:bg-gray-800 w-64 min-w-[16rem] shrink-0 h-full p-6 shadow-md transition-transform duration-300 z-40 ${
          sidebarOpen ? 'block' : 'hidden md:block'
        }`}
      >
        <div className="text-2xl font-bold text-green-600 mb-6">SafarX Admin</div>
        <nav className="space-y-2">
          <SidebarLink icon={FaHome} label="Dashboard" to="/admin" active={location.pathname === '/admin'} onClick={handleLinkClick} />
          <SidebarLink icon={FaUserTie} label="Drivers" to="/admin/drivers" active={location.pathname === '/admin/drivers'} onClick={handleLinkClick} />
          <SidebarLink icon={FaCar} label="Rides" to="/admin/rides" active={location.pathname === '/admin/rides'} onClick={handleLinkClick} />
          <SidebarLink icon={FaUsers} label="Users" to="/admin/users" active={location.pathname === '/admin/users'} onClick={handleLinkClick} />
          <SidebarLink icon={FaClipboard} label="Reports" to="/admin/reports" active={location.pathname === '/admin/reports'} onClick={handleLinkClick} />
          <SidebarLink icon={FaMoneyBill} label="Documents" to="/admin/documents" active={location.pathname === '/admin/documents'} onClick={handleLinkClick} />
        </nav>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
          {/* Left: Menu & Search */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-2xl text-gray-600 dark:text-gray-300"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <div className="relative w-64 max-w-full">
              <HiOutlineSearch className="absolute left-3 top-2.5 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-3 flex-wrap justify-end max-w-full">
            <button onClick={() => setDarkMode(!darkMode)} className="text-xl">
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
            </button>
            <Link to="/admin/notifications">
            <FaBell className="text-xl text-gray-600 dark:text-gray-300 cursor-pointer hover:text-green-600 transition" />
            </Link>

            <div className="relative" ref={profileRef}>
              <button onClick={() => setProfileOpen(!profileOpen)}>
                <FaUserCircle className="text-xl text-gray-600 dark:text-gray-300 cursor-pointer hover:text-green-600 transition" />
              </button>
             {profileOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-xl z-50 py-2">
                    <Link
                    to="/admin/profile"
                    className="block px-5 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                    Profile
                    </Link>
                    <a
                    href="#"
                    className="block px-5 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                    Settings
                    </a>
                    <a
                    href="#"
                    className="block px-5 py-3 text-sm font-medium text-red-600 hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-900 dark:hover:text-red-300"
                    >
                    Logout
                    </a>
                </div>
                )}

            </div>
          </div>
        </header>

        {/* Main Section */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ModernAdminDashboard;
