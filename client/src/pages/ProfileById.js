import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/ProfileById.css'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

const ProfileById = () => {
  const [user, setUser] = useState({})
  const { id } = useParams()
  const [posts, setPosts] = useState([]);

  // Fetch user details from backend
  async function getUser() {
    const { data } = await axios.get(`${process.env.REACT_APP_backendUserURL}/viewuser/${id}`)
    setUser(data)
    console.log(data)
  }

  useEffect(() => {
    getUser()
  }, [])
  
  async function getPost() {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_backendPostURL}/mypost/${user._id}`);
      setPosts(data);  // Save posts to state
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  useEffect(() => {
    if (user?._id) {
      getPost();
    }
  }, [user]);

  return (
    <>
    <Navbar/>
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
            <p><strong>Bio:</strong> {user?.bio}</p>
            <p><strong>Age:</strong> {user?.age}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Mobile:</strong> {user?.mobile}</p>
          </div>
        </div>
        <button className="add-network">NetBond</button>
      </div>

      <div className="profile-posts">
        <h3>Posts</h3>
        <div className="posts-container">
        {posts.length > 0 ? (
              posts.map(post => (
                <div key={post?._id} className="post-card">
                  <p className="post-author">{user?.fname} {user?.lname}</p>
                  <p className='posted-time'><i>Posted at:</i> {new Date(post?.createdAt).toLocaleString()}</p>
                  <p className="post-desc">{post?.desc}</p>
                  <img src={post?.postImage} alt="Post" className="post-image" />
                  <div className="post-details">
                    <p className="post-likes"><strong>Likes:</strong> {post?.likedBy.length}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No posts yet</p>
            )}
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
    </>
  )
}

export default ProfileById
