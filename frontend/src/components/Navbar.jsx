import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <h1>Admin Dashboard</h1>
                <div className="navbar-right">
                    <button className="logout-btn">Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
