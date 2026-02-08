
const bins = [
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

const testFilter = (wasteType) => {
    const filteredBins = bins.filter(bin =>
        bin.acceptedItems.includes(wasteType) &&
        bin.fillLevel < 90
    );
    console.log(`Filtering for ${wasteType}: Found ${filteredBins.length} bins`);
    filteredBins.forEach(b => console.log(` - ${b.name} (${b.fillLevel}%)`));
};

testFilter('phone');
testFilter('laptop');
