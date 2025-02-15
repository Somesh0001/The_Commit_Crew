
import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Shield,
  CheckCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface FieldVisitorProfileProps {
  visitor: {
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
  };
}

const FieldVisitorProfile: React.FC<FieldVisitorProfileProps> = ({
  visitor,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-emerald-600 flex justify-between px-6 py-4">
        <div className="flex items-center  space-x-4">
          <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
            <User className="h-8 w-8 text-emerald-600" />
          </div>

          <div className="text-white">
            <h2 className="text-xl font-bold">{visitor.name}</h2>
            <div className="flex items-center mt-1">
              <Shield className="h-4 w-4 mr-1" />
              <span className="text-sm capitalize">
                {visitor.role.replace("_", " ")}
              </span>
              {visitor.approved && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </span>
              )}
            </div>
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
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Personal Information
            </h3>

            <div className="flex items-center text-gray-600">
              <Mail className="h-5 w-5 mr-3 text-gray-400" />
              <span>{visitor.email}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <Phone className="h-5 w-5 mr-3 text-gray-400" />
              <span>{visitor.phone}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-3 text-gray-400" />
              <span>{visitor.age} years old</span>
            </div>

            <div className="flex items-start text-gray-600">
              <MapPin className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
              <span>{visitor.address}</span>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Additional Information
            </h3>

            <div className="flex items-center text-gray-600">
              <Building className="h-5 w-5 mr-3 text-gray-400" />
              <span>Society: {visitor.society}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <Shield className="h-5 w-5 mr-3 text-gray-400" />
              <span>Aadhar: {visitor.aadhar}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-3 text-gray-400" />
              <div className="flex flex-col">
                <span>Joined: {formatDate(visitor.createdAt)}</span>
                <span className="text-sm text-gray-500">
                  Last Updated: {formatDate(visitor.updatedAt)}
                </span>
              </div>
            </div>

            {visitor.setDuty === null && (
              <div className="mt-4 p-3 bg-yellow-50 rounded-md">
                <p className="text-sm text-yellow-700">
                  No active duty assignment
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldVisitorProfile;
