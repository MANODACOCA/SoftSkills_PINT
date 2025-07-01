import React, { useEffect, useState } from "react";
import { Spinner } from 'react-bootstrap';
import { useLocation } from "react-router-dom";

import ForumHeader from "../../../components/forum/header/headerForum";
import PostCard from "../../../components/forum/post/post";
import { get_post } from "../../../../api/post_axios";

const ForumPosts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const forum = location.state?.forum;

  const handlePostDeleted = (deletedPostId) => {
    setPosts(posts.filter(post => post.id_post !== deletedPostId));
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      if (!forum || !forum.id_conteudos_partilhado) {
        throw new Error("Fórum inválido ou ausente.");
      }

      const data = await get_post(forum.id_conteudos_partilhado);
      setPosts(data.posts || []);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!forum) {
      setError("Fórum indisponível no momento. Por favor, tente mais tarde novamente!");
    }
    fetchPosts();
  }, [forum]);


  if (loading) return (
    <div className="mt-4">
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    </div>
  );


  if (error) return <div className="mt-4 alert alert-danger">{error}</div>;

  return (
    <div>
      <ForumHeader
        totalPosts={posts.length}
        forum={forum}
        onPostCreated={fetchPosts}
      />
      <div className="container mt-5" style={{ maxWidth: '1500px' }}>
        {posts.length === 0 ? (
          <div className="alert alert-warning mt-3">Ainda não existem posts.</div>
        ) : (
          posts.map((post) => {
            const autorData = post.id_utilizador_utilizador || {};
            
            return (
              <PostCard
                key={post.id_post}
                idPost={post.id_post}
                idAutor={autorData.id_utilizador}
                autor={autorData.nome_utilizador || "Usuário desconhecido"}
                tempo={"agora"}
                texto={post.texto_post}
                likes={post.contador_likes_post}
                comentarios={post.contador_comentarios}
                imagemAutor={autorData.img_perfil}
                onDeleted={handlePostDeleted}
              />
            );
          })

        )}
      </div>

    </div>
  );
};

export default ForumPosts;