import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import EnrollmentCard from '../../../components/card_registration/CardRegistration';
import CourseModule from '../../../components/course_module/CourseModule';
import ScrollableSection from '../../../components/scrollable_section/ScrollableSection';
import { formatDayMonthYear } from '../../../components/shared_functions/FunctionsUtils';
import { FaVideo, FaUsers, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import { getCursosDisponiveisParaInscricao } from '../../../../api/cursos_axios';
import SpinnerBorder from '../../../components/spinner-border/spinner-border'
import './CourseRegistration.css';

const CourseRegistration = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const scrollRef = React.useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = React.useRef(null);
  const [loading, setLoading] = useState(true);
  const [inscrito, setInscrito] = useState(false);

  const handleInscrito = (valor) => {
    setInscrito(valor);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px 0px 0px",
      }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [id]);

  const atualizarContadorFormandos = () => {
    setCourse(prev => ({
      ...prev,
      contador_formandos: (prev?.contador_formandos || 0) + 1
    }));
  };

  const fetchCourseData = async (courseId) => {
    try {
      setLoading(true);
      const cursosDetalhados = await getCursosDisponiveisParaInscricao("todos", courseId);

      if (cursosDetalhados.length === 0) {
        throw new Error("Curso não encontrado ou não disponível para inscrição");
      }

      const courseData = cursosDetalhados[0];
      setCourse(courseData);

      const tipo = courseData.issincrono ? "sincrono" : "assincrono";
      const cursosRelacionados = await getCursosDisponiveisParaInscricao(tipo);

      const filtered = cursosRelacionados
        .filter(c => c.id_curso !== parseInt(courseId))
        .slice(0, 8);

      setRelatedCourses(filtered);
    } catch (error) {
      console.error('Erro ao carregar dados do curso:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCourseData(id);
    }
  }, [id, course?.contador_formandos]);


  const handleEnroll = async (courseId) => {
    try {

      console.log(`Inscrição no curso ${courseId}`);
      alert('Inscrição realizada com sucesso!');

    } catch (error) {
      console.error('Erro ao realizar inscrição:', error);
      alert('Ocorreu um erro ao processar a inscrição.');
    }
  };

  if (!course || loading) {
    return <SpinnerBorder />;
  }

  if (!course) return <div className="">Curso não encontrado</div>;

  return (
    <div className="px-3">
      {inscrito && (
        <div className="alert alert-info text-center"><FaInfoCircle /> Este curso ainda não começou. Assim que for iniciado, você poderá acessá-lo <Link to="/my/cursos/inscritos">aqui</Link>!</div>
      )}
      {/* Header com fundo azul de largura completa */}
      <div className="row bg-custom-light rounded-4">
        <div className="col-md-8">
          <h1 className="fs-2 fw-bold text-break w-100">{course.nome_curso}</h1>
          <div className="d-flex flex-column flex-md-row gap-3 mt-3">
            <div className="d-flex align-items-center flex-md-row">
              <FaVideo className="text-primary me-2 fs-4" />
              <span className="fw-bold">Tipologia: {course.issincrono ? 'Síncrono' : course.isassincrono ? 'Assíncrono' : 'Outro'}</span>
            </div>
            {course.issincrono === true && (
              <div className="d-flex align-items-center">
                <FaUsers className="text-primary me-2 fs-4" />
                <span className="fw-bold">Vagas: {course.contador_formandos} / {course.issincrono ? course.sincrono?.numero_vagas : null}</span>
              </div>
            )}
            <div className="d-flex align-items-center">
              <FaCalendarAlt className="text-primary me-2 fs-4" />
              <span className="fw-bold">
                Inscrições: {formatDayMonthYear(course.data_inicio_inscricao)} - {formatDayMonthYear(course.data_fim_inscricao)}
              </span>
            </div>
          </div>
        </div>

        {/* O espaço da coluna direita também faz parte do header com fundo azul */}
        <div className="col-md-4"></div>
      </div>

      {/* Conteúdo principal - mantém a estrutura de 8+4 colunas */}
      <div className="row">
        {/* Coluna Esquerda - conteúdo */}
        <div className="col-md-8 mt-4">
          <h2>Descrição</h2>
          <p>{course.descricao_curso || "Sem descrição disponível para este curso."}</p>

          {course.isassincrono && (
            <>
              <h2 className="mt-4">Aulas</h2>
              {course.aulas && course.aulas.length > 0 ? course.aulas.map((aula, index) => (
                <CourseModule
                  key={aula.id_aula}
                  module={{
                    title: aula.nome_aula,
                    tempo_duracao: aula.tempo_duracao,
                    aulas: aula.conteudos.map(c => ({
                      id: c.id_conteudo,
                      titulo: c.nome_conteudo,
                      tipo: c.id_formato
                    }))
                  }}
                  index={index}
                  cursoTipo={course.issincrono ? 'sincrono' : 'assincrono'}
                />
              )) : "Sem aulas disponíveis para este curso."}
            </>
          )}

          {/* Seção de Formador - apenas para cursos síncronos */}
          {course.issincrono && course.sincrono && (
            <>
              <h2 className="mt-5">Formador</h2>
              <div className="d-flex align-items-center mt-3 gap-3">
                <img
                  src={course.sincrono.id_formador_formadore?.id_formador_utilizador.img_perfi || "invalid-image"}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(course.sincrono?.id_formador_formadore?.id_formador_utilizador?.nome_util)}&background=random&bold=true`;
                  }}
                  alt="Foto do formador"
                  className='rounded-circle'
                  width="80"
                  height="80"
                />
                <div>
                  <h5 className="mb-1">{course.sincrono.id_formador_formadore?.id_formador_utilizador?.nome_util || "Formador não especificado"}</h5>
                  <p className="mb-0 text-muted">{course.sincrono.id_formador_formadore?.email_formador || ""}</p>
                  {course.sincrono.id_formador_formadore?.descricao_formador && (
                    <p className="mt-2">{course.sincrono.id_formador_formadore.descricao_formador}</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Coluna Direita - Card Sticky (sobreposto ao header) */}
        <div className="col-md-4">
          <div className="sticky-card">
            <EnrollmentCard
              course={course}
              onEnroll={() => handleEnroll(course.id_curso)}
              onContadorUpdate={atualizarContadorFormandos}
              verSeInscrito = {handleInscrito}
            />
          </div>

        </div>
      </div>

      {/* Resto do conteúdo permanece igual */}
      <div className="row mt-4">
        <div className="col-12">
          <h2 className="mb-3" ref={sentinelRef}>Cursos que podem ser do seu interesse</h2>
          {relatedCourses.length > 0 ? (
            <ScrollableSection
              title=""
              courses={relatedCourses}
              scrollRef={scrollRef}
              onScroll={(ref, direction) =>
                ref.current?.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' })}
            />
          ) : (
            <p>Não encontramos cursos relacionados.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseRegistration;
