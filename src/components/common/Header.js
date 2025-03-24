import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <span className="logo-text">AI Dashboard</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="mobile-menu-button" onClick={toggleMenu}>
          <span className="sr-only">Menu</span>
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navigation */}
        <nav className={`navigation ${isMenuOpen ? 'is-open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Strona główna
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                Panel
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/raporty" className="nav-link">
                Raporty
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ustawienia" className="nav-link">
                Ustawienia
              </Link>
            </li>
          </ul>
          
          <div className="user-actions">
            <Link to="/profil" className="user-profile">
              <span className="user-name">Jan Kowalski</span>
              <div className="user-avatar">JK</div>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;