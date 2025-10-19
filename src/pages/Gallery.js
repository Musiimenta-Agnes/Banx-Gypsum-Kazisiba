import { useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Gallery.css';

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { id: 1, src: "/images/modern-kitchen-interior-design.jpg", title: "" },
    { id: 2, src: "/images/neon-robot-vacuum-cleaner (1).jpg", title: "" },
    { id: 3, src: "/images/image five.jfif", title: "" },
    { id: 4, src: "/images/Image four.jfif", title: "" },
    { id: 5, src: "/images/futuristic-kitchen-interior-design.jpg", title: "" },
    { id: 6, src: "/images/Image three.jfif", title: "" },
    { id: 6, src: "/images/WhatsApp Image 2025-09-22 at 10.10.25 AM (1).jpeg", title: "" },
    { id: 6, src: "/images/WhatsApp Image 2025-09-22 at 10.10.27 AM.jpeg", title: "" },
    { id: 6, src: "/images/WhatsApp Image 2025-09-22 at 10.10.26 AM.jpeg", title: "" },
    { id: 6, src: "/images/WhatsApp Image 2025-09-22 at 10.10.27 AM.jpeg", title: "" },
    { id: 6, src: "/images/WhatsApp Image 2025-09-22 at 10.10.48 AM (1).jpeg", title: "" },
    { id: 6, src: "/images/WhatsApp Image 2025-09-22 at 10.10.48 AM.jpeg", title: "" },
    { id: 6, src: "/images/WhatsApp Image 2025-09-22 at 10.10.49 AM (1).jpeg", title: "" },
    { id: 6, src: "/images/WhatsApp Image 2025-09-22 at 10.10.49 AM.jpeg", title: "" },
    { id: 6, src: "/images/WhatsApp Image 2025-09-22 at 10.10.49 AM (2).jpeg", title: "" },
    { id: 6, src: "/images/WhatsApp Image 2025-09-22 at 10.10.50 AM (1).jpeg", title: "" },
     { id: 6, src: "/images/WhatsApp Image 2025-09-22 at 10.10.51 AM.jpeg", title: "" },
      { id: 6, src: "/images/WhatsApp Image 2025-09-22 at 10.10.50 AM.jpeg", title: "" }
    //  You can fetch from backend here too later
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
