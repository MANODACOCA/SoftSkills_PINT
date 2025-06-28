import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { FaFileAlt, FaInfoCircle } from 'react-icons/fa';

const cenas = ({ trabalho }) => {
    
    return (
        <Card className="d-flex flex-row align-items-center justify-content-between p-3 mb-4 shadow-sm border">
            <div className="d-flex align-items-center gap-3">
                <div className="p-3 bg-light rounded-circle d-flex align-items-center justify-content-center">
                    <FaFileAlt className="text-primary fs-4" />
                </div>
                <div>
                    <h5 className="mb-1">Trabalho {1 + 1}</h5>
                    <p className="text-muted mb-0">{trabalho.nome_tr}</p>
                </div>
            </div>
            <div>
                <Button className='d-flex align-items-center justify-content-center gap-2 px-3 py-2 fw-semibold shadow-sm' variant="primary">
                    <FaInfoCircle />LALALALALALA
                </Button>
            </div>
        </Card>
    );
};

export default cenas;
