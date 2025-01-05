import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import registerImg from '../assets/images/register.png';
import userIcon from '../assets/images/user.png';
import '../styles/register.css'; // Custom CSS

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    photo: '' // Optional field, you can remove if not needed
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // For redirecting after successful registration

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled out
    if (!credentials.username || !credentials.email || !credentials.password) {
      setError('Please provide all required fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials), // Send the credentials to the backend
      });

      const data = await response.json();

      if (response.status === 200) {
        // Registration was successful
        navigate('/login'); // Redirect to login page after successful registration
      } else {
        // Registration failed, display the error message
        setError(data.message || 'Something went wrong. Please try again');
      }
    } catch (err) {
      setError('Something went wrong. Please try again');
    }
  };

  return (
    <div className="login">
      <h2>Register</h2>
      
      {/* Display error message if any */}
      {error && <div className="alert alert-danger">{error}</div>}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            required
            value={credentials.username}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            value={credentials.email}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
            value={credentials.password}
            onChange={handleChange}
          />
        </FormGroup>

        <Button className="btn secondary__btn auth__btn" type="submit">
          Create Account
        </Button>
      </Form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
