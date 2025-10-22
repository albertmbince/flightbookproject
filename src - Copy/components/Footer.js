import React from "react";
import "../styles/custom.css";
import { FaFacebook, FaTwitter, FaInstagram, FaPlane } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer text-light mt-auto py-4">
      <div className="container text-center">
        <div className="mb-3">
          <FaPlane className="footer-logo mb-2" />
          <h5 className="fw-bold text-info">AirBooker</h5>
        </div>

        <div className="footer-social mb-3">
          <a href="#" className="footer-icon mx-2"><FaFacebook /></a>
          <a href="#" className="footer-icon mx-2"><FaTwitter /></a>
          <a href="#" className="footer-icon mx-2"><FaInstagram /></a>
        </div>

        <p className="small mb-0 text-muted">
          © {new Date().getFullYear()} AirBooker. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
