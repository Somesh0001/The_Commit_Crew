'use client';

import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    const res = await signOut({ redirect: false, callbackUrl: "/" });
    if (res?.url) {
      router.push(res.url);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-black p-8 shadow-lg text-center w-full max-w-md text-white rounded-xl flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">Sign Out</h1>
        <p className="mb-4 text-lg">Are you sure you want to sign out?</p>
        <button
          onClick={handleSignOut}
          className="w-full font-bold text-xl flex justify-center items-center bg-white text-black rounded-lg px-6 py-3 transition hover:bg-gray-300"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default SignOut;
