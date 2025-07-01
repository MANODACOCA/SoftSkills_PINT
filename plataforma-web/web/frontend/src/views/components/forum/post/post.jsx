import './post.css';
import React, { useState } from 'react';
import { Card, Button, Dropdown } from 'react-bootstrap';
import { BsChat, BsThreeDots, BsFillTrash3Fill, BsExclamationTriangleFill } from 'react-icons/bs';
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

const PostCard = ({ autor, tempo, texto, likes: inicialLikes, comentarios, imagemAutor }) => {
    const API_URL = 'https://softskills-api.onrender.com/';

    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(inicialLikes);

    const handleLike = () => {
        if (liked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setLiked(!liked);
    }

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
                            <Dropdown.Item href="#action-1">
                                <BsExclamationTriangleFill />Denuciar
                            </Dropdown.Item>
                            <Dropdown.Item href="#action-2">
                                <BsFillTrash3Fill />Eliminar
                            </Dropdown.Item>
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
                    <Button variant={liked ? "secondary" : "primary"} size="sm" className="d-flex align-items-center" onClick={handleLike}>
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
