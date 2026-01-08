import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to backend API
    console.log('Newsletter subscription:', email);
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <>
      <section className="footer-callouts py-5">
        <div className="container">
          <div className="row justify-content-center g-4">
            <div className="col-md-5">
              <div className="callout-card callout-blue p-4 rounded-3 shadow-sm">
                <div className="d-flex gap-3 align-items-start">
                  <div className="callout-icon bg-white rounded-circle d-flex align-items-center justify-content-center">
                    🫀
                  </div>
                  <div>
                    <h5 className="mb-1 text-white">Expert Eye Care</h5>
                    <p className="muted small mb-0">
                      Et purus duis sollicitudin dignissim habitant. Egestas nulla quis venenatis cras sed eu massa eu faucibus
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="callout-card callout-teal p-4 rounded-3 shadow-sm">
                <div className="d-flex gap-3 align-items-start">
                  <div className="callout-icon bg-white rounded-circle d-flex align-items-center justify-content-center">
                    📋
                  </div>
                  <div>
                    <h5 className="mb-1 text-white">Eye Health Provider</h5>
                    <p className="muted small mb-0">
                      Et purus duis sollicitudin dignissim habitant. Egestas nulla quis venenatis cras sed eu massa eu faucibus
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer py-5 bg-soft">
        <div className="container">
          <div className="row gy-4">
            <div className="col-md-3">
              <div className="footer-brand d-flex align-items-center gap-3">
                <img src="/assets/logo.png" alt="Med Nova" style={{ height: '56px' }} />
                <strong>Med Nova</strong>
              </div>
              <p className="muted mt-3">Dedicated to providing top-notch healthcare services. Your health is our priority.</p>
              <div className="footer-social mt-3">
                <a className="me-3" href="#" aria-label="Instagram" title="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="18.5" cy="5.5" r="0.5" fill="currentColor" />
                  </svg>
                </a>
                <a className="me-3" href="#" aria-label="Facebook" title="Facebook">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12.07C22 6.5 17.52 2 11.96 2 6.4 2 2 6.5 2 12.07c0 5 3.66 9.14 8.44 9.93v-7.03H7.9v-2.9h2.54V9.4c0-2.5 1.5-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.62.77-1.62 1.56v1.88h2.77l-.44 2.9h-2.33V22C18.34 21.2 22 17.07 22 12.07z" fill="currentColor" />
                  </svg>
                </a>
                <a className="me-3" href="#" aria-label="X" title="X">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L8.7 17.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.7 6L19 17.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn" title="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M7.5 11.5V17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    <path d="M7.5 8.5V8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    <path d="M12 11.5v5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    <path d="M12 8.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="col-md-3">
              <h6>Services</h6>
              <ul className="list-unstyled mt-3">
                <li className="muted">Reliable Rentals</li>
                <li className="muted">Golden Key Properties</li>
                <li className="muted">Swift Home Sales</li>
                <li className="muted">Elite Realty Services</li>
              </ul>
            </div>

            <div className="col-md-3">
              <h6>Our Newsletter</h6>
              <p className="muted small">Custom Software Development Tailored Solutions for Your Business Custom</p>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-input mt-3 d-flex align-items-center rounded-pill p-1 bg-white" style={{ maxWidth: '320px' }}>
                <input
                  className="form-control border-0"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button className="btn btn-primary rounded-circle ms-2 newsletter-send" aria-label="send" type="submit">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M2 12L22 3L13 22L11 14L2 12Z" fill="#fff" />
                  </svg>
                </button>
              </form>
            </div>

            <div className="col-md-3">
              <h6>Our Office</h6>
              <p className="muted mt-3"><strong>debra.holt@example.com</strong></p>
              <p className="muted">3891 Ranchview Dr. Richardson, California 62639</p>
              <div className="mt-3 rounded-3 overflow-hidden">
                <iframe
                  title="Footer Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3356.123456789012!2d-96.12345678901234!3d32.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864eab1234567890%3A0x1234567890abcdef!2sRichardson%2C%20TX!5e0!3m2!1sen!2sus!4v1612345678901!5m2!1sen!2sus"
                  width="100%"
                  height="150"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          <hr className="my-4" />

          <div className="d-flex justify-content-between small muted align-items-center">
            <div>© Med Nova 2024 | All Rights Reserved</div>
            <div className="d-flex gap-4">
              <Link to="#">Terms & Condition</Link>
              <Link to="#">Privacy Policy</Link>
              <Link to="/contact">Contact Us</Link>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <div
          className="scroll-to-top"
          onClick={scrollTop}
          style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            display: showScroll ? 'flex' : 'none',
            width: '50px',
            height: '50px',
            backgroundColor: 'var(--accent)',
            color: '#fff',
            borderRadius: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            zIndex: 1000,
            transition: 'all 0.3s ease'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </div>
      </footer>
    </>
  );
};

export default Footer;

