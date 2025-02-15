import Link from 'next/link';
import { JSX } from 'react';
import React from 'react'
import { FaShieldAlt, FaMapMarkerAlt, FaRegClock, FaPhoneAlt, FaEnvelope, FaIdCard } from 'react-icons/fa';
import { MdEdit, MdAssignmentInd } from 'react-icons/md';
interface OfficerData {
  _id: string;
  role: string;
  name: string;
  email: string;
  age: number;
  phone: string;
  aadhar: string;
  society: string;
  address: string;
  approved: boolean;
  setDuty: string | null;
  createdAt: string;
  updatedAt: string;
}

interface InfoItemProps {
  icon: JSX.Element;
  label: string;
  value: string | number;
}

interface DetailCardProps {
  title: string;
  value: string;
}

const page = () => {
  const officerData = {
    _id: "1",
    role: "police",
    name: "Rohan Sharma",
    email: "rohan.sharma@example.com",
    age: 28,
    phone: "9876543210",
    aadhar: "1234-5678-9012",
    society: "Gokuldham",
    address: "B-102, Gokuldham Society, Mumbai",
    approved: false,
    setDuty: null,
    createdAt: "2025-02-14T08:30:00.000Z",
    updatedAt: "2025-02-14T08:30:00.000Z",
  };


  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };
  return (
    <div className="min-h-screen w-full bg-gray-100 p-4 md:p-8">
      <div className=" bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-900 text-white p-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <FaShieldAlt className="text-yellow-400" />
              {officerData.name}
            </h1>
            <p className="text-blue-200 mt-1">{officerData.role.toUpperCase()}</p>
          </div>
          <div className="text-center mt-4">
            <Link
              href="/api/auth/signout"
              className="font-bold text-2xl bg-[#FF9D23] rounded-lg text-white px-4 py-2 w-fit"
            >
              Logout
            </Link>
            </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8 p-8">
          {/* Left Column - Personal Info */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaIdCard className="text-blue-600 text-2xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Police ID</p>
                  <p className="font-semibold">{officerData._id}</p>
                </div>
              </div>

              <div className="space-y-3">
                <InfoItem icon={<FaRegClock />} label="Age" value={officerData.age} />
                <InfoItem icon={<FaPhoneAlt />} label="Phone" value={officerData.phone} />
                <InfoItem icon={<FaEnvelope />} label="Email" value={officerData.email} />
              </div>
            </div>

            
          </div>

          {/* Right Column - Professional Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-600" />
                Assignment Details
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <DetailCard title="Current Society" value={officerData.society} />
                <DetailCard title="Duty Status" value={officerData.setDuty || 'Not on Duty'} />
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Assigned Address</p>
                  <p className="font-medium">{officerData.address}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MdAssignmentInd />
                Aadhar Information
              </h3>
              <p className="font-mono text-gray-700 bg-blue-100 p-3 rounded-lg">
                {officerData.aadhar}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Profile Created</p>
                <p className="font-medium">{formatDate(officerData.createdAt)}</p>
              </div>
              <div>
                <p className="text-gray-500">Last Updated</p>
                <p className="font-medium">{formatDate(officerData.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
        
        </div>
      </div>
    </div>
  )
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <span className="text-blue-600">{icon}</span>
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

const DetailCard: React.FC<DetailCardProps> = ({ title, value }) => (
  <div>
    <p className="text-sm text-gray-600">{title}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default page