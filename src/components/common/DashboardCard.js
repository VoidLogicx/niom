import React from 'react';
import '../../styles/dashboard.css';

/**
 * Reusable card component for dashboard items
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.icon - Icon component to display
 * @param {string} props.title - Card title
 * @param {string} props.description - Card description
 * @param {function} props.onClick - Click handler
 */
const DashboardCard = ({ icon, title, description, onClick }) => {
  return (
    <div className="dashboard-card" onClick={onClick}>
      <div className="dashboard-card-icon">
        {icon}
      </div>
      <div className="dashboard-card-content">
        <h3 className="dashboard-card-title">{title}</h3>
        <p className="dashboard-card-description">{description}</p>
      </div>
    </div>
  );
};

export default DashboardCard;