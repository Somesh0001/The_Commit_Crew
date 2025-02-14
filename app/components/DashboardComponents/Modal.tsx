import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Building,
  Calendar,
  CheckCircle,
  Clock,
  GitPullRequest,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Guard {
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
  createdAt: string;
  updatedAt: string;
}

interface GuardProfileProps {
  guard: {
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
    createdAt: string;
    updatedAt: string;
  };
}

const GuardProfile: React.FC<GuardProfileProps> = ({ guard }) => {

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
console.log("Guardprofile",guard)
  const handleApprove = async () => {
    try {
      const response = await fetch("/api/approveguard", {
        method: "PUT",
        body: JSON.stringify({ guardId: guard?._id }),
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Guard approved successfully!");
        window.location.reload(); // Reload to reflect changes
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Approval failed:", error);
    }
  };

  const handleReject = async () => {
    try {
      const response = await fetch("/api/rejectguard", {
        method: "DELETE",
        body: JSON.stringify({ guardId: guard?._id }),
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Guard rejected successfully!");
        window.location.reload(); // Reload to reflect changes
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Rejection failed:", error);
    }
  };
  

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-indigo-600 px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
            <User className="h-8 w-8 text-indigo-600" />
          </div>
          <div className="text-white">
            <h2 className="text-xl font-bold">{guard.name}</h2>
            <div className="flex items-center mt-1">
              <Shield className="h-4 w-4 mr-1" />
              <span className="text-sm capitalize">
                {guard.role.replace("_", " ")}
              </span>
              {!guard.approved && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <GitPullRequest className="h-3 w-3 mr-1" />
                  Request
                </span>
              )}
            </div>
          </div>
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
              <span>{guard.email}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <Phone className="h-5 w-5 mr-3 text-gray-400" />
              <span>{guard.phone}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-3 text-gray-400" />
              <span>{guard.age} years old</span>
            </div>

            <div className="flex items-start text-gray-600">
              <MapPin className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
              <span>{guard.address}</span>
            </div>
          </div>

          {/* Work Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Work Information
            </h3>

            <div className="flex items-center text-gray-600">
              <Building className="h-5 w-5 mr-3 text-gray-400" />
              <span>{guard.society}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <Shield className="h-5 w-5 mr-3 text-gray-400" />
              <span>Aadhar: {guard.aadhar}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-3 text-gray-400" />
              <div className="flex flex-col">
                <span>Joined: {formatDate(guard.createdAt)}</span>
                <span className="text-sm text-gray-500">
                  Last Updated: {formatDate(guard.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center flex-wrap gap-3 justify-around">
        <Button onClick={handleApprove} className="text-md rounded-full w-80  bg-green-900">
          Approved
        </Button>
        <Button onClick={handleReject} className="text-md rounded-full w-80 bg-red-800">
          Rejected
        </Button>
      </div>
    </div>
  );
};
interface ModalProps {
    guard: Guard;
}

const Modal: React.FC<ModalProps> = ({ guard }) => {
    console.log("Mod",guard);
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button className="text-md rounded-full bg-green-400">
            Check Details
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-4">
          <GuardProfile guard={guard} />
        </PopoverContent>
      </Popover>
    );
  };
  
  export default Modal;