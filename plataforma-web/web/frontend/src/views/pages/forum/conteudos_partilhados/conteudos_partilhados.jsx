import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Spinner } from 'react-bootstrap';
import { LuCircleFadingPlus } from "react-icons/lu";
import {
  list_conteudos_partilhado
} from '../../../../api/conteudos_partilhado_axios';
import Swal from "sweetalert2";
import { create_pedido_forum } from "../../../../api/pedidos_forum_axios";
import { useUser } from "../../../../utils/useUser";

const Foruns = () => {
  const activeRole = localStorage.getItem('activeRole');
  const [foruns, setForuns] = useState([]);
  const [ordenar, setOrdenar] = useState('Mais Recentes');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search') || '';

  const { user } = useUser();
  console.log("TESTE", foruns);
  const navigate = useNavigate();

  const fetchForuns = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await list_conteudos_partilhado(ordenar, searchTerm);

      setForuns(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao carregar fóruns:", err);
      setError("Erro ao carregar fóruns. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }, [ordenar, searchTerm]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchForuns();
  }, [fetchForuns]);

  const handleParticiparClick = (id) => {
    const selectForum = foruns.find(f => f.id_conteudos_partilhado === id);
    navigate(`/forum/${id}`, { state: { forum: selectForum } });
  };

  const renderForumCard = (forum) => {
    const topico = forum.id_topico_topico || {};
    const area = topico.id_area_area || {};
    const dataCriacao = forum.data_criacao_cp
      ? new Date(forum.data_criacao_cp).toLocaleDateString()
      : "Data desconhecida";

    return (
      <div key={`forum-${forum.id_conteudos_partilhado}`} className="col">
        <div className="card shadow-sm rounded-4 h-100">
          <div className="d-flex flex-column flex-sm-row">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(topico.nome_topico || 'F')}&background=random&bold=true`}
              alt={`Imagem do fórum ${topico.nome_topico}`}
              className="rounded-start-4 img-fluid"
              style={{
                width: '100%',
                maxWidth: '120px',
                height: '100%',
                objectFit: 'cover',
                flexShrink: 0,
              }}
            />
            <div className="card-body d-flex flex-column justify-content-between p-3">
              <div>
                <h6 className="mb-3">{topico.nome_topico || 'Tópico desconhecido'}</h6>
                <p className="card-text small text-truncate" title={topico.descricao_top}>
                  {topico.descricao_top || 'Sem descrição'}
                </p>
                <div className="d-flex flex-wrap gap-2 small text-muted">
                  <div>Criado em: {dataCriacao}</div>
                  <div>Categoria: {topico.id_area_area.id_categoria_categorium.nome_cat || 'Desconhecida'}</div>
                  <div>Área: {topico.id_area_area.nome_area || 'Desconhecida'}</div>
                </div>
              </div>
              <div className="text-end mt-2">
                <button
                  className="btn btn-sm btn-primary"
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

  const HandleCreatePedido = async () => {
    const result = await Swal.fire({
      title: 'Pedido de novo tópico',
      html: `
        <label for="topico" class="form-label">Nome do tópico</label>
        <input id="topico" class="form-control" placeholder="Insira o nome do tópico">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Submeter Pedido',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'btn btn-success me-2',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
      preConfirm: () => {
        const topico = document.getElementById('topico').value.trim();
        if (!topico) {
          Swal.showValidationMessage('O nome do tópico é obrigatório');
          return;
        }
        return topico;
      }
    })
    if (result.isConfirmed && result.value) {
      try {
        const topico = result.value;
        await create_pedido_forum({ novo_forum: topico, id_formando: user.id_utilizador });
        Swal.fire({
          icon: 'success',
          title: 'Pedido submetido com sucesso!',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (error) {
        console.log('Erro ao criar pedido');
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível enviar o pedido.',
          confirmButtonText: 'Fechar'
        });
      }
    }
  }

  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-3">

        <div className="d-flex align-items-center gap-4 w-50">
          <h1 className="mb-0">Fóruns</h1>
          {activeRole != 'admin' && (
            <button onClick={HandleCreatePedido} className="btn btn-primary d-flex align-items-center gap-2">
              <LuCircleFadingPlus />
              Pedir novo forúm
            </button>
          )}
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
      ) : foruns.length === 0 ? (
        <div className="alert alert-info text-center">Nenhum fórum encontrado com a pesquisa atual.</div>
      ) : (
        <div className="row row-cols-1 g-4">
          {foruns.map(renderForumCard)}
        </div>
      )}
    </div>
  );
};

export default Foruns;
