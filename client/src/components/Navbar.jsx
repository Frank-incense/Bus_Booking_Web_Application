import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout  } = useContext(AuthContext);
  
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    logout(); 
    navigate('/login');
  };
  

  return (
    <header className="navbar">
      <div className="navbar-left">
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>

      <div className="navbar-right">
        <button className="hamburger" onClick={toggleMenu}>☰</button>
        <nav className={`nav-links ${menuOpen ? 'menu-open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>

          { !user && (
            <>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="btn join">Join</Link>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="btn login">Login</Link>
            </>
          )}

          {user?.role === 'Driver' ? (
            <>
              <Link to="/admin" onClick={() => setMenuOpen(false)} className="btn driver">Driver</Link>
              <button onClick={handleLogout} className="btn logout">Logout</button>
            </>
          ): null}

          {user?.role === 'Admin' ?(
            <>
              <Link to="/admin" onClick={() => setMenuOpen(false)} className="btn admin">Admin</Link>
              <button onClick={handleLogout} className="btn logout">Logout</button>
            </>
          ): null}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
