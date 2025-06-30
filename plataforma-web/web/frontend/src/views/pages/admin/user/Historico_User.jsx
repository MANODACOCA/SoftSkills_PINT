import { useEffect, useState } from "react";
import { getCompletedCourses, getEnrolledCourses } from "../../../../api/cursos_axios";
import { useParams } from "react-router-dom";
import { Tab, Tabs } from 'react-bootstrap';
import './Historico_User.css';
import { get_utilizador } from "../../../../api/utilizador_axios";

const HistoryUser = () => {
    const {id} = useParams();
    const [cursosTerminados, setCursosTerminados] = useState([]);
    const [cursosInscrito, setCursosInscrito] = useState([]);
    const [utilizador, setUtilizador] = useState([]);

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
            const data = await getCompletedCourses(userId);
            setCursosTerminados(data);
            console.log(data);
        } catch (error) {
            console.error('Erro ao encontrar cursos terminados:', error);
            setCursosTerminados([]);
        }
    };

    const fetchUtilizador = async (id) => {
        try {
            const response = await get_utilizador(id);
            setUtilizador(response);
            console.log(response);
        } catch (error) {
            console.log('Erro ao encontrar user!');
        }
    }

    useEffect(() => {
        fetchEnrolledCourses(id);
        fetchCompletedCourses(id);
        fetchUtilizador(id);
    }, [])

    return(
        <div className="container">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-5">
                    <div>
                        {utilizador && (    
                        <img src={utilizador.img_perfil} 
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(utilizador.nome_utilizador)}&background=random&bold=true`;
                        }}
                        height={150} className="rounded-circle" alt="Imagem do utilizador" />  
                        )}  
                    </div>
                    <div className="d-flex flex-column justify-content-start align-items-start">
                        <h4>{utilizador?.nome_utilizador}</h4>
                        <div className="d-flex">
                            {utilizador?.isgestor_administrador &&
                                <p>Administrador/</p>
                            }
                            {utilizador?.isformador && 
                                <p>Formador/</p>
                            }
                            {utilizador?.isformando && 
                                <p>Formando</p>
                            }
                        </div>
                        <small className="text-secondary">{utilizador?.email}</small>
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-start align-items-start w-25">
                    <p>Cursos terminados: {cursosTerminados.length}</p>
                    <p>Cursos inscritos: {cursosInscrito.length}</p>
                </div>
            </div>
            <div className=''>
                <Tabs defaultActiveKey="cursoInscrito" className="my-4 nav-justified custom-tabs">
                    <Tab eventKey="cursoInscrito" title="Cursos Inscritos">
                        <div className="mt-4">
                            {/* Inscrito */}
                            {cursosInscrito.map((cu, index) => {
                                return (
                                    <div key={index} className="card flex-row rounded-4 cards-highlightsposition-relative mb-3">
                                        <img
                                            src={cu.id_curso_curso.imagem}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(cu.id_curso_curso.nome_curso)}&background=random&bold=true`;
                                                }}
                                            className="rounded-start-4 highlights-images"
                                            alt="imagem curso"
                                        />
                                        <div className="card-body d-flex flex-column justify-content-between">
                                            <div>
                                                <h5 className="mb-2">{cu.id_curso_curso.nome_curso}</h5>
                                            </div>
                                        </div>
                                    </div>
                                );
                                })}    
                        </div>
                    </Tab>
                    <Tab eventKey="cursoTerminado" title="Cursos Terminados">
                        <div className="mt-4">
                            {/* Terminado */}
                            {cursosTerminados.map((cu, index) => {
                                return(
                                    <div key={index} className="card flex-row rounded-4 cards-highlightsposition-relative mb-3">
                                        <img
                                            src={
                                            cu.imagem
                                                ? cu.imagem
                                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(cu.nome_curso)}&background=random&bold=true`                                 
                                            }
                                            className="rounded-start-4 highlights-images"
                                            alt="imagem curso"
                                        />
                                        <div className="card-body d-flex flex-column justify-content-between">
                                            <div>
                                                <h5 className="mb-2">{cu.nome_curso}</h5>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })} 
                        </div>
                    </Tab>
                    {utilizador.isformador &&  
                    <Tab eventKey="cursosLecionados" title="Cursos Lecionados" >
                        <div className="mt-4">
                            {}
                        </div>
                    </Tab>
                     }
                </Tabs>
            </div>
        </div>
    );
}

export default HistoryUser;