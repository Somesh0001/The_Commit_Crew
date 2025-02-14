import React from 'react';

const GuardMap: React.FC = () => {
  return (
    <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000"
        alt="Map Background"
        className="w-full h-full object-cover"
      />
      {/* Placeholder for actual map implementation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-gray-500">Interactive map will be implemented here</p>
      </div>
    </div>
  );
};

export default GuardMap;