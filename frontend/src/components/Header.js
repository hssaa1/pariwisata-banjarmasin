import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <nav className="nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          Pariwisata Banjarmasin
        </Link>
        
        {/* Hamburger Button */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={closeMenu}>Beranda</Link></li>
          <li><Link to="/wisata" onClick={closeMenu}>Wisata</Link></li>
          <li><Link to="/events" onClick={closeMenu}>Event</Link></li>
          <li><Link to="/kuliner" onClick={closeMenu}>Kuliner</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;