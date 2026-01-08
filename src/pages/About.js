import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const About = () => {
  return (
    <PageTransition>
      {/* DARK HERO / BANNER */}
      <header className="about-hero py-5">
        <div className="container text-center text-white py-5">
          <motion.h1
            className="display-6 fw-bold mb-2 about-hero-title"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            About Us
          </motion.h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0 bg-transparent">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                About Us
              </li>
            </ol>
          </nav>
        </div>
      </header>

      {/* MAIN ABOUT SECTION */}
      <main className="py-5">
        <div className="container">
          <div className="row align-items-center gy-4">
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/assets/about-hero.svg"
                alt="About Illustration"
                className="img-fluid rounded-3 about-illustration"
              />
            </motion.div>
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-3 small text-primary">About Us</div>
              <h2 className="fw-bold">Holistic Haven Where Health Every Day</h2>
              <p className="text-muted">
                We provide compassionate, evidence-based care and an exceptional patient experience. Our multidisciplinary team delivers personalised treatment plans across a range of specialties.
              </p>
              <motion.ul
                className="list-unstyled about-features mt-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.li
                  className="d-flex align-items-start mb-3"
                  variants={itemVariants}
                  whileHover={{ x: 10, color: '#2f7bff' }}
                >
                  <div className="feat-icon me-3">🩺</div>
                  <div>
                    <strong>MedNest Wellness</strong>
                    <div className="text-muted small">Comprehensive clinical services built around you.</div>
                  </div>
                </motion.li>
                <motion.li
                  className="d-flex align-items-start mb-3"
                  variants={itemVariants}
                  whileHover={{ x: 10, color: '#2f7bff' }}
                >
                  <div className="feat-icon me-3">⚕️</div>
                  <div>
                    <strong>Pulse Care Solutions</strong>
                    <div className="text-muted small">Advanced diagnostics and follow-up care.</div>
                  </div>
                </motion.li>
              </motion.ul>
              <div className="mt-4">
                <a href="#services" className="btn btn-primary me-2 hero-cta">Read More</a>
                <Link to="/appointment" className="btn btn-outline-primary hero-cta">
                  Make Appointment
                </Link>
              </div>
            </motion.div>
          </div>

          {/* icon feature row */}
          <motion.div
            className="row mt-5 g-4 about-features-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: '⚡', title: 'Get Fast Reply' },
              { icon: '💡', title: 'InspireHealth Hub' },
              { icon: '💧', title: 'Health Services' },
              { icon: '🚀', title: 'Voyage Wellness' }
            ].map((feat, index) => (
              <motion.div key={index} className="col-md-3" variants={itemVariants}>
                <motion.div
                  className="spec-card p-3 text-center"
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="spec-icon mb-2">{feat.icon}</div>
                  <div><strong>{feat.title}</strong></div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* middle section with text and highlight box */}
          <div className="row align-items-center mt-5 gy-4">
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="fw-bold">Revitalize Radiance Your Wellness Expertise</h3>
              <p className="text-muted">
                Short paragraph describing the depth of services, credentials and the patient-first approach that sets the clinic apart.
              </p>
              <ul className="list-unstyled text-muted">
                <li>• Patient-Centered Approach</li>
                <li>• Evidence-Based Medicine</li>
              </ul>
            </motion.div>
            <motion.div
              className="col-lg-6 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="highlight-box rounded-3 p-4">
                <div style={{ height: '240px', background: '#e9edf8', borderRadius: '8px' }}></div>
                <div className="stat-badge mt-3 d-inline-block p-2 bg-white rounded-3 shadow-sm">
                  <strong>380+</strong>
                  <div className="small text-muted">Success Case</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* rotating logo ticker / partner row */}
          <motion.div
            className="logo-strip mt-5 py-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="marquee d-flex align-items-center gap-4">
              {[...Array(5)].map((_, i) => (
                <img key={i} src="/assets/logo.svg" height="28" alt="partner" />
              ))}
            </div>
          </motion.div>

          {/* testimonial / CTA area */}
          <div className="row mt-5 gy-4">
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="testimonial-card p-4 rounded-3 shadow-sm">
                <h5 className="text-primary small">Clients Testimonial</h5>
                <h3 className="fw-bold">Nurture Nature Blossoming In Health And Happiness</h3>
                <p className="text-muted">
                  Our dedication to patient care is unwavering. We strive to provide the best possible medical outcomes for every patient we serve, ensuring a comfortable and healing environment.
                </p>
                <div className="d-flex align-items-center mt-3">
                  <div className="me-3" style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#eef6ff' }}></div>
                  <div>
                    <strong>Jenny Wilson</strong>
                    <div className="small text-muted">Businessman</div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="col-lg-6 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div style={{ height: '300px', background: '#f0f4fb', borderRadius: '12px' }}></div>
            </motion.div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default About;

