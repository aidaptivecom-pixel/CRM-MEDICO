import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change }) => {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
      <span className={`text-xs font-medium px-2 py-1 rounded-lg ${
        isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-600'
      }`}>
        {change}
      </span>
    </div>
  );
};

export default StatCard;