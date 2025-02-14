"use client";   
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log("Session data : " , session)
  return <div>
    <div>
        Hello {session?.user.name}  
    </div>
  </div>;
};

export default page;
