const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Welcome to Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Sales</h3>
          <p className="stat-value">$12,345</p>
          <p className="stat-change positive">+15% from last month</p>
        </div>
        
        <div className="stat-card">
          <h3>Active Users</h3>
          <p className="stat-value">1,234</p>
          <p className="stat-change positive">+8% from last month</p>
        </div>
        
        <div className="stat-card">
          <h3>Products</h3>
          <p className="stat-value">89</p>
          <p className="stat-change negative">-2% from last month</p>
        </div>
        
        <div className="stat-card">
          <h3>Orders</h3>
          <p className="stat-value">456</p>
          <p className="stat-change positive">+12% from last month</p>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">📦</div>
            <div className="activity-details">
              <p className="activity-title">New Order #1234</p>
              <p className="activity-time">2 hours ago</p>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">👤</div>
            <div className="activity-details">
              <p className="activity-title">New User Registration</p>
              <p className="activity-time">3 hours ago</p>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">💰</div>
            <div className="activity-details">
              <p className="activity-title">Payment Received #5678</p>
              <p className="activity-time">5 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 