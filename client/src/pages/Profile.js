import React from 'react';
import '../styles/Profile.css';
import { useAuth } from './../context/UserContext';

const Profile = () => {
  const { user } = useAuth();

  return (
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
            <p><strong>Bio:</strong> {user?.username}</p>
            <p><strong>Age:</strong> {user?.age}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Mobile:</strong> {user?.mobile}</p>
          </div>
        </div>
        <button className="edit-profile-btn">Edit Profile</button>
      </div>

      <div className="profile-posts">
        <h3>Posts</h3>
        {/* Render user's posts here */}
        <div className="posts-container">
          <p>No posts available</p>
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
  );
};

export default Profile;
