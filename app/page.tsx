// import { options } from "./api/auth/[...nextauth]/options"
// import { getServerSession } from "next-auth/next"
// import UserCard from "./components/UserCard"
// import NavbarWrapper from "./components/NavbarWrapper";
// // import Navbar from "./components/Navbar";
// import Fin from "./home/page";
// import './globals.css'


// export default async function Home() {
//   const session = await getServerSession(options)

//   return (
//     <div className="flex flex-col w-full ">
//     <NavbarWrapper/> 
//       {session ? (
//         <UserCard user={session?.user} pagetype={"Home"} />
//       ) : (
//         <Fin/>
//       )}
//     </div>
//   )
// }
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import Fin from "./home/page";
import "./globals.css";
import { redirect } from "next/navigation";

export default async function Home() {
  // Retrieve the session using NextAuth
  const session = await getServerSession(options);

  // If no session exists, redirect the user to the sign-in page.
  if (!session) {
    redirect("/signin");
  }

  // If the user is authenticated, render the Fin component.
  return (
    <div className="flex flex-col w-full">
      <Fin />
    </div>
  );
}
