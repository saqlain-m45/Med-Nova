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
      {/* HERO SECTION */}
      <header className="about-hero-section">
        <div className="container position-relative z-2">
          <motion.h1
            className="display-4 fw-bold mb-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Med Nova
          </motion.h1>
          <motion.p
            className="lead mx-auto"
            style={{ maxWidth: '600px', opacity: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Dedicated to providing world-class healthcare with a compassionate touch in Kohat.
          </motion.p>
        </div>
      </header>

      {/* PARTNER RIBBON (Medilix Style) */}
      <section className="py-0 border-bottom">
        <div className="infinity-scroll-container small">
          <div className="infinity-scroll-track">
            {/* Duplicate items for seamless scrolling */}
            {[...Array(4)].map((_, i) => (
              <React.Fragment key={i}>
                <div className="infinity-scroll-item"><span>•</span> Our Mission: Wellness</div>
                <div className="infinity-scroll-item"><span>•</span> Compassionate Staff</div>
                <div className="infinity-scroll-item"><span>•</span> Patient-First Approach</div>
                <div className="infinity-scroll-item"><span>•</span> Excellence In Healthcare</div>
                <div className="infinity-scroll-item"><span>•</span> Community Focused</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN ABOUT SECTION */}
      <main className="py-5">
        <div className="container">
          <div className="row align-items-center gy-5">
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={require('../assets/about-holistic-health.png')}
                alt="Holistic Care"
                className="about-content-img"
              />
            </motion.div>
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-2 text-uppercase text-primary fw-bold small tracking-wide">Who We Are</div>
              <h2 className="fw-bold display-6 mb-3">Holistic Haven For Your Daily Health</h2>
              <p className="text-muted lead fs-6">
                We provide compassionate, evidence-based care and an exceptional patient experience. Our multidisciplinary team delivers personalised treatment plans across a range of specialties right here in Kohat.
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
                >
                  <div className="feat-icon me-3 bg-light text-primary rounded-circle p-2">🩺</div>
                  <div>
                    <strong className="text-dark">MedNest Wellness</strong>
                    <div className="text-muted small">Comprehensive clinical services built around you.</div>
                  </div>
                </motion.li>
                <motion.li
                  className="d-flex align-items-start mb-3"
                  variants={itemVariants}
                >
                  <div className="feat-icon me-3 bg-light text-primary rounded-circle p-2">⚕️</div>
                  <div>
                    <strong className="text-dark">Pulse Care Solutions</strong>
                    <div className="text-muted small">Advanced diagnostics and follow-up care.</div>
                  </div>
                </motion.li>
              </motion.ul>
              <div className="mt-4">
                <a href="#services" className="btn btn-primary rounded-pill px-4 py-2 me-3 shadow-sm hover-lift">Read More</a>
                <Link to="/appointment" className="btn btn-outline-primary rounded-pill px-4 py-2 hover-lift">
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
              { icon: 'fa-bolt', title: 'Fast Response', desc: '24/7 emergency support ready to help.' },
              { icon: 'fa-user-md', title: 'Expert Advice', desc: 'Consultations with top specialists.' },
              { icon: 'fa-flask', title: 'Modern Labs', desc: 'Advanced diagnostics & testing.' },
              { icon: 'fa-rocket', title: 'Advanced Care', desc: 'Cutting-edge medical technology.' }
            ].map((feat, index) => (
              <motion.div key={index} className="col-md-6 col-lg-3" variants={itemVariants}>
                <div className="feature-pro-card text-center">
                  <div className="feature-icon-box">
                    <i className={`fas ${feat.icon}`}></i>
                  </div>
                  <h5 className="feature-title">{feat.title}</h5>
                  <p className="feature-desc">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* middle section with text and highlight box */}
          <div className="row align-items-center mt-5 gy-5 section-spacer">
            <motion.div
              className="col-lg-6 order-lg-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={require('../assets/about-success-case.png')}
                alt="Success Story"
                className="about-content-img"
              />
            </motion.div>

            <motion.div
              className="col-lg-6 order-lg-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="fw-bold mb-3">Revitalizing Wellness Expertise</h3>
              <p className="text-muted mb-4">
                Our clinic stands out by integrating modern medical technology with traditional compassionate care. We believe in treating the person, not just the disease.
              </p>
              <ul className="list-unstyled text-muted d-flex flex-column gap-2">
                <li className="d-flex align-items-center"><i className="bi bi-check-circle-fill text-primary me-2"></i> Patient-Centered Approach</li>
                <li className="d-flex align-items-center"><i className="bi bi-check-circle-fill text-primary me-2"></i> Evidence-Based Medicine</li>
                <li className="d-flex align-items-center"><i className="bi bi-check-circle-fill text-primary me-2"></i> 24/7 Emergency Support</li>
              </ul>

              <div className="mt-4 d-flex align-items-center gap-3">
                <div className="stat-badge p-3 bg-white rounded-3 shadow-sm border text-center" style={{ minWidth: '120px' }}>
                  <h3 className="fw-bold text-primary mb-0">380+</h3>
                  <div className="small text-muted">Success Cases</div>
                </div>
                <div className="stat-badge p-3 bg-white rounded-3 shadow-sm border text-center" style={{ minWidth: '120px' }}>
                  <h3 className="fw-bold text-primary mb-0">98%</h3>
                  <div className="small text-muted">Satisfaction</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* rotating logo ticker / partner row */}
          <motion.div
            className="logo-strip mt-5 py-4 bg-light rounded-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Simple marquee text or logos */}
            <div className="text-center text-muted fw-bold small text-uppercase letter-spacing-2">Trusted by Leading Partners in Kohat</div>
          </motion.div>

        </div>
      </main>
    </PageTransition>
  );
};

export default About;

