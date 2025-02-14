"use client";
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import io, { Socket } from "socket.io-client";
import {
  Bell,
  MapPin,
  Shield,
  Users,
  AlertTriangle,
  Clock,
  Star,
  Menu,
} from "lucide-react";
import StatsCard from "../components/DashboardComponents/StatsCard";
import GuardMap from "../components/DashboardComponents/GuardMap";
import AlertsList from "../components/DashboardComponents/AlertsList";
import GuardsList from "../components/DashboardComponents/GuardList";
import ChartPage from "../components/DashboardComponents/ChartPage";

const ENDPOINT = "https://mainserver-e972.onrender.com";

const MapComponent = () => {
  const [data, setData] = useState<
    {
      socketId: string;
      name: string;
      coords: { latitude: number; longitude: number };
    }[]
  >([
    {
      socketId: "Lwe9dprcNETPVyHkg4AAAR",
      name: "User",
      coords: { latitude: 22.77575, longitude: 86.14689 },
    },
  ]);

  const socketRef = useRef<Socket>(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    socketRef.current = io(ENDPOINT);

    socketRef.current.emit("get-data");
    socketRef.current.on("message", (data) => {
      setData((prevData) => [...prevData, ...data]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const map = L.map("map").setView([0, 0], 2);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const onLocationFound = (e) => {
      const radius = e.accuracy / 2;
      const userMarker = L.marker(e.latlng, {
        icon: L.icon({
          iconUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
          shadowSize: [41, 41],
        }),
      }).addTo(map);
      userMarker.bindPopup("You are here").openPopup();
      L.circle(e.latlng, radius).addTo(map);
    };

    map.locate({ setView: true, maxZoom: 16 });
    map.on("locationfound", onLocationFound);

    return () => {
      map.off("locationfound", onLocationFound);
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    data.forEach((user) => {
      const marker = L.marker([user.coords.latitude, user.coords.longitude], {
        icon: L.icon({
          iconUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
          shadowSize: [41, 41],
        }),
      }).addTo(mapRef.current);

      marker.bindPopup(`${user.name}`).openPopup();
      markersRef.current.push(marker);
    });
  }, [data]);

  return (
    <div>
      {JSON.stringify(data)}
      <div id="map" style={{ width: "80vw", height: "80vh" }}></div>

      <div className="w-full ">
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
                  <h2 className="text-lg font-medium text-gray-900">
                    Live Guard Locations
                  </h2>
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
                  <h2 className="text-lg font-medium text-gray-900">
                    Recent Alerts
                  </h2>
                </div>
                <AlertsList />
              </div>

              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    On-Duty Guards
                  </h2>
                </div>
                <GuardsList />
              </div>
            </div>
          </div>
        </main>
        <ChartPage />
      </div>
    </div>
  );
};

export default MapComponent;
