'use client'
import React, { useState, useEffect } from "react";
import Modal from "./Modal";

interface Guard {
  _id: string;
  name: string;
  society: string;
  role: string;
  email: string;
  age: number;
  phone: string;
  address: string;
  aadhar: string;
  approved: boolean;
  createdAt: string;
  updatedAt: string;
}

const GuardRequestBox = () => {
  const [guards, setGuards] = useState<Guard[]>([]);

  useEffect(() => {
    fetch("/api/unapprovedGuards", {
      method: "POST",
      body: JSON.stringify({ society: "Gokuldham" }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(setGuards)
      .catch(console.error);
  }, []);

  return (
    <div className="w-full h-[50vh] rounded-md overflow-scroll shadow-lg mt-4">
      <h3 className="text-lg font-semibold p-4 bg-green-200 text-black">Guard Requests</h3>
      <ul className="p-4 bg-green-100 space-y-2">
        {guards.length === 0 ? (
          <p className="text-gray-500">No unapproved guards found.</p>
        ) : (
          guards.map((guard,i) => (
            <li key={i}  className="flex justify-between bg-slate-100 p-2 rounded-md">
              <div>{guard.name}</div>
              <Modal guard={guard} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default GuardRequestBox;
