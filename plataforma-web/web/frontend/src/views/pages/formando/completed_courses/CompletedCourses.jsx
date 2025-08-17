import './CompletedCourses.css';
import FeaturedCourseCard from '../../../components/card_highlight/CardHighlight';
import SpinnerBorder from '../../../components/spinner-border/spinner-border';
import { getCompletedCourses } from '../../../../api/cursos_axios';
import { useUser } from '../../../../utils/useUser';
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';

const CompletedCourses = () => {
    const { user } = useUser();
    const [courses, setCourses] = useState([]);
    const [tipologia, setTipologia] = useState('todos');
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search') || '';

    const fetchCompletedCourses = async (userId) => {
        try {
            setLoading(true);
            const data = await getCompletedCourses(userId, tipologia, searchTerm);
            setCourses(data);
        } catch (error) {
            console.error('Erro ao encontrar cursos terminados:', error);
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.id_utilizador) {
            window.scrollTo(0, 0);
            fetchCompletedCourses(user.id_utilizador);
        }
    }, [searchTerm, tipologia, user]);


    if (!user || loading) {
        return <SpinnerBorder />;
    }

    return (
        <div className="completed-courses">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="mb-0">Cursos Terminados</h1>
                <select className="form-select w-auto" value={tipologia}
                    onChange={(e) => setTipologia(e.target.value)}>
                    <option value="todos">Todos</option>
                    <option value="sincrono">Síncrono</option>
                    <option value="assincrono">Assíncrono</option>
                </select>
            </div>

            {(!searchTerm && courses.length === 0) ? (
                <p>Você ainda não terminou nenhum curso.</p>
            ) : (searchTerm && courses.length === 0) ? (
                <p>Não foi encontrado nenhum curso terminado através da sua pesquisa.</p>
            ) : (
                <div className="course-list">
                    {courses.map(course => (
                        <FeaturedCourseCard
                            key={`${user.id_utilizador}-${course.id_curso}`}
                            course={course}
                            userId={user.id_utilizador}
                            showDescription={false}
                            showFormador={false}
                            variant="evaluation"
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CompletedCourses;