import React, { useState } from 'react';
import Navbar from '../../Components/Bars/Navbar_Admin';
import Footer from '../../Components/HomePage_components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Dashboard, Message, Settings, Help, AccountBalance, AutoStories, StarBorderPurple500, ManageAccounts } from '@mui/icons-material';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';

// Function to format the date
const formatDate = (date) => {
  return new Date(date).toLocaleString();
};

const NotificationAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Your account has been updated.', date: new Date() },
    { id: 2, text: 'New message from the admin.', date: new Date() },
    { id: 3, text: 'System maintenance scheduled for tomorrow.', date: new Date() },
  ]);

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

  // Function to delete a specific notification
  const handleDelete = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    toast.success('Notification deleted!');
  };

  // Function to delete all notifications
  const handleDeleteAll = () => {
    setNotifications([]);
    toast.success('All notifications deleted!');
  };

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
          <List className='bg-slate-200'>
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

        {/* Main Content */}
        <div className="flex flex-col p-6 w-full mr-4">
          {/* Delete All button */}
          <div className="flex justify-between items-center mb-6 mr-3">
            <h2 className="text-xl font-semibold">Notifications</h2>
            <button
              onClick={handleDeleteAll}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Delete All
            </button>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="relative bg-gray-100 p-2 border rounded-md shadow-sm"
              >
                <div className="flex justify-betw-een items-start">
                  <div className="flex flex-col">
                    <p className="text-[1.06rem] text-gray-900">{notification.text}</p>
                    <span className="text-balance text-gray-500">{formatDate(notification.date)}</span>
                  </div>
                </div>

                {/* Delete button */}
                <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
                  <button
                    onClick={() => handleDelete(notification.id)}
                    className="bg-red-500 text-white text-[1rem] px-4 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NotificationAdmin;