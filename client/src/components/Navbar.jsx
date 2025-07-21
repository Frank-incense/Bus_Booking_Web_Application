import React from 'react'
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
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>
          <div className="dropdown">
            <button className="dropbtn">Services ▼</button>
            <div className="dropdown-content">
              <a href="#">Service 1</a>
              <a href="#">Service 2</a>
              <a href="#">Service 3</a>
            </div>
          </div>
        </nav>
      </div>
      <div className="navbar-right">
        <Link to="/signup" className="btn join">Join</Link>
        <Link to="/login" className="btn login">Login</Link>
      </div>
    </header>
  );
};

export default Navbar;
