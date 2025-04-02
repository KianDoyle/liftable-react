import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/sidebar.scss';

const Sidebar = () => {
  return (
    <aside className="app-sidebar">
      <nav className="sidebar-nav">
        <div class="widget-icon">
          TRACKER
        </div>
        <div class="widget-icon">
          VISUALISE
        </div>
        <div class="widget-icon">
          PREDICT
        </div>
        <div class="widget-icon-spacer"></div>
        <div class="widget-icon">
          ACCOUNT
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;