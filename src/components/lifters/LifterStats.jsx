import React from 'react';

const LifterStats = ({ stats, isLoading, error }) => {
  if (isLoading) return <div className="loading">Loading lifter stats...</div>;
  if (error) return <div className="error">Error loading stats: {error.message}</div>;
  if (!stats) return null;
  
  return (
    <div className="lifter-stats-card">
      <h3 className="card-title">Personal Records</h3>
      
    </div>
  );
};

export default LifterStats;