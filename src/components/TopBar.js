import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {
    return (
        <div className="top-bar py-2 d-none d-lg-block">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="top-bar-social d-flex gap-3 align-items-center">
                    <a href="#" aria-label="Instagram" className="text-dark">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    <a href="#" aria-label="Whatsapp" className="text-dark">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17a2 2 0 0 1-2 2h-2v2l-4-4h-9a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v11z"></path></svg>
                    </a>
                    <a href="#" aria-label="Facebook" className="text-dark">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </a>
                </div>
                <div className="top-bar-actions d-flex align-items-center">
                    <Link to="/login" className="text-dark text-decoration-none small fw-bold d-flex align-items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        Login / Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
