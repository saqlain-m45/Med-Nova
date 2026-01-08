import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const DiseasePrediction = () => {
    const [symptoms, setSymptoms] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // Mock prediction logic (Keyword matching)
    // Mock prediction logic (Keyword matching)
    const predictDisease = (input) => {
        const text = input.toLowerCase().replace(/\s+/g, ' '); // Normalize spaces

        // Helper to check keywords
        const has = (word) => text.includes(word);

        if ((has('fever') || has('temperature')) && (has('cough') || has('throat'))) return { name: 'Viral Flu', risk: 'Moderate', advice: 'Rest, hydration, and paracetamol. Consult a doctor if fever persists.' };

        // Handle "head ache" or "headache" + eye pain
        if ((has('headache') || has('head ache')) && (has('eye') || has('vision') || has('nausea'))) return { name: 'Migraine or Eye Strain', risk: 'Low', advice: 'Rest in a dark room. Reduce screen time. If vision is affected, see an eye specialist.' };

        // Just headache w/o nausea check
        if (has('headache') || has('head ache')) return { name: 'Tension Headache', risk: 'Low', advice: 'Manage stress, stay hydrated, and rest. Take OTC pain relief if needed.' };

        if (has('chest pain') || has('heart') || has('shortness of breath')) return { name: 'Possible Heart Issue', risk: 'High', advice: 'Seek immediate medical attention or call emergency services.' };

        if ((has('skin') || has('itch')) && has('rash')) return { name: 'Dermatitis', risk: 'Low', advice: 'Apply moisturizer, avoid irritants. See a dermatologist.' };

        if ((has('joint') || has('knee') || has('back')) && has('pain')) return { name: 'Arthritis / Muscular Strain', risk: 'Moderate', advice: 'Gentle exercise, warm compresses. Consult an orthopedic.' };

        if (has('eye') && (has('pain') || has('red') || has('itch'))) return { name: 'Conjunctivitis / Eye Strain', risk: 'Low', advice: 'Wash eyes with water. Avoid touching. Use prescribed drops if needed.' };

        return { name: 'Unknown Condition', risk: 'Unknown', advice: 'Symptoms are nonspecific. Please consult a general physician for a proper checkup.' };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!symptoms.trim()) return;

        setLoading(true);
        setResult(null);

        // Simulate API delay
        setTimeout(() => {
            const prediction = predictDisease(symptoms);
            setResult(prediction);
            setLoading(false);
        }, 1500);
    };

    return (
        <PageTransition>
            <header className="about-hero service-hero py-5">
                <div className="container text-center text-white py-5">
                    <motion.h1
                        className="display-5 fw-bold mb-2"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Disease Prediction
                    </motion.h1>
                    <p className="lead opacity-75">AI-Powered Symptom Checker</p>
                </div>
            </header>

            <section className="py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                                <div className="card-body p-5">
                                    <h3 className="fw-bold mb-4 text-center">Analyze Your Symptoms</h3>
                                    <p className="text-muted text-center mb-4">
                                        Enter your symptoms separated by commas (e.g., "fever, cough, headache").
                                        <br /><small className="text-danger">*This is a demonstration tool and not a substitute for professional medical advice.</small>
                                    </p>

                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <textarea
                                                className="form-control form-control-lg bg-light border-0"
                                                rows="4"
                                                placeholder="Describe what you are feeling..."
                                                value={symptoms}
                                                onChange={(e) => setSymptoms(e.target.value)}
                                                style={{ resize: 'none' }}
                                            ></textarea>
                                        </div>

                                        <div className="text-center">
                                            <motion.button
                                                type="submit"
                                                className="btn btn-primary btn-lg px-5 rounded-pill shadow-sm"
                                                disabled={loading || !symptoms}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {loading ? (
                                                    <span><span className="spinner-border spinner-border-sm me-2"></span>Analyzing...</span>
                                                ) : (
                                                    'Predict Disease'
                                                )}
                                            </motion.button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* RESULT SECTION */}
                            <AnimatePresence>
                                {result && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className={`mt-4 p-4 rounded-4 shadow-sm border-start border-5 ${result.risk === 'High' ? 'bg-danger-subtle border-danger' :
                                            result.risk === 'Moderate' ? 'bg-warning-subtle border-warning' :
                                                'bg-success-subtle border-success'
                                            }`}
                                    >
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div>
                                                <h4 className="fw-bold mb-1">Potential Condition: {result.name}</h4>
                                                <span className={`badge ${result.risk === 'High' ? 'bg-danger' :
                                                    result.risk === 'Moderate' ? 'bg-warning text-dark' :
                                                        'bg-success'
                                                    }`}>Risk Level: {result.risk}</span>
                                            </div>
                                            <div className="fs-1">
                                                {result.risk === 'High' ? '🚨' : result.risk === 'Moderate' ? '⚠️' : '✅'}
                                            </div>
                                        </div>

                                        <h6 className="fw-bold text-muted text-uppercase small">Recommendation</h6>
                                        <p className="lead mb-3">{result.advice}</p>

                                        <div className="d-flex gap-3 mt-4">
                                            <Link to="/doctors" className="btn btn-outline-primary rounded-pill">Find a Doctor</Link>
                                            <Link to="/appointment" className="btn btn-primary rounded-pill">Book Appointment</Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>
        </PageTransition>
    );
};

export default DiseasePrediction;
