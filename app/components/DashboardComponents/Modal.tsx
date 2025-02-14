import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Building, Calendar, CheckCircle, Clock, GitPullRequest, Mail, MapPin, Phone, Shield, User } from "lucide-react";

interface GuardProfileProps {
    guard: {
      id: number;
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
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
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
                <span className="text-sm capitalize">{guard.role.replace('_', ' ')}</span>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
              
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
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Work Information</h3>
              
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
                  <span className="text-sm text-gray-500">Last Updated: {formatDate(guard.updatedAt)}</span>
                </div>
              </div>
              
            </div>
          </div>
        </div>
          <div className="flex items-center flex-wrap gap-3 justify-around">
            <Button className="text-md rounded-full w-80  bg-green-900">Approved</Button>
            <Button className="text-md rounded-full w-80 bg-red-800">Rejected</Button>
            </div>
      </div>
    );
  };
export default function Modal() {
    const security_guard=[
        {
          "id": 1,
          "role": "security_guard",
          "name": "Ramesh Yadav",
          "email": "ramesh.yadav@gmail.com",
          "password": "ramesh123",
          "age": 35,
          "phone": "9090909090",
          "aadhar": "123456789012",
          "society": "Gokuldham",
          "address": "Gate No. 1, Gokuldham",
          "approved": true,
          "createdAt": "2025-02-14T06:42:32.572+00:00",
          "updatedAt": "2025-02-14T06:42:32.572+00:00"
        },
        {
          "id": 2,
          "role": "security_guard",
          "name": "Suresh Kumar",
          "email": "suresh.kumar@gmail.com",
          "password": "suresh123",
          "age": 40,
          "phone": "9080706050",
          "aadhar": "234567890123",
          "society": "Gokuldham",
          "address": "Lobby Area, Gokuldham",
          "approved": true,
          "createdAt": "2025-02-14T06:43:12.572+00:00",
          "updatedAt": "2025-02-14T06:43:12.572+00:00"
        },
        {
          "id": 3,
          "role": "security_guard",
          "name": "Vikram Singh",
          "email": "vikram.singh@gmail.com",
          "password": "vikram123",
          "age": 28,
          "phone": "9012345678",
          "aadhar": "345678901234",
          "society": "Gokuldham",
          "address": "Parking Lot, Gokuldham",
          "approved": true,
          "createdAt": "2025-02-14T06:44:02.572+00:00",
          "updatedAt": "2025-02-14T06:44:02.572+00:00"
        },
        {
          "id": 4,
          "role": "security_guard",
          "name": "Manoj Verma",
          "email": "manoj.verma@gmail.com",
          "password": "manoj123",
          "age": 32,
          "phone": "9123456789",
          "aadhar": "456789012345",
          "society": "Gokuldham",
          "address": "Back Gate, Gokuldham",
          "approved": true,
          "createdAt": "2025-02-14T06:45:12.572+00:00",
          "updatedAt": "2025-02-14T06:45:12.572+00:00"
        },
        {
          "id": 5,
          "role": "security_guard",
          "name": "Anil Tiwari",
          "email": "anil.tiwari@gmail.com",
          "password": "anil123",
          "age": 45,
          "phone": "9234567890",
          "aadhar": "567890123456",
          "society": "Gokuldham",
          "address": "Floor 2, Gokuldham",
          "approved": true,
          "createdAt": "2025-02-14T06:46:32.572+00:00",
          "updatedAt": "2025-02-14T06:46:32.572+00:00"
        },
    ]
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="text-md rounded-full bg-green-400">check details</Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        
        <GuardProfile guard={security_guard[0]} />
      </PopoverContent>
    </Popover>
  )
}
