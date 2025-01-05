import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem('authToken');
      const usersRes = await axios.get('/api/v1/users', { headers: { Authorization: `Bearer ${token}` } });
      const toursRes = await axios.get('/api/v1/tours', { headers: { Authorization: `Bearer ${token}` } });
      setUsers(usersRes.data.data);
      setTours(toursRes.data.data);
    };
    fetchAdminData();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Users</h3>
        {users.map((user) => (
          <p key={user._id}>{user.username}</p>
        ))}
      </div>
      <div>
        <h3>Tours</h3>
        {tours.map((tour) => (
          <p key={tour._id}>{tour.title}</p>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
