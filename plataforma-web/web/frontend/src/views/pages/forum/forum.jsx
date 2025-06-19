import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getForuns } from '../../../api/conteudos_partilhado_axios';

const Foruns = () => {
  const [foruns, setForuns] = useState([]);
  const [ordenar, setOrdenar] = useState('Mais Recentes');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchForuns = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getForuns(ordenar);
      setForuns(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao encontrar foruns!', error);
      setError('Erro ao carregar fóruns. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleParticiparClick = (idConteudo) => {
    navigate(`/forum/posts/${idConteudo}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchForuns();
  }, [ordenar]);

  if (loading) {
    return <div className="text-center my-5">Carregando fóruns...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center my-5">{error}</div>;
  }

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0">Fóruns</h1>
        <select 
          className="form-select w-auto" 
          value={ordenar}
          onChange={(e) => setOrdenar(e.target.value)}
        >
          <option value="Mais Recentes">Mais Recentes</option>
          <option value="Mais Antigos">Mais Antigos</option>
        </select>
      </div>
      
      {foruns.length === 0 ? (
        <div className="alert alert-info text-center">
          Nenhum fórum encontrado.
        </div>
      ) : (
        <div className="row row-cols-1 g-4">
          {foruns.map((forum) => {
            // Verifica se o fórum tem a estrutura esperada
            const nomeTopico = forum?.id_topico_topico?.nome_topico || 'Tópico desconhecido';
            const descricaoTopico = forum?.id_topico_topico?.descricao_top || 'Sem descrição';
            const dataCriacao = forum?.data_criacao_cp ? new Date(forum.data_criacao_cp).toLocaleDateString() : 'Data desconhecida';

            return (
              <div key={forum.id_conteudos_partilhado} className="col">
                <div className="card h-100 shadow-sm">
                  <div className="d-flex h-100">
                    <div className="w-100" style={{ maxWidth: "200px" }}>
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(nomeTopico)}&background=random&bold=true`}
                        alt={`Imagem do fórum ${nomeTopico}`}
                        className="img-fluid h-100 object-fit-cover"
                        style={{ width: '200px' }}
                      />
                    </div>
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title">{nomeTopico}</h5>
                        <p className="card-text">{descricaoTopico}</p>
                        <p className="card-text">
                          <small className="text-muted">
                            Criado em: {dataCriacao}
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
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Foruns;