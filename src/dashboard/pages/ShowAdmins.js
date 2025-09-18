// src/dashboard/pages/ShowAdmins.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

const ShowAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/api/user/get_all_admins`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAdmins(res.data.admins.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to fetch admins.');
    }
  };

  const handleDelete = async (adminId) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/user/delete_admin/${adminId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAdmins(prev => prev.filter(admin => admin.id !== adminId));
      toast.success('Admin deleted successfully.');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete admin.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = (adminId) => {
    navigate(`/profile/${adminId}`);
  };

  return (
    <div className="container body" style={{ fontSize: '0.9rem' }}>
      <h3 className="text-center text-primary" data-aos="fade-down">Adminstrators Page</h3>
      <br />
      <table className="table table-striped table-bordered align-middle" data-aos="fade-up">
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Joined</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(admin => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>{admin.name}</td>
              <td>{admin.email || '—'}</td>
              <td>{admin.phone}</td>
              <td>{new Date(admin.created_at).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => handleViewProfile(admin.id)}
                  disabled={loading}
                >
                  Profile
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(admin.id)}
                  disabled={loading}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowAdmins;
