import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Static pages
import AboutUs from './pages/About';
import ContactUs from './pages/Contact';
import Projects from './pages/Projects';
import OurFooter from './components/Footer';
import OurHeader from './components/Header';
import UpcomingProjects from './pages/UpcomingProjects';
import HeroSection from './components/HeroSection';
import WhatsAppButton from './components/WhatsappButton';


// Admin pages


import DashboardLayout from './dashboard/components/SideBarLayout';
import DashboardOpeningPage from './dashboard/pages/OpeningPage';
import AddFAQ from './dashboard/pages/AddFAQ';

//  Admin login form (NEW)
import AdminLoginForm from './dashboard/pages/AdminLogin';
import FAQPage from './pages/Questions';
import Gallery from './pages/Gallery';
import ProjectsInProcess from './pages/ProjectsInProcess';



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
        <Route path="/faq" element={<DashboardLayout><AddFAQ /></DashboardLayout>} />
   

       

        {/* Public Pages */}
        <Route path="/" element={<HeroSection />} />
        <Route path="/About" element={<AboutUs />} />
        <Route path="/Contact" element={<ContactUs />} />
        <Route path="/completed-projects" element={<Projects />} />
        <Route path="/gallrey" element={<Gallery />} />
        <Route path="/herosection" element={<HeroSection />} />
        <Route path="/questions" element={<FAQPage />} />
        <Route path="/upcoming" element={<UpcomingProjects />} />
        <Route path="/process" element={<ProjectsInProcess />} />


      </Routes>

      {!isAdminPage && <WhatsAppButton />}
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


