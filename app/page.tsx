// import { options } from "./api/auth/[...nextauth]/options"
// import { getServerSession } from "next-auth/next"
// import UserCard from "./components/UserCard"
// import NavbarWrapper from "./components/NavbarWrapper";
// import Navbar from "./components/Navbar";
// export default async function Home() {
//   const session = await getServerSession(options)

//   return (
//     <div className="flex flex-col w-full ">
//     <NavbarWrapper/> 
//       {session ? (
//         <UserCard user={session?.user} pagetype={"Home"} />
//       ) : (
//         <h1 className="text-5xl">You Shall Not Pass!</h1>
//       )}
//     </div>
//   )
// }

"use client"


import './style.css'
import Hero from './components/Unnati/Hero'
import Contact from './components/Unnati/Contact'
import CTA from './components/Unnati/Cta'
import Features1 from './components/Unnati/Features1'
import Features2 from './components/Unnati/Features2'
import Footer from './components/Unnati/Footer'
// import Navbar from './components/Unnati/Navbar'
import Pricing from './components/Unnati/Pricing'
import Steps from './components/Unnati/Steps'
import Testimonial from './components/Unnati/Testimonial'


export default function fin() {
  // const session = await getServerSession(options)

  return (
 

    <>
    <div className="home-container" >
     
    
    <Hero
  image3Src="https://images.unsplash.com/photo-1551006855-766a3733333d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTczOTUwODY1OHw&ixlib=rb-4.0.3&q=80&w=1080"
  image8Alt="Hero Image"
  image2Src="https://images.unsplash.com/photo-1672845977153-a36851780cd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTczOTUwODY1OXw&ixlib=rb-4.0.3&q=80&w=1080"
  image6Alt="Hero Image"
  image11Src="https://images.unsplash.com/photo-1472506558072-1fe530d75951?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTczOTUwODY2MHw&ixlib=rb-4.0.3&q=80&w=1080"
  image5Alt="Hero Image"
  image1Alt="Urban Security Illustration"
  image7Src="https://images.unsplash.com/photo-1592700455057-97dc01a7bad6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTczOTUwODY2MXw&ixlib=rb-4.0.3&q=80&w=1080"
  image7Alt="Hero Image"
  image12Alt="Hero Image"
  image2Alt="Hero Image"
  image6Src="https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTczOTUwODY2Mnw&ixlib=rb-4.0.3&q=80&w=1080"
  image12Src="https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTczOTUwODY2Mnw&ixlib=rb-4.0.3&q=80&w=1080"
  image3Alt="Hero Image"
  image9Src="https://images.unsplash.com/photo-1543198693-2cebfe617910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTczOTUwODY2Mnw&ixlib=rb-4.0.3&q=80&w=1080"
  image11Alt="Hero Image"
  action2="Learn More"
  action1="Get Started"
  image8Src="https://images.unsplash.com/photo-1499828575800-72e20e12c4df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTczOTUwODY2M3w&ixlib=rb-4.0.3&q=80&w=1080"
  image5Src="https://images.unsplash.com/photo-1641405102586-16de9aed9236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTczOTUwODY2M3w&ixlib=rb-4.0.3&q=80&w=1080"
  image4Src="https://images.unsplash.com/photo-1504121932900-5e28c69ffaf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTczOTUwODY2M3w&ixlib=rb-4.0.3&q=80&w=1080"
  image10Alt="Hero Image"
  image4Alt="Hero Image"
  heading1="Transforming Urban Security"
  content1="Empower your security operations with our comprehensive platform. Enhance transparency, coordination, and oversight for authorities, businesses, and communities."
  image10Src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTczOTUwODY2NHw&ixlib=rb-4.0.3&q=80&w=1080"
  image9Alt="Hero Image"
  image1Src="https://images.unsplash.com/photo-1672357867665-4e4f7392edce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTczOTUwODY2NHw&ixlib=rb-4.0.3&q=80&w=1080"
/>


    
      <Features1/>

      
      <Features2/>
      <Pricing/>
      <Steps/>
      <Testimonial/>
      <CTA/>
      <Footer/>
      <Contact/>
      {/* <Navbar/> */}

      
    
    </div>
    <style jsx>
      {`
        .home-container {
          width: 100%;
          display: flex;
          min-height: 100vh;
          align-items: center;
          flex-direction: column;
        
      `}
    </style>
  </>
  )
}

