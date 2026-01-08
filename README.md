# Medilix - React Healthcare Website

A modern, responsive healthcare website built with React.js, featuring appointment booking, doctor profiles, services, and blog functionality.

## 🚀 Features

- **Modern React Architecture**: Built with functional components and React Hooks
- **React Router**: Client-side routing for seamless navigation
- **Responsive Design**: Bootstrap 5 for mobile-first responsive layout
- **Reusable Components**: Modular component structure for easy maintenance
- **Form Handling**: Contact forms and appointment booking with validation
- **Scroll Animations**: Smooth scroll reveal animations using Intersection Observer
- **SEO Friendly**: Proper routing and meta tags

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```
   The app will open at [http://localhost:3000](http://localhost:3000)

3. **Build for Production**
   ```bash
   npm run build
   ```
   This creates an optimized production build in the `build` folder.

## 📁 Project Structure

```
FYP2/
├── public/
│   ├── index.html          # HTML template
│   └── assets/             # Static assets (images, logos, etc.)
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Navbar.js      # Navigation component
│   │   └── Footer.js       # Footer component
│   ├── pages/              # Page components
│   │   ├── Home.js
│   │   ├── About.js
│   │   ├── Services.js
│   │   ├── ServiceDetails.js
│   │   ├── Doctors.js
│   │   ├── DoctorDetails.js
│   │   ├── Blog.js
│   │   ├── BlogDetails.js
│   │   ├── Contact.js
│   │   ├── Appointment.js
│   │   └── NotFound.js
│   ├── hooks/              # Custom React hooks
│   │   ├── useScrollReveal.js
│   │   └── useHeroAnimation.js
│   ├── data/               # Static data files
│   │   ├── services.js
│   │   ├── doctors.js
│   │   └── blog.js
│   ├── App.js              # Main app component with routing
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── style.css               # Main stylesheet (imported in index.css)
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## 🔌 Backend Integration

### Current State

The application currently uses **mock data** stored in the `src/data/` directory. Forms submit to console.log for demonstration purposes.

### Backend API Endpoints Needed

To connect to a backend, you'll need to implement the following API endpoints:

#### 1. **Appointment Booking** (`POST /api/appointments`)
```javascript
// Request body:
{
  "name": "John Doe",
  "phone": "+1234567890",
  "email": "john@example.com",
  "healthType": "General",
  "doctor": "Kathryn Murphy",
  "date": "2024-12-25"
}

// Response:
{
  "success": true,
  "message": "Appointment request submitted",
  "appointmentId": "12345"
}
```

**Implementation Location**: `src/pages/Appointment.js` - Update the `handleSubmit` function

#### 2. **Contact Form** (`POST /api/contact`)
```javascript
// Request body:
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Inquiry",
  "message": "Hello, I have a question..."
}

// Response:
{
  "success": true,
  "message": "Message sent successfully"
}
```

**Implementation Location**: `src/pages/Contact.js` - Update the `handleSubmit` function

#### 3. **Newsletter Subscription** (`POST /api/newsletter`)
```javascript
// Request body:
{
  "email": "user@example.com"
}

// Response:
{
  "success": true,
  "message": "Subscribed successfully"
}
```

**Implementation Location**: `src/components/Footer.js` - Update the `handleNewsletterSubmit` function

#### 4. **Fetch Services** (`GET /api/services`)
```javascript
// Response:
[
  {
    "id": 1,
    "name": "Health Solutions",
    "slug": "health-solutions",
    "icon": "/assets/service-icon-1.svg",
    "description": "...",
    "highlighted": false
  },
  // ... more services
]
```

**Implementation Location**: `src/data/services.js` - Replace static data with API call using `useEffect` and `useState`

#### 5. **Fetch Doctors** (`GET /api/doctors`)
```javascript
// Response:
[
  {
    "id": 1,
    "name": "Kathryn Murphy",
    "slug": "kathryn-murphy",
    "role": "President of Sales",
    "image": "/assets/doc-1.svg",
    "email": "kathryn@medilix.com",
    "phone": "+1-212-4582-754",
    "web": "www.kathryn.com",
    "intro": "Empower To Flourish Health Future"
  },
  // ... more doctors
]
```

**Implementation Location**: `src/data/doctors.js` - Replace static data with API call

#### 6. **Fetch Blog Posts** (`GET /api/blog`)
```javascript
// Response:
[
  {
    "id": 1,
    "slug": "health-harmony",
    "title": "Optimal Oasis Nurturing Health",
    "excerpt": "...",
    "image": "/assets/blog-1.svg",
    "date": "October 19, 2022",
    "author": "admin"
  },
  // ... more posts
]
```

**Implementation Location**: `src/data/blog.js` - Replace static data with API call

### Example API Integration

Here's an example of how to integrate the Appointment API:

```javascript
// In src/pages/Appointment.js
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      const data = await response.json();
      alert('Appointment request submitted! We will contact you soon.');
      setFormData({ name: '', phone: '', email: '', healthType: '', doctor: '', date: '' });
    } else {
      throw new Error('Failed to submit appointment');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error submitting appointment. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
```

### Environment Variables

Create a `.env` file in the root directory for API configuration:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Then use it in your API calls:

```javascript
const API_URL = process.env.REACT_APP_API_URL;
const response = await fetch(`${API_URL}/appointments`, { ... });
```

## 🎨 Styling

The application uses:
- **Bootstrap 5**: For responsive grid and components
- **Custom CSS**: Located in `style.css` (imported via `src/index.css`)
- **Google Fonts**: Poppins font family

## 📱 Pages

- `/` - Home page with hero, services, and featured content
- `/about` - About us page
- `/services` - Services listing page
- `/services/:serviceName` - Service details page
- `/doctors` - Doctors listing page
- `/doctors/:doctorName` - Doctor details page
- `/blog` - Blog listing page
- `/blog/:postSlug` - Blog post details page
- `/contact` - Contact page with form
- `/appointment` - Appointment booking page
- `*` - 404 Not Found page

## 🔧 Custom Hooks

### `useScrollReveal`
Animates elements when they enter the viewport using Intersection Observer.

```javascript
import { useScrollReveal } from '../hooks/useScrollReveal';

const MyComponent = () => {
  const elementRef = useScrollReveal();
  return <div ref={elementRef}>Content</div>;
};
```

### `useHeroAnimation`
Animates hero text with staggered entrance effect.

```javascript
import { useHeroAnimation } from '../hooks/useHeroAnimation';

const Hero = () => {
  const heroRef = useHeroAnimation();
  return <header ref={heroRef}>...</header>;
};
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy!

### Deploy to Traditional Server
1. Run `npm run build`
2. Upload the `build` folder contents to your server
3. Configure your server to serve `index.html` for all routes (for React Router)

## 📝 Notes

- **Assets**: Make sure all images in `/public/assets/` are accessible
- **Bootstrap JS**: Bootstrap JavaScript is loaded via CDN in `public/index.html`. For better performance, consider installing `react-bootstrap` or `bootstrap` npm package.
- **Forms**: All forms currently log to console. Update with actual API endpoints as described in Backend Integration section.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is for educational purposes.

## 📞 Support

For questions or issues, please contact the development team.

---

**Built with React.js** ⚛️
# Med-Nova
