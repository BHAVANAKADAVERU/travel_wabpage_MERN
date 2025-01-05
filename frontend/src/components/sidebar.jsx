import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate is used for redirecting
import './sidebar.css'; // Add your sidebar styles
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const Sidebar = ({ isOpen }) => {
  const { user, dispatch } = useContext(AuthContext); // Access user data from AuthContext
  const navigate = useNavigate(); // For programmatically redirecting after logout

  const handleLogout = () => {
    // Clear user data and token
    localStorage.removeItem('accessToken');
    dispatch({ type: 'LOGOUT' }); // Dispatch the logout action
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul className="sidebar-list">
        {/* General link items */}
        <li className="sidebar-item">
          <Link to="/" className="sidebar-link">Home</Link>
        </li>

        {!user ? (
          <>
            {/* Links for not logged in users */}
            <li className="sidebar-item">
              <Link to="/login" className="sidebar-link">Login</Link>
            </li>
            <li className="sidebar-item">
              <Link to="/register" className="sidebar-link">Register</Link>
            </li>
          </>
        ) : (
          <>
            {/* Render user-related options if logged in */}
            <li className="sidebar-item">
              <Link to="/profile" className="sidebar-link">Profile</Link>
            </li>
            <li className="sidebar-item">
              <Link to="/tours" className="sidebar-link">Tours</Link>
            </li>
            <li className="sidebar-item">
              <Link to="/booked-tours" className="sidebar-link">Booked Tours</Link>
            </li>
            {/* Logout link */}
            <li className="sidebar-item" onClick={handleLogout}>
              <span className="sidebar-link">Logout</span>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
