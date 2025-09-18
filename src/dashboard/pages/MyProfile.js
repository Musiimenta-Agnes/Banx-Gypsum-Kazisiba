// src/pages/MyProfile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos'

const API_URL = process.env.REACT_APP_API_URL;

const MyProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    profile_image: ''
  });
  const [passwords, setPasswords] = useState({ old_password: '', new_password: '' });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProfile();
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch profile');
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Preview the image immediately
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile({ ...profile, profile_image: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', profile.name);
      formData.append('email', profile.email);
      formData.append('phone', profile.phone);
      formData.append('address', profile.address || '');
      formData.append('bio', profile.bio || '');
      if (imageFile) formData.append('profile_image', imageFile);

      await axios.put(`${API_URL}/api/user/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Profile updated successfully');
      fetchProfile();
      setImageFile(null); // clear selected file
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${API_URL}/api/user/profile/password`, passwords, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Password updated successfully');
      setPasswords({ old_password: '', new_password: '' });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4 body" style={{ fontSize:'0.9rem' }}>
      <div className="card shadow-sm p-4">
        <h2 className="mb-4">My Profile</h2>
        <div className="row" data-aos='fade-up'>
          {/* Avatar */}
          <div className="col-md-3 text-center">
            <div className="profile-avatar mb-3" style={{ position: 'relative' }}>
              <img
                src={profile.profile_image?.startsWith('data:') 
                      ? profile.profile_image 
                      : profile.profile_image 
                        ? `${API_URL}${profile.profile_image}` 
                        : '/default-avatar.png'}
                alt="Profile"
                className="rounded-circle border"
                style={{ width: '150px', height: '150px', objectFit: 'cover', cursor: 'pointer' }}
                onClick={() => document.getElementById('profileImageInput').click()}
              />
              <input
                type="file"
                id="profileImageInput"
                style={{ display: 'none' }}
                onChange={handleImageChange}
                accept="image/*"
              />
              <small className="d-block mt-2 text-muted">Click avatar to change</small>
            </div>
          </div>

          {/* Editable Fields */}
          <div className="col-md-9">
            <form onSubmit={handleProfileUpdate}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={profile.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={profile.email || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={profile.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  value={profile.address || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Bio</label>
                <textarea
                  name="bio"
                  className="form-control"
                  rows="3"
                  value={profile.bio || ''}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="order-btn" disabled={loading}>
                {loading ? 'Saving...' : 'Update Profile'}
              </button>
            </form>

            <hr className="my-4" />

            {/* Password Change */}
            <h4>Change Password</h4>
            <form onSubmit={handlePasswordChange}>
              <div className="mb-3">
                <label className="form-label">Old Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwords.old_password}
                  onChange={(e) => setPasswords({ ...passwords, old_password: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwords.new_password}
                  onChange={(e) => setPasswords({ ...passwords, new_password: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="order-btn" disabled={loading}>
                {loading ? 'Updating...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

