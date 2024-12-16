import { useEffect, useRef } from "react"
import SearchBar from "./Searchbar"
import Typed from "typed.js"
const Learner_hero = () => {
  const heroRef = useRef(null);
  const typedRef = useRef(null);
  useEffect(() => {
     typedRef.current = new Typed(heroRef.current, {
      strings: ["Discover new skills and knowledge with our interactive courses"],
      startDelay: 150,
      typeSpeed: 95,
      backSpeed: 80,
      backDelay: 50,
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
    <div className="bg-violet-500 absolute h-3/5 w-full top-[4.9rem]">
    <div>
      <div className="mx-auto mt-5 pt-7 pb-32 flex justify-center items-center flex-col text-center ">
        <h1 className=" drop-shadow-lg hero-heading_2 text-gray-900 special-font mb-5"><b>w</b>elcome to <b>O</b>ur Platfor<b>m</b></h1>
        <div className="flex flex-col w-1/3">
          <SearchBar/>
        </div>
        <p className="text-lg font-general text-white mt-6">Unlock your potential with our wide range of courses</p>
        <div className="px-5 py-5">
          <button className="bg-blue-50 text-black font-medium font-circular-web py-3 px-5 shadow-lg rounded-full block hover:text-violet-500 md:inline-block mx-auto md:mx-0">Explore Courses</button>
        </div>
        <p ref={heroRef} className="text-lg drop-shadow-xl font-general text-white w-5/6 mt-6"></p>
      </div>
    </div>
  </div>
  </>  
  )
}

export default Learner_hero