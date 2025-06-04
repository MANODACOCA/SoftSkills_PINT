import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const PostComments = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca os comentários
        const commentsRes = await axios.get(`http://localhost:3000/posts/${postId}/comments`);
        setComments(commentsRes.data);
        
        // Busca informações básicas do post (opcional)
        const postRes = await axios.get(`http://localhost:3000/posts/${postId}`);
        setPost(postRes.data);
        
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Erro ao carregar comentários");
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  if (loading) return <div className="container mt-4">Carregando comentários...</div>;
  if (error) return <div className="container mt-4 alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-4">
        &larr; Voltar ao post
      </button>
      
      {post && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{post.autor?.nome || "Anônimo"}</h5>
            <p className="card-text">{post.texto_post}</p>
          </div>
        </div>
      )}
      
      <h3>Comentários</h3>
      
      {comments.length === 0 ? (
        <div className="alert alert-info">Nenhum comentário encontrado.</div>
      ) : (
        <div className="list-group">
          {comments.map((comment) => (
            <div key={comment.id_comentario} className="list-group-item mb-3 shadow-sm">
              <div className="d-flex align-items-start">
                <img 
                  src={comment.utilizador?.img_perfil || "/default-profile.png"} 
                  alt={comment.utilizador?.nome || "Autor desconhecido"}
                  className="rounded-circle me-3"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-1">{comment.utilizador?.nome || "Anónimo"}</h6>
                  </div>
                  <p className="mb-1">{comment.texto_comentario}</p>
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