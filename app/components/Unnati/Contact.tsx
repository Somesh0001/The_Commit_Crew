'use client';

import React from 'react';

type ContactProps = {
  content2: string;
  email1: string;
  address1: string;
  content3: string;
  content1: string;
  content4: string;
  heading1: string;
  content5: string;
  phone1: string;
};

const Contact: React.FC<ContactProps> = ({
  content2,
  email1,
  address1,
  content3,
  content1,
  content4,
  heading1,
  content5,
  phone1,
}) => {
  return (
    <div className="flex flex-col items-center p-8 space-y-8">
      <div className="max-w-3xl text-center">
        <span className="text-sm text-gray-600">{content2}</span>
        <h2 className="text-2xl font-bold">{heading1}</h2>
        <p className="text-lg text-gray-700">{content1}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <ContactInfo icon="M854 342v-86l-342 214-342-214v86l342 212zM854 170q34 0 59 26t25 60v512q0 34-25 60t-59 26h-684q-34 0-59-26t-25-60v-512q0-34 25-60t59-26h684z" title="Email" content={content3} value={email1} />
        <ContactInfo icon="M282 460q96 186 282 282l94-94q20-20 44-10 72 24 152 24 18 0 30 12t12 30v150q0 18-12 30t-30 12q-300 0-513-213t-213-513q0-18 12-30t30-12h150q18 0 30 12t12 30q0 80 24 152 8 26-10 44z" title="Phone" content={content4} value={phone1} />
        <ContactInfo icon="M512 0c-176.732 0-320 143.268-320 320 0 320 320 704 320 704s320-384 320-704c0-176.732-143.27-320-320-320zM512 512c-106.040 0-192-85.96-192-192s85.96-192 192-192 192 85.96 192 192-85.96 192-192 192z" title="Office" content={content5} value={address1} />
      </div>
    </div>
  );
};

const ContactInfo: React.FC<{ icon: string; title: string; content: string; value: string }> = ({
  icon,
  title,
  content,
  value,
}) => {
  return (
    <div className="flex flex-col items-center space-y-4 p-4 border rounded-lg shadow-sm">
      <svg viewBox="0 0 1024 1024" className="w-8 h-8 text-blue-500">
        <path d={icon}></path>
      </svg>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 text-center">{content}</p>
      <span className="text-sm font-medium text-gray-800">{value}</span>
    </div>
  );
};

export default Contact;
