import React from 'react';
import './styles/pagination.scss';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are fewer than maxPagesToShow
      for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page, last page, current page, and one page before and after current
      const includePages = new Set();
      includePages.add(0); // First page
      includePages.add(totalPages - 1); // Last page
      includePages.add(currentPage); // Current page
      
      // Pages around current page
      if (currentPage > 0) includePages.add(currentPage - 1);
      if (currentPage < totalPages - 1) includePages.add(currentPage + 1);
      
      // Convert to array and sort
      const sortedPages = Array.from(includePages).sort((a, b) => a - b);
      
      // Add page numbers with separators for gaps
      let prevPage = null;
      sortedPages.forEach(page => {
        if (prevPage !== null && page > prevPage + 1) {
          pageNumbers.push('...');
        }
        pageNumbers.push(page);
        prevPage = page;
      });
    }
    
    return pageNumbers;
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <div className="pagination">
      <button 
        className="pagination-button"
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      
      {pageNumbers.map((page, index) => 
        typeof page === 'number' ? (
          <button
            key={index}
            className={`pagination-button ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page + 1}
          </button>
        ) : (
          <span key={index} className="pagination-ellipsis">{page}</span>
        )
      )}
      
      <button 
        className="pagination-button"
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};
