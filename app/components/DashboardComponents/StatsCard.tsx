import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="rounded-full bg-gray-50 p-3">
          {icon}
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-600">{trend}</p>
    </div>
  );
};

export default StatsCard;