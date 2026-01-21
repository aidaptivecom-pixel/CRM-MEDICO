import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300">
      <h3 className="text-sm font-medium text-gray-500 mb-4">{title}</h3>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-gray-900 tracking-tight">{value}</span>
        <div className="flex items-center px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100">
          <span className="text-xs font-bold">{change}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;