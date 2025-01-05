import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TourGuidesManagement = () => {
    // Simulated tour guides data
    const [tourGuides, setTourGuides] = useState([
        {
            id: 1,
            name: 'John Doe',
            tour: 'Tour to Paris',
            contact: 'john.doe@email.com',
            status: 'Active',
        },
        {
            id: 2,
            name: 'Jane Smith',
            tour: 'Safari in Kenya',
            contact: 'jane.smith@email.com',
            status: 'Inactive',
        },
        {
            id: 3,
            name: 'Alice Johnson',
            tour: 'Explore Bali',
            contact: 'alice.johnson@email.com',
            status: 'Active',
        },
    ]);

    const navigate = useNavigate();

    // Handle delete tour guide
    const handleDelete = (id) => {
        const updatedGuides = tourGuides.filter((guide) => guide.id !== id);
        setTourGuides(updatedGuides);
        alert('Tour guide deleted successfully!');
    };

    // Handle edit tour guide
    const handleEdit = (id) => {
        navigate(`/admin/tour-guides/edit/${id}`); // Redirect to edit page for this guide
    };

    // Handle view tour guide details
    const handleViewDetails = (id) => {
        navigate(`/admin/tour-guides/${id}`); // Redirect to view details page for this guide
    };

    // Handle adding new tour guide
    const handleAddGuide = () => {
        navigate('/admin/tour-guides/create'); // Navigate to create new guide page
    };

    return (
        <div>
            <h2>Tour Guides Management</h2>
            <button onClick={handleAddGuide} className="add-guide-btn">Add New Tour Guide</button>
            <table>
                <thead>
                    <tr>
                        <th>Guide Name</th>
                        <th>Tour</th>
                        <th>Contact</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tourGuides.map((guide) => (
                        <tr key={guide.id}>
                            <td>{guide.name}</td>
                            <td>{guide.tour}</td>
                            <td>{guide.contact}</td>
                            <td>{guide.status}</td>
                            <td>
                                <button
                                    onClick={() => handleEdit(guide.id)}
                                    className="edit-btn"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(guide.id)}
                                    className="delete-btn"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleViewDetails(guide.id)}
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

export default TourGuidesManagement;
