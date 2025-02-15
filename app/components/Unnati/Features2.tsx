import React, { useState } from 'react';

interface Features2Props {
  feature3Description?: string;
  feature1ImgAlt?: string;
  feature1Description?: string;
  feature3ImgAlt?: string;
  feature2Title?: string;
  feature1Title?: string;
  feature1ImgSrc?: string;
  feature3ImgSrc?: string;
  feature2Description?: string;
  feature3Title?: string;
  feature2ImgAlt?: string;
  feature2ImgSrc?: string;
}

const Features2: React.FC<Features2Props> = ({
  feature3Description = 'Appoint guards daily using a dynamic list filtered by last duty.',
  feature1ImgAlt = 'Attendance Verification',
  feature1Description = 'Guards scan a QR code that redirects to a secure verification portal with face detection for identity confirmation.',
  feature3ImgAlt = 'image',
  feature2Title = 'Emergency SOS Feature',
  feature1Title = 'User Friendly ',
  feature1ImgSrc = 'https://www.itrobes.com/wp-content/uploads/2021/10/User-friendly-software.jpg',
  feature3ImgSrc = 'https://images.klipfolio.com/website/public/141b88a0-7222-45fd-8349-cadd876a5b03/Business-Dashboard-example.jpg',
  feature2Description = 'An SOS button that sends live location notifications to both Admin and the appointed guard.',
  feature3Title = 'Society Owner Dashboard and appoint guards',
  feature2ImgAlt = 'Live Location Tracking Image',
  feature2ImgSrc = 'https://play-lh.googleusercontent.com/ibGrsOSIungUGH69-cD0PAxoOi2rdYGKd8LDhanme4iGyh2aAXukKXpdpSFbehEk38M=w600-h300-pc0xffffff-pd',
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <>
      <div className="thq-section-padding">
        <div className="features2-container2 thq-section-max-width">
          <div className="features2-tabs-menu">
            <div
              onClick={() => setActiveTab(0)}
              className="features2-tab-horizontal1"
            >
              <div className="features2-divider-container1">
                {activeTab === 0 && (
                  <div className="features2-container3"></div>
                )}
              </div>
              <div className="features2-content1">
                <h2 className="thq-heading-2">{feature1Title}</h2>
                <span className="thq-body-small">
                  {feature1Description}
                </span>
              </div>
            </div>
            <div
              onClick={() => setActiveTab(1)}
              className="features2-tab-horizontal2"
            >
              <div className="features2-divider-container2">
                {activeTab === 1 && (
                  <div className="features2-container4"></div>
                )}
              </div>
              <div className="features2-content2">
                <h2 className="thq-heading-2">{feature2Title}</h2>
                <span className="thq-body-small">
                  {feature2Description}
                </span>
              </div>
            </div>
            <div
              onClick={() => setActiveTab(2)}
              className="features2-tab-horizontal3"
            >
              <div className="features2-divider-container3">
                {activeTab === 2 && (
                  <div className="features2-container5"></div>
                )}
              </div>
              <div className="features2-content3">
                <h2 className="thq-heading-2">{feature3Title}</h2>
                <span className="thq-body-small">
                  {feature3Description}
                </span>
              </div>
            </div>
          </div>
          <div className="features2-image-container">
            {activeTab === 0 && (
              <img
                alt={feature1ImgAlt}
                src={feature1ImgSrc}
                className="features2-image1 thq-img-ratio-16-9"
              />
            )}
            {activeTab === 1 && (
              <img
                alt={feature2ImgAlt}
                src={feature2ImgSrc}
                className="features2-image2 thq-img-ratio-16-9"
              />
            )}
            {activeTab === 2 && (
              <img
                alt={feature3ImgAlt}
                src={feature3ImgSrc}
                className="features2-image3 thq-img-ratio-16-9"
              />
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .features2-container2 {
          width: 100%;
          display: grid;
          grid-gap: var(--dl-space-space-fiveunits);
          position: relative;
          grid-template-columns: 1fr 1fr;
        }
        .features2-tabs-menu {
          gap: var(--dl-space-space-twounits);
          width: 100%;
          display: flex;
          align-items: flex-start;
          flex-direction: column;
          justify-content: center;
        }
        .features2-tab-horizontal1 {
          gap: var(--dl-space-space-twounits);
          cursor: pointer;
          display: flex;
          overflow: hidden;
          align-self: stretch;
          align-items: flex-start;
          flex-shrink: 0;
        }
        .features2-divider-container1 {
          display: flex;
          align-self: stretch;
          align-items: flex-start;
        }
        .features2-container3 {
          width: 2px;
          align-self: stretch;
          background-color: var(--dl-color-theme-neutral-dark);
        }
        .features2-content1 {
          gap: 16px;
          flex: 1;
          display: flex;
          overflow: hidden;
          flex-grow: 1;
          align-items: flex-start;
          flex-shrink: 0;
          flex-direction: column;
          justify-content: center;
        }
        .features2-tab-horizontal2 {
          gap: var(--dl-space-space-twounits);
          cursor: pointer;
          display: flex;
          overflow: hidden;
          align-self: stretch;
          align-items: flex-start;
          flex-shrink: 0;
        }
        .features2-divider-container2 {
          display: flex;
          align-self: stretch;
          align-items: flex-start;
        }
        .features2-container4 {
          width: 2px;
          align-self: stretch;
          background-color: var(--dl-color-theme-neutral-dark);
        }
        .features2-content2 {
          gap: 16px;
          flex: 1;
          display: flex;
          overflow: hidden;
          flex-grow: 1;
          align-items: flex-start;
          flex-shrink: 0;
          flex-direction: column;
          justify-content: center;
        }
        .features2-tab-horizontal3 {
          gap: var(--dl-space-space-twounits);
          cursor: pointer;
          display: flex;
          overflow: hidden;
          align-self: stretch;
          align-items: flex-start;
          flex-shrink: 0;
        }
        .features2-divider-container3 {
          display: flex;
          align-self: stretch;
          align-items: flex-start;
        }
        .features2-container5 {
          width: 2px;
          align-self: stretch;
          background-color: var(--dl-color-theme-neutral-dark);
        }
        .features2-content3 {
          gap: 16px;
          flex: 1;
          display: flex;
          overflow: hidden;
          flex-grow: 1;
          align-items: flex-start;
          flex-shrink: 0;
          flex-direction: column;
          justify-content: center;
        }
        .features2-image-container {
          height: 100%;
          display: flex;
          position: relative;
        }
        .features2-image1 {
          animation-name: fadeIn;
          animation-delay: 0s;
          animation-duration: 300ms;
          animation-direction: normal;
          animation-iteration-count: 1;
          animation-timing-function: ease;
        }
        .features2-image2 {
          animation-name: fadeIn;
          animation-delay: 0s;
          animation-duration: 300ms;
          animation-direction: normal;
          animation-iteration-count: 1;
          animation-timing-function: ease;
        }
        .features2-image3 {
          animation-name: fadeIn;
          animation-delay: 0s;
          animation-duration: 300ms;
          animation-direction: normal;
          animation-iteration-count: 1;
          animation-timing-function: ease;
        }
        @media (max-width: 991px) {
          .features2-container2 {
            grid-gap: var(--dl-space-space-twounits);
            grid-template-columns: 1fr;
          }
          .features2-tabs-menu {
            order: 2;
          }
        }
      `}</style>
    </>
  );
};

export default Features2;
