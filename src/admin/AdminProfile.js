import React from "react";
import "./Styles.css";

const AdminProfile = () => {
  return (
    <div className="profile-container">
      <h2>Admin Profile</h2>
      <div className="profile-card">
        <div className="profile-avatar">
          <i className="bi bi-person-circle"></i>
        </div>
        <div className="profile-info">
          <h3>Admin Name</h3>
          <p>Email: admin@banxgypsum.com</p>
          <p>Role: Super Admin</p>
          <button className="btn-edit">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
