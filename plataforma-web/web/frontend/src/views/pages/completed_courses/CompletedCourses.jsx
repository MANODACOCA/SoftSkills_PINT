import './CompletedCourses.css';
import FeaturedCourseCard from '../../components/card_highlight/CardHighlight';
import SpinnerBorder from '../../components/spinner-border/spinner-border';
import { getCompletedCourses } from '../../../api/cursos_axios';
import { useUser } from '../../../utils/userContext';
import React, { useState, useEffect } from 'react';

const CompletedCourses = () => {
    const { user } = useUser();
    const [courses, setCourses] = useState([]);
    const [tipologia, setTipologia] = useState('todos');
    const userId = user.id_utilizador;
    const [loading, setLoading] = useState(true);

    const fetchCompletedCourses = async () => {
        try {
            setLoading(true);
            const data = await getCompletedCourses(userId);
            setCourses(data);
        } catch (error) {
            console.error('Erro ao encontrar cursos terminados:', error);
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchCompletedCourses();
    }, [tipologia, user]);

    if (!user || loading) {
        return <SpinnerBorder />;
    }

    const filteredCourses = courses.filter(curso => {
        if (tipologia === 'todos') return true;
        if (tipologia === 'sincrono') return curso.tipo === 'sincrono';
        if (tipologia === 'assincrono') return curso.tipo === 'assincrono';
        return false;
    });

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

            {filteredCourses.length === 0 ? (
                <p>Você ainda não terminou nenhum curso.</p>
            ) : (
                <div className="course-list">
                    {filteredCourses.map(course => (
                        <FeaturedCourseCard
                            key={`${userId}-${course.id_curso}`}
                            course={course}
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