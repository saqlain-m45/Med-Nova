import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { services } from '../data/services';
import PageTransition from '../components/PageTransition';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const Services = () => {
  return (
    <PageTransition>
      {/* HERO */}
      <header className="about-hero service-hero py-5">
        <div className="container text-center text-white py-5">
          <motion.h1
            className="display-6 fw-bold mb-2 about-hero-title"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Service
          </motion.h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0 bg-transparent">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Service
              </li>
            </ol>
          </nav>
        </div>
      </header>

      <main className="py-5">
        <div className="container">
          {/* services grid */}
          <motion.div
            className="row g-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service) => (
              <motion.div key={service.id} className="col-md-6 col-lg-4" variants={itemVariants}>
                <motion.div
                  className={`service-card p-4 h-100 ${service.highlighted ? 'highlighted' : ''}`}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <div className="d-flex align-items-start">
                    <div className="service-icon me-3">
                      <img src={service.icon} alt="icon" />
                    </div>
                    <div>
                      <h5 className="mb-2">{service.name}</h5>
                      <p className="text-muted small">{service.description}</p>
                      <Link
                        className="small text-primary"
                        to={`/services/${encodeURIComponent(service.slug)}`}
                      >
                        Read More <span className="dot">●</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* two callouts */}
          <div className="row mt-5 g-4">
            <motion.div
              className="col-md-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="callout big bg-primary text-white p-4 rounded-3 d-flex align-items-center"
                whileHover={{ scale: 1.02 }}
              >
                <div className="me-3">🩺</div>
                <div>
                  <strong>Expert Eye Care</strong>
                  <div className="small">Leading the way in medical excellence with state-of-the-art technology.</div>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              className="col-md-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="callout big bg-teal text-white p-4 rounded-3 d-flex align-items-center"
                whileHover={{ scale: 1.02 }}
              >
                <div className="me-3">💚</div>
                <div>
                  <strong>Eye Health Provider</strong>
                  <div className="small">Dedicated to providing compassionate care and improving quality of life.</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default Services;

