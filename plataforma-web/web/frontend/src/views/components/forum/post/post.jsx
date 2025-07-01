import './post.css';
import Swal from 'sweetalert2';
import React, { use, useState } from 'react';
import { Card, Button, Dropdown } from 'react-bootstrap';
import { BsChat, BsThreeDots, BsFillTrash3Fill, BsExclamationTriangleFill } from 'react-icons/bs';
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { delete_post, put_like, delete_like } from "../../../../api/post_axios";
//import Comentario from "../../../components/forum/comentario/comentario";
import { useUser } from '../../../../utils/useUser';

const PostCard = ({ idPost, idAutor, autor, tempo, texto, likes: inicialLikes, comentarios, imagemAutor, onDeleted }) => {
    const API_URL = 'https://softskills-api.onrender.com/';
    const { user, setUser } = useUser();

    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(inicialLikes);

    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);


    const handleLike = async () => {
        try {
            if (liked) {
                await delete_like(idPost,user.id_utilizador);
                setLikes(likes - 1);
            } else {
                await put_like(idPost,user.id_utilizador);
                setLikes(likes + 1);
            }
            setLiked(!liked);
        } catch (err) {
            console.error("Erro ao atualizar like:", err);
            Swal.fire("Erro", "Não foi possível atualizar o like. Tente novamente.", "error");
        }
    };


    const handleDelete = async () => {
        const result = await Swal.fire({
            title: 'Tem a certeza?',
            text: "Esta ação não pode ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, eliminar!',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            try {
                await delete_post(idPost);
                Swal.fire(
                    'Eliminado!',
                    'O post foi eliminado com sucesso.',
                    'success'
                );
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
                            <div className="text-muted small">{tempo}</div>
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
                                <Dropdown.Item onClick={handleDelete}>
                                    <BsExclamationTriangleFill className='me-4' />Denuciar
                                </Dropdown.Item>
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
