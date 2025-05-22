import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Forum = () => {
  const [conteudospartilhados, setConteudosPartilhados] = useState([]);

  useEffect(() => {
    loadConteudoPartilhado();
  }, []);

  const loadConteudoPartilhado = async () => {
    try {
      const res = await axios.get("http://localhost:3000/conteudos_partilhado/list");
      // Considerando que a resposta é um array direto (como mostraste)
      setConteudosPartilhados(res.data);
    } catch (error) {
      alert("Erro ao carregar conteúdos: " + error.message);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("pt-PT", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Fórum de Cursos</h2>
      <div className="row row-cols-1 g-4">
        {conteudospartilhados.map((conteudospartilhado) => (
          <div key={conteudospartilhado.id_conteudos_partilhado} className="col">
            <div className="card h-100 flex-row shadow-sm">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">Tópico #{conteudospartilhado.id_topico}</h5>
                  <p className="card-text">{conteudospartilhado.descricao_cp}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Criado em: {formatDate(conteudospartilhado.data_criacao_cp)}
                    </small>
                  </p>
                </div>
                <div className="text-end">
                  <button className="btn btn-primary">Participar</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;

/*const Forum = () => {
  const posts = [
    {
      title: 'Hacker Master',
      description:
        'C++ é uma linguagem de programação de propósito geral amplamente utilizada, conhecida por sua eficiência e flexibilidade.',
      image: 'https://via.placeholder.com/300x150',
    },
    {
      title: 'UX Design Avançado',
      description:
        'Curso prático sobre princípios e técnicas modernas de design centrado no utilizador.',
      image: 'https://via.placeholder.com/300x150',
    },
    {
      title: 'Introdução ao React',
      description:
        'Aprenda os fundamentos do React, uma das bibliotecas mais populares para desenvolvimento frontend.',
      image: 'https://via.placeholder.com/300x150',
    },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Fórum de Cursos - Conteúdo Partilhado</h2>

      <div className="row row-cols-1 g-4">
        {posts.map((post, index) => (
          <div key={index} className="col">
            <div className="card h-100 flex-row shadow-sm">
              <img
                src={post.image}
                alt="Imagem do curso"
                className="img-fluid"
                style={{ width: '250px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description}</p>
                </div>
                <div className="text-end">
                  <button className="btn btn-primary">Participar</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;*/