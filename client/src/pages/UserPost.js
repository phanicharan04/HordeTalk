import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/UserPost.css'; // You can create a CSS file for styling
import UpdatePost from '../components/UpdatePost';
import Navbar from '../components/Navbar';

const UserPost = () => {
  const { postId } = useParams(); // To get postId from URL
  const [post, setPost] = useState(null); // State to store post details
  const [error, setError] = useState(null); // State for error handling
  const [test,settest]=useState(false)
  const navigate = useNavigate();

  // Fetch the post details when the component is loaded
  useEffect(() => {
    async function fetchPost() {
      
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${process.env.REACT_APP_backendPostURL}/findpostbyid/${postId}`,{
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        console.log(data);
        
        setPost(data);
      } catch (err) {
        setError('Error fetching post details');
        console.error(err);
      }
    }
    fetchPost();
  }, [postId, test]);

  // Function to handle post deletion
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_backendPostURL}/deletepost/${postId}`,{
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      // console.log('hi');
      
      navigate('/profile'); // Redirect to profile after deleting
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  // // Function to handle post update (navigation to update page)
  // const handleUpdate = () => {
  //   // navigate(`/updatepost/${postId}`);
  
  // };

  return (
    <>
    <Navbar/>
    <div className="my-post-container">
      {error && <p>{error}</p>}
      {post ? (
        <div className="my-post-details">
          <h2>{post.title}</h2>
          <img src={post.postImage} alt="Post" className="my-post-image" />
          <p>{post.desc}</p>
          <p><strong>Likes:</strong> {post.likedBy.length}</p>
          <button className="update-btn" onClick={()=>{settest(!test)}}>Update Post</button>
          <button className="delete-btn" onClick={handleDelete}>Delete Post</button>
          {test && <UpdatePost status={true} settest={settest}  postId={postId}/>}
        </div>
      ) : (
        <p>Loading post...</p>
      )}
    </div>
    </>
  );
};

export default UserPost;
