import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const CursosPage = () => {
  const [cursos, setCursos] = useState([]);
  const [tipologia, setTipologia] = useState('todos');

  useEffect(() => {
    loadCursos();
  }, [tipologia]);

  const loadCursos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/cursos/list");
      setCursos(res.data);
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
      <h2 className="mb-4">Página de Cursos</h2>
      <div className="row row-cols-1 g-4">
        {cursos.map((curso) => (
          <div key={curso.id_curso} className="col">
            <div className="card h-100 flex-row shadow-sm">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{curso.nome_curso}</h5>
                  <p className="card-text">{curso.descricao_curso}</p>
                  <p className="card-text">
                    <small className="text-muted">
                     {formatDate(curso.data_inicio_curso)}
                    </small>
                    <small className="text-muted">
                     {formatDate(curso.data_fim_curso)}
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

export default CursosPage;