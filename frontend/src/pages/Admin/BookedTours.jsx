import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/bookedTour.css'
const BookedTours = () => {
    // Simulated booked tours data
    const [bookedTours, setBookedTours] = useState([
        {
            id: 1,
            title: 'Tour to Paris',
            username: 'john_doe',
            city: 'Paris',
            price: 2500,
            date: '2024-07-01',
            status: 'Pending',  // Can be 'Pending', 'Completed', or 'Cancelled'
        },
        {
            id: 2,
            title: 'Safari in Kenya',
            username: 'jane_smith',
            city: 'Nairobi',
            price: 3000,
            date: '2024-08-10',
            status: 'Pending',
        },
        {
            id: 3,
            title: 'Explore Bali',
            username: 'mike_williams',
            city: 'Bali',
            price: 1800,
            date: '2024-09-15',
            status: 'Completed',
        },
    ]);

    const navigate = useNavigate();

    // Function to mark a booking as completed
    const handleComplete = (id) => {
        const updatedBookings = bookedTours.map((tour) =>
            tour.id === id ? { ...tour, status: 'Completed' } : tour
        );
        setBookedTours(updatedBookings);
        alert('Booking marked as completed!');
    };

    // Function to cancel a booking
    const handleCancel = (id) => {
        const updatedBookings = bookedTours.map((tour) =>
            tour.id === id ? { ...tour, status: 'Cancelled' } : tour
        );
        setBookedTours(updatedBookings);
        alert('Booking cancelled!');
    };

    // Function to view booking details (Redirect to details page or modal in future)
    const handleViewDetails = (id) => {
        console.log('Viewing details for tour ID:', id);
        navigate(`/admin/booked-tours/${id}`); // Navigate to a dedicated details page for this booking
    };

    return (
        <div>
            <h2>Booked Tours</h2>
            <table>
                <thead>
                    <tr>
                        <th>Tour Title</th>
                        <th>Username</th>
                        <th>City</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookedTours.map((tour) => (
                        <tr key={tour.id}>
                            <td>{tour.title}</td>
                            <td>{tour.username}</td>
                            <td>{tour.city}</td>
                            <td>${tour.price}</td>
                            <td>{tour.date}</td>
                            <td>{tour.status}</td>
                            <td>
                                {tour.status === 'Pending' && (
                                    <>
                                        <button
                                            onClick={() => handleComplete(tour.id)}
                                            className="complete-btn"
                                        >
                                            Mark as Completed
                                        </button>
                                        <button
                                            onClick={() => handleCancel(tour.id)}
                                            className="cancel-btn"
                                        >
                                            Cancel Booking
                                        </button>
                                    </>
                                )}
                                {tour.status === 'Completed' && (
                                    <button
                                        onClick={() => handleViewDetails(tour.id)}
                                        className="view-details-btn"
                                    >
                                        View Details
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookedTours;
