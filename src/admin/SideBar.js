
// import React, { useState, useEffect } from 'react';
// import { Nav } from 'react-bootstrap';
// import { Link, useLocation } from 'react-router-dom';
// import { FaHome, FaUpload, FaUserCircle } from 'react-icons/fa';
// import './SideBar.css';

// const TopNav = () => {
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleToggle = () => setIsOpen(!isOpen);
//   const handleLinkClick = () => {
//     if (isMobile) setIsOpen(false);
//   };

//   const isActive = (path) => location.pathname === path;

//   return (
//     <div className="topnav-container">
//       <div className="topnav-logo">
//         <img src="/images/logo.png" alt="Logo" />
//         {isMobile && (
//           <button onClick={handleToggle} className="topnav-toggle">
//             <i className="bi bi-list"></i>
//           </button>
//         )}
//       </div>

//       <Nav
//         className={`topnav-links ${isMobile ? (isOpen ? 'open' : 'closed') : ''}`}
//       >
//         <Nav.Link
//           as={Link}
//           to="/kazisiba-admin"
//           className={isActive('/kazisiba-admin') ? 'active-link' : ''}
//           onClick={handleLinkClick}
//         >
//           <FaHome /> Dashboard
//         </Nav.Link>
//         <Nav.Link
//           as={Link}
//           to="/kazisiba-admin/upload"
//           className={isActive('/kazisiba-admin/upload') ? 'active-link' : ''}
//           onClick={handleLinkClick}
//         >
//           <FaUpload /> Upload Content
//         </Nav.Link>
//         <Nav.Link
//           as={Link}
//           to="/kazisiba-admin/profile"
//           className={isActive('/kazisiba-admin/profile') ? 'active-link' : ''}
//           onClick={handleLinkClick}
//         >
//           <FaUserCircle /> Admin Profile
//         </Nav.Link>
//       </Nav>
//     </div>
//   );
// };

// export default TopNav;


import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUpload, FaUserCircle } from 'react-icons/fa';
import './SideBar.css';

const TopNav = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleLinkClick = () => {
    if (isMobile) setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="topnav-container">
      {/* Logo on left */}
      <div className="topnav-logo">
        <img src="/images/logo.png" alt="Logo" />
      </div>

      {/* Toggle button on far right for mobile */}
      {isMobile && (
        <button onClick={handleToggle} className="topnav-toggle">
          <i className="bi bi-list"></i>
        </button>
      )}

      {/* Links */}
      <Nav
        className={`topnav-links ${isMobile ? (isOpen ? 'open' : 'closed') : ''}`}
      >
        <Nav.Link
          as={Link}
          to="/kazisiba-admin"
          className={isActive('/kazisiba-admin') ? 'active-link' : ''}
          onClick={handleLinkClick}
        >
          <FaHome /> Dashboard
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/kazisiba-admin/upload"
          className={isActive('/kazisiba-admin/upload') ? 'active-link' : ''}
          onClick={handleLinkClick}
        >
          <FaUpload /> Upload Content
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/kazisiba-admin/profile"
          className={isActive('/kazisiba-admin/profile') ? 'active-link' : ''}
          onClick={handleLinkClick}
        >
          <FaUserCircle /> Admin Profile
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default TopNav;
