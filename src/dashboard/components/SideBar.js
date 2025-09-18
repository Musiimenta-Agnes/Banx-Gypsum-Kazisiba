
// src/dashboard/components/SideBar.js
import React, { useState, useEffect } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome, FaBoxOpen, FaUsers, FaUser, FaEdit,
  FaShoppingCart, FaUserFriends, FaClipboardList
} from 'react-icons/fa';
import './SideBar.css';

const SideBar = () => {
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

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      {isMobile && (
        <button
          onClick={handleToggle}
          className="btn btn-light d-md-none position-fixed m-10"
          style={{ zIndex: 1100, marginTop: '60px', color: 'white', backgroundColor: 'black' }}
        >
          <i className="bi bi-list" style={{ fontSize: '1.5rem' }}></i>
        </button>
      )}

      {isMobile && isOpen && (
        <div className="sidebar-backdrop" onClick={handleToggle} />
      )}

      <div className={`sidebar d-none d-md-block ${isMobile && isOpen ? 'sidebar-mobile-open' : ''}`}>
        <Nav
          defaultActiveKey="/dashboard"
          className="flex-column"
          style={{
            boxShadow: '0 3px 3px blue',
            backgroundColor: 'rgba(25, 25, 87, 1)',
            zIndex: 1200,
            height: '100vh',
            position: 'fixed',
            
          }}
        >
          {/*  Logo Box */}
          <div
            style={{
              width: '100%',
              minHeight: '80px',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Replace src with your logo path */}
            <img
              src="/images/WhatsApp_Image_2025-06-11_at_4.19.09_PM-removebg-preview.png"
              alt="Website Logo"
              style={{ maxHeight: '60px', maxWidth: '100%' }}
            />
          </div>

          <Nav.Link
            as={Link}
            to="/dashadmin/*"
            className={`nav-links text-white ${isActive('/dashboard') ? 'active-link' : ''}`}
            onClick={handleLinkClick}
          >
            <FaHome style={{ marginRight: '8px' }} /> Dashboard
          </Nav.Link>

          <NavDropdown
            title={
              <span className="text-white">
                <FaEdit style={{ marginRight: '8px' }} /> Administrators
              </span>
            }
            id="product-dropdown"
            className="nav-links"
          >
            <NavDropdown.Item
              as={Link}
              to="/show-users"
              className={isActive('/show-users') ? 'active-link' : ''}
            >
              <FaUsers style={{ marginRight: '8px' }} /> Show Admins
            </NavDropdown.Item>

            <NavDropdown.Item
              as={Link}
              to="/my-profile"
              className={isActive('/my-profile') ? 'active-link' : ''}
            >
              <FaUser style={{ marginRight: '8px' }} /> My Profile
            </NavDropdown.Item>

            <NavDropdown.Item
              as={Link}
              to="/add-user"
              className={isActive('/add-user') ? 'active-link' : ''}
            >
              <FaEdit style={{ marginRight: '8px' }} /> Add Admin
            </NavDropdown.Item>
          </NavDropdown>

          <Nav.Link
            as={Link}
            to="/view-customers"
            className={`nav-links text-white ${isActive('/view-customers') ? 'active-link' : ''}`}
            onClick={handleLinkClick}
          >
            <FaUserFriends style={{ marginRight: '8px' }} /> Customers
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/view-all-orders"
            className={`nav-links text-white ${isActive('/view-all-orders') ? 'active-link' : ''}`}
            onClick={handleLinkClick}
          >
            <FaShoppingCart style={{ marginRight: '8px' }} /> Cart Orders
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/view-direct-orders"
            className={`nav-links text-white ${isActive('/view-direct-orders') ? 'active-link' : ''}`}
            onClick={handleLinkClick}
          >
            <FaClipboardList style={{ marginRight: '8px' }} /> Direct Orders
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/view-delivered-orders"
            className={`nav-links text-white ${isActive('/view-delivered-orders') ? 'active-link' : ''}`}
            onClick={handleLinkClick}
          >
            <FaClipboardList style={{ marginRight: '8px' }} /> Delivered Orders
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/admin-contact-editor"
            className={`nav-links text-white ${isActive('/admin-contact-editor') ? 'active-link' : ''}`}
            onClick={handleLinkClick}
          >
            <FaEdit style={{ marginRight: '8px' }} /> Contact
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/faq"
            className={`nav-links text-white ${isActive('/admin-contact-editor') ? 'active-link' : ''}`}
            onClick={handleLinkClick}
          >
            <FaEdit style={{ marginRight: '8px' }} /> Questions
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/admin-about-editor"
            className={`nav-links text-white ${isActive('/admin-about-editor') ? 'active-link' : ''}`}
            onClick={handleLinkClick}
          >
            <FaEdit style={{ marginRight: '8px' }} /> About Page
          </Nav.Link>

          <NavDropdown
            title={
              <span className="text-white">
                <FaEdit style={{ marginRight: '8px' }} />Products
              </span>
            }
            id="product-dropdown"
            className="nav-links"
          >
            <NavDropdown.Item
              as={Link}
              to="/add-product"
              className={isActive('/add-product') ? 'active-link' : ''}
            >
              <FaBoxOpen style={{ marginRight: '8px' }} /> Add Products
            </NavDropdown.Item>

            <NavDropdown.Item
              as={Link}
              to="/delete-product"
              className={isActive('/delete-product') ? 'active-link' : ''}
            >
              <FaEdit style={{ marginRight: '8px' }} /> Manage Products
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </div>
    </>
  );
};

export default SideBar;







