"use client"


import './style.css'
// // import { options } from "./api/auth/[...nextauth]/options"
// // import { getServerSession } from "next-auth/next"
// // import UserCard from "./components/UserCard"

import Hero from '../components/Unnati/Hero'
// import Contact from './Contact'
import CTA from '../components/Unnati/Cta'
import Features1 from '../components/Unnati/Features1'
import Features2 from '../components/Unnati/Features2'
import Footer from '../components/Unnati/Footer'
// import Navbar from './components/Unnati/Navbar'
import Pricing from '../components/Unnati/Pricing'
import Steps from '../components/Unnati/Steps'
// import Testimonial from './Testimonial'

import PaymentButton from '../components/PaymentButton'

// import './style.css'
// import Hero from './components/Unnati/Hero'
// import Contact from './components/Unnati/Contact'
// import CTA from './components/Unnati/Cta'
// import Features1 from './components/Unnati/Features1'
// import Features2 from './components/Unnati/Features2'
// import Footer from './components/Unnati/Footer'
// // import Navbar from './components/Unnati/Navbar'
// import Pricing from './components/Unnati/Pricing'
// import Steps from './components/Unnati/Steps'
// import Testimonial from './components/Unnati/Testimonial'


export default function Fin() {
 
  return (
 

    <>
    <div className="home-container" >
     
    
    <Hero
  image3Src="https://images.unsplash.com/photo-1551006855-766a3733333d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTczOTUwODY1OHw&ixlib=rb-4.0.3&q=80&w=1080"
  image8Alt="Hero Image"
  image2Src="https://i.pinimg.com/736x/8f/c6/1e/8fc61e92b37f541277b42724b9c28ce5.jpg"
  image6Alt="Hero Image"
  image11Src="https://images.unsplash.com/photo-1472506558072-1fe530d75951?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTczOTUwODY2MHw&ixlib=rb-4.0.3&q=80&w=1080"
  image5Alt="Hero Image"
  image1Alt="Urban Security Illustration"
  image7Src="https://i.pinimg.com/736x/0d/97/92/0d9792cf4b06462c102182e03aa450a1.jpg"
  image7Alt="Hero Image"
  image12Alt="Hero Image"
  image2Alt="Hero Image"
  image6Src="https://5.imimg.com/data5/SELLER/Default/2021/6/HF/PV/RK/32877938/residential-building-security-guard-services.jpg"
  image12Src="https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTczOTUwODY2Mnw&ixlib=rb-4.0.3&q=80&w=1080"
  image3Alt="Hero Image"
  image9Src="https://i.pinimg.com/736x/b1/9d/9a/b19d9a14b46cc9e1b321f331a20c240d.jpg"
  image11Alt="Hero Image"
  action2="Learn More"
  action1="Get Started"
  image8Src="https://i.pinimg.com/736x/6d/16/7d/6d167d0e3ecc1ae077ac4ad6d21eaede.jpg"
  image5Src="https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2017/07/12/Pictures/alleging-attacked-mistreatment-wednesday-hindustan-housemaid-deployed_d3f98e5e-672c-11e7-99b4-5703255acffe.jpg"
  image4Src="https://images.unsplash.com/photo-1504121932900-5e28c69ffaf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTczOTUwODY2M3w&ixlib=rb-4.0.3&q=80&w=1080"
  image10Alt="Hero Image"
  image4Alt="Hero Image"
  heading1="Transforming Urban Security"
  content1="Empower your security operations with our comprehensive platform. Enhance transparency, coordination, and oversight for authorities, businesses, and communities."
  image10Src="https://i0.wp.com/opssecuritygroup.com/wp-content/uploads/2021/09/two-security-guards-monitor-cameras.jpg?fit=900%2C1350&ssl=1"
  image9Alt="Hero Image"
  image1Src="https://images.jdmagicbox.com/quickquotes/images_main/commercial-security-guard-service-for-society-2223350025-hl2p5is7.jpg"
/>
     {/* <PaymentButton amount={1}/>  */}

    
      <Features1/>
      <CTA/>

      <Features2/>


      <Pricing/>
      <Steps/>
      {/* <Testimonial/> */}


     
      <Footer/>
      
      {/* <Contact/> */}


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

