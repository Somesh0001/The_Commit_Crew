"use client";
import React, { use, useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { startAuthentication } from "@simplewebauthn/browser";

// import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

const ENDPOINT = "http://localhost:4000";

const Page = () => {
  const session = useSession();
  const socketRef = useRef<Socket>(null);
  const watchLocation = useRef<number | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

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
      disconnectSocket();
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
        // Mark attendance via location update
        initUserLocation();
        setModalOpen(false);

        // *** Login the user using NextAuth credentials ***
        // Make sure the credentials provider in your NextAuth configuration is set up
        // to accept 'fingerprintVerified' and bypass the password check.
        await signIn("credentials", {
          // You may use session?.user?.email if the user is already logged in,
          // or get the email from an input if not logged in.
          email: session?.user?.email || "",
          fingerprintVerified: "true",
          callbackUrl: "/dashboard", // Redirect after sign in
        });
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
  }

  return (
    <div className="p-4 h-[60vh] flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Start Attendance</h1>
      <Button onClick={initUserLocation} className="mb-4">
        Get Location
      </Button>
      <Button onClick={handleStartAttendance} className="mb-4">
        Start Attendance
      </Button>

      {/* Fingerprint Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setModalOpen(false)}
          ></div>
          {/* Modal Content */}
          <div className="relative bg-white rounded shadow-lg p-8 z-10 w-80">
            <h2 className="text-xl font-semibold mb-2">
              Fingerprint Verification
            </h2>
            <p className="mb-4">
              Please scan your fingerprint to mark your attendance.
            </p>
            <Button
              onClick={handleFingerprintVerification}
              disabled={isVerifying}
            >
              {isVerifying ? "Verifying..." : "Scan Fingerprint"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => setModalOpen(false)}
              className="mt-2"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
