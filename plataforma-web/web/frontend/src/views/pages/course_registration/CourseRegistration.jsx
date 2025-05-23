import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { get_cursos, list_cursos } from '../../../api/cursos_axios';
import EnrollmentCard from '../../components/card_registration/CardRegistration';
import CourseModule from '../../components/course_module/CourseModule';
import ScrollableSection from '../../components/scrollable_section/ScrollableSection';
import { formatDayMonthYear } from '../../components/shared_functions/FunctionsUtils';
import {FaVideo, FaUsers, FaCalendarAlt} from 'react-icons/fa';
import './CourseRegistration.css';

const CourseRegistration = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = React.useRef(null);
  const [isSticky, setIsSticky] = useState(true);
  const sentinelRef = React.useRef(null);

const courseModules = [
  {
    id: 1,
    title: "Introdução ao Curso",
    description: "Visão geral dos objetivos e estrutura do curso.",
    aulas: [
      { id: 1, titulo: "Apresentação do curso", duracao: "45 min", tipo: "video" },
      { id: 2, titulo: "Objetivos de aprendizagem", duracao: "", tipo: "documento" },
      { id: 3, titulo: "Pré-requisitos", duracao: "20 min", tipo: "quiz" }
    ]
  },
  {
    id: 2,
    title: "Fundamentos Básicos",
    description: "Conceitos fundamentais necessários para o curso.",
    aulas: [
      { id: 4, titulo: "Conceitos principais", duracao: "1h 15min", tipo: "video" },
      { id: 5, titulo: "Terminologia", duracao: "", tipo: "documento" },
      { id: 6, titulo: "Ferramentas necessárias", duracao: "35 min", tipo: "video" }
    ]
  },
  {
    id: 3,
    title: "Aplicações Práticas",
    description: "Aplicação dos conceitos em cenários reais.",
    aulas: [
      { id: 7, titulo: "Estudos de caso", duracao: "1h 30min", tipo: "video" },
      { id: 8, titulo: "Exercícios práticos", duracao: "", tipo: "documento" },
      { id: 9, titulo: "Projetos", duracao: "50 min", tipo: "quiz" }
    ]
  }
];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 1.0,
        rootMargin: "-100px 0px 0px 0px",
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
  }, []);


  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const courseData = await get_cursos(id);
        setCourse(courseData);


        const allCourses = await list_cursos();
        const filtered = allCourses.filter(c =>
          c.id_curso !== parseInt(id) &&
          ((courseData.issincrono && c.issincrono) ||
            (courseData.isassincrono && c.isassincrono))
        ).slice(0, 10);

        setRelatedCourses(filtered);
      } catch (error) {
        console.error('Erro ao carregar dados do curso:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourseData();
    }
  }, [id]);

  const handleEnroll = async (courseId) => {
    try {

      console.log(`Inscrição no curso ${courseId}`);
      alert('Inscrição realizada com sucesso!');

    } catch (error) {
      console.error('Erro ao realizar inscrição:', error);
      alert('Ocorreu um erro ao processar a inscrição.');
    }
  };

  const handleScrollSection = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  if (loading) return <div className="">A carregar detalhes do curso...</div>;
  if (!course) return <div className="">Curso não encontrado</div>;

  return (
    <div className="px-3">
      <div className="row">
        {/* Coluna Esquerda */}
        <div className="col-md-8">
          <div className="course-header">
            <h1 className="course-title">{course.nome_curso}</h1>

            <div className="course-info">
              <div className="info-item">
                <FaVideo className="info-icon me-2 fs-3" />
                <span className="info-text fw-bold">Tipologia: {course.issincrono ? 'Síncrono' : course.isassincrono ? 'Assíncrono' : 'Outro'}</span>
              </div>
              <div className="info-item justify-content-align-itens-center">
                <FaUsers className="info-icon me-2 fs-3" />
                <span className="info-text fw-bold ">Vagas: {course.contador_formandos} / {course.numero_vagas}</span>
              </div>
              <div className="info-item">
                <FaCalendarAlt className="info-icon me-2 fs-3" />
                <span className="info-text fw-bold">
                  Inscrições: {formatDayMonthYear(course.data_inicio_inscricao)} - {formatDayMonthYear(course.data_fim_inscricao)}
                </span>
              </div>
            </div>
          </div>

          <h2>Descrição</h2>
          <p>{course.descricao_curso || "Sem descrição disponível para este curso."}</p>

          <h2 className="mt-5">Conteúdo</h2>
          {courseModules.map((module, index) => (
            <CourseModule key={index} module={module} index={index} />
          ))}

          <h2 className="mt-5">Formador</h2>
          <div className="d-flex align-items-center mt-3 gap-3">
            <img
              src={course.formador?.imagem_utilizador || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(course.formador?.nome_formador || 'Formador')}`}
              alt="Foto do formador"
              className="rounded-circle"
              width="80"
              height="80"
            />
            <div>
              <h5 className="mb-1">{course.formador?.nome_formador || "Formador não especificado"}</h5>
              <p className="mb-0 text-muted">{course.formador?.email_formador || ""}</p>
              {course.formador?.descricao_formador && (
                <p className="mt-2">{course.formador.descricao_formador}</p>
              )}
            </div>
          </div>
        </div>

        {/* Coluna Direita - Card Sticky */}
        <div className="col-md-4">
          <div className={isSticky ? "sticky-card" : ""}>
            <EnrollmentCard
              course={course}
              onEnroll={() => handleEnroll(course.id_curso)}
            />
          </div>
        </div>
      </div>

      {/* Row para os cursos de interesse apos formador e card */}
      <div className="row mt-5">
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
