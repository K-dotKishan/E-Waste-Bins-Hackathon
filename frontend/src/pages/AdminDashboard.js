import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MapPin, TrendingUp, AlertCircle, CheckCircle, Package, Leaf, Users, DollarSign } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
    fetchBins();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics');
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
    setLoading(false);
  };

  const fetchBins = async () => {
    try {
      const response = await fetch('/api/bins');
      const data = await response.json();
      setBins(data);
    } catch (error) {
      console.error('Error fetching bins:', error);
    }
  };

  const getBinStatusColor = (fillLevel) => {
    if (fillLevel < 50) return 'var(--success)';
    if (fillLevel < 80) return 'var(--warning)';
    return 'var(--error)';
  };

  const fillLevelData = bins.map(bin => ({
    name: bin.name.split(' ')[0],
    fill: bin.fillLevel,
    color: getBinStatusColor(bin.fillLevel)
  }));

  const statusData = [
    { name: 'Operational', value: bins.filter(b => b.status === 'operational').length, color: 'var(--success)' },
    { name: 'Almost Full', value: bins.filter(b => b.status === 'almost_full').length, color: 'var(--warning)' },
    { name: 'Full', value: bins.filter(b => b.status === 'full').length, color: 'var(--error)' },
  ];

  if (loading || !analytics) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="dashboard-header animate-fade-in">
          <h1>Admin Dashboard</h1>
          <p>Monitor and manage your e-waste bin network</p>
        </div>

        {/* KPI Cards */}
        <div className="kpi-grid animate-slide-in">
          <div className="kpi-card card">
            <div className="kpi-icon" style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}>
              <MapPin size={28} />
            </div>
            <div className="kpi-content">
              <div className="kpi-value">{analytics.totalBins}</div>
              <div className="kpi-label">Total Bins</div>
              <div className="kpi-sub">{analytics.operationalBins} operational</div>
            </div>
          </div>

          <div className="kpi-card card">
            <div className="kpi-icon" style={{ background: 'linear-gradient(135deg, var(--secondary), #4F46E5)' }}>
              <TrendingUp size={28} />
            </div>
            <div className="kpi-content">
              <div className="kpi-value">{analytics.totalTransactions}</div>
              <div className="kpi-label">Total Transactions</div>
              <div className="kpi-sub">All time</div>
            </div>
          </div>

          <div className="kpi-card card">
            <div className="kpi-icon" style={{ background: 'linear-gradient(135deg, var(--success), #059669)' }}>
              <Leaf size={28} />
            </div>
            <div className="kpi-content">
              <div className="kpi-value">{analytics.totalCO2Saved.toFixed(1)}T</div>
              <div className="kpi-label">CO₂ Saved</div>
              <div className="kpi-sub">Environmental impact</div>
            </div>
          </div>

          <div className="kpi-card card">
            <div className="kpi-icon" style={{ background: 'linear-gradient(135deg, var(--accent), #D97706)' }}>
              <DollarSign size={28} />
            </div>
            <div className="kpi-content">
              <div className="kpi-value">{analytics.totalValue.toLocaleString()}</div>
              <div className="kpi-label">Total Value (pts)</div>
              <div className="kpi-sub">Points distributed</div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {analytics.binsNeedingCollection > 0 && (
          <div className="alert-banner animate-fade-in">
            <AlertCircle size={24} />
            <div className="alert-content">
              <strong>Action Required:</strong>
              <span>{analytics.binsNeedingCollection} bins need collection (>80% full)</span>
            </div>
          </div>
        )}

        {/* Charts Section */}
        <div className="charts-section animate-fade-in">
          <div className="chart-card card">
            <h3>Bin Fill Levels</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fillLevelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip 
                  contentStyle={{ 
                    background: 'var(--bg-card)', 
                    border: '1px solid var(--border)',
                    borderRadius: '12px'
                  }}
                />
                <Bar dataKey="fill" radius={[8, 8, 0, 0]}>
                  {fillLevelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card card">
            <h3>Bin Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    background: 'var(--bg-card)', 
                    border: '1px solid var(--border)',
                    borderRadius: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="chart-legend">
              {statusData.map((item) => (
                <div key={item.name} className="legend-item">
                  <div className="legend-color" style={{ background: item.color }}></div>
                  <span>{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Bins */}
        <div className="top-bins-section animate-fade-in">
          <h2>Top Performing Bins</h2>
          <div className="bins-table">
            <div className="table-header">
              <div className="col-name">Bin Name</div>
              <div className="col-location">Location</div>
              <div className="col-fill">Fill Level</div>
              <div className="col-transactions">Transactions</div>
              <div className="col-status">Status</div>
            </div>
            {analytics.topBins.map((bin) => (
              <div key={bin.id} className="table-row card">
                <div className="col-name">
                  <MapPin size={18} />
                  {bin.name}
                </div>
                <div className="col-location">{bin.address}</div>
                <div className="col-fill">
                  <div className="fill-bar">
                    <div 
                      className="fill-progress"
                      style={{ 
                        width: `${bin.fillLevel}%`,
                        background: getBinStatusColor(bin.fillLevel)
                      }}
                    ></div>
                  </div>
                  <span>{bin.fillLevel}%</span>
                </div>
                <div className="col-transactions">{bin.transactionCount}</div>
                <div className="col-status">
                  {bin.fillLevel < 80 ? (
                    <span className="badge badge-success">
                      <CheckCircle size={16} />
                      Operational
                    </span>
                  ) : (
                    <span className="badge badge-warning">
                      <AlertCircle size={16} />
                      Needs Collection
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Bins Overview */}
        <div className="all-bins-section animate-fade-in">
          <h2>All Bins Overview</h2>
          <div className="bins-grid">
            {bins.map((bin) => (
              <div key={bin.id} className="bin-overview-card card">
                <div className="bin-overview-header">
                  <h3>{bin.name}</h3>
                  {bin.fillLevel > 80 && (
                    <span className="urgent-badge">
                      <AlertCircle size={16} />
                      Urgent
                    </span>
                  )}
                </div>
                <p className="bin-location">{bin.address}</p>
                <div className="bin-metrics">
                  <div className="metric">
                    <Package size={18} />
                    <span>{bin.fillLevel}% Full</span>
                  </div>
                  <div className="metric">
                    <Users size={18} />
                    <span>{bin.capacity} capacity</span>
                  </div>
                </div>
                <div className="bin-fill-visual">
                  <div 
                    className="fill-bar-large"
                    style={{
                      background: `linear-gradient(90deg, ${getBinStatusColor(bin.fillLevel)} ${bin.fillLevel}%, rgba(255,255,255,0.1) ${bin.fillLevel}%)`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
