import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Reviews.css'
const Reviews = () => {
    // Simulated reviews data
    const [reviews, setReviews] = useState([
        {
            id: 1,
            username: 'john_doe',
            tour: 'Tour to Paris',
            rating: 4,
            comment: 'Amazing experience, will definitely visit again!',
            status: 'Pending',  // Can be 'Pending', 'Approved', or 'Deleted'
        },
        {
            id: 2,
            username: 'jane_smith',
            tour: 'Safari in Kenya',
            rating: 5,
            comment: 'The safari was breathtaking! Highly recommend!',
            status: 'Approved',
        },
        {
            id: 3,
            username: 'mike_williams',
            tour: 'Explore Bali',
            rating: 3,
            comment: 'The tour was okay, but some activities were rushed.',
            status: 'Pending',
        },
    ]);

    const navigate = useNavigate();

    // Function to approve a review
    const handleApprove = (id) => {
        const updatedReviews = reviews.map((review) =>
            review.id === id ? { ...review, status: 'Approved' } : review
        );
        setReviews(updatedReviews);
        alert('Review approved!');
    };

    // Function to delete a review
    const handleDelete = (id) => {
        const updatedReviews = reviews.filter((review) => review.id !== id);
        setReviews(updatedReviews);
        alert('Review deleted!');
    };

    // Function to view review details (Redirect to a dedicated review details page or modal)
    const handleViewDetails = (id) => {
        console.log('Viewing details for review ID:', id);
        navigate(`/admin/reviews/${id}`); // Navigate to a dedicated details page for this review
    };

    return (
        <div>
            <h2>Manage Reviews</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Tour</th>
                        <th>Rating</th>
                        <th>Comment</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review) => (
                        <tr key={review.id}>
                            <td>{review.username}</td>
                            <td>{review.tour}</td>
                            <td>{review.rating}</td>
                            <td>{review.comment}</td>
                            <td>{review.status}</td>
                            <td>
                                {review.status === 'Pending' && (
                                    <>
                                        <button
                                            onClick={() => handleApprove(review.id)}
                                            className="approve-btn"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleDelete(review.id)}
                                            className="delete-btn"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                                {review.status === 'Approved' && (
                                    <button
                                        onClick={() => handleViewDetails(review.id)}
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

export default Reviews;
