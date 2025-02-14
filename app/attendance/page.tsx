"use client";
import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
// import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
const ENDPOINT = "https://mainserver-e972.onrender.com";
const Page = () => {
  const socketRef = useRef<Socket>(null);
  const watchLocation = useRef<number | null>(null);

  const [users, setUsers] = useState<
    {
      socketId: string;
      coords: { name: string; latitude: number; longitude: number };
    }[]
  >([]);
  const [currentUser, setCurrentUser] = useState<{ socketId: string }>();
  const [hasAccessLocation, setHasAccessLocation] = useState(false);
  const { toast } = useToast();
  // const router = useRouter();

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
    if (socketRef.current) {
      socketRef.current.on("new-user", (data) => {
        setUsers((users) => [...users, data]);
      });

      socketRef.current.on("users", (data) => {
        setUsers(data);
      });

      socketRef.current.on("current-user", (data) => {
        setCurrentUser(data);
      });

      socketRef.current.on("position-change", (data) => {
        interface PositionChange {
          socketId: string;
          coords: {
            name: string;
            latitude: number;
            longitude: number;
          };
        }
        setUsers((prevUsers) =>
          prevUsers.map((user: PositionChange) =>
            user.socketId === data.socketId ? data : user
          )
        );
      });
    }

    if (hasAccessLocation) {
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

  interface PositionChangeData {
    coords: {
      latitude: number;
      longitude: number;
    };
  }

  function positionChange(data: PositionChangeData) {
    const latitude = data.coords.latitude;
    const longitude = data.coords.longitude;

    if (socketRef.current && currentUser) {
      socketRef.current.emit("position-change", {
        socketId: currentUser.socketId,
        coords: {
          name: "User",
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


  interface LocationData {
    coords: {
      latitude: number;
      longitude: number;
    };
  }

  function locationResolveSuccessfully(data: LocationData) {
    if (!socketRef.current) return;
    setHasAccessLocation(true);
    const latitude = data.coords.latitude;
    const longitude = data.coords.longitude;
    socketRef.current.emit("join", {
      name: "User",
      latitude,
      longitude,
    });
    toast({
      title: "Location",
      description: "Location fetched successfully",
    });
    // router.push("/location");
  }

  interface GeolocationError {
    code: number;
    message: string;
  }

  function locationResolveError(error: GeolocationError) {
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
    <div className="p-4  h-[60vh] flex justify-center items-center flex-col">
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
