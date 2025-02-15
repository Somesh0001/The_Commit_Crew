// app/guard-profile/page.tsx
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaBuilding,
  FaHome,
  FaShieldAlt,
} from "react-icons/fa";
import RatingChart from "../components/RatingChart";
import { getUser } from "@/utils/getUser";
import { useSession } from "next-auth/react";

interface Feedback {
  _id: string;
  ratingCount: number;
  comment: string;
  givenBy: { name: string; email: string };
  createdAt: string;
}

const Page = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [guardData, setGuardData] = useState<{
    name: string;
    role: string;
    email: string;
    age: number;
    phone: string;
    aadhar: string;
    society: string;
    address: string;
    approved: boolean;
  }>({
    name: "",
    role: "",
    email: "",
    age: 0,
    phone: "",
    aadhar: "",
    society: "",
    address: "",
    approved: false,
  });
  const session = useSession();

  useEffect(() => {
    const fetchGuardFeedback = async () => {
      try {
        const res = await fetch("/api/getratingfeedback");
        if (!session || !session.data?.user?.email)
          throw new Error("User not logged in");
        const resdata = await getUser(session.data?.user?.email);
        console.log(resdata.data);
        setGuardData(resdata.data);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch feedback");
        setFeedbacks(data.feedbacks);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGuardFeedback();
  }, []);

  // Dummy Guard Data (replace with real data from API)
  // const guardData = {
  //   name: "Rohan Sharma",
  //   role: "guard",
  //   email: "rohan.sharma@example.com",
  //   age: 28,
  //   phone: "9876543210",
  //   aadhar: "123456789012",
  //   society: "Gokuldham",
  //   address: "B-102, Gokuldham Society, Mumbai",
  //   approved: true,
  // };

  return (
    <div className="min-h-screen w-full bg-gray-100 py-8 px-4">
      {JSON.stringify(guardData)}
      {JSON.stringify(session)}
      <div className=" bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Profile Header */}
        <div className="bg-blue-600 p-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-full">
              <FaShieldAlt className="text-blue-600 text-3xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {guardData.name}
              </h1>
              <p className="text-blue-100">{guardData.role.toUpperCase()}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                guardData.approved
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {guardData.approved ? "Approved" : "Pending Approval"}
            </span>
            <Link
              href="/api/auth/signout"
              className="font-bold text-lg bg-[#FF9D23] rounded-lg text-white px-4 py-2 hover:bg-[#FF8A00] transition-colors"
            >
              Logout
            </Link>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <InfoItem
              icon={<FaUser />}
              label="Age"
              value={`${guardData.age} years`}
            />
            <InfoItem
              icon={<FaEnvelope />}
              label="Email"
              value={guardData.email}
            />
            <InfoItem
              icon={<FaPhone />}
              label="Phone"
              value={guardData.phone}
            />
            <InfoItem
              icon={<FaIdCard />}
              label="Aadhar"
              value={guardData.aadhar}
            />
          </div>

          {/* Society Information */}
          <div className="space-y-4">
            <InfoItem
              icon={<FaBuilding />}
              label="Society"
              value={guardData.society}
            />
            <InfoItem
              icon={<FaHome />}
              label="Address"
              value={guardData.address}
            />
          </div>
        </div>

        {/* Rating Chart */}
        <div className="px-8 py-4 border-t">
          <RatingChart feedbacks={feedbacks} />
        </div>

        {/* Feedback Section */}
        <div className="bg-gray-50 px-8 py-4 border-t">
          <h2 className="text-xl font-bold mb-4">Feedback Received</h2>
          {loading ? (
            <p className="text-gray-600">Loading feedback...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : feedbacks.length === 0 ? (
            <p className="text-gray-600">No feedback available.</p>
          ) : (
            <ul className="space-y-4">
              {feedbacks.map((feedback) => (
                <li
                  key={feedback._id}
                  className="border p-4 rounded-lg shadow-sm bg-white"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">
                      {feedback.givenBy.name}
                    </span>
                    <span className="text-gray-500 text-sm">
                      ({feedback.givenBy.email})
                    </span>
                  </div>
                  <div className="flex gap-1 text-yellow-500">
                    {"★".repeat(feedback.ratingCount)}
                    {"☆".repeat(5 - feedback.ratingCount)}
                  </div>
                  <p className="text-gray-700 mt-2">{feedback.comment}</p>
                  <p className="text-gray-400 text-xs mt-2">
                    {new Date(feedback.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-3">
    <span className="text-gray-400">{icon}</span>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export default Page;
