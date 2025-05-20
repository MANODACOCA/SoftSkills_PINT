import './CardHighlight.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { formatDayMonthYear } from '../../components/shared_functions/FunctionsUtils';
import { FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';
import { BiSolidHeart } from 'react-icons/bi';

const FeaturedCourseCard = ({
  course,
  showDescription = true,
  showFormador = true,
  customMessage = null,
  variant = '',
  onRemoveFavorite = null, }) => {
  const navigate = useNavigate();

  if (!course) return null;

  const goToCourse = () => {
    navigate(`/curso/${course.id_curso}`);
  };

  const nameFormador = course.nome_formador || "Formador";
  const imageFormador = course.imagem_utilizador && course.imagem_utilizador.trim() !== ''
    ? course.imagem_utilizador
    : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(nameFormador)}`;

//CARD PARA CURSOS FAVORITOS
  if (variant === 'favorite') {
    const today = new Date();
    const endDate = new Date(course.data_fim_curso);
    const isFinished = today > endDate;

    const handleRemoveFavorite = () => {
      if (onRemoveFavorite) {
        onRemoveFavorite(course.id_curso);
      }
    };

    return (
      <div className="card flex-row rounded-4 card-highlight favorite-card position-relative">
        <img
          src={course.imagem}
          className="rounded-start-4 highlight-image"
          alt="imagem curso"
        />

        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h4 className="card-title mb-0">{course.nome_curso}</h4>
              <span className="badge bg-secondary">
                {course.tipo === 'sincrono' ? 'Síncrono' : 'Assíncrono'}
              </span>
            </div>

            <p className="card-text text-muted mb-2 fs-6 d-flex align-items-center">
              <FaCalendarAlt className="me-2" />
              {formatDayMonthYear(course.data_inicio_curso)} - {formatDayMonthYear(course.data_fim_curso)}
            </p>

            <div className="d-flex justify-content-between align-items-center">
              <p className="mb-0 fw-bold text-muted">
                {isFinished ? 'Terminado' : 'Em curso'}
              </p>
              <button
                className="btn btn-primary rounded-4 px-4"
                onClick={goToCourse}
              >
                Ver Curso
              </button>
            </div>
          </div>
        </div>

        <div className="position-absolute top-0 end-0 p-3" onClick={handleRemoveFavorite}>
          <BiSolidHeart className="heart-icon"/>
        </div>
      </div>
    );
  }


//CARD PARA CURSOS TERMINADOS
  if (variant === 'evaluation') {
    const tipoBadge = course.tipo === 'sincrono' ? 'Síncrono' : 'Assíncrono';
    const notaFinal = course.nota_final ?? null;
    const concluido = course.concluido ? 'Concluído' : 'Por concluir';
    const avaliado = typeof notaFinal === 'number';

    return (
      <div className="card flex-row rounded-4 card-highlight evaluation-card">
        <img src={course.imagem} className="rounded-start-4 highlight-image" alt="imagem curso"/>

        <div className="card-body d-flex flex-column justify-content-between w-100">
          <div className="d-flex justify-content-between align-items-start">
            <h4 className="card-title mb-2">{course.nome_curso}</h4>
              <span className="badge rounded-pill px-3 py-2 no-pointer custom-badge">
                {tipoBadge}
              </span>
          </div>

          <div className="d-flex justify-content-between align-items-center text-muted mb-2">
            <p className="mb-0">
              <FaCalendarAlt className="me-2" />
              {formatDayMonthYear(course.data_inicio_curso)} - {formatDayMonthYear(course.data_fim_curso)}
            </p>
            <p className={`mb-0 fw-semibold ${avaliado ? 'text-success' : 'text-warning'}`}>
              {avaliado ? 'Já avaliado' : 'Por avaliar'}
            </p>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="fw-medium">{concluido}</span>
            <span className="fw-semibold">{notaFinal !== null ? `Nota final: ${notaFinal}` : 'Sem nota'}</span>
            <button className="btn btn-primary px-4 rounded-4" onClick={goToCourse}>
              Ver Curso
            </button>
          </div>
        </div>
      </div>
    );
  }



//CARD PARA CURSOS INSCRITOS
  if (variant === 'enrolled') {
    const today = new Date();
    const endDate = new Date(course.data_fim_curso);
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const showWarning = course.tipo === 'assincrono' && diffDays <= 30 && diffDays > 0;
    const tipoBadge = course.tipo === 'sincrono' ? 'Síncrono' : 'Assíncrono';

    return (
      <div className="card flex-row rounded-4 card-highlight enrolled-card">
        <img src={course.imagem} className="rounded-start-4 highlight-image" alt="imagem curso" />
        <div className="card-body d-flex flex-column justify-content-between w-100">
        <div className="d-flex justify-content-between align-items-start">
          <h4 className="card-title mb-2">{course.nome_curso}</h4>
          <span className="badge rounded-pill px-3 py-2 no-pointer custom-badge">
            {tipoBadge}
          </span>
        </div>

        <div className="d-flex justify-content-between align-items-center text-muted mb-2">
          <p className="mb-0">
            <FaCalendarAlt className="me-2" />
            {formatDayMonthYear(course.data_inicio_curso)} - {formatDayMonthYear(course.data_fim_curso)}
          </p>
        </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <p className={`mb-0 me-auto ${showWarning ? 'text-danger d-flex align-items-center' : 'text-success'}`}>
              {showWarning ? (
                <>
                  <FaExclamationTriangle className="me-2" />
                  Curso expira em {diffDays} dias
                </>
              ) : (
                'Em curso...'
              )}
            </p>

            <button className="btn btn-primary px-4 rounded-4" onClick={goToCourse}>
              Ver Curso
            </button>
          </div>
        </div>
      </div>
    );
  }

//CARD PARA CURSOS NA HOMEPAGE
  return (
    <div className="card flex-row rounded-4 card-highlight">
      <img src={course.imagem} className="rounded-start-4 highlight-image" alt="imagem curso" />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h4 className="card-title">{course.nome_curso}</h4>
          {showDescription && (
            <p className="card-text text-muted fs-4 truncate-text">
              {course.descricao_curso || 'Sem descrição'}
            </p>
          )}
          <p className="card-text text-muted mb-0 fs-6">
            <FaCalendarAlt className="me-2" />
            {formatDayMonthYear(course.data_inicio_curso)} - {formatDayMonthYear(course.data_fim_curso)}
          </p>
          {showFormador && (course.issincrono || course.tipo === 'sincrono') && (
            <div className="d-flex align-items-center mb-2">
              <img src={imageFormador} alt="formador" className="rounded-circle me-2 avatar" />
              <span>{nameFormador}</span>
            </div>
          )}
          {customMessage && (
            <p className="text-success fw-bold">{customMessage}</p>
          )}
        </div>
        <div className="mt-2">
          <button className="btn btn-primary px-4 rounded-4" onClick={goToCourse}>Detalhes</button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourseCard;