import React from 'react';
import '../styles/Feed.css';

function Feed() {
  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <input type="text" placeholder="What's on your mind..." />
        </div>
      </div>
      <div className="feed__posts">
        {/* Post components will go here */}
        <div className="feed__post">
          <h2>Post Title</h2>
          <p>Post content goes here...</p>
        </div>
      </div>
    </div>
  );
}

export default Feed;
