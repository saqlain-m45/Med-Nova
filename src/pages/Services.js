import React from 'react';
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
  const kohatServices = [
    {
      id: 1,
      name: 'Emergency & Trauma',
      location: 'KDA Teaching Hospital',
      description: '24/7 fully equipped emergency department handling critical cases with advanced life support systems.',
      image: '/assets/service-kda-emergency.png',
      slug: 'emergency-trauma'
    },
    {
      id: 2,
      name: 'Advanced Cardiology',
      location: 'City Heart Center',
      description: 'State-of-the-art heart care including ECG, Echocardiography, and Angiography services in Kohat.',
      image: '/assets/service-city-heart.png',
      slug: 'cardiology'
    },
    {
      id: 3,
      name: 'Diagnostic Laboratory',
      location: 'Kohat Labs',
      description: 'Accurate and rapid testing services with modern automated analyzers for all pathology needs.',
      image: '/assets/service-kohat-labs.png',
      slug: 'diagnostic-lab'
    },
    {
      id: 4,
      name: 'Pediatrics Department',
      location: 'DHQ Hospital Kohat',
      description: 'Comprehensive child healthcare including vaccination, neonatology, and general pediatric surgery.',
      image: '/assets/service-pediatrics-dhq.png',
      slug: 'pediatrics'
    },
    {
      id: 5,
      name: 'Orthopedics & Joint',
      location: 'KDA Teaching Hospital',
      description: 'Specialized care for fractures, joint replacements, and bone health management by expert surgeons.',
      image: '/assets/service-orthopedics-kda.png',
      slug: 'orthopedics'
    },
    {
      id: 6,
      name: 'Dental Care',
      location: 'Kohat Bazar Clinics',
      description: 'Professional dental hygiene, surgery, and cosmetic dentistry services available in the city center.',
      image: '/assets/service-dental-kohat.png',
      slug: 'dental-care'
    }
  ];

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
            {kohatServices.map((service) => (
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

