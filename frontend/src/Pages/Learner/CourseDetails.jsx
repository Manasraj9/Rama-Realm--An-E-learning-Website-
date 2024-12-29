import Footer from "@/Components/HomePage_components/Footer";
import Learnernavbar from "@/Components/LearnerComponents/Learnernavbar";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import Card, { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";

import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CourseDetails = () => {
  // Add necessary state and hooks
  const params = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add useEffect for fetching course data
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/create-courses/${params.id}?populate=*`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch course details');
        }

        const data = await response.json();
        setCourse(data.data);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
        toast.error('Failed to load course details');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchCourseDetails();
    }
  }, [params.id]);

  useEffect(() => {
    window.scrollTo(0, 0); // Add this line at the start of the component
  }, []);

  // const handleEnrollCourse = () => {
  //   navigate('https://rama-realm.itch.io/vr-modern-room?secret=2JN0d6WuPzNAQJCwLDYC6lFBlwA');
  // };

  // Add loading state
  if (isLoading) {
    return (
      <>
        <Learnernavbar />
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-violet-500"></div>
        </div>
        <Footer />
      </>
    );
  }

  // Add error state
  if (error || !course) {
    return (
      <>
        <Learnernavbar />
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-xl text-gray-600">
            {error || "Course not found"}
          </p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Learnernavbar />
      <div className="space-y-5 mt-24">
        {/* Hero Section */}
        <div className="bg-[#2D2F31] text-white">
          <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
            <h1 className="font-bold text-2xl md:text-3xl">
              {course?.attributes?.Course_Title}
            </h1>
            <p className="text-base md:text-lg">
              {course?.attributes?.Course_Subject}
            </p>
            <div className="flex items-center gap-2">
              <Badge
                className={`
                  ${course?.attributes?.Course_Difficulty === 'Beginner' ? 'bg-green-500' :
                    course?.attributes?.Course_Difficulty === 'Intermediate' ? 'bg-yellow-500' :
                      'bg-red-500'} text-white w-fit
                `}
              >
                {course?.attributes?.Course_Difficulty}
              </Badge>
              {course?.attributes?.Course_Activity && (
                <Badge className="bg-blue-500 text-white">Interactive</Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm mt-2">
              <p>Duration: {course?.attributes?.Course_Duration} hours</p>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
          {/* Left Column - Course Information */}
          <div className="w-full lg:w-1/2 space-y-5">
            <Card>
              <CardHeader>
                <CardTitle>Course Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  {course?.attributes?.Course_Description}
                </p>
              </CardContent>
            </Card>

            {course?.attributes?.Course_Notes?.data && (
              <Card>
                <CardHeader>
                  <CardTitle>Course Materials</CardTitle>
                  <CardDescription>Additional resources for your learning</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {course?.attributes?.Course_trailer?.data && (
                      <p className="text-sm flex items-center gap-2">
                        📚 Course trailer available
                      </p>
                    )}
                    {course?.attributes?.Course_Notes?.data && (
                      <div className="text-sm flex items-center gap-2">
                        📝 Course notes available -
                        <a
                          href={`http://localhost:1337${course.attributes.Course_Notes.data.attributes.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-700 underline"
                        >
                          Download Notes
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Video Player and Course Actions */}
          <div className="w-full lg:w-1/3">
            <Card>
              <CardContent className="p-4">
                <div className="w-full aspect-video mb-4">
                  <ReactPlayer
                    url={`http://localhost:1337${course?.attributes?.Course_trailer?.data?.attributes?.url}`}
                    width="100%"
                    height="100%"
                    controls={true}
                    playing={true}
                    muted={true}
                    loop={true}
                    onError={(e) => {
                      console.error("Error playing video:", e);
                      toast.error("Error playing course trailer");
                    }}
                    onReady={() => {
                      console.log("Video ready to play");
                    }}
                    fallback={
                      <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
                        <p className="text-gray-500">Video loading...</p>
                      </div>
                    }
                  />
                </div>
                <h1 className="text-xl font-semibold mb-2">Course Preview</h1>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">✓ Full lifetime access</p>
                  <p className="text-sm text-gray-600">✓ Access on mobile and desktop</p>
                  <p className="text-sm text-gray-600">✓ Certificate of completion</p>
                </div>
              </CardContent>
              <CardFooter className="p-4">
              <a className="block w-full" target="_blank" href="https://rama-realm.itch.io/vr-modern-room?secret=2JN0d6WuPzNAQJCwLDYC6lFBlwA">
                <Button
                  // onClick={handleEnrollCourse}
                  className="w-full bg-blue-500 text-white hover:bg-blue-600"
                >
                 Open VR
                </Button>
                </a>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetails;
