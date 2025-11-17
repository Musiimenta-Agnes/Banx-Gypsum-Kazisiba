

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Header.css";

function OurHeader() {
  const navbarCollapseRef = useRef(null);

  const handleLinkClick = () => {
    const navbarCollapse = navbarCollapseRef.current;
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      new window.bootstrap.Collapse(navbarCollapse).hide();
    }
  };

  return (
    <div>
      <header className="w-100">
        <nav
          className="navbar navbar-expand-lg bg-light"
          style={{
            width: "100%",
            boxShadow: "0 2px 5px darkblue",
            height: "65px",
            zIndex: 1000,
            backgroundColor: "#1F3C88",
            position: "fixed",
          }}
        >
          <div
            className="container-fluid"
            style={{ backgroundColor: "#1F3C88" }}
          >
            <a className="navbar-brand banx" href="/">
              <img src="/images/logo.png" alt="Banx" className="logo" />
            </a>

            <button
              className="navbar-toggler bg-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarMenu"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              style={{
                backgroundColor: "#1F3C88",
                marginLeft: "80px",
                height: "60px",
              }}
              className="collapse navbar-collapse"
              id="navbarMenu"
              ref={navbarCollapseRef}
            >
              <ul className="navbar-nav ms-auto nav">
                <li className="custom-item nav-item">
                  <Link
                    to="/"
                    className="custom-link nav-link"
                    onClick={handleLinkClick}
                  >
                    Home
                  </Link>
                </li>
                <li className="custom-item nav-item">
                  <Link
                    to="/about"
                    className="custom-link nav-link"
                    onClick={handleLinkClick}
                  >
                    About Us
                  </Link>
                </li>


                                <li className="custom-item nav-item">
                  <Link
                    to="/completed-projects"
                    className="custom-link nav-link"
                    onClick={handleLinkClick}
                  >
                    Our Work
                  </Link>
                </li>


                                <li className="custom-item nav-item">
                  <Link
                    to="/materials"
                    className="custom-link nav-link"
                    onClick={handleLinkClick}
                  >
                   Materials Used
                  </Link>
                </li>

               
                <li className="custom-item nav-item">
                  <Link
                    to="/gallery"
                    className="custom-link nav-link"
                    onClick={handleLinkClick}
                  >
                    Gallery
                  </Link>
                </li>
                <li className="custom-item nav-item">
                  <Link
                    to="/contact"
                    className="custom-link nav-link"
                    onClick={handleLinkClick}
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="custom-item nav-item">
                  <Link
                    to="/questions"
                    className="custom-link nav-link"
                    onClick={handleLinkClick}
                  >
                    FAQuestions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <br />
        <br /> <br /> <br /> <br />
      </header>
    </div>
  );
}

export default OurHeader;
