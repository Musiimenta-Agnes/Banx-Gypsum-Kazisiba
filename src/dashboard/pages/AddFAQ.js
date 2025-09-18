import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = process.env.REACT_APP_API_URL;

const AddFAQ = () => {
  const [formData, setFormData] = useState({
    title: '',
    faqs: [['', '']],
  });

  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/questions/get_faqs`);
      setFormData(res.data);
    } catch (err) {
      console.error(err);
      setMessage({ text: 'Failed to load FAQs', type: 'error' });
    }
  };

  const handleFAQChange = (index, field, value) => {
    const newFaqs = [...formData.faqs];
    newFaqs[index][field === 'question' ? 0 : 1] = value;
    setFormData({ ...formData, faqs: newFaqs });
  };

  const addFAQ = () => {
    setFormData({ ...formData, faqs: [...formData.faqs, ['', '']] });
  };

  const removeFAQ = (index) => {
    const newFaqs = formData.faqs.filter((_, i) => i !== index);
    setFormData({ ...formData, faqs: newFaqs });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // prevent form submission on Enter
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' }); // clear previous message
    try {
      const token = localStorage.getItem('token'); // adjust if you store token elsewhere
      await axios.put(`${API_URL}/api/questions/update_faqs`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage({ text: 'FAQs updated successfully!', type: 'success' });
    } catch (err) {
      console.error(err);
      setMessage({ text: 'Update failed. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="container body" style={{ fontSize: '0.9rem' }}>
      <h2 className="text-primary text-center">Edit FAQs</h2>
      <form onSubmit={handleSubmit} data-aos="fade-up">
        <div className="mb-3">
          <label style={{ fontWeight: 'bold', fontSize: '1.1rem', textAlign: 'center' }}>Section Title</label>
          <textarea
            className="form-control"
            rows={2}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="mb-4">
          <label>
            <strong>FAQ List:</strong>
          </label>
          {formData.faqs.map((faq, index) => (
            <div key={index} className="d-flex align-items-center gap-2 mb-2">
              <textarea
                placeholder="Question"
                className="form-control"
                rows={2}
                value={faq[0]}
                onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <textarea
                placeholder="Answer"
                className="form-control"
                rows={2}
                value={faq[1]}
                onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removeFAQ(index)}
                style={{ height: 'fit-content' }}
              >
                X
              </button>
            </div>
          ))}
          <button type="button" className="btn  mt-2" onClick={addFAQ}>
            Add New FAQ
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button type="submit" className="order-btn w-50">
            Update FAQs
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

export default AddFAQ;
