import React, { useState, useEffect } from 'react';
import { FcSearch, FcCalendar } from "react-icons/fc";
import { FaFilter } from "react-icons/fa";

const FilterHistorico = ({ searchTerm, onSearchChange, onApply, dataInicio, dataFim, onClean }) => {
    const [localDataInicio, setLocalDataInicio] = useState(dataInicio || '');
    const [localDataFim, setLocalDataFim] = useState(dataFim || '');

    useEffect(() => {
        setLocalDataInicio(dataInicio);
        setLocalDataFim(dataFim);
    }, [dataInicio, dataFim]);

    const aplicarFiltros = () => {
        if (onApply) {
            onApply(localDataInicio, localDataFim);
        }
    };

    const limparFiltros = () => {
        setLocalDataFim('');
        setLocalDataInicio('');
        if (onApply) {
            onApply(null, null);
        }
        if (onClean) {
            onClean();
        }
    }

    const hasDates = localDataInicio || localDataFim;

    return (
        <div className="row g-3 mb-4">
            <div className='col-md-3'>
                <div className="pe-2 my-4">
                    <label className="form-label"><FcSearch /> Pesquisar</label>
                    <input 
                        type="search" 
                        className="form-control" 
                        value={searchTerm}
                        onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                        placeholder="Pesquisar..." 
                    />
                </div>    
            </div>
            <div className='border rounded-4 shadow-sm bg-white row col-md-9 g-3 py-3 px-1 d-flex align-items-end'>
                <div className="col-md-4 my-2">
                    <label className="form-label"><FcCalendar /> Data Início</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        value={localDataInicio}
                        onChange={(e) => setLocalDataInicio(e.target.value)}
                    />
                </div>
                <div className="col-md-4 my-2">
                    <label className="form-label"><FcCalendar /> Data Fim</label>
                    <input 
                        type="date" 
                        className="form-control"
                        value={localDataFim}
                        onChange={(e) => setLocalDataFim(e.target.value)}
                    />
                </div>
                <div className="col-md-4 d-flex align-items-end my-2"> 
                    {!hasDates && 
                        <button className="btn btn-outline-primary w-100" onClick={aplicarFiltros}>
                            <FaFilter /> Aplicar
                        </button>
                    }
                    {hasDates &&
                        <div className='d-flex w-100'>
                            <button className="btn btn-outline-primary w-75 me-2" onClick={aplicarFiltros}>
                                <FaFilter /> Aplicar
                            </button>
                            <button className="btn btn-outline-danger w-25" onClick={limparFiltros}>
                                <i className='bi bi-trash'></i>
                            </button>
                        </div>
                    }
                </div>    
            </div>
        </div>
    );
};

export default FilterHistorico;
