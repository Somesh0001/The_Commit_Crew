"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SignIn from "../signin/page";
import Link from "next/link";
import GuardFeedback from "../components/GuardFeedbackForm";
import Profile from "../components/Profile";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.role) {
      router.push(`/${session.user.role}`);
    }
  }, [session, router]);

  const visitor = {
    _id: "1",
    role: "visitor",
    name: "Rohan Sharma",
    email: "rohan.sharma@example.com",
    age: 28,
    phone: "9876543210",
    aadhar: "123456789012",
    society: "Gokuldham",
    address: "B-102, Gokuldham Society, Mumbai",
    approved: false,
    setDuty: null,
    createdAt: "2025-02-14T08:30:00.000Z",
    updatedAt: "2025-02-14T08:30:00.000Z",
  };
console.log("firstName: ", session)
  return (
    <div className="p-4">
      <div className="text-3xl text-center font-bold">Dashboard</div>
      {session?.user ? (
        <>
          <p className="text-center mt-4">Hello, {session.user.name}</p>
          <Profile visitor={visitor} />
          <div className="text-center mt-4">
            <Link
              href="/api/auth/signout"
              className="font-bold text-2xl bg-[#FF9D23] rounded-lg text-white px-4 py-2 w-fit"
            >
              Logout
            </Link>
          </div>
          <div>
            <GuardFeedback />
          </div>
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
};

export default Page;
