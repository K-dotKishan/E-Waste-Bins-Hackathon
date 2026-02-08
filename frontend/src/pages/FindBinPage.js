import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, Battery, Phone, Laptop, Cable, Plug, Headphones, Monitor, Printer, Tablet } from 'lucide-react';
import './FindBinPage.css';

const FindBinPage = () => {
  const [selectedWasteType, setSelectedWasteType] = useState('');
  const [bins, setBins] = useState([]);
  const [filteredBins, setFilteredBins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

  const wasteTypes = [
    { id: 'phone', name: 'Mobile Phone', icon: Phone },
    { id: 'laptop', name: 'Laptop', icon: Laptop },
    { id: 'tablet', name: 'Tablet', icon: Tablet },
    { id: 'battery', name: 'Battery', icon: Battery },
    { id: 'charger', name: 'Charger', icon: Plug },
    { id: 'cable', name: 'Cable', icon: Cable },
    { id: 'earphones', name: 'Earphones', icon: Headphones },
    { id: 'printer', name: 'Printer', icon: Printer },
    { id: 'monitor', name: 'Monitor', icon: Monitor },
  ];

  useEffect(() => {
    fetchBins();
    getUserLocation();
  }, []);

  useEffect(() => {
    if (selectedWasteType) {
      filterBinsByType(selectedWasteType);
    } else {
      setFilteredBins(bins);
    }
  }, [selectedWasteType, bins]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to Delhi location
          setUserLocation({ lat: 28.6139, lng: 77.2090 });
        }
      );
    } else {
      setUserLocation({ lat: 28.6139, lng: 77.2090 });
    }
  };

  const fetchBins = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/bins');
      const data = await response.json();
      setBins(data);
      setFilteredBins(data);
    } catch (error) {
      console.error('Error fetching bins:', error);
    }
    setLoading(false);
  };

  const filterBinsByType = async (wasteType) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/bins/by-type/${wasteType}`);
      const data = await response.json();
      setFilteredBins(data);
    } catch (error) {
      console.error('Error filtering bins:', error);
    }
    setLoading(false);
  };

  const calculateDistance = (binLat, binLng) => {
    if (!userLocation) return 0;
    
    const R = 6371; // Earth's radius in km
    const dLat = (binLat - userLocation.lat) * Math.PI / 180;
    const dLon = (binLng - userLocation.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(binLat * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance.toFixed(1);
  };

  const getDirections = (bin) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${bin.lat},${bin.lng}`;
    window.open(url, '_blank');
  };

  const getBinStatusColor = (fillLevel) => {
    if (fillLevel < 50) return 'var(--success)';
    if (fillLevel < 80) return 'var(--warning)';
    return 'var(--error)';
  };

  return (
    <div className="find-bin-page">
      <div className="container">
        <div className="page-header animate-fade-in">
          <h1>Find E-Waste Bins</h1>
          <p>Select your waste type to find the nearest compatible bins</p>
        </div>

        {/* Waste Type Selection */}
        <div className="waste-type-selector animate-slide-in">
          <h3>What do you want to recycle?</h3>
          <div className="waste-types-grid">
            {wasteTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  className={`waste-type-card ${selectedWasteType === type.id ? 'active' : ''}`}
                  onClick={() => setSelectedWasteType(selectedWasteType === type.id ? '' : type.id)}
                >
                  <Icon size={28} />
                  <span>{type.name}</span>
                </button>
              );
            })}
          </div>
          {selectedWasteType && (
            <button 
              className="clear-filter"
              onClick={() => setSelectedWasteType('')}
            >
              Clear filter
            </button>
          )}
        </div>

        {/* View Toggle */}
        <div className="view-controls animate-fade-in">
          <div className="results-count">
            {filteredBins.length} bin{filteredBins.length !== 1 ? 's' : ''} found
          </div>
          <div className="view-toggle">
            <button
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
            >
              List View
            </button>
            <button
              className={viewMode === 'map' ? 'active' : ''}
              onClick={() => setViewMode('map')}
            >
              Map View
            </button>
          </div>
        </div>

        {/* Bins List */}
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="bins-list">
            {filteredBins.length === 0 ? (
              <div className="no-bins card">
                <MapPin size={48} />
                <h3>No bins found</h3>
                <p>Try selecting a different waste type or check back later</p>
              </div>
            ) : (
              filteredBins.map((bin, index) => (
                <div 
                  key={bin.id} 
                  className="bin-card card animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bin-header">
                    <div className="bin-info">
                      <h3>{bin.name}</h3>
                      <p className="bin-address">
                        <MapPin size={16} />
                        {bin.address}
                      </p>
                    </div>
                    <div className="bin-distance">
                      {calculateDistance(bin.lat, bin.lng)} km
                    </div>
                  </div>

                  <div className="bin-status">
                    <div className="status-item">
                      <div 
                        className="fill-indicator"
                        style={{ 
                          background: `linear-gradient(90deg, ${getBinStatusColor(bin.fillLevel)} ${bin.fillLevel}%, rgba(255,255,255,0.1) ${bin.fillLevel}%)`
                        }}
                      >
                        <span className="fill-text">{bin.fillLevel}% Full</span>
                      </div>
                    </div>
                    <div className="status-item">
                      <Clock size={16} />
                      <span>Capacity: {bin.capacity} items</span>
                    </div>
                  </div>

                  <div className="accepted-items">
                    <strong>Accepts:</strong>
                    <div className="items-list">
                      {bin.acceptedItems.map((item) => {
                        const type = wasteTypes.find(t => t.id === item);
                        return type ? (
                          <span key={item} className="item-badge">
                            {type.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>

                  <button 
                    className="btn btn-primary"
                    onClick={() => getDirections(bin)}
                  >
                    <Navigation size={20} />
                    Get Directions
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindBinPage;
