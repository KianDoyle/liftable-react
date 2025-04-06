import React, { useState, useEffect, useCallback } from "react";
import Fuse from "fuse.js"; // Import fuzzy search library
import { debounce } from "lodash";
import { Link } from "react-router-dom";
import { toggleDarkMode } from "../../utils/utils.js";
import { useSearchLifters } from "../../hooks/useSearchLifters";
import "./styles/header.scss";

const Header = () => {
  const { data: lifters, isLoading, error } = useSearchLifters(); // Fetch lifters once
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLifters, setFilteredLifters] = useState([]);
  const [fuse, setFuse] = useState(null);

  useEffect(() => {
    if (lifters.length > 0) {
      setFuse(new Fuse(lifters, { keys: ["name"], threshold: 0.5, includeScore: true })); // Fuzzy search setup
    }
  }, [lifters]);

  const debouncedSearch = useCallback(debounce((query) => {
    if (query.length > 0 && fuse) {
      const results = fuse.search(query).map((result) => result.item).slice(0, 10);
      setFilteredLifters(results);
    } else {
      setFilteredLifters([]);
    }
  }, 100), [fuse]);

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <img src="/logo.svg" alt="Powerlifting App Logo" className="app-logo" />
            <span className="app-title">LIFTABLE</span>
          </Link>
        </div>
        <div className="header-actions">
          <button className="dark-mode-toggle" onClick={toggleDarkMode}>
            🌙
          </button>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search lifters..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                debouncedSearch(e.target.value);
              }}
            />
            {filteredLifters.length > 0 && (
              <ul className="dropdown">
                {filteredLifters.map((lifter) => (
                  <li key={lifter} className="dropdown-item">
                    <Link to={{
                        pathname: `/lifter/${lifter}`,
                        }} 
                        state={lifter}
                        className="dropdown-link">
                      {lifter}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;

