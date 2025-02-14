import React from 'react';
import { AlertTriangle, MapPin, Clock } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'Zone Breach',
    location: 'Zone A - North Gate',
    time: '2 minutes ago',
    priority: 'high',
  },
  {
    id: 2,
    type: 'Missing Check-in',
    location: 'Zone C - Parking',
    time: '15 minutes ago',
    priority: 'medium',
  },
  {
    id: 3,
    type: 'Unauthorized Access',
    location: 'Zone B - Main Entry',
    time: '1 hour ago',
    priority: 'high',
  },
];

const AlertsList: React.FC = () => {
  return (
    <div className="divide-y divide-gray-200">
      {alerts.map((alert) => (
        <div key={alert.id} className="p-4 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className={`h-5 w-5 ${
                alert.priority === 'high' ? 'text-red-500' : 'text-yellow-500'
              }`} />
              <span className="ml-2 font-medium text-gray-900">{alert.type}</span>
            </div>
            <span className="text-sm text-gray-500">{alert.time}</span>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            {alert.location}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertsList;