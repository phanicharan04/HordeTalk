import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Signup.css';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    age: '',
    email: '',
    password: '',
    mobile: '',
    
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_backendUserURL}/signup`, formData);
      alert('Signup successful!');
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h1 className="logo">HordeTalk</h1>
      <h2>Create a new account</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="input-row">
          <input
            type="text"
            id="fname"
            placeholder="First name"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="lname"
            placeholder="Surname"
            onChange={handleChange}
            required
          />
        </div>
          <input
            type="number"
            id="age"
            placeholder="Age"
            onChange={handleChange}
            required
          />
        <input
          type="text"
          id="mobile"
          placeholder="Mobile number"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          id="email"
          placeholder="Email address"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="New password"
          onChange={handleChange}
          required
        />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <Link to="/" className="login-link">Already have an account?</Link>
    </div>
  );
};

export default Signup;
