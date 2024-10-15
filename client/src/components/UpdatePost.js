import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../component-styles/Addpost.css';
import { useAuth } from './../context/UserContext';

const UpdatePost = ({status,postId,settest}) => {
  const [modalIsOpen, setModalIsOpen] = useState(status || false);
  const [title, setTitle] = useState('');
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
      formData.append('body', JSON.stringify({ title, desc, uId: user?._id })); // Replace with actual user ID
      if (image) {
        formData.append('image', image);
      }

      const token = localStorage.getItem('token'); // Fetch the token from storage
      await axios.put(`${process.env.REACT_APP_backendPostURL}/updatepost/${postId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
        settest(false)
      setTitle('');
      setDesc('');
      setImage(null);
      closeModal();
      setLoading(false);
      alert('Post updated successfully!');
    } catch (error) {
      console.error('Error adding post:', error);
      setLoading(false);
      alert('Failed to add post. Please try again.');
    }
  };

  return (
   
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="addpost-modal"
        overlayClassName="addpost-modal-overlay"
      >
        {/* Close button (X mark) */}
        <button className="modal-close-btn" onClick={closeModal}>×</button>
        <h2>Update Post</h2>
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
          <div className="form-actions">
            <button type="submit" disabled={loading}>
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      </Modal>
   
  );
};

export default  UpdatePost 
