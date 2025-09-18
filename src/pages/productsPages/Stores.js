import { useEffect, useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../styles/Stores.css';
import 'aos/dist/aos.css';

function Projects() {
  const [dynamicProjects, setDynamicProjects] = useState([]);

  useEffect(() => {
    // Fetch additional projects from backend
    fetch("http://localhost:5000/api/projects") // change to your backend URL
      .then((res) => res.json())
      .then((data) => setDynamicProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  return (
    <div className="projects-container">
      <h1 className="projects-title">Our Projects</h1>

      <div className="projects-grid">
        {/* Row 1 - Images */}
        <div className="project-card">
          <img src="/images/modern-kitchen-interior-design.jpg" alt="Project 1" className="project-img" />
          <div className="project-desc">
            <h3>Modern Kitchen</h3>
            <p>We have mad this kitchen.</p>
          </div>
        </div>

        <div className="project-card">
          <img src="/images/3d-rendering-white-wood-living-room-near-bedroom-upstair.jpg" alt="Project 2" className="project-img" />
          <div className="project-desc">
            <h3>White wood living room</h3>
            <p>This is a short description of the project shown in the image.</p>
          </div>
        </div>

        {/* Row 2 - Videos */}
        <div className="project-card">
          <video className="project-video" controls>
            <source src="/images/vid one.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="project-desc">
            <h3>Project Title 3</h3>
            <p>This is a short description of the project shown in the video.</p>
          </div>
        </div>

        <div className="project-card">
          <video className="project-video" controls>
            <source src="/images/Video 3.mp4" type="video/mp4" />
          </video>
          <div className="project-desc">
            <h3>Project Title 4</h3>
            <p>This is a short description of the project shown in the video.</p>
          </div>
        </div>

        {/* Row 3 - More Images */}
        <div className="project-card">
          <img src="/images/neon-robot-vacuum-cleaner (1).jpg" alt="Project 4" className="project-img" />
          <div className="project-desc">
            <h3>Project Title 6</h3>
            <p>Description for project 6.</p>
          </div>
        </div>

        <div className="project-card">
          <video className="project-video" controls>
            <source src="/images/Video 2.mp4" type="video/mp4" />
          </video>
          <div className="project-desc">
            <h3>Project Title 7</h3>
            <p>This is a short description of the project shown in the video.</p>
          </div>
        </div>

        <div className="project-card">
          <img src="/images/futuristic-kitchen-interior-design.jpg" alt="Project 4" className="project-img" />
          <div className="project-desc">
            <h3>Kitchen Design</h3>
            <p>Description for project 6.</p>
          </div>
        </div>

        <div className="project-card">
          <img src="/images/Project four.jfif" alt="Project 4" className="project-img" />
          <div className="project-desc">
            <h3>Project 8</h3>
            <p>Description for project 6.</p>
          </div>
        </div>

        <div className="project-card">
          <img src="/images/Project one.jfif" alt="Project 4" className="project-img" />
          <div className="project-desc">
            <h3>Project 9</h3>
            <p>Description for project 6.</p>
          </div>
        </div>

        <div className="project-card">
          <video className="project-video" controls>
            <source src="/images/Video 4.mp4" type="video/mp4" />
          </video>
          <div className="project-desc">
            <h3>Project Title 10</h3>
            <p>This is a short description of the project shown in the video.</p>
          </div>
        </div>

        {/* --- ADDITIONAL PROJECTS FROM BACKEND --- */}
        {dynamicProjects.map((project) => (
          <div key={project.id} className="project-card">
            {project.type === "image" ? (
              <img src={project.src} alt={project.title} className="project-img" />
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

export default Projects;






// import 'bootstrap-icons/font/bootstrap-icons.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import '../../styles/Stores.css';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// function Projects() {
//   return (
//     <div className="projects-container">
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

//                 <div className="project-card">
//           <video className="project-video" controls>
//             <source src="/images/Video 2.mp4" type="video/mp4" />
//           </video>
//           <div className="project-desc">
//             <h3>Project Title 7</h3>
//             <p>This is a short description of the project shown in the video.</p>
//           </div>
//         </div>

//                 <div className="project-card">
//           <img src="/images/futuristic-kitchen-interior-design.jpg" alt="Project 4" className="project-img" />
//           <div className="project-desc">
//             <h3>Kitchen Design</h3>
//             <p>Description for project 6.</p>
//           </div>
//         </div>

//                         <div className="project-card">
//           <img src="/images/Project four.jfif" alt="Project 4" className="project-img" />
//           <div className="project-desc">
//             <h3>Project 8</h3>
//             <p>Description for project 6.</p>
//           </div>
//         </div>


//                                 <div className="project-card">
//           <img src="/images/Project one.jfif" alt="Project 4" className="project-img" />
//           <div className="project-desc">
//             <h3>Project 9</h3>
//             <p>Description for project 6.</p>
//           </div>
//         </div>

//                 <div className="project-card">
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
//   );
// }

// export default Projects;



