import React from 'react';
import "./App.css";
import Home from './components/homepage/home';
import Login from './components/login/login';
import Register from './components/register/register';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OTP_verification from './components/register/otp_verification';
import LandingPage from './components/homepage/landing';

function App() {
  return (
    <div className="app" >
      <BrowserRouter >
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<LandingPage/>} />
          <Route path='/verify_otp' element={<OTP_verification />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
