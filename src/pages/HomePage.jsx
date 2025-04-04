// HomePage.jsx - Manages state and data fetching
import React, { useState } from 'react';
import { useLifters } from '../hooks/useLifters';
import { Filters } from '../components/lifters/Filters';
import { LifterTable } from '../components/lifters/LifterTable';
import { Pagination } from '../components/lifters/Pagination';
import './styles/homepage.scss';

const HomePage = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [filters, setFilters] = useState({
    federation: '',
    weightClass: '',
    ageClass: '',
    event: 'SBD',
    equipment: 'Raw',
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
    console.log(e.target);
    setFilters(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
    setPage(0); // Reset to first page when filters change
  };
 
  return (
    <div className="page-container">      
      <div className="table-controls">
        <Filters
          filters={filters}
          onFilterChange={handleFilterChange}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
        />
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