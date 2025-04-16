import React from 'react';
import { Link } from 'react-router-dom';
import './styles/sidebar.scss';

const Sidebar = () => {
  return (
    <aside className="app-sidebar">
      <nav className="sidebar-nav">
        {/* search showdown continents tracker visualise predict account*/}
        <Link to="/" className="widget-icon">
            <img src="/navigation/search-icon.png" alt="Search Icon" className="widget-img" />
            <span className="widget-title">SEARCH</span>
        </Link>
        <Link to="/" className="widget-icon">
            <img src="/navigation/showdown-icon.png" alt="Showdown Icon" className="widget-img" />
            <span className="widget-title">SHOWDOWN</span>
        </Link>
        <Link to="/" className="widget-icon">
            <img src="/navigation/continents-icon.png" alt="Continents Icon" className="widget-img" />
            <span className="widget-title">CONTINENTS</span>
        </Link>
        <Link to="/" className="widget-icon">
            <img src="/navigation/search-icon.png" alt="Tracker Icon" className="widget-img" />
            <span className="widget-title">TRACKER</span>
        </Link>
        <Link to="/" className="widget-icon">
            <img src="/navigation/search-icon.png" alt="Visualise Icon" className="widget-img" />
            <span className="widget-title">VISUALISE</span>
        </Link>
        <Link to="/" className="widget-icon">
            <img src="/navigation/search-icon.png" alt="Predict Icon" className="widget-img" />
            <span className="widget-title">PREDICT</span>
        </Link>
        <div className="widget-icon-spacer"></div>
        <Link to="/" className="widget-icon">
            <img src="/navigation/account-icon.png" alt="Account Icon" className="widget-img" />
            <span className="widget-title">ACCOUNT</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;