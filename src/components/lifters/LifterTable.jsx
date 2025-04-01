import React from 'react';
import { Link } from 'react-router-dom';

const LifterTable = ({ lifters, isLoading, error }) => {
  if (isLoading) return <div className="loading">Loading lifters...</div>;
  if (error) return <div className="error">Error loading lifters: {error.message}</div>;
  
  return (
    <div className="lifter-table-container">
      <table className="lifter-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Weight Class</th>
            <th>Best Squat</th>
            <th>Best Bench</th>
            <th>Best Deadlift</th>
            <th>Best Total</th>
            <th>Wilks Score</th>
          </tr>
        </thead>
        <tbody>
          {lifters && lifters.content && lifters.content.map(lifter => (
            <tr key={lifter.name}>
              <td>
                <Link to={`/lifters/${lifter.name}`} className="lifter-name-link">
                  {lifter.name}
                </Link>
              </td>
              <td>{lifter.age}</td>
              <td>{lifter.weightClass}</td>
              <td>{lifter.bestSquat} kg</td>
              <td>{lifter.bestBench} kg</td>
              <td>{lifter.bestDeadlift} kg</td>
              <td>{lifter.bestTotal} kg</td>
              <td>{lifter.wilksScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LifterTable;