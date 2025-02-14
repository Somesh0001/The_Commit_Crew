"use client";

import React from "react";

interface HeroProps {
  heading1: string;
  content1: string;
  action1: string;
  action2: string;
  image1Src: string;
  image1Alt: string;
  image2Src: string;
  image2Alt: string;
  image3Src: string;
  image3Alt: string;
  image4Src: string;
  image4Alt: string;
  image5Src: string;
  image5Alt: string;
  image6Src: string;
  image6Alt: string;
  image7Src: string;
  image7Alt: string;
  image8Src: string;
  image8Alt: string;
  image9Src: string;
  image9Alt: string;
  image10Src: string;
  image10Alt: string;
  image11Src: string;
  image11Alt: string;
  image12Src: string;
  image12Alt: string;
}

const Hero: React.FC<HeroProps> = (props) => {
  return (
    <div className="hero-header">
      {/* Hero Text Section */}
      <div className="hero-column">
        <div className="hero-content1">
          <h1 className="hero-text1">{props.heading1}</h1>
          <p className="hero-text2">{props.content1}</p>
        </div>
        <div className="hero-actions">
          <button className="hero-button1">{props.action1}</button>
          <button className="hero-button2">{props.action2}</button>
        </div>
      </div>

      {/* Image Animation Section */}
      <div className="hero-content2">
        <div className="hero-row-container">
          <div className="hero-image-group">
            {[props.image1Src, props.image2Src, props.image3Src, props.image4Src, props.image5Src, props.image6Src].map(
              (src, index) => (
                <img key={index} src={src} alt={`Image ${index + 1}`} className="hero-image" />
              )
            )}
          </div>
          <div className="hero-image-group">
            {[props.image7Src, props.image8Src, props.image9Src, props.image10Src, props.image11Src, props.image12Src].map(
              (src, index) => (
                <img key={index} src={src} alt={`Image ${index + 7}`} className="hero-image" />
              )
            )}
          </div>
        </div>
      </div>

      {/* Inline Animation Styles */}
      <style jsx>{`
        .hero-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 20px;
          width: 100%;
          padding: 40px;
        }
        .hero-column {
          max-width: 800px;
        }
        .hero-text1 {
          font-size: 2.5rem;
          font-weight: bold;
        }
        .hero-text2 {
          font-size: 1.2rem;
          color: #555;
        }
        .hero-actions {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }
        .hero-button1,
        .hero-button2 {
          padding: 12px 20px;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          border-radius: 5px;
        }
        .hero-button1 {
          background-color: #0070f3;
          color: white;
        }
        .hero-button2 {
          background-color: transparent;
          border: 2px solid #0070f3;
          color: #0070f3;
        }
        .hero-content2 {
          display: flex;
          justify-content: center;
          overflow: hidden;
          width: 100%;
        }
        .hero-row-container {
          display: flex;
          gap: 20px;
          animation: scroll-x 10s linear infinite;
        }
        .hero-image-group {
          display: flex;
          gap: 15px;
        }
        .hero-image {
          width: 200px;
          height: 200px;
          object-fit: cover;
          border-radius: 10px;
        }
        @keyframes scroll-x {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
