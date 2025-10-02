import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import { Carousel, Button } from "bootstrap/dist/js/bootstrap.bundle.min";
import './HeroSection.css'
import './Header.css';
import Projects from "../pages/Projects";




import './HeroSection.css'
import './Header.css';

const images = [
  // "/images/neon-robot-vacuum-cleaner (1).jpg",
  "/images/modern-kitchen-interior-design.jpg",
   "/images/neon-robot-vacuum-cleaner.jpg",
   "/images/3d-rendering-white-wood-living-room-near-bedroom-upstair.jpg",
   "/images/corridol.jpeg",
   "/images/sitting.jpeg"

]; 

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
    <div className="hero-container">
      {/* Background Slideshow */}
      <div className="background-slider">
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="slide"
            style={{ backgroundImage: `url(${img})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            transition={{ duration: 1.5 }}
          />
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="dark-overlay"></div>

      {/* Text Content */}
      <div className="hero-content">

        <h3 className="subtitle"> Interior finishing, and customized design solutions </h3>
                <h1 className="title">Banx Gypsum</h1>
        <h1 className="title">Kazisiba</h1>

       <div style={{display:'flex', justifyContent:'center'}}>
        <button className="button"><Link className="button" to="/completed-projects">View More Of Our Projects</Link></button>

       </div>
     
      </div>
 
    </div>

    <br/>
    <h1 className="heading" style={{textAlign:'center'}} >What Banx Gypsum Does</h1>
    <p style={{textAlign:'center', width:'100%'}}>Banx Gypsum specializes in construction, interior finishing, and customized design solutions using high-quality gypsum products.
       With years of hands-on experience, we provide exceptional services that include elegant ceiling installations, 
       stylish wall partitions, decorative moldings, and bespoke interior designs. Our team works closely with clients
        to understand their vision and transform spaces into functional, aesthetically pleasing environments.
         Whether it is a residential home, commercial office, or industrial facility,
          we ensure that every project is completed with precision, durability, and attention to detail, 
          reflecting our commitment to excellence and customer satisfaction.</p>


         <br/>

        <Projects/>


       <div style={{display:'flex', justifyContent:'center'}}>
        <button className="button"><Link className="button" to="/completed-projects">Explore more designs</Link></button>

       </div>

       <br/> <br/>
    </div>
  );
}





// import React from "react";
// import { Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// // import { Carousel, Button } from "bootstrap/dist/js/bootstrap.bundle.min";
// import './HeroSection.css'
// import './Header.css';
// import { Button, Carousel } from 'react-bootstrap';
// import AboutUs from "../pages/About";
// import Projects from "../pages/Projects";






// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { useEffect } from 'react';


// function HeroSection() {



//     useEffect(() => {
//       AOS.init({
//         duration: 800,  // animation duration
//         easing: 'ease-in-out', 
//         once: true,     // animate only once
//       });
//     }, []);
//   return (
//     <div className="hero-wrapper position-relative">
//       <Carousel 
//         fade controls={true} 
//         indicators={true} 
//         interval={4000} 
//         pause={true} 
//         className="hero-carousel">

//         {/* Slide 1 */}
         
//             <Carousel.Item>
//           <div className="hero-slide zoom-slide" 
//           style={{ backgroundImage: "url('/images/futuristic-kitchen-interior-design.jpg')" }}>
//             {/* <div className="overlay" /> */}
           
//             <div className="carousel-caption">
//                <br/><br/>  <br/><br/> <br/><br/>
//               <h1>Welcome to Banx Gypsum Kazisiba </h1>
//               {/* <Button as ={Link} to ="/completed-projects" className="hero-btn" size="lg">View our Projects</Button> */}
//             </div>
//           </div>
//         </Carousel.Item>


//         <Carousel.Item>
//           <div className="hero-slide zoom-slide" 
//           style={{ backgroundImage: "url('/images/neon-robot-vacuum-cleaner (1).jpg')" }}>
//             <div className="overlay" />
//             <div className="carousel-caption">
//               <br/><br/>  <br/><br/> <br/><br/>
//               <h1>Neon Vaccum</h1>
//             </div> 
//           </div>
//         </Carousel.Item>


        
//         {/* Slide 1 */}
         
//             <Carousel.Item>
//           <div className="hero-slide zoom-slide" 
//           style={{ backgroundImage: "url('/images/modern-kitchen-interior-design.jpg')" }}>
//              <div className="overlay" /> 
//               <div className="carousel-caption">
//                 <br/><br/>  <br/><br/> <br/><br/>
//               <h1>Design with the Experts</h1>
//             </div>
    
//           </div>
//         </Carousel.Item>



//         {/* Slide 3 */}
      

//                 <Carousel.Item>
//           <div className="hero-slide zoom-slide" 
//           style={{ backgroundImage: "url('/images/WhatsApp Image 2025-09-22 at 10.10.50 AM (1).jpeg')"}}>
//            <div className="overlay" />
//             <div className="carousel-caption">
//                 <br/><br/>  <br/><br/> <br/><br/>
//               <h1>Design with Banx Kazisiba</h1>
//             </div>
//           </div>
//         </Carousel.Item>



//         {/* Slide 2 */}
//         <Carousel.Item>
//           <div 
//           className="hero-slide zoom-slide" 
//           style={{ backgroundImage: "url('/images/3d-rendering-white-wood-living-room-near-bedroom-upstair.jpg')" }}>
//              <div className="overlay" />
//             <div className="carousel-caption">
//                 <br/><br/>  <br/><br/> <br/><br/>
//               <h1>Our Finished Work </h1>
          
//               <div className="d-flex justify-content-center gap-3 mt-3">
//               </div>
//             </div> 
//           </div>
//         </Carousel.Item>



//                         <Carousel.Item>
//           <div className="hero-slide zoom-slide" 
//           style={{ backgroundImage: "url('/images/WhatsApp Image 2025-09-22 at 10.10.49 AM (1).jpeg')"}}>
//             <div className="overlay" />
//             <div className="carousel-caption">
//                 <br/><br/>  <br/><br/> <br/><br/>
//               <h1>Design with the Experts</h1>
//             </div> 
//           </div>
//         </Carousel.Item>
       

//       </Carousel>


// <br/><br/>

// <AboutUs/>

// <br/><br/>

//  <div className="projects-container">
//       <h1 className="projects-title">Our Projects</h1>

//       <div className="projects-grid">
//         {/* Row 1 - Images */}
//         <div className="project-card">
//           <img src="/images/modern-kitchen-interior-design.jpg" alt="Project 1" className="project-img" />
//           <div className="project-desc">
//             <h3>Modern Kitchen</h3>
//             <p>We have mad this kitchen.</p>
//           </div>
//         </div>

//         <div className="project-card">
//           <img src="/images/3d-rendering-white-wood-living-room-near-bedroom-upstair.jpg" alt="Project 2" className="project-img" />
//           <div className="project-desc">
//             <h3>White wood living room</h3>
//             <p>This is a short description of the project shown in the image.</p>
//           </div>
//         </div>

//         {/* Row 2 - Videos */}
//         <div className="project-card">
//           <video className="project-video" controls>
//             <source src="/images/vid one.mp4" type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <div className="project-desc">
//             <h3>Project Title 3</h3>
//             <p>This is a short description of the project shown in the video.</p>
//           </div>
//         </div>

//         <div className="project-card">
//           <video className="project-video" controls>
//             <source src="/images/Video 3.mp4" type="video/mp4" />
//           </video>
//           <div className="project-desc">
//             <h3>Project Title 4</h3>
//             <p>This is a short description of the project shown in the video.</p>
//           </div>
//         </div>

//         {/* Row 3 - More Images */}
//         <div className="project-card">
//           <img src="/images/neon-robot-vacuum-cleaner (1).jpg" alt="Project 4" className="project-img" />
//           <div className="project-desc">
//             <h3>Project Title 6</h3>
//             <p>Description for project 6.</p>
//           </div>
//         </div>

//         <div className="project-card">
//           <video className="project-video" controls>
//             <source src="/images/Video 2.mp4" type="video/mp4" />
//           </video>
//           <div className="project-desc">
//             <h3>Project Title 7</h3>
//             <p>This is a short description of the project shown in the video.</p>
//           </div>
//         </div>

//         <div className="project-card">
//           <img src="/images/futuristic-kitchen-interior-design.jpg" alt="Project 4" className="project-img" />
//           <div className="project-desc">
//             <h3>Kitchen Design</h3>
//             <p>Description for project 6.</p>
//           </div>
//         </div>

//         <div className="project-card">
//           <img src="/images/Project four.jfif" alt="Project 4" className="project-img" />
//           <div className="project-desc">
//             <h3>Project 8</h3>
//             <p>Description for project 6.</p>
//           </div>
//         </div>

//         <div className="project-card">
//           <img src="/images/Project one.jfif" alt="Project 4" className="project-img" />
//           <div className="project-desc">
//             <h3>Project 9</h3>
//             <p>Description for project 6.</p>
//           </div>
//         </div>

//         <div className="project-card">
//           <video className="project-video" controls>
//             <source src="/images/Video 4.mp4" type="video/mp4" />
//           </video>
//           <div className="project-desc">
//             <h3>Project Title 10</h3>
//             <p>This is a short description of the project shown in the video.</p>
//           </div>
//         </div>

//       </div>
//     </div>

// {/* <Projects/> */}



// <div style={{justifyContent:'center', display:'flex'}}>
//                  <div>
//                      <Link to="/completed-projects" className='category-btn' style={{ color: 'white', backgroundColor:'orange', width:'350px', textAlign:'center'}}>View more Projects</Link>
//                  </div>
//             </div>


// <br/><br/>



//     </div>
    
// );
// }
// export default HeroSection;