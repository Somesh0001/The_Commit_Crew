import React from 'react';
import { User, MapPin } from 'lucide-react';

const guards = [
  {
    id: 1,
    name: 'John Smith',
    location: 'Zone A - North Gate',
    status: 'active',
    duration: '2h 15m',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    location: 'Zone B - Main Entry',
    status: 'active',
    duration: '1h 45m',
  },
  {
    id: 3,
    name: 'Michael Brown',
    location: 'Zone C - Parking',
    status: 'break',
    duration: '3h 30m',
  },
];

const GuardsList: React.FC = () => {
  return (
    <div className="divide-y divide-gray-200">
      {guards.map((guard) => (
        <div key={guard.id} className="p-4 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{guard.name}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  {guard.location}
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                guard.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {guard.status}
              </span>
              <p className="mt-1 text-xs text-gray-500">On duty: {guard.duration}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuardsList;