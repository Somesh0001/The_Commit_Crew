"use client"; 
import React, { useState } from "react";
import FaceRecognition from "../components/FaceRecognitionComponent";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [isVerified, setIsVerified] = useState(false);

  const handleVerificationResult = (result: any) => {
    setIsVerified(result);
  };

  return (
    <div className="p-4 h-[60vh] flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Start Attendance</h1>

      {/* Face Recognition Component */}
      <FaceRecognition onVerificationResult={handleVerificationResult} />

      {/* Buttons enabled only if user is verified */}
      <Button onClick={() => console.log("Fetching Location")} disabled={!isVerified} className="mb-4">
        Get Location
      </Button>

      <Button onClick={() => console.log("Starting Attendance")} disabled={!isVerified} className="mb-4">
        Start Attendance
      </Button>
    </div>
  );
};

export default Page;
