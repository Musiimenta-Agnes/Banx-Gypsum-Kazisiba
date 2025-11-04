import { useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Gallery.css';

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { id: 1, src: "/images/videoframe_4594.png", title: "" },
    { id: 2, src: "/images/neon-robot-vacuum-cleaner (1).jpg", title: "" },
    { id: 3, src: "/images/283d0c8ac5ed5f365c9c8d58d3a3518f.jpg", title: "" },
    { id: 4, src: "/images/74d4ce458519225ba04a97f28c245eb8.jpg", title: "" },
    { id: 5, src: "/images/futuristic-kitchen-interior-design.jpg", title: "" },
    { id: 6, src: "/images/3d-rendering-classic-interior.jpg", title: "" },
    { id: 7, src: "/images/3d-rendering-modern-dining-room-living-room-with-luxury-decor.jpg", title: "" },
    { id: 8, src: "/images/3d-room-interior-with-classic-design-furniture.jpg", title: "" },
    { id: 9, src: "/images/96e6e6af520f3436de260b40653f2b74.jpg", title: "" },
    { id: 10, src: "/images/0c70f62259e753379958cb940e89e1e2.jpg", title: "" },
    { id: 11, src: "/images/6620d84c9cc38cac5dd450bd6e716e3f.jpg", title: "" },
    { id: 12, src: "/images/kitchen-4.jpeg", title: "" },
    { id: 13, src: "/images/modern-kitchen-interior-design.jpg", title: "" },
    { id: 14, src: "/images/luxury.jpg", title: "" },
    { id: 15, src: "/images/0c70f62259e753379958cb940e89e1e2.jpg", title: "" },
    { id: 16, src: "/images/6620d84c9cc38cac5dd450bd6e716e3f.jpg", title: "" },
     { id: 17, src: "/images/74d4ce458519225ba04a97f28c245eb8.jpg", title: "" },
      { id: 18, src: "/images/videoframe_18560.png", title: "" },
        { id: 19, src: "/images/42e57da26dda3356b9f49b8728babf86.jpg", title: "" },
          { id: 20, src: "/images/96e6e6af520f3436de260b40653f2b74.jpg", title: "" },
            { id: 21, src: "/images/kitchen-2.jpeg", title: "" },
              { id: 22, src: "/images/sitting.jpeg", title: "" },
              { id: 22, src: "/images/bed4.jpg", title: "" },
              { id: 22, src: "/images/bed3.jpg", title: "" },
              { id: 22, src: "/images/bed1.jpg", title: "" },
              { id: 22, src: "/images/97ac714ba71a2b30a68829ec19a71eef.jpg", title: "" },
              { id: 22, src: "/images/siting2.jpg", title: "" },
              { id: 22, src: "/images/sitting1.jpg", title: "" },
              { id: 22, src: "/images/2fe50d30bb8fb9fcf90e3b0171c0d3dd.jpg", title: "" },
                
    //  Backend images
  ];

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Our Gallery</h1>
      <p className="gallery-subtitle">Showcasing our latest designs and projects  <br/> Choose your best design and let Kazisiba style it within the shortest period of time</p>
   

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
