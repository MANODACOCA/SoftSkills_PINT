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
    
    return (
        <div className="card p-3 mb-4 shadow-sm border-0">
            <div className="row g-3 align-items-end">
                <div className="col-md-4">
                    <label htmlFor="searchInput" className="form-label fw-bold">Pesquisar</label>
                    <div className="input-group">
                        <span className="input-group-text"><FcSearch /></span>
                        <input
                            id="searchInput"
                            type="search"
                            className="form-control"
                            placeholder="Por nome curso..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange?.(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-md-3">
                    <label htmlFor="dataInicioInput" className="form-label fw-bold">Data Início</label>
                    <div className="input-group">
                        <span className="input-group-text"><FcCalendar /></span>
                        <input
                            id="dataInicioInput"
                            type="date"
                            className="form-control"
                            value={localDataInicio}
                            max={localDataFim}
                            onChange={(e) => setLocalDataInicio(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-md-3">
                    <label htmlFor="dataFimInput" className="form-label fw-bold">Data Fim</label>
                    <div className="input-group">
                        <span className="input-group-text"><FcCalendar /></span>
                        <input
                            id="dataFimInput"
                            type="date"
                            className="form-control"
                            min={localDataInicio}
                            value={localDataFim}
                            onChange={(e) => setLocalDataFim(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-md-2 d-grid gap-2">
                    <button className="btn btn-primary" onClick={aplicarFiltros}>
                        <FaFilter className="me-2" /> Aplicar
                    </button>
                    <button className="btn btn-outline-danger" onClick={limparFiltros} disabled={!localDataInicio && !localDataFim}>
                        <i className="bi bi-x-circle me-2"></i> Limpar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterHistorico;
