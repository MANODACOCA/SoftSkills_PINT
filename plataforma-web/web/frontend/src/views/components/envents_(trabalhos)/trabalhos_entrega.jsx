import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import {
    FaCheckCircle,
    FaVideo,
    FaFileAlt,
    FaFilePowerpoint,
    FaFileImage,
    FaFileAudio,
    FaFilePdf,
    FaLink,
    FaFile,
    FaInfoCircle,
    FaDownload,
    FaUpload,
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

const WorkSubmit = ({ trabalho }) => {

    const getIconById = (id) => {
        return iconMapById[id] || <FaFile className="text-secondary" />;
    };
    console.log(trabalho);
    const [submittedFiles, setSubmittedFiles] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleTransfer = (file) => {
        setSubmittedFiles((prev) => [...prev, file]);
    };

    const handleSubmit = () => {
        if (submittedFiles.length === 0) {
            alert('Por favor, envie pelo menos um arquivo antes de submeter.');
            return;
        }
        setIsSubmitted(true);
    };

    return (
        <Card className="shadow-sm">
            <Card.Header className="bg-white border-bottom">
                <h2 className="mb-0 fw-bold">{trabalho.nome_tr}</h2>
            </Card.Header>

            <Card.Body className="p-4">
                {/* Descrição */}
                <section className="mb-4">
                    <h4 className="fw-semibold mb-3">Descrição:</h4>
                    <p className="text-muted lh-base">
                        {trabalho.descricao_tr}
                    </p>
                </section>

                {/* Requisitos */}
                <section className="mb-4">
                    <h4 className="fw-semibold mb-3">Requisitos:</h4>
                    <div className="list-group">
                        <a href={trabalho.caminho_tr} target='blank' className='text-decoration-none'>
                            <div className="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-3">
                                <div className="d-flex  align-items-center">
                                    <span className="me-3 fs-5">
                                        {getIconById(trabalho.id_formato_tr)}
                                    </span>
                                    <span>{trabalho.descricao_tr}</span>
                                </div>
                                <div className="d-flex justify-content-end align-items-end">
                                    <span><FaDownload /></span>
                                </div>
                            </div>
                        </a>
                    </div>
                </section>

                {/* Entrega fazer amanha */}
                <section className="mb-4">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h4 className="fw-semibold mb-0">Entregue os trabalhos aqui:</h4>
                        <Button className='btn btn-primary' size="sm">Editar</Button>
                    </div>
                    <div className='bg-primary-subtle rounded-4 p-5 d-flex align-items-center justify-content-center'>
                        <div className='text-center'>
                            <FaUpload />
                            <p>Submete aqui o teu </p>
                        </div>
                    </div>

                </section>

                {/* Botão Submissão */}
                <div className="text-center pt-3">
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitted}
                        variant={isSubmitted ? 'success' : 'primary'}
                        className="px-4 py-2 fw-medium"
                    >
                        {isSubmitted ? (
                            <>
                                <FaCheckCircle className="me-2" />
                                Submetido
                            </>
                        ) : (
                            'Submeter'
                        )}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default WorkSubmit;
