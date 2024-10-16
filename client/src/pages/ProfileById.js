import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ProfileById.css';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/UserContext';

const ProfileById = () => {
  const [iuser, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { user } = useAuth();

  // Fetch user details from backend
  const getUser = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${process.env.REACT_APP_backendUserURL}/viewuser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data.userProfile);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const getPost = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${process.env.REACT_APP_backendPostURL}/mypost/${iuser._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const addNetwork = async (userid) => {
    try {
      const token = localStorage.getItem('token');
      const { status } = await axios.post(`${process.env.REACT_APP_backendUserURL}/networks`, {
        userId: userid,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(user._id,userid);
      
      if (status === 200) {
        getUser();
        // Show toast message if needed
      }
    } catch (error) {
      console.error("Error adding network:", error);
    }
  };

  useEffect(() => {
    if (iuser?._id) {
      getPost();
    }
  }, [iuser]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="profile-main-container">
        <div className="profile-header-section">
          <div className="profile-info-card">
            <img
              src={iuser?.dp || 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'}
              alt="User DP"
              className="profile-picture"
            />
            <div className="profile-details">
              <h2>{`${iuser?.fname} ${iuser?.lname}`}</h2>
              <p><strong>Bio:</strong> {iuser?.bio}</p>
              <p><strong>Age:</strong> {iuser?.age}</p>
              <p><strong>Email:</strong> {iuser?.email}</p>
              <p><strong>Mobile:</strong> {iuser?.mobile}</p>
            </div>
          </div>
          {iuser?._id !== user?._id && (
            user?.networks?.some((e) => e?._id === id) ? (
              <button className="remove-network" onClick={() => addNetwork(iuser?._id)}>Bonded</button>
            ) : (
              <button className="add-network" onClick={() => addNetwork(iuser?._id)}>NetBond</button>
            )
          )}
        </div>

        <div className="profile-posts">
          <h3>Posts</h3>
          <div className="posts-container">
            {posts.length > 0 ? (
              posts.map(post => (
                <div key={post?._id} className="post-card">
                  <p className="post-author">{iuser?.fname} {iuser?.lname}</p>
                  <p className='posted-time'><i>Posted at:</i> {new Date(post?.createdAt).toLocaleString()}</p>
                  <p className="post-desc">{post?.desc}</p>
                  <img src={post?.postImage} alt="Post" className="post-image" />
                  <div className="post-details">
                    <p className="post-likes"><strong>Likes:</strong> {post?.likedBy.length}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No posts yet</p>
            )}
          </div>
        </div>

        <div className="profile-networks-section">
          <h3>Networks</h3>
          {iuser?.networks && iuser.networks.length > 0 ? (
            <div className="network-list">
              {iuser.networks.map((e, i) => (
                <a key={i} href={`/profiles/${e?._id}`}>
                  <div className="network-item">
                    <img src={e?.dp} alt={`${e.fname}'s profile`} />
                    <h3>{e.fname}</h3>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="networks-section-container">
              <p>No friends added yet</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileById;
