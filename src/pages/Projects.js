import { useEffect, useState } from "react";
import '../styles/Projects.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'aos/dist/aos.css';

function Projects() {
  const [dynamicProjects, setDynamicProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:5000/uploads/projects/projects.json");
        if (!res.ok) return;

        const data = await res.json();
        const formatted = data.map((proj, index) => {
          // Make sure path points to correct server URL
          let filePath = proj.path.replace(/\\/g, "/"); // normalize slashes

          // If path is relative, prefix with /uploads/
          if (!filePath.startsWith("uploads/")) {
            filePath = `uploads/projects/${proj.filename}`;
          }

          return {
            id: proj.filename || `dynamic-${index}`,
            type: proj.filetype || (proj.filename.endsWith(".mp4") ? "video" : "image"),
            src: `http://localhost:5000/${filePath}`, // full URL to backend file
            title: proj.title || "Untitled Project",
          };
        });

        setDynamicProjects(formatted.reverse());
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  // Hardcoded projects — make sure these are in your public folder
  const hardcodedProjects = [
    { type: "video", src: "/images/vid-6.mp4", title: "Project One" },
    { type: "image", src: "/images/modern-kitchen-interior-design.jpg", title: "Modern Kitchen" },
    { type: "image", src: "/images/3d-rendering-white-wood-living-room-near-bedroom-upstair.jpg", title: "White Wood Living Room" },
    { type: "video", src: "/images/vid one.mp4", title: "Project Title 3" },
    { type: "video", src: "/images/Video 3.mp4", title: "Project Title 4" },
    { type: "image", src: "/images/neon-robot-vacuum-cleaner (1).jpg", title: "Project Title 6" },
    { type: "image", src: "/images/futuristic-kitchen-interior-design.jpg", title: "Kitchen Design" },
    { type: "image", src: "/images/42e57da26dda3356b9f49b8728babf86.jpg", title: "Project 8" },
    { type: "image", src: "/images/videoframe_18560.png", title: "Project 9" },
    { type: "video", src: "/images/Video 4.mp4", title: "Project Title 10" },
    { type: "image", src: "/images/75192bb5a3ff5f9ca9d0d4b68cabacfe.jpg", title: "Project 9" },
    { type: "image", src: "/images/sitting1.jpg", title: "Project 9" },
    { type: "image", src: "/images/bed4.jpg", title: "Project 9" },
    { type: "video", src: "/images/vid7.mp4", title: "Project Title 10" },
    { type: "image", src: "/images/bed3.jpg", title: "Project 9" }
  ];

  const renderProject = (project, key) => (
    <div key={key} className="project-card">
      {project.type === "image" ? (
        <img src={project.src} alt={project.title} className="project-img" />
      ) : (
        <video className="project-video" controls>
          <source src={project.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <h3 className="project-title">{project.title}</h3>
    </div>
  );

  return (
    <div className="projects-container">
      <h1 className="heading">Completed Projects</h1>
      <br />
      <div className="projects-grid">
        {/* Render dynamic projects first */}
        {dynamicProjects.map((project) => renderProject(project, project.id))}
        {/* Then render hardcoded projects */}
        {hardcodedProjects.map((project, index) => renderProject(project, `hardcoded-${index}`))}
      </div>
    </div>
  );
}

export default Projects;




// import { useEffect, useState } from "react";
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import '../styles/Projects.css';
// import 'aos/dist/aos.css';

// function Projects() {
//   const [dynamicProjects, setDynamicProjects] = useState([]);

//   useEffect(() => {
//     // Fetch all project JSON files
//     const fetchProjects = async () => {
//       const jsonFiles = ["projects.json"]; // Add sectioned JSON files here if needed
//       let allProjects = [];

//       for (const file of jsonFiles) {
//         try {
//           const res = await fetch(`http://localhost:5000/uploads/projects/${file}`);
//           if (!res.ok) continue;
//           const data = await res.json();
//           const formatted = data.map((proj, index) => ({
//             id: proj.filename || `dynamic-${index}`,
//             type: proj.filetype || (proj.filename.endsWith(".mp4") ? "video" : "image"),
//             src: `http://localhost:5000/${proj.path.replace(/\\/g, "/")}`,
//             title: proj.title || "Untitled Project",
//           }));
//           allProjects = [...allProjects, ...formatted];
//         } catch (err) {
//           console.error("Error fetching project JSON:", err);
//         }
//       }

//       setDynamicProjects(allProjects.reverse());
//     };

//     fetchProjects();
//   }, []);

//   const hardcodedProjects = [
//     { type: "video", src: "/images/vid-6.mp4", title: "Project One" },
//     { type: "image", src: "/images/modern-kitchen-interior-design.jpg", title: "Modern Kitchen" },
//   ];

//   const renderProject = (project, key) => (
//     <div key={key} className="project-card">
//       {project.type === "image" ? (
//         <img src={project.src} alt={project.title} className="project-img" />
//       ) : (
//         <video className="project-video" controls>
//           <source src={project.src} type="video/mp4" />
//         </video>
//       )}
//       <h3 className="project-title">{project.title}</h3>
//     </div>
//   );

//   return (
//     <div className="projects-container">
//       <h1 className="heading">Completed Projects</h1>
//       <br/>
//       <div className="projects-grid">
//         {dynamicProjects.map((project) => renderProject(project, project.id))}
//         {hardcodedProjects.map((project, index) => renderProject(project, `hardcoded-${index}`))}
//       </div>
//     </div>
//   );
// }

// export default Projects;













// import { useEffect, useState } from "react";
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import '../styles/Projects.css';
// import 'aos/dist/aos.css';

// function Projects() {
//   const [dynamicProjects, setDynamicProjects] = useState([]);

//   useEffect(() => {
//     // Fetch additional projects from backend
//     fetch("http://localhost:5000/api/projects") // change to your backend URL
//       .then((res) => res.json())
//       .then((data) => setDynamicProjects(data))
//       .catch((err) => console.error("Error fetching projects:", err));
//   }, []);

//   // Hardcoded projects
//   const hardcodedProjects = [
//     {
//       type: "video",
//       src: "/images/vid-6.mp4",
//       title: "Project One",
//       description: "This is a short description of the project shown in the video."
//     },
//     {
//       type: "image",
//       src: "/images/modern-kitchen-interior-design.jpg",
//       title: "Modern Kitchen",
//       description: "We have made this kitchen."
//     },
//     {
//       type: "image",
//       src: "/images/3d-rendering-white-wood-living-room-near-bedroom-upstair.jpg",
//       title: "White wood living room",
//       description: "This is a short description of the project shown in the image."
//     },
//     {
//       type: "video",
//       src: "/images/vid one.mp4",
//       title: "Project Title 3",
//       description: "This is a short description of the project shown in the video."
//     },
//     // ... add remaining hardcoded projects here
//   ];

//   return (
//     <div className="projects-container">
//       <h1 className="heading">Completed Projects</h1>
//       <br/>

//       <div className="projects-grid">
//         {/* Dynamic projects first */}
//         {dynamicProjects.map((project) => (
//           <div key={project.id} className="project-card">
//             {project.type === "image" ? (
//               <img src={project.src} alt={project.title} className="project-img" />
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

//         {/* Then the hardcoded projects */}
//         {hardcodedProjects.map((project, index) => (
//           <div key={index} className="project-card">
//             {project.type === "image" ? (
//               <img src={project.src} alt={project.title} className="project-img" />
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

// export default Projects;


















// import { useEffect, useState } from "react";
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import '../styles/Projects.css';
// import 'aos/dist/aos.css';

// function Projects() {
//   const [dynamicProjects, setDynamicProjects] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/uploads/projects.json")
//       .then((res) => res.json())
//       .then((data) => {
//         const formattedProjects = data.map((proj) => ({
//           id: proj.filename,
//           type: proj.filetype || (proj.filename.endsWith(".mp4") ? "video" : "image"),
//           src: `http://localhost:5000/${proj.path.replace(/^uploads[\\/]/, "").replace(/\\/g, "/")}`,
//           title: proj.title,
//         }));
//         setDynamicProjects(formattedProjects.reverse());
//       })
//       .catch((err) => console.error("Error fetching projects:", err));
//   }, []);

//   const hardcodedProjects = [
//     { type: "video", src: "/images/vid-6.mp4", title: "Project One" },
//     { type: "image", src: "/images/modern-kitchen-interior-design.jpg", title: "Modern Kitchen" },
//     { type: "image", src: "/images/3d-rendering-white-wood-living-room-near-bedroom-upstair.jpg", title: "White wood living room" },
//     { type: "video", src: "/images/vid one.mp4", title: "Project Title 3" },
//     { type: "video", src: "/images/Video 3.mp4", title: "Project Title 4" },
//     { type: "image", src: "/images/neon-robot-vacuum-cleaner (1).jpg", title: "Project Title 6" },
//     { type: "image", src: "/images/futuristic-kitchen-interior-design.jpg", title: "Kitchen Design" },
//     { type: "image", src: "/images/42e57da26dda3356b9f49b8728babf86.jpg", title: "Project 8" },
//     { type: "image", src: "/images/videoframe_18560.png", title: "Project 9" },
//     { type: "video", src: "/images/Video 4.mp4", title: "Project Title 10" },
//     { type: "image", src: "/images/75192bb5a3ff5f9ca9d0d4b68cabacfe.jpg", title: "Project 9" },
//     { type: "image", src: "/images/sitting1.jpg", title: "Project 9" },
//     { type: "image", src: "/images/bed4.jpg", title: "Project 9" },
//     { type: "video", src: "/images/vid7.mp4", title: "Project Title 10" },
//     { type: "image", src: "/images/bed3.jpg", title: "Project 9" }
//   ];

//   const renderProject = (project, key) => (
//     <div key={key} className="project-card">
//       {project.type === "image" ? (
//         <img src={project.src} alt={project.title} className="project-img" />
//       ) : (
//         <video className="project-video" controls>
//           <source src={project.src} type="video/mp4" />
//         </video>
//       )}
//       <h3 className="project-title">{project.title}</h3>
//     </div>
//   );

//   return (
//     <div className="projects-container">
//       <h1 className="heading">Completed Projects</h1>
//       <br/>
//       <div className="projects-grid">
//         {dynamicProjects.map((project) => renderProject(project, project.id))}
//         {hardcodedProjects.map((project, index) => renderProject(project, `hardcoded-${index}`))}
//       </div>
//     </div>
//   );
// }

// export default Projects;












// import { useEffect, useState } from "react";
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import '../styles/Projects.css';
// import 'aos/dist/aos.css';

// function Projects() {
//   const [dynamicProjects, setDynamicProjects] = useState([]);

//   useEffect(() => {
//     // Fetch uploaded projects from backend
//     fetch("http://localhost:5000/uploads/projects.json")
//       .then((res) => res.json())
//       .then((data) => {
//         const formattedProjects = data.reverse().map((proj, index) => ({
//           id: proj.filename || `dynamic-${index}`,
//           type: proj.filetype || (proj.filename.endsWith(".mp4") ? "video" : "image"),
//           src: `http://localhost:5000/${proj.path.replace(/\\/g, "/")}`, // fix slashes & prefix backend URL
//           title: proj.title || "Untitled Project",
//         }));
//         setDynamicProjects(formattedProjects);
//       })
//       .catch((err) => console.error("Error fetching projects:", err));
//   }, []);

//   const hardcodedProjects = [
//     { type: "video", src: "/images/vid-6.mp4", title: "Project One" },
//     { type: "image", src: "/images/modern-kitchen-interior-design.jpg", title: "Modern Kitchen" },
//     { type: "image", src: "/images/3d-rendering-white-wood-living-room-near-bedroom-upstair.jpg", title: "White Wood Living Room" },
//     { type: "video", src: "/images/vid one.mp4", title: "Project Title 3" },
//     { type: "video", src: "/images/Video 3.mp4", title: "Project Title 4" },
//     { type: "image", src: "/images/neon-robot-vacuum-cleaner (1).jpg", title: "Project Title 6" },
//     { type: "image", src: "/images/futuristic-kitchen-interior-design.jpg", title: "Kitchen Design" },
//     { type: "image", src: "/images/42e57da26dda3356b9f49b8728babf86.jpg", title: "Project 8" },
//     { type: "image", src: "/images/videoframe_18560.png", title: "Project 9" },
//     { type: "video", src: "/images/Video 4.mp4", title: "Project Title 10" },
//     { type: "image", src: "/images/75192bb5a3ff5f9ca9d0d4b68cabacfe.jpg", title: "Project 9" },
//     { type: "image", src: "/images/sitting1.jpg", title: "Project 9" },
//     { type: "image", src: "/images/bed4.jpg", title: "Project 9" },
//     { type: "video", src: "/images/vid7.mp4", title: "Project Title 10" },
//     { type: "image", src: "/images/bed3.jpg", title: "Project 9" }
//   ];

//   const renderProject = (project, key) => (
//     <div key={key} className="project-card">
//       {project.type === "image" ? (
//         <img src={project.src} alt={project.title} className="project-img" />
//       ) : (
//         <video className="project-video" controls>
//           <source src={project.src} type="video/mp4" />
//         </video>
//       )}
//       <h3 className="project-title">{project.title}</h3>
//     </div>
//   );

//   return (
//     <div className="projects-container">
//       <h1 className="heading">Completed Projects</h1>
//       <br/>
//       <div className="projects-grid">
//         {dynamicProjects.map((project) => renderProject(project, project.id))}
//         {hardcodedProjects.map((project, index) => renderProject(project, `hardcoded-${index}`))}
//       </div>
//     </div>
//   );
// }

// export default Projects;








// import { useEffect, useState } from "react";
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import '../styles/Projects.css';
// import 'aos/dist/aos.css';

// function Projects() {
//   const [dynamicProjects, setDynamicProjects] = useState([]);

//   useEffect(() => {
//     // Pages/sections to fetch
//     const pagesWithSections = [
//       { page: "projects", sections: [] }, // unsectioned
//       // If you have sectioned projects in future, add here like:
//       // { page: "projects", sections: ["gypsum", "ceiling", "wall panels"] }
//     ];

//     const fetchAllProjects = async () => {
//       let allProjects = [];

//       for (const pw of pagesWithSections) {
//         if (pw.sections.length === 0) {
//           // Unsectioned projects
//           try {
//             const res = await fetch(`http://localhost:5000/uploads/${pw.page}.json`);
//             if (res.ok) {
//               const data = await res.json();
//               allProjects = allProjects.concat(data.map((proj, idx) => ({
//                 id: proj.filename || `dynamic-${pw.page}-${idx}`,
//                 type: proj.filetype || (proj.filename.endsWith(".mp4") ? "video" : "image"),
//                 src: `http://localhost:5000/${proj.path.replace(/\\/g, "/")}`,
//                 title: proj.title || "Untitled Project"
//               })));
//             }
//           } catch (err) {
//             console.error(`Error fetching ${pw.page}.json:`, err);
//           }
//         } else {
//           // Sectioned projects (if any)
//           for (const sec of pw.sections) {
//             try {
//               const res = await fetch(`http://localhost:5000/uploads/${pw.page}/${sec}.json`);
//               if (res.ok) {
//                 const data = await res.json();
//                 allProjects = allProjects.concat(data.map((proj, idx) => ({
//                   id: proj.filename || `dynamic-${pw.page}-${sec}-${idx}`,
//                   type: proj.filetype || (proj.filename.endsWith(".mp4") ? "video" : "image"),
//                   src: `http://localhost:5000/${proj.path.replace(/\\/g, "/")}`,
//                   title: proj.title || "Untitled Project",
//                   section: sec
//                 })));
//               }
//             } catch (err) {
//               console.error(`Error fetching ${pw.page}/${sec}.json:`, err);
//             }
//           }
//         }
//       }

//       // Reverse to show newest first
//       setDynamicProjects(allProjects.reverse());
//     };

//     fetchAllProjects();
//   }, []);

//   const hardcodedProjects = [
//     { type: "video", src: "/images/vid-6.mp4", title: "Project One" },
//     { type: "image", src: "/images/modern-kitchen-interior-design.jpg", title: "Modern Kitchen" },
//     { type: "image", src: "/images/3d-rendering-white-wood-living-room-near-bedroom-upstair.jpg", title: "White Wood Living Room" },
//     // Add remaining hardcoded projects...
//   ];

//   const renderProject = (project, key) => (
//     <div key={key} className="project-card">
//       {project.type === "image" ? (
//         <img src={project.src} alt={project.title} className="project-img" />
//       ) : (
//         <video className="project-video" controls>
//           <source src={project.src} type="video/mp4" />
//         </video>
//       )}
//       <h3 className="project-title">{project.title}</h3>
//     </div>
//   );

//   return (
//     <div className="projects-container">
//       <h1 className="heading">Completed Projects</h1>
//       <br/>
//       <div className="projects-grid">
//         {dynamicProjects.map((project) => renderProject(project, project.id))}
//         {hardcodedProjects.map((project, index) => renderProject(project, `hardcoded-${index}`))}
//       </div>
//     </div>
//   );
// }

// export default Projects;
// // 