import { Link } from 'react-router-dom';
import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-buttons">
        <Link to="/signup" className="btn join-btn">Join</Link>
        <Link to="/login" className="btn login-btn">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
