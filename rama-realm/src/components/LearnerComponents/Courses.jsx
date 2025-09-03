import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Card,{  CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CardSkeleton from './CardSkeleton';
import { toast } from 'react-toastify';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:1337/api/create-courses?populate=*', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }

      const data = await response.json();
      // Only show published courses
      const publishedCourses = data.data.filter(
        course => course.attributes.Course_State === "Published"
      );
      setCourses(publishedCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <CardSkeleton key={index} className="h-[300px]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link 
            key={course.id} 
            to={`/Learner/CourseDetails/${course.id}`}
            className="transform hover:scale-105 transition-transform duration-300"
          >
            <Card className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* Course Thumbnail */}
              <div className="relative h-48">
                <img
                  src={
                    course.attributes.Course_Thumbnail?.data?.attributes?.url
                      ? `http://localhost:1337${course.attributes.Course_Thumbnail.data.attributes.url}`
                      : '/default-course-image.jpg'
                  }
                  alt={course.attributes.Course_Title}
                  className="w-full h-full object-cover"
                />
                {course.attributes.Course_Activity && (
                  <Badge className="absolute top-2 right-2 bg-blue-500 text-white">
                    Interactive
                  </Badge>
                )}
              </div>

              <CardContent className="p-4">
                {/* Course Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">
                  {course.attributes.Course_Title}
                </h3>

                {/* Course Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.attributes.Course_Description}
                </p>

                {/* Course Details */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Badge className={`
                      ${course.attributes.Course_Difficulty === 'Beginner' ? 'bg-green-500' : 
                        course.attributes.Course_Difficulty === 'Intermediate' ? 'bg-yellow-500' : 
                        'bg-red-500'} text-white`}
                    >
                      {course.attributes.Course_Difficulty}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-600">
                    {course.attributes.Course_Duration} hours
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Courses;
