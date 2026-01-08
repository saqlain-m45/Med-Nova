# Backend Integration Guide

This document explains how to connect the React frontend to a backend API.

## Overview

The React application is currently using **static data** stored in `src/data/` files. To make it fully functional, you need to:

1. Set up a backend API (Node.js/Express, Python/Django, PHP, etc.)
2. Replace static data with API calls
3. Update form submissions to send data to the backend

## Required Backend Endpoints

### 1. Appointment Booking API

**Endpoint**: `POST /api/appointments`

**Request Body**:
```json
{
  "name": "John Doe",
  "phone": "+1234567890",
  "email": "john@example.com",
  "healthType": "General",
  "doctor": "Kathryn Murphy",
  "date": "2024-12-25"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Appointment request submitted successfully",
  "appointmentId": "APT-12345"
}
```

**Backend Implementation Example (Node.js/Express)**:
```javascript
app.post('/api/appointments', async (req, res) => {
  try {
    const { name, phone, email, healthType, doctor, date } = req.body;
    
    // Validate input
    if (!name || !phone || !email || !date) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }
    
    // Save to database
    const appointment = await Appointment.create({
      name,
      phone,
      email,
      healthType,
      doctor,
      date: new Date(date)
    });
    
    // Send confirmation email (optional)
    // await sendEmail(email, 'Appointment Confirmation', ...);
    
    res.json({
      success: true,
      message: 'Appointment request submitted successfully',
      appointmentId: appointment.id
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});
```

**Frontend Update** (`src/pages/Appointment.js`):
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    const response = await fetch(`${API_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    
    if (response.ok && data.success) {
      alert(data.message || 'Appointment request submitted! We will contact you soon.');
      setFormData({ name: '', phone: '', email: '', healthType: '', doctor: '', date: '' });
    } else {
      throw new Error(data.message || 'Failed to submit appointment');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error submitting appointment. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
```

---

### 2. Contact Form API

**Endpoint**: `POST /api/contact`

**Request Body**:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "General Inquiry",
  "message": "Hello, I have a question about your services."
}
```

**Response**:
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

**Backend Implementation Example**:
```javascript
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validate
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }
    
    // Save to database
    await ContactMessage.create({ name, email, subject, message });
    
    // Send email notification to admin
    // await sendEmail('admin@medilix.com', subject, message);
    
    res.json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});
```

**Frontend Update** (`src/pages/Contact.js`):
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    
    if (response.ok && data.success) {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setSubmitStatus('error');
    }
  } catch (error) {
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};
```

---

### 3. Newsletter Subscription API

**Endpoint**: `POST /api/newsletter`

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Subscribed successfully"
}
```

**Backend Implementation**:
```javascript
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Validate email
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email address' 
      });
    }
    
    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.json({
        success: true,
        message: 'You are already subscribed'
      });
    }
    
    // Add to newsletter list
    await Newsletter.create({ email, subscribedAt: new Date() });
    
    res.json({
      success: true,
      message: 'Subscribed successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});
```

---

### 4. Fetch Services API

**Endpoint**: `GET /api/services`

**Response**:
```json
[
  {
    "id": 1,
    "name": "Health Solutions",
    "slug": "health-solutions",
    "icon": "/assets/service-icon-1.svg",
    "description": "Comprehensive evaluation and personalised care plans.",
    "highlighted": false
  },
  {
    "id": 2,
    "name": "VitalVista Services",
    "slug": "vitalvista-services",
    "icon": "/assets/service-icon-2.svg",
    "description": "Clinically-proven wellness solutions.",
    "highlighted": true
  }
]
```

**Frontend Update** (`src/pages/Services.js`):
```javascript
import { useState, useEffect } from 'react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        const response = await fetch(`${API_URL}/services`);
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    // ... rest of component
  );
};
```

---

### 5. Fetch Doctors API

**Endpoint**: `GET /api/doctors`

**Response**: Similar structure to services, returns array of doctor objects.

**Frontend Update**: Similar pattern as services - use `useEffect` and `useState` to fetch and store data.

---

### 6. Fetch Blog Posts API

**Endpoint**: `GET /api/blog`

**Response**: Array of blog post objects.

---

## CORS Configuration

If your backend is on a different domain/port, configure CORS:

**Node.js/Express Example**:
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', // React app URL
  credentials: true
}));
```

## Environment Variables

Create `.env` file in React project root:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Database Schema Suggestions

### Appointments Table
```sql
CREATE TABLE appointments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  health_type VARCHAR(100),
  doctor VARCHAR(255),
  appointment_date DATE NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Contact Messages Table
```sql
CREATE TABLE contact_messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Newsletter Subscribers Table
```sql
CREATE TABLE newsletter_subscribers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Security Considerations

1. **Input Validation**: Always validate and sanitize user input on the backend
2. **Rate Limiting**: Implement rate limiting to prevent spam
3. **Email Verification**: Consider email verification for newsletter subscriptions
4. **HTTPS**: Use HTTPS in production
5. **Authentication**: Add authentication for admin endpoints

## Testing

Test your API endpoints using tools like:
- Postman
- curl
- Thunder Client (VS Code extension)

Example curl command:
```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "+1234567890",
    "email": "john@example.com",
    "date": "2024-12-25"
  }'
```

## Next Steps

1. Choose your backend technology (Node.js, Python, PHP, etc.)
2. Set up database (MySQL, PostgreSQL, MongoDB, etc.)
3. Implement the API endpoints listed above
4. Update React components to use API calls instead of static data
5. Test thoroughly
6. Deploy both frontend and backend

---

For questions or issues, refer to the main README.md or contact the development team.

