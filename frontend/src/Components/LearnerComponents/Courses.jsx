import { useState } from "react"
const Courses = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cardLoaded, setCardLoaded] = useState(0)

  return (
    <div className="mt-[35rem] mb-4">
      {isLoading &&(
                  <div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
                       <div className='three-body'>
                           <div className='three-body__dot'></div>
                           <div className='three-body__dot'></div>
                           <div className='three-body__dot'></div>
                       </div>    
                  </div>
         )}
      <div className="flex justify-center">
        <div className="text-3xl font-robert-medium text-gray-950">Our Courses</div>
      </div>
      <div>
        <div>

        </div>
      </div>
  </div>
  )
}

export default Courses