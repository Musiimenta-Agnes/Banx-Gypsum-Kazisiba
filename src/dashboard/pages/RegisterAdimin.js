import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

const API_URL = process.env.REACT_APP_API_URL;

const AddUser = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    admin_code: ''
  });

  const [loading, setLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSecretCode, setShowSecretCode] = useState(false);
  const [message, setMessage] = useState({ text: '', variant: '' });
  const [pending, setPending] = useState(false); // for submit loading
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setShowSpinner(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
    checkIfAdmin();
  }, []);

  const checkIfAdmin = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAuthorized(!!res.data?.is_admin);
    } catch (err) {
      console.error('Admin check failed', err);
      setAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For phone input, validate digits and length
    if (name === 'phone') {
      // Allow only digits
      if (/^\d*$/.test(value)) {
        setForm((prev) => ({ ...prev, [name]: value }));

        if (value.length !== 10) {
          setPhoneError('Phone number must be exactly 10 digits');
        } else {
          setPhoneError('');
        }
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', variant: '' });

    // Validate phone before submit
    if (form.phone.length !== 10) {
      setPhoneError('Phone number must be exactly 10 digits');
      return;
    }

    setPending(true);

    try {
      const payload = {
        ...form,
        admin_code: isAdmin ? form.admin_code.trim() : ''
      };

      await axios.post(`${API_URL}/api/user/signup`, payload);
      setMessage({ text: 'User added successfully!', variant: 'success' });

      setForm({ name: '', phone: '', email: '', password: '', admin_code: '' });
      setIsAdmin(false);
      setPhoneError('');
    } catch (err) {
      const errorMsg = err.response?.data?.error || '❌ Error adding user.';
      setMessage({ text: errorMsg, variant: 'danger' });
    } finally {
      setPending(false);
    }
  };

  if (loading && showSpinner) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!loading && !authorized) {
    return (
      <div className="text-center mt-5">
        <h4 className="text-danger">❌ Access Denied: Admins Only</h4>
      </div>
    );
  }

  return (
    <div className='body' style={{  fontSize:'0.9rem' }}>
     
      <h3 className="text-center text-primary" >Register Admin </h3> 
      <br/>
      
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
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            autoComplete="off"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readOnly')}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={form.phone}
            autoComplete="off"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readOnly')}
            onChange={handleChange}
            isInvalid={!!phoneError}
            required
          />
          <Form.Control.Feedback type="invalid">{phoneError}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            autoComplete="off"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readOnly')}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              autoComplete="new-password"
              readOnly
              onFocus={(e) => e.target.removeAttribute('readOnly')}
              onChange={handleChange}
              required
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
            </Button>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Register as Admin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </Form.Group>

        {isAdmin && (
          <Form.Group className="mb-3">
            <Form.Label>Admin Secret Code</Form.Label>
            <InputGroup>
              <Form.Control
                type={showSecretCode ? 'text' : 'password'}
                name="admin_code"
                value={form.admin_code}
                autoComplete="off"
                readOnly
                onFocus={(e) => e.target.removeAttribute('readOnly')}
                onChange={handleChange}
                required
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowSecretCode(!showSecretCode)}
              >
                <i className={`bi ${showSecretCode ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </Button>
            </InputGroup>
          </Form.Group>
        )}

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type="submit"
            className="order-btn w-50"
            disabled={pending || !!phoneError}
          >
            {pending ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Registering...
              </>
            ) : (
              'Register Admin'
            )}
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

export default AddUser;


