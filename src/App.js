import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Services = React.lazy(() => import('./pages/Services'));
const ServiceDetails = React.lazy(() => import('./pages/ServiceDetails'));
const Doctors = React.lazy(() => import('./pages/Doctors'));
const DoctorDetails = React.lazy(() => import('./pages/DoctorDetails'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogDetails = React.lazy(() => import('./pages/BlogDetails'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Appointment = React.lazy(() => import('./pages/Appointment'));
const DiseasePrediction = React.lazy(() => import('./pages/DiseasePrediction'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Suspense
          fallback={
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        >
          <AnimatedRoutes />
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:serviceName" element={<ServiceDetails />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:doctorName" element={<DoctorDetails />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:postSlug" element={<BlogDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/prediction" element={<DiseasePrediction />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ChatBot />
    </AnimatePresence>
  );
};


export default App;

