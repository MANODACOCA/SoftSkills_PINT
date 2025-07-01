import './post.css';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { Card, Button, Dropdown, Modal, Form } from 'react-bootstrap';
import { BsChat, BsThreeDots, BsFillTrash3Fill, BsExclamationTriangleFill } from 'react-icons/bs';
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { delete_post, put_like, delete_like, jaDeuLike } from "../../../../api/post_axios";
import { list_tipo_denuncia } from "../../../../api/tipo_denuncia_axios";
import { create_denuncia } from "../../../../api/denuncia_axios";
import { useUser } from '../../../../utils/useUser';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt'; // português
dayjs.extend(relativeTime);
dayjs.locale('pt');

//import Comentario from "../../../components/forum/comentario/comentario";

const PostCard = ({ idPost, idAutor, autor, tempo, texto, likes: inicialLikes, comentarios, imagemAutor, dataCriacao, onDeleted }) => {
    const API_URL = 'https://softskills-api.onrender.com/';
    const { user, setUser } = useUser();



    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(inicialLikes);



    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);

    /*DENUCIA*/
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [tipoDenunciaList, setTipoDenunciaList] = useState([]);

    const fetchDenucias = async () => {//vai buscar os tipos de denúcias
        try {
            const data = await list_tipo_denuncia();
            setTipoDenunciaList(data);
        } catch (err) {
            console.error("Erro ao listar tipo de denucias:", err);
            Swal.fire("Erro", "Não foi possível listar tipo de denucias. Tente novamente.", "error");
        }
    }
    const handleReportSubmit = async () => {
        try {
            const denuciaData = {
                id_comentario: null,
                id_utilizador: user.id_utilizador,
                id_post: idPost,
                id_tipo_denuncia: reportReason,
            }

            await create_denuncia(denuciaData);

            Swal.fire({
                icon: 'success',
                title: 'Denúncia enviada',
                text: 'Obrigado por ajudar a manter a comunidade segura!',
                timer: 3000,
                showConfirmButton: false,
            });

            setReportReason('');
            setShowReportModal(false);
        } catch (err) {
            console.error("Erro ao reportar post:", err);
            Swal.fire("Erro", "Não foi possível reportar post. Tente novamente.", "error");
        }
    };

    useEffect(() => {
        if (showReportModal) {
            fetchDenucias();
        }
    }, [showReportModal]);
    /*DENUCIA*/

    /*LIKES*/
    const handleLike = async () => {
        try {
            if (liked) {
                await delete_like(idPost, user.id_utilizador);
                setLikes(likes - 1);
            } else {
                await put_like(idPost, user.id_utilizador);
                setLikes(likes + 1);
            }
            setLiked(!liked);
        } catch (err) {
            console.error("Erro ao atualizar like:", err);
            Swal.fire("Erro", "Não foi possível atualizar o like. Tente novamente.", "error");
        }
    };

    const verificarLike = async () => {
        if (!user?.id_utilizador) return;

        try {
            const jaCurtiu = await jaDeuLike(idPost, user.id_utilizador);
            setLiked(jaCurtiu);
        } catch (err) {
            console.error("Erro ao verificar se já deu like:", err);
        }
    };

    useEffect(() => {
        verificarLike();
    }, [idPost, user]);
    /*LIKES*/


    /*Eliminar post*/
    const handleDelete = async () => {
        const result = await Swal.fire({
            title: 'Tem a certeza que pretendes eliminar o teu post?',
            text: "Esta ação não pode ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3b5b84',
            confirmButtonText: 'Sim, eliminar!',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            try {
                await delete_post(idPost);
                Swal.fire({
                    title: 'Eliminado!',
                    text: 'O post foi eliminado com sucesso.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000,
                });


                // Se você passar uma função onDeleted no props para atualizar a lista no pai:
                if (typeof onDeleted === 'function') {
                    onDeleted(idPost);
                }
            } catch (error) {
                Swal.fire(
                    'Erro!',
                    'Ocorreu um erro ao eliminar o post.',
                    'error'
                );
            }
        }
    };
    /*Eliminar post*/



    return (
        <Card className="mb-3 shadow-sm rounded-4 border-0">
            <Card.Body>
                {/* Header */}
                <div className="d-flex justify-content-between align-items-start">
                    <div className="d-flex align-items-center">
                        <img
                            src={`${API_URL}${imagemAutor}`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(autor)}&background=random&bold=true`;
                            }}
                            alt="Foto do formador"
                            className='rounded-circle'
                            width="60"
                            height="60"
                        />
                        <div className="ms-2">
                            <div className="fw-semibold">{autor}</div>
                            <div className="text-muted small">{dayjs(dataCriacao).fromNow()}</div>
                        </div>
                    </div>
                    <Dropdown align="end">
                        <Dropdown.Toggle
                            variant="light"
                            size="sm"
                            className="p-1 dropdown-toggle-no-caret"
                        >
                            <BsThreeDots style={{ fontSize: '1.25rem' }} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {idAutor !== user?.id_utilizador && (
                                <>
                                    <Dropdown.Item className='text-danger' onClick={() => setShowReportModal(true)}>
                                        <BsExclamationTriangleFill className='me-4' />Denuciar
                                    </Dropdown.Item>

                                    <Modal show={showReportModal} onHide={() => setShowReportModal(false)} centered>
                                        <Modal.Header>
                                            <Modal.Title>Denunciar Post</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form.Group>
                                                <Form.Label>Selecione o motivo da denúncia</Form.Label>
                                                <Form.Select
                                                    value={reportReason}
                                                    onChange={(e) => setReportReason(e.target.value)}
                                                >
                                                    <option value="">-- Selecione um motivo --</option>
                                                    {tipoDenunciaList.map((tipo) => (
                                                        <option key={tipo.id_tipo_denuncia} value={tipo.id_tipo_denuncia}>
                                                            {tipo.tipo_denuncia}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => { setShowReportModal(false); setReportReason(''); }}>
                                                Cancelar
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={handleReportSubmit}
                                                disabled={!reportReason}
                                            >
                                                Enviar denúncia
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </>
                            )}
                            {idAutor === user?.id_utilizador && (
                                <Dropdown.Item className='text-danger' onClick={handleDelete}>
                                    <BsFillTrash3Fill className='me-4' />Eliminar
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {/* Texto */}
                <div className="mt-3 mb-2">
                    <p className="mb-1">{texto}</p>
                </div>

                <hr />

                {/* Ações */}
                <div className="d-flex justify-content-start align-items-center gap-4">
                    <Button
                        size="sm"
                        className={`btn d-flex align-items-center text-white ${liked ? 'btn-primary' : 'btn-outline-secondary'}`}
                        onClick={handleLike}
                    >
                        {liked ? (
                            <AiFillLike className="me-1" style={{ fontSize: '20px' }} />
                        ) : (
                            <AiOutlineLike className="me-1" style={{ fontSize: '20px' }} />
                        )}
                        {likes}
                    </Button>

                    <Button variant="outline-secondary" size="sm" className="d-flex align-items-center">
                        <BsChat className="me-1" style={{ fontSize: '18px' }} /> {comentarios} comentários
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default PostCard;
