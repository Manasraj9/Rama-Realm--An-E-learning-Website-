import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Bars/Navbar_Admin';
import Footer from '../../Components/HomePage_components/Footer';
import Dash_board from '../../Components/Dashboard/Dashboard'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Dashboard, Message, Settings, Help, AccountBalance, AutoStories, StarBorderPurple500, ManageAccounts } from '@mui/icons-material';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, MenuItem, Select, FormControl, InputLabel, } from '@mui/material';

const usermanagement = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const location = useLocation();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10); 

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
    const fetchUsers = async () => {
      setLoading(true); // Start loading indicator
      try {
        const response = await fetch(`${BACKEND_URL}/api/users`); // Assuming Strapi endpoint
        const usersData = await response.json();
        setUsers(usersData); // Set the fetched users
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Ensure loading state is set to false after data is fetched or on error
      }
    };

    fetchUsers();
  }, [page, perPage]);

  const handleBlockToggle = async (userId, isBlocked) => {
    try {
      console.log('Toggling block status for user:', userId);
      const response = await axios.put(`${BACKEND_URL}/api/users/${userId}`, {
        blocked: !isBlocked,
      });

      if (response.status === 200) {
        toast.success('User block status updated successfully', {
          position: 'top-right',
          autoClose: 5000,
        });

        // Update the blocked status in the local state
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, blocked: !isBlocked } : user
          )
        );
      }
    } catch (error) {
      console.error('Error toggling block status:', error);
      toast.error('Failed to update block status. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Content Section with Sidebar and Main Content */}
      <div className="flex flex-grow">
        {/* Sidebar */}
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
          {/* User Management Content */}
          <h1 className='text-2xl font-bold'>User Management</h1>

          {/* Table Section */}
          <TableContainer component={Paper} className='mt-10'>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>User Type</TableCell>
                  <TableCell>Blocked</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.userType}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleBlockToggle(user.id, user.blocked)}
                        variant={user.blocked ? 'contained' : 'outlined'}
                        color={user.blocked ? 'error' : 'success'}
                      >
                        {user.blocked ? 'Unblock' : 'Block'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '10px',
            }}
          >
            <FormControl size="small" sx={{ width: '100px' }}>
              <InputLabel>Rows</InputLabel>
              <Select
                defaultValue={10}
                label="Rows"
                onChange={(e) => setPerPage(e.target.value)}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>
            </FormControl>
            <Box>Page {page}</Box>
          </Box>
        </div>
      </div>

      {/* Footer */}
      <Footer />

    </div>
  )
}

export default usermanagement
