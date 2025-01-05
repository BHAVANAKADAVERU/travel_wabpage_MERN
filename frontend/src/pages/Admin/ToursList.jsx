import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ToursList = () => {
    // Simulated tours data
    const [tours, setTours] = useState([
        {
            id: 1,
            title: 'Tour to Paris',
            city: 'Paris',
            price: 2500,
            duration: '7 days',
            description: 'Explore the city of lights with a 7-day tour.',
            status: 'Active',  // Can be 'Active' or 'Inactive'
        },
        {
            id: 2,
            title: 'Safari in Kenya',
            city: 'Nairobi',
            price: 3500,
            duration: '10 days',
            description: 'An unforgettable safari adventure in the wild.',
            status: 'Active',
        },
        {
            id: 3,
            title: 'Explore Bali',
            city: 'Bali',
            price: 1800,
            duration: '5 days',
            description: 'Relax on the beaches and explore the cultural sites of Bali.',
            status: 'Inactive',
        },
    ]);

    const navigate = useNavigate();

    // Function to delete a tour
    const handleDelete = (id) => {
        const updatedTours = tours.filter((tour) => tour.id !== id);
        setTours(updatedTours);
        alert('Tour deleted successfully!');
    };

    // Function to edit a tour (redirect to an edit page)
    const handleEdit = (id) => {
        navigate(`/admin/tours/edit/${id}`);  // Navigate to the edit page for this tour
    };

    // Function to view tour details (redirect to a tour detail page)
    const handleViewDetails = (id) => {
        navigate(`/admin/tours/${id}`);  // Navigate to a dedicated details page for this tour
    };

    return (
        <div>
            <h2>Tours List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Tour Title</th>
                        <th>City</th>
                        <th>Price</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tours.map((tour) => (
                        <tr key={tour.id}>
                            <td>{tour.title}</td>
                            <td>{tour.city}</td>
                            <td>${tour.price}</td>
                            <td>{tour.duration}</td>
                            <td>{tour.status}</td>
                            <td>
                                <button
                                    onClick={() => handleEdit(tour.id)}
                                    className="edit-btn"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(tour.id)}
                                    className="delete-btn"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleViewDetails(tour.id)}
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

export default ToursList;
