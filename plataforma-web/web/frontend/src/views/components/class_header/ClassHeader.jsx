import './ClassHeader.css';
import React from 'react';
import { FaChevronLeft, FaChevronRight, FaClock } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

const ClassHeader = ({ nomeCurso, tipo, totalAulas, tempoTotal, onPrevious, onNext, cursoTipo }) => {

    return (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
            <div>
                <h2 className="fw-bold mb-2">{nomeCurso}</h2>
                <div className="d-flex flex-wrap gap-3 text-muted small">
                    <span><strong>Tipologia:</strong> {tipo}</span>
                    <span><strong>Total de aulas:</strong> {totalAulas}</span>
                    <span className="d-flex align-items-center">
                        <FaClock className="me-1" /> {tempoTotal}
                    </span>
                </div>
            </div>
            {cursoTipo === 'assincrono' && (
                <div className="mt-3 mt-md-0 d-flex gap-2">
                    <Button variant="outline-secondary" size="sm" onClick={onPrevious}>
                        <FaChevronLeft className="me-1" /> Aula anterior
                    </Button>
                    <Button variant="primary" size="sm" onClick={onNext}>
                        Próxima aula <FaChevronRight className="ms-1" />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ClassHeader;