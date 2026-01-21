import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {ToastContainer} from "react-toastify"
import LoginPage from './pages/login/Login.jsx';
import RegisterPage from './pages/register/Register.jsx';
import LandingPage from './components/home/LandingPage.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';

const App = () => {
  return (
    <Router>
      <ToastContainer />
        <Routes>
           <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
  )
}

export default App