# Smart E-Waste Bin System

A comprehensive Smart E-Waste Bin System that makes recycling easy, transparent, and rewarding. Built for HAXPLORE hackathon with focus on exceptional UI/UX.

## 🌟 Features

### 1. Location-Based Bin Finder
- Select e-waste type and find nearest compatible bins
- Real-time distance calculation
- Interactive list view with bin details
- Direct navigation integration
- Filter by bin capacity and status

### 2. AI-Powered Waste Detection
- Multi-modal detection using image, weight, and dimensions
- Confidence scoring with transparent explanations
- Value estimation based on item type and condition
- Low-confidence handling with manual verification option
- Celebratory UI for successful detection

### 3. User Rewards & Gamification
- Points system for recycled items
- Redeemable rewards (vouchers, eco-products)
- Environmental impact metrics (CO₂ saved)
- Achievement badges and milestones
- User profile with recycling statistics

### 4. Admin Dashboard
- Real-time bin monitoring (fill levels, status)
- Analytics dashboard (waste collected, user engagement)
- Alert system for bins needing collection
- Geographic overview with interactive charts
- Top performing bins tracking

## 🎨 Design Features

- **Modern, Bold Aesthetic**: Custom color palette with gradients and animations
- **Distinctive Typography**: Bricolage Grotesque + DM Sans font pairing
- **Smooth Animations**: Fade, slide, and scale effects throughout
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Dark Theme**: Eye-friendly dark mode with vibrant accent colors
- **Glassmorphism**: Backdrop blur effects on cards and navigation

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router DOM (navigation)
- Recharts (data visualization)
- Lucide React (icons)
- CSS3 with custom animations

### Backend
- Node.js
- Express.js
- Multer (file uploads)
- CORS enabled

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
npm start
```

The backend server will run on http://localhost:5000

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will run on http://localhost:3000

## 🚀 Usage

1. **Home Page**: View overview and features
2. **Find Bin**: Select waste type to find nearest bins
3. **Detect**: Upload image and enter measurements for AI detection
4. **Profile**: View your points, achievements, and recycling history
5. **Admin**: Monitor all bins and view analytics (admin only)

## 📱 Key User Flows

### Recycling Flow
1. User selects waste type on Find Bin page
2. System shows nearest compatible bins with distance
3. User navigates to selected bin
4. At bin, user uploads image and enters measurements
5. AI detects item and shows value + confidence
6. User confirms and earns points
7. Transaction recorded in profile

### Admin Flow
1. Admin views dashboard with KPIs
2. Monitors bin fill levels and status
3. Receives alerts for bins >80% full
4. Views analytics and top performing bins
5. Plans collection routes based on data

## 🎯 Hackathon Criteria

### UI/UX Quality (40%)
✅ Distinctive visual design with bold colors and typography
✅ Smooth animations and micro-interactions
✅ Intuitive navigation with ≤3 clicks to key actions
✅ Responsive design across all devices
✅ Clear visual hierarchy and feedback

### Functionality (25%)
✅ Complete bin finder with filtering
✅ AI detection with confidence scoring
✅ User authentication and profiles
✅ Admin dashboard with analytics
✅ Transaction recording and history

### AI/Detection Logic (15%)
✅ Rule-based detection using weight and dimensions
✅ Confidence score calculation
✅ Transparent explanations
✅ Low-confidence handling

### Innovation (10%)
✅ Gamification with achievements
✅ Real-time environmental impact tracking
✅ Beautiful data visualizations
✅ Trust-building UI elements

### Presentation (10%)
✅ Clean, professional design
✅ Clear user flows
✅ Comprehensive documentation

## 🌍 Environmental Impact

The system tracks:
- **CO₂ Saved**: Calculated based on item type
- **Items Recycled**: Total count across all users
- **Resource Conservation**: Estimated materials recovered

## 🔒 Privacy & Security

- User data stored securely
- No sensitive information in frontend
- CORS enabled for API security
- Transaction history private to user

## 🎨 Design Decisions

1. **Dark Theme**: Reduces eye strain and highlights vibrant accent colors
2. **Gradient Accents**: Creates depth and visual interest
3. **Animation Timing**: 0.3-0.6s for smooth, non-jarring transitions
4. **Card-Based Layout**: Organizes information in digestible chunks
5. **Micro-interactions**: Hover states and button animations for feedback

## 📊 Future Enhancements

- [ ] Push notifications for nearby bins
- [ ] Social sharing of achievements
- [ ] Community challenges
- [ ] Pickup scheduling for large items
- [ ] Integration with recycling facilities
- [ ] Mobile app (iOS/Android)
- [ ] Voice assistance for accessibility
- [ ] Offline mode support

## 👥 Team

Built with ❤️ for HAXPLORE Hackathon

## 📄 License

MIT License - feel free to use and modify

## 🙏 Acknowledgments

- Icons by Lucide
- Fonts: Google Fonts (Bricolage Grotesque, DM Sans)
- Inspiration: Modern web design trends and environmental awareness

---

**Remember**: Every small action counts. Let's make recycling easier and more rewarding! 🌱
