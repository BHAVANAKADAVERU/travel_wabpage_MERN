import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
    // Simulated user data
    const [users, setUsers] = useState([
        {
            id: 1,
            username: 'john_doe',
            email: 'john.doe@email.com',
            role: 'Admin',
            status: 'Active',
        },
        {
            id: 2,
            username: 'jane_smith',
            email: 'jane.smith@email.com',
            role: 'User',
            status: 'Inactive',
        },
        {
            id: 3,
            username: 'alice_johnson',
            email: 'alice.johnson@email.com',
            role: 'User',
            status: 'Active',
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Handle delete user
    const handleDelete = (id) => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        alert('User deleted successfully!');
    };

    // Handle edit user
    const handleEdit = (id) => {
        navigate(`/admin/users/edit/${id}`);  // Redirect to edit page for this user
    };

    // Handle view user details
    const handleViewDetails = (id) => {
        navigate(`/admin/users/${id}`);  // Redirect to view details page for this user
    };

    // Handle search input
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filtered users based on search term
    const filteredUsers = users.filter((user) => {
        return (
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div>
            <h2>Users List</h2>
            <div>
                <input
                    type="text"
                    placeholder="Search by username, email, or role..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.status}</td>
                            <td>
                                <button
                                    onClick={() => handleEdit(user.id)}
                                    className="edit-btn"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="delete-btn"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleViewDetails(user.id)}
                                    className="view-details-btn"
                                >
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersList;
