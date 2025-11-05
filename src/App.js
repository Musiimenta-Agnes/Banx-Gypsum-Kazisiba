// import './App.css';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';


// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Static pages
// import AboutUs from './pages/About';
// import ContactUs from './pages/Contact';
// import Projects from './pages/Projects';
// import OurFooter from './components/Footer';
// import OurHeader from './components/Header';
// import UpcomingProjects from './pages/UpcomingProjects';
// import HeroSection from './components/HeroSection';
// import WhatsAppButton from './components/WhatsappButton';


// // Admin pages


// import DashboardLayout from './dashboard/components/SideBarLayout';
// import DashboardOpeningPage from './dashboard/pages/OpeningPage';

// //  Admin login form (NEW)
// import AdminLoginForm from './dashboard/pages/AdminLogin';
// import FAQPage from './pages/Questions';
// import Gallery from './pages/Gallery';
// import ProjectsInProcess from './pages/ProjectsInProcess';



// function LayoutWrapper() {
//   const location = useLocation();

//   //  Match all admin-related pages
//   const isAdminPage =
//     location.pathname === '/cool-panel' ||
//     location.pathname.startsWith('/dashadmin/*') ||
//     location.pathname.startsWith('/add-') ||
//     location.pathname.startsWith('/profile')||
//     location.pathname.startsWith('/admin-profile')||
//     location.pathname.startsWith('/my-profile')||
//     location.pathname.startsWith('/view-');

//   return (
//     <>
//       {!isAdminPage && <OurHeader />}


//       <Routes>
//         {/* Admin Login */}
//         <Route path="/cool-panel" element={<AdminLoginForm />} />
//         {/* Admin Dashboard */}
//         <Route path="/kazisiba" element={<DashboardLayout><DashboardOpeningPage /></DashboardLayout>} />
      
   

       

//         {/* Public Pages */}
//         <Route path="/" element={<HeroSection />} />
//         <Route path="/About" element={<AboutUs />} />
//         <Route path="/Contact" element={<ContactUs />} />
//         <Route path="/completed-projects" element={<Projects />} />
//         <Route path="/gallrey" element={<Gallery />} />
//         <Route path="/herosection" element={<HeroSection />} />
//         <Route path="/questions" element={<FAQPage />} />
//         <Route path="/upcoming" element={<UpcomingProjects />} />
//         <Route path="/process" element={<ProjectsInProcess />} />


//       </Routes>

//       {!isAdminPage && <WhatsAppButton />}
//       {!isAdminPage && <OurFooter />}
//     </>
//   );
// }


// function App() {


//   return (

//         <Router>
//           <div className="container-fluid">
//             <ToastContainer position="top-center" autoClose={3000} />
//             <LayoutWrapper />
//           </div>
//         </Router>


//   );
// }

// export default App;



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
// import UpcomingProjects from './pages/UpcomingProjects';
// import HeroSection from './components/HeroSection';
// import WhatsAppButton from './components/WhatsappButton';
// import FAQPage from './pages/Questions';
// import Gallery from './pages/Gallery';
// import ProjectsInProcess from './pages/ProjectsInProcess';

// // Admin Pages
// import AdminProfile from './admin/AdminProfile';
// import DashboardLayout from './dashboard/components/SideBarLayout';
// import AdminDashboard from './admin/AdminDashboard';
// import UploadManager from './admin/UploadManager';
// import AdminLogin from './admin/AdminLogin';

// function LayoutWrapper() {
//   const location = useLocation();

//   // ✅ Detect whether user is currently inside the admin panel
//   const isAdminPage = location.pathname.startsWith('/admin');

//   return (
//     <>
//       {/* Show header & footer only for Public Website */}
//       {!isAdminPage && <OurHeader />}

//       <Routes>
//         {/* ✅ Admin Routes (no header/footer) */}
//         <Route path="/admin/login" element={<AdminLogin />} />
//         <Route path="/admin" element={<DashboardLayout><AdminDashboard /></DashboardLayout>} />
//         <Route path="/admin/upload" element={<DashboardLayout><UploadManager /></DashboardLayout>} />
//         <Route path="/admin/profile" element={<DashboardLayout><AdminProfile /></DashboardLayout>} />

//         {/* ✅ Public Website Routes */}
//         <Route path="/" element={<HeroSection />} />
//         <Route path="/about" element={<AboutUs />} />
//         <Route path="/contact" element={<ContactUs />} />
//         <Route path="/completed-projects" element={<Projects />} />
//         <Route path="/gallery" element={<Gallery />} />
//         <Route path="/questions" element={<FAQPage />} />
//         <Route path="/upcoming" element={<UpcomingProjects />} />
//         <Route path="/process" element={<ProjectsInProcess />} />
//       </Routes>

//       {/* WhatsApp button & footer only for public pages */}
//       {!isAdminPage && <WhatsAppButton />}
//       {!isAdminPage && <OurFooter />}
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
import UpcomingProjects from './pages/UpcomingProjects';
import HeroSection from './components/HeroSection';
import WhatsAppButton from './components/WhatsappButton';
import FAQPage from './pages/Questions';
import Gallery from './pages/Gallery';
import ProjectsInProcess from './pages/ProjectsInProcess';

// Admin Pages (New Dashboard)
import AdminProfile from './admin/AdminProfile';
import DashboardLayout from './admin/SideBarLayout';
import AdminDashboard from './admin/AdminDashboard';
import UploadManager from './admin/UploadManager';

function LayoutWrapper() {
  const location = useLocation();

  // ✅ Detect whether user is inside the admin dashboard
  const isAdminPage = location.pathname.startsWith('/kazisiba-admin');

  return (
    <>
      {/* ✅ Hide header only for admin pages */}
      {!isAdminPage && <OurHeader />}
     

      <Routes>
        {/* ✅ Admin Dashboard Pages */}
        {/* <Route path="/kazisiba-admin" element={<DashboardLayout><AdminDashboard /></DashboardLayout>} />
        <Route path="/kazisiba-admin/upload" element={<DashboardLayout><UploadManager /></DashboardLayout>} />
        <Route path="/kazisiba-admin/profile" element={<DashboardLayout><AdminProfile /></DashboardLayout>} /> */}



        <Route path="/kazisiba-admin" element={<DashboardLayout><AdminDashboard /></DashboardLayout>} />
        <Route path="/kazisiba-admin/upload" element={<DashboardLayout><UploadManager /></DashboardLayout>} />
        <Route path="/kazisiba-admin/profile" element={<DashboardLayout><AdminProfile /></DashboardLayout>} />




        {/* ✅ Public Website Pages */}
        <Route path="/" element={<HeroSection />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/completed-projects" element={<Projects />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/questions" element={<FAQPage />} />
        <Route path="/upcoming" element={<UpcomingProjects />} />
        <Route path="/process" element={<ProjectsInProcess />} />
      </Routes>


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
