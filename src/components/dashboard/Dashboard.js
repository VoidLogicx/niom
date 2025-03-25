import React, { useState } from 'react';
import DashboardCard from '../common/DashboardCard';
import { ReactComponent as OfficeIcon } from '../../assets/icons/office.svg';
import { ReactComponent as SalesIcon } from '../../assets/icons/sales.svg';
import { ReactComponent as ClientIcon } from '../../assets/icons/client.svg';
import { ReactComponent as LogisticsIcon } from '../../assets/icons/logistics.svg';
import { ReactComponent as ProductionIcon } from '../../assets/icons/production.svg';
import { ReactComponent as CateringIcon } from '../../assets/icons/catering.svg';
import '../../styles/dashboard.css';

// Dashboard data in Polish
const dashboardItems = [
  {
    id: 'office',
    title: 'Biuro AI',
    description: 'Twórz dokumenty z łatwością przy pomocy AI',
    icon: <OfficeIcon />,
    path: '/office'
  },
  {
    id: 'sales',
    title: 'Sprzedaż AI',
    description: 'Zwiększ produktywność sprzedaży',
    icon: <SalesIcon />,
    path: '/sales'
  },
  {
    id: 'client',
    title: 'Klient AI',
    description: 'Popraw zadowolenie klientów',
    icon: <ClientIcon />,
    path: '/client'
  },
  {
    id: 'logistics',
    title: 'Logistyka AI',
    description: 'Usprawnij dostawy dzięki automatyzacji operacji',
    icon: <LogisticsIcon />,
    path: '/logistics'
  },
  {
    id: 'production',
    title: 'Produkcja AI',
    description: 'Podnieś efektywność dzięki automatyzacji',
    icon: <ProductionIcon />,
    path: '/production'
  },
  {
    id: 'catering',
    title: 'Gastronomia AI',
    description: 'Zwiększ przychody gastronomiczne z analizą rynku AI',
    icon: <CateringIcon />,
    path: '/catering'
  }
];

const Dashboard = () => {
  const [selectedModule, setSelectedModule] = useState(null);

  const handleCardClick = (path) => {
    // Navigation logic would go here
    console.log(`Navigating to: ${path}`);
    setSelectedModule(path);
    window.location.href = path;
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Panel inteligentnych narzędzi AI</h1>
      
      <div className="dashboard-grid">
        {dashboardItems.map((item) => (
          <DashboardCard
            key={item.id}
            icon={item.icon}
            title={item.title}
            description={item.description}
            onClick={() => handleCardClick(item.path)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;