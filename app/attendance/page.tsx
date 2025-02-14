"use client";
import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

const ENDPOINT = "http://localhost:4000";

const Page = () => {
  const session = useSession();
  const socketRef = useRef<Socket>(null);
  const watchLocation = useRef<number | null>(null);
  const [users, setUsers] = useState<
    {
      socketId: string;
      coords: { name: string; latitude: number; longitude: number };
    }[]
  >([]);
  const [currentUser, setCurrentUser] = useState<{
    socketId: string;
    coords: { name: string; latitude: number; longitude: number };
  }>();
  const [hasAccessLocation, setHasAccessLocation] = useState(false);
  const { toast } = useToast();

  const connectSocket = () => {
    socketRef.current = io(ENDPOINT);
  };

  const disconnectSocket = () => {
    if (socketRef.current) {
      socketRef.current.emit("disconnect");
    }
  };

  useEffect(() => {
    connectSocket();

    setInterval(() => {
      if (socketRef.current) {
        navigator.geolocation.getCurrentPosition(
          positionChange,
          locationResolveError
        );
      }
    }, 1000);
    if (socketRef.current) {
      socketRef.current.on("new-user", (data) => {
        setUsers((users) => [...users, data]);
      });

      socketRef.current.on("users", (data) => {
        setUsers(data);
      });

      socketRef.current.on("current-user", (data) => {
        console.log("current-user", data);
        if (!currentUser) setCurrentUser(data);
      });

      socketRef.current.on("position-change", (data) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.socketId === data.socketId ? data : user
          )
        );
      });
    }

    if (hasAccessLocation && currentUser) {
      watchLocation.current = navigator.geolocation.watchPosition(
        positionChange,
        locationResolveError
      );
    }

    return () => {
      if (watchLocation.current !== null) {
        navigator.geolocation.clearWatch(watchLocation.current);
      }
      disconnectSocket();
    };
  }, []);

  function positionChange(data: {
    coords: { latitude: number; longitude: number };
  }) {
    const latitude = data.coords.latitude;
    const longitude = data.coords.longitude;
    console.log("position change", latitude, longitude, currentUser);
    if (socketRef.current && currentUser) {
      console.log("position change");
      socketRef.current.emit("position-change", {
        socketId: currentUser?.socketId,
        coords: {
          name: session.data?.user?.name,
          latitude,
          longitude,
        },
      });
    }
  }

  function initUserLocation() {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation Unsupported",
        description: "Your system does not support Geolocation",
        variant: "destructive",
      });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      locationResolveSuccessfully,
      locationResolveError
    );
  }

  function locationResolveSuccessfully(data: {
    coords: { latitude: number; longitude: number };
  }) {
    if (!socketRef.current) return;
    setHasAccessLocation(true);
    const { latitude, longitude } = data.coords;
    socketRef.current.emit("join", {
      name: session.data?.user?.name,
      latitude,
      longitude,
    });
    toast({
      title: "Location",
      description: "Location fetched successfully",
    });
  }

  function locationResolveError(error: GeolocationPositionError) {
    let errorType = "";
    if (error.code === 1) {
      errorType = "Permission Denied";
    } else if (error.code === 2) {
      errorType = "Position Unavailable";
    } else if (error.code === 3) {
      errorType = "Timeout";
    }

    toast({
      title: errorType,
      description: error.message,
      variant: "destructive",
    });
  }

  return (
    <div className="p-4 h-[60vh] flex justify-center items-center flex-col">
      <h1 className="text-xl font-bold">Start Attendance</h1>
      <Button
        onClick={initUserLocation}
        className="px-10 py-5 font-semibold"
        variant={"destructive"}
      >
        Start
      </Button>
      <Button
        onClick={() => {
          positionChange({ coords: { latitude: 0, longitude: 0 } });
        }}
        className="px-10 py-5 font-semibold"
      >
        Current
      </Button>
    </div>
  );
};

export default Page;
