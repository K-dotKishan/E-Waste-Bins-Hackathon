# 🚀 Quick Start Guide - Smart E-Waste Bin System

## Prerequisites
- Node.js v14+ installed ([Download here](https://nodejs.org/))
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, or Edge)

## Installation (5 minutes)

### Step 1: Extract the Project
Unzip the `smart-ewaste-system` folder to your desired location.

### Step 2: Install Backend Dependencies
```bash
cd smart-ewaste-system/backend
npm install
```

### Step 3: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

## Running the Application

### Option A: Run Both Servers (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Backend will run at: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend will run at: http://localhost:3000

### Option B: Development Mode with Auto-Reload

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm start
```

## First Time Usage

1. Open http://localhost:3000 in your browser
2. You'll see the homepage with a beautiful hero section
3. Click "Find a Bin" to explore the bin finder
4. Click "Try AI Detection" to test the detection system
5. Visit "Profile" to see user stats and rewards
6. Check "Admin" to view the dashboard

## Demo Credentials

**Demo User:**
- ID: 1
- Name: Demo User
- Email: demo@ewaste.com
- Points: 2450

## Testing the Features

### 1. Find a Bin
- Click "Find Bin" in navigation
- Select any waste type (e.g., Mobile Phone)
- View filtered bins with distances
- Click "Get Directions" to open Google Maps

### 2. AI Detection
- Click "Detect" in navigation
- Upload any image (optional)
- Enter sample measurements:
  - Weight: 200g
  - Width: 15cm
  - Height: 8cm
  - Depth: 1cm
- Click "Detect Item"
- Watch the scanning animation
- View detection results with confidence score

### 3. User Profile
- Click "Profile" in navigation
- View points, recycled items, CO₂ saved
- See achievement badges
- Browse available rewards
- Check transaction history

### 4. Admin Dashboard
- Click "Admin" in navigation
- View KPIs (bins, transactions, CO₂, value)
- Check bin fill levels chart
- Monitor bin status distribution
- Review top performing bins

## Troubleshooting

### Port Already in Use
If port 5000 or 3000 is already in use:

**Backend:**
Edit `backend/.env` and change PORT to another number (e.g., 5001)

**Frontend:**
Set environment variable:
```bash
PORT=3001 npm start
```

### Cannot Connect to Backend
Make sure:
1. Backend server is running (check Terminal 1)
2. URL in browser is http://localhost:3000 (not 5000)
3. Both servers are running simultaneously

### Blank Page
1. Check browser console (F12) for errors
2. Ensure all npm packages installed correctly
3. Try clearing browser cache (Ctrl+Shift+R)

### Styling Issues
1. Make sure you're viewing in a modern browser
2. Disable browser extensions that might interfere
3. Check if CSS files loaded (Network tab in DevTools)

## Directory Structure

```
smart-ewaste-system/
├── backend/
│   ├── server.js          # Main backend server
│   ├── package.json       # Backend dependencies
│   ├── .env              # Environment variables
│   └── uploads/          # Upload directory
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── App.js        # Main app
│   │   └── App.css       # Global styles
│   ├── public/           # Static files
│   └── package.json      # Frontend dependencies
├── README.md             # Main documentation
└── DESIGN_DOCUMENTATION.md
```

## What to Expect

### Homepage
- Animated hero section with floating cards
- Stats showing system metrics
- Features showcase
- Call-to-action

### Find Bin Page
- Grid of waste type options with icons
- Filtered bin list based on selection
- Distance calculation
- Navigation integration

### Detection Page
- Image upload interface
- Measurement input form
- Animated scanning state
- Detailed results with confidence

### Profile Page
- User statistics dashboard
- Achievement badges (locked/unlocked)
- Reward catalog
- Transaction history

### Admin Dashboard
- KPI cards with metrics
- Interactive charts
- Bin monitoring table
- Alert system

## Browser Support

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+

## Mobile Testing

The app is fully responsive! Test on mobile by:
1. Using browser DevTools (F12 → Toggle Device Toolbar)
2. Accessing from phone on same network
3. Using responsive design mode

## Performance Tips

- First load might be slower (loading fonts, dependencies)
- Subsequent loads are much faster (caching)
- Animations are GPU accelerated
- Charts render smoothly even with lots of data

## Getting Help

### Check Documentation
- README.md - Overview and features
- DESIGN_DOCUMENTATION.md - Design decisions
- backend/README.md - API documentation
- frontend/README.md - Component details

### Common Issues
1. **npm install fails**: Delete node_modules and package-lock.json, try again
2. **Ports in use**: Change ports in .env or environment
3. **Can't see data**: Backend must be running
4. **Styling broken**: Clear cache and reload

## Next Steps

After exploring the demo:
1. Read the DESIGN_DOCUMENTATION.md
2. Review the code structure
3. Customize colors in App.css
4. Add your own waste types
5. Extend the admin dashboard
6. Deploy to production

## Production Deployment

### Backend
- Use environment variables for sensitive data
- Set up proper database (MongoDB/PostgreSQL)
- Configure CORS for production domain
- Set NODE_ENV=production
- Use PM2 or similar for process management

### Frontend
- Run `npm run build` to create production build
- Deploy build folder to hosting service
- Update API URL in environment variables
- Enable HTTPS
- Configure CDN for static assets

### Hosting Options
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Heroku, Railway, DigitalOcean
- **Full Stack**: AWS, Google Cloud, Azure

## Support

For issues or questions:
1. Check the documentation first
2. Review the code comments
3. Inspect browser console for errors
4. Check network requests in DevTools

## Credits

Built with ❤️ for HAXPLORE Hackathon

**Technologies:**
- React 18
- Node.js + Express
- Recharts
- Lucide Icons

**Design:**
- Custom color palette
- Bricolage Grotesque + DM Sans fonts
- Modern glassmorphism effects

---

**Happy Recycling! 🌱**

Make sure to run both backend and frontend servers for full functionality!
