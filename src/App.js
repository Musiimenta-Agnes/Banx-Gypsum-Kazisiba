

// import './App.css';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Public Website Pages
// import AboutUs from './pages/About';
// import ContactUs from './pages/Contact';
// import Projects from './pages/Projects';
// import OurFooter from './components/Footer';
// import OurHeader from './components/Header';
// import HeroSection from './components/HeroSection';
// // import WhatsAppButton from './components/WhatsappButton';
// import FAQPage from './pages/Questions';
// import Gallery from './pages/Gallery';
// import ProjectsInProcess from './pages/ProjectsInProcess';

// // Admin Pages (New Dashboard)
// import AdminProfile from './admin/AdminProfile';
// import DashboardLayout from './admin/SideBarLayout';
// import AdminDashboard from './admin/AdminDashboard';
// import UploadManager from './admin/UploadManager';
// import Materials from './pages/Materials';

// function LayoutWrapper() {
//   const location = useLocation();

//   // ✅ Detect whether user is inside the admin dashboard
//   const isAdminPage = location.pathname.startsWith('/kazisiba-admin');

//   return (
//     <>
//       {/* ✅ Hide header only for admin pages */}
//       {!isAdminPage && <OurHeader />}
//         {!isAdminPage && <OurFooter />}
     
     

//       <Routes>
//         {/* ✅ Admin Dashboard Pages */}
//         {/* <Route path="/kazisiba-admin" element={<DashboardLayout><AdminDashboard /></DashboardLayout>} />
//         <Route path="/kazisiba-admin/upload" element={<DashboardLayout><UploadManager /></DashboardLayout>} />
//         <Route path="/kazisiba-admin/profile" element={<DashboardLayout><AdminProfile /></DashboardLayout>} /> */}



//         <Route path="/kazisiba-admin" element={<DashboardLayout><AdminDashboard /></DashboardLayout>} />
//         <Route path="/kazisiba-admin/upload" element={<DashboardLayout><UploadManager /></DashboardLayout>} />
//         <Route path="/kazisiba-admin/profile" element={<DashboardLayout><AdminProfile /></DashboardLayout>} />




//         {/* ✅ Public Website Pages */}
//         <Route path="/" element={<HeroSection />} />
//         <Route path="/about" element={<AboutUs />} />
//         <Route path="/contact" element={<ContactUs />} />
//         <Route path="/completed-projects" element={<Projects />} />
//         <Route path="/gallery" element={<Gallery />} />
//         <Route path="/questions" element={<FAQPage />} />
//         <Route path="/materials" element={<Materials />} />
//         <Route path="/process" element={<ProjectsInProcess />} />
//       </Routes>


// <br/>
// <OurFooter/>



//     </>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <div className="container-fluid">
//         <ToastContainer position="top-center" autoClose={3000} />
//         <LayoutWrapper />
//       </div>
//     </Router>
//   );
// }

// export default App;


import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Public Website Pages
import AboutUs from './pages/About';
import ContactUs from './pages/Contact';
import Projects from './pages/Projects';
import OurFooter from './components/Footer';
import OurHeader from './components/Header';
import HeroSection from './components/HeroSection';
// import WhatsAppButton from './components/WhatsappButton';
import FAQPage from './pages/Questions';
import Gallery from './pages/Gallery';
import ProjectsInProcess from './pages/ProjectsInProcess';
import Materials from './pages/Materials';

// Admin Pages
import AdminProfile from './admin/AdminProfile';
import DashboardLayout from './admin/SideBarLayout';
import AdminDashboard from './admin/AdminDashboard';
import UploadManager from './admin/UploadManager';

function LayoutWrapper() {
  const location = useLocation();

  // Detect whether user is inside the admin dashboard
  const isAdminPage = location.pathname.startsWith('/kazisiba-admin');

  return (
    <>
      {/* Header only for public pages */}
      {!isAdminPage && <OurHeader />}

      <Routes>
        {/* Admin Dashboard Pages */}
        <Route path="/kazisiba-admin" element={<DashboardLayout><AdminDashboard /></DashboardLayout>} />
        <Route path="/kazisiba-admin/upload" element={<DashboardLayout><UploadManager /></DashboardLayout>} />
        <Route path="/kazisiba-admin/profile" element={<DashboardLayout><AdminProfile /></DashboardLayout>} />

        {/* Public Website Pages */}
        <Route path="/" element={<HeroSection />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/completed-projects" element={<Projects />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/questions" element={<FAQPage />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/process" element={<ProjectsInProcess />} />
      </Routes>

      {/* Footer only for public pages */}
      {!isAdminPage && <OurFooter />}
    </>
  );
}

function App() {
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
