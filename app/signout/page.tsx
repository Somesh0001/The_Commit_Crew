'use client';

import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    const res = await signOut({ redirect: false, callbackUrl: "/" });
    if (res?.url) {
      router.push(res.url); // Redirect to the home page after signing out
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-1/2 bg-gray-100 ">
      <div className="bg-[#074799] p-8 shadow-lg text-center w-full text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">Sign Out</h1>
        <p className="mb-4 text-xl">Are you sure you want to sign out?</p>
        <button
          onClick={handleSignOut}
          className="text-center font-bold text-2xl flex justify-center items-center bg-[#FF9D23] rounded-lg text-white px-4 py-2 "
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default SignOut;
