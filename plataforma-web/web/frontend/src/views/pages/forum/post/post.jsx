import React, { useEffect, useState } from "react";
import { Spinner } from 'react-bootstrap';
import { useLocation } from "react-router-dom";

import ForumHeader from "../../../components/forum/header/headerForum";
import Post from "../../../components/forum/post/post";
import { get_post } from "../../../../api/post_axios";

const ForumPosts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const forum = location.state?.forum;

  const fetchPosts = async () => {
    try {
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


  if (loading) return <div className="mt-4"><div className="text-center py-5">
    <Spinner animation="border" variant="primary" />
  </div></div>;

  if (error) return <div className="mt-4 alert alert-danger">{error}</div>;
  console.log(posts);

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
          posts.map((post) => (
            <Post
              key={post.id_post}
              autor={post.id_utilizador_utilizador.nome_utilizador} // ou substitui com username real se tiveres
              tempo={"agora"} // ou formata a data do post
              texto={post.texto_post}
              likes={post.contador_likes_post}
              comentarios={post.contador_comentarios}
              imagemAutor={post.id_utilizador_utilizador.img_perfil} // ou avatar do autor
            />
          ))
        )}
      </div>

    </div>
  );
};

export default ForumPosts;