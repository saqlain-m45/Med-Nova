import React, { useState } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await api.sendMessage(formData);
      if (response.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', city: '', message: '' });
      } else {
        alert('Failed to send message: ' + response.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      {/* Revised Hero Section with Circular Images */}
      <div className="contact-hero-section">
        <div className="container position-relative z-2">

          {/* Circular Images Cluster */}
          <motion.div
            className="circular-images-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img src="/assets/contact-circle-2.jpg" alt="Team 1" className="circular-img" />
            <img src="/assets/contact-circle-1.jpg" alt="Team 2" className="circular-img" style={{ marginTop: '-20px' }} /> {/* Center one slightly offset */}
            <img src="/assets/contact-circle-3.png" alt="Team 3" className="circular-img" />
          </motion.div>

          <div className="contact-hero-content">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Get In Touch With Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Reach out to us with your product and service-related queries.
            </motion.p>

            {/* Social Media Icons (Moved to Hero) */}
            <motion.div
              className="d-flex gap-3 mt-4 justify-content-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button className="social-icon-circle border-0 bg-transparent" onClick={(e) => e.preventDefault()} aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button className="social-icon-circle border-0 bg-transparent" onClick={(e) => e.preventDefault()} aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </button>
              <button className="social-icon-circle border-0 bg-transparent" onClick={(e) => e.preventDefault()} aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </button>
              <button className="social-icon-circle border-0 bg-transparent" onClick={(e) => e.preventDefault()} aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content Areas with Overlap */}


      {/* Modern Contact Section (Split Panel) */}
      <div className="container">
        <motion.div
          className="contact-modern-container"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Left Panel: Contact Info */}
          <div className="contact-modern-left">
            <h2>Get in touch!</h2>
            <p>We'd love to hear from you. Our team is always here to chat.</p>

            <div className="contact-modern-info-item">
              <div className="contact-modern-icon">
                <i className="fas fa-phone-alt"></i>
              </div>
              <div className="contact-modern-text">
                <h5>Phone</h5>
                <p>+92 21 111 275 475</p>
              </div>
            </div>

            <div className="contact-modern-info-item">
              <div className="contact-modern-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-modern-text">
                <h5>Email</h5>
                <p>support@mednova.com</p>
              </div>
            </div>

            <div className="contact-modern-info-item">
              <div className="contact-modern-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="contact-modern-text">
                <h5>Location</h5>
                <p>Plot # 43-C, 4th Floor, Bukhari Commercial, Lane #10, DHA Phase 6 Karachi.</p>
              </div>
            </div>


          </div>

          {/* Right Panel: Form */}
          <div className="contact-modern-right">
            <h3 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '30px', color: '#333' }}>Send us Message</h3>
            <form id="contact-form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <input
                    type="text"
                    className="clean-input"
                    name="name"
                    placeholder="👤 Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-4">
                  <input
                    type="email"
                    className="clean-input"
                    name="email"
                    placeholder="✉️ Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-4">
                  <input
                    type="text"
                    className="clean-input"
                    name="phone"
                    placeholder="📞 Your Mobile Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-4">
                  <input
                    type="text"
                    className="clean-input"
                    name="city"
                    placeholder="🏙️ Your City"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-4">
                <textarea
                  className="clean-input"
                  name="message"
                  rows="3"
                  placeholder="💬 Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  style={{ resize: 'none' }}
                />
              </div>

              <div className="mt-2">
                <button
                  type="submit"
                  className="btn btn-blue-pill w-100 py-3"
                  disabled={isSubmitting}
                  style={{ fontSize: '1rem', borderRadius: '50px' }}
                >
                  {isSubmitting ? 'SENDING...' : submitStatus === 'success' ? 'SENT SUCCESSFULLY ✓' : 'SUBMIT'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Google Map Section */}
      <div className="map-section">
        <iframe
          className="map-frame"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6783666.785856543!2d66.39238192537199!3d33.880965978027206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38deaec937ee679b%3A0x9611f44ebf7aa771!2sKhyber%20Pakhtunkhwa%2C%20Pakistan!5e0!3m2!1sen!2s!4v1767861809884!5m2!1sen!2s"
          allowFullScreen=""
          loading="lazy"
          title="Google Map"
        ></iframe>
      </div>

    </PageTransition>
  );
};

export default Contact;

