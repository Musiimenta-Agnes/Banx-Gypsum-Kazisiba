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
    { type: "video", src: "/images/vid-6.mp4", title: "Project 1" },
    { type: "image", src: "/images/modern-kitchen-interior-design.jpg", title: "Project 2" },
    { type: "image", src: "/images/3d-rendering-white-wood-living-room-near-bedroom-upstair.jpg", title: "Project 3" },
    { type: "video", src: "/images/vid one.mp4", title: "Project 4" },
    { type: "image", src: "/images/neon-robot-vacuum-cleaner (1).jpg", title: "Project 5" },
    { type: "image", src: "/images/futuristic-kitchen-interior-design.jpg", title: "Project 6" },
    { type: "image", src: "/images/42e57da26dda3356b9f49b8728babf86.jpg", title: "Project 7" },
    { type: "image", src: "/images/videoframe_18560.png", title: "Project 8" },
    { type: "image", src: "/images/75192bb5a3ff5f9ca9d0d4b68cabacfe.jpg", title: "Project 9" },
    { type: "image", src: "/images/sitting1.jpg", title: "Project 10" },
    { type: "image", src: "/images/bed4.jpg", title: "Project 11" },
    { type: "video", src: "/images/vid7.mp4", title: "Project 12" },
    { type: "image", src: "/images/bed3.jpg", title: "Project 13" }
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

