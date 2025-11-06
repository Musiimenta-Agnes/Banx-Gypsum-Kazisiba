

// import { useState } from "react";
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import '../styles/Gallery.css';

// function Gallery() {
//   const [selectedMedia, setSelectedMedia] = useState(null);
//   const [isVideo, setIsVideo] = useState(false);

//   const mediaItems = [
//     { id: 1, src: "/images/videoframe_4594.png", type: "image" },
//     { id: 2, src: "/images/neon-robot-vacuum-cleaner (1).jpg", type: "image" },
//     { id: 3, src: "/images/283d0c8ac5ed5f365c9c8d58d3a3518f.jpg", type: "image" },
//     { id: 4, src: "/images/74d4ce458519225ba04a97f28c245eb8.jpg", type: "image" },
//     { id: 5, src: "/images/futuristic-kitchen-interior-design.jpg", type: "image" },
//     { id: 6, src: "/images/3d-rendering-classic-interior.jpg", type: "image" },
//     { id: 7, src: "/images/3d-rendering-modern-dining-room-living-room-with-luxury-decor.jpg", type: "image" },
//     { id: 8, src: "/images/3d-room-interior-with-classic-design-furniture.jpg", type: "image" },
//     { id: 9, src: "/images/96e6e6af520f3436de260b40653f2b74.jpg", type: "image" },
//     { id: 10, src: "/images/0c70f62259e753379958cb940e89e1e2.jpg", type: "image" },
//     { id: 11, src: "/images/6620d84c9cc38cac5dd450bd6e716e3f.jpg", type: "image" },
//     { id: 12, src: "/images/kitchen-4.jpeg", type: "image" },
//     { id: 13, src: "/images/modern-kitchen-interior-design.jpg", type: "image" },
//     { id: 14, src: "/images/luxury.jpg", type: "image" },
//     { id: 15, src: "/images/0c70f62259e753379958cb940e89e1e2.jpg", type: "image" },
//     { id: 16, src: "/images/6620d84c9cc38cac5dd450bd6e716e3f.jpg", type: "image" },
//     { id: 17, src: "/images/74d4ce458519225ba04a97f28c245eb8.jpg", type: "image" },
//     { id: 18, src: "/images/videoframe_18560.png", type: "image" },
//     { id: 19, src: "/images/42e57da26dda3356b9f49b8728babf86.jpg", type: "image" },
//     { id: 20, src: "/images/96e6e6af520f3436de260b40653f2b74.jpg", type: "image" },
//     { id: 21, src: "/images/kitchen-2.jpeg", type: "image" },
//     { id: 22, src: "/images/sitting.jpeg", type: "image" },
//     { id: 23, src: "/images/bed4.jpg", type: "image" },
//     { id: 24, src: "/images/bed3.jpg", type: "image" },
//     { id: 25, src: "/images/bed1.jpg", type: "image" },
//     { id: 26, src: "/images/97ac714ba71a2b30a68829ec19a71eef.jpg", type: "image" },
//     { id: 27, src: "/images/siting2.jpg", type: "image" },
//     { id: 28, src: "/images/sitting1.jpg", type: "image" },
//     { id: 29, src: "/images/2fe50d30bb8fb9fcf90e3b0171c0d3dd.jpg", type: "image" },
//     // Example video
//     { id: 30, src: "/videos/sample-video.mp4", type: "video" },
//   ];

//   const openMedia = (item) => {
//     setSelectedMedia(item.src);
//     setIsVideo(item.type === "video");
//   };

//   const closeMedia = () => {
//     setSelectedMedia(null);
//     setIsVideo(false);
//   };

//   return (
//     <div className="gallery-container">
//       <h1 className="gallery-title">Our Gallery</h1>
//       <p className="gallery-subtitle">
//         Showcasing our latest designs and projects<br/>
//         Choose your best design and let Kazisiba style it within the shortest period of time
//       </p>

//       <div className="gallery-grid">
//         {mediaItems.map((item) => (
//           <div key={item.id} className="gallery-item" onClick={() => openMedia(item)}>
//             {item.type === "image" ? (
//               <img src={item.src} alt="" className="gallery-img" />
//             ) : (
//               <video src={item.src} className="gallery-img" />
//             )}
//           </div>
//         ))}
//       </div>

//       {selectedMedia && (
//         <div className="lightbox" onClick={closeMedia}>
//           <span className="close">&times;</span>
//           {isVideo ? (
//             <video src={selectedMedia} controls autoPlay className="lightbox-img" />
//           ) : (
//             <img src={selectedMedia} alt="Selected" className="lightbox-img" />
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Gallery;



import { useEffect, useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Gallery.css';

function Gallery() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [dynamicMedia, setDynamicMedia] = useState([]);

  useEffect(() => {
    // Fetch uploaded gallery media from backend
    fetch("http://localhost:5000/uploads/gallery/gallery.json")
      .then((res) => res.json())
      .then((data) => {
        // prepend backend URL so images/videos load correctly
        const formattedData = data.reverse().map(item => ({
          ...item,
          src: `http://localhost:5000/${item.path.replace(/\\/g, "/")}`, // ensure proper slashes
        }));
        setDynamicMedia(formattedData);
      })
      .catch((err) => console.error("Error fetching gallery media:", err));
  }, []);

  const hardcodedMedia = [
    { id: 1, src: "/images/videoframe_4594.png", type: "image" },
    { id: 2, src: "/images/neon-robot-vacuum-cleaner (1).jpg", type: "image" },
    { id: 3, src: "/images/283d0c8ac5ed5f365c9c8d58d3a3518f.jpg", type: "image" },
    { id: 4, src: "/images/74d4ce458519225ba04a97f28c245eb8.jpg", type: "image" },
    { id: 5, src: "/images/futuristic-kitchen-interior-design.jpg", type: "image" },
    { id: 6, src: "/images/3d-rendering-classic-interior.jpg", type: "image" },
    { id: 7, src: "/images/3d-rendering-modern-dining-room-living-room-with-luxury-decor.jpg", type: "image" },
    { id: 8, src: "/images/3d-room-interior-with-classic-design-furniture.jpg", type: "image" },
    { id: 9, src: "/images/96e6e6af520f3436de260b40653f2b74.jpg", type: "image" },
    { id: 10, src: "/images/0c70f62259e753379958cb940e89e1e2.jpg", type: "image" },
    { id: 30, src: "/videos/sample-video.mp4", type: "video" },
  ];

  // Merge dynamic + hardcoded media
  const mediaItems = [...dynamicMedia.map((item, index) => ({
    id: `dynamic-${index}`,
    src: item.src,
    type: item.filetype
  })), ...hardcodedMedia];

  const openMedia = (item) => {
    setSelectedMedia(item.src);
    setIsVideo(item.type === "video");
  };

  const closeMedia = () => {
    setSelectedMedia(null);
    setIsVideo(false);
  };

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Our Gallery</h1>
      <p className="gallery-subtitle">
        Showcasing our latest designs and projects<br/>
        Choose your best design and let Kazisiba style it within the shortest period of time
      </p>

      <div className="gallery-grid">
        {mediaItems.map((item) => (
          <div key={item.id} className="gallery-item" onClick={() => openMedia(item)}>
            {item.type === "image" ? (
              <img src={item.src} alt="" className="gallery-img" />
            ) : (
              <video src={item.src} className="gallery-img" />
            )}
          </div>
        ))}
      </div>

      {selectedMedia && (
        <div className="lightbox" onClick={closeMedia}>
          <span className="close">&times;</span>
          {isVideo ? (
            <video src={selectedMedia} controls autoPlay className="lightbox-img" />
          ) : (
            <img src={selectedMedia} alt="Selected" className="lightbox-img" />
          )}
        </div>
      )}
    </div>
  );
}

export default Gallery;
