import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Bars/Navbar_Admin';
import Footer from '../../Components/HomePage_components/Footer';
import { Box, Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
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

  // Fetch courses from the API
  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:1337/api/create-courses', {
        params: {
          populate: ['trailer', 'notes'], // Ensuring trailer and notes are populated
        }
      });

      console.log(response.data); // Log to verify the response structure

      // Ensure response contains data and it's an array
      const courses = Array.isArray(response.data.data) ? response.data.data : [];
      setCourseUpdates(courses); // Set the courses in state

    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error("Failed to fetch courses.");
    } finally {
      setIsLoading(false);
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

  // Save or update course
  const handleSaveCourse = async () => {
    const isEdit = Boolean(courseDetails.id);
    const url = isEdit ? `${API_URL}/${courseDetails.id}` : API_URL;
    const method = isEdit ? "put" : "post";

    // Upload trailer
    let trailerData = null;
    if (newTrailer) {
      trailerData = await handleFileUpload(newTrailer);
    }

    // Upload notes
    let notesData = [];
    if (newNotes.length > 0) {
      const uploadedNotes = await Promise.all(newNotes.map(handleFileUpload));
      notesData = uploadedNotes.filter(Boolean); // Filter out failed uploads
    }

    const data = {
      ...courseDetails,
      trailer: trailerData ? trailerData.id : courseDetails.trailer?.id,
      notes: notesData.map(note => note.id),
    };

    try {
      await axios[method](url, { data });
      fetchCourses();
      setSelectedCourse(null); // Close the edit dialog
      toast.success(isEdit ? "Course updated successfully!" : "Course created successfully!");
    } catch (error) {
      console.error("Error saving course:", error);
      toast.error("Failed to save course.");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCourse(null); // Close the deletion dialog
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`${API_URL}/${courseId}`);
      fetchCourses(); // Refresh the course list
      toast.success("Course deleted successfully!");
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Failed to delete course.");
    }
  };

  // Handle course selection for editing
  const handleEdit = (course) => {
    setSelectedCourse(course);
    setCourseDetails({
      name: course.Course_Title,
      instructor: course.Course_instructor,
      duration: course.Course_Duration,
      description: course.Course_Description,
      prerequisites: course.Course_prerequisites,
      syllabus: course.Course_syllabus,
    });
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

  useEffect(() => {
    fetchCourses(); // Fetch courses on component mount
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-grow">
        <Box sx={{
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
        }}>
          <List>
            {sidebarItems.map((item) => (
              <ListItem button key={item.text} onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>

        <div className="flex-grow p-4">
          <Typography variant="h4" sx={{ marginTop: '20px' }}>Course Listings</Typography>
          <div className="flex flex-wrap gap-2.5 mt-5 ml-10">
            {Array.isArray(courseUpdates) && courseUpdates.length > 0 ? (
              courseUpdates.map((course) => (
                <Card key={course.id} sx={{ marginBottom: '20px', width: '53vh' }}>
                  <CardContent>
                    <Typography variant="h4">{course.attributes.Course_Title || 'No title available'}</Typography>
                    <Typography variant="body2">
                      Duration: {course.attributes.Course_Duration || 'N/A'} Hours
                    </Typography>
                    <Typography variant="body2">
                      Description: {course.attributes.Course_Description || 'No description available'}
                    </Typography>



                    <Typography variant="body2">Trailer:
                      <video controls width="100%">
                        <source src={course.attributes.Course_trailer} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </Typography>



                    {/* Display the course notes */}
                    {course.attributes.notes && (
                      <div>
                        <Typography variant="body2">Notes:</Typography>
                        <ul>
                          {course.attributes.notes.map((note, index) => (
                            <li key={index}>{note}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex justify-between items-center mt-3">
                      <button
                        onClick={() => handleEdit(course)}
                        className="px-4 py-2 bg-[#3f72af] text-white rounded-md shadow"
                      >
                        EDIT
                      </button>
                      <Link to={`/details/${course.id}`}>
                        <Button
                          className="px-4 py-2 rounded-md shadow text-2xl"
                          sx={{
                            backgroundColor: '#3f72af',
                            color: 'white',
                            '&:hover': { backgroundColor: 'white', color: '#3f72af' },
                          }}
                        >
                          Details
                        </Button>
                      </Link>
                      <button
                        onClick={() => handleClickOpen(course)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md shadow"
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

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you want to delete this course?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} sx={{ backgroundColor: 'grey', color: 'white' }}>Cancel</Button>
              <Button onClick={() => handleDeleteCourse(selectedCourse._id)} sx={{ backgroundColor: 'red', color: 'white' }}>Delete</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={Boolean(selectedCourse)} onClose={() => setSelectedCourse(null)}>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogContent>
              <TextField label="Course Name" value={courseDetails.name} onChange={(e) => setCourseDetails({ ...courseDetails, name: e.target.value })} fullWidth />
              <TextField label="Instructor" value={courseDetails.instructor} onChange={(e) => setCourseDetails({ ...courseDetails, instructor: e.target.value })} fullWidth />
              <TextField label="Duration (weeks)" value={courseDetails.duration} onChange={(e) => setCourseDetails({ ...courseDetails, duration: e.target.value })} fullWidth />
              <TextField label="Description" value={courseDetails.description} onChange={(e) => setCourseDetails({ ...courseDetails, description: e.target.value })} fullWidth multiline rows={4} />
              <TextField label="Prerequisites" value={courseDetails.prerequisites} onChange={(e) => setCourseDetails({ ...courseDetails, prerequisites: e.target.value })} fullWidth />
              <TextField label="Syllabus" value={courseDetails.syllabus} onChange={(e) => setCourseDetails({ ...courseDetails, syllabus: e.target.value })} fullWidth multiline rows={6} />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedCourse(null)}>Cancel</Button>
              <Button color="primary" onClick={handleSaveCourse}>Save</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CoursesAdmin;
