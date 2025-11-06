
import React, { useState } from "react";
import "./Styles.css";

const UploadManager = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [page, setPage] = useState("gallery");
  const [section, setSection] = useState("");

  const sectionsByPage = {
    gallery: [],
    projects: [],
    homepage: [],
    materials: ["gypsum", "ceiling", "wall panels"], // sections optional
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !title || (sectionsByPage[page].length && !section && page !== "materials")) {
      alert("Please fill all required fields and select a file/section if required.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("page", page);
    if (section) formData.append("section", section);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("File uploaded successfully!");
        setFile(null);
        setTitle("");
        setPage("gallery");
        setSection("");
      } else {
        alert(data.message || "Upload failed.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while uploading.");
    }
  };

  return (
    <div className="upload-page fade-in">
      <h2 className="upload-title">Upload Media</h2>
      <p className="upload-subtext">Upload images or videos to add to the website.</p>

      <form className="upload-form slide-up" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select File</label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Choose Page</label>
          <select
            value={page}
            onChange={(e) => {
              setPage(e.target.value);
              setSection("");
            }}
          >
            <option value="gallery">Gallery</option>
            <option value="projects">Projects</option>
            <option value="materials">Materials</option>
            <option value="homepage">Home Page</option>
          </select>
        </div>

        {sectionsByPage[page].length > 0 && (
          <div className="form-group">
            <label>Choose Section (Optional)</label>
            <select value={section} onChange={(e) => setSection(e.target.value)}>
              <option value="">-- None --</option>
              {sectionsByPage[page].map((sec) => (
                <option key={sec} value={sec}>
                  {sec.charAt(0).toUpperCase() + sec.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}

        <button type="submit" className="btn-upload glow-button">
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadManager;

















// import React, { useState } from "react";
// import "./Styles.css";

// const UploadManager = () => {
//   const [file, setFile] = useState(null);
//   const [title, setTitle] = useState("");
//   const [page, setPage] = useState("gallery");
//   const [section, setSection] = useState("");

//   const sectionsByPage = {
//     gallery: [],
//     projects: [],
//     homepage: [],
//     materials: ["gypsum", "ceiling", "wall panels"],
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file || !title || (sectionsByPage[page].length && !section)) {
//       alert("Please fill all required fields and select a file/section if required.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("title", title);
//     formData.append("page", page);
//     if (section) formData.append("section", section);

//     try {
//       const res = await fetch("http://localhost:5000/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("File uploaded successfully!");
//         setFile(null);
//         setTitle("");
//         setPage("gallery");
//         setSection("");
//       } else {
//         alert(data.message || "Upload failed.");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("An error occurred while uploading.");
//     }
//   };

//   return (
//     <div className="upload-page fade-in">
//       <h2 className="upload-title">Upload Media</h2>
//       <p className="upload-subtext">Upload images or videos to add to the website.</p>

//       <form className="upload-form slide-up" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Select File</label>
//           <input type="file" accept="image/*,video/*" onChange={(e) => setFile(e.target.files[0])} />
//         </div>

//         <div className="form-group">
//           <label>Title</label>
//           <input type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
//         </div>


//        <div className="form-group">
//           <label>Choose Page</label>
//           <select value={page} onChange={(e) => { setPage(e.target.value); setSection(""); }}>
//             <option value="gallery">Gallery</option>
//             <option value="projects">Projects</option>
//             {/* <option value="homepage">Home Page</option> */}
//             {/* <option value="materials">Materials</option> */}
//           </select>
//         </div> 

//         {sectionsByPage[page].length > 0 && (
//           <div className="form-group">
//             <label>Choose Section</label>
//             <select value={section} onChange={(e) => setSection(e.target.value)}>
//               <option value="">-- Select Section --</option>
//               {sectionsByPage[page].map((sec) => (
//                 <option key={sec} value={sec}>{sec.charAt(0).toUpperCase() + sec.slice(1)}</option>
//               ))}
//             </select>
//           </div>
//         )}

//         <button type="submit" className="btn-upload glow-button">Upload</button>
//       </form>
//     </div>
//   );
// };

// export default UploadManager;

