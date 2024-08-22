import React from 'react';
import '../styles/Post.css';
import photo from '../images/photoicon.gif';
import video from '../images/videoicon.gif';
import file from '../images/add-filelogo.gif';

function Post() {
  return (
    <div className="Post">
      <div className="Post__container">
        <div className="Post__input">
          <input type="text" placeholder="What's on your mind..." />
        </div>
        <div className="Post__options">
          <button className="Post__option">
            <img src={photo} alt="Add Clip" />
            <span>Image</span>
          </button>
          <button className="Post__option">
            <img src={video} alt="Add Attachment" />
            <span>Video</span>
          </button>
          <button className="Post__option">
            <img src={file} alt="Add File" />
            <span>File</span>
          </button>
        <button type='submit' className="Submit">
          <span>Submit</span>
        </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
