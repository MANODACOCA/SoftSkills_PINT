import { useEffect, useState } from "react";
import { getCompletedCourses, getCursosLecionadosAtualmente, getCursosLecionadosTerminados, getEnrolledCourses } from "../../../../api/cursos_axios";
import { useLocation, useParams } from "react-router-dom";
import { Tab, Tabs } from 'react-bootstrap';
import './CoursesLecionarDosList.css';
import { get_utilizador } from "../../../../api/utilizador_axios";
import { useUser } from '../../../../utils/useUser';

const CursoLecionarList = ({cursosLecionadosA, cursosLecionadosTerm}) => {
    const { user } = useUser();
    const id = user?.id_utilizador;
    console.log(id);
    const [utilizador, setUtilizador] = useState([]);
    const [cursosLecionadosTerminados, setCursosLecionadosTerminados] = useState([]);
    const [cursosLecionadosAtualmente, setCursosLecionadosAtualmente] = useState([]);
    const location = useLocation();
    const [activeKey, setActiveKey] = useState('cursosLecionadosA');

    const fetchCursosLecionadosTerminados = async (userId) => {
        try {
            const data = await getCursosLecionadosTerminados(userId);
            setCursosLecionadosTerminados(data);
            console.log(data);
        } catch (error) {
            if (error.response?.status === 404){
                setCursosLecionadosAtualmente([]);
                console.log('Não existem cursos a serem lecionados Terminados');
            } else {
                console.log('Erro ao encontrar cursos lecionados');
            }
        }
    }

    const fetchCursosLecionadosAtualmente = async (userId) => {
        try {
            const data = await getCursosLecionadosAtualmente(userId);
            setCursosLecionadosAtualmente(data);
            console.log(data);
        } catch (error) {
            if (error.response?.status === 404){
                setCursosLecionadosAtualmente([]);
                console.log('Não existem cursos a serem lecionados atualmente');
            } else {
                console.log('Erro ao encontrar cursos lecionados');
            }
        }
    }

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
        fetchCursosLecionadosAtualmente(id);
        fetchCursosLecionadosTerminados(id);
        fetchUtilizador(id);
    }, [])

    useEffect(() => {
        if(location.state?.activeTab) {
            setActiveKey(location.state.activeTab);
        }
    }, [location.state])

    return(
        <div className="container">
            <div className=''>
                <Tabs activeKey={activeKey} onSelect={(k=>setActiveKey(k))} className="my-4 nav-justified custom-tabs">
                    <Tab eventKey="cursosLecionadosA" title="Cursos a Lecionar" >
                        <div className="mt-4">
                            {cursosLecionadosAtualmente.length === 0 ? (
                                <div className="d-flex justify-content-center p-5">
                                    <span className="text-secondary">Este utilizador não se encontra a lecionar nenhum curso</span>
                                </div>
                            ) : (
                                cursosLecionadosAtualmente.map((cu, index) => {
                                    return(
                                        <div key={index} className="card flex-row rounded-4 cards-highlights position-relative mb-3">
                                            <img
                                                src={cu.id_curso_sincrono_curso.imagem || `https://ui-avatars.com/api/?name=${encodeURIComponent(cu.id_curso_sincrono_curso.nome_curso)}&background=random&bold=true`}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(cu.id_curso_sincrono_curso.nome_curso)}&background=random&bold=true`;
                                                }}
                                                className="rounded-start-4 highlights-images"
                                                alt="imagem curso"
                                            />
                                            <div className="card-body d-flex flex-column justify-content-between">
                                                <div>
                                                    <h5 className="mb-2">{cu.id_curso_sincrono_curso.nome_curso}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                            
                        </div>
                    </Tab>
                    <Tab eventKey="cursosLecionadosTerm" title="Cursos já Lecionados" >
                        <div className="mt-4">
                            {cursosLecionadosTerminados.length === 0 ? (
                                <div className="d-flex justify-content-center p-5">
                                    <span className="text-secondary">Este utilizador ainda não acabou de lecionar nenhum curso</span>
                                </div>
                            ) : (
                                cursosLecionadosTerminados.map((cu, index) => {
                                    return(
                                        <div key={index} className="card flex-row rounded-4 cards-highlights position-relative mb-3">
                                            <img
                                                src={cu.id_curso_sincrono_curso.imagem}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(cu.id_curso_sincrono_curso.nome_curso)}&background=random&bold=true`;
                                                }}
                                                className="rounded-start-4 highlights-images"
                                                alt="imagem curso"
                                            />
                                            <div className="card-body d-flex flex-column justify-content-between">
                                                <div>
                                                    <h5 className="mb-2">{cu.id_curso_sincrono_curso.nome_curso}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}

export default CursoLecionarList;