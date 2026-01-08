import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { serviceDetails, services } from '../data/services';
import PageTransition from '../components/PageTransition';

const ServiceDetails = () => {
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const decodedName = decodeURIComponent(serviceName);
  const [selectedService, setSelectedService] = useState(serviceDetails[decodedName] || serviceDetails['Health Solutions']);

  useEffect(() => {
    const service = serviceDetails[decodedName];
    if (service) {
      setSelectedService(service);
    } else {
      // Redirect to services page if service not found
      navigate('/services');
    }
  }, [serviceName, navigate, decodedName]);

  const handleServiceChange = (serviceSlug) => {
    navigate(`/services/${encodeURIComponent(serviceSlug)}`);
  };

  return (
    <PageTransition>
      <header className="about-hero service-hero py-5">
        <div className="container text-center text-white py-5">
          <motion.h1
            className="display-6 fw-bold mb-2 about-hero-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {selectedService.title}
          </motion.h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0 bg-transparent">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/services">Services</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {selectedService.title}
              </li>
            </ol>
          </nav>
        </div>
      </header>

      <main className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <motion.div
                className="sidebar-list p-3"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ul className="list-unstyled">
                  {Object.keys(serviceDetails).map((service) => (
                    <li
                      key={service}
                      className={service === selectedService.title ? 'active' : ''}
                    >
                      <a
                        href="#"
                        className="service-link"
                        onClick={(e) => {
                          e.preventDefault();
                          handleServiceChange(service);
                        }}
                      >
                        {service}
                      </a>
                      <span className="text-primary">+</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
            <div className="col-lg-9">
              <motion.div
                className="row"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                key={selectedService.title} // Re-animate on service change
              >
                <div className="col-12 mb-4">
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="img-fluid rounded-3 service-detail-image"
                    id="service-image"
                  />
                </div>
                <div className="col-12">
                  <h2 id="service-heading">{selectedService.heading}</h2>
                  <p className="text-muted" id="service-intro">
                    {selectedService.intro}
                  </p>
                  <ul className="list-unstyled mt-4" id="service-bullets">
                    {selectedService.bullets.map((bullet, index) => (
                      <motion.li
                        key={index}
                        className="service-bullet"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <div className="dot"></div>
                        <div className="text-muted">{bullet}</div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default ServiceDetails;

