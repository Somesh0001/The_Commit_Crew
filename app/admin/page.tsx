"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SignIn from "../signin/page";
import Link from "next/link";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const goToDashboard = () => {
    if (session?.user?.role) {
      if(session.user.role === "admin")
      router.push(`/${session.user.role}/dashboard`);
    else router.push(`/${session.user.role}`);
    }
  };

  return (
    <div className="p-4">
      <div className="text-3xl text-center font-bold">Dashboard</div>
      {session?.user ? (
        <>
          <p className="text-center mt-4">Hello, {session.user.name}</p>
          <div className="text-center mt-4">
            <p>Go to {session.user.role} dashboard:</p>
            <button
              onClick={goToDashboard}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Go to Dashboard
            </button>
          </div>
          <div className="text-center font-bold text-2xl flex justify-center items-center bg-[#FF9D23] rounded-lg text-white px-4 py-2 w-fit mt-4">
            <Link href="/api/auth/signout">Logout</Link>
          </div>
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
};

export default Page;
