import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './components/Signup';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Hiring from './components/Hiring';       // ✅ Bus-Hiring Page
import Parcel from './components/Parcel';       // ✅ Parcel Services Page

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/service1" element={<Hiring />} />     {/* ✅ Bus-Hiring */}
        <Route path="/service2" element={<Parcel />} />     {/* ✅ Parcel Services */}
      </Routes>
    </div>
  );
}

export default App;
