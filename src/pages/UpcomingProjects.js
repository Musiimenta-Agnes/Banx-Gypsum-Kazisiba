import React, { useEffect, useState } from "react";
import "../styles/Projects.css"; // ✅ styling for grid/cards

function UpcomingProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/upcoming-projects") // ✅ backend endpoint
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  return (
    <div className="projects-container">
      <h1 className="heading">Upcoming Projects</h1>
      <br />

      <div className="projects-grid">
        {/* ✅ Hardcoded Projects */}
        <div className="project-card">
          <img
            src="/images/modern-kitchen-interior-design.jpg"
            alt="Modern Kitchen"
            className="project-img"
          />
          <div className="project-desc">
            <h3>Modern Kitchen</h3>
            <p>We designed this modern kitchen with high-end finishes.</p>
          </div>
        </div>

        <div className="project-card">
          <video className="project-video" controls>
            <source src="/videos/kitchen-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="project-desc">
            <h3>Kitchen Walkthrough</h3>
            <p>A guided video of one of our upcoming kitchen projects.</p>
          </div>
        </div>

        <div className="project-card">
          <img
            src="/images/white-living-room.jpg"
            alt="White Living Room"
            className="project-img"
          />
          <div className="project-desc">
            <h3>White Living Room</h3>
            <p>Minimalist living room project with modern furniture.</p>
          </div>
        </div>



                <div className="project-card">
          <img
            src="/images/white-living-room.jpg"
            alt="White Living Room"
            className="project-img"
          />
          <div className="project-desc">
            <h3>White Living Room</h3>
            <p>Minimalist living room project with modern furniture.</p>
          </div>
        </div>



        

        <div className="project-card">
          <video className="project-video" controls>
            <source src="/videos/living-room.mp4" type="video/mp4" />
          </video>
          <div className="project-desc">
            <h3>Living Room Demo</h3>
            <p>Short clip showing the living room interior design process.</p>
          </div>
        </div>







        {/* ✅ Dynamic Projects from Backend */}
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            {project.type === "image" ? (
              <img
                src={project.src}
                alt={project.title}
                className="project-img"
              />
            ) : (
              <video className="project-video" controls>
                <source src={project.src} type="video/mp4" />
              </video>
            )}
            <div className="project-desc">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingProjects;
















// import React from "react";


// function UpcomingProjects() {
//   return (
//     <div className="projects-container">
//       <h1 className="heading">Upcoming Projects</h1>
//       <br/>

//       <div className="projects-grid">
//         {/* Example Project - Image */}
//         <div className="project-card">
//           <img
//             src="/images/modern-kitchen-interior-design.jpg"
//             alt="Modern Kitchen"
//             className="project-img"
//           />
//           <div className="project-desc">
//             <h3>Modern Kitchen</h3>
//             <p>We designed this modern kitchen with high-end finishes.</p>
//           </div>
//         </div>

//         {/* Example Project - Video */}
//         <div className="project-card">
//           <video className="project-video" controls>
//             <source src="/videos/kitchen-demo.mp4" type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <div className="project-desc">
//             <h3>Kitchen Walkthrough</h3>
//             <p>A guided video of one of our completed kitchen projects.</p>
//           </div>
//         </div>

//         {/* Add more projects below (image or video) */}
//         <div className="project-card">
//           <img
//             src="/images/white-living-room.jpg"
//             alt="White Living Room"
//             className="project-img"
//           />
//           <div className="project-desc">
//             <h3>White Living Room</h3>
//             <p>Minimalist living room project with modern furniture.</p>
//           </div>
//         </div>

//         <div className="project-card">
//           <video className="project-video" controls>
//             <source src="/videos/living-room.mp4" type="video/mp4" />
//           </video>
//           <div className="project-desc">
//             <h3>Living Room Demo</h3>
//             <p>Short clip showing the living room interior design process.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UpcomingProjects;
