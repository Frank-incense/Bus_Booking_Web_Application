import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <img src="/logo.png" alt="Logo" className="logo" />
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
          {/* You can re-enable dropdown here if needed */}
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
