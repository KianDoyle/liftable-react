import React, { useState } from 'react';
import { useLifters } from '../hooks/useLifters';
import LifterTable from '../components/lifters/LifterTable';
import Pagination from '../components/lifters/Pagination';
import './styles/homepage.scss';

const HomePage = () => {
  const [page, setPage] = useState(0);
  const [pageSize] = useState(20);
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
      
      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="weightClass">Weight Class</label>
          <select 
            id="weightClass" 
            name="weightClass" 
            value={filters.weightClass}
            onChange={handleFilterChange}
          >
            <option value="">All Weight Classes</option>
            <option value="59">59kg</option>
            <option value="66">66kg</option>
            <option value="74">74kg</option>
            <option value="83">83kg</option>
            <option value="93">93kg</option>
            <option value="105">105kg</option>
            <option value="120">120kg</option>
            <option value="120+">120kg+</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="gender">Gender</label>
          <select 
            id="gender" 
            name="gender" 
            value={filters.gender}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="ageClass">Age Class</label>
          <select 
            id="ageClass" 
            name="ageClass" 
            value={filters.ageClass}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="junior">Junior</option>
            <option value="open">Open</option>
            <option value="master">Master</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="federation">Federation</label>
          <select 
            id="federation" 
            name="federation" 
            value={filters.federation}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="IPF">IPF</option>
            <option value="USAPL">USAPL</option>
            <option value="USPA">USPA</option>
            <option value="WRPF">WRPF</option>
          </select>
        </div>
      </div>
      
      <LifterTable 
        lifters={data} 
        isLoading={isLoading}
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