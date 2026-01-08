import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { doctors, specialties } from '../data/doctors';
import PageTransition from '../components/PageTransition';

const Appointment = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    specialty: '',
    doctor: '',
    date: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Derived state for filtering doctors based on selected specialty
  const filteredDoctors = formData.specialty
    ? doctors.filter(doc => doc.specialty === formData.specialty)
    : doctors;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Specific handler for specialty change to reset doctor selection
  const handleSpecialtyChange = (e) => {
    setFormData({
      ...formData,
      specialty: e.target.value,
      doctor: '' // Reset doctor when specialty changes
    });
  };

  const nextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Appointment submitted:', formData);
      setStep(3); // Move to success step
      setIsSubmitting(false);
    }, 1500);
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
            Get An Appointment
          </motion.h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0 bg-transparent">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Appointment
              </li>
            </ol>
          </nav>
        </div>
      </header>

      <main className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <motion.div
                className="appointment-card p-5 shadow-lg rounded-4 bg-white"
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* PROGRESS BAR */}
                {step < 3 && (
                  <div className="d-flex justify-content-center mb-5 position-relative">
                    <div className="position-absolute top-50 start-0 w-100 bg-light" style={{ height: '4px', zIndex: 0 }}></div>
                    <div
                      className="position-absolute top-50 start-0 bg-primary transition-all"
                      style={{ height: '4px', width: step === 1 ? '50%' : '100%', zIndex: 0, transition: 'width 0.3s ease' }}
                    ></div>

                    <div className="d-flex w-100 justify-content-between position-relative" style={{ zIndex: 1 }}>
                      <div className={`d-flex flex-column align-items-center ${step >= 1 ? 'text-primary' : 'text-muted'}`}>
                        <div className={`rounded-circle d-flex align-items-center justify-content-center fw-bold mb-2 ${step >= 1 ? 'bg-primary text-white' : 'bg-light text-muted'}`} style={{ width: 40, height: 40 }}>1</div>
                        <small className="fw-bold">My Info</small>
                      </div>
                      <div className={`d-flex flex-column align-items-center ${step >= 2 ? 'text-primary' : 'text-muted'}`}>
                        <div className={`rounded-circle d-flex align-items-center justify-content-center fw-bold mb-2 ${step >= 2 ? 'bg-primary text-white' : 'bg-light text-muted'}`} style={{ width: 40, height: 40 }}>2</div>
                        <small className="fw-bold">Doctor & Date</small>
                      </div>
                      <div className={`d-flex flex-column align-items-center ${step >= 3 ? 'text-primary' : 'text-muted'}`}>
                        <div className={`rounded-circle d-flex align-items-center justify-content-center fw-bold mb-2 ${step >= 3 ? 'bg-primary text-white' : 'bg-light text-muted'}`} style={{ width: 40, height: 40 }}>3</div>
                        <small className="fw-bold">Confirmation</small>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 1: PERSONAL INFO */}
                {step === 1 && (
                  <form onSubmit={nextStep}>
                    <h3 className="fw-bold text-center mb-4">Personal Information</h3>
                    <div className="row g-3">
                      <div className="col-md-12">
                        <label className="form-label text-muted">Full Name</label>
                        <input
                          className="form-control form-control-lg"
                          name="name"
                          placeholder="Ex. John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-muted">Phone Number</label>
                        <input
                          className="form-control form-control-lg"
                          name="phone"
                          type="tel"
                          placeholder="+1 234 567 890"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-muted">Email Address</label>
                        <input
                          className="form-control form-control-lg"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-12 mt-4 text-end">
                        <button type="submit" className="btn btn-primary btn-lg px-5 rounded-pill">
                          Next Step →
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {/* STEP 2: DOCTOR SELECTION */}
                {step === 2 && (
                  <form onSubmit={handleSubmit}>
                    <h3 className="fw-bold text-center mb-4">Select Your Doctor</h3>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label text-muted">Specialty</label>
                        <select
                          className="form-select form-select-lg"
                          name="specialty"
                          value={formData.specialty}
                          onChange={handleSpecialtyChange}
                          required
                        >
                          <option value="">Select Specialty</option>
                          {specialties.filter(s => s !== 'All').map(spec => (
                            <option key={spec} value={spec}>{spec}</option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-muted">Preferred Doctor</label>
                        <select
                          className="form-select form-select-lg"
                          name="doctor"
                          value={formData.doctor}
                          onChange={handleChange}
                          required
                          disabled={!formData.specialty}
                        >
                          <option value="">
                            {formData.specialty ? 'Select Doctor' : 'Select Specialty First'}
                          </option>
                          {filteredDoctors.map((doc) => (
                            <option key={doc.id} value={doc.name}>
                              {doc.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-12">
                        <label className="form-label text-muted">Preferred Date</label>
                        <input
                          className="form-control form-control-lg"
                          name="date"
                          type="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-12 mt-4 d-flex justify-content-between">
                        <button type="button" onClick={prevStep} className="btn btn-light btn-lg px-4 rounded-pill">
                          ← Back
                        </button>
                        <button type="submit" className="btn btn-primary btn-lg px-5 rounded-pill" disabled={isSubmitting}>
                          {isSubmitting ? 'Confirming...' : 'Confirm Appointment'}
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {/* STEP 3: SUCCESS */}
                {step === 3 && (
                  <div className="text-center py-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                      style={{ width: 80, height: 80, fontSize: 40 }}
                    >
                      ✓
                    </motion.div>
                    <h2 className="fw-bold text-success mb-3">Appointment Booked!</h2>
                    <p className="text-muted mb-4">
                      Thank you, <strong>{formData.name}</strong>. Your appointment with <strong>{formData.doctor}</strong> on <strong>{formData.date}</strong> has been requested.<br />
                      We will contact you at <strong>{formData.email}</strong> to confirm.
                    </p>
                    <Link to="/" className="btn btn-outline-primary btn-lg rounded-pill px-5">
                      Back to Home
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default Appointment;
