import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Landingpage from './Pages/Landingpage';
import Register from './Pages/Register';
import Login from './Pages/Login';
import About from './Pages/AboutPage';
import Resetpassword from './Pages/PasswordReset'
import Otpverification from './Pages/OtpVerification';
import AdminHomepage from './Pages/Admin/AdminHomepage';
import LearnerHomepage from './Pages/Learner/LearnerHomepage';
function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/About" element={<About />} />
      <Route path="/Resetpassword" element={<Resetpassword />} />
      <Route path="/Otpverification" element={<Otpverification />} />
      <Route path="/Admin" element={<AdminHomepage />} />
      <Route path="/Learner" element={<LearnerHomepage />} />
      </Routes>
    </Router>
  );
}

export default App;
