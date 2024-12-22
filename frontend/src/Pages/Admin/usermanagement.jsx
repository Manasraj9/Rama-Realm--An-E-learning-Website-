import React from 'react'
import Navbar from '../../Components/Bars/Navbar_Admin';
import Footer from '../../Components/HomePage_components/Footer';
import Dash_board from '../../Components/Dashboard/Dashboard'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Dashboard, Message, Settings, Help, AccountBalance, AutoStories, StarBorderPurple500, ManageAccounts } from '@mui/icons-material';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, } from '@mui/material';

const usermanagement = () => {
    const location = useLocation(); // Get the current route
    const navigate = useNavigate(); // Navigate programmatically

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
                                <ListItemText
                                    primary={item.text}
                                />
                            </ListItem>
                        ))}
                    </List>

                    <Divider />
                </Box>
            </div>

            {/* Footer */}
            <Footer />

        </div>
    )
}

export default usermanagement
