import React from 'react';
import Link from "next/link";

interface CTAProps {
  heading1?: string;
  content1?: string;
  action1?: string;
}

const CTA: React.FC<CTAProps> = ({
  heading1 = 'Improve Urban Security Today',
  content1 = 'Enhance transparency, coordination, and oversight with our comprehensive security solution.',
  action1 = 'Get Started Now',
}) => {
  return (
    <div className="thq-section-padding">
      <div className="thq-section-max-width">
        <div className="cta-accent2-bg">
          <div className="cta-accent1-bg">
            <div className="cta-container2">
              <div className="cta-content">
                <span className="thq-heading-2">{heading1}</span>
                <p className="thq-body-large">{content1}</p>
                <div className="cta-actions">
                <Link href="/signin">
                  <button type="button" className="thq-button-filled cta-button">
                    {action1}
                  </button>
                </Link>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cta-accent2-bg {
          gap: var(--dl-space-space-oneandhalfunits);
          display: flex;
          align-self: stretch;
          transition: 0.3s;
          align-items: center;
          border-radius: var(--dl-radius-radius-cardradius);
          justify-content: space-between;
          background-color: var(--dl-color-theme-accent2);
        }
        .cta-accent2-bg:hover {
          transform: scale3d(1.1, 1.1, 1.1);
        }
        .cta-accent1-bg {
          width: 100%;
          display: flex;
          align-items: center;
          border-radius: var(--dl-radius-radius-cardradius);
          justify-content: space-between;
          background-color: var(--dl-color-theme-accent1);
        }
        .cta-container2 {
          gap: var(--dl-space-space-threeunits);
          width: 100%;
          display: flex;
          transition: 0.3s;
          align-items: center;
          padding: var(--dl-space-space-sixunits) var(--dl-space-space-fourunits);
          border-radius: var(--dl-radius-radius-cardradius);
        }
        .cta-container2:hover {
          color: var(--dl-color-theme-neutral-light);
          background-color: var(--dl-color-theme-neutral-dark);
        }
        .cta-content {
          gap: var(--dl-space-space-oneandhalfunits);
          display: flex;
          align-items: flex-start;
          flex-direction: column;
        }
        .cta-actions {
          gap: var(--dl-space-space-oneandhalfunits);
          flex: 1;
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
        }
        @media (max-width: 767px) {
          .cta-container2 {
            gap: var(--dl-space-space-oneandhalfunits);
            flex-direction: column;
            justify-content: flex-start;
          }
        }
        @media (max-width: 479px) {
          .cta-actions {
            flex-wrap: wrap;
            align-self: stretch;
            justify-content: center;
          }
          .cta-button {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default CTA;