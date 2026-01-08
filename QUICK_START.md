# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

### Step 3: Build for Production (Optional)
```bash
npm run build
```

## 📝 What's Included

✅ **Complete React Application** with all pages converted
✅ **React Router** for navigation
✅ **Reusable Components** (Navbar, Footer)
✅ **Custom Hooks** for animations
✅ **Form Handling** with validation
✅ **Responsive Design** with Bootstrap 5
✅ **All Original Functionality** preserved

## 🔧 Current Features

- ✅ Home page with hero section
- ✅ About page
- ✅ Services listing and details
- ✅ Doctors listing and details
- ✅ Blog listing and details
- ✅ Contact form
- ✅ Appointment booking form
- ✅ 404 error page
- ✅ Scroll animations
- ✅ Responsive navigation

## 🔌 Backend Integration

**Currently**: Forms log to console (mock behavior)

**To Connect Backend**: 
1. See `BACKEND_INTEGRATION.md` for detailed API endpoint specifications
2. Update form handlers in:
   - `src/pages/Appointment.js`
   - `src/pages/Contact.js`
   - `src/components/Footer.js` (newsletter)

## 📁 Important Files

- `src/App.js` - Main routing configuration
- `src/pages/` - All page components
- `src/components/` - Reusable components
- `src/data/` - Static data (replace with API calls)
- `src/hooks/` - Custom React hooks
- `style.css` - Main stylesheet
- `public/assets/` - Images and static assets

## 🎨 Styling

- Bootstrap 5 (CDN) - Responsive framework
- Custom CSS in `style.css`
- Google Fonts (Poppins)

## ⚠️ Notes

1. **Assets**: Make sure images are in `public/assets/` folder
2. **Bootstrap JS**: Included via CDN in `public/index.html` for accordion and other interactive components
3. **Environment Variables**: Create `.env` file for API URL (see `.env.example`)

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Use a different port
PORT=3001 npm start
```

**Module not found errors?**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Assets not loading?**
- Check that files are in `public/assets/` folder
- Verify image paths start with `/assets/` (not `assets/`)

## 📚 Next Steps

1. Review `README.md` for full documentation
2. Check `BACKEND_INTEGRATION.md` for API setup
3. Customize content in `src/data/` files
4. Update styling in `style.css`
5. Connect to your backend API

---

**Happy Coding!** 🎉

