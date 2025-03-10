"use client";
import React, { use, useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { startAuthentication } from "@simplewebauthn/browser";
import FaceChecker from "../components/FaceChecker";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";

const ENDPOINT = "http://localhost:4000";

const Page = () => {
  const session = useSession();
  const socketRef = useRef<Socket>(null);
  const watchLocation = useRef<number | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isTrueUser, setIsTrueUser] = useState(false) ;   
  const router = useRouter();
  const { isUserIdentified } = useUserContext();
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



  useEffect(() => {
    setInterval(() => {
      if (socketRef.current) {
        console.log("socketRef.current", socketRef.current);
        navigator.geolocation.getCurrentPosition(
          positionChange,
          locationResolveError
        );
      }
    }, 1000);
  },[currentUser])

  useEffect(() => {
    // Stop any active video streams when the page loads
    const stopVideoStream = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          stream.getTracks().forEach((track) => track.stop());
        })
        .catch((err) => console.error("Error stopping video stream:", err));
    };
  
    stopVideoStream(); // Call the function to stop the video when the page loads
  
    connectSocket();
  
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
    };
  }, []);
  
  function positionChange(data: {
    coords: { latitude: number; longitude: number };
  }) {
    const latitude = data.coords.latitude;
    const longitude = data.coords.longitude;
    if (socketRef.current && currentUser) {
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
    console.log("Location fetched successfully", latitude, longitude);
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

  async function handleFingerprintVerification() {
    setIsVerifying(true);
    try {
      const optionsResponse = await fetch(
        "/api/generate-authentication-options"
      );
      const options = await optionsResponse.json();
      const authResp = await startAuthentication(options);
      const verificationResponse = await fetch("/api/verify-authentication", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authResp),
      });
      const verificationResult = await verificationResponse.json();

      if (verificationResult.success) {
        toast({
          title: "Fingerprint Verified",
          description: "Attendance marked present.",
        });
        // Once fingerprint is verified, mark attendance (e.g., using location)
        initUserLocation();
        setModalOpen(false);
      } else {
        toast({
          title: "Verification Failed",
          description: "Fingerprint did not match. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Fingerprint verification error:", error);
      toast({
        title: "Error",
        description: "An error occurred during fingerprint verification.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  }

  // Handler when user clicks the "Start Attendance" button
  function handleStartAttendance() {
    // Open the fingerprint modal
    setModalOpen(true);
  
    toast({
      title: "Attendance tracking started", 
    });
  }
function handleVerifyPerson () 
{
  router.push("/identifyUser") ;  
}
  return (
    <div className="p-4 h-[60vh] flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Start Attendance</h1>
       <p>The user is {isUserIdentified}</p>
      <Button onClick={initUserLocation} className="mb-4">
        Get Location
      </Button>
      <Button onClick={handleStartAttendance} className="mb-4" >
        Start Attendance
      </Button>

      {/* Fingerprint Modal */}

    </div>
  );
};

export default Page;
