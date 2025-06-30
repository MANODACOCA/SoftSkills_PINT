import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import './headerForum.css';
import { create_post } from '../../../api/post_axios';
import { useUser } from '../../../utils/useUser';

const ForumHeader = ({ totalPosts, forum }) => {
    const API_URL = 'https://softskills-api.onrender.com/';
    const { user } = useUser();
    const [showModal, setShowModal] = useState(false);
    const [conteudo, setConteudo] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isError, setIsError] = useState('');
    const [isSuccess, setIsSuccess] = useState('');

    const onCreatePost = async () => {
        if (!conteudo.trim() || !user || !forum) return;

        setIsSubmitting(true);
        setIsError('');
        setIsSuccess('');

        try {
            await create_post({
                texto_post: conteudo,
                id_utilizador: user.id_utilizador,
                id_conteudos_partilhado: forum.id_conteudos_partilhado,
            });

            setConteudo('');
            setShowModal(false);
            setIsSuccess('Post criado com sucesso!');
        } catch (error) {
            console.error('Erro ao criar post:', error);
            setIsError('Erro ao criar post. Tente novamente.');
            setConteudo('');
        } finally {
            setIsSubmitting(false);
        }
    };

    const binaryNumbers = Array.from({ length: 150 }, () => Math.random() > 0.5 ? '1' : '0');

    return (
        <div className="w-100">
            {/* Banner com efeito binário */}
            <div className="banner-gradient position-relative overflow-hidden" style={{ height: '140px' }}>
                <div className="binary-overlay position-absolute top-0 start-0 w-100 h-100">
                    <div className="binary-text p-3 d-flex flex-wrap">
                        {binaryNumbers.map((bit, i) => (
                            <span key={i} className="me-2 mb-1 opacity-50">{bit}</span>
                        ))}
                    </div>
                </div>
                <div className="position-absolute bottom-0 start-0 p-4 text-white">
                    <div className="d-flex align-items-center gap-4">
                        <div className="text-center">
                            <div className="h5 mb-0 fw-bold">{totalPosts}</div>
                            <small className="h5 mb-0 fw-semibold">Posts</small>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cabeçalho principal */}
            <div className="bg-white border-bottom shadow-sm">
                <div className="container-lg py-4">
                    <div className="row align-items-center">
                        <div className="col-md-10">
                            <div className="d-flex align-items-center">
                                <div className="rounded-circle d-flex align-items-center justify-content-center me-3">
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(forum.id_topico_topico.nome_topico || 'F')}&background=random&bold=true`}
                                        alt={`Imagem do fórum`}
                                        className="rounded-5"
                                    />
                                </div>
                                <div>
                                    <h1 className="h2 mb-1 text-dark">{forum.id_topico_topico.nome_topico}</h1>
                                    <p className="text-muted mb-0 small">{forum.id_topico_topico.descricao_top}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 text-md-end mt-3 mt-md-0">
                            <button className="btn btn-primary btn-lg" onClick={() => setShowModal(true)}>
                                <i className="bi bi-plus-circle me-2"></i>
                                Novo Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de criação de post */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Criar novo post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex align-items-center mb-3">
                        <div
                            className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                            style={{ width: 40, height: 40 }}
                        >
                            {user && (
                                <img
                                    src={`${API_URL}${user.img_perfil}`}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nome_utilizador)}&background=random&bold=true`;
                                    }}
                                    alt="Imagem de perfil"
                                    className="w-100 img-profile rounded-2"
                                />
                            )}
                        </div>
                        <span className="ms-2 fw-semibold">Você</span>
                    </div>

                    {isError && <Alert variant="danger">{isError}</Alert>}
                    {isSuccess && <Alert variant="success">{isSuccess}</Alert>}

                    <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Partilhe aqui os seu conhecimentos..."
                        value={conteudo}
                        onChange={(e) => setConteudo(e.target.value)}
                        style={{ height: '300px', resize: 'none' }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={onCreatePost}
                        disabled={isSubmitting || !conteudo.trim()}
                    >
                        {isSubmitting ? 'Publicando...' : 'Publicar'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ForumHeader;
