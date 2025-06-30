import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';

const HomePageFormador = () => {
    const [cursosLecionados, setCursosLecionados] = useState(null);
    const [cursosLecionar, setCursosLecionar] = useState(null)
  

    const countCursosLecionados = async () => {
        try{

        } catch(error) {

        }
    }

    const coutCursosALecionar = async () => {
        try{

        } catch(error) {

        }
    }

    useEffect(() => {
        countCursosLecionados();
        coutCursosALecionar();
    }, [])

    return (
     <div className="container py-4">
        <h1>Bem vindo {}</h1>
      <div className="row g-4 row-cols-1 row-cols-sm-2">
            <div className="col">
            <Link state={{activeTab: 'cursosLecionadosA'}}  to="/formador/cursos" className="text-decoration-none text-white">
                <div className="card-stat card-cursos shadow rounded-4 p-4 text-white text-start">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                    <h6 className="fw-semibold text-uppercase opacity-75">
                        Cursos a
                    </h6>
                    <h3 className="fw-bold">Lecionar</h3>
                    </div>
                    <i className="bi bi-book" />
                </div>
                <p className="mb-0 opacity-75">Cursos {}</p>
                </div>
            </Link>
            </div>

            <div className="col">
            <Link state={{activeTab: 'cursosLecionadosTerm'}} to="/formador/cursos" className="text-decoration-none text-white" >
                <div className="card-stat card-utilizadores shadow rounded-4 p-4 text-white text-start">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                    <h6 className="fw-semibold text-uppercase opacity-75">
                        Cursos
                    </h6>
                    <h3 className="fw-bold">Lecionados</h3>
                    </div>
                    <i className="bi bi-book" />
                </div>
                <p className="mb-0 opacity-75">Cursos {}</p>
                </div>
            </Link>
            </div>
      </div>
    </div>
    );
};

export default HomePageFormador;