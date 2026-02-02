import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.getServices();
        // Fallback or specific mapping
        const mappedServices = data.map(service => ({
          ...service,
          // Use placeholder or API provided icon/image
          image: service.icon && service.icon !== '/assets/service-icon-default.svg' ? service.icon : '/assets/service-kda-emergency.png', // Temporary fallback
          location: 'Main Branch' // Placeholder as DB doesn't have location yet
        }));
        setServices(mappedServices);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };
    fetchServices();
  }, []);

  return (
    <PageTransition>
      {/* NEW HERO SECTION WITH SPACING & IMAGE */}
      <header className="services-hero-section">
        <div className="container position-relative z-2">
          <motion.h1
            className="display-4 fw-bold mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Medical Services in Kohat
          </motion.h1>
          <motion.p
            className="lead mx-auto"
            style={{ maxWidth: '600px', opacity: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Discover top-notch healthcare facilities at KDA, DHQ, and private centers near you.
          </motion.p>
        </div>
      </header>

      <main className="py-5 bg-soft">
        <div className="container">
          {/* SERVICES GRID */}
          <motion.div
            className="row g-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {services.map((service) => (
              <motion.div key={service.id} className="col-md-6 col-lg-4" variants={itemVariants}>
                <div className="service-img-card">
                  <div className="service-card-img-wrapper">
                    <img src={service.image} alt={service.name} />
                  </div>
                  <div className="service-card-body">
                    <div className="service-card-location">
                      <i className="bi bi-geo-alt-fill"></i> {service.location}
                    </div>
                    <h3 className="service-card-title">{service.name}</h3>
                    <p className="service-card-desc">{service.description}</p>
                    <Link to={`/services/${service.slug}`} className="service-read-more-btn">
                      View Service <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </PageTransition>
  );
};

export default Services;

