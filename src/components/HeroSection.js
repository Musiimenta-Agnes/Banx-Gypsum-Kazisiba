import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AboutUs from "../pages/About.js"
import FAQPage from "../pages/Questions.js"
import ContactUs from "../pages/Contact.js";



import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import { Carousel, Button } from "bootstrap/dist/js/bootstrap.bundle.min";
import './HeroSection.css'
import './Header.css';
// import Projects from "../pages/Projects";




import './HeroSection.css'
import './Header.css';

const images = [
  // "/images/neon-robot-vacuum-cleaner (1).jpg",
  "/images/luxury.jpg",
   "/images/siting2.jpg",
   "/images/sitting1.jpg",
   "/images/kitchen.jpeg",
   "/images/0c70f62259e753379958cb940e89e1e2.jpg"

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
    <p style={{textAlign:'left', width:'100%'}}>Banx Gypsum specializes in construction, interior finishing, and customized design solutions using high-quality gypsum products.
       With years of hands-on experience, we provide exceptional services that include elegant ceiling installations, 
       stylish wall partitions, decorative moldings, and bespoke interior designs. Our team works closely with clients
        to understand their vision and transform spaces into functional, aesthetically pleasing environments.
         Whether it is a residential home, commercial office, or industrial facility,
          we ensure that every project is completed with precision, durability, and attention to detail, 
          reflecting our commitment to excellence and customer satisfaction.</p>


         <br/>

        {/* <Projects/> */}
        <h1 className="heading" style={{textAlign:'center'}}>Sittingroom Designs</h1>


<br/>
        <div style={{display:'flex', justifyContent:'center'}}>
          <div className="project-card">
            <img src="/images/neon-robot-vacuum-cleaner (1).jpg" alt="image1"  className="project-img"/>
          </div>

<br/>
         <div className="project-card">
            <img src="/images/3d-rendering-white-wood-living-room-near-bedroom-upstair.jpg" alt="image1"  className="project-img"/>
          </div>
        </div>

<br/>



<br/>
        <div style={{display:'flex', justifyContent:'center'}}>
          <div className="project-card">
            <img src="/images/0c70f62259e753379958cb940e89e1e2.jpg" alt="image1"  className="project-img"/>
          </div>

<br/>
         <div className="project-card">
            <img src="/images/5368ed508ceab9ffe36bae957ab479e8.jpg" alt="image1"  className="project-img"/>
          </div>
        </div>

<br/>









        <div style={{display:'flex', justifyContent:'center'}}>
          <div className="project-card">
            <img src="/images/3d-rendering-modern-dining-room-living-room-with-luxury-decor.jpg" alt="image1"  className="project-img"/>
          </div>

<br/>
         <div className="project-card">
            <img src="/images/videoframe_4594.png" alt="image1"  className="project-img"/>
          </div>
        </div>


<br/> <br/>


        {/* <Projects/> */}
        <h1 className="heading" style={{textAlign:'center'}}>Bedroom Designs</h1>




<br/>
        <div style={{display:'flex', justifyContent:'center'}}>
          <div className="project-card">
            <img src="/images/bed1.jpg" alt="image1"  className="project-img"/>
          </div>

<br/>
         <div className="project-card">
            <img src="/images/bed2.jpg" alt="image1"  className="project-img"/>
          </div>
        </div>

<br/>



<br/>
        <div style={{display:'flex', justifyContent:'center'}}>
          <div className="project-card">
            <img src="/images/siting2.jpg" alt="image1"  className="project-img"/>
          </div>

<br/>
         <div className="project-card">
            <img src="/images/3d-rendering-classic-interior.jpg" alt="image1"  className="project-img"/>
          </div>
        </div>

<br/>




        <div style={{display:'flex', justifyContent:'center'}}>
          <div className="project-card">
            <img src="/images/bed3.jpg" alt="image1"  className="project-img"/>
          </div>

<br/>
         <div className="project-card">
            <img src="/images/bed4.jpg" alt="image1"  className="project-img"/>
          </div>
        </div>



       <div style={{display:'flex', justifyContent:'center'}}>
        <button className="button"><Link className="button" to="/completed-projects">Explore more designs</Link></button>

       </div>



       <br/> <br/>

       <AboutUs/>

           

       <FAQPage/>

      <br/> <br/>

      <h3 style={{textAlign:'center',color:'rgb(12, 67, 134)'}}>Reach out to us via this contact information</h3>

       <ContactUs/>
    </div>
  );
}

