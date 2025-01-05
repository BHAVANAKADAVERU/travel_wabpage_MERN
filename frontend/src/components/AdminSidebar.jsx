import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminSidebar = ({ isLoggedIn, onLogout }) => {
    const navigate = useNavigate();

    // Handle logout logic
    const handleLogout = () => {
        onLogout(); // Clear login state
        navigate('/login'); // Redirect to login page
    };

    return (
        <aside className="admin-sidebar">
            <ul>
                {isLoggedIn ? (
                    <>
                        <li><Link to="/admin">Dashboard</Link></li>
                        <li><Link to="/admin/users">Users List</Link></li>
                        <li><Link to="/admin/tours">Tours List</Link></li>
                        <li><Link to="/admin/reviews">Reviews</Link></li>
                        <li><Link to="/admin/booked-tours">Booked Tours</Link></li>
                        <li><Link to="/admin/create-edit-tour">Create/Edit Tours</Link></li>
                        <li><Link to="/admin/tour-guides">Tour Guides Management</Link></li>
                        <li>
                            <button className="logout-btn" onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </aside>
    );
};

export default AdminSidebar;
