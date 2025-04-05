import React from "react";
import './styles/filters.scss';

export const Filters = ({ filters, onFilterChange }) => {
    return (
        <div className="filters">
            <select
                id="federation"
                value={filters.federation}
                onChange={onFilterChange}
            >
                <option value="">FED</option>
                <option value=""></option>
            </select>
            <select
                id="weightClass"
                value={filters.weightClass}
                onChange={onFilterChange}
            >
                <option value="">CLASS</option>
                <option value=""></option>
            </select>
            <select
                id="ageClass"
                value={filters.ageClass}
                onChange={onFilterChange}
            >
                <option value="">DIVISION</option>
                <option value=""></option>
            </select>
            <select
                id="event"
                value={filters.event}
                onChange={onFilterChange}
            >
                <option value="SBD">FULL POWER</option>
                <option value="B">BENCH ONLY</option>
            </select>
            <select
                id="equipment"
                value={filters.equipment}
                onChange={onFilterChange}
            >
                <option value="Raw">RAW</option>
                <option value="Single-ply">EQUIPPED</option>
            </select>
        </div>
    );
}