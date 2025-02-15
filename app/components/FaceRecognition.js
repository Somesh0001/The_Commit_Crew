"use client";  
import React, { useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import './FaceRecognition.css';

const FaceRecognition = ({ videoRef, handleVideoOnPlay, detections }) => {
  const [capturedImages, setCapturedImages] = useState([]);
  const [predefinedDescriptor, setPredefinedDescriptor] = useState(null);
 const PUBLIC_URL = "http://localhost:3000" ; 
  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error('Error starting video:', err);
      }
    };

    startVideo();
    loadPredefinedImage();
  }, [videoRef]);

  const loadPredefinedImage = async () => {
    try {
      const img = await faceapi.fetchImage(PUBLIC_URL + '/somesh.jpg'); // ✅ Fix: Correct path
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
    alert(distance < 0.5 ? '✅ Match Found!' : '❌ No Match!');
  };

  const captureImage = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg');
    setCapturedImages([...capturedImages, dataUrl]);

    // Detect face descriptor from captured image
    const detection = await faceapi
      .detectSingleFace(canvas)
      .withFaceLandmarks()
      .withFaceDescriptor();
    if (detection) {
      compareFaces(detection.descriptor);
    } else {
      alert('❌ No face detected in captured image.');
    }
  };

  return (
    <div className="face-recognition-container">
      <video
        ref={videoRef}
        autoPlay
        muted
        onPlay={handleVideoOnPlay}
        width="720"
        height="560"
        className="video-stream"
      />
      <button onClick={captureImage} className="capture-button">
        Capture & Compare
      </button>
      <div className="captured-images-container">
        {capturedImages.map((image, index) => (
          <img key={index} src={image} alt={`Captured ${index}`} className="captured-image" />
        ))}
      </div>
    </div>
  );
};

export default FaceRecognition;