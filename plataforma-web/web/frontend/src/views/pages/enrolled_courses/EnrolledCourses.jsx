import './EnrolledCourses.css';
import FeaturedCourseCard from '../../components/card_highlight/CardHighlight';
import { getEnrolledCourses } from '../../../api/cursos_axios';
import React, { useState, useEffect } from 'react';

const EnrolledCourses = () => {
    const [courses, setCourses] = useState([]);
    const userId = 1;

//  const ordenaFilmes = [...filmesFiltrados].sort((a, b) => {
//         if(ordem == "id") {
//             return a.id - b.id;
//         } else if (ordem == "genero") {
//             const generoA = genero.find(g => g.id == a.generoId)?.descricao || "";
//             const generoB = genero.find(g => g.id == b.generoId)?.descricao || "";
//             return generoA.localeCompare(generoB);
//         } else if (ordem == "titulo_asc") {
//             return a.titulo.localeCompare(b.titulo);
//         } else if (ordem == "titulo_desc") {
//             return b.titulo.localeCompare(a.titulo);
//         }
//         return 0;
//     })

    const fetchEnrolledCourses = async () => {
        try{
            const data = await getEnrolledCourses(userId);
            setCourses(data);
        }catch(error){
            console.error('Erro ao encontrar cursos inscritos:', error);
        }
    }; 

    useEffect(() => {
        fetchEnrolledCourses();
    }, []);

  return (
// <div className="d-flex align-items-center gap-3">
//                     <select name="" id="" className="form-select w-100" value={ordem} onChange={(e) => setOrdem(e.target.value)}>
//                         <option value="" disabled hidden>Ordenar</option>
//                         <option value="id">ID</option>
//                         <option value="genero">Genero</option>
//                         <option value="titulo_asc">Titulo a-z</option>
//                         <option value="titulo_desc">Titulo z-a</option>
//                     </select>
//                 </div>
    <div className="enrolled-courses">
      <h1>Cursos Inscritos</h1>
      {courses.length === 0 ? (
        <p>Você não está inscrito em nenhum curso atualmente.</p>
      ) : (
        <div className="course-list">
          {courses.map((course) => (
            <FeaturedCourseCard 
              key={`${userId}-${course.id_curso_curso.id_curso}`} 
              course={course.id_curso_curso} 
              showDescription={false} 
              showFormador={false} 
              customMessage="Em curso..." 
              imagem={course.id_curso_curso.imagem}
              variant="enrolled"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;