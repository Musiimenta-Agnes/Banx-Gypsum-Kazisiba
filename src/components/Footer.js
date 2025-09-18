import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Footer.css';
import useContactInfo from '../dashboard/components/UseContactInfo';

function OurFooter() {
  const contact = useContactInfo();


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
    Email: info@banxgypsum.com
  </p>

  <div className="d-md-flex mt-2">
    <a href="https://www.facebook.com/banxgypsum" target="_blank" rel="noopener noreferrer">
      <i className="bi bi-facebook icon me-2 text-white"></i>
    </a>
    <a href="https://www.instagram.com/banxgypsum" target="_blank" rel="noopener noreferrer">
      <i className="bi bi-instagram icon me-2 text-white"></i>
    </a>
    <a href="https://twitter.com/banxgypsum" target="_blank" rel="noopener noreferrer">
      <i className="bi bi-twitter icon me-2 text-white"></i>
    </a>
    <a href="https://www.linkedin.com/company/banxgypsum" target="_blank" rel="noopener noreferrer">
      <i className="bi bi-linkedin icon me-2 text-white"></i>
    </a>
  </div>
</div>



          <div className="col">
            <h5 style={{ padding: '6px', color: 'Orange' }}><b>Quick links</b></h5>
            <ul className="ul-links">
              <li><Link to="/" className="footer-links">Home</Link></li> <br/>
              <li><Link to="/about" className="footer-links">About</Link></li> <br/>
              <li><Link to="/stores" className="footer-links">Our Projects</Link></li>
            </ul>
          </div>

          <div className="col">
            <h5 style={{ padding: '6px', color: 'Orange' }}><b>Quick links</b></h5>
            <ul className="ul-links">
              <li><Link to="/products" className="footer-links">Gallery</Link></li> <br/>
              <li><Link to="/contact" className="footer-links">Contact Us</Link></li> <br/>
    
            </ul>
          </div>

          <div className="col">
            <h5 style={{ padding: '6px', color: 'Orange' }}><b>Business Hours</b></h5>
            <p style={{ color: 'white' }}>Monday - Saturday</p>
            <p style={{ color: 'white' }}>8:00am - 6:00pm</p>
            <ul className="ul-links">

            </ul>
          </div>
        </div>

        <hr />
{/* <p className="text-center" style={{ color: 'white' }}>
  <b>About Banx Gypsum:</b> Delivering premium gypsum construction and interior finishing services across Uganda — trusted by homeowners, builders, and commercial developers.
</p> */}

<div >
  <b>&copy; 2025 Banx Gypsum Limited. All rights reserved.</b>
</div>
      </div>
    </footer>
  );
}

export default OurFooter;





// import React from 'react'
// import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import './Footer.css'


// function OurFooter (){
//     return (
        
        
// <footer className="footer">

// <div className='container-fluid'>
//     <div className="row">
//         <div className="col">
//            <b> <h5 style={{padding: '6px 6px',  color:'Orange'}}>Contact Info</h5></b>
            
//                 <p style={{color:'white'}}>Location: Namuwongo Road Kampala</p> <br/> 
//                 <p style={{color:'white'}} > Phone:  +(256) 789902061</p><br/>
//                 <p style={{color:'white'}} > Email: okuosigypsum2022@gmail.com</p>

             
//         </div>

//         <div className="col">
//             <b><h5 style={{padding: "6px 6px", color:'Orange'}}>Quick links</h5></b>
//             <ul className='ul-links'>

//               <li><Link to="/" className="footer-links">Home</Link></li> <br/>
//               <li><Link to="/about" className="footer-links">About</Link></li> <br/>
//               <li><Link to="/products" className="footer-links">All Products</Link></li>
              
//             </ul>
//         </div>

//         <div className="col">
//             <b><h5 style={{padding: "6px 6px", color:'Orange'}}>Quick links</h5></b>

//             <ul className='ul-links'>
//               <li> <Link to="/stores" className='footer-links' > Stores</Link> </li> <br/>
//               <li> <Link to="/contact" className='footer-links'> Contact Us</Link> </li> <br/>
//               <li> <Link to="/signup" className='footer-links'> Sign Up</Link> </li>
//             </ul>
//         </div>


//         <div className="col">
//              <b><h5 style={{padding: '6px 6px', color:'Orange'}}>Business Hours</h5></b>
//              <p style={{color:'white'}}>Monday - Saturday</p> <br/>
//              <p style={{color:'white'}}>8:00am - 6:00pm</p>
//        <ul className='ul-links'>
//          <li> <Link to="/directions" className='footer-links'> Directions
//                 <span>  
//                   <i className="bi bi-geo-alt " style={{ marginRight: '8px', color: 'white' }} ></i>
//                 </span>
//             </Link>
//           </li> 
//        </ul>

//         </div>
//     </div>
    
//     <hr/>
// <b><p style={{padding: '6px 6px', textAlign: 'center', color:'white'}}>About Okuosi Gypsum: Supplying quality gypsum products across Uganda — trusted by builders, engineers, and homeowners.</p></b> 
// <div style={{display:'flex', backgroundColor:'rgb(239, 99, 6)', justifyContent: 'center', color:'white', height:'100%',  width:'100%'}}>
// <b><p>&copy; 2025 Okuosi Gypsum Limited. All rights reserved.</p></b>
// </div>
 


// </div>
// </footer>
//     );
// }

// export default OurFooter;