"use client";
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import io, { Socket } from "socket.io-client";

const ENDPOINT = "https://mainserver-e972.onrender.com";

const MapComponent = () => {
  const [data, setData] = useState<
    {
      socketId: string;
      name: string;
      coords: { latitude: number; longitude: number };
    }[]
  >([{"socketId":"Lwe9dprcNETPVyHkg4AAAR","name":"User","coords":{"latitude":22.7757500,"longitude":86.1468900}}]);
  
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
          iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
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

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    data.forEach((user) => {
      const marker = L.marker([user.coords.latitude, user.coords.longitude], {
        icon: L.icon({
          iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
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
    </div>
  );
};

export default MapComponent;
