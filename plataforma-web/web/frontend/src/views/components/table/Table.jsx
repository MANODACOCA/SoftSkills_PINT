import './Table.css';
import React, { useState } from 'react';

const Table = ({ columns, data, actions, onAddClick  }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPag, setitemsPag] = useState(10);

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

  return (
    <div className="">
      <div className='d-flex justify-content-between mb-3'>
        <div className='w-25 d-flex col-4'>
          <div className='w-50 d-flex align-items-center pe-4'>
            <label htmlFor="itemsPag" className='form-label me-2'>Mostrar:</label>
            <select name="itemsPag" id="itemsPagina" className='form-select ' value={itemsPag} onChange={handleChange}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={data.length}>tudo</option>
            </select>
          </div>
          <div className='w-50 d-flex align-items-center justify-content-start'>
            <label htmlFor="itemsPag" className='form-label me-2'>Ordenar:</label>
            <select name="itemsPag" id="itemsPag" className='form-select' value={itemsPag} onChange={handleChange}>
                <option value="">fazer</option>
            </select>
          </div>
        </div>
        <input
          className="input-group d-none d-md-flex form-control form-control-md w-25 col-6"
          type="search"
          placeholder="Pesquisar por id"
          aria-label="Pesquisar"
        />

        {onAddClick && (
          <button className='btn btn-custom d-flex align-items-center justify-content-center rounded-5 col-2' onClick={() => onAddClick(null)}>
            <i className='bi bi-plus-lg fs-4'></i>
            <strong className='ps-2 d-none d-md-block'>Adicionar</strong>
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
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, rowIndex) => (
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
              </tr>
            ))}
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