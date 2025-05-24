// This will be the main Admin Dashboard layout with routing
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DriverProfile from './pages/DriverProfile';
import Support from './pages/Support';
import About from './pages/About';
import DashboardOverview from './pages/DashboardOverview';
import Drivers from './pages/Drivers';
import Rides from './pages/Rides';
import Reports from './pages/Reports';
import UserManagement from './pages/UserManagement';
import Documents from './pages/Documents';
import Profile from './pages/Profile';
import DriverLogin from './pages/DriverLogin';
import OTTPModal from './pages/OTTPModal';
import 'flag-icons/css/flag-icons.min.css';
import ModernAdminDashboard from './layout/ModernAdminDashboard';
import Notifications from './components/Notifications';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<DriverLogin />} />
        <Route path="/driver_profile" element={<DriverProfile />} />
       <Route path="/driver/otp" element={<OTTPModal />} />
        <Route path="/driver/Register" element={<Register/>} />



        <Route path="/support" element={<Support />} />
        <Route path="/about" element={<About />} />

        <Route path="/admin" element={<ModernAdminDashboard/>}>
          <Route index element={<DashboardOverview />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="rides" element={<Rides />} />
          <Route path="reports" element={<Reports />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="documents" element={<Documents />} />
          <Route path="profile" element={<Profile />} />
         <Route path="notifications" element={<Notifications/>} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
