import React from 'react';
import { Link } from 'react-router-dom';
import { toggleDarkMode } from '../../utils/utils.js'
import logo from '../../assets/logo.svg';
import './styles/header.scss';

const Header = () => {
  // Function to toggle dark mode
  return (
    <header className="app-header">
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Powerlifting App Logo" className="app-logo" />
          <span className="app-title">LIFTABLE</span>
        </Link>
      </div>
      <div className="header-actions">
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          🌙
        </button>
        <input 
          type="text" 
          placeholder="Search lifters..." 
          className="search-input"
        />
      </div>
    </header>
  );
};

export default Header;
