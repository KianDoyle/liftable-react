// LiftersTable.jsx - Just displays data passed via props
import React from 'react';

const LifterTable = ({ entities, loading, error }) => {
  // Dynamically get table headers from the first entity
  const getHeaders = () => {
    if (entities.length === 0) return [];
    return Object.keys(entities[0]);
  };

  if (loading) return <div>Loading entities...</div>;
  if (error) return <div className="error">{error}</div>;
  if (entities.length === 0) return <div>No entities found</div>;

  return (
    <div className="entity-table-container">
      <table className="entity-table">
        <thead>
          <tr>
            {getHeaders().map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entities.map((entity, index) => (
            <tr key={index}>
              {getHeaders().map(header => (
                <td key={`${index}-${header}`}>
                  {typeof entity[header] === 'object'
                    ? JSON.stringify(entity[header])
                    : String(entity[header])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LifterTable;