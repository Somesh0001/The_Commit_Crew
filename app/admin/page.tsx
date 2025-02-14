import React from 'react';
import { Bell, MapPin, Shield, Users, AlertTriangle, Clock, Star, Menu } from 'lucide-react';
import StatsCard from '../components/DashboardComponents/StatsCard';
import GuardMap from '../components/DashboardComponents/GuardMap';
import AlertsList from '../components/DashboardComponents/AlertsList';
import GuardsList from '../components/DashboardComponents/GuardList';
import ChartPage from '../components/DashboardComponents/ChartPage';
const page = () => {
  return (
    <div className="w-full h-screen overflow-auto">

    

      {/* Main Content */}
      <main className="  px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatsCard
            title="Active Guards"
            value="24"
            icon={<Users className="h-6 w-6 text-indigo-600" />}
            trend="+2 from yesterday"
          />
          <StatsCard
            title="Active Zones"
            value="8"
            icon={<MapPin className="h-6 w-6 text-green-600" />}
            trend="All zones covered"
          />
          <StatsCard
            title="Open Incidents"
            value="3"
            icon={<AlertTriangle className="h-6 w-6 text-red-600" />}
            trend="2 high priority"
          />
          <StatsCard
            title="Avg. Response Time"
            value="4.2m"
            icon={<Clock className="h-6 w-6 text-orange-600" />}
            trend="Within SLA"
          />
        </div>

        {/* Map and Lists Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Live Guard Locations</h2>
              </div>
              <div className="p-4">
                <GuardMap />
              </div>
            </div>
          </div>

          {/* Alerts and Guards List */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Recent Alerts</h2>
              </div>
              <AlertsList />
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">On-Duty Guards</h2>
              </div>
              <GuardsList />
            </div>
          </div>
        </div>
      </main>
      <ChartPage/> 
    </div>
  )
}

export default page;
