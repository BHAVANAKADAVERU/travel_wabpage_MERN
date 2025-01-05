import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../utils/axios"; 

const BookedTours = () => {
  const { user } = useContext(AuthContext);
  const [bookedTours, setBookedTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
     // Import the axios instance
// BookedTours Component (Frontend)
const fetchBookedTours = async () => {
  if (!user) {
    setError("User is not logged in. Please log in to view your bookings.");
    setLoading(false);
    return;
  }

  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("Authentication token not found. Please log in again.");
      setLoading(false);
      return;
    }

    // Send the token in the Authorization header
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/book/user/${user._id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.data.success) {
      setBookedTours(response.data.data);
    } else {
      setError("No bookings found for this user.");
    }
  } catch (err) {
    console.error("Error fetching booked tours:", err);
    setError(err.response?.data?.message || "Failed to fetch booked tours.");
  } finally {
    setLoading(false);
  }
};


    fetchBookedTours();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; // You could replace this with a spinner or skeleton loader
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <p>
          Please try again or{" "}
          <a href="/login">log in</a> if you're not authenticated.
        </p>
      </div>
    );
  }

  return (
    <div className="booked-tours">
      <h2>Your Booked Tours</h2>
      {bookedTours.length === 0 ? (
        <p>
          You have not booked any tours yet.{" "}
          <a href="/tours">Explore Tours</a>
        </p>
      ) : (
        <div className="tour-list">
          {bookedTours.map((booking) => (
            <div key={booking._id} className="tour-card">
              {booking.tourId ? (
                <>
                  <img
                    src={booking.tourId.photo}
                    alt={booking.tourId.title}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <h3>{booking.tourId.title}</h3>
                  <p>{booking.tourId.desc}</p>
                  <p>Category: {booking.tourId.category}</p>
                  <p>Price: ${booking.tourId.price}</p>
                  <p>Location: {booking.tourId.city}</p>
                  <p>Distance: {booking.tourId.distance} km</p>
                  <p>Max Group Size: {booking.tourId.maxGroupSize}</p>
                  <p>{booking.tourId.featured ? "Featured Tour" : "Standard Tour"}</p>
                </>
              ) : (
                <p>Tour details not available.</p>
              )}
              <p>
                Booking Date: {new Date(booking.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedTours;
