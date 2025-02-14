"use client"


import './style.css'
// import { options } from "./api/auth/[...nextauth]/options"
// import { getServerSession } from "next-auth/next"
// import UserCard from "./components/UserCard"

import Hero from './Hero'
import Contact from './Contact'
import CTA from './Cta'
import Features1 from './Features1'
import Features2 from './Features2'
import Footer from './Footer'
// import Navbar from './components/Unnati/Navbar'
import Pricing from './Pricing'
import Steps from './Steps'
import Testimonial from './Testimonial'







export default function fin() {
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
