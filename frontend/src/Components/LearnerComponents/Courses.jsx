import { useState } from "react"
import CardSkeleton from "./CardSkeleton"
import Course from "./Course"
const Courses = () => {
  const [cardLoaded, setCardLoaded] = useState(false)

  return (
    <div className="mt-7 mb-4">
      <div className="flex justify-center">
        <div className="text-3xl font-robert-medium text-gray-950">Our Courses</div>
      </div>
      <div className="mt-10 px-8 mb-10">
        {cardLoaded ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {Array.from({ length: 6 }).map((_, index) => (
            <Course Key={index}/>
            ))}
          </div>
        )}
        <div>
        </div>
      </div>
  </div>
  )
}

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <CardSkeleton className="w-full h-36"/>
      <div className="px-5 py-4 space-y-3">
        <CardSkeleton className="w-3/4 h-6"/>
        <div className=" flex item-center justify-between">
          <div className=" flex items-center gap-3">
            <CardSkeleton className="w-6 h-6 rounded-full"/>
            <CardSkeleton className="w-20 h-4 rounded-full"/>
          </div>
          <CardSkeleton className="w-16 h-4"/>
        </div>
        <CardSkeleton className="w-1/4 h-4"/>
      </div>
    </div>
  );
};
export default Courses

