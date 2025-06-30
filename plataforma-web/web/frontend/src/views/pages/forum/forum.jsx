import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from 'react-bootstrap';
import {
  getForuns,
  filtrarConteudosPartilhados
} from '../../../api/conteudos_partilhado_axios';

const Foruns = () => {
  const [foruns, setForuns] = useState([]);
  const [ordenar, setOrdenar] = useState('Mais Recentes');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({ id_area: '', id_topico: '' });
  const [pesquisa, setPesquisa] = useState(''); // <- nova state de pesquisa

  const navigate = useNavigate();

  const fetchForuns = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = filtros.id_area || filtros.id_topico
        ? await filtrarConteudosPartilhados(filtros)
        : await getForuns(ordenar);

      setForuns(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao carregar fóruns:", err);
      setError("Erro ao carregar fóruns. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }, [ordenar, filtros]);

  useEffect(() => {
    fetchForuns();
  }, [fetchForuns]);

  const handleParticiparClick = (id) => {
    navigate(`/forum/${id}`);
  };

  // Filtra os fóruns com base no termo de pesquisa
  const forunsFiltrados = foruns.filter((forum) => {
    const topico = forum.id_topico_topico || {};
    const titulo = topico.nome_topico?.toLowerCase() || '';
    const descricao = topico.descricao_top?.toLowerCase() || '';
    return titulo.includes(pesquisa.toLowerCase()) || descricao.includes(pesquisa.toLowerCase());
  });

  const renderForumCard = (forum) => {
    const topico = forum.id_topico_topico || {};
    const area = topico.id_area_area || {};
    const dataCriacao = forum.data_criacao_cp
      ? new Date(forum.data_criacao_cp).toLocaleDateString()
      : "Data desconhecida";

    return (
      <div key={`forum-${forum.id_conteudos_partilhado}`} className="col">
        <div className="card h-100 shadow-sm">
          <div className="d-flex h-100">
            <div className="w-100" style={{ maxWidth: "200px" }}>
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(topico.nome_topico || 'F')}&background=random&bold=true`}
                alt={`Imagem do fórum ${topico.nome_topico}`}
                className="img-fluid h-100 object-fit-cover"
                style={{ width: '200px' }}
              />
            </div>
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title">{topico.nome_topico || 'Tópico desconhecido'}</h5>
                <p className="card-text">{topico.descricao_top || 'Sem descrição'}</p>
                <div className="d-flex gap-3 flex-wrap">
                   <small className="text-muted">Criado em: {dataCriacao}</small>
                  <small className="text-muted">Tópico: {topico.nome_topico || 'Tópico desconhecido'}</small>
                </div>
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
    );
  };

  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-3">

        <div className="d-flex align-items-center gap-4 w-50">
          <h1 className="mb-0">Fóruns</h1>
          <input
            type="text"
            className="form-control w-50"
            placeholder="Pesquisar por forúm"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </div>


        <div className="d-flex justify-content-center align-items-center">
          <p className="mb-0 me-2">Ordenar:</p>
          <select
            className="form-select w-auto"
            value={ordenar}
            onChange={(e) => setOrdenar(e.target.value)}
          >
            <option value="Mais Recentes">Mais Recentes</option>
            <option value="Mais Antigos">Mais Antigos</option>
          </select>
        </div>

      </div>

      {loading && foruns.length === 0 ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center my-5">{error}</div>
      ) : forunsFiltrados.length === 0 ? (
        <div className="alert alert-info text-center">Nenhum fórum encontrado com a pesquisa atual.</div>
      ) : (
        <div className="row row-cols-1 g-4">
          {forunsFiltrados.map(renderForumCard)}
        </div>
      )}
    </div>
  );
};

export default Foruns;
