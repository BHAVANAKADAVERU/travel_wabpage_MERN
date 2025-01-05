import React from 'react';
import axios from 'axios';

const Booking = ({ tourId }) => {
  const handleBooking = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.post(
        '/api/v1/book',
        { tourId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Booking successful!');
    } catch (error) {
      console.error('Booking failed:', error.response?.data?.message);
    }
  };

  return <button onClick={handleBooking}>Book Now</button>;
};

export default Booking;
