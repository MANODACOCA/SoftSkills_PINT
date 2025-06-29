import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDayMonthYear } from '../../components/shared_functions/FunctionsUtils';
import { FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';
import { BiSolidHeart } from 'react-icons/bi';
import { verificar_acesso_curso } from '../../../api/cursos_axios';
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

  const goToCourse = async () => {
    const verificacao = await verificar_acesso_curso(userId, course.id_curso);//verifica se o formando tem acesso ao curso

    const now = new Date();
    const dataInicioCurso = new Date(course.data_inicio_curso);

    if (verificacao.inscrito) {
      if (now >= dataInicioCurso) {
        if (location.pathname.startsWith('/my/cursos/inscritos')) {
          navigate(`/my/cursos/inscritos/curso/${course.id_curso}?tab=aulas`);
        } else if (location.pathname.startsWith('/my/cursos/terminados')) {
          navigate(`/my/cursos/terminados/curso/${course.id_curso}?tab=aulas`);
        }
      } else {
        navigate(`/cursos/${course.id_curso}`);// Caso esteja inscrito no curso mas o curso ainda nao tenha comecado
      }
    }
  };

  const [img, setImg] = useState(course.imagem);
  const handleError = () => {
    const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&background=random&bold=true`;
    setImg(fallback);
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
          src={img ? img : `https://ui-avatars.com/api/?name=${encodeURIComponent(course.nome_curso)}&background=random&bold=true`}
          className="rounded-start-4 highlight-image"
          alt="imagem curso"
          onError={handleError}
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
          src={img ? img : `https://ui-avatars.com/api/?name=${encodeURIComponent(course.nome_curso)}&background=random&bold=true`}
          className="rounded-start-4 highlight-image"
          alt="imagem curso"
          onError={handleError}
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
    endDate.setHours(23, 59, 59, 999);

    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes= Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60));

    const showWarning = course.tipo === 'assincrono' && diffTime > 0 && diffTime <= 15 * 24 * 60 * 60 * 1000;
    const tipoBadge = course.tipo === 'sincrono' ? 'Síncrono' : 'Assíncrono';

    return (
      <div className="card flex-row rounded-4 card-highlight enrolled-card">
        <img
          src={img ? img : `https://ui-avatars.com/api/?name=${encodeURIComponent(course.nome_curso)}&background=random&bold=true`}
          className="rounded-start-4 highlight-image"
          alt="imagem curso"
          onError={handleError}
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
            <p className={`mb-0 me-auto ${showWarning ? 'text-danger d-flex align-items-center' : 'text-success'}`}>
              {showWarning ? (
                <>
                  <FaExclamationTriangle className="me-2" />
                  Curso expira em {diffDays !== 0 && `${diffDays}d`} {/* //dias */}
                                  {diffHours !== 0 && `${diffHours}h`} {/* //horas */}
                                  {diffMinutes !==0 && diffHours === 0 && diffDays === 0 && `${diffMinutes}m`} {/* //minutos */}
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
     <img
          src={img ? img : `https://ui-avatars.com/api/?name=${encodeURIComponent(course.nome_curso)}&background=random&bold=true`}
          className="rounded-start-4 highlight-image"
          alt="imagem curso"
          onError={handleError}
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
                  src={course.sincrono?.id_formador_formadore?.id_formador_utilizador?.img_perfi}
                  alt="formador"
                  className="rounded-circle me-2 avatar"
                />
              </div>
            )}
          </div>

          {customMessage && (
            <p className="text-success fw-bold">{customMessage}</p>
          )}
        </div>
        <div className="mt-2">
          <button className="btn btn-primary rounded-4" onClick={goToCourse}>Detalhes</button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourseCard;