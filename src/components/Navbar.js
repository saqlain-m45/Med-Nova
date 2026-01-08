import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-site py-3 ${location.pathname === '/' ? 'navbar-home' : ''}`}>
      <div className="container nav-inner align-items-center d-flex">
        <Link className="navbar-brand d-flex align-items-center me-4" to="/">
          <img src="/assets/logo.png" alt="Med Nova" className="brand-logo" />
        </Link>

        <button
          className="navbar-toggler ms-auto"
          type="button"
          onClick={toggleNav}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navSiteMenu">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/about')}`} to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/services')}`} to="/services">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/doctors')}`} to="/doctors">
                Doctors
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/blog')}`} to="/blog">
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/contact')}`} to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`btn btn-soft-primary ms-lg-2 fw-bold ${isActive('/prediction')}`} to="/prediction" style={{ color: 'var(--accent)', background: '#eef6ff', borderRadius: '8px', padding: '0 24px', height: '48px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                ✨ Prediction
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center ms-lg-3">
            <Link className="nav-link login-link me-3 fw-bold text-dark" to="#">
              Login
            </Link>
            <Link className="btn btn-outline-primary me-3 btn-signup rounded-pill px-4" to="#" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
              Sign Up
            </Link>
            <Link className="btn btn-appointment" to="/appointment">
              Get An Appointment
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

