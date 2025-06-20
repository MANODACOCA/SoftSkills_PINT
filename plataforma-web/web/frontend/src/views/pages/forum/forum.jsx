import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  getForuns, 
  filtrarConteudosPartilhados,
  getAreas,
  getTopicos
} from '../../../api/conteudos_partilhado_axios';

const Foruns = () => {
  const [foruns, setForuns] = useState([]);
  const [ordenar, setOrdenar] = useState('Mais Recentes');
  const [loading, setLoading] = useState(true);
  const [loadingTopicos, setLoadingTopicos] = useState(false);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({
    id_area: '',
    id_topico: ''
  });
  const [areas, setAreas] = useState([]);
  const [topicos, setTopicos] = useState([]);
  const navigate = useNavigate();

  // Carrega os fóruns com base nos filtros
  const fetchForuns = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Se houver algum filtro ativo
      if (filtros.id_area || filtros.id_topico) {
        const data = await filtrarConteudosPartilhados(filtros);
        setForuns(Array.isArray(data) ? data : []);
      } else {
        // Caso contrário, carrega todos ordenados
        const data = await getForuns(ordenar);
        setForuns(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Erro ao carregar fóruns:', error);
      setError('Erro ao carregar fóruns. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  // Carrega todas as áreas
  const fetchAreas = async () => {
    try {
      const response = await getAreas();
      setAreas(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Erro ao carregar áreas:', error);
      setError('Erro ao carregar áreas para filtro.');
    }
  };

  // Carrega tópicos (todos ou filtrados por área)
  const fetchTopicos = async (idArea = null) => {
    try {
      setLoadingTopicos(true);
      const response = await getTopicos(idArea);
      setTopicos(Array.isArray(response) ? response : []);
      
      // Se mudou a área, reseta o tópico selecionado
      if (idArea && idArea !== filtros.id_area) {
        setFiltros(prev => ({ ...prev, id_topico: '' }));
      }
    } catch (error) {
      console.error('Erro ao carregar tópicos:', error);
      setTopicos([]);
    } finally {
      setLoadingTopicos(false);
    }
  };

  // Manipulador de mudança nos filtros
  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    
    setFiltros(prev => {
      const newFiltros = { ...prev, [name]: value };
      
      // Se a área mudou, carrega os tópicos correspondentes
      if (name === 'id_area') {
        if (value) {
          fetchTopicos(value);
        } else {
          fetchTopicos(); // Carrega todos os tópicos
        }
        newFiltros.id_topico = ''; // Reseta o tópico
      }
      
      return newFiltros;
    });
  };

  // Limpa todos os filtros
  const limparFiltros = () => {
    setFiltros({ id_area: '', id_topico: '' });
    fetchTopicos(); // Carrega todos os tópicos novamente
  };

  // Efeito inicial - carrega dados ao montar o componente
  useEffect(() => {
    const init = async () => {
      await fetchAreas();
      await fetchTopicos();
      await fetchForuns();
    };
    init();
  }, []);

  // Efeito para carregar fóruns quando ordenação ou filtros mudam
  useEffect(() => {
    fetchForuns();
  }, [ordenar, filtros]);

  // Navegação para o fórum
  const handleParticiparClick = (idConteudo) => {
    navigate(`/forum/posts/${idConteudo}`);
  };

  if (loading && foruns.length === 0) {
    return <div className="text-center my-5">Carregando fóruns...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center my-5">{error}</div>;
  }

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0">Fóruns</h1>
        <div className="d-flex gap-2">
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

      {/* Seção de Filtros */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Filtrar Fóruns</h5>
          <div className="row g-3 align-items-end">
            <div className="col-md-5">
              <label htmlFor="id_area" className="form-label fw-bold">Área</label>
              <select
                id="id_area"
                name="id_area"
                className="form-select"
                value={filtros.id_area}
                onChange={handleFiltroChange}
              >
                <option value="">Todas as áreas</option>
                {areas.map(area => (
                  <option key={`area-${area.id_area}`} value={area.id_area}>
                    {area.nome_area || 'Área sem nome'}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="col-md-5">
              <label htmlFor="id_topico" className="form-label fw-bold">Tópico</label>
              <select
                id="id_topico"
                name="id_topico"
                className="form-select"
                value={filtros.id_topico}
                onChange={handleFiltroChange}
                disabled={loadingTopicos}
              >
                <option value="">Todos os tópicos</option>
                {loadingTopicos ? (
                  <option disabled>Carregando tópicos...</option>
                ) : (
                  topicos.map(topico => (
                    <option key={`topico-${topico.id_topico}`} value={topico.id_topico}>
                      {topico.nome_topico || 'Tópico sem nome'}
                    </option>
                  ))
                )}
              </select>
            </div>
            
            <div className="col-md-2">
              <button 
                className="btn btn-outline-secondary w-100"
                onClick={limparFiltros}
                disabled={!filtros.id_area && !filtros.id_topico}
              >
                Limpar
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Lista de Fóruns */}
      {foruns.length === 0 ? (
        <div className="alert alert-info text-center">
          Nenhum fórum encontrado com os filtros atuais.
        </div>
      ) : (
        <div className="row row-cols-1 g-4">
          {foruns.map((forum) => {
            const topicoInfo = forum.id_topico_topico || {};
            const areaInfo = topicoInfo.id_area_area || {};
            
            return (
              <div key={`forum-${forum.id_conteudos_partilhado}`} className="col">
                <div className="card h-100 shadow-sm">
                  <div className="d-flex h-100">
                    <div className="w-100" style={{ maxWidth: "200px" }}>
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(topicoInfo.nome_topico || 'F')}&background=random&bold=true`}
                        alt={`Imagem do fórum ${topicoInfo.nome_topico}`}
                        className="img-fluid h-100 object-fit-cover"
                        style={{ width: '200px' }}
                      />
                    </div>
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title">{topicoInfo.nome_topico || 'Tópico desconhecido'}</h5>
                        <p className="card-text">{topicoInfo.descricao_top || 'Sem descrição'}</p>
                        <div className="d-flex gap-3">
                          <p className="card-text">
                            <small className="text-muted">
                              Área: {areaInfo.nome_area || 'Área desconhecida'}
                            </small>
                          </p>
                          <p className="card-text">
                            <small className="text-muted">
                              Criado em: {forum.data_criacao_cp 
                                ? new Date(forum.data_criacao_cp).toLocaleDateString() 
                                : 'Data desconhecida'}
                            </small>
                          </p>
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
          })}
        </div>
      )}
    </div>
  );
};

export default Foruns;