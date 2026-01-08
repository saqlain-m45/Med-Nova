import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { doctors } from '../data/doctors';
import PageTransition from '../components/PageTransition';

const DoctorDetails = () => {
  const { doctorName } = useParams();
  const navigate = useNavigate();
  const decodedName = decodeURIComponent(doctorName);
  const doctor = doctors.find((d) => d.slug === decodedName);

  useEffect(() => {
    if (!doctor) {
      navigate('/doctors');
    }
  }, [doctor, navigate]);

  if (!doctor) {
    return null;
  }

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
            Doctor Details
          </motion.h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0 bg-transparent">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/doctors">Doctors</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {doctor.name}
              </li>
            </ol>
          </nav>
        </div>
      </header>

      <main className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <motion.div
                className="doc-left"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="doc-image mb-4">
                  <img src={doctor.image} alt={doctor.name} className="img-fluid rounded-3" id="doc-image" />
                </div>
                <div className="contact-info">
                  <p><strong>Email:</strong> <span id="doc-email">{doctor.email}</span></p>
                  <p><strong>Phone:</strong> <span id="doc-phone">{doctor.phone}</span></p>
                  <p><strong>Website:</strong> <span id="doc-web">{doctor.web}</span></p>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-8">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 id="doc-name">{doctor.name}</h2>
                <p className="text-muted" id="doc-intro">
                  {doctor.intro}. {doctor.role}
                </p>
                <div className="mt-4">
                  <Link to="/appointment" className="btn btn-primary">
                    Book Appointment
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default DoctorDetails;

