import { Link } from 'react-router-dom';
import './HomePage.css'; 
import { useEffect, useState } from 'react';
import { cursos_contagem } from '../../../../api/cursos_axios';

const HomePageAdmin = () => {
  const [totalCurso, setTotalCurso] = useState(null);

  const countCursos = async () => {
    try{
      const response = await cursos_contagem();
      setTotalCurso(response);
    } catch (error) {
      console.log('Erro ao calcular numero cursos!');
    }
  }

  useEffect(() => {
    countCursos();
  }, [])

  return (
    <div className="container py-4">
      <div className="row g-3">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Link to="/admin/cursos" className="text-decoration-none text-white">
            <div className="card-stat card-cursos shadow rounded-4 p-4 text-white text-start">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h6 className="fw-semibold text-uppercase opacity-75">Gestão de</h6>
                  <h3 className="fw-bold">Cursos</h3>
                </div>
                <i className="bi bi-graph-up"></i> 
              </div>          
              <p className="mb-0 opacity-75">Numero de cursos {totalCurso}</p>
            </div>
          </Link>
        </div>

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Link to="/admin/utilizadores" className="text-decoration-none text-white">
            <div className="card-stat card-utilizadores shadow rounded-4 p-4 text-white text-start">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h6 className="fw-semibold text-uppercase opacity-75">Gestão de</h6>
                  <h3 className="fw-bold">Utilizadores</h3>
                </div>
                <i className="bi bi-graph-up"></i> 
              </div>          
              <p className="mb-0 opacity-75">Numero de utilizadores 45%</p>
            </div>
          </Link>
        </div>

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Link to="/admin/gerirforum" className="text-decoration-none text-white">
            <div className="card-stat card-forum shadow rounded-4 p-4 text-white text-start">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h6 className="fw-semibold text-uppercase opacity-75">Gestão de</h6>
                  <h3 className="fw-bold">Fórum</h3>
                </div>
                <i className="bi bi-graph-up"></i> 
              </div>          
              <p className="mb-0 opacity-75">Numero de cursos 45%</p>
            </div>
          </Link>
        </div>

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Link to="/admin/queixas" className="text-decoration-none text-white">
            <div className="card-stat card-queixas shadow rounded-4 p-4 text-white text-start">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h6 className="fw-semibold text-uppercase opacity-75">Gestão de</h6>
                  <h3 className="fw-bold">Queixas</h3>
                </div>
                <i className="bi bi-graph-up"></i> 
              </div>          
              <p className="mb-0 opacity-75">Numero de queixas 45%</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePageAdmin;
