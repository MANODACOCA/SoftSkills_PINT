import React, { useState, useEffect } from 'react';
import { useUser } from '../../../utils/useUser';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { FaFileAlt, FaInfoCircle, FaRegCheckCircle } from 'react-icons/fa';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { get_entrega_trabalhos } from '../../../api/entrega_trabalhos_axios';


const WorkCard = ({ trabalho, index }) => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate(`?tab=eventos&trabalho=${trabalho.id_trabalho}`);
    };


    const { user } = useUser();
    const today = new Date();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);
    //vai verificar se sumteu algum ficheiro
    const verifySubmitWork = async () => {
        try {
            const res = await get_entrega_trabalhos(trabalho.id_trabalho, user?.id_utilizador);
            if (res.jaEntregou) {
                setIsSubmitted(true);
            }
        } catch (error) {
            console.error('Erro ao verificar entrega de trabalho:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        verifySubmitWork();
    }, []);
    //vai verificar se sumteu algum ficheiro

    return (
        <Card className="d-flex flex-row align-items-center justify-content-between p-3 mb-4 shadow-sm border">
            <div className="d-flex align-items-center gap-3">
                <div className="p-3 bg-light rounded-circle d-flex align-items-center justify-content-center">
                    <FaFileAlt className="text-primary fs-4" />
                </div>
                <div>
                    <div className='d-flex align-items-center gap-2 mb-1'>
                        <h5 className="mb-1">Trabalho {index + 1}</h5> -
                        <p className="mb-0">{trabalho.nome_tr}</p>
                    </div>
                    <div className='d-flex align-items-center gap-2'>
                        <MdDateRange size={20} /> <p className="text-muted mb-0">Data e hora de entrega: {trabalho.data_entrega_tr.split('T')[0]} | {trabalho.data_entrega_tr.split('T')[1].slice(0, 5)}</p>
                    </div>
                </div>

            </div>

            {loading ? (
                <Button className='d-flex align-items-center justify-content-center gap-2 px-3 py-2 fw-semibold shadow-sm border-0' onClick={onClick} variant="primary" style={{ width: "200px" }} disabled>
                    A carregar...
                </Button>
            ) : isSubmitted ? (
                <div>
                    <Button className='d-flex align-items-center justify-content-center gap-2 px-3 py-2 fw-semibold shadow-sm bg-success border-0' onClick={onClick} variant="primary" style={{ width: "200px" }}>
                        <FaRegCheckCircle />Entregue
                    </Button>
                </div>
            ) : !isSubmitted && new Date(trabalho.data_entrega_tr) < today ? (
                <div>
                    <Button className='d-flex align-items-center justify-content-center gap-2 px-3 py-2 fw-semibold shadow-sm bg-danger border-0' onClick={onClick} variant="primary" style={{ width: "200px" }}>
                        <IoIosCloseCircleOutline />Não Entregue
                    </Button>
                </div>
            ) : (
                <div>
                    <Button className='d-flex align-items-center justify-content-center gap-2 px-3 py-2 fw-semibold shadow-sm' onClick={onClick} variant="primary" style={{ width: "200px" }}>
                        <FaInfoCircle />Mais Informações
                    </Button>
                </div>
            )}

        </Card>
    );
};

export default WorkCard;
