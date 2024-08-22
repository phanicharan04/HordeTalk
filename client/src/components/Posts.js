import React from 'react';
import '../styles/Posts.css';
import { Avatar, Button } from '@mui/material';
import { ThumbUp, Comment, Share } from '@mui/icons-material';

function Posts({ name, description, message, photoUrl, videoUrl, fileUrl }) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar src={photoUrl}>{name[0]}</Avatar>
        <div className="post__info">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
        <Button className="post__connectButton">Connect</Button>
      </div>
      <div className="post__body">
        <p>{message}</p>
        {photoUrl && <img src={photoUrl} alt="Post" className="post__image" />}
        {videoUrl && <video src={videoUrl} controls className="post__video" />}
        {fileUrl && <a href={fileUrl} download className="post__file">Download File</a>}
      </div>
      <div className="post__buttons">
        <Button startIcon={<ThumbUp />} className="post__button">Like</Button>
        <Button startIcon={<Comment />} className="post__button">Comment</Button>
        <Button startIcon={<Share />} className="post__button">Share</Button>
      </div>
    </div>
  );
}

export default Posts;
