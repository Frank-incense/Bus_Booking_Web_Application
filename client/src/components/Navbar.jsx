import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <img src="/logo.png" alt="Logo" className="logo" />
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
          <div className="dropdown">
            <button className="dropbtn">Services ▼</button>
            <div className="dropdown-content">
              <Link to="/service1">Bus-Hiring Services</Link>
              <Link to="/service2">Parcel Services</Link>
              
            </div>
          </div>
        </nav>
      </div>
      <div className="navbar-right">
        <Link to="/signup" className="btn join">Join</Link>
        <Link to="/login" className="btn login">Login</Link>
        <Link to="/admin" className="btn admin">Admin</Link>
      </div>
    </header>
  );
};

export default Navbar;
