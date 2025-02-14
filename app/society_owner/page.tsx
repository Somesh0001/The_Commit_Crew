"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface SocietyOwner {
  _id: string;
  name: string;
  email: string;
  age: number;
  phone: string;
  aadhar: string;
  society: string;
  address: string;
  approved: boolean;
}

interface Guard {
  _id: string;
  name: string;
  email: string;
  phone: string;
  society: string;
  setDuty: string | null;
}

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [ownerDetails, setOwnerDetails] = useState<SocietyOwner | null>(null);
  const [guards, setGuards] = useState<Guard[]>([]);
  const [selectedGuard, setSelectedGuard] = useState<string | null>(null);
  const [selectedGuardDetails, setSelectedGuardDetails] = useState<Guard | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [guardToConfirm, setGuardToConfirm] = useState<string | null>(null);

  const today = new Date().toISOString().split("T")[0]; // Get today's date

  useEffect(() => {
    const fetchSocietyOwner = async () => {
      if (session?.user?.role === "society_owner") {
        try {
          const res = await fetch(`/api/user/${session.user.id}`);
          if (!res.ok) throw new Error("Failed to fetch owner details");
          const data: SocietyOwner = await res.json();
          setOwnerDetails(data);
        } catch (error) {
          console.error("Error fetching owner details:", error);
        }
      }
    };

    fetchSocietyOwner();
  }, [session]);

  useEffect(() => {
    const fetchGuards = async () => {
      if (ownerDetails?.society) {
        console.log("Society is: ", ownerDetails.society);
        try {
          const res = await fetch(`/api/guard`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ society: ownerDetails.society }),
          });

          if (!res.ok) throw new Error("Failed to fetch guards");
          const data: Guard[] = await res.json();

          // Auto-select a guard if they are already assigned for today
          const alreadyOnDuty = data.find((guard) => guard.setDuty === today);
          if (alreadyOnDuty) {
            setSelectedGuard(alreadyOnDuty._id);
            setSelectedGuardDetails(alreadyOnDuty);
          }

          setGuards(data);
        } catch (error) {
          console.error("Error fetching guards:", error);
        }
      }
    };

    fetchGuards();
  }, [ownerDetails]);

  const handleGuardSelection = (guardId: string) => {
    setGuardToConfirm(guardId);
    setShowModal(true);
  };

  const confirmSelection = async () => {
    if (!guardToConfirm) return;
    try {
      const res = await fetch(`/api/select-guard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ guardId: guardToConfirm, society: ownerDetails?.society, setDuty: today }),
      });

      if (!res.ok) throw new Error("Failed to select guard");
      const selectedGuardData = guards.find((guard) => guard._id === guardToConfirm);
      setSelectedGuard(guardToConfirm);
      setSelectedGuardDetails(selectedGuardData || null);
      console.log("Guard selected successfully");

      setShowModal(false);
    } catch (error) {
      console.error("Error selecting guard:", error);
    }
  };

  const notifyGuard = async () => {
    if (!selectedGuardDetails) return;
    try {
      await fetch(`/api/notify-guard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ guardId: selectedGuardDetails._id }),
      });
      alert(`Notified ${selectedGuardDetails.name} about their duty.`);
    } catch (error) {
      console.error("Error notifying guard:", error);
    }
  };

  const notifyAdmin = async () => {
    if (!selectedGuardDetails) return;
    try {
      await fetch(`/api/notify-admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          guardId: selectedGuardDetails._id,
          guardName: selectedGuardDetails.name,
          society: ownerDetails?.society
        }),
      });
      alert(`Admin notified about absence of ${selectedGuardDetails.name}.`);
    } catch (error) {
      console.error("Error notifying admin:", error);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col items-center justify-center overflow-auto p-6">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Society Owner Dashboard</h1>

        {ownerDetails && (
          <div className="mt-6 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700">Society Owner Details:</h2>
            <p><strong>Name:</strong> {ownerDetails.name}</p>
            <p><strong>Email:</strong> {ownerDetails.email}</p>
            <p><strong>Age:</strong> {ownerDetails.age}</p>
            <p><strong>Phone:</strong> {ownerDetails.phone}</p>
            <p><strong>Society:</strong> {ownerDetails.society}</p>
            <p><strong>Address:</strong> {ownerDetails.address}</p>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800">Your Guards:</h2>
          {guards.length > 0 ? (
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {guards.map((guard) => (
                <li
                  key={guard._id}
                  className={`p-6 border rounded-lg shadow-sm ${
                    selectedGuard === guard._id ? "bg-green-100 border-green-500" : "bg-white"
                  }`}
                >
                  <p className="text-lg font-medium text-gray-900">{guard.name}</p>
                  <p className="text-gray-600"><strong>Email:</strong> {guard.email}</p>
                  <p className="text-gray-600"><strong>Phone:</strong> {guard.phone}</p>
                  <p className="text-gray-600"><strong>Last duty:</strong> {guard.setDuty || "Never"}</p>

                  <button
                    className={`mt-4 w-full px-4 py-2 rounded text-white ${
                      selectedGuard === guard._id ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    onClick={() => handleGuardSelection(guard._id)}
                    disabled={selectedGuard === guard._id}
                  >
                    {selectedGuard === guard._id ? "Selected" : "Select for Today"}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-600">No guards assigned to your society.</p>
          )}
        </div>

        {selectedGuard && (
          <div className="mt-6 flex gap-4">
            <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600" onClick={notifyGuard}>
              Notify Guard
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={notifyAdmin}>
              Notify Admin
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
