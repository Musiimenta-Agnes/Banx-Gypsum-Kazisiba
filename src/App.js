import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React, { useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Static pages
import AboutUs from './pages/About';
import ContactUs from './pages/Contact';
import OurProducts from './pages/productsPages/Products';
import OurStores from './pages/productsPages/Stores';
import OurFooter from './components/Footer';
import OurHeader from './components/Header';
import HeroSection from './components/HeroSection';
import WhatsAppButton from './components/WhatsappButton';
import FAQsSection from './components/FAQsSetion';


// Admin pages
import AddUser from './dashboard/pages/RegisterAdimin';
import ShowUsers from './dashboard/pages/ShowAdmins';
import DashboardLayout from './dashboard/components/SideBarLayout';
import AdminAddProduct from './dashboard/pages/AddProduct';
import AdminProductList from './dashboard/pages/DeletingProduct';
import ViewCustomers from './dashboard/pages/ViewCustomers';
import AdminOrders from './dashboard/pages/ViewOrders';
import ViewDirectOrders from './dashboard/pages/ViewDirectOrders';
import DashboardOpeningPage from './dashboard/pages/OpeningPage';
import MostBoughtItemsChart from './dashboard/pages/MostBoughtItems';
import DeliveredOrders from './dashboard/pages/ViewDelivered Orders';
import AdminContactEditor from './dashboard/pages/AdminContactEditor';
import AdminEditAbout from './dashboard/pages/AdminEditAbout';
import AddFAQ from './dashboard/pages/AddFAQ';
import Profile from './dashboard/pages/AdminProfile';
import MyProfile from './dashboard/pages/MyProfile';
import AdminProfile from './dashboard/pages/ViewAdminProf';

//  Admin login form (NEW)
import AdminLoginForm from './dashboard/pages/AdminLogin';



const API_URL = process.env.REACT_APP_API_URL;

function LayoutWrapper() {
  const location = useLocation();

  //  Match all admin-related pages
  const isAdminPage =
    location.pathname === '/cool-panel' ||
    location.pathname.startsWith('/dashadmin/*') ||
    location.pathname.startsWith('/add-') ||
    location.pathname.startsWith('/show-') ||
    location.pathname.startsWith('/delete-') ||
    location.pathname.startsWith('/edit-') ||
    location.pathname.startsWith('/admin-contact-editor')||
    location.pathname.startsWith('/admin-about-editor')||
    location.pathname.startsWith('/faq')||
    location.pathname.startsWith('/profile')||
    location.pathname.startsWith('/admin-profile')||
    location.pathname.startsWith('/my-profile')||
    location.pathname.startsWith('/view-');

  return (
    <>
      {!isAdminPage && <OurHeader />}


      <Routes>
        {/* Admin Login */}
        <Route path="/cool-panel" element={<AdminLoginForm />} />

        {/* Admin Dashboard */}
        <Route path="/dashadmin/*" element={<DashboardLayout><DashboardOpeningPage /></DashboardLayout>} />
        <Route path="/add-user" element={<DashboardLayout><AddUser /></DashboardLayout>} />
        <Route path="/show-users" element={<DashboardLayout><ShowUsers /></DashboardLayout>} />
        <Route path="/add-product" element={<DashboardLayout><AdminAddProduct /></DashboardLayout>} />
        <Route path="/delete-product" element={<DashboardLayout><AdminProductList /></DashboardLayout>} />
        <Route path="/view-customers" element={<DashboardLayout><ViewCustomers /></DashboardLayout>} />
        <Route path="/view-all-orders" element={<DashboardLayout><AdminOrders /></DashboardLayout>} />
        <Route path="/view-direct-orders" element={<DashboardLayout><ViewDirectOrders /></DashboardLayout>} />
        <Route path="/view-most-bought-items" element={<DashboardLayout><MostBoughtItemsChart /></DashboardLayout>} />
        <Route path="/view-delivered-orders" element={<DashboardLayout><DeliveredOrders /></DashboardLayout>} />
        <Route path="/admin-contact-editor" element={<DashboardLayout><AdminContactEditor /></DashboardLayout>} />
        <Route path="/admin-about-editor" element={<DashboardLayout><AdminEditAbout /></DashboardLayout>} />
        <Route path="/faq" element={<DashboardLayout><AddFAQ /></DashboardLayout>} />
        <Route path="/profile" element={<DashboardLayout><Profile /></DashboardLayout>} />
        <Route path="/my-profile" element={<DashboardLayout><MyProfile /></DashboardLayout>} />
        <Route path="/admin-profile" element={<DashboardLayout><AdminProfile /></DashboardLayout>} />
        <Route path="/profile/:id" element={<AdminProfile />} />

       

        {/* Public Pages */}
        <Route path="/" element={<HeroSection />} />
        <Route path="/About" element={<AboutUs />} />
        <Route path="/Contact" element={<ContactUs />} />
        <Route path="/Products" element={<OurProducts />} />
        <Route path="/stores" element={<OurStores />} />
        <Route path="/herosection" element={<HeroSection />} />
        <Route path="/questions" element={<FAQsSection />} />


      </Routes>

      {!isAdminPage && <WhatsAppButton />}
      {!isAdminPage && <OurFooter />}
    </>
  );
}


function App() {

  useEffect(() => {
    const hasVisited = localStorage.getItem('has_visited');
    if (!hasVisited) {
      axios.post(`${API_URL}/api/views/add`)
        .then(() => {
          localStorage.setItem('has_visited', 'true');
          console.log('Unique visitor recorded.');
        })
        .catch(err => console.error('Failed to record view:', err));
    }
  }, []);

  return (

        <Router>
          <div className="container-fluid">
            <ToastContainer position="top-center" autoClose={3000} />
            <LayoutWrapper />
          </div>
        </Router>


  );
}

export default App;


