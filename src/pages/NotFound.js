import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const NotFound = () => {
  return (
    <PageTransition>
      <main className="py-5">
        <div className="container text-center">
          <div className="error-number">404</div>
          <div className="error-illustration mx-auto"></div>
          <h2 className="mt-4">Page Not Found</h2>
          <p className="text-muted">The page you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary mt-3">
            Go Home
          </Link>
        </div>
      </main>
    </PageTransition>
  );
};

export default NotFound;

