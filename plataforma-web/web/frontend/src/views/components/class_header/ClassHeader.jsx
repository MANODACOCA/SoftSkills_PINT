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
                    <h6><strong>Tipologia:</strong> {tipo}</h6>
                    <h6><strong>Total de aulas:</strong> {totalAulas}</h6>
                    <h6><span className="d-flex align-items-center">
                        <FaClock className="me-1" /> {tempoTotal}
                    </span>
                    </h6>
                </div>
            </div>
            {cursoTipo === 'assincrono' && (
                <div className="mt-3 mt-md-0 d-flex gap-3">
                    <Button variant="outline-secondary" size="ls" onClick={onPrevious}>
                        <FaChevronLeft className="me-1" /> Aula anterior
                    </Button>
                    <Button variant="primary" size="ls" onClick={onNext}>
                        Próxima aula <FaChevronRight className="ms-1" />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ClassHeader;