import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

interface PricingProps {
  content1?: string
  heading1?: string
  content2?: string
  plan1?: string
  plan1Price?: string
  plan1Yearly?: string
  plan1Feature1?: string
  plan1Feature2?: string
  plan1Feature3?: string
  plan1Action?: string
  plan2?: string
  plan2Price?: string
  plan2Yearly?: string
  plan2Feature1?: string
  plan2Feature2?: string
  plan2Feature3?: string
  plan2Feature4?: string
  plan2Action?: string
  plan3?: string
  plan3Price?: string
  plan3Yearly?: string
  plan3Feature1?: string
  plan3Feature2?: string
  plan3Feature3?: string
  plan3Feature4?: string
  plan3Feature5?: string
  plan3Action?: string
  plan11?: string
  plan1Price1?: string
  plan1Yearly1?: string
  plan1Feature11?: string
  plan1Feature21?: string
  plan1Feature31?: string
  plan1Action1?: string
  plan21?: string
  plan2Price1?: string
  plan2Yearly1?: string
  plan2Feature11?: string
  plan2Feature21?: string
  plan2Feature31?: string
  plan2Feature41?: string
  plan2Action1?: string
  plan31?: string
  plan3Price1?: string
  plan3Yearly1?: string
  plan3Feature11?: string
  plan3Feature21?: string
  plan3Feature31?: string
  plan3Feature41?: string
  plan3Feature51?: string
  plan3Action1?: string
}

const Pricing: React.FC<PricingProps> = ({
  content1 = 'Choose the perfect plan for you',
  heading1 = 'Pricing plan',
  content2 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  plan1 = 'Basic Plan',
  plan1Price = '$50/month',
  plan1Yearly = '$500/year',
  plan1Feature1 = 'Security Guard Database',
  plan1Feature2 = 'Attendance & Shift Monitoring',
  plan1Feature3 = 'Incident Reporting',
  plan1Action = 'Sign Up Now',
  plan2 = 'Standard Plan',
  plan2Price = '$100/month',
  plan2Yearly = '$1000/year',
  plan2Feature1 = 'Live Location Tracking',
  plan2Feature2 = 'Multi-Level Access Control',
  plan2Feature3 = 'Incident Reporting',
  plan2Feature4 = 'Geo-Fencing & Alerts',
  plan2Action = 'Sign Up Now',
  plan3 = 'Premium Plan',
  plan3Price = '$150/month',
  plan3Yearly = '$1500/year',
  plan3Feature1 = 'Live Location Tracking',
  plan3Feature2 = 'Multi-Level Access Control',
  plan3Feature3 = 'Incident Reporting',
  plan3Feature4 = 'Geo-Fencing & Alerts',
  plan3Feature5 = 'Predictive Deployment',
  plan3Action = 'Sign Up Now',
  plan11 = 'Basic plan',
  plan1Price1 = '$200/yr',
  plan1Yearly1 = 'or $20 monthly',
  plan1Feature11 = 'Multi-Level Access Control',
  plan1Feature21 = 'Geo-Fencing & Alerts',
  plan1Feature31 = 'Predictive Deployment',
  plan1Action1 = 'Get started',
  plan21 = 'Business plan',
  plan2Price1 = '$299/yr',
  plan2Yearly1 = 'or $29 monthly',
  plan2Feature11 = 'Attendance & Shift Monitoring',
  plan2Feature21 = 'Predictive Deployment',
  plan2Feature31 = 'Security Guard Database',
  plan2Feature41 = 'Feature text goes here',
  plan2Action1 = 'Get started',
  plan31 = 'Enterprise plan',
  plan3Price1 = '$499/yr',
  plan3Yearly1 = 'or $49 monthly',
  plan3Feature11 = 'Security Guard Database',
  plan3Feature21 = 'Attendance & Shift Monitoring',
  plan3Feature31 = '',
  plan3Feature41 = 'Geo-Fencing & Alerts',
  plan3Feature51 = 'Feature text goes here',
  plan3Action1 = 'Get started',
}) => {
  const [isMonthly, setIsMonthly] = useState<boolean>(true)

  return (
    <>
      <div className="pricing-pricing23 thq-section-padding">
        <div className="pricing-max-width thq-section-max-width">
          <div className="pricing-section-title">
            <span className="pricing-text10 thq-body-small">
              {content1}
            </span>
            <div className="pricing-content">
              <h2 className="pricing-text11 thq-heading-2">{heading1}</h2>
              <p className="pricing-text12 thq-body-large">{content2}</p>
            </div>
          </div>
          <div className="pricing-tabs">
            {isMonthly ? (
              <button
                onClick={() => setIsMonthly(true)}
                className="pricing-button10 thq-button-animated thq-button-filled"
              >
                <span className="thq-body-small">Monthly</span>
              </button>
            ) : (
              <button
                onClick={() => setIsMonthly(true)}
                className="pricing-button11 thq-button-outline thq-button-animated"
              >
                <span className="thq-body-small">Monthly</span>
              </button>
            )}
            {isMonthly ? (
              <button
                onClick={() => setIsMonthly(false)}
                className="pricing-button13 thq-button-outline thq-button-animated"
              >
                <span className="thq-body-small">Yearly</span>
              </button>
            ) : (
              <button
                onClick={() => setIsMonthly(false)}
                className="pricing-button12 thq-button-animated thq-button-filled"
              >
                <span className="thq-body-small">Yearly</span>
              </button>
            )}
          </div>
          {isMonthly && (
            <div className="pricing-container1">
              <div className="pricing-column pricing-column1 thq-card">
                <div className="pricing-price10">
                  <div className="pricing-price11">
                    <p className="pricing-text17 thq-body-large">{plan1}</p>
                    <h3 className="pricing-text18 thq-heading-3">
                      {plan1Price}
                    </h3>
                    <p className="thq-body-large">{plan1Yearly}</p>
                  </div>
                  <div className="pricing-list1">
                    <div className="pricing-list-item10">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {plan1Feature1}
                      </span>
                    </div>
                    <div className="pricing-list-item11">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {plan1Feature2}
                      </span>
                    </div>
                    <div className="pricing-list-item12">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {plan1Feature3}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="pricing-button14 thq-button-outline thq-button-animated">
                  <span className="thq-body-small">{plan1Action}</span>
                </button>
              </div>
              <div className="pricing-column pricing-column2 thq-card">
                <div className="pricing-price12">
                  <div className="pricing-price13">
                    <p className="pricing-text24 thq-body-large">{plan2}</p>
                    <h3 className="pricing-text25 thq-heading-3">
                      {plan2Price}
                    </h3>
                    <p className="thq-body-large">{plan2Yearly}</p>
                  </div>
                  <div className="pricing-list2">
                    <div className="pricing-list-item13">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {plan2Feature1}
                      </span>
                    </div>
                    <div className="pricing-list-item14">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {plan2Feature2}
                      </span>
                    </div>
                    <div className="pricing-list-item15">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {plan2Feature3}
                      </span>
                    </div>
                    <div className="pricing-list-item16">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {plan2Feature4}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="pricing-button15 thq-button-animated thq-button-filled">
                  <span className="thq-body-small">{plan2Action}</span>
                </button>
              </div>
              <div className="pricing-column pricing-column3 thq-card">
                <div className="pricing-price14">
                  <div className="pricing-price15">
                    <p className="pricing-text32 thq-body-large">{plan3}</p>
                    <h3 className="pricing-text33 thq-heading-3">
                      {plan3Price}
                    </h3>
                    <p className="thq-body-large">{plan3Yearly}</p>
                  </div>
                  <div className="pricing-list3">
                    <div className="pricing-list-item17">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {plan3Feature1}
                      </span>
                    </div>
                    <div className="pricing-list-item18">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {plan3Feature2}
                      </span>
                    </div>
                    <div className="pricing-list-item19">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {plan3Feature3}
                      </span>
                    </div>
                    <div className="pricing-list-item20">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {plan3Feature4}
                      </span>
                    </div>
                    <div className="pricing-list-item21">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {plan3Feature5}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="pricing-button16 thq-button-animated thq-button-filled">
                  <span className="thq-body-small">{plan3Action}</span>
                </button>
              </div>
            </div>
          )}
          {!isMonthly && (
            <div className="pricing-container2">
              {/* Yearly pricing markup (if needed) would follow a similar structure */}
              <div className="pricing-column pricing-column4 thq-card">
                <div className="pricing-price16">
                  <div className="pricing-price17">
                    <span className="pricing-text41 thq-body-large">
                      {plan11}
                    </span>
                    <h3 className="pricing-text42 thq-heading-3">
                      {plan1Price1}
                    </h3>
                    <span className="thq-body-large">{plan1Yearly1}</span>
                  </div>
                  <div className="pricing-list4">
                    <div className="pricing-list-item22">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {plan1Feature11}
                      </span>
                    </div>
                    <div className="pricing-list-item23">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {plan1Feature21}
                      </span>
                    </div>
                    <div className="pricing-list-item24">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {plan1Feature31}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="pricing-button17 thq-button-outline thq-button-animated">
                  <span className="thq-body-small">{plan1Action1}</span>
                </button>
              </div>
              <div className="pricing-column pricing-column5 thq-card">
                <div className="pricing-price18">
                  <div className="pricing-price19">
                    <span className="pricing-text48 thq-body-large">
                      {plan21}
                    </span>
                    <h3 className="pricing-text49 thq-heading-3">
                      {plan2Price1}
                    </h3>
                    <span className="thq-body-large">{plan2Yearly1}</span>
                  </div>
                  <div className="pricing-list5">
                    <div className="pricing-list-item25">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {plan2Feature11}
                      </span>
                    </div>
                    <div className="pricing-list-item26">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {plan2Feature21}
                      </span>
                    </div>
                    <div className="pricing-list-item27">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {plan2Feature31}
                      </span>
                    </div>
                    <div className="pricing-list-item28">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {plan2Feature41}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="pricing-button18 thq-button-animated thq-button-filled">
                  <span className="thq-body-small">{plan2Action1}</span>
                </button>
              </div>
              <div className="pricing-column pricing-column6 thq-card">
                <div className="pricing-price20">
                  <div className="pricing-price21">
                    <span className="pricing-text56 thq-body-large">
                      {plan31}
                    </span>
                    <h3 className="pricing-text57 thq-heading-3">
                      {plan3Price1}
                    </h3>
                    <span className="thq-body-large">{plan3Yearly1}</span>
                  </div>
                  <div className="pricing-list6">
                    <div className="pricing-list-item29">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {plan3Feature11}
                      </span>
                    </div>
                    <div className="pricing-list-item30">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {plan3Feature21}
                      </span>
                    </div>
                    <div className="pricing-list-item31">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {plan3Feature31}
                      </span>
                    </div>
                    <div className="pricing-list-item32">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {plan3Feature41}
                      </span>
                    </div>
                    <div className="pricing-list-item33">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {plan3Feature51}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="pricing-button19 thq-button-animated thq-button-filled">
                  <span className="thq-body-small">{plan3Action1}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx>
        {`
          .pricing-pricing23 {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .pricing-max-width {
            gap: var(--dl-space-space-threeunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .pricing-section-title {
            gap: var(--dl-space-space-unit);
            width: 100%;
            display: flex;
            max-width: 800px;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .pricing-text10 {
            text-align: center;
          }
          .pricing-content {
            gap: var(--dl-space-space-oneandhalfunits);
            width: 100%;
            display: flex;
            max-width: 800px;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .pricing-text11 {
            text-align: center;
          }
          .pricing-text12 {
            text-align: center;
          }
          .pricing-tabs {
            display: flex;
            align-items: flex-start;
          }
          .pricing-button10 {
            gap: var(--dl-space-space-halfunit);
            color: var(--dl-color-theme-neutral-light);
            width: 120px;
            height: 60px;
            border-top-left-radius: var(--dl-radius-radius-buttonradius);
            border-top-right-radius: 0;
            border-bottom-left-radius: var(--dl-radius-radius-buttonradius);
            border-bottom-right-radius: 0;
          }
          .pricing-button11 {
            gap: var(--dl-space-space-halfunit);
            width: 120px;
            height: 60px;
            border-style: solid;
            border-top-left-radius: var(--dl-radius-radius-buttonradius);
            border-top-right-radius: 0;
            border-bottom-left-radius: var(--dl-radius-radius-buttonradius);
            border-bottom-right-radius: 0;
          }
          .pricing-button12 {
            gap: var(--dl-space-space-halfunit);
            color: var(--dl-color-theme-neutral-light);
            width: 120px;
            height: 60px;
            border-top-left-radius: 0;
            border-top-right-radius: var(--dl-radius-radius-buttonradius);
            border-bottom-left-radius: 0;
            border-bottom-right-radius: var(--dl-radius-radius-buttonradius);
          }
          .pricing-button13 {
            gap: var(--dl-space-space-halfunit);
            width: 120px;
            height: 60px;
            border-style: solid;
            border-top-left-radius: 0;
            border-top-right-radius: var(--dl-radius-radius-buttonradius);
            border-bottom-left-radius: 0;
            border-bottom-right-radius: var(--dl-radius-radius-buttonradius);
          }
          .pricing-container1 {
            gap: var(--dl-space-space-twounits);
            width: 100%;
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
            animation-name: fadeIn;
            animation-delay: 0s;
            animation-duration: 300ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-timing-function: ease;
          }
          .pricing-column1 {
            gap: var(--dl-space-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            flex-grow: 1;
            align-self: stretch;
            align-items: center;
            border-color: var(--dl-color-theme-neutral-dark);
            border-style: solid;
            border-width: 1px;
            flex-direction: column;
          }
          .pricing-price10 {
            gap: var(--dl-space-space-twounits);
            display: flex;
            flex-grow: 1;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .pricing-price11 {
            gap: var(--dl-space-space-halfunit);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .pricing-text17 {
            font-style: normal;
            font-weight: 600;
          }
          .pricing-text18 {
            font-size: 48px;
          }
          .pricing-list1 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .pricing-list-item10 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing-list-item11 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing-list-item12 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing-button14 {
            width: 100%;
          }
          .pricing-column2 {
            gap: var(--dl-space-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            flex-grow: 1;
            align-self: stretch;
            align-items: center;
            border-color: var(--dl-color-theme-neutral-dark);
            border-style: solid;
            border-width: 1px;
            flex-direction: column;
            background-color: var(--dl-color-theme-accent1);
          }
          .pricing-price12 {
            gap: var(--dl-space-space-twounits);
            display: flex;
            flex-grow: 1;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .pricing-price13 {
            gap: var(--dl-space-space-halfunit);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .pricing-text24 {
            font-style: normal;
            font-weight: 600;
          }
          .pricing-text25 {
            font-size: 48px;
          }
          .pricing-list2 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .pricing-list-item13 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing-list-item14 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing-list-item15 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing-list-item16 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing-button15 {
            width: 100%;
          }
          .pricing-column3 {
            gap: var(--dl-space-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            flex-grow: 1;
            align-items: center;
            flex-shrink: 0;
            border-color: var(--dl-color-theme-neutral-dark);
            border-style: solid;
            border-width: 1px;
            flex-direction: column;
            background-color: var(--dl-color-theme-accent2);
          }
          .pricing-price14 {
            gap: var(--dl-space-space-twounits);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .pricing-price15 {
            gap: var(--dl-space-space-halfunit);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .pricing-text32 {
            font-style: normal;
            font-weight: 600;
          }
          .pricing-text33 {
            font-size: 48px;
          }
          .pricing-list3 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .pricing-list-item17 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing-list-item18 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing-list-item19 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing-list-item20 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing-list-item21 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing-button16 {
            width: 100%;
          }
          .pricing-container2 {
            gap: 32px;
            width: 100%;
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
            animation-name: fadeIn;
            animation-delay: 0s;
            animation-duration: 300ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-timing-function: ease;
          }
          .pricing-column4 {
            gap: var(--dl-space-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            flex-grow: 1;
            align-self: stretch;
            align-items: center;
            border-color: var(--dl-color-theme-neutral-dark);
            border-style: solid;
            border-width: 1px;
            flex-direction: column;
          }
          .pricing-price16 {
            gap: var(--dl-space-space-twounits);
            display: flex;
            flex-grow: 1;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .pricing-price17 {
            gap: var(--dl-space-space-halfunit);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .pricing-text41 {
            font-style: normal;
            font-weight: 600;
          }
          .pricing-text42 {
            font-size: 48px;
          }
          .pricing-list4 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .pricing-list-item22 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing-list-item23 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing-list-item24 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing-button17 {
            width: 100%;
          }
          .pricing-column5 {
            gap: var(--dl-space-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            flex-grow: 1;
            align-self: stretch;
            align-items: center;
            border-color: var(--dl-color-theme-neutral-dark);
            border-style: solid;
            border-width: 1px;
            flex-direction: column;
            background-color: var(--dl-color-theme-accent1);
          }
          .pricing-price18 {
            gap: var(--dl-space-space-twounits);
            display: flex;
            flex-grow: 1;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .pricing-price19 {
            gap: var(--dl-space-space-halfunit);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .pricing-text48 {
            font-style: normal;
            font-weight: 600;
          }
          .pricing-text49 {
            font-size: 48px;
          }
          .pricing-list5 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .pricing-list-item25 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing-list-item26 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing-list-item27 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing-list-item28 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing-button18 {
            width: 100%;
          }
          .pricing-column6 {
            gap: var(--dl-space-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            flex-grow: 1;
            align-items: center;
            flex-shrink: 0;
            border-color: var(--dl-color-theme-neutral-dark);
            border-style: solid;
            border-width: 1px;
            flex-direction: column;
            background-color: var(--dl-color-theme-accent2);
          }
          .pricing-price20 {
            gap: var(--dl-space-space-twounits);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .pricing-price21 {
            gap: var(--dl-space-space-halfunit);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .pricing-text56 {
            font-style: normal;
            font-weight: 600;
          }
          .pricing-text57 {
            font-size: 48px;
          }
          .pricing-list6 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .pricing-list-item29 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing-list-item30 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing-list-item31 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing-list-item32 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing-list-item33 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing-button19 {
            width: 100%;
          }
          @media (max-width: 991px) {
            .pricing-container1 {
              flex-direction: column;
            }
            .pricing-column3 {
              width: 100%;
            }
            .pricing-container2 {
              flex-direction: column;
            }
            .pricing-column6 {
              width: 100%;
            }
          }
          @media (max-width: 479px) {
            .pricing-max-width {
              gap: var(--dl-space-space-oneandhalfunits);
            }
          }
        `}
      </style>
    </>
  )
}

Pricing.defaultProps = {
  plan3Price: '$150/month',
  plan3Action: 'Sign Up Now',
  plan11: 'Basic plan',
  plan1Action: 'Sign Up Now',
  plan31: 'Enterprise plan',
  plan3Feature41: 'Feature text goes here',
  plan1Feature2: 'Attendance & Shift Monitoring',
  plan2Feature11: 'Attendance & Shift Monitoring',
  plan3Feature51: 'Feature text goes here',
  plan2Feature41: 'Feature text goes here',
  plan2Feature2: 'Multi-Level Access Control',
  plan3Feature21: 'Attendance & Shift Monitoring',
  plan2Feature4: 'Geo-Fencing & Alerts',
  plan2Yearly: '$1000/year',
  plan1Action1: 'Get started',
  plan2Action: 'Sign Up Now',
  plan3Feature1: 'Live Location Tracking',
  plan2Feature3: 'Incident Reporting',
  plan1Price1: '$200/yr',
  plan2: 'Standard Plan',
  plan2Feature21: 'Predictive Deployment',
  plan2Action1: 'Get started',
  plan3Feature2: 'Multi-Level Access Control',
  content1: 'Choose the perfect plan for you',
  plan2Feature1: 'Live Location Tracking',
  heading1: 'Pricing plan',
  plan3Feature31: '',
  plan1: 'Basic Plan',
  plan21: 'Business plan',
  plan1Feature11: 'Multi-Level Access Control',
  plan1Feature21: 'Geo-Fencing & Alerts',
  plan3Feature5: 'Predictive Deployment',
  plan2Yearly1: 'or $29 monthly',
  plan2Price: '$100/month',
  plan3Yearly1: 'or $49 monthly',
  plan2Feature31: 'Security Guard Database',
  plan3Feature11: 'Security Guard Database',
  plan1Yearly1: 'or $20 monthly',
  plan2Price1: '$299/yr',
  plan3Yearly: '$1500/year',
  plan3Feature4: 'Geo-Fencing & Alerts',
  plan3Price1: '$499/yr',
  plan1Feature31: 'Predictive Deployment',
  plan1Feature3: 'Incident Reporting',
  plan1Yearly: '$500/year',
  plan1Feature1: 'Security Guard Database',
  plan3Feature3: 'Incident Reporting',
  content2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  plan3Action1: 'Get started',
  plan1Price: '$50/month',
  plan3: 'Premium Plan',
}

Pricing.propTypes = {
  plan3Price: PropTypes.string,
  plan3Action: PropTypes.string,
  plan11: PropTypes.string,
  plan1Action: PropTypes.string,
  plan31: PropTypes.string,
  plan3Feature41: PropTypes.string,
  plan1Feature2: PropTypes.string,
  plan2Feature11: PropTypes.string,
  plan3Feature51: PropTypes.string,
  plan2Feature41: PropTypes.string,
  plan2Feature2: PropTypes.string,
  plan3Feature21: PropTypes.string,
  plan2Feature4: PropTypes.string,
  plan2Yearly: PropTypes.string,
  plan1Action1: PropTypes.string,
  plan2Action: PropTypes.string,
  plan3Feature1: PropTypes.string,
  plan2Feature3: PropTypes.string,
  plan1Price1: PropTypes.string,
  plan2: PropTypes.string,
  plan2Feature21: PropTypes.string,
  plan2Action1: PropTypes.string,
  plan3Feature2: PropTypes.string,
  content1: PropTypes.string,
  plan2Feature1: PropTypes.string,
  heading1: PropTypes.string,
  plan3Feature31: PropTypes.string,
  plan1: PropTypes.string,
  plan21: PropTypes.string,
  plan1Feature11: PropTypes.string,
  plan1Feature21: PropTypes.string,
  plan3Feature5: PropTypes.string,
  plan2Yearly1: PropTypes.string,
  plan2Price: PropTypes.string,
  plan3Yearly1: PropTypes.string,
  plan2Feature31: PropTypes.string,
  plan3Feature11: PropTypes.string,
  plan1Yearly1: PropTypes.string,
  plan2Price1: PropTypes.string,
  plan3Yearly: PropTypes.string,
  plan3Feature4: PropTypes.string,
  plan3Price1: PropTypes.string,
  plan1Feature31: PropTypes.string,
  plan1Feature3: PropTypes.string,
  plan1Yearly: PropTypes.string,
  plan1Feature1: PropTypes.string,
  plan3Feature3: PropTypes.string,
  content2: PropTypes.string,
  plan3Action1: PropTypes.string,
  plan1Price: PropTypes.string,
  plan3: PropTypes.string,
}

export default Pricing
