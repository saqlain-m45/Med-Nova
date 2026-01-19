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
    <nav className="navbar navbar-expand-lg navbar-glass py-2 navbar-home">
      <div className="container-fluid px-lg-5 nav-inner align-items-center d-flex justify-content-between">
        <Link className="navbar-brand d-flex align-items-center me-4" to="/">
          <img src="/assets/logo.png" alt="Med Nova" className="brand-logo" />
          <span className="brand-text ms-2" style={{ color: '#04214f' }}>Med Nova</span>
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
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/about')}`} to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/services')}`} to="/services">Services</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/doctors')}`} to="/doctors">Doctors</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/blog')}`} to="/blog">Blog</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/contact')}`} to="/contact">Contact</Link>
            </li>
            <li className="nav-item ms-lg-2">
              <Link className={`btn btn-sm fw-bold d-flex align-items-center gap-1 ${isActive('/prediction')}`} to="/prediction" style={{ color: 'var(--accent)', background: '#eef6ff', borderRadius: '20px', padding: '6px 16px', border: '1px solid rgba(47, 123, 255, 0.1)' }}>
                <span>✨</span> Prediction
              </Link>
            </li>
            <li className="nav-item ms-lg-2">
              <Link className={`btn btn-sm fw-bold d-flex align-items-center gap-1 ${isActive('/blood-donation')}`} to="/blood-donation" style={{ color: '#c53030', background: '#ffe4e6', borderRadius: '20px', padding: '6px 16px', border: '1px solid rgba(197, 48, 48, 0.1)' }}>
                <span>❤️</span> Donate Blood
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center ms-lg-4 gap-2">
            <Link className="nav-link login-link font-weight-bold" to="#">Login</Link>
            <Link className="btn btn-outline-primary btn-sm rounded-pill px-3" to="#">Sign Up</Link>
            <Link className="btn btn-primary btn-sm rounded-pill px-3" to="/appointment">Get Appointment</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

