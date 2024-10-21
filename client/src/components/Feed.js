import Modal from 'react-modal';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../component-styles/Feed.css'
import '../component-styles/LikesModel.css'
import likeGif from '../logos/likeicon.gif'
import likedGif from '../logos/likedicon.gif'
import shareGif from '../logos/shareicon.gif'
import saveGif from '../logos/saveicon.gif'
import { useAuth } from '../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import Addpost from './Addpost'

const posturl = process.env.REACT_APP_backendPostURL
const Feed = () => {
  const {user}= useAuth()
  const navigate = useNavigate()
  const [data, setData] = useState([])

  console.log(user);
  const [status,setsatus]=useState(true)
  
  async function getPosts() {
    const token = localStorage.getItem('token');
    const { data } = await axios.get(`${posturl}/findallposts`,{
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    setData(data)
    console.log(data)
  }

  useEffect(() => {
    getPosts()
  }, [status])

console.log(status);

const handleClick = (postId) => {
  navigate(`/profiles/${postId}`)
}

  return (
    <div className='feed-container'>
      <Addpost setsatus={setsatus} status={status}/>
      {data.map((post, index) => (
       <IndvidualPost index={index} post={post} handleClick={handleClick} user={user} />
      ))}
    </div>
  )
}

function IndvidualPost({index,post,handleClick,user}){
  const [likedusers,setlikedusers]=useState([] )
  const [open,setopen]=useState(false)

useEffect(()=>{
  setlikedusers(post?.likedBy)
},[])

  const handleLike = async(postId) => {
  
    const token = localStorage.getItem('token');
    const { data } = await axios.post(`${posturl}/like/${postId}`,{},{
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
   setlikedusers(data)
   
    
  }
  return(
    <>
      <div key={index} className='feed-postcard'>
          <div className='feed-post-header'>
            <img onClick={() => handleClick(post.authorId._id)} src={post.authorId.dp || 'default-dp.jpg'} alt='User DP' className='feed-user-dp' />
            <div>
              <span onClick={() => handleClick(post.authorId._id)} className='feed-author-name'>{post.authorId.fname || 'Unknown Author'}</span>
              <span className='post-time'>{new Date(post.createdAt).toLocaleString()}</span>
            </div>
          </div>
          <div className='feed-post-content'>
            {post.desc && <p className='feed-post-description'>{post.desc}</p>}
            {post.postImage && (
              <img src={post.postImage} alt="Post" className='feed-post-image' />
            )}
          </div>
          <div className='feed-post-actions'>
          
            <img src={!likedusers?.some((e)=> e._id===user?._id)? `${likeGif}`:`${likedGif}`} alt="Like" onClick={() => handleLike(post._id)} className='action-gif' />
            <span onClick={()=>{setopen(!open)}} id='likes'>
            {  likedusers.length===1? ` ${likedusers.length} Like`: `${ likedusers.length} likes` }  
            </span>
            <LikesModal isOpen={open} likedusers={likedusers} setopen={setopen}/>
          </div>
        </div>
    </>
  )
}

const LikesModal = ({ isOpen, likedusers,setopen }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => {
    setModalIsOpen(false);
    setopen(false)
  };
  console.log(likedusers);
  
 
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="likes-modal"
      overlayClassName="likes-modal-overlay"
    >
      {/* Close button */}
      <button className="modal-close-btn" onClick={closeModal}/>
      <h2>People who liked this post</h2>

      {false ? (
        <p>Loading...</p>
      ) : likedusers.length > 0 ? (
        <ul className="likes-list">
          {likedusers.map((user) => (
            <Link to={`/profiles/${user._id}`}> 

            <li key={user._id} className="likes-list-item">
              <img src={user?.dp || "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"} alt="User Avatar" className="likes-avatar" />
              <span>{user?.fname}</span>
            </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p>No likes yet.</p>
      )}
    </Modal>
  );
};



export default Feed
