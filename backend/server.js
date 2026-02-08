const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Mock data
let bins = [
  {
    id: '1',
    name: 'Downtown E-Waste Hub',
    lat: 28.6139,
    lng: 77.2090,
    acceptedItems: ['phone', 'laptop', 'tablet', 'battery', 'charger', 'cable'],
    fillLevel: 45,
    status: 'operational',
    address: 'Connaught Place, New Delhi',
    capacity: 500,
    lastCollection: '2024-02-05T10:30:00Z'
  },
  {
    id: '2',
    name: 'North Campus Recycling Point',
    lat: 28.6885,
    lng: 77.2104,
    acceptedItems: ['phone', 'battery', 'charger', 'cable', 'earphones'],
    fillLevel: 78,
    status: 'operational',
    address: 'Delhi University, North Campus',
    capacity: 300,
    lastCollection: '2024-02-04T14:20:00Z'
  },
  {
    id: '3',
    name: 'South Delhi Tech Recycler',
    lat: 28.5355,
    lng: 77.2490,
    acceptedItems: ['laptop', 'tablet', 'phone', 'printer', 'monitor'],
    fillLevel: 32,
    status: 'operational',
    address: 'Hauz Khas Village',
    capacity: 600,
    lastCollection: '2024-02-06T09:15:00Z'
  },
  {
    id: '4',
    name: 'East Delhi Green Point',
    lat: 28.6692,
    lng: 77.4538,
    acceptedItems: ['phone', 'battery', 'cable', 'charger'],
    fillLevel: 95,
    status: 'almost_full',
    address: 'Mayur Vihar Phase 1',
    capacity: 250,
    lastCollection: '2024-02-03T11:00:00Z'
  },
  {
    id: '5',
    name: 'West Delhi Electronics Hub',
    lat: 28.6517,
    lng: 77.1015,
    acceptedItems: ['laptop', 'phone', 'tablet', 'battery', 'charger', 'cable', 'monitor'],
    fillLevel: 18,
    status: 'operational',
    address: 'Rajouri Garden',
    capacity: 700,
    lastCollection: '2024-02-06T16:45:00Z'
  }
];

let users = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@ewaste.com',
    points: 2450,
    recycledItems: 18,
    co2Saved: 34.5,
    achievements: ['first_recycler', 'eco_warrior', 'ten_items'],
    joinDate: '2024-01-15T08:00:00Z'
  }
];

let transactions = [];

let wasteTypes = [
  {
    id: 'phone',
    name: 'Mobile Phone',
    icon: '📱',
    baseValue: 150,
    co2Impact: 2.5
  },
  {
    id: 'laptop',
    name: 'Laptop',
    icon: '💻',
    baseValue: 500,
    co2Impact: 8.0
  },
  {
    id: 'tablet',
    name: 'Tablet',
    icon: '📱',
    baseValue: 250,
    co2Impact: 3.5
  },
  {
    id: 'battery',
    name: 'Battery',
    icon: '🔋',
    baseValue: 30,
    co2Impact: 0.8
  },
  {
    id: 'charger',
    name: 'Charger',
    icon: '🔌',
    baseValue: 20,
    co2Impact: 0.5
  },
  {
    id: 'cable',
    name: 'Cable',
    icon: '🔌',
    baseValue: 10,
    co2Impact: 0.3
  },
  {
    id: 'earphones',
    name: 'Earphones',
    icon: '🎧',
    baseValue: 40,
    co2Impact: 0.6
  },
  {
    id: 'printer',
    name: 'Printer',
    icon: '🖨️',
    baseValue: 300,
    co2Impact: 5.0
  },
  {
    id: 'monitor',
    name: 'Monitor',
    icon: '🖥️',
    baseValue: 400,
    co2Impact: 6.5
  }
];

// Routes

// Get all bins
app.get('/api/bins', (req, res) => {
  res.json(bins);
});

// Get bins by waste type
app.get('/api/bins/by-type/:wasteType', (req, res) => {
  const { wasteType } = req.params;
  const filteredBins = bins.filter(bin =>
    bin.acceptedItems.includes(wasteType) &&
    bin.fillLevel < 90
  );
  res.json(filteredBins);
});

// Get single bin
app.get('/api/bins/:id', (req, res) => {
  const bin = bins.find(b => b.id === req.params.id);
  if (!bin) return res.status(404).json({ error: 'Bin not found' });
  res.json(bin);
});

// Update bin status (admin)
app.put('/api/bins/:id', (req, res) => {
  const index = bins.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Bin not found' });

  bins[index] = { ...bins[index], ...req.body };
  res.json(bins[index]);
});

// Get waste types
app.get('/api/waste-types', (req, res) => {
  res.json(wasteTypes);
});

// AI Detection endpoint
app.post('/api/detect', upload.single('image'), (req, res) => {
  const { weight, width, height, depth, aiDetectedType, aiConfidence, aiExplanation } = req.body;

  // Start with AI detection if available
  let detectedType = null;

  if (aiDetectedType && aiDetectedType !== 'unknown') {
    detectedType = {
      type: aiDetectedType,
      confidence: parseFloat(aiConfidence),
      condition: 'good', // Default, could be refined
      explanation: aiExplanation
    };
  } else {
    // Fallback to simulation logic
    detectedType = simulateDetection(weight, width, height, depth);
  }

  const wasteType = wasteTypes.find(w => w.id === detectedType.type) || wasteTypes.find(w => w.id === 'cable'); // Fallback to cable if type not found

  // Adjust condition based on weight vs expected weight for that type could be a nice enhancement, 
  // but for now let's stick to simple logic.

  const response = {
    type: detectedType.type,
    name: wasteType ? wasteType.name : 'Unknown Item',
    icon: wasteType ? wasteType.icon : '❓',
    confidence: detectedType.confidence,
    value: wasteType ? calculateValue(wasteType.baseValue, detectedType.condition) : 0,
    condition: detectedType.condition,
    co2Impact: wasteType ? wasteType.co2Impact : 0,
    explanation: detectedType.explanation
  };

  res.json(response);
});

// Submit recycling transaction
app.post('/api/transactions', (req, res) => {
  const { userId, binId, detectedItem, value, co2Saved } = req.body;

  const transaction = {
    id: uuidv4(),
    userId,
    binId,
    detectedItem,
    value,
    co2Saved,
    timestamp: new Date().toISOString()
  };

  transactions.push(transaction);

  // Update user stats
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex].points += value;
    users[userIndex].recycledItems += 1;
    users[userIndex].co2Saved += co2Saved;
  }

  // Update bin fill level
  const binIndex = bins.findIndex(b => b.id === binId);
  if (binIndex !== -1) {
    bins[binIndex].fillLevel += 2;
  }

  res.json({ transaction, user: users[userIndex] });
});

// Get user data
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Get user transactions
app.get('/api/users/:id/transactions', (req, res) => {
  const userTransactions = transactions.filter(t => t.userId === req.params.id);
  res.json(userTransactions);
});

// Get all transactions (admin)
app.get('/api/transactions', (req, res) => {
  res.json(transactions);
});

// Get analytics (admin)
app.get('/api/analytics', (req, res) => {
  const analytics = {
    totalBins: bins.length,
    operationalBins: bins.filter(b => b.status === 'operational').length,
    totalTransactions: transactions.length,
    totalValue: transactions.reduce((sum, t) => sum + t.value, 0),
    totalCO2Saved: transactions.reduce((sum, t) => sum + t.co2Saved, 0),
    binsNeedingCollection: bins.filter(b => b.fillLevel > 80).length,
    averageFillLevel: bins.reduce((sum, b) => sum + b.fillLevel, 0) / bins.length,
    topBins: bins
      .map(bin => ({
        ...bin,
        transactionCount: transactions.filter(t => t.binId === bin.id).length
      }))
      .sort((a, b) => b.transactionCount - a.transactionCount)
      .slice(0, 5)
  };

  res.json(analytics);
});

// Helper functions
function simulateDetection(weight, width, height, depth) {
  const volume = width * height * depth;

  // Simple rule-based detection simulation
  if (weight > 1000 && volume > 100000) {
    return {
      type: 'laptop',
      confidence: 0.92,
      condition: 'good',
      explanation: 'Detected as Laptop based on weight (>1kg) and dimensions'
    };
  } else if (weight > 150 && weight < 300 && volume < 50000) {
    return {
      type: 'phone',
      confidence: 0.88,
      condition: 'fair',
      explanation: 'Detected as Mobile Phone based on weight and compact size'
    };
  } else if (weight < 50 && volume < 5000) {
    return {
      type: 'charger',
      confidence: 0.85,
      condition: 'good',
      explanation: 'Detected as Charger based on lightweight and small dimensions'
    };
  } else if (weight < 100 && volume > 50000) {
    return {
      type: 'tablet',
      confidence: 0.79,
      condition: 'fair',
      explanation: 'Detected as Tablet based on moderate weight and flat shape'
    };
  } else if (weight < 20) {
    return {
      type: 'cable',
      confidence: 0.75,
      condition: 'good',
      explanation: 'Detected as Cable based on very light weight'
    };
  } else {
    return {
      type: 'battery',
      confidence: 0.68,
      condition: 'fair',
      explanation: 'Detected as Battery (low confidence - please verify)'
    };
  }
}

function calculateValue(baseValue, condition) {
  const conditionMultiplier = {
    'excellent': 1.2,
    'good': 1.0,
    'fair': 0.7,
    'poor': 0.4
  };

  return Math.round(baseValue * (conditionMultiplier[condition] || 1.0));
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
