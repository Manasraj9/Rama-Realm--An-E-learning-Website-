import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Landingpage from './Pages/Landingpage';
import Register from './Pages/Register';
import Login from './Pages/Login';

import Resetpassword from './Pages/PasswordReset'
import Otpverification from './Pages/OtpVerification';
// importing Admin features
import AdminHomepage from './Pages/Admin/AdminHomepage';
import NotificationAdmin from './Pages/Admin/NotificationAdmin';
import AdminCourses from './Pages/Admin/CoursesAdmin';
import RatingAdmin from './Pages/Admin/Rating';
import RevenueAdmin from './Pages/Admin/RevenueAdmin';
import UserManagement from './Pages/Admin/UserManagement';
import AdminHelpcenter from './Pages/Admin/HelpcenterAdmin';
import CreateCourse from './Pages/Admin/CreateCourse';
// importing Learner features
import LearnerHomepage from './Pages/Learner/LearnerHomepage';
import CourseDetails from './Pages/Learner/CourseDetails';
function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      <Routes>
        <Route path='/Pricing' element={<Pricing />} />
        <Route path="/" element={<Landingpage />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Resetpassword" element={<Resetpassword />} />
        <Route path="/Otpverification" element={<Otpverification />} />
        {/* importing Admin features */}
        <Route path="/Admin" element={<AdminHomepage />} />
        <Route path="/NotificationAdmin" element={<NotificationAdmin />} />
        <Route path="/CoursesAdmin" element={<AdminCourses />} />
        <Route path="/RatingAdmin" element={<RatingAdmin />} />
        <Route path="/RevenueAdmin" element={<RevenueAdmin />} />
        <Route path="/UserManagement" element={<UserManagement />} />
        <Route path="/HelpCenterAdmin" element={<AdminHelpcenter />} />
        <Route path="/CreateCourse" element={<CreateCourse />} />
        {/* importing Admin features */}
        <Route path="/Learner" element={<LearnerHomepage />} />
        <Route path="/Learner/CourseDetails" element={<CourseDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
