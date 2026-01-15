export const blogPosts = [
  {
    id: 1,
    slug: 'advances-in-cardiology',
    title: 'Recent Advances in Non-Invasive Cardiology',
    category: 'Cardiology',
    excerpt: 'Exploring the latest technologies in detecting heart disease earlier than ever before...',
    image: '/assets/blog-1.svg',
    date: 'January 15, 2026',
    author: 'Dr. Ayesha Khan'
  },
  {
    id: 2,
    slug: 'diabetes-management',
    title: 'Modern Approaches to Type 2 Diabetes Management',
    category: 'Endocrinology',
    excerpt: 'New guidelines and lifestyle interventions that are changing the way we treat diabetes...',
    image: '/assets/blog-1.svg',
    date: 'January 18, 2026',
    author: 'Dr. Sarah Smith'
  },
  {
    id: 3,
    slug: 'telemedicine-future',
    title: 'The Future of Telemedicine in Post-Pandemic Healthcare',
    category: 'Digital Health',
    excerpt: 'How remote consultations are becoming a permanent fixture in modern medical practice...',
    image: '/assets/blog-1.svg',
    date: 'January 20, 2026',
    author: 'Dr. Ali Raza'
  },
  {
    id: 4,
    slug: 'pediatric-nutrition',
    title: 'Essential Guidelines for Pediatric Nutrition',
    category: 'Pediatrics',
    excerpt: 'A comprehensive guide for parents on ensuring optimal growth and development...',
    image: '/assets/blog-1.svg',
    date: 'January 22, 2026',
    author: 'Dr. Emily Chen'
  }
];

export const blogDetails = {
  'advances-in-cardiology': {
    title: 'Recent Advances in Non-Invasive Cardiology',
    meta: 'By Dr. Ayesha Khan • January 15, 2026',
    intro: 'Cardiology is witnessing a revolution with non-invasive techniques becoming more precise and accessible. From AI-driven imaging to wearable monitors, identifying heart risks has never been easier.',
    hero: '/assets/blog-1.svg',
    quote: 'Prevention is better than cure, and early detection is the key to prevention.',
    quoteAuthor: 'Dr. Ayesha Khan',
    subimage: '/assets/blog-1.svg',
    bullets: [
      'AI-powered ECG analysis',
      'Wearable heart rate monitors',
      'Non-invasive CT angiography'
    ],
    comments: []
  },
  'diabetes-management': {
    title: 'Modern Approaches to Type 2 Diabetes Management',
    meta: 'By Dr. Sarah Smith • January 18, 2026',
    intro: 'Managing Type 2 diabetes is no longer just about medication. It involves a holistic approach including diet, exercise, and continuous glucose monitoring systems that provide real-time data.',
    hero: '/assets/blog-1.svg',
    quote: 'Lifestyle changes are the most powerful medicine for Type 2 diabetes.',
    quoteAuthor: 'Dr. Sarah Smith',
    subimage: '/assets/blog-1.svg',
    bullets: [
      'Continuous Glucose Monitoring (CGM)',
      'Low-carb and Keto diets',
      'GLP-1 receptor agonists'
    ],
    comments: []
  },
  'telemedicine-future': {
    title: 'The Future of Telemedicine in Post-Pandemic Healthcare',
    meta: 'By Dr. Ali Raza • January 20, 2026',
    intro: 'Telemedicine has transformed from a necessity during the pandemic to a preferred mode of consultation for many. It offers convenience without compromising on the quality of care for non-emergency conditions.',
    hero: '/assets/blog-1.svg',
    quote: 'Healthcare should be accessible to everyone, everywhere.',
    quoteAuthor: 'Dr. Ali Raza',
    subimage: '/assets/blog-1.svg',
    bullets: [
      'Remote patient monitoring',
      'Virtual mental health sessions',
      'AI chatbots for triage'
    ],
    comments: []
  },
  'pediatric-nutrition': {
    title: 'Essential Guidelines for Pediatric Nutrition',
    meta: 'By Dr. Emily Chen • January 22, 2026',
    intro: 'Proper nutrition in the early years creates a foundation for lifelong health. This guide covers essential macronutrients and micronutrients that every growing child needs.',
    hero: '/assets/blog-1.svg',
    quote: 'Healthy children build a healthy future.',
    quoteAuthor: 'Dr. Emily Chen',
    subimage: '/assets/blog-1.svg',
    bullets: [
      'Importance of Vitamin D and Calcium',
      'Balanced meals for picky eaters',
      'Limiting sugar intake'
    ],
    comments: []
  }
};
