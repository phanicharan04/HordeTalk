import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../component-styles/Addpost.css';
import { useAuth } from './../context/UserContext';

const Addpost = ({setsatus,status}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('body', JSON.stringify({ desc, uId: user?._id }));
      if (image) {
        formData.append('image', image);
      }

      const token = localStorage.getItem('token'); // Fetch the token from storage
      await axios.post(`${process.env.REACT_APP_backendPostURL}/addpost`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setsatus(!status)
      setDesc('');
      setImage(null);
      closeModal();
      setLoading(false);
      alert('Post added successfully!');
    } catch (error) {
      console.error('Error adding post:', error);
      setLoading(false);
      alert('Failed to add post. Please try again.');
    }
  };

  return (
    <div className="addpost-container">
      <div className="user-profile">
        <img
          src= { user?.dp ||"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}
          alt="User Avatar"
          className="profile-avatar"
        />
      </div>
      <div className="addpost-input" onClick={openModal}>
        <input type="text" placeholder="What's on your mind? 💡" readOnly />
      </div>

      {/* Modal for adding post */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="addpost-modal"
        overlayClassName="addpost-modal-overlay"
      >
        {/* Close button (X mark) */}
        <button className="modal-close-btn" onClick={closeModal}>×</button>
        <h2>Create Post</h2>
        <form onSubmit={handlePostSubmit}>
          <div className="form-group">
            <label htmlFor="desc">Description</label>
            <textarea
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <input type="file" id="image" onChange={handleImageUpload} />
          </div>
          <div className="form-actions">
            <button type="submit" disabled={loading}>
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Addpost;
