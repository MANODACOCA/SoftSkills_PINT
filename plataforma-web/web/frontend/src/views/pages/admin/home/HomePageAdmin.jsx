import { Link } from 'react-router-dom';
import './HomePage.css';
import { useEffect, useState } from 'react';
import { cursos_contagem } from '../../../../api/cursos_axios';
import { denuncias_contagem } from '../../../../api/denuncia_axios';
import { forum_contagem } from '../../../../api/conteudos_partilhado_axios';
import { utilizadores_contagem } from '../../../../api/utilizador_axios';
import SpinnerBorder from '../../../components/spinner-border/spinner-border';

const HomePageAdmin = () => {
  const [totalCurso, setTotalCurso] = useState(null);
  const [totalForum, setTotalForum] = useState(null);
  const [totalQueixas, setTotalQueixas] = useState(null);
  const [totalUtilizadores, setTotalUtilizadores] = useState(null);
  const [loading, setLoading] = useState(true);

  const countCursos = async () => {
    try {
      setLoading(true);
      const response = await cursos_contagem();
      setTotalCurso(response);
    } catch (error) {
      console.log('Erro ao calcular numero cursos!');
    }
  }

  const countQueixas = async () => {
    try {
      const response = await denuncias_contagem();
      setTotalQueixas(response);
    } catch (error) {
      console.log('Erro ao calcular numero de queixas!');
    }
  }

  const countForum = async () => {
    try {
      const response = await forum_contagem();
      setTotalForum(response);
    } catch (error) {
      console.log('Erro ao calcular numero de forum!');
    }
  }

  const countUtilizadores = async () => {
    try {
      const response = await utilizadores_contagem();
      setTotalUtilizadores(response);
    } catch (error) {
      console.log('Erro ao caulcular o numero de utilizadores');
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    countCursos();
    countForum();
    countQueixas();
    countUtilizadores();
  }, [])

  return (
    <>
      {loading ? (
        <SpinnerBorder />
      ) : (
        <div className="container py-4">
          <div className="row g-3">
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <Link to="/admin/cursos" className="text-decoration-none text-white">
                <div className="card-stat card-cursos shadow rounded-4 p-4 text-white text-start">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h6 className="fw-semibold text-uppercase opacity-75 text-white">Gestão de</h6>
                      <h3 className="fw-bold">Cursos</h3>
                    </div>
                    <i className="bi bi-book"></i>
                  </div>
                  <p className="mb-0 opacity-75">Cursos {totalCurso}</p>
                </div>
              </Link>
            </div>

            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <Link to="/admin/utilizadores" className="text-decoration-none text-white">
                <div className="card-stat card-utilizadores shadow rounded-4 p-4 text-white text-start">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h6 className="fw-semibold text-uppercase opacity-75 text-white">Gestão de</h6>
                      <h3 className="fw-bold">Utilizadores</h3>
                    </div>
                    <i className="bi bi-person"></i>
                  </div>
                  <p className="mb-0 opacity-75">Utilizadores {totalUtilizadores}</p>
                </div>
              </Link>
            </div>

            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <Link to="/admin/gerirforum" className="text-decoration-none text-white">
                <div className="card-stat card-forum shadow rounded-4 p-4 text-white text-start">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h6 className="fw-semibold text-uppercase opacity-75 text-white">Gestão de</h6>
                      <h3 className="fw-bold">Fórum</h3>
                    </div>
                    <i className="bi bi-chat-dots"></i>
                  </div>
                  <p className="mb-0 opacity-75">Nº Tópicos {totalForum}</p>
                </div>
              </Link>
            </div>

            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <Link to="/admin/queixas" className="text-decoration-none text-white">
                <div className="card-stat card-queixas shadow rounded-4 p-4 text-white text-start">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h6 className="fw-semibold text-uppercase opacity-75 text-white">Gestão de</h6>
                      <h3 className="fw-bold">Queixas</h3>
                    </div>
                    <i className="bi bi-megaphone"></i>
                  </div>
                  <p className="mb-0 opacity-75">Nº Queixas {totalQueixas}</p>
                </div>
              </Link>
            </div>

            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <Link to="/admin/categorias" className="text-decoration-none text-white">
                <div className="card-stat card-categoria shadow rounded-4 p-4 text-white text-start">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h6 className="fw-semibold text-uppercase opacity-75 text-white">Gestão de</h6>
                      <h3 className="fw-bold">Categoria/Área/Tópico</h3>
                    </div>
                    <i className="bi bi-tag"></i>
                  </div>
                  <p className="mb-0 opacity-75">Nº Categorias {totalQueixas}</p>
                </div>
              </Link>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default HomePageAdmin;
