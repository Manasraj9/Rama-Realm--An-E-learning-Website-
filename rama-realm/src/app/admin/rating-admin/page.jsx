import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Bars/Navbar_Admin';
import Footer from '../../Components/HomePage_components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Dashboard, Message, Settings, Help, AccountBalance, AutoStories, StarBorderPurple500, ManageAccounts } from '@mui/icons-material';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';

const RatingAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [averageRating, setAverageRating] = useState(0);
  const courseId = 43; // Example courseId; replace with actual courseId dynamically

  useEffect(() => {
    // Fetch the course details to get the average rating
    axios.get(`http://localhost:1337/api/create-courses/${courseId}`)
      .then((response) => {
        const course = response.data;
        setAverageRating(course.averageRating || 0);
      })
      .catch((error) => {
        console.error('Error fetching course data:', error);
      });
  }, [courseId]);

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

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Content Section with Sidebar and Main Content */}
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
                onClick={() => navigate(item.path)}
                sx={{
                  cursor: 'pointer',
                  color: location.pathname === item.path ? 'blue' : 'inherit',
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

        {/* Main Content Section */}
        <div style={{ padding: '20px', flexGrow: 1 }}>
          <h3>Average Rating: </h3>
          <div style={{ fontSize: '40px' }}>
            {/* Render stars based on the average rating */}
            {Array.from({ length: 5 }).map((_, index) => {
              const ratingValue = index + 1;
              if (ratingValue <= averageRating) {
                return <span key={index} style={{ color: 'yellow' }}>★</span>;  // Filled Star
              } else if (ratingValue - 0.5 <= averageRating) {
                return <span key={index} style={{ color: 'orange' }}>★</span>;  // Half Star (orange)
              }
              return <span key={index} style={{ color: 'gray' }}>★</span>;  // Empty Star
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RatingAdmin;
