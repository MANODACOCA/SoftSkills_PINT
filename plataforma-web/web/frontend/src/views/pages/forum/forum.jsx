import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Forum = () => {
  const [conteudopartilhado, setconteudopartilhado] = useState([]);

   useEffect(() => {
      loadConteudoPartilhado();
    }, []);
  
    const loadConteudoPartilhado = async () => {
      try {
        const res = await axios.get("http://localhost:3000/conteudos_partilhado/list");
        if (res.data.success) {
          setconteudopartilhado(res.data.data);
        } else {
          alert("Erro ao carregar Conteúdos Partilhados!");
        }
      } catch (error) {
        alert("Erro: " + error.message);
      }
    };

    return (
    <div className="container mt-4">
      <h2 className="mb-4">Fórum de Cursos</h2>
      <div className="row row-cols-1 g-4">
        {conteudopartilhado.map((conteudopartilhado) => (
          <div key={conteudopartilhado.id_conteudos_partilhado} className="col">
            <div className="card h-100 flex-row shadow-sm">
              <img
                src={conteudopartilhado.image}
                alt="Imagem do curso"
                className="img-fluid"
                style={{ width: '250px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{conteudopartilhado.topico.nome_topico}</h5>
                  <p className="card-text">{conteudopartilhado.descricao_cp}</p>
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