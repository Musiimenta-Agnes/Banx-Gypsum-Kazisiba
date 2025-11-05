import React from "react";
import "./Styles.css";

const UploadManager = () => {
  return (
    <div className="upload-page fade-in">
      <h2 className="upload-title">Upload Media</h2>
      <p className="upload-subtext">Upload images or videos to add to the gallery.</p>

      <form className="upload-form slide-up">
        <div className="form-group">
          <label>Select File</label>
          <input type="file" accept="image/*,video/*" />
        </div>

        <div className="form-group">
          <label>Title</label>
          <input type="text" placeholder="Enter title" />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea placeholder="Enter description"></textarea>
        </div>

        <button type="submit" className="btn-upload glow-button">Upload</button>
      </form>
    </div>
  );
};

export default UploadManager;
