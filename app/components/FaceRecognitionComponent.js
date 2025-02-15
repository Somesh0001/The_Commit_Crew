"use client";  
import React, { useEffect, useState, useRef } from 'react';
import * as faceapi from 'face-api.js';
import './FaceRecognition.css';

const FaceRecognition = ({ onVerificationResult }) => {
  const videoRef = useRef(null);
  const [predefinedDescriptor, setPredefinedDescriptor] = useState(null);
  const PUBLIC_URL = "http://localhost:3000"; // Change if needed

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error starting video:', err);
      }
    };

    startVideo();
    loadPredefinedImage();
  }, []);

  const loadPredefinedImage = async () => {
    try {
      const img = await faceapi.fetchImage(PUBLIC_URL + '/somesh.jpg'); // Predefined image
      const detection = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();
      if (detection) {
        setPredefinedDescriptor(detection.descriptor);
      } else {
        console.error('No face detected in predefined image.');
      }
    } catch (error) {
      console.error('Error loading predefined image:', error);
    }
  };

  const compareFaces = async (capturedDescriptor) => {
    if (!predefinedDescriptor || !capturedDescriptor) return;

    const distance = faceapi.euclideanDistance(predefinedDescriptor, capturedDescriptor);
    const isMatch = distance < 0.5; // Threshold for matching

    onVerificationResult(isMatch); // Notify parent component
  };

  const captureImage = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Detect face descriptor from captured image
    const detection = await faceapi
      .detectSingleFace(canvas)
      .withFaceLandmarks()
      .withFaceDescriptor();
    
    if (detection) {
      compareFaces(detection.descriptor);
    } else {
      onVerificationResult(false);
    }
  };

  return (
    <div className="face-recognition-container">
      <video ref={videoRef} autoPlay muted width="720" height="560" className="video-stream" />
      <button onClick={captureImage} className="capture-button">
        Capture & Verify
      </button>
    </div>
  );
};

export default FaceRecognition;
