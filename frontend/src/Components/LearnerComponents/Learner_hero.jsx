import { useEffect, useRef } from "react"
import SearchBar from "./Searchbar"
import Typed from "typed.js"
const Learner_hero = () => {
  const heroRef = useRef(null);
  const typedRef = useRef(null);
  useEffect(() => {
     typedRef.current = new Typed(heroRef.current, {
      strings: ["Discover new skills and knowledge with our interactive courses","Completely interactive Virtual Reality Experience","Learn from industry experts and experts in their field"],
      startDelay: 150,
      typeSpeed: 60,
      backSpeed: 70,
      backDelay: 70,
      showCursor: false,
      cursorChar: "!",
      loop: true
    });
    return () => {
      typedRef.current.destroy();
    };
  }, []);
  return (
    <>
    <div className='bg-white flex justify-center z-0'>
                <video
                    src="/videos/Learnerbg.mp4"
                    type="video/mp4"
                    autoPlay
                    loop
                    muted
                    className="w-full max-h-[650px] bg-white object-cover"
                    onError={(e) => console.error("Video failed to load:", e)}
                />
            </div>
  <div className="container mx-auto px-4 absolute top-8">
    <div className="mx-auto mt-5 pt-7 pb-32 flex justify-center items-center flex-col text-center">
      {/* Hero Heading with Animation */}
      <h1 className="drop-shadow-lg hero-heading_2 text-slate-50 special-font mb-8">
        <span className="inline-block hover:scale-105 transition-transform duration-300">
          <b>W</b>elcome to <b>O</b>ur Platfor<b>m</b>
        </span>
      </h1>
      
      {/* Search Bar with Better Width Control */}
      <div className="w-full max-w-2xl px-4 md:px-0 mb-8">
        <SearchBar/>
      </div>

      {/* Welcome Text with Better Contrast */}
      <p className="text-lg md:text-xl font-general text-slate-50 mt-6 mb-8 max-w-2xl">
        Unlock your potential with our wide range of courses
      </p>

      {/* Enhanced Button */}
      <div className="mb-8">
        <button 
          className="bg-blue-50 text-black font-medium font-circular-web 
                     py-3 px-8 shadow-lg rounded-full 
                     hover:bg-white hover:text-violet-500 
                     transform hover:scale-105 transition-all duration-300
                     border border-transparent hover:border-violet-300
                     md:inline-block mx-auto"
        >
          Explore Courses
        </button>
      </div>

      {/* Typed Text Container with Better Visibility */}
      <p 
        ref={heroRef} 
        className="text-lg md:text-xl font-robert-medium text-slate-50 
                   max-w-3xl mx-auto leading-relaxed
                   drop-shadow-xl animate-fade-in h-8"
      ></p>
    </div>
  </div>

  </>  
  )
}

export default Learner_hero