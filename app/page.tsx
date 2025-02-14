import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import UserCard from "./components/UserCard"
import NavbarWrapper from "./components/NavbarWrapper";
// import Navbar from "./components/Navbar";
import Fin from "./home/page";
import './globals.css'


export default async function Home() {
  const session = await getServerSession(options)

  return (
    <div className="flex flex-col w-full ">
    <NavbarWrapper/> 
      {session ? (
        <UserCard user={session?.user} pagetype={"Home"} />
      ) : (
        <Fin/>
      )}
    </div>
  )
}
