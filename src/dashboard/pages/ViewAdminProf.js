// src/dashboard/pages/AdminProfile.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

const API_URL = process.env.REACT_APP_API_URL;

const AdminProfile = () => {
  const { id } = useParams();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
    fetchAdmin();
  }, [id]);

  const fetchAdmin = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/user/get_admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Ensure profile_image points to the correct full path
      const adminData = res.data;
      if (adminData.profile_image && !adminData.profile_image.startsWith("http")) {
        adminData.profile_image = `${API_URL}${adminData.profile_image}`;
      }

      setAdmin(adminData);
    } catch (err) {
      console.error("Error fetching admin details:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!admin) {
    return <p className="text-center mt-5">Admin not found.</p>;
  }

  return (
    <div style={{ fontSize:'0.9rem' }}>
      <h1 className="text-center text-primary">Admin Profile</h1>
      <div className="container mt-3 d-flex justify-content-center">
        <div
          data-aos="fade-up"
          className="card shadow-lg p-4"
          style={{ width: "80%", maxWidth: "60%", textAlign: "center", border:'2px solid blue' }}
        >
          <div className="d-flex flex-column align-items-center body">
            <img
              src={admin.profile_image || "/default-avatar.png"}
              alt={admin.name}
              className="rounded-circle mb-3 border"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                borderWidth: "3px",
                borderColor: "#ddd",
              }}
            />
            <h3 className="mb-1">{admin.name}</h3>
            <hr style={{ width: "100%" }} />

            <p className="mb-1">
              <strong>Email:</strong> {admin.email || "—"}
            </p>
            <hr style={{ width: "100%" }} />

            <p className="mb-1">
              <strong>Phone:</strong> {admin.phone || "—"}
            </p>
            <hr style={{ width: "100%" }} />

            <p className="mb-0">
              <strong>Address:</strong> {admin.address || "—"}
            </p>

            {admin.bio && (
              <>
                <hr style={{ width: "100%" }} />
                <p>
                  <strong>Bio:</strong> {admin.bio}
                </p>
              </>
            )}

            <hr style={{ width: "100%" }} />
            <p>
              <strong>Joined:</strong>{" "}
              {new Date(admin.created_at).toLocaleDateString()}
            </p>
            <hr style={{ width: "100%" }} />
            <p>
              <strong>Last Updated:</strong>{" "}
              {new Date(admin.updated_at).toLocaleDateString()}
            </p>

            <Link to="/show-users" className="order-btn w-50 mt-3">
              Back
            </Link>
          </div>
        </div>
      </div>

      <br />
      <br />
    </div>
  );
};

export default AdminProfile;


