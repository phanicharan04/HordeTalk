import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../component-styles/Feed.css'
import likeGif from '../logos/likeicon.gif'
import shareGif from '../logos/shareicon.gif'
import saveGif from '../logos/saveicon.gif'

const Feed = () => {
  const posturl = process.env.REACT_APP_backendPostURL
  const [data, setData] = useState([])

  async function getPosts() {
    const { data } = await axios.get(`${posturl}/findallposts`)
    setData(data)
    console.log(data)
  }

  useEffect(() => {
    getPosts()
  }, [])

  const handleLike = (postId) => {
    console.log("Liked post: ", postId)
  }

  const handleShare = (postId) => {
    console.log("Shared post: ", postId)
  }

  const handleSave = (postId) => {
    console.log("Saved post: ", postId)
  }

  return (
    <div className='feed-container'>
      {data.map((post, index) => (
        <div key={index} className='postcard'>
          <div className='post-header'>
            <img src={post.authorId.profilePic || 'default-dp.jpg'} alt='User DP' className='user-dp' />
            <div>
              <span className='author-name'>{post.authorId.name || 'Unknown Author'}</span>
              <span className='post-time'>{new Date(post.createdAt).toLocaleString()}</span>
            </div>
          </div>
          <div className='post-content'>
            {post.desc && <p className='post-description'>{post.desc}</p>}
            {post.postImage && (
              <img src={post.postImage} alt="Post" className='post-image' />
            )}
          </div>
          <div className='post-actions'>
            <img src={likeGif} alt="Like" onClick={() => handleLike(post._id)} className='action-gif' />
            <img src={shareGif} alt="Share" onClick={() => handleShare(post._id)} className='action-gif' />
            <img src={saveGif} alt="Save" onClick={() => handleSave(post._id)} className='action-gif' />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Feed
