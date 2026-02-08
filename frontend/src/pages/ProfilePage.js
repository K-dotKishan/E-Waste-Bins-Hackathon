import React, { useState, useEffect } from 'react';
import { Award, TrendingUp, Leaf, Target, Star, Gift } from 'lucide-react';
import './ProfilePage.css';
import { API_BASE_URL } from '../utils/config';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
    fetchTransactions();
  }, []);



  // ... (inside component)

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/1`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
    setLoading(false);
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/1/transactions`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const achievements = [
    { id: 'first_recycler', name: 'First Recycler', icon: '🎯', unlocked: true },
    { id: 'eco_warrior', name: 'Eco Warrior', icon: '🌍', unlocked: true },
    { id: 'ten_items', name: '10 Items Milestone', icon: '⭐', unlocked: true },
    { id: 'hundred_points', name: '100 Points', icon: '💯', unlocked: false },
    { id: 'co2_saver', name: 'CO₂ Saver', icon: '🌱', unlocked: false },
    { id: 'monthly_champion', name: 'Monthly Champion', icon: '🏆', unlocked: false },
  ];

  if (loading || !user) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        {/* Profile Header */}
        <div className="profile-header card animate-fade-in">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {user.name.charAt(0)}
            </div>
          </div>
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <div className="member-since">
              Member since {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid animate-slide-in">
          <div className="stat-card card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}>
              <Award size={28} />
            </div>
            <div className="stat-content">
              <div className="stat-value">{user.points.toLocaleString()}</div>
              <div className="stat-label">Total Points</div>
            </div>
          </div>

          <div className="stat-card card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, var(--secondary), #4F46E5)' }}>
              <TrendingUp size={28} />
            </div>
            <div className="stat-content">
              <div className="stat-value">{user.recycledItems}</div>
              <div className="stat-label">Items Recycled</div>
            </div>
          </div>

          <div className="stat-card card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, var(--success), #059669)' }}>
              <Leaf size={28} />
            </div>
            <div className="stat-content">
              <div className="stat-value">{user.co2Saved} kg</div>
              <div className="stat-label">CO₂ Saved</div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="achievements-section animate-fade-in">
          <h2>Achievements</h2>
          <div className="achievements-grid">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`achievement-card card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
              >
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-name">{achievement.name}</div>
                {achievement.unlocked && (
                  <div className="unlocked-badge">
                    <Star size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Rewards */}
        <div className="rewards-section animate-fade-in">
          <div className="section-header">
            <h2>Available Rewards</h2>
            <div className="points-balance">
              {user.points.toLocaleString()} points available
            </div>
          </div>

          <div className="rewards-grid">
            <div className="reward-card card">
              <div className="reward-icon">
                <Gift size={32} />
              </div>
              <h3>₹50 Shopping Voucher</h3>
              <p>Redeem at partner stores</p>
              <div className="reward-cost">500 points</div>
              <button className="btn btn-primary">Redeem</button>
            </div>

            <div className="reward-card card">
              <div className="reward-icon">
                <Gift size={32} />
              </div>
              <h3>₹100 Eco-Product Discount</h3>
              <p>For sustainable products</p>
              <div className="reward-cost">1000 points</div>
              <button className="btn btn-primary">Redeem</button>
            </div>

            <div className="reward-card card">
              <div className="reward-icon">
                <Gift size={32} />
              </div>
              <h3>Plant a Tree</h3>
              <p>We'll plant a tree in your name</p>
              <div className="reward-cost">750 points</div>
              <button className="btn btn-primary">Redeem</button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="activity-section animate-fade-in">
          <h2>Recent Activity</h2>
          {transactions.length === 0 ? (
            <div className="no-activity card">
              <Target size={48} />
              <h3>No activity yet</h3>
              <p>Start recycling to see your history here</p>
            </div>
          ) : (
            <div className="activity-list">
              {transactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="activity-item card">
                  <div className="activity-icon">{transaction.detectedItem?.icon || '📱'}</div>
                  <div className="activity-details">
                    <div className="activity-name">
                      {transaction.detectedItem?.name || 'E-Waste Item'}
                    </div>
                    <div className="activity-date">
                      {new Date(transaction.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="activity-reward">
                    <div className="points-earned">+{transaction.value} pts</div>
                    <div className="co2-saved">{transaction.co2Saved} kg CO₂</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
