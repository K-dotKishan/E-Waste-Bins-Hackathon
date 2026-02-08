import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Camera, Award, Leaf, TrendingUp, Users } from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Find Bins Nearby',
      description: 'Locate the nearest e-waste bins that accept your specific items in seconds',
      color: 'var(--primary)',
      path: '/find-bin'
    },
    {
      icon: Camera,
      title: 'AI Detection',
      description: 'Our smart bins identify your e-waste and calculate its value instantly',
      color: 'var(--secondary)',
      path: '/detect'
    },
    {
      icon: Award,
      title: 'Earn Rewards',
      description: 'Get points for every item recycled and redeem for exciting rewards',
      color: 'var(--accent)',
      path: '/profile'
    }
  ];

  const stats = [
    { label: 'Active Bins', value: '150+', icon: MapPin },
    { label: 'Items Recycled', value: '25K+', icon: TrendingUp },
    { label: 'CO₂ Saved', value: '15T+', icon: Leaf },
    { label: 'Active Users', value: '5K+', icon: Users }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content animate-fade-in">
            <div className="hero-badge">
              <Leaf size={16} />
              <span>Making Recycling Rewarding</span>
            </div>
            <h1 className="hero-title">
              Smart Recycling for a
              <br />
              <span className="text-gradient">Greener Tomorrow</span>
            </h1>
            <p className="hero-description">
              Find nearby e-waste bins, get instant value for your electronics, and earn rewards while saving the planet. Join thousands making a difference.
            </p>
            <div className="hero-actions">
              <Link to="/find-bin" className="btn btn-primary">
                <MapPin size={20} />
                Find a Bin
              </Link>
              <Link to="/detect" className="btn btn-outline">
                <Camera size={20} />
                Try AI Detection
              </Link>
            </div>
          </div>

          <div className="hero-visual animate-scale-in">
            <div className="floating-card card-1">
              <div className="card-icon" style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}>
                <MapPin size={24} />
              </div>
              <div className="card-content">
                <div className="card-label">Nearest Bin</div>
                <div className="card-value">0.3 km away</div>
              </div>
            </div>
            
            <div className="floating-card card-2">
              <div className="card-icon" style={{ background: 'linear-gradient(135deg, var(--secondary), #4F46E5)' }}>
                <Award size={24} />
              </div>
              <div className="card-content">
                <div className="card-label">Points Earned</div>
                <div className="card-value">+150 pts</div>
              </div>
            </div>
            
            <div className="floating-card card-3">
              <div className="card-icon" style={{ background: 'linear-gradient(135deg, var(--accent), #D97706)' }}>
                <Leaf size={24} />
              </div>
              <div className="card-content">
                <div className="card-label">CO₂ Saved</div>
                <div className="card-value">2.5 kg</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index} 
                  className="stat-card animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon size={32} className="stat-icon" />
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-description">
              Three simple steps to make a difference
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.path}
                  className="feature-card card animate-slide-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="feature-number">0{index + 1}</div>
                  <div 
                    className="feature-icon"
                    style={{ background: `linear-gradient(135deg, ${feature.color}, ${feature.color}DD)` }}
                  >
                    <Icon size={32} />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                  <div className="feature-arrow">→</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card card">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Make an Impact?</h2>
              <p className="cta-description">
                Join our community of eco-warriors and start earning rewards for recycling your e-waste today.
              </p>
              <Link to="/find-bin" className="btn btn-primary">
                Get Started Now
              </Link>
            </div>
            <div className="cta-visual">
              <div className="impact-circle">
                <Leaf size={64} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
