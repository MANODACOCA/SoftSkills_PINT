import React, { useState, useRef } from 'react';
import { Card, Button } from 'react-bootstrap';
import {
    FaCheckCircle,
    FaFileAlt,
    FaFilePowerpoint,
    FaFileExcel,
    FaFileImage,
    FaFilePdf,
    FaLink,
    FaFile,
    FaDownload,
    FaUpload,
    FaRegTrashAlt,
} from 'react-icons/fa';
import { BsFiletypeTxt } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { useUser } from '../../../utils/useUser';
import { parseDateWithoutTimezone } from '../shared_functions/FunctionsUtils';
import { get_entrega_trabalhos, create_entrega_trabalhos, update_entrega_trabalhos, delete_entrega_trabalhos } from '../../../api/entrega_trabalhos_axios';
import Swal from 'sweetalert2'


const iconMapById = {
    1: <FaFilePdf className="text-danger" />,
    2: <FaFilePowerpoint className="text-warning" />,
    3: <FaFileAlt className="text-success" />,
    4: <FaFileExcel className="text-success" />,
    5: <BsFiletypeTxt className="text-cyan-600" />,
    6: <FaFileImage className="text-pink-500" />,
    7: <FaLink className="text-blue-500" />,
};

const WorkSubmit = ({ trabalho }) => {

    //seccao que trata das horas do trabalhos e verificacoes
    let DataAtual = null;
    let DataEntrega = null;

    if (trabalho.data_entrega_tr) {
        DataAtual = new Date();
        DataEntrega = parseDateWithoutTimezone(trabalho.data_entrega_tr);
    }
    //seccao que trata das horas do trabalhos e verificacoes


    //para icons
    const getIconById = (id) => {
        return iconMapById[id] || <FaFile className="text-secondary" />;
    };
    //para icons


    const { user } = useUser();
    const [submittedFile, setSubmittedFile] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const fileInputRef = useRef(null);


    const verifySubmitWork = async () => {//vai verificar se sumteu algum ficheiro
        try {
            const res = await get_entrega_trabalhos(trabalho.id_trabalho, user.id_utilizador);
            if (res.jaEntregou) {
                submittedFile(res.data);
                setIsSubmitted(true);
            }
        } catch (error) {
            console.error('Erro ao verificar entrega de trabalho:', error);
        }
    };

    const handleSubmit = async () => {//vai servir para submeter trabalhos
        if (!submittedFile) {
            setError('Por favor, envie pelo menos um arquivo antes de submeter.');
            Swal.fire({
                title: "Por favor, envie pelo menos um arquivo antes de submeter.",
                icon: "error",
                draggable: true,
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
        const formData = new FormData();
        formData.append('id_trabalho_et', trabalho.id_trabalho);
        formData.append('id_formando_et', user.id_utilizador);
        formData.append('ficheiro', submittedFile);

        try {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
                title: "Tens a certeza que queres submeter o trabalho?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true
            }).then(async (result) => {

                if (result.isConfirmed) {
                    const res = await create_entrega_trabalhos(formData);
                    setIsSubmitted(true);
                    Swal.fire({
                        title: "Erro ao submeter trabalho. Verifique o ficheiro ou tente novamente mais tarde.",
                        icon: "success",
                        draggable: true,
                        showConfirmButton: false,
                        timer: 3000
                    });
                }
            });

        } catch (error) {
            console.error('Erro ao submeter entrega de trabalho:', error);
            Swal.fire({
                title: "Erro ao submeter trabalho. Verifique o ficheiro ou tente novamente mais tarde.",
                icon: "error",
                draggable: true,
                showConfirmButton: false,
                timer: 3000
            });
        }
    };

    const handleEdit = () => {
        if (!submittedFile) {
            alert('Por favor, envie pelo menos um arquivo antes de submeter.');
            return;
        }
        setIsSubmitted(true);
    };

    const handleDelete = () => {
        if (!submittedFile) {
            alert('Por favor, envie pelo menos um arquivo antes de submeter.');
            return;
        }
        setIsSubmitted(true);
    };

    return (
        <Card className="shadow-sm">
            <Card.Header className="bg-white border-bottom">
                <h3 className="mb-0 fw-semi-bold">{trabalho.nome_tr}</h3>
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
                                    <span>{trabalho.nome_tr}</span>
                                </div>
                                <div className="d-flex justify-content-end align-items-end">
                                    <span><FaDownload /></span>
                                </div>
                            </div>
                        </a>
                    </div>
                </section>

                {/* Descrição */}

                <section className="mb-4">
                    <h4 className="fw-semibold mb-3">Data e hora de entrega:</h4>
                    <div className="d-flex align-items-center text-muted lh-base gap-2">
                        <MdDateRange size={20} /><p className="text-muted mb-0">{trabalho.data_entrega_tr.split('T')[0]} | {trabalho.data_entrega_tr.split('T')[1].slice(0, 5)}</p>
                    </div>
                </section>

                {/* Entrega fazer amanha */}
                {!submittedFile ? (
                    <section className="mb-4">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <h4 className="fw-semibold mb-0">Entregue o trabalho aqui:</h4>

                        </div>
                        <div
                            onClick={() => fileInputRef.current.click()}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                const file = e.dataTransfer.files[0];
                                if (file) setSubmittedFile(file);
                            }}
                            className='bg-primary-subtle rounded-4 p-5 d-flex align-items-center justify-content-center'
                            style={{ cursor: 'pointer' }}
                        >
                            <div className='text-center'>
                                <FaUpload />
                                <p>Arrasta ao clica para puderes submeter o teu trabalho</p>
                            </div>
                            <input
                                type='file'
                                accept=".jpeg,.jpg,.png,.pdf,.doc,.docx,.xls,.xlsx,.xlsm,.ppt,.pptx,.txt"
                                hidden
                                ref={fileInputRef}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) setSubmittedFile(file);
                                }}
                            />
                        </div>
                    </section>
                ) : (
                    <div className="mb-3 p-3 bg-light rounded d-flex justify-content-between align-items-center">
                        <div>
                            <small className="text-muted">Ficheiro selecionado:</small>
                            <div className="fw-medium">{submittedFile.name}</div>
                            <small className="text-muted">{(submittedFile.size / 1024 / 1024).toFixed(2)} MB</small>
                        </div>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => {
                                setSubmittedFile(null);
                                if (fileInputRef.current) {
                                    fileInputRef.current.value = '';
                                }
                            }}
                        ><FaRegTrashAlt />
                        </Button>
                    </div>
                )}

                {/* Botão Submissão */}
                {DataAtual <= DataEntrega && (
                    <div className="text-center pt-3">
                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmitted}
                            variant={isSubmitted ? 'secondary' : 'primary'}
                            className="px-4 py-2 fw-medium"
                        >
                            {isSubmitted ? (
                                <>
                                    <FaCheckCircle className="me-2" />
                                    Editar
                                </>
                            ) : (
                                'Submeter'
                            )}
                        </Button>
                    </div>
                )}
            </Card.Body>
        </Card >
    );
};

export default WorkSubmit;
