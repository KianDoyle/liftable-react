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
        <div className="widget-icon-spacer"></div>
        <div className="widget-icon">
          ACCOUNT
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;