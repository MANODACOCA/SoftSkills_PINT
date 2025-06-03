import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getForuns } from '../../../api/conteudos_partilhado_axios';

const Foruns = () => {
  const [foruns, setForuns] = useState([]);
  const [ordenar, setOrdenar] = useState('Mais Recentes');
  const navigate = useNavigate();

  const fetchForuns = async () => {
    try {
      const data = await getForuns(ordenar);
      setForuns(data);
    } catch (error) {
      console.error('Erro ao encontrar foruns!');
    }
  };

    const handleParticiparClick = (idConteudo) => {
    navigate(`/forum/posts/${idConteudo}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchForuns();
  }, [ordenar]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0">Fóruns</h1>
        <select className="form-select w-auto" value={ordenar}
          onChange={(e) => setOrdenar(e.target.value)}>
          <option value="Mais Recentes">Mais Recentes</option>
          <option value="Mais Antigos">Mais Antigos</option>
        </select>
      </div>
      {foruns.length === 0 ? (
        <p className="text-muted text-center">Nenhum fórum encontrado.</p>
      ) : (
        <div className="row row-cols-1 g-4">
          {foruns.map((forum) => (
            <div key={forum.id_conteudos_partilhado} className="col">
              <div className="card h-100 shadow-sm">
                <div className="d-flex h-100">
                  <div className="w-100" style={{ maxWidth: "200px" }}>
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(forum.id_topico_topico?.nome_topico)}&background=random&bold=true`}
                      alt="Imagem de Forum"
                      className="img w-100 h-100 object-fit-cover" />
                  </div>
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title">{forum.id_topico_topico?.nome_topico}</h5>
                      <p className="card-text">{forum.id_topico_topico?.descricao_top}</p>
                      <p className="card-text">
                        <small className="text-muted">
                          Criado em: {new Date(forum.data_criacao_cp).toLocaleDateString()}
                        </small>
                      </p>
                    </div>
                    <div className="text-end">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleParticiparClick(forum.id_conteudos_partilhado)}
                      >
                        Participar
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

export default Foruns;