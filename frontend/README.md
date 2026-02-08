# Smart E-Waste Frontend

React-based frontend for the Smart E-Waste Bin System.

## Structure

```
src/
├── components/
│   ├── Navigation.js        # Main navigation bar
│   └── Navigation.css
├── pages/
│   ├── HomePage.js          # Landing page
│   ├── HomePage.css
│   ├── FindBinPage.js       # Bin finder
│   ├── FindBinPage.css
│   ├── DetectionPage.js     # AI detection
│   ├── DetectionPage.css
│   ├── ProfilePage.js       # User profile
│   ├── ProfilePage.css
│   ├── AdminDashboard.js    # Admin panel
│   └── AdminDashboard.css
├── App.js                   # Main app component
├── App.css                  # Global styles
├── index.js                 # React entry point
└── index.css               # Base styles
```

## Key Components

### Navigation
- Sticky header with smooth animations
- Mobile-responsive hamburger menu
- Active route highlighting
- Logo with gradient effect

### HomePage
- Hero section with floating cards animation
- Stats grid showing system metrics
- Features showcase with hover effects
- Call-to-action section

### FindBinPage
- Waste type selector with icons
- Real-time bin filtering
- Distance calculation from user location
- Google Maps integration for directions

### DetectionPage
- Image upload with preview
- Measurement input form
- Animated scanning state
- Result display with confidence score
- Value and impact visualization

### ProfilePage
- User stats dashboard
- Achievement badges
- Rewards catalog
- Transaction history

### AdminDashboard
- KPI cards with real-time data
- Interactive charts (bar, pie)
- Bin monitoring table
- Alert system for full bins

## Styling Approach

### CSS Variables
```css
--primary: #00D9A3 (Teal Green)
--secondary: #6366F1 (Indigo)
--accent: #F59E0B (Amber)
--bg-dark: #0A0E27 (Deep Blue)
--text-primary: #FFFFFF
--text-secondary: #94A3B8
```

### Design Principles
1. **Card-Based Layout**: Information in digestible chunks
2. **Gradient Accents**: Depth and visual interest
3. **Smooth Animations**: 0.3-0.6s cubic-bezier easing
4. **Glassmorphism**: Backdrop blur on overlays
5. **Responsive Grid**: Auto-fit minmax for flexibility

### Animation Classes
- `.animate-fade-in`: Fade and slide up
- `.animate-slide-in`: Slide from left
- `.animate-scale-in`: Scale up effect

## State Management

Currently using React hooks (useState, useEffect). For larger scale:
- Consider Redux for global state
- Context API for theme/user data
- React Query for server state

## API Integration

All API calls use fetch with async/await:

```javascript
const response = await fetch('/api/endpoint');
const data = await response.json();
```

Proxy configured in package.json for development.

## Responsive Breakpoints

- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

## Icons

Using Lucide React for consistent, customizable icons:
```javascript
import { Icon } from 'lucide-react';
<Icon size={24} />
```

## Charts

Recharts for data visualization:
- Bar charts for bin fill levels
- Pie charts for status distribution
- Responsive containers for mobile

## Future Enhancements

### Features
- [ ] Dark/Light theme toggle
- [ ] Search functionality
- [ ] Advanced filters
- [ ] Export data (CSV/PDF)
- [ ] Print receipts
- [ ] QR code scanning
- [ ] Camera integration

### Performance
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Image optimization
- [ ] Service worker for PWA
- [ ] Caching strategy

### Accessibility
- [ ] ARIA labels
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] High contrast mode
- [ ] Font size controls

## Available Scripts

### `npm start`
Runs the app in development mode at http://localhost:3000

### `npm test`
Launches the test runner

### `npm run build`
Builds the app for production to the `build` folder

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- **react**: ^18.2.0
- **react-dom**: ^18.2.0
- **react-router-dom**: ^6.20.0
- **lucide-react**: ^0.263.1
- **recharts**: ^2.10.3

## Environment Variables

Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000
```

## Deployment

### Build
```bash
npm run build
```

### Deploy to Vercel
```bash
vercel --prod
```

### Deploy to Netlify
```bash
netlify deploy --prod
```

## Testing

Recommended testing libraries:
- Jest (unit tests)
- React Testing Library (component tests)
- Cypress (E2E tests)

## Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## Design Credits

- Color palette: Custom designed
- Typography: Google Fonts
- Icons: Lucide
- Inspiration: Modern SaaS dashboards
