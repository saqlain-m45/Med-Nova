import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const Home = () => {
  const navigate = useNavigate();
  const [problem, setProblem] = useState('');
  const [specialist, setSpecialist] = useState('');

  const handleSearch = () => {
    navigate('/doctors', { state: { problem, specialist } });
  };

  const specializations = [
    { icon: '🩺', title: 'Harbor Health', description: 'Comprehensive evaluation and personalised care plans.' },
    { icon: '💧', title: 'Radius Wellness', description: 'Holistic wellness services to support recovery.' },
    { icon: '⚕️', title: 'Radius Wellness', description: 'Preventative and acute care under one roof.' },
    { icon: '🏥', title: 'Net Healthcare', description: 'Trusted specialists and advanced diagnostics.' }
  ];

  const processCards = [
    'Catalyst Services',
    'Wave Solutions',
    'Health Hub',
    'Wave Solutions'
  ];

  const doctors = [
    { name: 'Dr. Ayesha Khan', role: 'Medical Director', image: '/assets/doctor-ayesha.jpg' },
    { name: 'Dr. Fatima Ahmed', role: 'Specialist Physician', image: '/assets/doctor-fatima.jpg' },
    { name: 'Dr. Zara Malik', role: 'Senior Consultant', image: '/assets/doctor-zara.jpg' }
  ];

  const blogPosts = [
    { title: 'Optimal Oasis Nurturing Health', excerpt: 'Short excerpt about health and wellness.', image: '/assets/blog-1.svg' },
    { title: 'Embark On Health Wellness', excerpt: 'Short excerpt about health and wellness.', image: '/assets/blog-1.svg' },
    { title: 'Nurturing Healthier Review Radiance', excerpt: 'Short excerpt about health and wellness.', image: '/assets/blog-1.svg' }
  ];

  return (
    <PageTransition>
      {/* HERO */}
      <header className="hero-section">
        <div className="container py-5">
          <div className="row align-items-center">
            <motion.div
              className="col-lg-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <div className="hero-text">
                <motion.h1 className="display-5 fw-bold hero-title" variants={itemVariants}>
                  <span className="line d-block">Brighten Your Smile</span>
                  <span className="line d-block">Brighten Your <span className="highlight-text">Day</span></span>
                </motion.h1>
                <motion.p className="lead text-muted mt-3 hero-sub" variants={itemVariants}>
                  Delivering compassionate, modern care that helps you live healthier and happier. Expert clinicians, modern facilities and personalised treatment plans.
                </motion.p>
                <motion.div className="hero-search-box" variants={itemVariants}>
                  <div className="search-item">
                    <div className="icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                    </div>
                    <select
                      className="form-select"
                      aria-label="Select Problem"
                      value={problem}
                      onChange={(e) => setProblem(e.target.value)}
                    >
                      <option value="">Select Problem</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Dental">Dental Care</option>
                    </select>
                  </div>
                  <div className="separator"></div>
                  <div className="search-item">
                    <div className="icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                    </div>
                    <select
                      className="form-select"
                      aria-label="Select Specialist"
                      value={specialist}
                      onChange={(e) => setSpecialist(e.target.value)}
                    >
                      <option value="">Select Specialist</option>
                      <option value="Dr. Ayesha Khan">Dr. Ayesha Khan</option>
                      <option value="Dr. Fatima Ahmed">Dr. Fatima Ahmed</option>
                      <option value="Dr. Zara Malik">Dr. Zara Malik</option>
                      <option value="Dr. Ali Raza">Dr. Ali Raza</option>
                      <option value="Dr. Sara Khan">Dr. Sara Khan</option>
                    </select>
                  </div>
                  <button className="btn-search" onClick={handleSearch}>FIND NOW</button>
                </motion.div>
              </div>
              <motion.ul className="list-unstyled mt-5 d-flex gap-4 hero-stats" variants={itemVariants}>
                <li><strong className="text-dark">200+</strong> Happy Patients</li>
                <li><strong className="text-dark">20+</strong> Service Areas</li>
              </motion.ul>
            </motion.div>
            <motion.div
              className="col-lg-6 text-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="hero-image" aria-hidden>
                <img src="/assets/hero.jpg" alt="Hero" className="img-fluid rounded-3" style={{ maxWidth: '420px' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* SPECIALIZATIONS */}
      <section id="services" className="py-5">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title text-center">Specialization We Provide</h2>
            <p className="text-center text-muted mb-4">
              Medical services across a range of specialities with a focus on compassionate, personalised care.
            </p>
          </motion.div>
          <motion.div
            className="row g-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {specializations.map((spec, index) => (
              <motion.div key={index} className="col-md-6 col-lg-3" variants={itemVariants}>
                <div className="spec-card p-4 h-100">
                  <div className="spec-icon">{spec.icon}</div>
                  <h5 className="mt-3">{spec.title}</h5>
                  <p className="text-muted small">{spec.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HIGHLIGHT / HEXAGON AREA */}
      <section className="py-5 bg-soft">
        <div className="container">
          <div className="row align-items-center">
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3>Harbor Health Anchored In Care And Commitment</h3>
              <p className="text-muted">
                We focus on compassionate care, advanced treatments and a patient-centered approach to help you get back to health.
              </p>
              <ul className="list-unstyled text-muted">
                <li>• Personalized care plans</li>
                <li>• Multidisciplinary expertise</li>
                <li>• Comfortable modern facilities</li>
              </ul>
            </motion.div>
            <motion.div
              className="col-lg-6 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img src="/assets/hexagon.svg" alt="Highlight" className="img-fluid" style={{ maxWidth: '360px' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SCROLLING MARQUEE (New Process Section) */}
      <section className="py-1" style={{ background: 'var(--blue-900)' }}>
        <div className="container-fluid overflow-hidden p-0">
          <div className="marquee-wrapper">
            {/* Two sets of items for seamless loop */}
            <div className="marquee-content">
              {['Patient Centered', 'Advanced Diagnostics', '24/7 Support', 'Expert Specialists', 'Holistic Wellness', 'Modern Facilities'].map((item, index) => (
                <span key={`1-${index}`} className="marquee-item">{item}</span>
              ))}
            </div>
            <div className="marquee-content">
              {['Patient Centered', 'Advanced Diagnostics', '24/7 Support', 'Expert Specialists', 'Holistic Wellness', 'Modern Facilities'].map((item, index) => (
                <span key={`2-${index}`} className="marquee-item">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ + CIRCLE DECOR */}
      <section id="faq" className="py-5 bg-soft">
        <div className="container">
          <h3 className="section-title text-center">Frequently Ask Questions</h3>
          <div className="row align-items-center mt-4">
            <div className="col-md-6">
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#q1"
                    >
                      How Your Pain Is Ultimate Received?
                    </button>
                  </h2>
                  <div id="q1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      We use a multidisciplinary approach focused on patient comfort and evidence-based care.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#q2"
                    >
                      Where Your Health Finds A Home?
                    </button>
                  </h2>
                  <div id="q2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Our centres are designed to provide both inpatient and outpatient services with continuity of care.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <motion.div
              className="col-md-6 text-center"
              initial={{ rotate: -180, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="decor-circle"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-4">
        <div className="container text-center">
          <motion.div
            className="stats-bar d-flex justify-content-center gap-4 flex-wrap"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="stat" variants={itemVariants}>
              <strong>200+</strong>
              <div className="muted">Happy Patients</div>
            </motion.div>
            <motion.div className="stat" variants={itemVariants}>
              <strong>20+</strong>
              <div className="muted">Service Areas</div>
            </motion.div>
            <motion.div className="stat" variants={itemVariants}>
              <strong>10k+</strong>
              <div className="muted">Expert Doctors</div>
            </motion.div>
            <motion.div className="stat" variants={itemVariants}>
              <strong>900+</strong>
              <div className="muted">Recovery Cases</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* APPOINTMENT / FORM */}
      <AppointmentSection />

      {/* SPECIALIST DOCTORS */}
      <section className="py-5">
        <div className="container">
          <h4 className="section-title text-center">Specialist Doctors</h4>
          <motion.div
            className="row g-3 mt-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {doctors.map((doctor, index) => (
              <motion.div key={index} className="col-md-4" variants={itemVariants}>
                <div className="doctor-card p-3 text-center">
                  <img
                    src={doctor.image}
                    className="mb-3"
                    alt={doctor.name}
                    style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px' }}
                  />
                  <strong>{doctor.name}</strong>
                  <div className="muted small">{doctor.role}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* LATEST BLOG */}
      <section id="blog" className="py-5 bg-soft">
        <div className="container">
          <h4 className="section-title text-center">Latest Blog</h4>
          <motion.div
            className="row mt-4 g-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {blogPosts.map((post, index) => (
              <motion.div key={index} className="col-md-4" variants={itemVariants}>
                <div className="blog-card p-3">
                  <img
                    src={post.image}
                    className="mb-3"
                    alt={post.title}
                    style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <h6>{post.title}</h6>
                  <p className="text-muted small">{post.excerpt}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

// Appointment Section Component
const AppointmentSection = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    email: '',
    healthType: '',
    doctor: '',
    date: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Connect to backend API
    console.log('Appointment submitted:', formData);
    alert('Appointment request submitted! We will contact you soon.');
    setFormData({ name: '', phone: '', email: '', healthType: '', doctor: '', date: '' });
  };

  return (
    <section id="appointment" className="py-5 bg-soft">
      <div className="container">
        <div className="row g-4">
          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Radiant Resilience Your Wellness Your Strength</h3>
            <p className="text-muted">
              Book an appointment with our specialists. We provide virtual and in-person consultations.
            </p>
            <ul className="list-unstyled text-muted">
              <li>• Call: (555) 555-0129</li>
              <li>• Open: Mon-Fri 8am-6pm</li>
            </ul>
          </motion.div>
          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="appointment-card p-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-2">
                  <div className="col-md-6">
                    <input
                      className="form-control"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      className="form-control"
                      name="phone"
                      type="tel"
                      placeholder="Your Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      className="form-control"
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      className="form-control"
                      name="healthType"
                      placeholder="Health Type"
                      value={formData.healthType}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      className="form-control"
                      name="doctor"
                      placeholder="Select Doctor"
                      value={formData.doctor}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      className="form-control"
                      name="date"
                      type="date"
                      placeholder="Date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mt-3 text-end">
                  <button className="btn btn-primary" type="submit">
                    Appointment Now
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;
