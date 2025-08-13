import { useEffect, useState } from "react";
import { getCompletedCourses, getCursosLecionadosAtualmente, getCursosLecionadosTerminados, getEnrolledCourses } from "../../../../api/cursos_axios";
import { useParams } from "react-router-dom";
import { Tab, Tabs } from 'react-bootstrap';
import './Historico_User.css';
import { get_utilizador } from "../../../../api/utilizador_axios";
import FeaturedCourseCard from "../../../components/card_highlight/CardHighlight";
import FilterHistorico from "../../../components/filter_menu/filter_historico";
import SpinnerBorder from "../../../components/spinner-border/spinner-border";

const HistoryUser = () => {
    const { id } = useParams();
    const [cursosTerminados, setCursosTerminados] = useState([]);
    const [cursosInscrito, setCursosInscrito] = useState([]);
    const [utilizador, setUtilizador] = useState([]);
    const [cursosLecionadosTerminados, setCursosLecionadosTerminados] = useState([]);
    const [cursosLecionadosAtualmente, setCursosLecionadosAtualmente] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingDados, setLoadingDados] = useState(false);

    const handleApply = (inicio, fim) => {
        setDataInicio(inicio);
        setDataFim(fim);
    };

    const handleClean = () => {
        setDataFim('');
        setDataInicio('');
    }

    const fetchEnrolledCourses = async (userId, searchTerm = ' ', dataInicio = '', dataFim = '') => {
        try {
            const data = await getEnrolledCourses(userId, 'todos', searchTerm || " ", dataFim || null, dataInicio || null);

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
            if (error.response?.status === 404) {
                setCursosInscrito([]);
                console.log('Não existem cursos onde o utilizador esteja inscrito');
            } else {
                console.error('Erro ao encontrar cursos inscritos');
            }
        }
    };

    const fetchCompletedCourses = async (userId, searchTerm = ' ', dataInicio = '', dataFim = '') => {
        try {
            const data = await getCompletedCourses(userId, 'todos', searchTerm || " ", dataFim || null, dataInicio || null);
            setCursosTerminados(data);
            console.log(data);
        } catch (error) {
            if (error.response?.status === 404) {
                setCursosTerminados([]);
                console.log('Não existem cursos que o utilizador ja tenha terminado');
            } else {
                console.error('Erro ao encontrar cursos inscritos');
            }
        }
    };

    const fetchCursosLecionadosTerminados = async (userId, searchTerm = ' ', dataInicio = '', dataFim = '') => {
        try {
            setLoadingDados(true);
            const data = await getCursosLecionadosTerminados(userId, searchTerm || " ", dataFim || null, dataInicio || null);
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
            setLoadingDados(false);
        }
    }

    const fetchCursosLecionadosAtualmente = async (userId, searchTerm = ' ', dataInicio = '', dataFim = '') => {
        try {
            const data = await getCursosLecionadosAtualmente(userId, searchTerm || " ", dataFim || null, dataInicio || null);
            setCursosLecionadosAtualmente(data);
            console.log(data);
        } catch (error) {
            if (error.response?.status === 404) {
                setCursosLecionadosAtualmente([]);
                console.log('Não existem cursos a serem lecionados atualmente');
            } else {
                console.log('Erro ao encontrar cursos lecionados');
            }
        }
    }

    const fetchUtilizador = async (id) => {
        try {
            setLoadingUser(true);
            const response = await get_utilizador(id);
            setUtilizador(response);
            console.log(response);
        } catch (error) {
            console.log('Erro ao encontrar user!');
        } finally {
            setLoadingUser(false);
        }
    }

    useEffect(() => {
        fetchEnrolledCourses(id, searchTerm, dataInicio, dataFim);
        fetchCompletedCourses(id, searchTerm, dataInicio, dataFim);
        fetchCursosLecionadosAtualmente(id, searchTerm, dataInicio, dataFim);
        fetchCursosLecionadosTerminados(id, searchTerm, dataInicio, dataFim);
    }, [id, searchTerm, dataInicio, dataFim])


    useEffect(() => {
        fetchUtilizador(id);
    }, [id])

    return (
        <>
            {loadingUser ? (
                <SpinnerBorder />
            ) : (
                <div className="container">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-5">
                            <div>
                                {utilizador && (
                                    <img
                                        src={utilizador?.img_perfil || `https://ui-avatars.com/api/?name=${encodeURIComponent(utilizador.nome_utilizador)}&background=random&bold=true`}
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
                                    {utilizador?.isformando &&
                                        <p>Formando</p>
                                    }
                                    {utilizador?.isformador &&
                                        <p>/Formador</p>
                                    }
                                    {utilizador?.isgestor_administrador &&
                                        <p>/Administrador</p>
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
                            {utilizador.isformando &&
                                <Tab eventKey="cursoInscrito" title="Cursos Inscritos">
                                    <FilterHistorico
                                        searchTerm={searchTerm}
                                        onSearchChange={(value) => setSearchTerm(value)}
                                        dataInicio={dataInicio}
                                        dataFim={dataFim}
                                        onApply={handleApply}
                                        onClean={handleClean}
                                    />
                                    <div className="mt-4">
                                        {cursosInscrito.length === 0 ? (
                                            <div className="d-flex justify-content-center p-5">
                                                <span className="text-secondary">Este utilizador não se encontra inscrito em nenhum curso</span>
                                            </div>
                                        ) : loadingDados ? (
                                            <SpinnerBorder />
                                        ) : (
                                            cursosInscrito.map((cu, index) => {
                                                return (
                                                    <FeaturedCourseCard
                                                        key={`${id}-${cu.id_curso_curso.id_curso}`}
                                                        course={cu.id_curso_curso}
                                                        userId={id}
                                                        showDescription={false}
                                                        showFormador={false}
                                                        variant="enrolled"
                                                        verCurso={false}
                                                    />
                                                )
                                            })
                                        )}
                                    </div>
                                </Tab>
                            }
                            {utilizador.isformando &&
                                <Tab eventKey="cursoTerminado" title="Cursos Terminados">
                                    <FilterHistorico
                                        searchTerm={searchTerm}
                                        onSearchChange={(value) => setSearchTerm(value)}
                                        dataInicio={dataInicio}
                                        dataFim={dataFim}
                                        onApply={handleApply}
                                        onClean={handleClean}
                                    />
                                    <div className="mt-4">
                                        {cursosTerminados.length === 0 ? (
                                            <div className="d-flex justify-content-center p-5">
                                                <span className="text-secondary">Este utilizador ainda não terminou nenhum curso</span>
                                            </div>
                                        ) : loadingDados ? (
                                            <SpinnerBorder />
                                        ) : (
                                            cursosTerminados.map((cu, index) => {
                                                return (
                                                    <FeaturedCourseCard
                                                        key={`${id}-terminado-${cu.id_curso}`}
                                                        course={cu}
                                                        userId={id}
                                                        showDescription={false}
                                                        showFormador={false}
                                                        variant="evaluation"
                                                        verCurso={false}
                                                    />
                                                );
                                            })
                                        )}
                                    </div>
                                </Tab>
                            }
                            {utilizador.isformador &&
                                <Tab eventKey="cursosLecionadosAtualmente" title="Cursos a Lecionar" >
                                    <FilterHistorico
                                        searchTerm={searchTerm}
                                        onSearchChange={(value) => setSearchTerm(value)}
                                        dataInicio={dataInicio}
                                        dataFim={dataFim}
                                        onApply={handleApply}
                                        onClean={handleClean}
                                    />
                                    <div className="mt-4">
                                        {cursosLecionadosAtualmente.length === 0 ? (
                                            <div className="d-flex justify-content-center p-5">
                                                <span className="text-secondary">Este utilizador não se encontra a lecionar nenhum curso</span>
                                            </div>
                                        ) : loadingDados ? (
                                            <SpinnerBorder />
                                        ) : (
                                            cursosLecionadosAtualmente.map((cu, index) => {
                                                return (
                                                    <FeaturedCourseCard
                                                        key={`teaching-${cu.id_curso_sincrono_curso.id_curso}`}
                                                        course={cu.id_curso_sincrono_curso}
                                                        userId={id}
                                                        showDescription={false}
                                                        showFormador={false}
                                                        variant="teaching-now"
                                                        verCurso={false}
                                                    />
                                                );
                                            })
                                        )}
                                    </div>
                                </Tab>
                            }
                            {utilizador.isformador &&
                                <Tab eventKey="cursosLecionadosTerminados" title="Cursos já Lecionados" >
                                    <FilterHistorico
                                        searchTerm={searchTerm}
                                        onSearchChange={(value) => setSearchTerm(value)}
                                        dataInicio={dataInicio}
                                        dataFim={dataFim}
                                        onApply={handleApply}
                                    />
                                    <div className="mt-4">
                                        {cursosLecionadosTerminados.length === 0 ? (
                                            <div className="d-flex justify-content-center p-5">
                                                <span className="text-secondary">Este utilizador ainda não acabou de lecionar nenhum curso</span>
                                            </div>
                                        ) : loadingDados ? (
                                            <SpinnerBorder />
                                        ) : (
                                            cursosLecionadosTerminados.map((cu, index) => {
                                                return (
                                                    <FeaturedCourseCard
                                                        key={`taught-${cu.id_curso_sincrono_curso.id_curso}`}
                                                        course={cu.id_curso_sincrono_curso}
                                                        userId={id}
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
                            }
                        </Tabs>
                    </div>
                </div>
            )}
        </>
    );
}

export default HistoryUser;