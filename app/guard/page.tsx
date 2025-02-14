import Link from 'next/link';
import React from 'react'
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaBuilding, FaHome, FaCalendar, FaClock, FaShieldAlt } from 'react-icons/fa';
const page = () => {
  
    const guardData ={
      _id: "1",
      role: "guard",
      name: "Rohan Sharma",
      email: "rohan.sharma@example.com",
      age: 28,
      phone: "9876543210",
      aadhar: "123456789012",
      society: "Gokuldham",
      address: "B-102, Gokuldham Society, Mumbai",
      approved: true,
      setDuty: null,
      createdAt: "2025-02-14T08:30:00.000Z",
      updatedAt: "2025-02-14T08:30:00.000Z",
    }
  
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 py-8 px-4">
        <div className=" bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-blue-600 p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full">
                <FaShieldAlt className="text-blue-600 text-3xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{guardData.name}</h1>
                <p className="text-blue-100">{guardData.role.toUpperCase()}</p>
              </div>
            </div>
            <div className="text-center mt-4">
            <Link
              href="/api/auth/signout"
              className="font-bold text-2xl bg-[#FF9D23] rounded-lg text-white px-4 py-2 w-fit"
            >
              Logout
            </Link>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              guardData.approved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {guardData.approved ? 'Approved' : 'Pending Approval'}
            </span>
            
          </div>
  
          {/* Profile Content */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaUser className="text-gray-400 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-medium">{guardData.age} years</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-gray-400 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium break-all">{guardData.email}</p>
                </div>
              </div>
  
              <div className="flex items-center space-x-3">
                <FaPhone className="text-gray-400 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{guardData.phone}</p>
                </div>
              </div>
  
              <div className="flex items-center space-x-3">
                <FaIdCard className="text-gray-400 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Aadhar Number</p>
                  <p className="font-medium">{guardData.aadhar}</p>
                </div>
              </div>
            </div>
  
            {/* Society Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaBuilding className="text-gray-400 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Society</p>
                  <p className="font-medium">{guardData.society}</p>
                </div>
              </div>
  
              <div className="flex items-center space-x-3">
                <FaHome className="text-gray-400 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{guardData.address}</p>
                </div>
              </div>
  
              <div className="flex items-center space-x-3">
                <FaCalendar className="text-gray-400 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium">
                    {new Date(guardData.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
  
              <div className="flex items-center space-x-3">
                <FaClock className="text-gray-400 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="font-medium">
                    {new Date(guardData.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
  
          {/* Duty Section */}
          <div className="bg-gray-50 px-8 py-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Duty Schedule</p>
                <p className="font-medium">
                  {guardData.setDuty || "Not assigned"}
                </p>
              </div>
              
            </div>
          </div>
        </div>
      </div>
  )
}

export default page