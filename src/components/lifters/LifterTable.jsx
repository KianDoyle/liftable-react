// LiftersTable.jsx - Just displays data passed via props
import React, { useRef, useEffect } from 'react';
import './styles/lifterTable.scss';

export const LifterTable = ({ entities, loading, error }) => {
  const headers = ["name", "sex", "age", "birthYearClass", "bodyweightKg", "weightClassKg", "best3SquatKg", "best3BenchKg", "best3DeadliftKg", "totalKg", "goodlift", "federation", "date"];
  const headerNames = ["name", "sex", "age", "division", "weight", "class", "squat", "bench", "deadlift", "total", "glp", "fed", "date"];
  
  const tableRef = useRef(null);

  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;

    // Add column resizing functionality
    const initResizableTable = () => {
      let isResizing = false;
      let currentColumn = null;
      let nextColumn = null;
      let startX, startWidthCurrent, startWidthNext;

      // Add resize handles to each column
      const initColumns = () => {
        const headerCells = table.querySelectorAll('thead th');
        
        // For each column except the last one
        for (let i = 0; i < headerCells.length - 1; i++) {
          const column = headerCells[i];
          const handle = document.createElement('div');
          handle.classList.add('column-resize-handle');
          column.appendChild(handle);
          
          handle.addEventListener('mousedown', (e) => {
            isResizing = true;
            currentColumn = column;
            nextColumn = headerCells[i + 1];
            startX = e.pageX;
            startWidthCurrent = currentColumn.offsetWidth;
            startWidthNext = nextColumn.offsetWidth;
            
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'col-resize';
            handle.classList.add('active');
            e.preventDefault();
          });
        }
      };
      
      const handleMouseMove = (e) => {
        if (!isResizing) return;
        
        const diffX = e.pageX - startX;
        
        // Calculate new widths
        const newCurrentWidth = startWidthCurrent + diffX;
        const newNextWidth = startWidthNext - diffX;
        
        // Ensure minimum width (30px)
        if (newCurrentWidth >= 30 && newNextWidth >= 30) {
          currentColumn.style.width = `${newCurrentWidth}px`;
          nextColumn.style.width = `${newNextWidth}px`;
          
          // Apply the same width to all cells in these columns
          const tableRows = table.querySelectorAll('tbody tr');
          tableRows.forEach(row => {
            const currentCell = row.cells[Array.from(table.querySelectorAll('thead th')).indexOf(currentColumn)];
            const nextCell = row.cells[Array.from(table.querySelectorAll('thead th')).indexOf(nextColumn)];
            
            if (currentCell) currentCell.style.width = `${newCurrentWidth}px`;
            if (nextCell) nextCell.style.width = `${newNextWidth}px`;
          });
        }
      };
      
      const handleMouseUp = () => {
        isResizing = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        
        const handles = table.querySelectorAll('.column-resize-handle');
        handles.forEach(h => h.classList.remove('active'));
      };
      
      // Initialize columns
      initColumns();
    };

    // Start column resizing functionality
    initResizableTable();
    
    // Cleanup function
    return () => {
      const handles = table.querySelectorAll('.column-resize-handle');
      handles.forEach(handle => {
        handle.replaceWith(handle.cloneNode(true)); // Remove event listeners
      });
    };
  }, [entities]); // Reinitialize when data changes

  if (loading) return <div>Loading entities...</div>;
  if (error) return <div>{error}</div>;
  if (entities.length === 0) return <div>No entities found</div>;

  return (
    <div className="entity-table-container">
      <div className="table-scroll-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {headerNames.map((headerName, index) => (
                <th key={headers[index]}>
                  {headerName.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entities.map((entity, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map(header => (
                  <td key={header}>
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
    </div>
  );
};
