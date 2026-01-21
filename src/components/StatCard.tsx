import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change }) => {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 hover:bg-gray-100/50 transition-colors">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${
          isPositive ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-200 text-gray-600'
        }`}>
          {change}
        </span>
      </div>
    </div>
  );
};

export default StatCard;