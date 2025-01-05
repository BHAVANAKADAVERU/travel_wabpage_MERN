import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';  // User Icon from react-icons
import './profile.css';  // Import the CSS file for styling

const Profile = () => {
  const { user } = useContext(AuthContext);  // Access user from context
  const [profile, setProfile] = useState(user);  // Profile state to hold user data
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);  // Track edit mode

  // Fetch user data if not available or updated
  useEffect(() => {
    if (user) {
      setLoading(true); // Start loading
      axios.get(`/api/users/${user._id}`)
        .then((response) => {
          setProfile(response.data.data);  // Update state with profile data
          setLoading(false);  // End loading
        })
        .catch((error) => {
          console.error('Error fetching profile data:', error);
          setLoading(false);  // End loading
        });
    }
  }, [user]);

  // Toggle edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Save profile changes
  const handleSaveChanges = () => {
    setLoading(true);  // Start loading
    axios.put(`/api/users/${user._id}`, profile)  // Send PUT request to update profile
      .then((response) => {
        setProfile(response.data.data);  // Update state with the saved profile data
        setIsEditing(false);  // Exit edit mode
        setLoading(false);  // End loading
        alert('Profile updated successfully!');  // Success alert
      })
      .catch((error) => {
        console.error('Error saving profile changes:', error);
        setLoading(false);  // End loading
        alert('Failed to save changes');  // Failure alert
      });
  };

  if (loading) {
    return <div>Loading...</div>;  // Show loading state
  }

  return (
    <div className="profile">
      <div className="profile-header">
        {/* User Avatar */}
        <div className="profile-avatar">
          {profile.avatar ? (
            <img src={profile.avatar} alt="User Avatar" />
          ) : (
            <FaUserCircle size={100} color="#007BFF" />
          )}
        </div>
        <h2>Your Profile</h2>
      </div>

      {/* Profile Edit Form or View */}
      {isEditing ? (
        <form>
          <label>Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />

          <label>Email</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />

          

          <button type="button" onClick={handleSaveChanges}>Save Changes</button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          

          {/* Edit Profile Button */}
          <button className="edit-btn" onClick={handleEditToggle}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
