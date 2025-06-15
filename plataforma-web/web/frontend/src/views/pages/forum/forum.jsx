import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getForuns, filtrarConteudosPartilhados } from '../../../api/conteudos_partilhado_axios';

const Foruns = () => {
  const [foruns, setForuns] = useState([]);
  const [ordenar, setOrdenar] = useState('Mais Recentes');
  const [filtros, setFiltros] = useState({
    id_area: null,
    id_topico: null
  });
  const [areas, setAreas] = useState([]);
  const [topicos, setTopicos] = useState([]);
  const navigate = useNavigate();

  // Função para buscar os fóruns com ou sem filtros
  const fetchForuns = async () => {
    try {
      let data;
      // Se houver filtros aplicados, use a função de filtro
      if (filtros.id_area || filtros.id_topico) {
        data = await filtrarConteudosPartilhados(filtros);
      } else {
        // Caso contrário, use a função normal de busca
        data = await getForuns(ordenar);
      }
      setForuns(data);
    } catch (error) {
      console.error('Erro ao encontrar foruns!', error);
    }
  };

  const handleParticiparClick = (idConteudo) => {
    navigate(`/forum/posts/${idConteudo}`);
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value || null
    }));
  };

  const limparFiltros = () => {
    setFiltros({
      id_area: null,
      id_topico: null
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAreasETopicos();
    fetchForuns();
  }, [ordenar, filtros]); // Adicionei filtros como dependência

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0">Fóruns</h1>
        <div className="d-flex gap-2">
          <select className="form-select w-auto" value={ordenar}
            onChange={(e) => setOrdenar(e.target.value)}>
            <option value="Mais Recentes">Mais Recentes</option>
            <option value="Mais Antigos">Mais Antigos</option>
          </select>
        </div>
      </div>

      {/* Seção de Filtros */}
      <div className="card mb-4 p-3">
        <h5 className="mb-3">Filtrar Fóruns</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <label htmlFor="id_area" className="form-label">Área</label>
            <select 
              id="id_area"
              name="id_area"
              className="form-select"
              value={filtros.id_area || ''}
              onChange={handleFiltroChange}
            >
              <option value="">Todas as áreas</option>
              {areas.map(area => (
                <option key={area.id_area} value={area.id_area}>
                  {area.nome_area}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="id_topico" className="form-label">Tópico</label>
            <select 
              id="id_topico"
              name="id_topico"
              className="form-select"
              value={filtros.id_topico || ''}
              onChange={handleFiltroChange}
            >
              <option value="">Todos os tópicos</option>
              {topicos.map(topico => (
                <option key={topico.id_topico} value={topico.id_topico}>
                  {topico.nome_topico}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4 d-flex align-items-end">
            <button 
              className="btn btn-outline-secondary"
              onClick={limparFiltros}
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Fóruns */}
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