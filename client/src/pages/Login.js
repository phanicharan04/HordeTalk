import React, { useState } from 'react'
import axios from 'axios'
import '../styles/Login.css'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const {data} = await axios.post(`${process.env.REACT_APP_backendUserURL}/login`, { email, password })
      localStorage.setItem("token",data.token)
      localStorage.setItem("user",data)
      
      // Navigate to home page after successful login
      navigate('/home')
    } catch (error) {
      console.error('Error logging in:', error)
      alert('Login failed. Please check your credentials.')
    }
  }

  return (
    <div className='loginUser'>
      <h3>Login</h3>
      <form className='loginUserForm' onSubmit={handleSubmit}>
        <div className='inputGroup'>
          <label htmlFor='email'>Email</label>
          <input 
            type='email' 
            id='email' 
            placeholder='Enter Your Email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <label htmlFor='password'>Password</label>
          <input 
            type='password' 
            id='password' 
            placeholder='Enter Your Password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type='submit'>Login</button>
        </div>
      </form>
      <div className='signup'>
        <p>Don't have an account?</p>
        <Link to='/' className="btn btn-primary">Sign Up</Link>
      </div>
    </div>
  )
}

export default Login
