
import React, { useEffect, useState } from "react";
import "../styles/ProcessProjects.css"; // ✅ new css for vertical layout

function ProjectsInProcess() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/process-projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  return (
    <div className="projects-vertical-container">
      <h1 className="heading">Projects In Process</h1>
      <br />

      <div className="projects-vertical-list">
        {/* ✅ Hardcoded Projects */}
        <div className="project-card-vertical">
          <img
            src="/images/neon-robot-vacuum-cleaner (1).jpg"
            alt="Modern Kitchen"
            className="project-media"
          />
          <div className="project-desc">
            <h3>Modern Kitchen</h3>
            <p>We designed this modern kitchen with high-end finishes.</p>
          </div>
        </div>

        <div className="project-card-vertical">
          <video className="project-media" controls>
            <source src="/videos/kitchen-demo.mp4" type="video/mp4" />
          </video>
          <div className="project-desc">
            <h3>Kitchen Walkthrough</h3>
            <p>A guided video of one of our upcoming kitchen projects.</p>
          </div>
        </div>



                <div className="project-card-vertical">
          <img
            src="/images/WhatsApp Image 2025-09-22 at 10.10.50 AM (1).jpeg"
            alt="Modern Kitchen"
            className="project-media"
          />
          <div className="project-desc">
            <h3>Modern Kitchen</h3>
            <p>We designed this modern kitchen with high-end finishes.</p>
          </div>
        </div>





        {/* ✅ Dynamic Projects from Backend */}
        {projects.map((project) => (
          <div key={project.id} className="project-card-vertical">
            {project.type === "image" ? (
              <img
                src={project.src}
                alt={project.title}
                className="project-media"
              />
            ) : (
              <video className="project-media" controls>
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

export default ProjectsInProcess;





// import React, { useEffect, useState } from "react";
// import "../styles/Projects.css"; // ✅ styling for grid/cards

// function ProjectsInProcess() {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/process-projects") // ✅ backend endpoint
//       .then((res) => res.json())
//       .then((data) => setProjects(data))
//       .catch((err) => console.error("Error fetching projects:", err));
//   }, []);

//   return (
//     <div className="projects-container">
//       <h1 className="heading">Upcoming Projects</h1>
//       <br />

//       <div className="projects-grid">
//         {/* ✅ Hardcoded Projects */}
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

//         <div className="project-card">
//           <video className="project-video" controls>
//             <source src="/videos/kitchen-demo.mp4" type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <div className="project-desc">
//             <h3>Kitchen Walkthrough</h3>
//             <p>A guided video of one of our upcoming kitchen projects.</p>
//           </div>
//         </div>

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

//         {/* ✅ Dynamic Projects from Backend */}
//         {projects.map((project) => (
//           <div key={project.id} className="project-card">
//             {project.type === "image" ? (
//               <img
//                 src={project.src}
//                 alt={project.title}
//                 className="project-img"
//               />
//             ) : (
//               <video className="project-video" controls>
//                 <source src={project.src} type="video/mp4" />
//               </video>
//             )}
//             <div className="project-desc">
//               <h3>{project.title}</h3>
//               <p>{project.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ProjectsInProcess;
