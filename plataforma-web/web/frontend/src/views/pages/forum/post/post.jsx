import React, { useEffect, useState } from "react";
import { Spinner } from 'react-bootstrap';
import { useLocation } from "react-router-dom";

import ForumHeader from "../../../components/forum/header/headerForum";
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


  console.log(posts.quatidadePosts);

  return (
    <div>
      <ForumHeader
        totalPosts={posts.length}
        forum={forum}
        onPostCreated={fetchPosts}
      />

    </div>
  );
};

export default ForumPosts;