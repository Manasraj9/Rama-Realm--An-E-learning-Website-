import About from "@/Components/LandingPage_components/About"
import Contact from "@/Components/LandingPage_components/Contact"
import Features from "@/Components/LandingPage_components/Features"
import Footer from "@/Components/LandingPage_components/Footer"
import Hero from "@/Components/LandingPage_components/Hero"
import Navbar from "@/Components/LandingPage_components/Navbar"
import Story from "@/Components/LandingPage_components/Story"

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
