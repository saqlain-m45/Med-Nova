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
      {/* 
        NOTE: The user design reference doesn't show a hero section like the original.
        However, I will keep a simpler header or remove it if strictly following the image. 
        For now, I'll keep a minimal spacing at top or a simple title if needed, 
        but the image implies a clean grid. I'll use a simple container with padding.
      */}

      <main className="py-5" style={{ minHeight: '100vh', background: '#f8fdf0' }}>
        {/* Used a light greenish tint background similar to the image if possible, or keep white. 
           The image has a very light green/beige background. #f8fdf0 is a subtle green tint. */}
        <div className="container" style={{ maxWidth: '1200px' }}>

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
                  className="blog-card h-100"
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {/* Image Area */}
                  <div className="blog-card-img-wrapper">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="blog-card-img"
                    />
                  </div>

                  {/* Content Area */}
                  <div className="blog-card-body text-center p-4 d-flex flex-column align-items-center">
                    <span className="blog-category mb-2">{post.category}</span>
                    <h5 className="blog-title mb-3">{post.title}</h5>

                    <div className="mt-auto">
                      <Link to={`/blog/${post.slug}`} className="btn btn-blue-pill">
                        READ MORE
                      </Link>
                    </div>
                  </div>
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

