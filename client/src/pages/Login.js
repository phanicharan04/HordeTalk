import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_backendUserURL}/login`, { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data);
      navigate('/home');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <h1>HordeTalk</h1>
        <p>HordeTalk helps you connect and share innovative ideas.</p>
      </div>
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Log in</button>
          <a href="/forgot-password" className="forgot-password">Forgotten password?</a>
        </form>
        <div className="divider"></div>
        <Link to="/signup" className="create-account-button">Create new account</Link>
      </div>
    </div>
  );
};

export default Login;
