import React, { useState, useRef } from 'react';
import { FaPaperclip, FaPaperPlane } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { Form, Button, Alert } from 'react-bootstrap';
import { create_comentario } from "../../../../api/comentario_axios";
import { useUser } from '../../../../utils/useUser';

const CaixaComentario = () => {
    const [comment, setComment] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isError, setIsError] = useState('');
    const { user } = useUser();

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!comment.trim() && !selectedFile) return;

        setIsSubmitting(true);
        setIsError('');



        try {
            const formData = new FormData();
            formData.append('texto_post', comment);
            formData.append('id_utilizador', user.id_utilizador);
            formData.append('id_formato', '1');

            if (selectedFile) {
                formData.append('ficheiro', selectedFile);
            }

            await create_comentario(formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setComment('');
            setSelectedFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            Swal.fire({
                title: "Comentário criado com sucesso!",
                icon: "success",
                showConfirmButton: false,
                timer: 3000,
            });

            if (onCommentCreated) {
                onCommentCreated();
            }
        } catch (error) {
            console.error('Erro ao criar comentário:', error);
            setIsError('Erro ao criar comentário. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }

    };

    const handleFileSelect = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setSelectedFile(file);
            console.log('Ficheiro selecionado:', file.name);
        }
    };

    const handlePinClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {isError && <Alert variant="danger">{isError}</Alert>}
            <div
                className="d-flex align-items-center mb-3 p-2 rounded-3 gap-3 text-light"
                style={{ backgroundColor: "#f7f9fc" }}
            >
                <Button
                    variant="outline-secondary"
                    type="button"
                    onClick={handlePinClick}
                    title="Anexar ficheiro"
                >
                    <FaPaperclip />
                </Button>

                <Form.Control
                    type="text"
                    placeholder="Escreva um comentário..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    style={{ flexGrow: 1 }}
                />

                <Button
                    variant="primary"
                    type="submit"
                    disabled={!comment.trim() && !selectedFile}
                    title="Enviar"
                >
                    <FaPaperPlane />
                </Button>
            </div>


            <Form.Control
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
                style={{ display: 'none' }}
            />

            {selectedFile && (
                <div className="mb-3 p-3 bg-light rounded d-flex justify-content-between align-items-center">
                    <div>
                        <small className="text-muted">Ficheiro selecionado:</small>
                        <div className="fw-medium">{selectedFile.name}</div>
                        <small className="text-muted">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</small>
                    </div>
                    <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => {
                            setSelectedFile(null);
                            if (fileInputRef.current) {
                                fileInputRef.current.value = '';
                            }
                        }}
                    >x
                    </Button>
                </div>
            )}
        </Form>
    );
};

export default CaixaComentario;
