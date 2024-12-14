import Footer from "../HomePage_components/Footer"
import Courses from "./courses"
import SearchBar from "./Searchbar"

const Learner_hero = () => {
  return (
         <div className="bg-violet-300 absolute top-[4.9rem] w-dvw h-16 ">
          <div className="mx-auto mt-5 pt-6 pb-36 flex justify-center items-center flex-col text-center bg-violet-300 ">
           <h1 className="hero-heading_2 text-gray-900 special-font mb-5"><b>w</b>elcome to <b>O</b>ur Platfor<b>m</b></h1>
         <div className="flex flex-col w-1/2">
          <SearchBar/>
         </div>
            <p className="text-lg font-general text-white mt-6">Discover new skills and knowledge with our interactive courses</p>
         <div className="px-5 py-5">
            <button className="bg-blue-50 text-black font-bold py-3 px-5 rounded-full block shadow-lg hover:text-violet-500 md:inline-block mx-auto md:mx-0">Explore Courses</button>
         </div>
       </div>
       <Courses/>
       <Footer/>
     </div>
  )
}

export default Learner_hero