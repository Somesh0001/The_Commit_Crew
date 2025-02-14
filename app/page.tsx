import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import UserCard from "./components/UserCard"
import NavbarWrapper from "./components/NavbarWrapper";
import Navbar from "./components/Navbar";
export default async function Home() {
  const session = await getServerSession(options)

  return (
    <div className="flex flex-col w-full ">
    <NavbarWrapper/> 
      {session ? (
        <UserCard user={session?.user} pagetype={"Home"} />
      ) : (
        <h1 className="text-5xl">You Shall Not Pass!</h1>
      )}
    </div>
  )
}
