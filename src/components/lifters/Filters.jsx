import React from "react";
import './styles/filters.scss';

export const Filters = ({ filters, onFilterChange, pageSize, onPageSizeChange }) => {
    return (
        <div className="filters">
            <div className="filter">
                <label htmlFor="federation">Federation: </label>
                <select
                    id="federation"
                    value={filters.federation}
                    onChange={onFilterChange}
                >
                    <option value=""></option>
                </select>
            </div>
            <div className="filter">
                <label htmlFor="weightClass">Weight Class: </label>
                <select
                    id="weightClass"
                    value={filters.weightClass}
                    onChange={onFilterChange}
                >
                    <option value=""></option>
                </select>
            </div>
            <div className="filter">
                <label htmlFor="ageClass">Age Class: </label>
                <select
                    id="ageClass"
                    value={filters.ageClass}
                    onChange={onFilterChange}
                >
                    <option value=""></option>
                </select>
            </div>
            <div className="filter">
                <label htmlFor="event">Event: </label>
                <select
                    id="event"
                    value={filters.event}
                    onChange={onFilterChange}
                >
                    <option value="SBD">SBD</option>
                    <option value="B">B</option>
                </select>
            </div>
            <div className="filter">
                <label htmlFor="equipment">Equipment: </label>
                <select
                    id="equipment"
                    value={filters.equipment}
                    onChange={onFilterChange}
                >
                    <option value="Raw">Raw</option>
                    <option value="Single-ply">Single-Ply</option>
                </select>
            </div>
            <div className="filter">
                <label htmlFor="page-size">Items per page: </label>
                <select
                    id="page-size"
                    value={pageSize}
                    onChange={onPageSizeChange}
                >
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="150">150</option>
                    <option value="200">200</option>
                </select>    
            </div>
        </div>
    );
}