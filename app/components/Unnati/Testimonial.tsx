'use client';

import React from 'react';

type TestimonialProps = {
  heading1: string;
  content1: string;
  testimonials: {
    alt: string;
    src: string;
    name: string;
    position: string;
    review: string;
  }[];
};

const Testimonial: React.FC<TestimonialProps> = ({
  heading1 = 'What Our Clients Say',
  content1 = 'Here are some reviews from our happy customers.',
  testimonials = [
    {
      alt: 'Image of John Doe',
      src: 'https://example.com/image1.jpg',
      name: 'John Doe',
      position: 'CEO, Company ABC',
      review: 'Great product, really helped our business!',
    },
    {
      alt: 'Image of Jane Smith',
      src: 'https://example.com/image2.jpg',
      name: 'Jane Smith',
      position: 'Security Supervisor',
      review: 'Security has improved drastically.',
    },
    {
      alt: 'Image of Michael Johnson',
      src: 'https://example.com/image3.jpg',
      name: 'Michael Johnson',
      position: 'Manager',
      review: 'Fantastic customer service and support.',
    },
    {
      alt: 'Image of Sarah Lee',
      src: 'https://example.com/image4.jpg',
      name: 'Sarah Lee',
      position: 'Business Owner',
      review: 'Highly recommend to any business owner.',
    },
  ],
}) => {
  return (
    <div className="thq-section-padding">
      <div className="testimonial-max-width thq-section-max-width">
        <div className="testimonial-container10">
          <h2 className="thq-heading-2">{heading1}</h2>
          <span className="testimonial-text11 thq-body-small">{content1}</span>
        </div>
        <div className="thq-grid-2">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="thq-animated-card-bg-2">
              <div className="thq-animated-card-bg-1">
                <div data-animated="true" className="thq-card testimonial-card">
                  <div className="testimonial-container">
                    <img
                      alt={testimonial.alt}
                      src={testimonial.src}
                      className="testimonial-image"
                    />
                    <div className="testimonial-info">
                      <strong className="thq-body-large">{testimonial.name}</strong>
                      <span className="thq-body-small">{testimonial.position}</span>
                    </div>
                  </div>
                  <span className="testimonial-text thq-body-small">{testimonial.review}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
