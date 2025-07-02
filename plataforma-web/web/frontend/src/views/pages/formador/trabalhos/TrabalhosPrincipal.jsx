import React from 'react';
import { Card, Button } from 'react-bootstrap';
import {
    FaVideo, FaFileAlt, FaFilePowerpoint, FaFileImage,
    FaFileAudio, FaFilePdf, FaLink, FaInfoCircle, FaFile, FaDownload
} from 'react-icons/fa';

const iconMapById = {
    1: <FaVideo className="text-primary" />,
    2: <FaFilePdf className="text-danger" />,
    3: <FaFilePowerpoint className="text-warning" />,
    4: <FaFileAlt className="text-success" />,
    5: <FaFileImage className="text-pink-500" />,
    6: <FaFileAudio className="text-indigo-500" />,
    7: <FaInfoCircle className="text-cyan-600" />,
    8: <FaLink className="text-blue-500" />,
};

const getIconById = (id) => {
    return iconMapById[id] || <FaFile className="text-secondary" />;
};

const TrbalhosAdicionarCurso = ({ trabalho, onEdit, podeEditar }) => {
    const dataObj = new Date(trabalho.data_entrega_tr);
    const dataEntrega = dataObj.toLocaleDateString();
    const horaEntrega = dataObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <Card className="shadow-sm mb-4">
            <Card.Body>
                <h4 className="fw-bold mb-3">{trabalho.nome_tr}</h4>

                <div className="mb-3">
                    <strong>Descrição:</strong>
                    <p className="text-muted mb-0">{trabalho.descricao_tr}</p>
                </div>

                <div className="mb-3">
                    <strong>Data de entrega:</strong> {dataEntrega}<br />
                    <strong>Hora de entrega:</strong> {horaEntrega}
                </div>

                <div className="mb-2">
       <strong>Requisitos:</strong>
          <div className="d-flex align-items-center mt-2">
            <span className="me-2 fs-5">{getIconById(trabalho.id_formato_tr)}</span>
            <a
              href={trabalho.caminho_tr}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              {trabalho.caminho_tr}
              <FaDownload className="ms-2" />
            </a>
          </div>
        </div>

        
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h5 className="mb-0">Entregue os trabalhos aqui:</h5>
          {podeEditar && (
            <Button
              className="btn btn-primary btn-sm"
              onClick={onEdit}
            >
              Editar
            </Button>
          )}
        </div>
       
      </Card.Body>
    </Card>
    );
};

export default TrbalhosAdicionarCurso;
