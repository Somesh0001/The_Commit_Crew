"use client";
import React, { useEffect, useState, useRef } from "react";
import * as faceapi from "face-api.js";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import "./FaceRecognition.css";

const FaceRecognition = ({ videoRef: externalVideoRef }) => {
  const router = useRouter();
  const { setIsUserIdentified } = useUserContext();
  const videoRef = externalVideoRef || useRef(null);
  const [predefinedDescriptor, setPredefinedDescriptor] = useState(null);
  const PUBLIC_URL = "http://localhost:3000";

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
    };

    const startVideo = async () => {
      try {
        await loadModels();
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error starting video:", err);
      }
    };

    startVideo();
    loadPredefinedImage();
  }, []);

  const loadPredefinedImage = async () => {
    try {
      const img = await faceapi.fetchImage(PUBLIC_URL + "/somesh.jpg");
      const detection = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();
      if (detection) {
        setPredefinedDescriptor(detection.descriptor);
      } else {
        console.error("No face detected in predefined image.");
      }
    } catch (error) {
      console.error("Error loading predefined image:", error);
    }
  };

  const compareFaces = async (capturedDescriptor) => {
    if (!predefinedDescriptor || !capturedDescriptor) return;

    const distance = faceapi.euclideanDistance(predefinedDescriptor, capturedDescriptor);
    if (distance < 0.5) {
      alert("✅ Match Found! Redirecting...");
      setIsUserIdentified(true);
      router.push("/attendance");
    } else {
      alert("❌ No Match! Try Again.");
    }
  };

  const captureImage = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const detection = await faceapi
      .detectSingleFace(canvas)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detection) {
      compareFaces(detection.descriptor);
    } else {
      alert("❌ No face detected! Please try again.");
    }
  };

  return (
    <div className="face-recognition-container">
      <video ref={videoRef} autoPlay muted width="720" height="560" className="video-stream" />
      <Button onClick={captureImage} className="mt-4">
        Capture & Verify
      </Button>
    </div>
  );
};

export default FaceRecognition;
