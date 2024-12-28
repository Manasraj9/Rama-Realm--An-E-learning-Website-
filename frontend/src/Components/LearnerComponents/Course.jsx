// import React from 'react'
import Card, { CardContent } from '../ui/card'
import {Avatar} from '../ui/avatar'
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {Badge} from '../ui/badge'
import { Link } from 'react-router-dom'
const Course = () => {

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:1337/api/create-courses', {
        params: {
          populate: ['Course_trailer', 'Course_Notes'],
        },
      });

      const courses = response.data.data || []; // Ensure the courses variable is an array

      const enrichedCourses = await Promise.all(
        courses.map(async (course) => {
          const trailerId = course.attributes.Course_trailer?.data?.id;
          const notesData = course.attributes.Course_Notes?.data;

          // Handle notes safely
          const notesIds = Array.isArray(notesData)
            ? notesData.map(note => note.id) // Extract IDs if it's an array
            : notesData
              ? [notesData.id] // Wrap a single object in an array
              : []; // Default to an empty array

          // Fetch trailer details
          const trailer = trailerId
            ? await axios.get(`http://localhost:1337/api/upload/files/${trailerId}`)
            : null;

          // Fetch notes details
          const notes = notesIds.length
            ? await Promise.all(
              notesIds.map(id => axios.get(`http://localhost:1337/api/upload/files/${id}`))
            )
            : [];

          return {
            ...course,
            trailer: trailer?.data || null,
            notes: notes.map(noteResponse => noteResponse.data),
            state: course.attributes.State || "Draft",
          };
        })
      );

      setCourseUpdates(enrichedCourses); // Ensure courseUpdates is correctly updated
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to fetch courses.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();  // Fetch courses when the component mounts
  }, []);

  return (
    <Link to='/Learner/CourseDetails'>
    <Card className="overflow-hidden rounded-lg h-[19rem] bg-slate-200 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className='mb-3'>
        <img
          src="https://img-c.udemycdn.com/course/750x422/3873464_403c_3.jpg"
          alt="course"
          className='w-full h-36 object-cover rounded-t-lg'
          />
      </div>
      <CardContent>
        <h3 className='hover:underline font-bold text-lg truncate mb-3'>Nextjs Complete Course in Hindi 2024</h3>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <h2 className='font-robert-regular text-sm'>John Doe</h2>
          </div>
          <Badge className={'bg-violet-300 text-white font-medium font-circular-web py-2 px-4 shadow-lg rounded-full block hover:text-violet-500 md:inline-block mx-auto md:mx-0'}>
            interactive
          </Badge>
        </div>
        <div className='mt-3 hover:underline text-sm font-circular-web'>
          <h2>A interactive course by John Doe. Where you can learn new skills and knowledge</h2>
        </div>
      </CardContent>
    </Card>
  </Link>
  )
}

export default Course
