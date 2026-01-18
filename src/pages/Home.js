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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const Home = () => {
  const specializations = [
    { icon: '🩺', title: 'General Surgery', subtitle: 'KDA Teaching Hospital', link: '/services/general-surgery', description: 'Advanced surgical procedures and post-operative care at KDA Kohat.' },
    { icon: '👶', title: 'Pediatrics', subtitle: 'DHQ Hospital', link: '/services/pediatrics', description: 'Specialized child healthcare services available at DHQ Kohat.' },
    { icon: '❤️', title: 'Cardiology', subtitle: 'City Heart Center', link: '/services/cardiology', description: 'Comprehensive heart care and diagnostics in the center of Kohat.' },
    { icon: '🦷', title: 'Dental Care', subtitle: 'Kohat Bazar Clinics', link: '/services/dental-care', description: 'Expert dental treatments and oral surgeries by top local dentists.' }
  ];



  const doctors = [
    { name: 'Dr. Nadeem Khan', role: 'Senior Surgeon, KDA', image: '/assets/doctor-bilal.jpg', link: '/doctors/nadeem-khan' },
    { name: 'Dr. Asma Gul', role: 'Gynecologist, DHQ', image: '/assets/doctor-fatima.jpg', link: '/doctors/asma-gul' },
    { name: 'Dr. Tariq Mehmood', role: 'Child Specialist', image: '/assets/doctor-yusuf.jpg', link: '/doctors/tariq-mehmood' }
  ];

  const blogPosts = [
    { title: 'New MRI Facility at KDA', excerpt: 'KDA Teaching Hospital inaugurates a state-of-the-art MRI machine for the public.', image: '/assets/blog-mri.png', link: '/blog/new-mri-kda', date: 'Jan 15, 2026', category: 'Hospital News' },
    { title: 'Dengue Prevention in Kohat', excerpt: 'Municipal guidelines for citizens to stay safe from the seasonal dengue outbreak.', image: '/assets/blog-dengue.png', link: '/blog/dengue-prevention', date: 'Jan 10, 2026', category: 'Public Health' },
    { title: 'Free Medical Camp in Lachi', excerpt: 'A successful free eye and general health camp was organized in Tehsil Lachi.', image: '/assets/blog-camp.png', link: '/blog/free-medical-camp', date: 'Jan 05, 2026', category: 'Events' }
  ];

  return (
    <PageTransition>
      {/* HERO */}
      {/* HERO REDESIGNED */}
      <header className="hero-redesign">
        <div className="container position-relative">
          <div className="row align-items-center">
            {/* Left Content */}
            <motion.div
              className="col-lg-6 mb-5 mb-lg-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <div className="pe-lg-5">
                <motion.h4 className="fw-bold text-uppercase mb-3" style={{ color: '#16a34a', fontSize: '14px', letterSpacing: '2px' }} variants={itemVariants}>
                  Kohat's First
                </motion.h4>
                <motion.h1 className="hero-redesign-title display-4" variants={itemVariants}>
                  Smart Digital <span style={{ color: 'var(--accent)' }}>Healthcare</span> For Everyone!
                </motion.h1>
                <motion.p className="hero-redesign-sub" variants={itemVariants}>
                  Med Nova: Introducing the first-ever advanced digital healthcare platform in Kohat, connecting you to the best hospitals and doctors instantly.
                </motion.p>

                <motion.div className="d-flex align-items-center gap-3" variants={itemVariants}>
                  <Link to="/appointment" className="btn btn-primary rounded-pill px-4 py-3 shadow-lg d-inline-flex align-items-center gap-2 hover-lift" style={{ background: 'linear-gradient(135deg, #2563eb, #1e3a8a)', border: 'none', transition: 'all 0.3s ease' }}>
                    <span className="fw-bold">Book Appointment</span>
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                  <Link to="/doctors" className="btn btn-light rounded-pill px-4 py-3 shadow-lg d-inline-flex align-items-center gap-2 hover-lift" style={{ background: '#fff', color: '#2563eb', border: '2px solid #2563eb', transition: 'all 0.3s ease' }}>
                    <span className="fw-bold">Get Online Consultation</span>
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </motion.div>

                <motion.p className="mt-4 text-muted small" variants={itemVariants}>
                  24/7 Support, Trusted by 10k+ Patients, Expert Doctors
                </motion.p>
              </div>
            </motion.div>

            {/* Right Image Area */}
            <motion.div
              className="col-lg-6 text-center position-relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="hero-image-wrapper">
                {/* Blob Background */}
                <div className="hero-blob-bg"></div>

                {/* Main Image */}
                <img src="/assets/hero_ref.png" alt="Doctor" className="hero-main-img img-fluid" style={{ maxHeight: '550px', objectFit: 'contain' }} />

                {/* Floating Card: Satisfied Clients */}
                <motion.div
                  className="hero-float-card"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="mb-2"><strong>Med Nova's Pride</strong></div>
                  <span className="huge-text">10k</span>
                  <p>Clients Satisfied!!</p>
                  <div className="mt-3 d-flex gap-2 justify-content-center">
                    <span className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>↗</span>
                    <span className="btn btn-success rounded-pill px-3 py-2 small fw-bold" style={{ fontSize: '12px' }}>Know More</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* DEDICATED STATS SECTION (Blue Cards) */}
      <section className="stats-section-container">
        <div className="container">
          <motion.div
            className="stats-blue-grid"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="stat-card-blue">
              <span className="stat-num">200+</span>
              <span className="stat-label">Happy Patients</span>
            </div>
            <div className="stat-card-blue">
              <span className="stat-num">20+</span>
              <span className="stat-label">Service Areas</span>
            </div>
            <div className="stat-card-blue">
              <span className="stat-num">10k+</span>
              <span className="stat-label">Expert Doctors</span>
            </div>
            <div className="stat-card-blue">
              <span className="stat-num">900+</span>
              <span className="stat-label">Recovery Cases</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PARTNER RIBBON (Medilix Style) */}
      <section className="py-0 border-bottom">
        <div className="infinity-scroll-container small">
          <div className="infinity-scroll-track">
            {/* Duplicate items for seamless scrolling */}
            {[...Array(4)].map((_, i) => (
              <React.Fragment key={i}>
                <div className="infinity-scroll-item"><span>•</span> Leading Medical Care</div>
                <div className="infinity-scroll-item"><span>•</span> Trusted By Thousands</div>
                <div className="infinity-scroll-item"><span>•</span> Award Winning Service</div>
                <div className="infinity-scroll-item"><span>•</span> Certified Specialists</div>
                <div className="infinity-scroll-item"><span>•</span> Advanced Technology</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIALIZATIONS (PRO) */}
      <section id="services" className="py-5 bg-soft">
        <div className="container-fluid-custom">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h6 className="text-uppercase fw-bold text-primary">Our Services</h6>
            <h2 className="section-title">Specialization We Provide</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
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
                <Link to={spec.link} className="text-decoration-none">
                  <div className="service-pro-card">
                    <div className="service-icon-box">{spec.icon}</div>
                    <div className="mb-2 text-uppercase small fw-bold text-muted">{spec.subtitle}</div>
                    <h5 className="fw-bold mb-3" style={{ color: 'var(--blue-900)' }}>{spec.title}</h5>
                    <p className="text-muted small mb-0">{spec.description}</p>
                    <span className="service-learn-more">Learn More &rarr;</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ABOUT MODERN SECTION */}
      <section className="py-5 bg-white">
        <div className="container-fluid-custom">
          <div className="row align-items-center">
            <motion.div
              className="col-lg-6 mb-5 mb-lg-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="about-img-composition">
                <img src="/assets/doctor-fatima.jpg" className="img-fluid about-main-img" alt="About Us" />
                <div className="about-overlay-card">
                  <h3 className="fw-bold text-primary mb-0">25+</h3>
                  <p className="small mb-0 fw-bold">Years of Experience</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h5 className="text-primary fw-bold text-uppercase mb-3">About Us</h5>
              <h2 className="display-6 fw-bold mb-4" style={{ color: 'var(--blue-900)' }}>Harbor Health: Anchored in Care & Commitment</h2>
              <p className="text-muted lead mb-4">
                We are dedicated to providing top-tier medical services with a patient-first approach. Our integrated system ensures that you receive the best care possible, from diagnosis to recovery.
              </p>

              <div className="about-feature-grid">
                <div className="about-feature-item">
                  <div className="about-feature-icon">✓</div>
                  <span className="fw-bold">Certified Specialists</span>
                </div>
                <div className="about-feature-item">
                  <div className="about-feature-icon">✓</div>
                  <span className="fw-bold">24/7 Support</span>
                </div>
                <div className="about-feature-item">
                  <div className="about-feature-icon">✓</div>
                  <span className="fw-bold">Modern Facilities</span>
                </div>
                <div className="about-feature-item">
                  <div className="about-feature-icon">✓</div>
                  <span className="fw-bold">Affordable Prices</span>
                </div>
              </div>

              <button className="btn btn-primary rounded-pill px-4 py-3 mt-5 shadow">Learn More About Us</button>
            </motion.div>
          </div>
        </div>
      </section>



      {/* FAQ REFINED */}
      <section id="faq" className="py-5 bg-soft">
        <div className="container-fluid-custom">
          <div className="text-center mb-5">
            <h6 className="text-primary fw-bold text-uppercase">Questions & Answers</h6>
            <h3 className="section-title">Frequently Asked Questions</h3>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="faq-list">
                {[
                  { q: "How do I schedule an appointment?", a: "You can schedule an appointment easily through our website using the 'Get Appointment' button or by calling our support line. We offer both in-person and virtual consultations." },
                  { q: "What insurance plans do you accept?", a: "We accept a wide range of major insurance providers. Please contact our billing department or check our patient portal for a detailed list of accepted plans." },
                  { q: "Do you offer telemedicine services?", a: "Yes! We provide secure, high-quality video consultations for many types of visits, allowing you to get care from the comfort of your home." },
                  { q: "How can I access my medical records?", a: "You can access your medical records 24/7 through our secure patient portal. If you need assistance, our support team is happy to help." },
                  { q: "What safety measures are in place for clinic visits?", a: "We follow strict hygiene and safety protocols, including regular sanitization, social distancing, and mandatory mask-wearing to ensure patient safety." }
                ].map((item, i) => (
                  <FAQItem key={i} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section >



      {/* APPOINTMENT / FORM */}
      < AppointmentSection />

      {/* SPECIALIST DOCTORS (PRO) */}
      <section className="py-5 bg-white">
        <div className="container-fluid-custom">
          <div className="text-center mb-5">
            <h6 className="text-primary fw-bold text-uppercase">Our Team</h6>
            <h3 className="section-title">Meet Our Specialists</h3>
          </div>
          <motion.div
            className="row g-4 mt-2"
            variants={containerVariants}
            initial="visible"
            viewport={{ once: true }}
          >
            {doctors.map((doctor, index) => (
              <motion.div key={index} className="col-md-4" variants={itemVariants}>
                <Link to={doctor.link} className="text-decoration-none">
                  <div className="doctor-pro-card">
                    <div className="doctor-img-box">
                      <img src={doctor.image} alt={doctor.name} />
                    </div>
                    <h4 className="doctor-name">{doctor.name}</h4>
                    <div className="doctor-role">{doctor.role}</div>
                    <p className="text-muted small mb-0">Serving the Kohat community with dedication.</p>

                    <div className="doctor-socials">
                      <button className="social-btn border-0" onClick={(e) => { e.preventDefault(); }}>in</button>
                      <button className="social-btn border-0" onClick={(e) => { e.preventDefault(); }}>tw</button>
                      <button className="social-btn border-0" onClick={(e) => { e.preventDefault(); }}>fb</button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* LATEST BLOG (PRO) */}
      <section id="blog" className="py-5 bg-soft">
        <div className="container-fluid-custom">
          <div className="text-center mb-5">
            <h6 className="text-primary fw-bold text-uppercase">Latest News</h6>
            <h3 className="section-title">Our Latest Blog & News</h3>
          </div>
          <motion.div
            className="row mt-4 g-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {blogPosts.map((post, index) => (
              <motion.div key={index} className="col-md-4" variants={itemVariants}>
                <div className="blog-pro-card h-100">
                  <div style={{ overflow: 'hidden', height: '200px' }}>
                    <img src={post.image} className="blog-img-top w-100 h-100" style={{ objectFit: 'cover' }} alt={post.title} />
                  </div>
                  <div className="blog-body d-flex flex-column h-100">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="blog-badge">{post.category}</span>
                      <span className="text-muted small">{post.date}</span>
                    </div>
                    <h5 className="blog-title">{post.title}</h5>
                    <p className="blog-excerpt flex-grow-1">{post.excerpt}</p>
                    <Link to={post.link} className="blog-link mt-auto">
                      Read More &rarr;
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageTransition >
  );
};

// Helper Component for FAQ
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="faq-card">
      <div className={`faq-header ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <div className="faq-icon">
          <i className="bi bi-chevron-down">^</i>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="faq-body"
        >
          {answer}
        </motion.div>
      )}
    </div>
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
    <section id="appointment" className="py-5">
      <div className="container-fluid-custom">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="appointment-pro-card">
              <div className="row g-5 align-items-center">
                <div className="col-lg-5">
                  <h2 className="fw-bold mb-3 text-dark">Book an Appointment</h2>
                  <p className="text-muted mb-4">
                    Schedule a consultation with our expert doctors. We prioritize your health and convenience.
                  </p>

                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="icon-box bg-soft-primary text-primary p-3 rounded-circle">
                      📞
                    </div>
                    <div>
                      <div className="small text-muted font-weight-bold">Emergency Call</div>
                      <div className="fs-5 fw-bold text-dark">(555) 555-0129</div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3">
                    <div className="icon-box bg-soft-primary text-primary p-3 rounded-circle">
                      📍
                    </div>
                    <div>
                      <div className="small text-muted font-weight-bold">Location</div>
                      <div className="fs-6 fw-bold text-dark">123 Health Ave, NY</div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-7">
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="pro-input-group">
                          <label>Your Name</label>
                          <input className="form-control pro-input" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="pro-input-group">
                          <label>Phone Number</label>
                          <input className="form-control pro-input" name="phone" type="tel" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleChange} required />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="pro-input-group">
                          <label>Email Address</label>
                          <input className="form-control pro-input" name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="pro-input-group">
                          <label>Date</label>
                          <input className="form-control pro-input" name="date" type="date" value={formData.date} onChange={handleChange} required />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="pro-input-group">
                          <label>Select Department</label>
                          <select className="form-control pro-input" name="healthType" value={formData.healthType} onChange={handleChange}>
                            <option value="">Choose Department</option>
                            <option value="cardiology">Cardiology</option>
                            <option value="neurology">Neurology</option>
                            <option value="dental">Dental</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-12 mt-4 text-center">
                        <button className="btn btn-pro-submit w-100" type="submit">
                          Appointment Now
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;

