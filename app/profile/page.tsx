// "use client";
// import React, { useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import SignIn from "../signin/page";
// import Link from "next/link";
// import GuardFeedback from "../components/GuardFeedbackForm";
// import Profile from "../components/Profile";

// const Page = () => {
//   const { data: session } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (session?.user?.role) {
//       router.push(`/${session.user.role}`);
//     }
//   }, [session, router]);

//   const visitor = {
//     _id: "1",
//     role: "visitor",
//     name: "Rohan Sharma",
//     email: "rohan.sharma@example.com",
//     age: 28,
//     phone: "9876543210",
//     aadhar: "123456789012",
//     society: "Gokuldham",
//     address: "B-102, Gokuldham Society, Mumbai",
//     approved: false,
//     setDuty: null,
//     createdAt: "2025-02-14T08:30:00.000Z",
//     updatedAt: "2025-02-14T08:30:00.000Z",
//   };

//   return (
//     <div className="p-4">
//       <div className="text-3xl text-center font-bold">Dashboard</div>
//       {session?.user ? (
//         <>
//           <p className="text-center mt-4">Hello, {session.user.name}</p>
//           <Profile visitor={visitor} />
//           <div className="text-center mt-4">
//             <Link
//               href="/api/auth/signout"
//               className="font-bold text-2xl bg-[#FF9D23] rounded-lg text-white px-4 py-2 w-fit"
//             >
//               Logout
//             </Link>
//           </div>
//           <div>
//             <GuardFeedback />
//           </div>
//         </>
//       ) : (
//         <SignIn />
//       )}
//     </div>
//   );
// };

// export default Page;
"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import GuardFeedback from "../components/GuardFeedbackForm";
import Profile from "../components/Profile";
import SignIn from "../signin/page";
import Image from "next/image";

const Page = () => {
  const { data: session } = useSession();

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
   console.log("profile", session?.user);
   const [user, setUser] = useState({
     _id: "",
     role: "",
     name: "",
     email: "",
     age: 0,
     phone: "",
     aadhar: "",
     society: "",
     address: "",
     approved: false,
     setDuty: null,
     createdAt: "",
     updatedAt: "",
   });
    const [error, setError] = useState("");

    const fetchUserById = async (id: string) => {
        try {
            const res = await fetch("/api/getuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) {
                throw new Error("User not found");
            }

            const data = await res.json();
            setUser(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };
    useEffect(() => {
      if (session?.user?.id) {
        fetchUserById(session.user.id);
      }
    }, [session]);
    
  return (
    <div className="p-4 h-screen">
      <div className="text-3xl text-center font-bold">Dashboard</div>

      {session?.user ? (
        <>
          <p className="text-center mt-4">Hello, {session.user.name}</p>
          <Profile visitor={user} />
          {session?.user.role ==="guard" && (
            <div className=" flex flex-col items-center p-4">
              <div>
                <p className="text-center mt-4">Scan QR code to check-in</p>
              </div>
              <Image src={"/qr.png"} alt="" width={200} height={200} />
            </div>
          )}
          {/* <div className="text-center mt-4">
            <Link
              href="/api/auth/signout"
              className="font-bold text-2xl bg-[#FF9D23] rounded-lg text-white px-4 py-2 w-fit"
            >
              Logout
            </Link>
          </div> */}
          <div>
            
          </div>
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
};

export default Page;
