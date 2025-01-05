import React, { useState } from 'react';

const CreateTourGuide = () => {
    const [formData, setFormData] = useState({
        name: '',
        tour: '',
        contact: '',
        status: 'Active',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('New Tour Guide Created:', formData);
        // Simulate form submission (you would integrate with backend here)
        alert('Tour Guide added successfully!');
    };

    return (
        <div>
            <h2>Create New Tour Guide</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Guide Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Tour:</label>
                    <input
                        type="text"
                        name="tour"
                        value={formData.tour}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Contact:</label>
                    <input
                        type="email"
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <button type="submit">Create Guide</button>
            </form>
        </div>
    );
};

export default CreateTourGuide;
