import { useEffect, useRef } from "react"
import SearchBar from "./Searchbar"
import Typed from "typed.js"
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Learner_hero = () => {
  const heroRef = useRef(null)
  const typedRef = useRef(null)
  const videoContainerRef = useRef(null)
  const contentRef = useRef(null)

  // Typed.js animation
  useEffect(() => {
    typedRef.current = new Typed(heroRef.current, {
      strings: [
        "Discover new skills and knowledge with our interactive courses",
        "Completely interactive Virtual Reality Experience",
        "Learn from industry experts and experts in their field"
      ],
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

  // GSAP animations
  useGSAP(() => {
    // Initial clip path animation for video container
    gsap.set(videoContainerRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      borderRadius: '0px'
    });

    // Animate clip path on scroll
    gsap.to(videoContainerRef.current, {
      clipPath: 'polygon(14% 0, 86% 0, 100% 100%, 0 100%)',
      borderRadius: '0px 0px 40% 40%',
      scrollTrigger: {
        trigger: videoContainerRef.current,
        start: 'top top',
        end: 'bottom center',
        scrub: 1,
        toggleActions: 'play none none reverse'
      }
    });

    // Content animations
    gsap.from(contentRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: contentRef.current,
        start: 'top center',
        end: 'center center',
        toggleActions: 'play none none reverse'
      }
    });
  });

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Container with clip-path animation */}
      <div 
        ref={videoContainerRef} 
        className='relative w-full h-[650px] overflow-hidden z-0'
      >
        <video
          src="/videos/Learnerbg.mp4"
          type="video/mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
          onError={(e) => console.error("Video failed to load:", e)}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
      </div>

      {/* Content Container */}
      <div 
        ref={contentRef}
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Hero Heading with Animation */}
            <h1 className="text-6xl md:text-7xl font-bold text-white drop-shadow-lg hero-heading_2 special-font">
              <span className="inline-block hover:scale-105 transition-transform duration-300">
                <b>W</b>elcome to <b>O</b>ur Platfor<b>m</b>
              </span>
            </h1>
            
            {/* Search Bar */}
            <div className="w-full max-w-2xl mx-auto px-4 md:px-0">
              <SearchBar/>
            </div>

            {/* Welcome Text */}
            <p className="text-xl md:text-2xl text-white/90 font-general">
              Unlock your potential with our wide range of courses
            </p>

            {/* Button with hover effects */}
            <div>
              <button 
                className="bg-blue-50 text-black font-medium 
                         py-4 px-8 rounded-full 
                         hover:bg-white hover:text-violet-500 
                         transform hover:scale-105 transition-all duration-300
                         shadow-lg hover:shadow-xl
                         border border-transparent hover:border-violet-300"
              >
                Explore Courses
              </button>
            </div>

            {/* Typed Text */}
            <p 
              ref={heroRef} 
              className="text-xl md:text-2xl text-white/90 
                       font-robert-medium max-w-3xl mx-auto 
                       leading-relaxed drop-shadow-xl h-20"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Learner_hero
