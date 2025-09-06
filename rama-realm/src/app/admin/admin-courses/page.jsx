import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Bars/Navbar_Admin';
import Footer from '../../Components/HomePage_components/Footer';
import { Box, Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, Switch, FormControlLabel, DialogTitle, TextField, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Dashboard, Message, Settings, Help, AccountBalance, AutoStories, StarBorderPurple500, ManageAccounts } from '@mui/icons-material';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const CoursesAdmin = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseDetails, setCourseDetails] = useState({});
  const [newTrailer, setNewTrailer] = useState(null);
  const [newNotes, setNewNotes] = useState([]);
  const [courseUpdates, setCourseUpdates] = useState([]); // Start with an empty array
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const API_URL = "http://localhost:1337/api/create-courses"; // Update with your Strapi URL
  const location = useLocation(); // Get the current route
  const navigate = useNavigate(); // Navigate programmatically
  const [isPublished, setIsPublished] = useState(true); // Default state: Published
  const [readOnly, setReadOnly] = useState(false);
  const [originalCourseDetails, setOriginalCourseDetails] = useState({
    name: '',
    duration: '',
    description: '',
    subject: '',
    difficulty: '',
    trailer: null,
    notes: [],
    thumbnail: null,
    vrlink: '',
  });
  

  const handlePublishToggle = async (courseId, currentState) => {
    const newState = currentState === "Published" ? "Draft" : "Published"; // Toggle logic

    try {
      const response = await axios.put(`http://localhost:1337/api/create-courses/${courseId}`, {
        data: {
          Course_State: newState,  // Update the course state
        },
      });

      console.log("Course state updated:", response.data);
      toast.success(`Course ${newState} successfully!`);
      fetchCourses(); // Refresh the course list after updating the state
    } catch (error) {
      console.error("Error updating course state:", error);
      toast.error("Failed to update course state.");
    }
  };


  // Handle file upload
  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('files', file);

    try {
      const uploadResponse = await axios.post(`${API_URL.replace('/courses', '')}/upload`, formData);
      return uploadResponse.data[0]; // Return the uploaded file object
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };


  const handleClose = () => {
    setOpen(false);
    setSelectedCourse(null); // Close the deletion dialog
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:1337/api/create-courses/${courseId}`);
      fetchCourses(); // Refresh the course list
      toast.success("Course deleted successfully!");
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Failed to delete course.");
    }
  };

  // In your handleEdit function, set the original course details
const handleEdit = async (course, readOnly = false) => {
  setSelectedCourse(course); // Set the course to be edited
  setIsLoading(true); // Set loading state to true while fetching data
  setReadOnly(readOnly);
  try {
    // Fetch the full details of the course, including trailer and notes
    const response = await axios.get(`http://localhost:1337/api/create-courses/${course.id}`, {
      params: {
        populate: ['Course_trailer', 'Course_Notes'], // Populate the related fields like trailer and notes
      },
    });

    const courseData = response.data.data;

    // Set the course details to be used in the form
    setCourseDetails({
      id: courseData.id,
      name: courseData.attributes.Course_Title || '',
      duration: courseData.attributes.Course_Duration || '',
      description: courseData.attributes.Course_Description || '',
      subject: courseData.attributes.Course_Subject || '',
      difficulty: courseData.attributes.Course_Difficulty || '',
      vrlink: courseData.attributes.Course_VR_link || '',
    });

    // Set the original course details for comparison
    setOriginalCourseDetails({
      name: courseData.attributes.Course_Title || '',
      duration: courseData.attributes.Course_Duration || '',
      description: courseData.attributes.Course_Description || '',
      subject: courseData.attributes.Course_Subject || '',
      difficulty: courseData.attributes.Course_Difficulty || '',
      vrlink: courseData.attributes.Course_VR_link || '',
    });

    setIsLoading(false); // Stop loading
  } catch (error) {
    console.error("Error fetching course details:", error);
    toast.error("Failed to fetch course details.");
    setIsLoading(false);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const dataToSend = {
    Course_Title: courseDetails.name || originalCourseDetails.name,
    Course_Duration: courseDetails.duration || originalCourseDetails.duration,
    Course_Description: courseDetails.description || originalCourseDetails.description,
    Course_Subject: courseDetails.subject || originalCourseDetails.subject,
    Course_Difficulty: courseDetails.difficulty || originalCourseDetails.difficulty,
    Course_VR_link: courseDetails.vrlink || originalCourseDetails.vrlink
  };

  console.log("Data to send:", dataToSend);

  try {
    const response = await axios.put(
      `http://localhost:1337/api/create-courses/${courseDetails.id}`,
      { data: dataToSend }
    );

    console.log('Course updated successfully:', response.data);
    toast.success("Course updated successfully!");

    // Refresh the course list or re-fetch course details after successful update
    fetchCourses(); // Re-fetch courses to see the updated data
  } catch (error) {
    console.error('Error:', error);
    toast.error('Failed to update course.');
  }
};


  // Dialog to confirm course deletion
  const handleClickOpen = (course) => {
    setSelectedCourse(course);
    setOpen(true);
  };

  const sidebarItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/Admin' },
    { text: 'Notification', icon: <Message />, path: '/NotificationAdmin' },
    { text: 'Rating', icon: <StarBorderPurple500 />, path: '/RatingAdmin' },
    { text: 'Courses', icon: <AutoStories />, path: '/CoursesAdmin' },
    { text: 'Revenue', icon: <AccountBalance />, path: '/RevenueAdmin' },
    { text: 'User Management', icon: <ManageAccounts />, path: '/UserManagement' },
    { text: 'Settings', icon: <Settings />, path: '/Adminsettings' },
    { text: 'Help Center', icon: <Help />, path: '/HelpCenterAdmin' },
  ];


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
    <div>
      <Navbar />
      <div className="flex flex-grow">
        {/* Sidebar */}
        <Box
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 240,
              boxSizing: 'border-box',
              position: 'relative',
              top: '64px',
              height: 'calc(100vh - 64px)',
              overflowY: 'auto',
            },
          }}
        >
          <List>
            {sidebarItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => navigate(item.path)} // Navigate to the route without reloading
                sx={{
                  cursor: 'pointer',
                  color: location.pathname === item.path ? 'blue' : 'inherit', // Highlight the active item
                  backgroundColor: location.pathname === item.path ? 'rgba(0, 0, 255, 0.1)' : 'transparent',
                }}
              >
                <ListItemIcon sx={{ color: location.pathname === item.path ? 'blue' : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>

          <Divider />
        </Box>

        <div className="flex-grow p-4">
          <Typography variant="h2" sx={{ marginTop: '20px' }}>Course Listings</Typography>
          <div className="flex flex-wrap gap-5 ml-5 mt-10 justify-center ">
            {Array.isArray(courseUpdates) && courseUpdates.length > 0 ? (
              courseUpdates.map((course) => (
                <Card key={course.id} className='w-100'>
                  <CardContent className='w-80'>
                    <Typography variant="h4">{course.attributes.Course_Title || 'No title available'}</Typography>
                    <Typography variant="body2">
                      Duration: {course.attributes.Course_Duration || 'N/A'} Hours
                    </Typography>
                    <Typography variant="body2" className='truncate'>
                      Description: {course.attributes.Course_Description || 'No description available'}
                    </Typography>
                    <Typography variant="body2">
                      Subject: {course.attributes.Course_Subject || 'No description available'}
                    </Typography>
                    {/* Publish/Unpublish Toggle */}
                    <FormControlLabel
                      control={
                        <Switch
                          checked={course.attributes.Course_State === "Published"} // Check if the course is published
                          onChange={() => handlePublishToggle(course.id, course.attributes.Course_State)} // Pass the course ID and current state
                          color="success"
                          name="publishSwitch"
                          inputProps={{ 'aria-label': 'publish-unpublish toggle' }}
                        />
                      }
                      label={course.attributes.Course_State === "Published" ? "Published" : "Draft"} // Display the correct label
                    />

                    <div className="flex justify-between items-center mt-3">
                      {/* EDIT BUTTON */}

                      <button
                        onClick={() => handleEdit(course)}  // Correct function for Edit
                        className="px-4 py-2 bg-[#3f72af] text-white rounded-md shadow hover:bg-white hover:text-[#3f72af] transform transition duration-300 hover:scale-105"
                      >
                        EDIT
                      </button>

                      {/* DETAILS BUTTON */}
                      <Button
                        className="px-4 py-2 rounded-md shadow text-2xl hover:bg-white hover:text-[#3f72af] transform transition duration-300 hover:scale-105"
                        onClick={(e) => handleEdit(course, true)} // Correct function for Details
                        sx={{
                          backgroundColor: '#3f72af',
                          color: 'white',
                        }}
                      >
                        DETAILS
                      </Button>

                      {/* DELETE BUTTON */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents the click from propagating to parent elements
                          handleClickOpen(course); // Open the Delete confirmation dialog
                        }}
                        className="px-4 py-2 bg-red-500 text-white hover:bg-white hover:text-red-500 rounded-md shadow transform transition duration-300 hover:scale-105"
                      >
                        DELETE
                      </button>

                    </div>

                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="h6">No courses available</Typography>
            )}

          </div>

          <Dialog open={Boolean(selectedCourse)} onClose={() => setSelectedCourse(null)}>
            <DialogTitle className='text-3xl'>{readOnly ? 'Course Details' : 'Edit Course'}</DialogTitle>
            <div>
            <DialogContent className='p-4 flex flex-wrap gap-2.5'>
              <TextField
                disabled={readOnly}
                label="Course Name"
                value={courseDetails.name || ''}
                onChange={(e) => setCourseDetails({ ...courseDetails, name: e.target.value })}
                fullWidth
              />
              <TextField
                disabled={readOnly}
                label="Duration (in hours)"
                value={courseDetails.duration || ''}
                onChange={(e) => setCourseDetails({ ...courseDetails, duration: e.target.value })}
                fullWidth
              />
              <TextField
                disabled={readOnly}
                label="Description"
                value={courseDetails.description || ''}
                onChange={(e) => setCourseDetails({ ...courseDetails, description: e.target.value })}
                fullWidth
                multiline
                rows={4}
              />
              <TextField
                disabled={readOnly}
                label="Subject"
                value={courseDetails.subject || ''}
                onChange={(e) => setCourseDetails({ ...courseDetails, subject: e.target.value })}
                fullWidth
              />
              <TextField
                disabled={readOnly}
                label="Difficulty"
                value={courseDetails.difficulty || ''}
                onChange={(e) => setCourseDetails({ ...courseDetails, difficulty: e.target.value })}
                fullWidth
              />
              <TextField
                disabled={readOnly}
                label="VR link"
                value={courseDetails.vrlink || ''}
                onChange={(e) => setCourseDetails({ ...courseDetails, VR_Link: e.target.value })}
                fullWidth
              />


            </DialogContent>
            </div>
            {!readOnly && <DialogActions>
              <Button onClick={() => setSelectedCourse(null)} sx={{ color: 'red' }}>Cancel</Button>
              <Button onClick={handleSubmit} color="primary">Save</Button>
            </DialogActions>}
          </Dialog>


          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you want to delete this course?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} sx={{ color: 'grey' }}>Cancel</Button>
              <Button onClick={() => handleDeleteCourse(selectedCourse.id)} sx={{ color: 'red' }}>Delete</Button>
            </DialogActions>
          </Dialog>

        </div>
      </div>
    </div>
  );
};

export default CoursesAdmin;
