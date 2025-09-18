import { useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../styles/Products.css';

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { id: 1, src: "/images/modern-kitchen-interior-design.jpg", title: "Luxury Living Room" },
    { id: 2, src: "/images/neon-robot-vacuum-cleaner (1).jpg", title: "Modern Kitchen Design" },
    { id: 3, src: "/images/image five.jfif", title: "Office Interior" },
    { id: 4, src: "/images/Image four.jfif", title: "Contemporary Bedroom" },
    { id: 5, src: "/images/futuristic-kitchen-interior-design.jpg", title: "Classic Kitchen Area" },
    { id: 6, src: "/images/Image three.jfif", title: "Stylish Outdoor Space" },
    // 👉 You can fetch from backend here too later
  ];

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Our Gallery</h1>
      <p className="gallery-subtitle">Showcasing our latest designs and projects</p>

      <div className="gallery-grid">
        {images.map((img) => (
          <div
            key={img.id}
            className="gallery-item"
            onClick={() => setSelectedImage(img.src)}
          >
            <img src={img.src} alt={img.title} className="gallery-img" />
            <div className="overlay">
              <span>{img.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <span className="close">&times;</span>
          <img src={selectedImage} alt="Selected" className="lightbox-img" />
        </div>
      )}
    </div>
  );
}

export default Gallery;
