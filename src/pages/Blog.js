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
      <header className="about-hero service-hero py-5">
        <div className="container text-center text-white py-5">
          <motion.h1
            className="display-6 fw-bold mb-2 about-hero-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Blog
          </motion.h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0 bg-transparent">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Blog
              </li>
            </ol>
          </nav>
        </div>
      </header>

      <main className="py-5">
        <div className="container">
          <motion.div
            className="row g-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {blogPosts.map((post) => (
              <motion.div key={post.id} className="col-md-6 col-lg-4" variants={itemVariants}>
                <motion.div
                  className="blog-card p-3"
                  whileHover={{ y: -6, boxShadow: '0 10px 30px rgba(0,0,0,0.12)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img
                    src={post.image}
                    className="mb-3"
                    alt={post.title}
                    style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <h3>{post.title}</h3>
                  <p className="text-muted small">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="btn btn-outline-primary btn-sm mt-2">
                    Read More
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </PageTransition>
  );
};

export default Blog;

