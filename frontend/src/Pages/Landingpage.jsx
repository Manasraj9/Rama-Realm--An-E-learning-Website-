import About from "@/Components/About"
import Contact from "@/Components/Contact"
import Features from "@/Components/Features"
import Footer from "@/Components/Footer"
import Hero from "@/Components/Hero"
import Navbar from "@/Components/Navbar"
import Story from "@/Components/Story"

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
