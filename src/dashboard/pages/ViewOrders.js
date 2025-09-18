import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 
// import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = process.env.REACT_APP_API_URL;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const threshold = 200;

  // useEffect(() => { 
  //   AOS.init({ duration: 800, easing: 'ease-in-out', once: true }); 
  // }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/api/orders/view_all_orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const sorted = res.data.orders.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
      setOrders(sorted);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch orders.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleStatus = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/api/orders/update_order_status/${orderId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert('Failed to toggle order status');
    }
  };

  const toggleReject = async (orderId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/api/orders/reject_order/${orderId}`, {
        is_rejected: !currentStatus
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert('Failed to toggle reject status');
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/orders/delete_order/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert('Failed to delete the order.');
    }
  };

  // Helper to resolve image URL correctly for backend or hardcoded images
  const resolveImageUrl = (imgPath) => {
    if (!imgPath) return '';
    if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) return imgPath;
    if (imgPath.startsWith('/static/uploads')) return `${API_URL}${imgPath}`;
    return imgPath; // Assume local hardcoded image path (e.g. /images/...)
  };

  const handleViewImages = (items) => {
    setSelectedImages(items);
    setShowModal(true);
  };

  const exportCSV = () => {
    if (!window.confirm("Export orders as CSV and clear the current list?")) return;
    const csv = Papa.unparse(
      orders.map(o => ({
        OrderID: o.order_id,
        Customer: o.customer_name,
        Phone: o.phone,
        Address: o.address,
        StreetNumber: o.street_number,
        PaymentMethod: o.payment_method,
        Message: o.message,
        CreatedAt: o.created_at,
        Status: o.status,
        IsRejected: o.is_rejected
      }))
    );
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `orders_${Date.now()}.csv`);
    setOrders([]); // clear after export
  };

  const exportPDF = () => {
    if (!window.confirm("Export orders as PDF and clear the current list?")) return;
    const doc = new jsPDF();
    const tableData = orders.map(o => [
      o.order_id, o.customer_name, o.phone,
      o.address, o.street_number, o.payment_method,
      o.message, new Date(o.created_at).toLocaleString(),
      o.status, o.is_rejected ? 'Yes' : 'No'
    ]);
    doc.text("Order Report", 14, 20);
    doc.autoTable({
      head: [['Order ID','Customer','Phone','Address','Street #','Payment','Message','Date','Status','Rejected']],
      body: tableData,
      startY: 30,
      theme: 'grid'
    });
    doc.save(`orders_${Date.now()}.pdf`);
    setOrders([]); // clear after export
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container body" style={{marginLeft:'28px', fontSize:'0.8rem'}}>
      <h3 className="text-center text-primary">Cart Orders</h3>
      <br/>

      {!loading && orders.length > 0 && orders.length >= threshold && (
        <div className="alert alert-warning">
          ⚠️ There are {orders.length} orders — please export them now
          <button className="btn btn-sm btn-success ms-3" onClick={exportCSV}>Export CSV</button>
          <button className="btn btn-sm btn-primary ms-2" onClick={exportPDF}>Export PDF</button>
        </div>
      )}

      {!loading && orders.length === 0 && (
        <div className="text-center">
          <p>No orders to display.</p>
        </div>
      )}

      {!loading && orders.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle" style={{borderRadius:'8px'}}>
            <thead className="table-primary">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Street No.</th>
                <th>Payment Method</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
                <th>Items</th>
                <th>Rejected</th>
                <th>Actions</th>
                <th>Del</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.order_id}>
                  <td className='text-primary'>{order.order_id}</td>
                  <td>{order.customer_name}</td>
                  <td className='text-primary'>{order.phone}</td>
                  <td>{order.address}</td>
                  <td className='text-primary'>{order.street_number}</td>
                  <td>{order.payment_method}</td>
                  <td className='text-primary'>{order.message || '-'}</td>
                  <td>{new Date(order.created_at).toLocaleString('en-US', {
                    hour:'numeric', minute:'numeric', hour12:true,
                    day:'numeric', month:'short', year:'numeric'
                  })}</td>
                  <td>
                  <td>
                    <span
                      className={`badge fw-bold text-white`}
                      style={{
                        
                        backgroundColor: order.is_rejected
                          ? 'red'
                          : order.status === 'Delivered'
                          ? 'green'
                          : 'skyblue'
                      }}
                    >
                      {order.is_rejected ? 'Rejected' : order.status}
                    </span>
                  </td>


                  </td>
                  <td>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleViewImages(order.items)}
                    >
                      Images
                    </button>
                  </td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={order.is_rejected}
                      onChange={() => toggleReject(order.order_id, order.is_rejected)}
                      title="Reject Order"
                    />
                  </td>
                  <td className="text-center">
                      <button
                        className="btn btn-sm"
                        style={{
                          backgroundColor: order.status === 'Pending' ? 'darkblue' : '#198754',
                          color: 'white',
                        }}
                        onClick={() => toggleStatus(order.order_id)}
                      >
                        {order.status === 'Pending' ? 'Deliver' : 'Delivered'}
                      </button>

                    
                  </td>
                  
                  <td className='text-center pt-4'>
                    <p  className="btn btn-sm btn-danger" onClick={() => deleteOrder(order.order_id)}>
                        <i className="bi bi-trash text-white"></i>
                    </p> 
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for images */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog" onClick={() => setShowModal(false)}>
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document" onClick={e => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Order Images</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body d-flex flex-wrap gap-3 justify-content-start">
                {selectedImages.length > 0 ? (
                  selectedImages.map((item, index) => (
                    <div key={index} style={{ width: '160px', textAlign: 'center' }}>
                      <img
                        src={resolveImageUrl(item.image)}
                        alt={item.product_name}
                        style={{
                          width: '100%',
                          height: '120px',
                          objectFit: 'cover',
                          borderRadius: '6px',
                          border: '1px solid #ccc',
                        }}
                      />
                      <p className="mt-2 mb-1 fw-bold">{item.product_name}</p>
                      <p className="mb-0 text-primary">Qty: {item.quantity}</p>
                    </div>
                  ))
                ) : (
                  <p>No items found for this order.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminOrders;

