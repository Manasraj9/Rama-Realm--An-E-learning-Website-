import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './Pages/Landingpage';
import Register from './Pages/Register';
import Login from './Pages/Login';
import About from './Pages/AboutPage';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/About" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
