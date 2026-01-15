import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import './BloodDonation.css'; // Import the new styles

const BloodDonation = () => {
    const [activeTab, setActiveTab] = useState('donor'); // 'donor' or 'patient'
    const [notification, setNotification] = useState(null);

    // Donor Form State
    const [donorForm, setDonorForm] = useState({
        name: '',
        age: '',
        bloodGroup: '',
        phone: '',
        location: '',
        lastDonation: ''
    });

    // Patient Request Form State
    const [requestForm, setRequestForm] = useState({
        patientName: '',
        bloodGroup: '',
        urgency: 'Normal',
        hospital: '',
        contactPhone: '',
        location: ''
    });

    const handleDonorChange = (e) => {
        setDonorForm({ ...donorForm, [e.target.name]: e.target.value });
    };

    const handleRequestChange = (e) => {
        setRequestForm({ ...requestForm, [e.target.name]: e.target.value });
    };

    const handleDonorSubmit = (e) => {
        e.preventDefault();
        // Simulate saving to DB
        const existingDonors = JSON.parse(localStorage.getItem('blood_donors') || '[]');
        const newDonor = { ...donorForm, id: Date.now() };
        localStorage.setItem('blood_donors', JSON.stringify([...existingDonors, newDonor]));

        setNotification({
            type: 'success',
            message: 'Thank you for registering as a blood donor! You are a hero.'
        });
        setDonorForm({ name: '', age: '', bloodGroup: '', phone: '', location: '', lastDonation: '' });
        setTimeout(() => setNotification(null), 5000);
    };

    const handleRequestSubmit = (e) => {
        e.preventDefault();
        // Simulate matching logic
        const existingDonors = JSON.parse(localStorage.getItem('blood_donors') || '[]');
        const matchingDonors = existingDonors.filter(d =>
            d.bloodGroup === requestForm.bloodGroup &&
            (d.location.toLowerCase().includes(requestForm.location.toLowerCase()) || requestForm.location.toLowerCase().includes(d.location.toLowerCase()))
        );

        if (matchingDonors.length > 0) {
            setNotification({
                type: 'success',
                message: `Request Submitted! We found ${matchingDonors.length} potential donor(s) near you. System has sent them notifications.`
            });
        } else {
            setNotification({
                type: 'warning',
                message: 'Request Submitted. Currently no specific matches found nearby, but we have broadcasted your request to all donors.'
            });
        }
        setRequestForm({ patientName: '', bloodGroup: '', urgency: 'Normal', hospital: '', contactPhone: '', location: '' });
        setTimeout(() => setNotification(null), 8000);
    };

    return (
        <PageTransition>
            <div className="bd-page">
                {/* Enhanced Hero Section */}
                <header className="bd-hero">
                    <div className="container text-center bd-hero-content">
                        <motion.h1
                            className="bd-hero-title"
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            Save a Life, Donate Blood
                        </motion.h1>
                        <motion.p
                            className="bd-hero-subtitle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            Your donation is a beacon of hope. Connect directly with donors or find blood for your loved ones in seconds.
                        </motion.p>
                    </div>
                </header>

                <main className="container bd-card-container">
                    {/* Notification Alert */}
                    {notification && (
                        <div className={`bd-alert bd-alert-${notification.type === 'success' ? 'success' : 'warning'}`}>
                            {notification.type === 'success' ? '✨ ' : '⚠️ '} {notification.message}
                        </div>
                    )}

                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-10">
                            {/* Modern Card */}
                            <motion.div
                                className="bd-card"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                {/* Tab Switcher */}
                                <div className="bd-tabs">
                                    <button
                                        className={`bd-tab-btn ${activeTab === 'donor' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('donor')}
                                    >
                                        Register as Donor
                                    </button>
                                    <button
                                        className={`bd-tab-btn ${activeTab === 'patient' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('patient')}
                                    >
                                        Request Blood
                                    </button>
                                </div>

                                <div className="bd-form">
                                    {activeTab === 'donor' ? (
                                        <motion.form
                                            key="donor-form"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3 }}
                                            onSubmit={handleDonorSubmit}
                                        >
                                            <div className="text-center mb-5">
                                                <h3 style={{ color: '#e63946', fontWeight: 'bold' }}>Donor Registration</h3>
                                                <p className="text-muted">Join our community of heroes</p>
                                            </div>

                                            <div className="row g-4">
                                                <div className="col-md-6">
                                                    <label className="bd-label">Full Name</label>
                                                    <input type="text" className="bd-input" name="name" value={donorForm.name} onChange={handleDonorChange} required placeholder="John Doe" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="bd-label">Age</label>
                                                    <input type="number" className="bd-input" name="age" value={donorForm.age} onChange={handleDonorChange} required min="18" placeholder="18+" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="bd-label">Blood Group</label>
                                                    <select className="bd-select" name="bloodGroup" value={donorForm.bloodGroup} onChange={handleDonorChange} required>
                                                        <option value="">Select Group</option>
                                                        <option value="A+">A+</option>
                                                        <option value="A-">A-</option>
                                                        <option value="B+">B+</option>
                                                        <option value="B-">B-</option>
                                                        <option value="O+">O+</option>
                                                        <option value="O-">O-</option>
                                                        <option value="AB+">AB+</option>
                                                        <option value="AB-">AB-</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="bd-label">Phone Number</label>
                                                    <input type="tel" className="bd-input" name="phone" value={donorForm.phone} onChange={handleDonorChange} required placeholder="+1 234 567 890" />
                                                </div>
                                                <div className="col-12">
                                                    <label className="bd-label">Location (City/Area)</label>
                                                    <input type="text" className="bd-input" name="location" value={donorForm.location} onChange={handleDonorChange} required placeholder="e.g., Downtown, Springfield" />
                                                </div>
                                                <div className="col-12 mt-4">
                                                    <button type="submit" className="bd-btn-primary">Become a Donor</button>
                                                </div>
                                            </div>
                                        </motion.form>
                                    ) : (
                                        <motion.form
                                            key="patient-form"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            onSubmit={handleRequestSubmit}
                                        >
                                            <div className="text-center mb-5">
                                                <h3 style={{ color: '#ffb703', fontWeight: 'bold' }}>Find Blood Donor</h3>
                                                <p className="text-muted">Urgent request broadcasting</p>
                                            </div>

                                            <div className="row g-4">
                                                <div className="col-md-6">
                                                    <label className="bd-label">Patient Name</label>
                                                    <input type="text" className="bd-input" name="patientName" value={requestForm.patientName} onChange={handleRequestChange} required placeholder="Patient Name" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="bd-label">Blood Group Required</label>
                                                    <select className="bd-select" name="bloodGroup" value={requestForm.bloodGroup} onChange={handleRequestChange} required>
                                                        <option value="">Select Group</option>
                                                        <option value="A+">A+</option>
                                                        <option value="A-">A-</option>
                                                        <option value="B+">B+</option>
                                                        <option value="B-">B-</option>
                                                        <option value="O+">O+</option>
                                                        <option value="O-">O-</option>
                                                        <option value="AB+">AB+</option>
                                                        <option value="AB-">AB-</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="bd-label">Urgency</label>
                                                    <select className="bd-select" name="urgency" value={requestForm.urgency} onChange={handleRequestChange}>
                                                        <option value="Normal">Normal</option>
                                                        <option value="Urgent">Urgent</option>
                                                        <option value="Critical">Critical</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="bd-label">Contact Phone</label>
                                                    <input type="tel" className="bd-input" name="contactPhone" value={requestForm.contactPhone} onChange={handleRequestChange} required placeholder="Contact Number" />
                                                </div>
                                                <div className="col-12">
                                                    <label className="bd-label">Hospital / Location</label>
                                                    <input type="text" className="bd-input" name="location" value={requestForm.location} onChange={handleRequestChange} required placeholder="e.g., City Hospital" />
                                                </div>
                                                <div className="col-12 mt-4">
                                                    <button type="submit" className="bd-btn-secondary">Broadcast Request</button>
                                                </div>
                                            </div>
                                        </motion.form>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </main>
            </div>
        </PageTransition>
    );
};

export default BloodDonation;
