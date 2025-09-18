import { useState, useEffect } from 'react';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Contact.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const API_URL = process.env.REACT_APP_API_URL;

function ContactUs() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState(null); // ✅ make it an object {type, text}
  const [loading, setLoading] = useState(false);
  const [ setContact] = useState({
    phone: '',
    email: '',
    whatsapp: '',
    location: ''
  });
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });

    fetch(`${API_URL}/api/contact/get`)
      .then(res => res.json())
      .then(data => setContact(data))
      .catch(err => console.error("Failed to fetch contact info", err));
  }, []);

  // Validate phone on change
  const handlePhoneChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setPhone(val);
      if (val.length !== 10) {
        setPhoneError('Phone number must be exactly 10 digits');
      } else {
        setPhoneError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      setPhoneError('Phone number must be exactly 10 digits');
      return;
    }

    const formData = { name, phone, subject, message };

    setLoading(true);
    setResponseMessage(null);

    try {
      const res = await fetch(`${API_URL}/api/direct_order/send-contact-sms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setResponseMessage({
          type: 'success',
          text: '✅ Thank you for supporting Okuosi! Order placed successfully.'
        });
        setName('');
        setPhone('');
        setSubject('');
        setMessage('');
      } else {
        setResponseMessage({
          type: 'error',
          text: '❌ Error while sending order. Please try again.'
        });
      }
    } catch (error) {
      console.error(error);
      setResponseMessage({
        type: 'error',
        text: '❌ Network error. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

   
      {responseMessage && (
        <div
          className={`toast align-items-center text-white ${
            responseMessage.type === 'success' ? 'bg-success' : 'bg-danger'
          } show position-fixed top-0 end-0 m-3`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{ zIndex: 1055 }}
        >
          <div className="d-flex">
            <div className="toast-body">
              {responseMessage.text}
            </div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={() => setResponseMessage(null)}
            ></button>
          </div>
        </div>
      )}

      <div className='row'>
        <div className="col-12 col-md-6">
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
            <h4 style={{ fontWeight: 'bold' }}>Lets Get in touch:</h4>
          </div>

          <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto' }} className='contact-form' data-aos="fade-left">
            <div className="form-group mb-3">
              <label>Full Name:</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="form-group mb-3">
              <label>Phone Number:</label>
              <input
                type="tel"
                className={`form-control ${phoneError ? 'is-invalid' : ''}`}
                value={phone}
                onChange={handlePhoneChange}
                required
              />
              {phoneError && <div className="invalid-feedback">{phoneError}</div>}
            </div>

            <div className="form-group mb-3">
              <label>Subject:</label>
              <input type="text" className="form-control" placeholder="" value={subject} onChange={(e) => setSubject(e.target.value)} required />
            </div>

            <div className="form-group mb-3">
              <label>Message</label>
              <textarea className="form-control" rows="4" placeholder="" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="submit-btn"
                style={{ width: '50%', padding: '10px', color: 'white', border: 'none' }}
                disabled={loading || !!phoneError}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info */}
        <div className="col-12 col-md-6">
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
            <h4 style={{ fontWeight: 'bold' }}>Our Location:</h4>
          </div>
          <div style={{ height: '30px', border: '2px solid #ccc' }}>


            <iframe 
              title="Okuosi Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7582463365266!2d32.593862273958386!3d0.31441619968248674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbc77b307f133%3A0x44050e56f2a2788d!2sEighth%20St%2C%20Kampala!5e0!3m2!1sen!2sug!4v1758201304099!5m2!1sen!2sug"
              width="100%"
              height="360px"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
<br/><br/><br/>
    </div>
  );
}

export default ContactUs;
