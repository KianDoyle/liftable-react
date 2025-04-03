import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/sidebar.scss';

const Sidebar = () => {
  return (
    <aside className="app-sidebar">
      <nav className="sidebar-nav">
        <div className="widget-icon">
          TRACKER
        </div>
        <div className="widget-icon">
          VISUALISE
        </div>
        <div className="widget-icon">
          PREDICT
        </div>
        <div className="widget-icon-spacer"></div>
        <div className="widget-icon">
          ACCOUNT
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;