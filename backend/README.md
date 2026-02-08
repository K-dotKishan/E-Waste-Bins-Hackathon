# Smart E-Waste Backend

Node.js/Express backend for the Smart E-Waste Bin System.

## API Endpoints

### Bins

**GET /api/bins**
- Get all bins
- Returns: Array of bin objects

**GET /api/bins/by-type/:wasteType**
- Get bins that accept specific waste type
- Params: wasteType (phone, laptop, battery, etc.)
- Returns: Filtered array of bins

**GET /api/bins/:id**
- Get single bin details
- Params: id (bin ID)
- Returns: Bin object

**PUT /api/bins/:id**
- Update bin status (admin)
- Params: id (bin ID)
- Body: Bin properties to update
- Returns: Updated bin object

### Waste Types

**GET /api/waste-types**
- Get all supported waste types
- Returns: Array of waste type objects with icons and values

### Detection

**POST /api/detect**
- AI detection of e-waste item
- Body (multipart/form-data):
  - image: Image file (optional)
  - weight: Weight in grams
  - width: Width in cm
  - height: Height in cm
  - depth: Depth in cm
- Returns: Detection result with type, confidence, value, explanation

### Transactions

**POST /api/transactions**
- Submit new recycling transaction
- Body:
  - userId: User ID
  - binId: Bin ID
  - detectedItem: Detection result object
  - value: Points value
  - co2Saved: CO₂ impact
- Returns: Transaction object and updated user

**GET /api/transactions**
- Get all transactions (admin)
- Returns: Array of transaction objects

### Users

**GET /api/users/:id**
- Get user profile
- Params: id (user ID)
- Returns: User object with stats

**GET /api/users/:id/transactions**
- Get user's transaction history
- Params: id (user ID)
- Returns: Array of user's transactions

### Analytics

**GET /api/analytics**
- Get system analytics (admin)
- Returns: Object with KPIs and metrics

## Data Models

### Bin
```javascript
{
  id: string,
  name: string,
  lat: number,
  lng: number,
  acceptedItems: string[],
  fillLevel: number (0-100),
  status: 'operational' | 'almost_full' | 'full',
  address: string,
  capacity: number,
  lastCollection: ISO date string
}
```

### User
```javascript
{
  id: string,
  name: string,
  email: string,
  points: number,
  recycledItems: number,
  co2Saved: number,
  achievements: string[],
  joinDate: ISO date string
}
```

### Transaction
```javascript
{
  id: string,
  userId: string,
  binId: string,
  detectedItem: object,
  value: number,
  co2Saved: number,
  timestamp: ISO date string
}
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create .env file (already included):
```
PORT=5000
NODE_ENV=development
```

3. Start server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Detection Logic

The AI detection uses a rule-based system that analyzes:
- **Weight**: Primary factor for classification
- **Volume**: Calculated from dimensions (W × H × D)
- **Confidence**: Based on how well measurements match expected ranges

### Detection Rules
- Laptop: >1000g, large volume
- Phone: 150-300g, compact size
- Tablet: Moderate weight, flat shape
- Charger: <50g, small volume
- Cable: <20g, minimal volume
- Battery: Varies by size

### Condition Assessment
- Excellent: 1.2× base value
- Good: 1.0× base value
- Fair: 0.7× base value
- Poor: 0.4× base value

## CORS Configuration

CORS is enabled for frontend development. In production, configure allowed origins in server.js.

## Error Handling

All endpoints return appropriate HTTP status codes:
- 200: Success
- 404: Resource not found
- 500: Server error

## Future Improvements

- Database integration (MongoDB/PostgreSQL)
- Authentication & authorization
- Real ML model integration
- WebSocket for real-time updates
- Rate limiting
- Image processing with TensorFlow.js
- API versioning
