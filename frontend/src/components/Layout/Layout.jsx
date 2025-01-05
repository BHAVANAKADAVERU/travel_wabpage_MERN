import React, { useState } from 'react';
import Header from '../Header/Header'; // Assuming you have a Header component with a hamburger menu
import Sidebar from '../sidebar'; // Sidebar import
import Routers from '../../router/Routers'; // Your Routes
import Footer from '../Footer/Footer'; // Footer component

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle function to open/close the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout">
      {/* Pass toggleSidebar function to Header to handle hamburger click */}
      <Header toggleSidebar={toggleSidebar} />

      {/* Sidebar component receives isOpen prop */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main Content */}
      <div className="content">
        <Routers />
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
