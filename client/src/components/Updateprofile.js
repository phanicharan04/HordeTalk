import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../component-styles/UpdateProfile.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './../context/UserContext';

const UpdateProfile = () => {
    const { user, token } = useAuth();  // Fetch user details and token from useAuth
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        age: '',
        email: '',
        mobile: '',
        bio: '',
        dp: null, // Profile picture (dp) initialized as null
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            // Set form data from user context if user is logged in
            setFormData({
                fname: user.fname || '',
                lname: user.lname || '',
                age: user.age || '',
                email: user.email || '',
                mobile: user.mobile || '',
                bio: user.bio || '',
                dp: null  // DP will be handled separately for file upload
            });
        }
    }, [user]);  // Depend on the `user` object to populate the form data

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, dp: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create form data to send multipart/form-data for image upload
        const data = new FormData();
        data.append('fname', formData.fname);
        data.append('lname', formData.lname);
        data.append('age', formData.age);
        data.append('email', formData.email);
        data.append('mobile', formData.mobile);
        data.append('bio', formData.bio);
        if (formData.dp) {
            data.append('dp', formData.dp);  // Append profile picture if it exists
        }

        try {
            
            await axios.put(`${process.env.REACT_APP_backendUserURL}/updateprofile/${user._id}`, data, {
                headers: {
                    // Add the Authorization header (if token exists)
                    Authorization: `Bearer ${token}`,
                   'Content-Type': 'multipart/form-data',
                    // Do NOT manually set Content-Type for FormData, the browser will handle it
                },
            });
            alert('Profile updated successfully!');
            navigate('/profile');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Profile update failed. Please try again.');
        }
    };

    return (
        <div className="update-profile-container">
            <h1 className="logo">HordeTalk</h1>
            <h2>Update Your Profile</h2>
            <form className="update-profile-form" onSubmit={handleSubmit}>
                <div className="input-row">
                    <input
                        type="text"
                        id="fname"
                        placeholder="First name"
                        value={formData.fname}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        id="lname"
                        placeholder="Surname"
                        value={formData.lname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <textarea
                    id="bio"
                    placeholder="Short bio"
                    value={formData.bio}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    id="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    id="mobile"
                    placeholder="Mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    id="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="file"
                    id="dp"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <button type="submit" className="update-profile-button">Update Profile</button>
            </form>
        </div>
    );
};

export default UpdateProfile;
