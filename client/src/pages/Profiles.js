import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/Profiles.css'
import { useParams } from 'react-router-dom'

const Profiles = () => {
  const [user, setUser] = useState({})
  const { id } = useParams()

  // Fetch user details from backend
  async function getUser() {
    const { data } = await axios.get(`${process.env.REACT_APP_backendUserURL}/viewuser/${id}`)
    setUser(data)
    console.log(data)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="profile-main-container">
      <div className="profile-header-section">
        <div className="profile-info-card">
          <img
            src={user?.dp || 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'}
            alt="User DP"
            className="profile-picture"
          />
          <div className="profile-details">
            <h2>{`${user?.fname} ${user?.lname}`}</h2>
            <p><strong>Bio:</strong> {user?.username}</p>
            <p><strong>Age:</strong> {user?.age}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Mobile:</strong> {user?.mobile}</p>
          </div>
        </div>
        <button className="add-network">NetBond</button>
      </div>

      <div className="profile-posts-section">
        <h3>Posts</h3>
        {/* Render user's posts here */}
        <div className="posts-section-container">
          <p>No posts available</p>
        </div>
      </div>

      <div className="profile-networks-section">
        <h3>Networks</h3>
        {/* Render user's networks/friends here */}
        <div className="networks-section-container">
          <p>No friends added yet</p>
        </div>
      </div>
    </div>
  )
}

export default Profiles
