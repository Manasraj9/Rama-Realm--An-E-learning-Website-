import About from "@/components/LandingPage_components/About"
import Contact from "@/components/LandingPage_components/Contact"
import Features from "@/components/LandingPage_components/Features"
import Footer from "@/components/LandingPage_components/Footer"
import Hero from "@/components/LandingPage_components/Hero"
import Navbar from "@/components/LandingPage_components/Navbar"
import Story from "@/components/LandingPage_components/Story"

const Landingpage = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact/>
      <Footer/>
    </main>
  )
}

export default Landingpage
