import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaThumbsUp, FaReply } from "react-icons/fa";

const PostComments = () => {
  const { id, postId } = useParams();
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca os comentários
        const commentsRes = await axios.get(`http://localhost:3000/api/posts/${postId}/comments`);
        setComments(commentsRes.data);
        
        // Busca informações do post
        const postRes = await axios.get(`http://localhost:3000/api/posts/${postId}`);
        setPost(postRes.data);
        
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Erro ao carregar comentários");
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(`http://localhost:3000/api/posts/${postId}/comments`, {
        texto_comentario: newComment
      });
      setComments([...comments, res.data]);
      setNewComment("");
    } catch (error) {
      console.error("Erro ao enviar comentário:", error);
    }
  };

  if (loading) return <div className="container mt-4">Carregando...</div>;
  if (error) return <div className="container mt-4 alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <Link 
        to={`/forum/posts/${id}`} 
        className="btn btn-outline-secondary mb-4 d-flex align-items-center"
      >
        <FaArrowLeft className="me-2" /> Voltar aos posts
      </Link>

      {post && (
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <div className="d-flex align-items-start">
              <img 
                src={post.autor.img_perfil || "/default-profile.png"} 
                alt={post.autor.nome}
                className="rounded-circle me-3"
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
              <div className="flex-grow-1">
                <h5>{post.autor.nome}</h5>
                <p>{post.texto_post}</p>
                <div className="d-flex">
                  <span className="badge bg-light text-dark me-2">
                    <FaThumbsUp className="me-1" /> {post.contador_likes_post}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-header">
          <h5 className="mb-0">Comentários ({comments.length})</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmitComment} className="mb-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Adicione um comentário..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                <FaReply className="me-1" /> Comentar
              </button>
            </div>
          </form>

          {comments.length === 0 ? (
            <div className="alert alert-info">Nenhum comentário ainda. Seja o primeiro a comentar!</div>
          ) : (
            <div className="list-group">
              {comments.map((comment) => (
                <div key={comment.id_comentario} className="list-group-item mb-2">
                  <div className="d-flex align-items-start">
                    <img 
                      src={comment.autor.img_perfil || "/default-profile.png"} 
                      alt={comment.autor.nome}
                      className="rounded-circle me-3"
                      style={{ width: "40px", height: "40px", objectFit: "cover" }}
                    />
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between">
                        <h6 className="mb-1">{comment.autor.nome}</h6>
                        <small className="text-muted">
                          {/* Data do comentário */}
                        </small>
                      </div>
                      <p className="mb-1">{comment.texto_comentario}</p>
                      <div className="d-flex">
                        <button className="btn btn-sm btn-outline-primary me-2">
                          <FaThumbsUp className="me-1" /> {comment.contador_likes_com}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostComments;