import Footer from '@/Components/LearnerComponents/Footer_learner'
import Learnernavbar from '@/Components/LearnerComponents/Learnernavbar'
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Card,{
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ReactPlayer from "react-player/lazy"
import { useNavigate, useParams } from "react-router-dom"

const CourseDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleContinueCourse = () => {
    navigate('/Login'); // This will redirect to login page if not authenticated
  };

  return (
    <>
      <Learnernavbar/>
      <div className="space-y-5 mt-24">
        {/* Hero Section */}
        <div className="bg-[#2D2F31] text-white">
          <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
            <h1 className="font-bold text-2xl md:text-3xl">
              {course?.courseTitle || "Interactive VR Course"}
            </h1>
            <p className="text-base md:text-lg">Master Virtual Reality Development</p>
            <p>
              Created By{" "}
              <span className="text-[#C0C4FC] underline italic">
                {course?.creator?.name || "John Doe"}
              </span>
            </p>
            <div className="flex items-center gap-2 text-sm">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
          {/* Left Column - Course Information */}
          <div className="w-full lg:w-1/2 space-y-5">
            <h1 className="font-bold text-xl md:text-2xl">Description</h1>
            <p className="text-sm">
              This comprehensive course will teach you everything you need to know about Virtual Reality development.
              From basic concepts to advanced implementations, you'll learn through hands-on projects and real-world examples.
            </p>

            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <CardDescription>Course Modules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Example course modules - replace with actual data */}
                {['Introduction to VR', 'VR Development Basics', 'Advanced Interactions', 'Final Project'].map((module, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm p-2 hover:bg-gray-100 rounded-lg">
                    <span className="text-blue-500">📚</span>
                    <p>{module}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Video Player and Course Actions */}
          <div className="w-full lg:w-1/3">
            <Card>
              <CardContent className="p-4">
                <div className="w-full aspect-video mb-4">
                  <ReactPlayer
                    url="https://www.youtube.com/watch?v=example"
                    width="100%"
                    height="100%"
                    controls={true}
                  />
                </div>
                <h1 className="text-xl font-semibold mb-2">Course Preview</h1>
                <div className="space-y-2">
                  <p>✓ Full lifetime access</p>
                  <p>✓ Access on mobile and desktop</p>
                  <p>✓ Certificate of completion</p>
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Button 
                  onClick={handleContinueCourse}
                  className="w-full bg-blue-500 text-white hover:bg-blue-600"
                >
                  Enroll Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default CourseDetails
