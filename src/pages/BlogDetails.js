import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogDetails } from '../data/blog';
import PageTransition from '../components/PageTransition';

const BlogDetails = () => {
  const { postSlug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [commentForm, setCommentForm] = useState({ name: '', message: '' });
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const postData = blogDetails[postSlug];
    if (postData) {
      setPost(postData);
      setComments(postData.comments || []);
    } else {
      navigate('/blog');
    }
  }, [postSlug, navigate]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      name: commentForm.name || 'Anonymous',
      date: new Date().toLocaleDateString(),
      body: commentForm.message
    };
    setComments([newComment, ...comments]);
    setCommentForm({ name: '', message: '' });
  };

  if (!post) {
    return null;
  }

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
            {post.title}
          </motion.h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0 bg-transparent">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/blog">Blog</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>
        </div>
      </header>

      <main className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <article className="blog-details">
                <motion.div
                  className="mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-muted small" id="bd-meta">{post.meta}</p>
                  <img src={post.hero} alt={post.title} className="img-fluid rounded-3 mb-4" id="bd-hero" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <p id="bd-intro">{post.intro}</p>
                  <div className="quote-box p-4 my-4">
                    <p className="mb-2" id="bd-quote">"{post.quote}"</p>
                    <p className="text-muted small mb-0" id="bd-quote-author">— {post.quoteAuthor}</p>
                  </div>
                  <img src={post.subimage} alt="Sub" className="img-fluid rounded-3 mb-4" id="bd-subimage" />
                  <ul className="list-unstyled" id="bd-bullets">
                    {post.bullets.map((bullet, index) => (
                      <li key={index}>
                        <div className="service-bullet">
                          <div className="dot"></div>
                          <div className="text-muted">{bullet}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Comments Section */}
                <motion.div
                  className="mt-5"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h4>Comments ({comments.length})</h4>
                  <div id="bd-comments">
                    {comments.map((comment, index) => (
                      <div key={index} className="comment-card">
                        <div className="comment-avatar" aria-hidden></div>
                        <div className="comment-body">
                          <div className="name">{comment.name}</div>
                          <div className="date">{comment.date}</div>
                          <div className="mt-2">{comment.body}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form id="comment-form" onSubmit={handleCommentSubmit} className="mt-4">
                    <h5>Leave a Comment</h5>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="c-name"
                        placeholder="Your Name"
                        value={commentForm.name}
                        onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <textarea
                        className="form-control"
                        id="c-message"
                        rows="4"
                        placeholder="Your Message"
                        value={commentForm.message}
                        onChange={(e) => setCommentForm({ ...commentForm, message: e.target.value })}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit Comment
                    </button>
                  </form>
                </motion.div>
              </article>
            </div>
            <div className="col-lg-4">
              <aside>
                {/* Sidebar content can be added here */}
              </aside>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default BlogDetails;

