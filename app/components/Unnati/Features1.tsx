import React, { useState } from "react";

interface Features1Props {
  feature1ImgAlt?: string;
  feature1ImgSrc?: string;
  feature1Title?: string;
  feature1Description?: string;
  feature2ImgAlt?: string;
  feature2ImgSrc?: string;
  feature2Title?: string;
  feature2Description?: string;
  feature3ImgAlt?: string;
  feature3ImgSrc?: string;
  feature3Title?: string;
  feature3Description?: string;
}

const Features1: React.FC<Features1Props> = ({
  feature1ImgAlt = "Security Guard Database Image Alt",
  feature1ImgSrc = "https://images.unsplash.com/photo-1494522358652-f30e61a60313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTczOTUwODY1OXw&ixlib=rb-4.0.3&q=80&w=1080",
  feature1Title = "Security Guard Database",
  feature1Description = "Maintain structured records of personnel.",
  feature2ImgAlt = "Live Location Tracking Image Alt",
  feature2ImgSrc = "https://images.unsplash.com/photo-1533154165284-c5c5bf06c208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTczOTUwODY2MHw&ixlib=rb-4.0.3&q=80&w=1080",
  feature2Title = "Live Location Tracking",
  feature2Description = "Track guards in real time via GPS.",
  feature3ImgAlt = "Multi-Level Access Control Image Alt",
  feature3ImgSrc = "https://images.unsplash.com/photo-1519801671298-75871a4d9bfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTczOTUwODY1OXw&ixlib=rb-4.0.3&q=80&w=1080",
  feature3Title = "Multi-Level Access Control",
  feature3Description = "Admin, Police, Society Owners, and Field Users access levels.",
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="thq-section-padding">
      <div className="features1-container2 thq-section-max-width">
        <div className="features1-image-container">
          {activeTab === 0 && (
            <img
              alt={feature1ImgAlt}
              src={feature1ImgSrc}
              className="features1-image1 thq-img-ratio-16-9"
            />
          )}
          {activeTab === 1 && (
            <img
              alt={feature2ImgAlt}
              src={feature2ImgSrc}
              className="features1-image2 thq-img-ratio-16-9"
            />
          )}
          {activeTab === 2 && (
            <img
              alt={feature3ImgAlt}
              src={feature3ImgSrc}
              className="features1-image3 thq-img-ratio-16-9"
            />
          )}
        </div>
        <div className="features1-tabs-menu">
          <div
            onClick={() => setActiveTab(0)}
            className="features1-tab-horizontal1"
          >
            <div className="features1-divider-container1">
              {activeTab === 0 && <div className="features1-container3"></div>}
            </div>
            <div className="features1-content1">
              <h2 className="thq-heading-2">{feature1Title}</h2>
              <span className="thq-body-small">{feature1Description}</span>
            </div>
          </div>
          <div
            onClick={() => setActiveTab(1)}
            className="features1-tab-horizontal2"
          >
            <div className="features1-divider-container2">
              {activeTab === 1 && <div className="features1-container4"></div>}
            </div>
            <div className="features1-content2">
              <h2 className="thq-heading-2">{feature2Title}</h2>
              <span className="thq-body-small">{feature2Description}</span>
            </div>
          </div>
          <div
            onClick={() => setActiveTab(2)}
            className="features1-tab-horizontal3"
          >
            <div className="features1-divider-container3">
              {activeTab === 2 && <div className="features1-container5"></div>}
            </div>
            <div className="features1-content3">
              <h2 className="thq-heading-2">{feature3Title}</h2>
              <span className="thq-body-small">{feature3Description}</span>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .features1-container2 {
            width: 100%;
            display: grid;
            grid-gap: var(--dl-space-space-fiveunits);
            position: relative;
            grid-template-columns: 1fr 1fr;
          }
          .features1-image-container {
            height: 100%;
            display: flex;
            position: relative;
          }
          .features1-image1,
          .features1-image2,
          .features1-image3 {
            animation: fadeIn 300ms ease;
          }
          .features1-tabs-menu {
            gap: var(--dl-space-space-twounits);
            width: 100%;
            display: flex;
            flex-direction: column;
          }
          .features1-tab-horizontal1,
          .features1-tab-horizontal2,
          .features1-tab-horizontal3 {
            gap: var(--dl-space-space-twounits);
            cursor: pointer;
            display: flex;
            align-items: flex-start;
          }
          .features1-container3,
          .features1-container4,
          .features1-container5 {
            width: 2px;
            background-color: var(--dl-color-theme-neutral-dark);
          }
          .features1-content1,
          .features1-content2,
          .features1-content3 {
            gap: 16px;
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          @media (max-width: 991px) {
            .features1-container2 {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Features1;
