import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    publishedCourses: 0,
  });
  const [loading, setLoading] = useState(true);

  // Bar Chart Data
  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Enrolled students',
        data: [12, 10, 12, 14, 10, 10, 15],
        backgroundColor: '#f59e0b',
      },
      {
        label: 'Course Completed',
        data: [4, 3, 2, 5, 0, 2, 1],
        backgroundColor: '#6366f1',
      },
    ],
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    const fetchCourseCounts = async () => {
      try {
        // Fetch all courses from the Strapi API
        const response = await fetch("http://localhost:1337/api/create-courses");
        const data = await response.json();

        const courses = data?.data || [];

        // Count total courses and published courses
        const totalCourses = courses.length;
        const publishedCourses = courses.filter(
          (course) => course.attributes.Course_State === "Published"
        ).length;

        setStats({ totalCourses, publishedCourses });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course counts:", error);
        setLoading(false);
      }
    };

    fetchCourseCounts();
  }, []);


  return (
    <div className="p-6 bg-gray-100 min-h-screen ">
      {/* Header Section */}
      <div className="grid grid-cols-4 gap-4 mb-6 ">
        {/* Stats Cards */}
        <div className="p-4 bg-blue-600 text-white rounded-lg">
          <h3 className="text-xl font-bold">0</h3>
          <p>Total Enrolled Students</p>
        </div>
        <div className="p-4 bg-green-500 text-white rounded-lg">
          <h3 className="text-xl font-bold">0</h3>
          <p>Total Revenue</p>
        </div>
        <div className="p-4 bg-indigo-600 text-white rounded-lg">
          <h3 className="text-xl font-bold">0</h3>
          <p>Rating</p>
        </div>
        <div className="p-4 bg-indigo-600 text-white rounded-lg">
          <h3 className="text-xl font-bold">{stats.publishedCourses}</h3>
          <p>Pulished Courses</p>
        </div>
        
      </div>

      {/* Job Statistics Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Enrollment statistics</h2>
        <div className="flex">
          {/* Bar Chart */}
          <div className="w-2/3">
            <Bar data={barData} options={barOptions} />
          </div>

          {/* Summary */}
          <div className="w-1/3 pl-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-bold">Total course</h3>
                <p className="text-2xl font-bold">{stats.totalCourses}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
