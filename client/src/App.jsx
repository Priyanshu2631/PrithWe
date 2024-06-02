import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Calculator from './pages/Calculator';
import AboutUs from './pages/AboutUs';
import Information from './pages/Information';
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyEmail from './pages/VerifyEmail';
import ResetPassword from './pages/ResetPassword';

import AdminDashBoard from './pages/AdminDashboard';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('/api/auth/login/status', { withCredentials: true });
        if (response.status === 200) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, [loggedIn]);

  return (

    <Router>
      <ToastContainer autoClose={2000} position="top-center" newestOnTop />

      <Layout setLoggedIn={setLoggedIn}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route
            path="/login"
            element={loggedIn ? (<Navigate to="/calculator" />) : (<Login setLoggedIn={setLoggedIn} />)}
          />
          <Route path="/register" element={<Register />} />
          <Route path='/dashboard' element={ <AdminDashBoard/>} />
          <Route path="/information" element={<Information />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/logout" element={<Home />} />
          <Route
            path="/calculator"
            element={loggedIn ? <Calculator /> : <Navigate to="/login" />}
          />
          <Route path='/verifyEmail' element={ <VerifyEmail/>} />
          <Route path='/resetPassword' element={ <ResetPassword/>} />
        </Routes>
      </Layout>

    </Router>
  );
}

export default App;
