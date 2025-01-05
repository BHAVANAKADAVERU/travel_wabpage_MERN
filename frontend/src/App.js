import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import './App.css';
import { FaBars } from 'react-icons/fa';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer/Footer';
import UsersList from './pages/Admin/UsersList';
import UserBookedTours from './components/BookedTours';
import ToursList from './pages/Admin/ToursList';
import Reviews from './pages/Admin/Reviews';
import BookedTours from './components/BookedTours';
import TourGuidesManagement from './pages/Admin/TourGuideManagement';
import Profile from './components/profile';
import Tours from './pages/Tours';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="hamburger-icon" onClick={toggleSidebar}>
        <FaBars size={30} />
      </div>
      <Sidebar isOpen={isSidebarOpen} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/booked-tours" element={<UserBookedTours />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/tours" element={<ToursList />} />
          <Route path="/admin/reviews" element={<Reviews />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/admin/booked-tours" element={<BookedTours />} />
          <Route path="/admin/create-edit-tour" element={<TourGuidesManagement />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
