import React from 'react';
import '../component-styles/Rightbar.css';

const friends = [
  { name: 'John Doe', dp: 'path-to-dp1.jpg' },
  { name: 'Jane Smith', dp: 'path-to-dp2.jpg' },
  { name: 'Emily Johnson', dp: 'path-to-dp3.jpg' },
  // Add more friends as needed
];

const Rightbar = () => {
  return (
    <div className="rightbar-container">
      <h3 className="rightbar-heading">Networks</h3>
      <div className="friends-list">
        {friends.map((friend, index) => (
          <div key={index} className="friend-item">
            <img src={friend.dp} alt={friend.name} className="friend-dp" />
            <span className="friend-name">{friend.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rightbar;
