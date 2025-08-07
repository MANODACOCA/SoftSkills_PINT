import { useEffect, useState } from "react";
import { getCompletedCourses, getCursosLecionadosAtualmente, getCursosLecionadosTerminados, getEnrolledCourses } from "../../../../api/cursos_axios";
import { useLocation, useParams, Link } from "react-router-dom";
import { Tab, Tabs } from 'react-bootstrap';
import './CoursesLecionarDosList.css';
import { get_utilizador } from "../../../../api/utilizador_axios";
import { useUser } from '../../../../utils/useUser';
import FeaturedCourseCard from "../../../components/card_highlight/CardHighlight";
import SpinnerBorder from "../../../components/spinner-border/spinner-border";

const CursoLecionarList = ({ cursosLecionadosA, cursosLecionadosTerm }) => {
    const { user } = useUser();
    const [utilizador, setUtilizador] = useState([]);
    const [cursosLecionadosTerminados, setCursosLecionadosTerminados] = useState([]);
    const [cursosLecionadosAtualmente, setCursosLecionadosAtualmente] = useState([]);
    const location = useLocation();
    const [activeKey, setActiveKey] = useState('cursosLecionadosA');
    const [loading, setLoading] = useState(false);
    /* const id = user?.id_utilizador;
    console.log(id); */

    const fetchCursosLecionadosTerminados = async (userId) => {
        try {
            setLoading(true);
            const data = await getCursosLecionadosTerminados(userId);
            setCursosLecionadosTerminados(data);
            console.log(data);
        } catch (error) {
            if (error.response?.status === 404) {
                setCursosLecionadosAtualmente([]);
                console.log('Não existem cursos a serem lecionados Terminados');
            } else {
                console.log('Erro ao encontrar cursos lecionados');
            }
        } finally {
            setLoading(false);
        }
    }

    const fetchCursosLecionadosAtualmente = async (userId) => {
        try {
            setLoading(true);
            const data = await getCursosLecionadosAtualmente(userId);
            setCursosLecionadosAtualmente(data);
            console.log(data);
        } catch (error) {
            if (error.response?.status === 404) {
                setCursosLecionadosAtualmente([]);
                console.log('Não existem cursos a serem lecionados atualmente');
            } else {
                console.log('Erro ao encontrar cursos lecionados');
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!user || !user.id_utilizador) return;
        const id = user.id_utilizador;

        fetchCursosLecionadosAtualmente(id);
        fetchCursosLecionadosTerminados(id);
    }, [user])

    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveKey(location.state.activeTab);
        }
    }, [location.state])

    return (
        <>
            {loading ? (
                <SpinnerBorder />
            ) : (
                <div className="container">
                    <div className=''>
                        <Tabs activeKey={activeKey} onSelect={(k => setActiveKey(k))} className="my-4 nav-justified custom-tabs">
                            <Tab eventKey="cursosLecionadosA" title="Cursos a Lecionar" >
                                <div className="mt-4">
                                    {cursosLecionadosAtualmente.length === 0 ? (
                                        <div className="d-flex justify-content-center p-5">
                                            <span className="text-secondary">Este utilizador não se encontra a lecionar nenhum curso</span>
                                        </div>
                                    ) : (
                                        cursosLecionadosAtualmente.map((cu, index) => {
                                            return (
                                                <FeaturedCourseCard
                                                    key={`taught-${cu.id_curso_sincrono_curso.id_curso}`}
                                                    course={cu.id_curso_sincrono_curso}
                                                    userId={user?.id_utilizador}
                                                    showDescription={false}
                                                    showFormador={false}
                                                    variant="teaching-now"
                                                />
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
                                            return (
                                                <FeaturedCourseCard
                                                    key={`taught-${cu.id_curso_sincrono_curso.id_curso}`}
                                                    course={cu.id_curso_sincrono_curso}
                                                    userId={user?.id_utilizador}
                                                    showDescription={false}
                                                    showFormador={false}
                                                    variant="teaching-finished"
                                                    verCurso={false}
                                                />
                                            );
                                        })
                                    )}
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            )}
        </>
    );
}

export default CursoLecionarList;