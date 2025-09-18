import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const API_URL = process.env.REACT_APP_API_URL;

const AdminEditAbout = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mission: '',
    image_url: '',
    points: [['', '']],
  });

  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/about/get_about`);
      setFormData(res.data);
    } catch (err) {
      console.error(err);
      setMessage({ text: 'Failed to load about content', type: 'error' });
    }
  };

  const handlePointChange = (index, field, value) => {
    const newPoints = [...formData.points];
    newPoints[index][field === 'title' ? 0 : 1] = value;
    setFormData({ ...formData, points: newPoints });
  };

  const addPoint = () => {
    setFormData({ ...formData, points: [...formData.points, ['', '']] });
  };

  const removePoint = (index) => {
    const newPoints = formData.points.filter((_, i) => i !== index);
    setFormData({ ...formData, points: newPoints });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    const form = new FormData();
    form.append('image', imageFile);

    try {
      const res = await axios.post(`${API_URL}/api/about/about_upload-image`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage({ text: 'Image uploaded successfully', type: 'success' });
      return res.data.image_url;
    } catch (err) {
      console.error(err);
      setMessage({ text: 'Image upload failed', type: 'error' });
      return null;
    }
  };

  // Prevent form submit on Enter in textareas; allow Shift+Enter for new lines
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    let newImageUrl = formData.image_url;
    if (imageFile) {
      const uploadedUrl = await uploadImage();
      if (uploadedUrl) {
        newImageUrl = uploadedUrl;
      }
    }

    try {
      await axios.put(`${API_URL}/api/about/update_about`, {
        ...formData,
        image_url: newImageUrl,
      });
      setMessage({ text: 'About page updated successfully!', type: 'success' });
      setImageFile(null);
      setFormData((prev) => ({ ...prev, image_url: newImageUrl }));
    } catch (err) {
      console.error(err);
      setMessage({ text: 'Update failed. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="container body" style={{ fontSize: '0.9rem' }}>
      <h2 className="text-primary text-center">Edit About Us Content</h2>
      <form onSubmit={handleSubmit} data-aos="fade-up" style={{ fontSize: '0.9rem' }}>

        <div className="mb-3">
          <label style={{ fontWeight: 'bold', fontSize: '1.1rem', textAlign: 'center' }}>Title (e.g. Our Mission)</label>
          <textarea
            className="form-control"
            rows={2}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="mb-3">
          <label style={{ fontWeight: 'bold', fontSize: '1.1rem', textAlign: 'center' }}>Main Description</label>
          <textarea
            className="form-control"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="mb-3">
          <label style={{ fontWeight: 'bold', fontSize: '1.1rem', textAlign: 'center' }}>Mission Statement</label>
          <textarea
            className="form-control"
            rows={3}
            value={formData.mission}
            onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="mb-3">
          <label style={{ fontWeight: 'bold', fontSize: '1.1rem', textAlign: 'center' }}>Logo/Image Upload</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
          />
          {formData.image_url && (
            <div className="mt-3">
              <img
                src={`${API_URL}${formData.image_url}`}
                alt="Preview"
                style={{ maxWidth: '200px', borderRadius: '8px' }}
              />
            </div>
          )}
        </div>

        <div className="mb-4">
          <label><strong>Why Choose Us Points:</strong></label>
          {formData.points.map((point, index) => (
            <div key={index} className="d-flex align-items-center gap-2 mb-2">
              <textarea
                placeholder="Title"
                className="form-control"
                rows={2}
                value={point[0]}
                onChange={(e) => handlePointChange(index, 'title', e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <textarea
                placeholder="Description"
                className="form-control"
                rows={2}
                value={point[1]}
                onChange={(e) => handlePointChange(index, 'desc', e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removePoint(index)}
                style={{ height: 'fit-content' }}
              >
                X
              </button>
            </div>
          ))}
          <button type="button" className="btn btn-info mt-2" onClick={addPoint}>
            Add New Point
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button type="submit" className="order-btn w-50">
            Update About Page
          </button>

          {message.text && (
            <div
              style={{
                marginTop: '15px',
                padding: '15px 25px',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '18px',
                color: message.type === 'success' ? '#155724' : '#721c24',
                backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
                border: `1.5px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
                boxShadow:
                  message.type === 'success'
                    ? '0 4px 8px rgba(40, 167, 69, 0.2)'
                    : '0 4px 8px rgba(220, 53, 69, 0.2)',
                maxWidth: '400px',
                textAlign: 'center',
                userSelect: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              {message.text}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminEditAbout;

