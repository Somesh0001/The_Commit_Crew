import React, { useState } from "react";
import PropTypes from "prop-types";

interface FeaturesProps {
  feature1Title: string;
  feature1Description: string;
  feature1ImgSrc: string;
  feature1ImgAlt: string;
  feature2Title: string;
  feature2Description: string;
  feature2ImgSrc: string;
  feature2ImgAlt: string;
  feature3Title: string;
  feature3Description: string;
  feature3ImgSrc: string;
  feature3ImgAlt: string;
}

const Features2: React.FC<FeaturesProps> = (props) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="thq-section-padding">
      <div className="features2-container2 thq-section-max-width">
        <div className="features2-tabs-menu">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              onClick={() => setActiveTab(index)}
              className={`features2-tab-horizontal${index + 1}`}
            >
              <div className={`features2-divider-container${index + 1}`}>
                {activeTab === index && <div className={`features2-container${index + 3}`}></div>}
              </div>
              <div className={`features2-content${index + 1}`}>
                <h2 className="thq-heading-2">{props[`feature${index + 1}Title`]}</h2>
                <span className="thq-body-small">{props[`feature${index + 1}Description`]}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="features2-image-container">
          {[0, 1, 2].map(
            (index) =>
              activeTab === index && (
                <img
                  key={index}
                  alt={props[`feature${index + 1}ImgAlt`]}
                  src={props[`feature${index + 1}ImgSrc`]}
                  className={`features2-image${index + 1} thq-img-ratio-16-9`}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
};

Features2.defaultProps = {
  feature1Title: "Feature #1",
  feature1Description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  feature1ImgSrc:
    "https://images.unsplash.com/photo-1494026222377-872a605b54ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  feature1ImgAlt: "feature 1",
  feature2Title: "Live Location Tracking",
  feature2Description:
    "Track guards in real time via GPS to ensure their whereabouts and monitor their movements for enhanced security.",
  feature2ImgSrc:
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  feature2ImgAlt: "Live Location Tracking Image",
  feature3Title: "Feature #3",
  feature3Description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  feature3ImgSrc:
    "https://images.unsplash.com/photo-1468779065891-103dac4a7c48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  feature3ImgAlt: "image",
};

export default Features2;
