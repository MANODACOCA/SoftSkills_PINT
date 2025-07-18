import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDayMonthYear, parseDateWithoutTimezone } from '../../components/shared_functions/FunctionsUtils';
import { FaCalendarAlt, FaExclamationTriangle, FaHourglassStart } from 'react-icons/fa';
import { BiSolidHeart } from 'react-icons/bi';
import './CardHighlight.css';

const FeaturedCourseCard = ({
  course,
  userId,
  showDescription = true,
  showFormador = true,
  customMessage = null,
  variant = '',
  onRemoveFavorite = null, }) => {
  const navigate = useNavigate();

  if (!course) return null;

  const goInscCourse = () => {
    navigate(`/cursos/${course.id_curso}`);
  };

  const goToCourse = async () => {

    const now = new Date();
    const dataInicioCurso = parseDateWithoutTimezone(course.data_inicio_curso)


    if (now >= dataInicioCurso) {
      if (location.pathname.startsWith('/my/cursos/inscritos')) {
        navigate(`/my/cursos/inscritos/curso/${course.id_curso}?tab=aulas`);
      } else if (location.pathname.startsWith('/my/cursos/terminados')) {
        navigate(`/my/cursos/terminados/curso/${course.id_curso}?tab=aulas`);
      }
    } else {
      navigate(`/cursos/${course.id_curso}`);// Caso esteja inscrito no curso mas o curso ainda nao tenha comecado
    }
  };

  const [img, setImg] = useState(course.imagem);

  const nameFormador = course.nome_formador || "Formador";

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
          src={img || `https://ui-avatars.com/api/?name=${encodeURIComponent(course.nome_curso)}&background=random&bold=true`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(course.nome_curso)}&background=random&bold=true`;
          }}
          alt="Foto do curso"
          className='rounded-start-4 highlight-image'
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
          <BiSolidHeart className="heart-icon" />
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
        <img
          src={img || `https://ui-avatars.com/api/?name=${encodeURIComponent(course.nome_curso)}&background=random&bold=true`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(course.nome_curso)}&background=random&bold=true`;
          }}
          alt="Foto do curso"
          className='rounded-start-4 highlight-image'
        />
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
            {course.tipo === 'sincrono' &&
              <p className={`mb-0 fw-semibold ${avaliado ? 'text-success' : 'text-warning'}`}>
                {avaliado ? 'Já avaliado' : 'Por avaliar'}
              </p>
            }
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="fw-medium text-success">{concluido}</span>
            {course.tipo === 'sincrono' &&
              <span className="fw-semibold">{notaFinal !== null ? `Nota final: ${notaFinal}` : 'Sem nota'}</span>
            }
            {course.tipo === 'sincrono' && (
              <button className="btn btn-primary px-4 rounded-4" onClick={goToCourse}>
                Ver Curso
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }



  //CARD PARA CURSOS INSCRITOS 
  if (variant === 'enrolled') {
    const today = new Date();
    const endDate = new Date(course.data_fim_curso);
    const startDate = new Date(course.data_inicio_curso);
    endDate.setHours(23, 59, 59, 999);
    startDate.setHours(23, 59, 59, 999);

    /*     CALCULO PARA FIM DE CURSO */
    const diffTimeEnd = endDate.getTime() - today.getTime();

    const diffDaysEnd = Math.floor(diffTimeEnd / (1000 * 60 * 60 * 24));
    const diffHoursEnd = Math.floor((diffTimeEnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutesEnd = Math.floor((diffTimeEnd % (1000 * 60 * 60 * 24)) / (1000 * 60));

    const showWarningEnd = diffTimeEnd > 0 && diffTimeEnd <= 15 * 24 * 60 * 60 * 1000 && today >= startDate;//se faltarem 15 dias ao menos para terminar o curso
    /*     CALCULO PARA FIM DE CURSO */

    /*     CALCULO PARA INICIO DE CURSO */
    const diffTimeStart = startDate.getTime() - today.getTime();

    const diffDaysStart = Math.floor(diffTimeStart / (1000 * 60 * 60 * 24));
    const diffHoursStart = Math.floor((diffTimeStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutesStart = Math.floor((diffTimeStart % (1000 * 60 * 60 * 24)) / (1000 * 60));

    const showWarningStart = diffTimeStart > 0 && diffTimeStart <= 5 * 24 * 60 * 60 * 1000 && today < startDate;//se faltarem 5 dias ao menos para comecar o curso
    /*     CALCULO PARA INICIO DE CURSO */

    const tipoBadge = course.tipo === 'sincrono' ? 'Síncrono' : 'Assíncrono';

    return (
      <div className="card flex-row rounded-4 card-highlight enrolled-card">
        <img
          src={img || `https://ui-avatars.com/api/?name=${encodeURIComponent(course.nome_curso)}&background=random&bold=true`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(course.nome_curso)}&background=random&bold=true`;
          }}
          alt="Foto do curso"
          className='rounded-start-4 highlight-image'
        />
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
            <p className={`mb-0 me-auto ${showWarningEnd ? 'text-danger d-flex align-items-center' : 'text-success'}`}>
              {showWarningEnd ? (
                <>
                  <FaExclamationTriangle className="me-2" />
                  Curso termina em {diffDaysEnd !== 0 && `${diffDaysEnd}d`} {/* //dias */}
                  {diffHoursEnd !== 0 && `${diffHoursEnd}h`} {/* //horas */}
                  {diffMinutesEnd !== 0 && diffHoursEnd === 0 && diffDaysEnd === 0 && `${diffMinutesEnd}m`} {/* //minutos */}
                  {diffMinutesEnd === 0 && diffHoursEnd === 0 && diffDaysEnd === 0 && `poucos segundos`} {/* //segundos */}
                </>
              ) : showWarningStart ? (
                <>
                  <FaHourglassStart className="me-2" />
                  Curso começa em {diffDaysStart !== 0 && `${diffDaysStart}d`} {/* //dias */}
                  {diffHoursStart !== 0 && `${diffHoursStart}h`} {/* //horas */}
                  {diffMinutesStart !== 0 && diffHoursStart === 0 && diffDaysStart === 0 && `${diffMinutesStart}m`} {/* //minutos */}
                  {diffMinutesStart === 0 && diffHoursStart === 0 && diffDaysStart === 0 && `poucos segundos`} {/* //segundos */}
                </>
              ) : diffTimeStart < 0 ? (
                'Em curso...'
              ) : (
                ' '
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
      <img
        src={img || `https://ui-avatars.com/api/?name=${encodeURIComponent(course.nome_curso)}&background=random&bold=true`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(course.nome_curso)}&background=random&bold=true`;
        }}
        alt="Foto do curso"
        className='rounded-start-4 highlight-image'
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h4 className="card-title">{course.nome_curso}</h4>
          {showDescription && (
            <p className="card-text text-muted fs-4 truncate-text">
              {course.descricao_curso || 'Sem descrição'}
            </p>
          )}
          <div className='d-flex justify-content-between align-items-center my-0'>
            <div className="d-flex align-items-center gap-2">
              <p className="card-text text-muted">
                <FaCalendarAlt className='me-2' />
                {formatDayMonthYear(course.data_inicio_curso)} - {formatDayMonthYear(course.data_fim_curso)}
              </p>
            </div>
            {showFormador && (course.issincrono || course.tipo === 'sincrono') && (
              <div className="d-flex align-items-center gap-2">
                <span>Formador: {course.sincrono?.id_formador_formadore?.id_formador_utilizador?.nome_util}</span>
                <img
                  src={course.sincrono?.id_formador_formadore?.id_formador_utilizador?.img_perfil || "invalid-image"}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(course.sincrono?.id_formador_formadore?.id_formador_utilizador?.nome_util)}&background=random&bold=true`;
                  }}
                  alt="Foto do formador"
                  className='rounded-circle me-2 avatar'
                />
              </div>
            )}
          </div>

          {customMessage && (
            <p className="text-success fw-bold">{customMessage}</p>
          )}
        </div>
        <div className="mt-2">
          <button className="btn btn-primary rounded-4" onClick={goInscCourse}>Detalhes</button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourseCard;