import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaThumbsUp, FaComment } from 'react-icons/fa';

const PostComments = () => {
  const {postId} = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // Verifique se postId é válido antes de fazer a requisição
        if (!postId || isNaN(postId)) {
          throw new Error('ID do post inválido');
        }

        const response = await axios.get(`http://localhost:3000/posts/${postId}/comments`);
        
        // Verifique se a resposta tem a estrutura esperada
        if (response.data && response.data.success) {
          setComments(response.data.data);
        } else {
          throw new Error('Estrutura de resposta inesperada');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="alert alert-danger">Erro: {error}</div>;

  return (
    <div className="container mt-4">
      <h3>Comentários</h3>
      {comments.length === 0 ? (
        <div className="alert alert-info">Nenhum comentário encontrado</div>
      ) : (
        <div className="list-group">
          {comments.map((comment) => (
            <div key={comment.id_comentario} className="list-group-item mb-3">
              <div className="d-flex align-items-start">
                <img 
                  src={comment.autor.img_perfil || '/default-profile.png'} 
                  alt={comment.autor.nome}
                  className="rounded-circle me-3"
                  style={{ width: '40px', height: '40px' }}
                />
                <div>
                  <h6>{comment.autor.nome}</h6>
                  <p>{comment.texto_comentario}</p>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-sm btn-outline-primary me-2">
                      <FaThumbsUp className="me-1" /> {comment.contador_likes_com}
                    </button>
                    <span className="text-muted">
                      <FaComment className="me-1" /> Responder
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostComments;