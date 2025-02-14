"use client"


import './style.css'
// import { options } from "./api/auth/[...nextauth]/options"
// import { getServerSession } from "next-auth/next"
// import UserCard from "./components/UserCard"

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








export default function Home() {
  // const session = await getServerSession(options)

  return (
 

    <>
    <div className="home-container" >
     
    
      <Hero></Hero>

      <Contact/>
      <Features1/>
      <Features2/>
      <Pricing/>
      <Steps/>
      <Testimonial/>
      <CTA/>
      <Footer/>
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
