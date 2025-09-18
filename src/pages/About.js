
import React from "react";
import '../styles/About.css';
// import Aos from "aos";


function AboutUs() {
  return (
    <div className="about-us-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 className="about-title">About Banx Gypsum Kazisiba</h1>

      {/* Row 1 */}
      <div className="about-row">
        <div className="about-image" data-aos="fade-up">
          <img src="/images/Image six.jfif" alt="Gypsum Work 1" />
        </div>
        <div className="about-text" data-aos="fade-up">
          <h2>Professional Gypsum Services</h2>
<p>
  Banx Gypsum specializes in construction, interior finishing,
   and customized design solutions using high-quality gypsum products.
    With years of hands-on experience, we provide exceptional services
     that include elegant ceiling installations, stylish wall partitions,
      decorative moldings, and bespoke interior designs. Our team works
       closely with clients to understand their vision and transform spaces into functional, aesthetically pleasing environments. Whether it is a residential home, commercial office, or industrial facility, we ensure that every project is completed with precision, durability, and attention to detail, reflecting our commitment to excellence and customer satisfaction.
</p>

        </div>
      </div>

      {/* Row 2 */}
      <div className="about-row reverse">
        <div className="about-image" data-aos="fade-up">
          <img src="/images/Image three.jfif" alt="Gypsum Work 2" />
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
          <img src="/images/Project two.jfif" alt="Gypsum Work 3" />
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
          <img src="/images/Image four.jfif" alt="Gypsum Work 4" />
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
