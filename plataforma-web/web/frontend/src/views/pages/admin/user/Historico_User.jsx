import { useEffect, useState } from "react";
import { list_utilizador } from "../../../../api/utilizador_axios";
import { getEnrolledCourses } from "../../../../api/cursos_axios";
import { useParams } from "react-router-dom";
import { Tab, Tabs } from 'react-bootstrap';

const HistoryUser = () => {
    const {id} = useParams();
    const [cursosTerminados, setCursosTerminados] = useState([]);
    const [cursosInscrito, setCursosInscrito] = useState([]);


    const fetchEnrolledCourses = async (userId) => {
        try {
          const data = await getEnrolledCourses(userId, 'todos');
    
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
          setCursosInscrito(formatted);
          console.log(formatted);
        } catch (error) {
          console.error('Erro ao encontrar cursos inscritos:', error);
          setCursosInscrito([]);
        }
    };


    const fetchCompletedCourses = async (userId) => {
        try {
            const data = await getEnrolledCourses(userId);
            setCursosTerminados(data);
            console.log(data);
        } catch (error) {
            console.error('Erro ao encontrar cursos terminados:', error);
            setCursosTerminados([]);
        }
    };

    useEffect(() => {
        fetchEnrolledCourses(id);
        fetchCompletedCourses(id);
    }, [])

    return(
        <div>
            <div className='mx-5'>
                <Tabs defaultActiveKey="cursoInscrito" className="my-4 nav-justified custom-tabs">
                    <Tab eventKey="cursoInscrito" title="Cursos Inscritos">
                        <div className="mt-4">
                            {/* Inscrito */}
                            {cursosInscrito.map((cu, index) => {
                                return(
                                    <div key={index}>
                                        {cu.data_inscricao}
                                    </div>
                                );
                            })}    
                        </div>
                    </Tab>
                    <Tab eventKey="cursoTerminado" title="Curso Terminado">
                        <div className="mt-4">
                            {/* Terminado */}
                            
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}

export default HistoryUser;