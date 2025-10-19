import React, { useEffect } from "react";
import "../styles/About.css";
import Aos from "aos";
import "aos/dist/aos.css";

function AboutUs() {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      className="about-us-container"
      style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}
    >


       <br/>
            <h1 style={{textAlign:'center', color:'rgb(12, 67, 134)'}}>Our Mission</h1>
            <p style={{width:'100%'}}>Our mission at Banx Gypsum Kazisiba is to transform spaces through innovative, 
              high-quality gypsum and interior design solutions. We are committed to delivering
               exceptional craftsmanship, durable finishes, and elegant designs that enhance the beauty, 
               comfort, and functionality of every environment we work on.
               Guided by professionalism, integrity, and customer satisfaction, we strive to set 
               new standards in the construction and finishing industry—turning our clients’ visions into lasting realities.</p>

               <br/>
      {/* Row 1 */}
      <div className="about-row">
          <div className="project-card">
            <img src="/images/3d-rendering-white-wood-living-room-near-bedroom-upstair.jpg" alt="image1"  className="project-img"/>
          </div>
        <div className="about-text" data-aos="fade-up">
          <h2>Professional Gypsum Services</h2>
          <p style={{textAlign:'left'}}>
            Banx Gypsum specializes in construction, interior finishing,
            and customized design solutions using high-quality gypsum products.
            With years of hands-on experience, we provide exceptional services
            that include elegant ceiling installations, stylish wall partitions,
            decorative moldings, and bespoke interior designs. Our team works
            closely with clients to understand their vision and transform spaces
            into functional, aesthetically pleasing environments. Whether it is a
            residential home, commercial office, or industrial facility, we ensure
            that every project is completed with precision, durability, and
            attention to detail, reflecting our commitment to excellence and
            customer satisfaction.
          </p>
        </div>


      </div>


  


        <div style={{display:'flex', justifyContent:'center'}}>
          <div className="">
           
          </div>
        </div>

      {/* Row 2 */}
      <div className="about-row reverse">
        <div className="about-image" data-aos="fade-up">
          <img src="/images/image-four.jfif" alt="Gypsum Work 2" />
        </div>
        <div className="about-text" data-aos="fade-up">
          <h2>Customized Interior Designs</h2>
          <p>
            We provide tailored gypsum solutions to match your style and space,
            ensuring both aesthetic appeal and structural durability in every
            project.
          </p>
        </div>
      </div>

      {/* Row 3 */}
      <div className="about-row">
        <div className="about-image" data-aos="fade-up">
          <img src="/images/image-five.jfif" alt="Gypsum Work 3" />
        </div>
        <div className="about-text" data-aos="fade-up">
          <h2>Experienced Team</h2>
          <p>
            Our skilled team of professionals brings years of experience in
            gypsum installations, delivering projects on time with precision and
            excellence.
          </p>
        </div>
      </div>

      {/* Row 4 */}
      <div className="about-row reverse">
        <div className="about-image" data-aos="fade-up">
          <img
            src="/images/neon-robot-vacuum-cleaner (1).jpg"
            alt="Gypsum Work 4"
          />
        </div>
        <div className="about-text" data-aos="fade-up">
          <h2>Customer Satisfaction</h2>
          <p>
            We prioritize our clients’ vision, offering end-to-end solutions that
            transform spaces and leave a lasting impression with premium gypsum
            finishes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;



// import React from "react";
// import '../styles/About.css';
// // import Aos from "aos";
// import "aos/dist/aos.css";


// function AboutUs() {
//   return (
//     <div className="about-us-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>


//       {/* Row 1 */}
//       <div className="about-row">
//         <div className="about-image" data-aos="fade-up">
//           <img src="/images/image-six.jfif" alt="Gypsum Work 1" />
//         </div>
//         <div className="about-text" data-aos="fade-up">
//           <h2>Professional Gypsum Services</h2>
// <p>
//      Banx Gypsum specializes in construction, interior finishing,
//       and customized design solutions using high-quality gypsum products.
//      With years of hands-on experience, we provide exceptional services
//      that include elegant ceiling installations, stylish wall partitions,
//       decorative moldings, and bespoke interior designs. Our team works
//        closely with clients to understand their vision and transform spaces 
//        into functional, aesthetically pleasing environments. Whether it is a residential home,
//         commercial office, or industrial facility, we ensure that every project is completed with 
//         precision, durability, and attention to detail, reflecting our commitment to excellence and customer satisfaction.
// </p>

//         </div>
//       </div>

//       {/* Row 2 */}
//       <div className="about-row reverse">
//         <div className="about-image" data-aos="fade-up">
//           <img src="/images/image-four.jfif" alt="Gypsum Work 2" />
//         </div>
//         <div className="about-text" data-aos="fade-up">
//           <h2>Customized Interior Designs</h2>
//           <p>
//             We provide tailored gypsum solutions to match your style and space,
//             ensuring both aesthetic appeal and structural durability in every
//             project.
//           </p>
//         </div>
//       </div>

//       {/* Row 3 */}
//       <div className="about-row">
//         <div className="about-image" data-aos="fade-up">
//           <img src="/images/image-five.jfif" alt="Gypsum Work 3" />
//         </div>
//         <div className="about-text" data-aos="fade-up">
//           <h2>Experienced Team</h2>
//           <p>
//             Our skilled team of professionals brings years of experience in
//             gypsum installations, delivering projects on time with precision and
//             excellence.
//           </p>
//         </div>
//       </div>

//       {/* Row 4 */}
//       <div className="about-row reverse">
//         <div className="about-image" data-aos="fade-up">
//           <img src="/images/neon-robot-vacuum-cleaner (1).jpg" alt="Gypsum Work 4" />
//         </div>
//         <div className="about-text" data-aos="fade-up">
//           <h2>Customer Satisfaction</h2>
//           <p>
//             We prioritize our clients’ vision, offering end-to-end solutions that
//             transform spaces and leave a lasting impression with premium gypsum
//             finishes.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AboutUs;
