import React from 'react'
import Navbar from '../../Components/Bars/Navbar';
import Footer from '../../Components/HomePage_components/Footer';
import Dashboard from '../../Components/Dashboard/Dashboard'
import DashboardIcon from '@mui/icons-material/Dashboard';
import MessageIcon from '@mui/icons-material/Message';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PeopleIcon from '@mui/icons-material/People';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import Groups3Icon from '@mui/icons-material/Groups3';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import WorkIcon from '@mui/icons-material/Work';
import {
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from '@mui/material';
const AdminHomepage = () => {
    const sidebarItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/Admin' },
        { text: 'Messages', icon: <MessageIcon />, path: '/notifications/${companyId}' },
        { text: 'Rating', icon: <AccountBoxIcon />, path: '/Companyprofile' },
        { text: 'Courses', icon: <WorkIcon />, path: '/joblisting' },
        { text: 'Revenue', icon: <WorkIcon />, path: '/joblisting' },
        { text: 'User Management', icon: <WorkIcon />, path: '/joblisting' },
        { text: 'Settings', icon: <SettingsIcon />, path: '/my-schedule' },
        { text: 'Help Center', icon: <HelpIcon />, path: '/help-center' },
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
              component="a"
              href={item.path}
              sx={{
                color: location.pathname === item.path ? 'blue' : 'inherit', // Change color to blue if active
                backgroundColor: location.pathname === item.path ? 'rgba(0, 0, 255, 0.1)' : 'transparent', // Add a light blue background if active
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
      <div className="flex-grow p-4">
        <Dashboard />
      </div>
    </div>

    {/* Footer */}
    <Footer />
  </div>
  )
}

export default AdminHomepage

