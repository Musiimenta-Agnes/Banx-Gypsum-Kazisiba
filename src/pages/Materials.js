



import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Materials() {
  const [materials, setMaterials] = useState([]);

  // Hardcoded materials (keep these as default)
  const hardcodedMaterials = [
    { id: "hard-1", type: "image", src: "/images/mat8.jpeg" },
    { id: "hard-2", type: "video", src: "/images/mat3.mp4" },
    { id: "hard-3", type: "image", src: "/images/WhatsApp Image 2025-11-06 at 12.32.34 PM.jpeg" },
    { id: "hard-4", type: "image", src: "/images/mat8.jpeg" },
    { id: "hard-5", type: "video", src: "/images/mat1.mp4" },
    { id: "hard-6", type: "video", src: "/images/mat2.mp4" },
    { id: "hard-7", type: "video", src: "/images/mat4.mp4" },
    { id: "hard-8", type: "video", src: "/images/mat12.mp4" },
    { id: "hard-9", type: "video", src: "/images/mat6.mp4" },
    { id: "hard-10", type: "video", src: "/images/mat14.mp4" },
    { id: "hard-11", type: "video", src: "/images/mat10.mp4" },
    { id: "hard-12", type: "image", src: "/images/WhatsApp Image 2025-11-06 at 12.32.36 PM.jpeg" },
  ];

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await fetch("http://localhost:5000/uploads/materials/materials.json");
        if (!res.ok) return;

        const data = await res.json();
        const uploadedMaterials = data.map((item, index) => ({
          id: item.filename || `uploaded-${index}`,
          type: item.filetype || (item.filename.endsWith(".mp4") ? "video" : "image"),
          src: `http://localhost:5000/${item.path.replace(/\\/g, "/")}`,
        }));

        // Add uploaded materials on top of hardcoded
        setMaterials([...uploadedMaterials.reverse(), ...hardcodedMaterials]);
      } catch (err) {
        console.error("Error fetching materials:", err);
        // fallback to hardcoded if fetch fails
        setMaterials(hardcodedMaterials);
      }
    };

    fetchMaterials();
  }, []);

  const renderMaterials = () => (
    <div className="container my-5">
      <h2 className="text-center mb-4" style={{ color: "rgb(12, 67, 134)" }}>
        Materials We Use for Construction
      </h2>
      <div className="row justify-content-center g-4">
        {materials.map((item) => (
          <div key={item.id} className="col-md-4 col-sm-6 col-10">
            <div className="card shadow-sm border-0 material-card">
              {item.type === "video" ? (
                <video
                  className="card-img-top"
                  controls
                  src={item.src}
                  style={{ maxHeight: "240px", objectFit: "cover" }}
                />
              ) : (
                <img
                  src={item.src}
                  className="card-img-top"
                  alt="material"
                  style={{ maxHeight: "240px", objectFit: "cover" }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <style>
        {`
          .material-card {
            transition: transform 0.3s ease;
          }
          .material-card:hover {
            transform: scale(1.05);
          }
        `}
      </style>
      {renderMaterials()}
    </div>
  );
}

