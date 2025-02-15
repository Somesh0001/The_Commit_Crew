import React, { useEffect, useState } from "react";
import { User, MapPin } from "lucide-react";

interface Guard {
  id: string;
  name: string;
  location: string;
  setDuty: string;
  address: string;
}

const GuardsList: React.FC = () => {
  const [guards, setGuards] = useState<Guard[]>([]);
  
  const fetchActiveGuards = async () => {
    try {
      const response = await fetch("/api/activeGuards");
      if (!response.ok) {
        throw new Error("Failed to fetch active guards");
      }
      const data: Guard[] = await response.json();
      setGuards(data);
    } catch (error) {
      console.error("Error fetching guards:", error);
    }
  };

  useEffect(() => {
    fetchActiveGuards();
  }, []);

  return (
    <div className="divide-y divide-gray-200">
      {guards.length > 0 ? (
        guards.map((guard,i) => (
          <div key={i} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{guard.name}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {guard.address || "Unknown Location"}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center p-4 text-gray-500">No active guards today</p>
      )}
    </div>
  );
};

export default GuardsList;
