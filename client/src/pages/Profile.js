import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import { useAuth } from "./../context/UserContext";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  console.log(user);

  async function delPost(postid) {
    try {
      console.log(postid);

      const { data } = await axios.get(
        `${process.env.REACT_APP_backendPostURL}/deletepost/${postid}`
      );
      // setPosts(data);  // Save posts to state
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  async function UserPost() {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${process.env.REACT_APP_backendPostURL}/mypost/${user?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(data); // Save posts to state
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  useEffect(() => {
    if (user?._id) {
      UserPost();
    }
  }, [user]);

  // Navigate to post details page when a post is clicked
  const handleClick = (postId) => {
    navigate(`/mypost/${postId}`);
  };

  const handleClickUpdate = (userId) => {
    navigate(`/updateprofile/${userId}`);
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-card">
            <img
              src={
                user?.dp ||
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
              }
              alt="User DP"
              className="profile-dp"
            />
            <div className="profile-info">
              <h2>{`${user?.fname} ${user?.lname}`}</h2>
              <p>
                <strong>Bio:</strong> {user?.bio}
              </p>
              <p>
                <strong>Age:</strong> {user?.age}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>Mobile:</strong> {user?.mobile}
              </p>
            </div>
          </div>
          <button
            className="edit-profile-btn"
            onClick={() => handleClickUpdate(user._id)}
          >
            Edit Profile
          </button>
        </div>
        <div>
          <button
            className="logout"
            onClick={() => {
              localStorage.removeItem("token");
              setUser({});
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
        <div className="profile-posts">
          <h3>Posts</h3>
          <div className="posts-container">
            {posts.length > 0 ? (
              posts.map((post) => (
                <>
                  <div
                    key={post._id}
                    className="post-card"
                    onClick={() => handleClick(post._id)} // Trigger onClick to navigate to post details
                  >
                    <p className="post-author">
                      {user.fname} {user.lname}
                    </p>
                    <p className="posted-time">
                      <i>Posted at:</i>{" "}
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                    <p className="post-desc">{post.desc}</p>
                    <img
                      src={post.postImage}
                      alt="Post"
                      className="post-image"
                    />
                    <div className="post-details">
                      <p className="post-likes">
                        <strong>Likes:</strong> {post.likedBy.length}
                      </p>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <p>No posts yet</p>
            )}
          </div>
        </div>

        <div className="profile-networks">
          <h3>Networks</h3>
          {user?.networks && (
            <div className="network-list">
              {user.networks.length > 0 ? (
                user.networks.map((e, i) => (
                  <Link to={`/profiles/${e?._id}`} key={i}>
                    <div className="profile-network-item">
                      <img src={e?.dp} alt={`${e.fname}'s profile`} />
                      <h3>{e.fname}</h3>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No friends added yet</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
