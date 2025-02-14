import React from 'react'
import { Bell, MapPin, Shield, Users, AlertTriangle, Clock, Star, Menu } from 'lucide-react';
import StatsCard from '@/app/components/DashboardComponents/StatsCard';
import GuardMap from '@/app/components/DashboardComponents/GuardMap';
import AlertsList from '@/app/components/DashboardComponents/AlertsList';
import GuardsList from '@/app/components/DashboardComponents/GuardList';

const page = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">SecureGuard Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
              </button>
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">AD</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
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
    </div>
  )
}

export default page