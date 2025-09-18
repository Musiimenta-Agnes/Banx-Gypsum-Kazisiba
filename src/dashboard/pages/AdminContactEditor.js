import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AdminContactEditor = () => {
  const [form, setForm] = useState({
    phone: '',
    email: '',
    whatsapp: '',
    location: '',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: ''
  });

  const [message, setMessage] = useState({ text: '', variant: '' });
  const [reloading, setReloading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });

    const token = localStorage.getItem('token');
    axios.get(`${API_URL}/api/contact/get`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setForm(res.data))
      .catch(err => {
        console.error("Error fetching contact info", err);
        setMessage({ text: '❌ Failed to load contact info', variant: 'danger' });
      });
  }, [API_URL]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', variant: '' });

    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/api/contact/update`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage({ text: 'Contact info updated successfully!', variant: 'success' });

      setForm({
        phone: '',
        email: '',
        whatsapp: '',
        location: '',
        facebook: '',
        instagram: '',
        twitter: '',
        linkedin: ''
      });

      setReloading(true);
      setTimeout(() => window.location.reload(), 3000);
    } catch (error) {
      setMessage({ text: '❌ Failed to update contact info.', variant: 'danger' });
    }
  };

  return (
    <div data-aos="fade-up" className='body' style={{ fontSize: '0.9rem' }}>

      <h3 className='text-primary'
        style={{
          textAlign: 'center',
        
        }}
      >
        Edit Contact Information
      </h3>

<br/>
      {reloading && (
        <div className="text-center mb-3">
          <Spinner animation="border" role="status" />
          <p className="mt-2 fw-bold text-secondary">Reloading...</p>
        </div>
      )}

      <Form
        onSubmit={handleSubmit}
        autoComplete="off"
        style={{
          margin: 'auto',
          backgroundColor: '#FDF5F5',
          padding: '20px',
          borderRadius: '5px',
          width: '90%',
          color: 'black'
        }}
  
      >
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={form.phone}
            readOnly
            onFocus={(e) => e.target.removeAttribute('readOnly')}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>WhatsApp</Form.Label>
          <Form.Control
            type="text"
            name="whatsapp"
            value={form.whatsapp}
            readOnly
            onFocus={(e) => e.target.removeAttribute('readOnly')}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            readOnly
            onFocus={(e) => e.target.removeAttribute('readOnly')}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={form.location}
            readOnly
            onFocus={(e) => e.target.removeAttribute('readOnly')}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* 🔗 Social Media Fields */}
        <Form.Group className="mb-3">
          <Form.Label>Facebook URL</Form.Label>
          <Form.Control
            type="text"
            name="facebook"
            value={form.facebook}
            onChange={handleChange}
            placeholder="https://facebook.com/yourpage"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Instagram URL</Form.Label>
          <Form.Control
            type="text"
            name="instagram"
            value={form.instagram}
            onChange={handleChange}
            placeholder="https://instagram.com/yourpage"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Twitter URL</Form.Label>
          <Form.Control
            type="text"
            name="twitter"
            value={form.twitter}
            onChange={handleChange}
            placeholder="https://twitter.com/yourhandle"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>LinkedIn URL</Form.Label>
          <Form.Control
            type="text"
            name="linkedin"
            value={form.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/company/yourcompany"
          />
        </Form.Group>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="submit" className="order-btn w-50">
            Update Contact Info
          </Button>
        </div>

        {/* Custom styled message below button */}
        {message.text && (
          <div
            className="text-center mt-3"
            style={{
              maxWidth: '700px',
              margin: '0 auto',
              animation: 'fade-in 0.5s ease-in-out',
              backgroundColor: message.variant === 'success' ? '#d4edda' : '#f8d7da',
              color: message.variant === 'success' ? '#155724' : '#721c24',
              fontWeight: '700',
              fontSize: '1.3rem',
              padding: '15px 25px',
              borderRadius: '12px',
              border: message.variant === 'success' ? '2px solid #c3e6cb' : '2px solid #f5c6cb',
              boxShadow: message.variant === 'success'
                ? '0 4px 12px rgba(40, 167, 69, 0.25)'
                : '0 4px 12px rgba(220, 53, 69, 0.25)',
              userSelect: 'none',
              letterSpacing: '0.03em',
            }}
          >
            {message.text}
          </div>
        )}
      </Form>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AdminContactEditor;


// import React, { useState, useEffect } from 'react';
// import { Form, Button, Alert, Spinner } from 'react-bootstrap';
// import axios from 'axios';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const AdminContactEditor = () => {
//   const [form, setForm] = useState({ phone: '', email: '', whatsapp: '', location: '' });
//   const [message, setMessage] = useState({ text: '', variant: '' });
//   const [reloading, setReloading] = useState(false);

//   const API_URL = process.env.REACT_APP_API_URL;

//   useEffect(() => {
//     AOS.init({ duration: 800, easing: 'ease-in-out', once: true });

//     const token = localStorage.getItem('token');
//     axios.get(`${API_URL}/api/contact/get`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then(res => setForm(res.data))
//       .catch(err => {
//         console.error("Error fetching contact info", err);
//         setMessage({ text: '❌ Failed to load contact info', variant: 'danger' });
//       });
//   }, [API_URL]);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage({ text: '', variant: '' });
  
//     try {
//       await axios.put(`${API_URL}/api/contact/update`, form); // ✅ No token
//       setMessage({ text: ' Contact info updated successfully!', variant: 'success' });
  
//       setForm({ phone: '', email: '', whatsapp: '', location: '' });
//       setReloading(true);
//       setTimeout(() => window.location.reload(), 3000);
//     } catch (error) {
//       setMessage({ text: '❌ Failed to update contact info.', variant: 'danger' });
//     }
//   };
  

//   return (
//     <div data-aos="fade-up">
//       <br /><br />
//       <h3 style={{
//         textAlign: 'center',
//         color: 'rgb(10, 10, 87)',
//         textShadow: '0 0 1px rgb(3, 3, 22),  0 0 1px rgb(22, 10, 158)',
//         paddingTop: '35px',
//       }}>
//         Edit Contact Information
//       </h3>

//       {message.text && <Alert variant={message.variant} className="text-center">{message.text}</Alert>}

//       {reloading && (
//         <div className="text-center mb-3">
//           <Spinner animation="border" role="status" />
//           <p className="mt-2 fw-bold text-secondary">Reloading...</p>
//         </div>
//       )}

//       <Form
//         onSubmit={handleSubmit}
//         autoComplete="off"
//         style={{
//           margin: 'auto',
//           backgroundColor: '#FDF5F5',
//           padding: '20px',
//           borderRadius: '5px',
//           width: '700px',
//           color: 'black'
//         }}
//       >
//         <Form.Group className="mb-3">
//           <Form.Label>Phone Number</Form.Label>
//           <Form.Control
//             type="text"
//             name="phone"
//             value={form.phone}
//             readOnly
//             onFocus={(e) => e.target.removeAttribute('readOnly')}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>WhatsApp</Form.Label>
//           <Form.Control
//             type="text"
//             name="whatsapp"
//             value={form.whatsapp}
//             readOnly
//             onFocus={(e) => e.target.removeAttribute('readOnly')}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Email Address</Form.Label>
//           <Form.Control
//             type="email"
//             name="email"
//             value={form.email}
//             readOnly
//             onFocus={(e) => e.target.removeAttribute('readOnly')}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Location</Form.Label>
//           <Form.Control
//             type="text"
//             name="location"
//             value={form.location}
//             readOnly
//             onFocus={(e) => e.target.removeAttribute('readOnly')}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <div style={{ display: 'flex', justifyContent: 'center' }}>
//           <Button type="submit" className=" order-btn w-50" >
//             Update Contact Info
//           </Button>
//         </div>
//       </Form>
//     </div>
//   );
// };

// export default AdminContactEditor;

