'use client';

import React from 'react';
// import { useTranslations } from 'next-intl';

type StepsProps = {
  step1Title?: string;
  step1Description?: string;
  step2Title?: string;
  step2Description?: string;
  step3Title?: string;
  step3Description?: string;
  step4Title?: string;
  step4Description?: string;
};

const Steps: React.FC<StepsProps> = ({
  step1Title = 'Create Account',
  step1Description = 'Sign up for an account to access the platform.',
  step2Title = 'Add Security Guards',
  step2Description = 'Input details and assign roles for security personnel.',
  step3Title = 'Set Up Geo-Fencing',
  step3Description = 'Define virtual boundaries and receive alerts when guards breach them.',
  step4Title = 'Monitor in Real Time',
  step4Description = 'Track guard locations, attendance, and incidents live on the dashboard.',
}) => {
  return (
    <div className="steps-container1 thq-section-padding">
      <div className="steps-max-width thq-section-max-width">
        <div className="steps-container2 thq-grid-2">
          <div className="steps-section-header">
            <h2 className="thq-heading-2">Discover the Power of Our Products</h2>
            <p className="thq-body-large">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat.
            </p>
            <div className="steps-actions">
              <button className="thq-button-animated thq-button-filled steps-button">
                <span className="thq-body-small">Main action</span>
              </button>
            </div>
          </div>
          <div className="steps-container3">
            {[{ title: step1Title, description: step1Description, num: '01' },
              { title: step2Title, description: step2Description, num: '02' },
              { title: step3Title, description: step3Description, num: '03' },
              { title: step4Title, description: step4Description, num: '04' }]
              .map((step, index) => (
                <div
                  key={index}
                  className={`steps-container${index + 4} thq-card`}
                  style={{ transform: index % 2 === 0 ? 'rotate(-2deg)' : 'rotate(2deg)' }}
                >
                  <h2 className="thq-heading-2">{step.title}</h2>
                  <span className="steps-text thq-body-small">{step.description}</span>
                  <label className="steps-number thq-heading-3">{step.num}</label>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
