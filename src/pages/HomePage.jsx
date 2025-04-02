// HomePage.jsx - Manages state and data fetching
import React, { useState } from 'react';
import { useLifters } from '../hooks/useLifters';
import { LifterTable } from '../components/lifters/LifterTable';
import { Pagination } from '../components/lifters/Pagination';
import './styles/homepage.scss';

const HomePage = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [filters, setFilters] = useState({
    weightClass: '',
    gender: '',
    ageClass: '',
    federation: '',
  });
 
  const { data, isLoading, error } = useLifters(page, pageSize, filters);
 
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };
 
  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing page size
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setPage(0); // Reset to first page when filters change
  };
 
  return (
    <div className="page-container">
      <h1 className="page-title">Powerlifters Database</h1>
      
      <div className="table-controls">
        <div className="page-size-selector">
          <label htmlFor="page-size">Items per page:</label>
          <select
            id="page-size"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        {/* Add filters UI here */}
      </div>
           
      <LifterTable 
        entities={data?.content || []}
        loading={isLoading}
        error={error}
      />
     
      {!isLoading && !error && data && (
        <Pagination
          currentPage={page}
          totalPages={data.totalPages || 1}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default HomePage;