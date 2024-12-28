import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import  Card,{ CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Course = ({ courseId }) => {
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/create-courses/${courseId}?populate=*`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch course details");
        }

        const data = await response.json();
        setCourse(data.data);
      } catch (error) {
        console.error("Error fetching course:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!course) return <div>No course data available</div>;

  return (
    <Link to={`/course-details/${course.id}`}>
      <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <div className="relative">
          <img
            src={
              course.attributes.Course_Thumbnail?.data?.attributes?.url
                ? `http://localhost:1337${course.attributes.Course_Thumbnail.data.attributes.url}`
                : "/default-course-thumbnail.jpg"
            }
            alt={course.attributes.Course_Title || "Course Thumbnail"}
            className="w-full h-36 object-cover rounded-t-lg"
          />
        </div>

        <CardContent className="px-5 py-4 space-y-3">
          <h1 className="hover:underline font-bold text-lg truncate">
            {course.attributes.Course_Title || "Untitled Course"}
          </h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={course.attributes.creator?.data?.attributes?.photoUrl || "/default-avatar.jpg"}
                />
                <AvatarFallback>
                  {course.attributes.creator?.data?.attributes?.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <h1 className="font-medium text-sm">
                {course.attributes.creator?.data?.attributes?.name || "Unknown Instructor"}
              </h1>
            </div>
            <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
              {course.attributes.Course_Difficulty || "Unknown Difficulty"}
            </Badge>
          </div>

          <div className="text-lg font-bold text-blue-600">
            <span>
              Duration: {course.attributes.Course_Duration || "N/A"} hours
            </span>
          </div>

          {course.attributes.Course_State === "Published" && (
            <Badge className="bg-green-500 text-white px-2 py-1 text-xs rounded-full">
              Published
            </Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;
