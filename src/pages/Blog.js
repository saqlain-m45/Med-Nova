import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blog';
import PageTransition from '../components/PageTransition';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
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

const Blog = () => {
  return (
    <PageTransition>
      {/* BLOG HERO SECTION */}
      <header className="blog-hero-section">
        <div className="container position-relative z-2">
          <motion.h1
            className="display-4 fw-bold mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Med Nova Health Journal
          </motion.h1>
          <motion.p
            className="lead mx-auto"
            style={{ maxWidth: '600px', opacity: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Latest updates, health tips, and medical news from Kohat and beyond.
          </motion.p>
        </div>
      </header>

      <main className="py-5 bg-soft">
        <div className="container">
          <motion.div
            className="row g-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {blogPosts.map((post) => (
              <motion.div key={post.id} className="col-md-6 col-lg-4" variants={itemVariants}>
                <div className="blog-pro-card">
                  <div className="blog-pro-img-wrapper">
                    <img src={post.image} alt={post.title} />
                    <span className="blog-category-badge">{post.category}</span>
                  </div>
                  <div className="blog-pro-body">
                    <div className="blog-meta-date">
                      <i className="bi bi-calendar-event"></i> {post.date}
                    </div>
                    <h3 className="blog-pro-title">{post.title}</h3>
                    <p className="blog-pro-excerpt">{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className="blog-read-btn">
                      Read Full Article <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </PageTransition>
  );
};

export default Blog;

