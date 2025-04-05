import React, { useRef, useEffect } from 'react';
import './styles/lifterTable.scss';

export const LifterTable = ({ headers, headerNames, entities, loading, error, lastLifterRef }) => {
  const tableRef = useRef(null);

  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;

    const initResizableTable = () => {
      let isResizing = false;
      let currentColumn = null;
      let nextColumn = null;
      let startX, startWidthCurrent, startWidthNext;

      const initColumns = () => {
        const headerCells = table.querySelectorAll('thead th');
        
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
        
        const newCurrentWidth = startWidthCurrent + diffX;
        const newNextWidth = startWidthNext - diffX;
        
        if (newCurrentWidth >= 30 && newNextWidth >= 30) {
          currentColumn.style.width = `${newCurrentWidth}px`;
          nextColumn.style.width = `${newNextWidth}px`;
          
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
      
      initColumns();
    };

    initResizableTable();
    
    return () => {
      const handles = table.querySelectorAll('.column-resize-handle');
      handles.forEach(handle => {
        handle.replaceWith(handle.cloneNode(true));
      });
    };
  }, [entities]);

  if (error) return <div className="error-message">{error}</div>;
  if (entities.length === 0 && !loading) return <div className="no-data-message">No entities found</div>;

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
            {entities.map((entity, rowIndex) => {
              const isLastRow = rowIndex === entities.length - 1;
              const uniqueKey = `${entity.id}${entity.name}${entity.date}${entity.totalkg}${rowIndex}`;
              return (
                <tr 
                  key={uniqueKey} 
                  ref={isLastRow ? lastLifterRef : null}
                >
                  <td key={rowIndex + 1}>{rowIndex + 1}</td>
                  {headers.map(header => (
                    <td key={header}>
                      {typeof entity[header] === 'object'
                        ? JSON.stringify(entity[header])
                        : String(entity[header] || '')}
                    </td>
                  ))}
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};