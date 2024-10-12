import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/Profile.css'

const Profile = () => {
  const [user, setUser] = useState({})

  // Fetch user details from backend
  async function getUser() {
    const { data } = await axios.get(`${process.env.REACT_APP_backendUserURL}/viewuser/:userId`)
    setUser(data)
    console.log(data)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className='profile-container'>
      <div className='profile-card'>
        <img src={user.dp || 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'} alt="User DP" className='profile-dp' />
        <div className='profile-info'>
          <h2>{`${user.fname} ${user.lname}`}</h2>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.mobile}</p>
        </div>
      </div>
    </div>
  )
}

export default Profile
