// DeliveredOrders.js (Final Version with Auto Refill After Clear)

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';



const API_URL = process.env.REACT_APP_API_URL;

const DeliveredOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadHistory, setDownloadHistory] = useState([]);
  const [notifiedThisMonth, setNotifiedThisMonth] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const getMonthKey = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };

  const fetchDeliveredOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/api/orders/view_all_delivered_orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const sorted = res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setOrders(sorted);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch delivered orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveredOrders();

    const history = JSON.parse(localStorage.getItem('downloadHistory') || '[]');
    setDownloadHistory(history);

    const notified = localStorage.getItem(`notified-${getMonthKey()}`) === 'true';
    setNotifiedThisMonth(notified);
  }, []);

  const isLastDayOfMonth = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.getDate() === 1;
  };

  const exportCSV = () => {
    const csv = Papa.unparse(
      orders.map(o => ({
        Type: o.type,
        OrderID: o.id,
        Customer: o.customer_name,
        Phone: o.phone,
        Address: o.address || o.location || '-',
        PaymentMethod: o.payment_method || '-',
        Message: o.message || o.product_name || '-',
        CreatedAt: o.created_at,
        Status: o.status
      }))
    );
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `delivered_orders_${Date.now()}.csv`);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Type','Order ID','Customer','Phone','Address','Payment','Message','Date','Status']],
      body: orders.map(o => [
        o.type,
        o.id,
        o.customer_name,
        o.phone,
        o.address || o.location || '-',
        o.payment_method || '-',
        o.message || o.product_name || '-',
        new Date(o.created_at).toLocaleString(),
        o.status
      ]),
      startY: 30,
      theme: 'grid'
    });
    doc.save(`delivered_orders_${Date.now()}.pdf`);
  };

  const clearOrdersFromBackend = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/orders/clear_delivered_orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setOrders([]);
      fetchDeliveredOrders();  // REFRESH LIST AFTER CLEAR
    } catch (error) {
      console.error("Backend clearing failed", error);
    }
  };

  const handleManualDownload = async () => {
    if (orders.length === 0) return alert("No orders to download.");
    const confirmDownload = window.confirm("Are you sure you want to download the delivered orders?");
    if (!confirmDownload) return;

    exportCSV();
    exportPDF();

    const confirmClear = window.confirm(" Download complete. Do you want to clear the delivered orders?");
    if (confirmClear) {
      await clearOrdersFromBackend();
      updateHistory();
    }
  };

  const updateHistory = () => {
    const monthKey = getMonthKey();
    const history = [...downloadHistory, { month: monthKey, date: new Date().toISOString() }];
    setDownloadHistory(history);
    localStorage.setItem('downloadHistory', JSON.stringify(history));
    localStorage.setItem(`notified-${monthKey}`, 'true');
    setNotifiedThisMonth(true);
  };

  // Automatic reminder on last day of the month
  useEffect(() => {
    const monthKey = getMonthKey();
    const alreadyNotified = localStorage.getItem(`notified-${monthKey}`) === 'true';

    if (orders.length > 0 && isLastDayOfMonth() && !alreadyNotified) {
      const confirmDownload = window.confirm("📦 It's the end of the month! Do you want to download this month's delivered orders?");
      if (confirmDownload) {
        exportCSV();
        exportPDF();
        const confirmClear = window.confirm("✅ Download complete. Do you want to clear the delivered orders now?");
        if (confirmClear) {
          clearOrdersFromBackend();
          updateHistory();
        }
      } else {
        localStorage.setItem(`notified-${monthKey}`, 'true');
        setNotifiedThisMonth(true);
      }
    }
  }, [orders]);

  return (
    <div className="container body" style={{marginLeft:'21px', fontSize:'0.9rem'}}>

      <div style={{ justifyContent:'center', display:'flex', gap:'3rem'}}> 
        <div>
          <h3 
           style={{
            textAlign: 'center',
          }} className="text-center text-primary mb-4">
            Delivered Orders
          </h3>
        </div>
  
        <div className="mb-3 pt-17">
          <button
            className="order-btn"
            onClick={handleManualDownload}
            disabled={orders.length === 0}
          >
            📁 Download Delivered Orders
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : orders.length === 0 ? (
        <p>No delivered orders to display.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered" data-aos='fade-up' style={{borderRadius:'8px'}}>
            <thead className="table-primary">
              <tr>
                <th>Type</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Payment</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={`${order.type}-${order.id}`}>
                  <td>{order.type}</td>
                  <td className="text-primary">{order.id}</td>
                  <td>{order.customer_name}</td>
                  <td className="text-primary">{order.phone}</td>
                  <td>{order.address || order.location || '-'}</td>
                  <td className="text-primary">{order.payment_method || '-'}</td>
                  <td>{order.message || order.product_name || '-'}</td>
                  <td className="text-primary">{new Date(order.created_at).toLocaleString()}</td>
                  <td><span className="badge bg-success">{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DeliveredOrders;

