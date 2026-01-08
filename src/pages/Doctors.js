import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { doctors, specialties } from '../data/doctors';
import PageTransition from '../components/PageTransition';

const Doctors = () => {
  const location = useLocation();
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    if (location.state?.problem) {
      setSelectedSpecialty(location.state.problem);
    }
  }, [location.state]);

  useEffect(() => {
    if (selectedSpecialty === 'All') {
      setFilteredDoctors(doctors);
    } else {
      setFilteredDoctors(doctors.filter(doc => doc.specialty === selectedSpecialty));
    }
  }, [selectedSpecialty]);

  // Set first doctor or specific searched doctor as selected
  useEffect(() => {
    if (filteredDoctors.length > 0) {
      if (location.state?.specialist) {
        const found = filteredDoctors.find(d => d.name === location.state.specialist);
        if (found) {
          setSelectedDoctor(found);
          // Clear state to prevent sticking on re-renders if needed, but simple is fine.
          return;
        }
      }
      setSelectedDoctor(filteredDoctors[0]);
    } else {
      setSelectedDoctor(null);
    }
  }, [filteredDoctors, location.state]);

  return (
    <PageTransition>
      {/* HEADER */}
      <header className="about-hero service-hero py-5">
        <div className="container text-center text-white py-4">
          <h1 className="display-4 fw-bold">Find Your Specialist</h1>
          <p className="lead opacity-75">Expert care across all specialties</p>
        </div>
      </header>

      <div className="container py-5">
        <div className="row g-4">

          {/* SIDEBAR: FILTERS */}
          <div className="col-lg-3">
            <div className="filters-sidebar p-4 bg-white rounded-3 shadow-sm sticky-top" style={{ top: '100px', zIndex: 10 }}>
              <h5 className="mb-3 fw-bold text-dark">Specialties</h5>
              <div className="d-flex flex-column gap-2">
                {specialties.map((spec) => (
                  <button
                    key={spec}
                    onClick={() => setSelectedSpecialty(spec)}
                    className={`btn text-start rounded-3 py-2 px-3 fw-medium transition-all ${selectedSpecialty === spec
                      ? 'btn-primary text-white shadow-sm'
                      : 'btn-light text-muted bg-transparent hover-bg-light'
                      }`}
                    style={{ transition: 'all 0.2s ease' }}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER: DOCTOR LIST */}
          <div className="col-lg-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0 text-muted">{filteredDoctors.length} Doctors Found</h5>
            </div>

            <div className="d-flex flex-column gap-3">
              <AnimatePresence mode="popLayout">
                {filteredDoctors.map((doc) => (
                  <motion.div
                    key={doc.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setSelectedDoctor(doc)}
                    className={`doctor-list-card p-3 rounded-3 cursor-pointer ${selectedDoctor?.id === doc.id ? 'active-doctor-card' : 'bg-white'
                      }`}
                    style={{
                      cursor: 'pointer',
                      border: selectedDoctor?.id === doc.id ? '2px solid var(--accent)' : '2px solid transparent',
                      boxShadow: selectedDoctor?.id === doc.id ? '0 10px 30px rgba(47, 123, 255, 0.15)' : '0 4px 20px rgba(0,0,0,0.04)'
                    }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="rounded-circle object-fit-cover"
                        style={{ width: '64px', height: '64px', border: '2px solid #eef6ff' }}
                      />
                      <div>
                        <h6 className="mb-1 fw-bold text-dark">{doc.name}</h6>
                        <div className="badge bg-light text-primary mb-1">{doc.specialty}</div>
                        <div className="small text-muted">{doc.experience} Experience</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: DETAIL PANEL */}
          <div className="col-lg-4 d-none d-lg-block">
            <div className="sticky-top" style={{ top: '100px' }}>
              <AnimatePresence mode="wait">
                {selectedDoctor && (
                  <motion.div
                    key={selectedDoctor.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="doctor-detail-panel bg-white p-4 rounded-4 shadow"
                  >
                    <div className="text-center mb-4">
                      <img
                        src={selectedDoctor.image}
                        alt={selectedDoctor.name}
                        className="rounded-4 mb-3 shadow-sm object-fit-cover"
                        style={{ width: '100%', height: '280px' }}
                      />
                      <h3 className="fw-bold mb-1">{selectedDoctor.name}</h3>
                      <p className="text-primary fw-medium mb-1">{selectedDoctor.role}</p>
                      <div className="d-flex justify-content-center gap-2 text-warning fs-5">
                        {'★'.repeat(Math.floor(selectedDoctor.rating))}
                        <span className="text-muted fs-6 align-self-center">({selectedDoctor.rating})</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h6 className="fw-bold text-uppercase text-muted small mb-2">About Doctor</h6>
                      <p className="text-muted">{selectedDoctor.intro}</p>
                    </div>

                    <div className="mb-4">
                      <h6 className="fw-bold text-uppercase text-muted small mb-3">Contact Info</h6>
                      <div className="d-flex align-items-center gap-3 mb-2">
                        <div className="icon-box bg-light text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}>📞</div>
                        <span className="text-dark">{selectedDoctor.phone}</span>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <div className="icon-box bg-light text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}>✉️</div>
                        <span className="text-dark">{selectedDoctor.email}</span>
                      </div>
                    </div>

                    <Link to="/appointment" className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow-sm hover-lift">
                      Book Appointment Now
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default Doctors;
