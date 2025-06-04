import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaThumbsUp, FaComment } from "react-icons/fa";

const ForumPosts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/conteudos_partilhado/${id}/posts`);
        setPosts(res.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Erro ao carregar posts");
        setLoading(false);
      }
    };

    fetchPosts();
  }, [id]);

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(`http://localhost:3000/posts/${postId}/like`);
      
      // Atualiza o contador usando a resposta da API
      setPosts(posts.map(post => 
        post.id_post === postId 
          ? { 
              ...post, 
              contador_likes_post: response.data.newLikeCount,
              liked: true // Adiciona um estado de like se quiser feedback visual
            } 
          : post
      ));
    } catch (error) {
      console.error("Erro ao curtir post:", error);
      // Feedback visual para o usuário
      setError("Não foi possível curtir o post. Tente novamente.");
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleViewComments = (postId) => {
    navigate(`/forum/posts/${id}/comments/${postId}`);
  };

  if (loading) return <div className="container mt-4">Carregando...</div>;
  if (error) return <div className="container mt-4 alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <Link to="/forum" className="btn btn-outline-secondary mb-4">
        &larr; Voltar ao Fórum
      </Link>
      
      <h2>Discussões</h2>
      
      {posts.length === 0 ? (
        <div className="alert alert-info">Nenhum post encontrado neste tópico.</div>
      ) : (
        <div className="list-group">
          {posts.map((post) => (
            <div key={post.id_post} className="list-group-item mb-3 shadow-sm">
              <div className="d-flex align-items-start">
                <img 
                  src={post.autor?.img_perfil || "/default-profile.png"} 
                  alt={post.autor?.nome || "Autor desconhecido"}
                  className="rounded-circle me-3"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-1">{post.autor?.nome || "Anônimo"}</h5>
                    <small className="text-muted">
                      {new Date(post.data_criacao).toLocaleDateString()}
                    </small>
                  </div>
                  <p className="mb-1">{post.texto_post}</p>
                  <div className="d-flex justify-content-between mt-2">
                    <div>
                      <button 
                        className={`btn btn-sm me-2 ${post.liked ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => handleLike(post.id_post)}
                        disabled={post.liked}
                      >
                        <FaThumbsUp className="me-1" />
                        {post.contador_likes_post}
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleViewComments(post.id_post)}
                      >
                        <FaComment className="me-1" />
                        {post.contador_comentarios}
                      </button>
                    </div>
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

export default ForumPosts;