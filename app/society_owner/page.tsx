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
  const [selectedGuardDetails, setSelectedGuardDetails] =
    useState<Guard | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [guardToConfirm, setGuardToConfirm] = useState<string | null>(null);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [message, setMessage] = useState("");
  const today = new Date().toISOString().split("T")[0];
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
        try {
          const res = await fetch(`/api/guard`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ society: ownerDetails.society }),
          });
          if (!res.ok) throw new Error("Failed to fetch guards");
          let data: Guard[] = await res.json();
          data = data.sort((a, b) => {
            if (!a.setDuty) return -1;
            if (!b.setDuty) return 1;
            return (
              new Date(a.setDuty).getTime() - new Date(b.setDuty).getTime()
            );
          });
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
  const handleNotify = () => {
    if (!selectedGuardDetails) {
      alert("No guard selected to notify.");
      return;
    }
    setShowNotifyModal(true);
  };
  const sendNotification = async (recipient: "admin" | "guard") => {
    if (!message.trim()) {
      alert("Please enter a message before notifying.");
      return;
    }
    if (!selectedGuardDetails) {
      alert("No guard selected to notify.");
      return;
    }
    try {
      let apiEndpoint = "";
      let requestBody = {};
      if (recipient === "admin") {
        apiEndpoint = "/api/notify-admin";
        requestBody = {
          guardId: selectedGuardDetails._id,
          guardName: selectedGuardDetails.name,
          guardPhone: selectedGuardDetails.phone,
          society: ownerDetails?.society,
        };
      } else {
        apiEndpoint = "/api/notify-guard";
        requestBody = { guardId: selectedGuardDetails._id };
      }
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to send notification");
      }
      alert(
        `✅ ${recipient === "admin" ? "Admin" : "Guard"} notified successfully!`
      );
      setShowNotifyModal(false);
      setMessage("");
    } catch (error: any) {
      console.error("❌ Error notifying:", error);
      alert(`Error: ${error.message}`);
    }
  };
  const confirmSelection = async () => {
    if (!guardToConfirm || !ownerDetails?.society) return;
    try {
      const res = await fetch(`/api/select-guard`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guardId: guardToConfirm,
          society: ownerDetails.society,
          setDuty: today,
        }),
      });
      if (!res.ok) throw new Error("Failed to select guard");
      const selectedGuardData = guards.find(
        (guard) => guard._id === guardToConfirm
      );
      setSelectedGuard(guardToConfirm);
      setSelectedGuardDetails(selectedGuardData || null);
      console.log("✅ Guard selected successfully");
      setShowModal(false);
    } catch (error) {
      console.error("❌ Error selecting guard:", error);
    }
  };

  return (
    <div className="h-auto w-screen bg-gray-100 flex flex-col items-center justify-center overflow-auto p-6">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Society Owner Dashboard
        </h1>

        {ownerDetails && (
          <div className="mt-6 p-6 bg-gray-100 border-l-4 border-gray-500 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700">
              Society Owner Details:
            </h2>
            <p>
              <strong>Name:</strong> {ownerDetails.name}
            </p>
            <p>
              <strong>Email:</strong> {ownerDetails.email}
            </p>
            <p>
              <strong>Age:</strong> {ownerDetails.age}
            </p>
            <p>
              <strong>Phone:</strong> {ownerDetails.phone}
            </p>
            <p>
              <strong>Society:</strong> {ownerDetails.society}
            </p>
            <p>
              <strong>Address:</strong> {ownerDetails.address}
            </p>
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
                    selectedGuard === guard._id
                      ? "bg-green-100 border-green-500"
                      : "bg-white"
                  }`}
                >
                  <p className="text-lg font-medium text-gray-900">
                    {guard.name}
                  </p>
                  <p className="text-gray-600">
                    <strong>Email:</strong> {guard.email}
                  </p>
                  <p className="text-gray-600">
                    <strong>Phone:</strong> {guard.phone}
                  </p>
                  <p className="text-gray-600">
                    <strong>Last duty:</strong> {guard.setDuty || "Never"}
                  </p>

                  <button
                    className={`mt-4 w-full px-4 py-2 rounded text-white ${
                      selectedGuard
                        ? selectedGuard === guard._id
                          ? "bg-green-600"
                          : "bg-gray-400 cursor-not-allowed"
                        : "bg-gray-700 hover:bg-gray-900"
                    }`}
                    onClick={() => handleGuardSelection(guard._id)}
                    disabled={!!selectedGuard}
                  >
                    {selectedGuard === guard._id
                      ? "Selected"
                      : "Select for Today"}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-600">
              No guards assigned to your society.
            </p>
          )}
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-lg font-semibold mb-4">Confirm Selection</h2>
              <p>Are you sure you want to assign this guard?</p>
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={confirmSelection}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleNotify}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Notify
        </button>
      </div>
      {showNotifyModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-lg font-semibold mb-4">Send Notification</h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message..."
              className="w-full p-2 border rounded-lg mb-4"
              rows={3}
            ></textarea>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => sendNotification("admin")}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Notify Admin
              </button>

              <button
                onClick={() => sendNotification("guard")}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Notify Guard
              </button>
            </div>

            <button
              onClick={() => setShowNotifyModal(false)}
              className="mt-4 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
