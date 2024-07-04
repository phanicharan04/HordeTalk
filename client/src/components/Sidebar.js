import React from 'react';
import '../styles/Sidebar.css';
import profile from '../images/profile.png';
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img src={profile} alt="" />
        <h2>Phani Charan</h2>
      </div>
      <hr></hr>
        <h4>demo@example.com</h4>
        <hr></hr>
      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p>No of Friends</p>
          <p className="sidebar__statNumber">2,543</p>
        </div>
        <div className="sidebar__stat">
          <p>No of posts</p>
          <p className="sidebar__statNumber">2,448</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
