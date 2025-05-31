import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCursosDisponiveisParaInscricao } from '../../../api/cursos_axios';
import { formatDayMonthYear } from '../../components/shared_functions/FunctionsUtils';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Card from '../../components/card/Card';
import FilterMenu from "../../components/filter_menu/filter_menu";

const CursosPage = () => {
  const [showExplorarMenu, setShowExplorarMenu] = useState(false);
  const [courses, setCourses] = useState([]);
  const [tipologia, setTipologia] = useState('todos');

  const fetchCursosDisponiveisInscricao = async () => {
    try {
      const cursosDisponiveis = await getCursosDisponiveisParaInscricao();
      setCourses(cursosDisponiveis);
    } catch (error) {
      console.error('Erro ao encontrar cursos disponiveis para inscricao:', error);
    }
  }

  useEffect(() => {
    fetchCursosDisponiveisInscricao();
  }, []);


  return (
    <div className="enrolled-courses">
      <div className='d-flex align-items-center justify-content-between mb-3'>
        <div className="d-flex align-items-center gap-5">
          <h1 className='mb-0'>Cursos</h1>
          <div className="position-relative" onMouseEnter={() => setShowExplorarMenu(true)} onMouseLeave={() => setShowExplorarMenu(false)}>
            <button className="btn btn-primary">
              Explorar
            </button>
            {showExplorarMenu && (
              <div className="position-absolute">
                <FilterMenu />
              </div>
            )}
          </div>
        </div>

        <select className='form-select w-auto' value={tipologia}
          onChange={(e) => setTipologia(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="sincrono">Síncrono</option>
          <option value="assincrono">Assíncrono</option>
        </select>
      </div>
        <div className="row g-3">
          {courses.map((course) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-1" key={course.id_curso}>
              <Card
                courseId={course.id_curso}
                image={course.imagem}
                title={course.nome_curso}
                type={course.isassincrono ? 'Assíncrono' : course.issincrono ? 'Síncrono' : 'Outro'}
                startDate={formatDayMonthYear(course.data_inicio_curso)}
                endDate={formatDayMonthYear(course.data_fim_curso)}
                membrosAtual={course.contador_formandos}
                membrosMax={course.issincrono ? course.sincrono?.numero_vagas : null}
              />
            </div>
          ))}
        </div>
      </div>
  );
};

export default CursosPage;