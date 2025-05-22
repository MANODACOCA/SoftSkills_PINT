import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { list_post, get_post, create_post, update_post, delete_post } from '../../../../api/post_axios';

const Post = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    list_post()
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error('Erro ao carregar posts:', error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.texto_post}</li>
        ))}
      </ul>
    </div>
  );
};

export default Post;