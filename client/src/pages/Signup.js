import React, { useState } from 'react'
import axios from 'axios'
import '../styles/Signup.css'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    username: '',
    email: '',
    password: '',
    mobile: '',
    dp: null,
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleFileChange = (e) => {
    setFormData({ ...formData, dp: e.target.files[0] })
  }
  
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const signupData = new FormData()

    // Append form data
    for (const key in formData) {
      signupData.append(key, formData[key])
    }

    try {
      await axios.post(`${process.env.REACT_APP_backendUserURL}/signup`, signupData)
      alert('Signup successful!')
      navigate('/home')
    } catch (error) {
      console.error('Error signing up:', error)
      alert('Signup failed. Please try again.')
    }
  }

  return (
    <div className='addUser'>
      <h3>Sign Up</h3>
      <form className='addUserForm' onSubmit={handleSubmit}>
        <div className='inputGroup'>
          <label htmlFor='fname'>First Name</label>
          <input type='text' id='fname' placeholder='Enter Your First Name' onChange={handleChange} required />
          
          <label htmlFor='lname'>Last Name</label>
          <input type='text' id='lname' placeholder='Enter Your Last Name' onChange={handleChange} required />
          
          <label htmlFor='username'>User Name</label>
          <input type='text' id='username' placeholder='Enter Your UserName' onChange={handleChange} required />
          
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' placeholder='Enter Your Email' onChange={handleChange} required />
          
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' placeholder='Enter Your Password' onChange={handleChange} required />
          
          <label htmlFor='mobile'>Mobile Number</label>
          <input type='text' id='mobile' placeholder='Enter Your Mobile Number' onChange={handleChange} required />
          
          <label htmlFor='dp'>Profile Picture</label>
          <input type='file' id='dp' onChange={handleFileChange} />
          
          <button type='submit'>Register</button>
        </div>
      </form>
      <div className='login'>
        <p>Already have an account?</p>
        <Link to='/login' className="btn btn-success">Login</Link>
      </div>
    </div>
  )
}

export default Signup
