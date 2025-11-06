import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Footer.css';

function OurFooter() {
  return (
    <footer className="footer">
      <div className="container-fluid text-center">
        <div className="row">

          <div className="col">
  <h5 style={{ padding: '6px', color: 'Orange' }}><b>Contact Info</b></h5>
  
  <p style={{ color: 'white' }}>
    <i className="bi bi-geo-alt-fill me-2"></i>
    Location: Industrial Area, Kampala, Uganda
  </p>
  
  <p style={{ color: 'white' }}>
    <i className="bi bi-telephone-fill me-2"></i>
    Phone: +256 740258052
  </p>
  
  <p style={{ color: 'white' }}>
    <i className="bi bi-envelope-fill me-2"></i>
    Email: jimmleevespatrick846@gmail.com
  </p>

  
</div> 


          <div className="col">
            <h5 style={{ padding: '6px', color: 'Orange' }}><b>Quick links</b></h5>
            <ul className="ul-links">
              <li><Link to="/" className="footer-links">Home</Link></li> <br/>
              <li><Link to="/about" className="footer-links">About</Link></li> <br/>
              <li><Link to="/completed-projects" className="footer-links">Our Projects</Link></li>
            </ul>
          </div>

          <div className="col">
            <h5 style={{ padding: '6px', color: 'Orange' }}><b>Quick links</b></h5>
            <ul className="ul-links">
              <li><Link to="/gallery" className="footer-links">Gallery</Link></li> <br/>
              <li><Link to="/contact" className="footer-links">Contact Us</Link></li> <br/>
                <li><Link to="/questions" className="footer-links">FAQuestions</Link></li> <br/>
    
            </ul>
          </div>

          <div className="col">
            <h5 style={{ padding: '6px', color: 'Orange' }}><b>Business Hours</b></h5>
            <p style={{ color: 'white' }}>Monday - Saturday</p>
            <p style={{ color: 'white' }}>8:00am - 6:00pm</p>
              <li style={{listStyle:'none'}}><Link to="/materials" className="footer-links">Materials</Link></li> <br/>
            <ul className="ul-links">

            </ul>
          </div>
        </div>


        

        <hr />
{/* <p className="text-center" style={{ color: 'white' }}>
  <b>About Banx Gypsum:</b> Delivering premium gypsum construction and interior finishing services across Uganda — trusted by homeowners, builders, and commercial developers.
</p> */}

<div >
  <b>&copy; 2025 Banx Gypsum Kazisiba. All rights reserved.</b>
</div>
      </div>
    </footer>
  );
}

export default OurFooter;

