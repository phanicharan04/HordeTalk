import React from 'react';
import '../component-styles/Leftbar.css';
import { useAuth } from './../context/UserContext';

const Leftbar = () => {
  const { user } = useAuth();
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <div className="sidebar-card">
          <img
            src={user?.dp || 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'}
            alt="User DP"
            className="sidebar-dp"
          />
          <div className="sidebar-info">
            <h2>{`${user?.fname} ${user?.lname}`}</h2>
            <p><strong>Bio:</strong> {user?.username}</p>
            <p><strong>Age:</strong> {user?.age}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Mobile:</strong> {user?.mobile}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
