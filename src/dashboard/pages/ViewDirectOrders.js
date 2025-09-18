import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = process.env.REACT_APP_API_URL;

function ViewDirectOrders() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const threshold = 200;

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  useEffect(() => {
    fetchMessages();
    fetchUnreadCount();
  }, []);

  const fetchMessages = () => {
    const token = localStorage.getItem('token');

    axios.get(`${API_URL}/api/direct_order/all-messages`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        const sorted = res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setMessages(sorted);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch messages:', err);
        setLoading(false);
      });
  };

  const fetchUnreadCount = () => {
    const token = localStorage.getItem('token');

    axios.get(`${API_URL}/api/direct_order/unread_messages_count`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setUnreadCount(res.data.count);
      })
      .catch(err => {
        console.error('Failed to fetch unread message count:', err);
      });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await axios.delete(`${API_URL}/api/direct_order/delete-message/${id}`);
        fetchMessages();
        fetchUnreadCount(); // Refresh unread count
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  const toggleDelivered = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token'); //  Get the token
      await axios.patch(
        `${API_URL}/api/direct_order/mark-delivered/${id}`,
        { is_delivered: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}` //  Send token in headers
          }
        }
      );
      fetchMessages();
      fetchUnreadCount();
    } catch (err) {
      console.error('Failed to update delivery status:', err);
    }
  };
  

  const toggleRejected = async (id, currentStatus) => {
    try {
      await axios.patch(`${API_URL}/api/direct_order/reject-order/${id}`, {
        is_rejected: !currentStatus,
      });
      fetchMessages();
    } catch (err) {
      console.error('Failed to update rejection status:', err);
    }
  };

  const exportCSV = () => {
    const csv = Papa.unparse(
      messages.map(m => ({
        ID: m.id,
        Name: m.name,
        Phone: m.phone,
        Subject: m.subject,
        Message: m.message,
        CreatedAt: m.created_at,
        Delivered: m.is_delivered ? 'Yes' : 'No',
        Rejected: m.is_rejected ? 'Yes' : 'No'
      }))
    );
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `direct_messages_${Date.now()}.csv`);
    setMessages([]);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableData = messages.map(m => [
      m.id, m.name, m.phone, m.subject, m.message,
      new Date(m.created_at).toLocaleString(),
      m.is_delivered ? 'Yes' : 'No',
      m.is_rejected ? 'Yes' : 'No'
    ]);
    doc.text("Direct Messages Report", 14, 20);
    doc.autoTable({
      head: [['ID', 'Name', 'Phone', 'Subject', 'Message', 'Time', 'Delivered', 'Rejected']],
      body: tableData,
      startY: 30,
      theme: 'grid'
    });
    doc.save(`direct_messages_${Date.now()}.pdf`);
    setMessages([]);
  };

  return (
    <div className="container body" style={{ marginLeft: '21px', fontSize:'0.9rem' }}>

<div style={{display:'flex', justifyContent:'center', gap:'4rem'}}>
  <div><h3 className="text-center text-primary" data-aos="fade-down">Direct Orders</h3></div>
  <div><p  className="text-center  mt-2 text-primary">Unread Messages: <strong>{unreadCount}</strong></p></div>
</div>


      {!loading && messages.length >= threshold && (
        <div className="alert alert-warning">
          ⚠️ You have {messages.length} direct messages — please export them now
          <button className="btn btn-sm btn-success ms-3" onClick={exportCSV}>Export CSV</button>
          <button className="btn btn-sm btn-primary ms-2" onClick={exportPDF}>Export PDF</button>
        </div>
      )}

      {loading ? <p>Loading...</p> : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered" data-aos='fade-up' style={{borderRadius:'8px'}}>
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Time</th>
                <th>Delivered</th>
                <th>Rejected</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(msg => (
                <tr key={msg.id}>
                  <td className='text-primary'>{msg.id}</td>
                  <td>{msg.name}</td>
                  <td className='text-primary'>{msg.phone}</td>
                  <td>{msg.subject}</td>
                  <td className='text-primary'>{msg.message}</td>
                  <td>
                    {new Date(msg.created_at).toLocaleString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="text-center">
                    <input
                      style={{ backgroundColor: 'green', color: 'white' }}
                      type="checkbox"
                      checked={msg.is_delivered}
                      onChange={() => toggleDelivered(msg.id, msg.is_delivered)}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      style={{ backgroundColor: 'red' }}
                      type="checkbox"
                      checked={msg.is_rejected}
                      onChange={() => toggleRejected(msg.id, msg.is_rejected)}
                    />
                  </td>
                  <td className="text-center">
                    <button onClick={() => handleDelete(msg.id)} className="btn btn-danger btn-sm">
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ViewDirectOrders;

