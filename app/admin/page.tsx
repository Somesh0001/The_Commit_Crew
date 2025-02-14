"use client";
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import io, { Socket } from "socket.io-client";
const ENDPOINT = "http://localhost:4000";
const MapComponent = () => {
  // const socketRef = useRef<Socket>(null);
  // const connectSocket = () => {
  //   socketRef.current = io(ENDPOINT);
  // };

  // const disconnectSocket = () => {
  //   if (socketRef.current) {
  //     socketRef.current.emit("disconnect");
  //   }
  // };

  const mapRef = useRef(null);

  useEffect(() => {

    if (typeof window === "undefined") return;

    // Initialize the map
    const map = L.map("map").setView([0, 0], 2);
    mapRef.current = map;

    // Add OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Function to handle successful location detection
    const onLocationFound = (e) => {
      const radius = e.accuracy / 2;

      // Add a marker at the user's location
      const userMarker = L.marker(e.latlng, {
        icon: L.icon({
          iconUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
          iconSize: [25, 41], // Size of the marker
          iconAnchor: [12, 41], // Position where the icon is anchored
          popupAnchor: [1, -34], // Position where the popup opens
          shadowUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
          shadowSize: [41, 41], // Size of the shadow
        }),
      }).addTo(map);
      userMarker
        .bindPopup(`You are within ${radius} meters from this point`)
        .openPopup();

      // Add a circle around the user's location with the accuracy radius
      L.circle(e.latlng, radius).addTo(map);
    };

    // Function to handle location detection errors
    const onLocationError = (e) => {
      alert(e.message);
    };

    // Attempt to locate the user
    map.locate({ setView: true, maxZoom: 16 });

    // Event listeners for location found and error
    map.on("locationfound", onLocationFound);
    map.on("locationerror", onLocationError);

    // Cleanup function to remove event listeners
    return () => {
      map.off("locationfound", onLocationFound);
      map.off("locationerror", onLocationError);
    };
  }, []);

  return <div id="map" style={{ width: "100vw", height: "100vh" }}></div>;
};

export default MapComponent;
