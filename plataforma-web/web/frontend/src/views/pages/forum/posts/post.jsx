import React, { useEffect, useState } from "react";
import { Spinner } from 'react-bootstrap';
import { useLocation } from "react-router-dom";

import ForumHeader from "../../../components/forum/header/headerForum";
import PostCard from "../../../components/forum/post/post";
import { get_post } from "../../../../api/post_axios";

const ForumPosts = () => {
  const [ordenar, setOrdenar] = useState('Mais Recentes');
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

      const data = await get_post(forum.id_conteudos_partilhado, ordenar);
      const novosPosts = data.posts || [];

      if (JSON.stringify(novosPosts) !== JSON.stringify(posts)) {
        setPosts(novosPosts);
      }

    } catch (err) {
      console.error(err);
      setError("Erro ao carregar posts.");
    } finally {
      setLoading(false);
    }
  };

  const handleLikeChanged = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id_post === postId
          ? {
            ...post,
            contador_likes: post.ja_curtiu ? post.contador_likes - 1 : post.contador_likes + 1,
            ja_curtiu: !post.ja_curtiu
          }
          : post
      )
    );
  };


  useEffect(() => {
    window.scrollTo(0, 0);
    if (!forum) {
      setError("Fórum indisponível no momento. Por favor, tente mais tarde novamente!");
      return;
    }

    fetchPosts();

  }, [forum, ordenar]);


  if (loading) return (
    <div className="mt-4">
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    </div>
  );

  if (error) return <div className="mt-4 alert alert-danger">{error}</div>;
  console.table("DAWDA", posts);
  return (
    <div>
      <ForumHeader
        totalPosts={posts.length}
        forum={forum}
        onPostCreated={fetchPosts}
      />

      <div className="container mt-4" style={{ maxWidth: '1500px' }}>

        <div className="d-flex justify-content-end align-items-center mb-3">
          <p className="mb-0 me-2">Ordenar:</p>
          <select
            className="form-select w-auto"
            value={ordenar}
            onChange={(e) => setOrdenar(e.target.value)}
          >
            <option value="Mais Recentes">Mais Recentes</option>
            <option value="Mais Antigos">Mais Antigos</option>
            <option value="Mais Populares">Mais Populares</option>
            <option value="Menos Populares">Menos Populares</option>
          </select>
        </div>

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
                email={autorData.email || "Email desconhecido"}
                texto={post.texto_post}
                likes={post.contador_likes_post}
                comentarios={post.contador_comentarios}
                imagemAutor={autorData.img_perfil}
                dataCriacao={post.data_criacao_post}
                conteudo={post.caminho_ficheiro}
                tipoFormato={post.id_formato}
                onLikeChanged={handleLikeChanged}
                onDeleted={handlePostDeleted}
                jaCurtiu={post.ja_curtiu}
              />
            );
          })

        )}
      </div>

    </div>
  );
};

export default ForumPosts;