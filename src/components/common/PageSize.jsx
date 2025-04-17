import React from "react";
import './styles/pagesize.scss';

export const PageSize = ({ pageSize, onPageSizeChange }) => {
    return (
            <div className="size-control">
                <select
                    id="page-size"
                    value={pageSize}
                    onChange={onPageSizeChange}
                >
                    <option value="100">ROWS</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="150">150</option>
                    <option value="200">200</option>
                </select>
            </div>
        
    );
};