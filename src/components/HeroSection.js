
// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import './HeroSection.css'
// import './Header.css';
// import { Button, Carousel } from 'react-bootstrap';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// function HeroSection() {
//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       easing: 'ease-in-out', 
//       once: true,
//     });
//   }, []);

//   return (
//     <div className="hero-wrapper position-relative">
//       <Carousel 
//         fade controls={true} 
//         indicators={true} 
//         interval={60000} 
//         pause={true} 
//         className="hero-carousel"
//       >

//         {/* Slide 1 - Video */}
//         <Carousel.Item>
//           <div className="hero-slide zoom-slide">
//             <video className="hero-video" autoPlay loop muted>
//               <source src="/images/video 5.mp4" type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//             <div className="overlay" />
//             <div className="carousel-caption">
//               <h1>Welcome To Banx Gypsum</h1>
//               <Button as={Link} to="/products" className="hero-btn" size="lg">View our Projects</Button>
//             </div>
//           </div>
//         </Carousel.Item>

//         {/* Slide 2 - Video */}
//         <Carousel.Item>
//           <div className="hero-slide zoom-slide">
//             <video className="hero-video" autoPlay loop muted>
//               <source src="/images/Video 2.mp4" type="video/mp4" />
//             </video>
//             <div className="overlay" />
//             <div className="carousel-caption">
//               <h1>Gypsum Boards All Categories</h1>
//               <Button as={Link} to="/boards" className="hero-btn" size="lg">Explore More</Button>
//             </div>
//           </div>
//         </Carousel.Item>

//         {/* Slide 3 - Video */}
//         <Carousel.Item>
//           <div className="hero-slide zoom-slide">
//             <video className="hero-video" autoPlay loop muted>
//               <source src="/images/Video 3.mp4" type="video/mp4" />
//             </video>
//             <div className="overlay" />
//             <div className="carousel-caption">
//               <h1>Measuring Tapes</h1>
//               <Button as={Link} to="/products" className="hero-btn" size="lg">Buy Now</Button>
//             </div>
//           </div>
//         </Carousel.Item>

//         {/* Slide 4 - Video */}
//         <Carousel.Item>
//           <div className="hero-slide zoom-slide">
//             <video className="hero-video" autoPlay loop muted>
//               <source src="/images/Video 3.mp4" type="video/mp4" />
//             </video>
//             <div className="overlay" />
//             <div className="carousel-caption">
//               <h1>Undercoat All Types</h1>
//               <div className="d-flex justify-content-center gap-3 mt-3">
//                 <Button as={Link} to="/undercoat" className="hero-btn" size="lg">Explore More</Button>
//               </div>
//             </div>
//           </div>
//         </Carousel.Item>

//         {/* Add more video slides here in the same format */}
//       </Carousel>

//       <br />

//       <div style={{ justifyContent: 'center', display: 'flex' }}>
//         <div>
//           <Link to="/stores" className='category-btn' style={{ color: 'white' }}>View our services</Link>
//         </div>
//       </div>

//       <br /><br />
//     </div>
//   );
// }

// export default HeroSection;








import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import { Carousel, Button } from "bootstrap/dist/js/bootstrap.bundle.min";
import './HeroSection.css'
import './Header.css';
import { Button, Carousel } from 'react-bootstrap';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';


function HeroSection() {

    useEffect(() => {
      AOS.init({
        duration: 800,  // animation duration
        easing: 'ease-in-out', 
        once: true,     // animate only once
      });
    }, []);
  return (
    <div className="hero-wrapper position-relative">
      <Carousel 
        fade controls={true} 
        indicators={true} 
        interval={4000} 
        pause={true} 
        className="hero-carousel">

        {/* Slide 1 */}
         
            <Carousel.Item>
          <div className="hero-slide zoom-slide" 
          style={{ backgroundImage: "url('/images/modern-kitchen-interior-design.jpg')" }}>
            <div className="overlay" />
            <div className="carousel-caption">
              <h1> Banx Gypsum Kazisiba View Modern Kitchen</h1>
              <Button as ={Link} to ="/stores" className="hero-btn" size="lg">View our Projects</Button>
            </div>
          </div>
        </Carousel.Item>


        <Carousel.Item>
          <div className="hero-slide zoom-slide" 
          style={{ backgroundImage: "url('/images/neon-robot-vacuum-cleaner (1).jpg')" }}>
            <div className="overlay" />
            <div className="carousel-caption">
              <br/><br/>  <br/><br/> <br/><br/>
              <h1>Neon Vaccum</h1>
            </div>
          </div>
        </Carousel.Item>


        {/* Slide 3 */}
      

                <Carousel.Item>
          <div className="hero-slide zoom-slide" 
          style={{ backgroundImage: "url('/images/image five.jfif')"}}>
            <div className="overlay" />
            <div className="carousel-caption">
                <br/><br/>  <br/><br/> <br/><br/>
              <h1>Design with the Experts</h1>
            </div>
          </div>
        </Carousel.Item>



        {/* Slide 2 */}
        <Carousel.Item>
          <div 
          className="hero-slide zoom-slide" 
          style={{ backgroundImage: "url('/images/3d-rendering-white-wood-living-room-near-bedroom-upstair.jpg')" }}>
            <div className="overlay" />
            <div className="carousel-caption">
                <br/><br/>  <br/><br/> <br/><br/>
              <h1>White Wood Living Room </h1>
          
              <div className="d-flex justify-content-center gap-3 mt-3">
              </div>
            </div>
          </div>
        </Carousel.Item>
       

      </Carousel>


<br/>



<div style={{justifyContent:'center', display:'flex'}}>
                 <div>
                     <Link to="/stores" className='category-btn' style={{ color: 'white,', backgroundColor:'orange'}}>View some of  our projects</Link>
                 </div>
            </div>
<br/><br/>
    </div>
    
);
}
export default HeroSection;