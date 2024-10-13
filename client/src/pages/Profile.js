import React, { useEffect, useState } from 'react';
import '../styles/Profile.css';
import { useAuth } from './../context/UserContext';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()
  async function UserPost() {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_backendPostURL}/mypost/${user?._id}`);
      setPosts(data);  // Save posts to state
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  useEffect(() => {
    if (user?._id) {
      UserPost();
    }
  }, [user]);
  
  const handleClick = (postId) => {
    navigate(`/mypost/${postId}`)
  }

  return (
    <>
    <Navbar/>
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-card">
          <img
            src={user?.dp || 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'}
            alt="User DP"
            className="profile-dp"
          />
          <div className="profile-info">
            <h2>{`${user?.fname} ${user?.lname}`}</h2>
            <p><strong>Bio:</strong> {user?.bio}</p>
            <p><strong>Age:</strong> {user?.age}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Mobile:</strong> {user?.mobile}</p>
          </div>
        </div>
        <button className="edit-profile-btn">Edit Profile</button>
      </div>

      <div className="profile-posts">
        <h3>Posts</h3>
        <div className="posts-container">
        {posts.length > 0 ? (
              posts.map(post => (
                <div key={post._id} className="post-card" >
                  <p className="post-author">{user.fname} {user.lname}</p>
                  <p className='posted-time'><i>Posted at:</i> {new Date(post.createdAt).toLocaleString()}</p>
                  <p className="post-desc">{post.desc}</p>
                  <img src={post.postImage} alt="Post" className="post-image" />
                  <div className="post-details">
                    <p className="post-likes"><strong>Likes:</strong> {post.likedBy.length}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No posts yet</p>
            )}
        </div>
      </div>

      <div className="profile-networks">
        <h3>Networks</h3>
        {/* Render user's networks/friends here */}
        <div className="networks-container">
          <p>No friends added yet</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
