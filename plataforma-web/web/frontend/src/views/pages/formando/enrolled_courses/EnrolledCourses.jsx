import './EnrolledCourses.css';
import FeaturedCourseCard from '../../../components/card_highlight/CardHighlight';
import SpinnerBorder from '../../../components/spinner-border/spinner-border';
import { getEnrolledCourses } from '../../../../api/cursos_axios';
import { useUser } from '../../../../utils/useUser';
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';

const EnrolledCourses = () => {
  const { user } = useUser();
  const [courses, setCourses] = useState([]);
  const [tipologia, setTipologia] = useState('todos');
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search') || '';

  const fetchEnrolledCourses = async (userId) => {
    try {
      setLoading(true);
      const data = await getEnrolledCourses(userId, tipologia, searchTerm);

      const formatted = data.map(item => {
        const curso = item.id_curso_curso || {};
        return {
          ...item,
          id_curso_curso: {
            ...curso,
            tipo: curso.issincrono ? 'sincrono' : curso.isassincrono ? 'assincrono' : 'outro'
          }
        };
      });

      setCourses(formatted);
    } catch (error) {
      console.error('Erro ao encontrar cursos inscritos:', error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id_utilizador) {
      window.scrollTo(0, 0);
      fetchEnrolledCourses(user.id_utilizador);
    }
  }, [searchTerm, tipologia, user]);

  if (!user || loading) {
    return <SpinnerBorder />;
  }

  return (
    <div className="enrolled-courses">
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h1 className='mb-0'>Cursos Inscritos</h1>
        <select className='form-select w-auto' value={tipologia}
          onChange={(e) => setTipologia(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="sincrono">Síncrono</option>
          <option value="assincrono">Assíncrono</option>
        </select>
      </div>

      {(!searchTerm && courses.length === 0) ? (
        <p>Você não está inscrito em nenhum curso atualmente.</p>
      ) : (searchTerm && courses.length === 0) ? (
        <p>Não foi encontrado nenhum curso inscrito através da sua pesquisa.</p>
      ) : (
        <div className="course-list">
          {courses.map((course) => (
            <FeaturedCourseCard
              key={`${course.id_inscricao}-${course.id_curso_curso.id_curso}`}
              course={course.id_curso_curso}
              userId={user.id_utilizador}
              showDescription={false}
              showFormador={false}
              customMessage="Em curso..."
              variant="enrolled"
            />
          ))}
        </div>
      )
      }
    </div >
  );
};

export default EnrolledCourses;
