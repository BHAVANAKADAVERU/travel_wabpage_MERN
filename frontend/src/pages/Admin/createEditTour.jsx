import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/editTour.css'

const CreateEditTour = () => {
    const [tour, setTour] = useState({
        title: '',
        description: '',
        price: '',
        city: '',
        duration: '',
        date: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const { id } = useParams();  // Get the tour ID from URL parameters.
    const navigate = useNavigate();

    // Simulate fetching data for editing when an ID is provided (for editing)
    useEffect(() => {
        if (id) {
            setIsEditing(true);
            // Simulated existing tour data for editing (can replace with real backend data)
            const existingTour = {
                title: 'Tour to Paris',
                description: 'A beautiful tour to Paris covering all major attractions.',
                price: '2500',
                city: 'Paris',
                duration: '5',
                date: '2024-07-01',
            };
            setTour(existingTour);  // Set existing tour data to the state for editing
        }
    }, [id]);

    // Handle form submission (create or update)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            console.log('Updating tour:', tour);
            alert('Tour updated successfully!');
        } else {
            console.log('Creating new tour:', tour);
            alert('New tour created successfully!');
        }
        navigate('/admin/tours');  // Navigate back to tours list page after submission
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTour((prevTour) => ({
            ...prevTour,
            [name]: value,
        }));
    };

    // Handle deletion of the tour (only for edit mode)
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this tour?')) {
            console.log('Deleting tour:', tour);
            alert('Tour deleted successfully!');
            navigate('/admin/tours');  // Navigate back to tours list after deletion
        }
    };

    // Handle cancel (reset form or navigate back)
    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel? Changes will be lost.')) {
            navigate('/admin/tours');
        }
    };

    return (
        <div>
            <h2>{isEditing ? 'Edit Tour' : 'Create New Tour'}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={tour.title}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={tour.description}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={tour.price}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    City:
                    <input
                        type="text"
                        name="city"
                        value={tour.city}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Duration (days):
                    <input
                        type="number"
                        name="duration"
                        value={tour.duration}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Date:
                    <input
                        type="date"
                        name="date"
                        value={tour.date}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                <div className="form-actions">
                    <button type="submit">{isEditing ? 'Update Tour' : 'Create Tour'}</button>

                    {/* Show Delete button only when editing an existing tour */}
                    {isEditing && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="delete-btn"
                        >
                            Delete Tour
                        </button>
                    )}

                    {/* Cancel Button */}
                    <button type="button" onClick={handleCancel} className="cancel-btn">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateEditTour;
