import React from 'react';

const LifterStats = ({ stats, isLoading, error }) => {
  if (isLoading) return <div className="loading">Loading lifter stats...</div>;
  if (error) return <div className="error">Error loading stats: {error.message}</div>;
  if (!stats) return null;
  
  return (
    <div className="lifter-stats-card">
      <h3 className="card-title">Personal Records</h3>
      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-label">Best Squat</div>
          <div className="stat-value">{stats.bestSquat} kg</div>
          <div className="stat-meta">{stats.bestSquatDate}</div>
        </div>
        
        <div className="stat-box">
          <div className="stat-label">Best Bench</div>
          <div className="stat-value">{stats.bestBench} kg</div>
          <div className="stat-meta">{stats.bestBenchDate}</div>
        </div>
        
        <div className="stat-box">
          <div className="stat-label">Best Deadlift</div>
          <div className="stat-value">{stats.bestDeadlift} kg</div>
          <div className="stat-meta">{stats.bestDeadliftDate}</div>
        </div>
        
        <div className="stat-box">
          <div className="stat-label">Best Total</div>
          <div className="stat-value">{stats.bestTotal} kg</div>
          <div className="stat-meta">{stats.bestTotalDate}</div>
        </div>
        
        <div className="stat-box">
          <div className="stat-label">Best Wilks</div>
          <div className="stat-value">{stats.bestWilksScore}</div>
          <div className="stat-meta">{stats.bestWilksDate}</div>
        </div>
        
        <div className="stat-box">
          <div className="stat-label">Competition Count</div>
          <div className="stat-value">{stats.competitionCount}</div>
          <div className="stat-meta">Career meets</div>
        </div>
      </div>
    </div>
  );
};

export default LifterStats;