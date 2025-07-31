import './Table.css';
import React, { useState } from 'react';

const Table = ({ columns, data, actions, onAddClick, conteudos, pesquisa, ordenar, searchTerm = '', onSearchChange}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPag, setitemsPag] = useState(10);
  const [expandedRows, setExpandedRows] = useState([]);
  const totalPages = Math.ceil(data.length / itemsPag);
  const startIndex = (currentPage - 1) * itemsPag;
  const currentData = data.slice(startIndex, startIndex + itemsPag);


  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleChange = (e) => {
    const value = Number(e.target.value);
    setitemsPag(value);
    setCurrentPage(1);
  }

  const toggleRow = (index) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter(i => i !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };

  return (
    <div className="">
      <div className='d-flex justify-content-between mb-3'>
        <div className='w-25 d-flex col-4'>
          <div className={`${ordenar ? 'w-50' : 'w-100' } d-flex align-items-center pe-4`}>
            <label htmlFor="itemsPag" className='form-label me-2'>Mostrar:</label>
            <select name="itemsPag" id="itemsPagina" className='form-select ' value={itemsPag} onChange={handleChange}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={data.length}>tudo</option>
            </select>
          </div>
          {ordenar && (
            <div className='w-50 d-flex align-items-center justify-content-start'>
              <label htmlFor="itemsPag" className='form-label me-2'>Ordenar:</label>
              <select name="itemsPag" id="itemsPag" className='form-select' value={itemsPag} onChange={handleChange}>
                  <option value="">fazer</option>
              </select>
            </div>
          )}
        </div>
        {pesquisa && 
          <input
            className="input-group d-none d-md-flex form-control form-control-md w-25 col-6"
            type="search"
            placeholder="Pesquisar"
            value={searchTerm}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            aria-label="Pesquisar"
          />
        }
        {onAddClick && (
          <button className='btn btn-primary d-flex align-items-center justify-content-center col-2' onClick={() => onAddClick.callback(null)}>
            <i className='bi bi-plus-lg'></i>
            <span className='ps-2 d-none d-md-block'>{onAddClick.label}</span>
          </button>
        )}

      </div>
      <div className='table-responsive rounded-3 shadow-sm'>
        <table className="table table-hover rounded-5">
          <thead className="table-bg">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>{col.label}</th>
              ))}
              {actions && <th>Ações</th>}
              {conteudos && <th></th>}
            </tr>
          </thead>
          <tbody>
            {currentData.length == 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0) + (conteudos ? 1 : 0)} className="text-center py-4">
                  <span className="text-muted">Sem dados disponíveis.</span>
                </td>
              </tr>
            ) : (
            currentData.map((item, rowIndex) => (
              <React.Fragment key={rowIndex}>
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className={rowIndex % 2 == 0 ? 'bg-white' : 'line-bg'}>
                    {col.render ? col.render(item) : item[col.key]}
                  </td>
                ))}
                {actions && (
                  <td className={rowIndex % 2 == 0 ? 'bg-white' : 'line-bg'}>
                    {actions(item)}
                  </td>
                )}
                {conteudos && (
                 <td className={`${rowIndex % 2 === 0 ? 'bg-white' : 'line-bg'}`} onClick={() => toggleRow(startIndex + rowIndex)} style={{ cursor: 'pointer' }}>
                    {conteudos(item, expandedRows.includes(startIndex + rowIndex))}
                  </td>
                )}
              </tr>
              {expandedRows.includes(startIndex + rowIndex) && (
                <tr>
                  <td colSpan={columns.length + (actions ? 1 : 0) + (conteudos ? 1 : 0)}>
                    {conteudos(item, expandedRows.includes(startIndex + rowIndex), true)}
                  </td>
                </tr>
              )}
              </React.Fragment>
            ))
            )}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center align-items-center px-2 py-2">
          <button className="btn btn-sm btn-outline-custom me-1 rounded-5" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            <i className='bi bi-arrow-left'></i>
          </button>
          <span>Página {currentPage} de {totalPages}&nbsp;</span>
          <button className="btn btn-sm btn-outline-custom rounded-5" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
            <i className='bi bi-arrow-right'></i>
          </button>
      </div>
    </div>
  );
};

export default Table;