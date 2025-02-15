"use client";
import { MapPin, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import AlertsList from "../components/DashboardComponents/AlertsList";
import ChartPage from "../components/DashboardComponents/ChartPage";
import GuardsList from "../components/DashboardComponents/GuardList";
import StatsCard from "../components/DashboardComponents/StatsCard";

const ENDPOINT = "http://localhost:4000";

const MapComponent = () => {
  const [data, setData] = useState<
    {
      socketId: string;
      name: string;
      coords: { latitude: number; longitude: number };
    }[]
  >([]);
  const connectSocket = () => {
    socketRef.current = io(ENDPOINT);
  };

  const disconnectSocket = () => {
    if (socketRef.current) {
      socketRef.current.emit("disconnect");
    }
  };

  const socketRef = useRef<Socket>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [guards, setGuards] = useState(0);
  const [zones, setZones] = useState(0);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  const getStats = async () => {
    try {
        const response = await fetch("/api/getActiveGuardsZones", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch stats");
        }

        const data = await response.json();
        setGuards(data.totalGuards || 0);
        setZones(data.totalSocieties || 0);
    } catch (error) {
        console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    connectSocket();
    if (socketRef.current) {
      socketRef.current.emit("get-data");
      socketRef.current.on("message", (datas) => {
        setData(datas);
      });
      socketRef.current.on("new-user", (data) => {
        setData((users) => [...users, data]);
      });
    }
    getStats();
  }, []);

  useEffect(() => {
    let L: any;
    const initializeMap = async () => {
      if (typeof window !== "undefined" && !mapLoaded) {
        L = (await import('leaflet')).default;
        await import('leaflet/dist/leaflet.css');

        const map = L.map("map").setView([0, 0], 2);
        mapRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);

        const onLocationFound = (e: any): void => {
          const radius: number = e.accuracy / 2;
        };

        map.locate({ setView: true, maxZoom: 16 });
        map.on("locationfound", onLocationFound);
        setMapLoaded(true);

        return () => {
          map.off("locationfound", onLocationFound);
          map.remove();
        };
      }
    };

    initializeMap();
  }, [mapLoaded]);

  useEffect(() => {
    const updateMarkers = async () => {
      if (!mapRef.current || !mapLoaded) return;

      const L = (await import('leaflet')).default;
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

        marker.bindPopup(`${user.name || user.coords.name}`).openPopup();
        markersRef.current.push(marker);
      });
    };

    updateMarkers();
  }, [data, mapLoaded]);

  return (
    <div>
      <div className="w-full">
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatsCard
              title="Active Guards"
              value={`${guards}`}
              icon={<Users className="h-6 w-6 text-indigo-600" />}
              trend="+2 from yesterday"
            />
            <StatsCard
              title="Active Zones"
              value={`${zones}`}
              icon={<MapPin className="h-6 w-6 text-green-600" />}
              trend="All zones covered"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    Live Guard Locations
                  </h2>
                </div>
                <div className="p-4 z-0">
                  {JSON.stringify(data)}
                  <div
                    id="map"
                    className="z-0"
                    style={{ width: "50vw", height: "50vh" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
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
      </div>
    </div>
  );
};

export default MapComponent;