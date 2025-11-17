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
  const [contact, setContact] = useState({
    phone: '',
    email: '',
    whatsapp: '',
    location: ''
  });

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });

    fetch(`${API_URL}/api/contact/get`)
      .then(res => res.json())
      .then(data => setContact(data))
      .catch(err => console.error("Failed to fetch contact info", err));
  }, []);

  return (
    <div className="container my-5">
      <div className="row mb-4">
        {/* Contact Card */}
        <div className="col-12" data-aos="fade-up">
          <div
            className="card shadow mb-4 d-flex justify-content-center align-items-center"
            style={{
              borderRadius: '15px',
              backgroundColor: '#f4f7fdff',
              color: 'black',
              height: '360px', // same as map height
              textAlign: 'center',
              padding: '0',
              width:'100%',
           
            }}
          >
            <div
              className="d-flex flex-column justify-content-center align-items-center h-100 p-4"
            >
              <h4 className="card-title mb-4" style={{ color: 'orange', fontWeight: 'bold' }}>
                Contact Information
              </h4>
              <p className="mb-2">
                <i className="bi bi-geo-alt-fill me-2"></i>
                {contact.location || 'Industrial Area, Kampala, Uganda'}
              </p>
              <br/>
              <p className="mb-2">
                <i className="bi bi-telephone-fill me-2"></i>
                {contact.phone || '+256 740258052'}
              </p>
               <br/>
              <p className="mb-2">
                <i className="bi bi-envelope-fill me-2"></i>
                {contact.email || 'info@banxgypsum.com'}
              </p>
               <br/>
              <p className="mb-2">
                <i className="bi bi-whatsapp me-2"></i>
                {contact.whatsapp || '+256 740258052'}
              </p>

            
            </div>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="row">
        <div className="col-12" data-aos="fade-up">
          <h4 className="text-center mb-3" style={{ fontWeight: 'bold' }}>Our Location</h4>
          <div style={{ border: '2px solid #ccc', borderRadius: '15px', overflow: 'hidden', height: '360px', width:'100%', margin:'auto' }}>
            <iframe
              title="Okuosi Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7582463365266!2d32.593862273958386!3d0.31441619968248674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbc77b307f133%3A0x44050e56f2a2788d!2sEighth%20St%2C%20Kampala!5e0!3m2!1sen!2sug!4v1758201304099!5m2!1sen!2sug"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;




