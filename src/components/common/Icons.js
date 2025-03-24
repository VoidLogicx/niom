import React from 'react';

// Simple icon component for demo
const Icon = ({ color = "#e63946" }) => (
  <svg width="48" height="48" viewBox="0 0 48 48">
    <rect x="12" y="12" width="24" height="24" fill="none" stroke={color} strokeWidth="2" />
  </svg>
);

export const OfficeIcon = () => <Icon />;
export const SalesIcon = () => <Icon />;
export const ClientIcon = () => <Icon />;
export const LogisticsIcon = () => <Icon />;
export const ProductionIcon = () => <Icon />;
export const CateringIcon = () => <Icon />;