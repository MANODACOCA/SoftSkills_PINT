//Card de destaque que vai ficar na homepage
import './CardHighlight.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { formatDayMonthYear } from '../../components/shared_functions/FunctionsUtils';
import { FaCalendarAlt } from 'react-icons/fa';


const FeaturedCourseCard = ({ course }) => {
  const navigate = useNavigate();

  if (!course) return null;

  const goToCourse = () => {
    navigate(`/curso/${course.id_curso}`);
  };

  const nameFormador = course.nome_formador || "Formador";
  const imageFormador = course.imagem_utilizador || `https://api.dicebear.com/7.x/initials/svg?seed=${nameFormador}`;

  return (
    <div className="card flex-row rounded-4 card-highlight">
      <img src={course.imagem} className="rounded-4 highlight-image" alt="imagem curso" />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h4 className="card-title">{course.nome_curso}</h4>
          <p className="card-text text-muted fs-4 truncate-text">
            {course.descricao_curso || 'Sem descrição'}</p>
          <p className="card-text text-muted mb-0 fs-6">
            <FaCalendarAlt className="me-2" />
            {formatDayMonthYear(course.data_inicio_curso)} - {formatDayMonthYear(course.data_fim_curso)}
          </p>
          {course.tipo === 'sincrono' && (
            <div className="d-flex align-items-center mb-2">
              <img src={imageFormador} alt="instrutor" className="rounded-circle me-2 avatar" />
              <span>{nameFormador}</span>
            </div>
          )}
        </div>
        <div className="mt-2">
          <button className="btn btn-primary px-4 rounded-4" onClick={goToCourse} >Detalhes</button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourseCard;