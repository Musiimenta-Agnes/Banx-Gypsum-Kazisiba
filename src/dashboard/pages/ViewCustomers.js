import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import MostBoughtItemsChart from './MostBoughtItems';



const API_URL = process.env.REACT_APP_API_URL;

const ViewCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/api/user/view_all_customers`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const customersData = res.data.customers || [];
      // Sort alphabetically by name (case-insensitive)
      const sorted = customersData.slice().sort((a, b) => {
        const nameA = (a.name || '').toLowerCase();
        const nameB = (b.name || '').toLowerCase();
        return nameA.localeCompare(nameB);
      });

      setCustomers(sorted);
    } catch (err) {
      setError('Failed to fetch customers.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (phone) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/user/delete_customer/${phone}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Customer deleted successfully.');
      setCustomers(prev => prev.filter(c => c.phone !== phone));
    } catch (err) {
      setError('Failed to delete customer.');
      console.error(err);
    }
  };

  return (
    <div className="container mt-1 body" style={{ fontSize:'0.9rem' }}>
<h3 className="text-center text-primary" data-aos="fade-down">All Customers</h3> 
      <br />
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <table className="table table-striped table-bordered align-middle" data-aos="fade-up" style={{borderRadius:'8px'}}>
        <thead className="table-primary">
          <tr>
            <th className="text-primary">ID</th>
            <th>Full Name</th>
            <th>Email</th> 
            <th>Phone</th>
            <th>Joined</th>
            <th>Source</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No customers found.
              </td>
            </tr>
          ) : (
            customers.map((c) => (
              <tr key={c.id || c.phone}>
                <td className="text-primary">{c.id || '-'}</td>
                <td>{c.name || '-'}</td>
                <td className="text-dark">{c.email || '—'}</td> {/* 👈 Show email if exists */}
                <td className="text-primary">{c.phone || '-'}</td>
                <td>
                  {c.joined_at
                    ? new Date(c.joined_at).toLocaleDateString()
                    : '-'}
                </td>
                <td className="text-primary">{c.source || '-'}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(c.phone)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>


      <br/>
   
    </div>
  );
};

export default ViewCustomers;
