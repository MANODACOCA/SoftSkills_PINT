import './FavoriteCourses.css';
import FeaturedCourseCard from '../../../components/card_highlight/CardHighlight';
import { getFavoriteCourses } from '../../../../api/cursos_axios';
import React, { useState, useEffect } from 'react';

const FavoriteCourses = () => {
    const [courses, setCourses] = useState([]);
    const [tipologia, setTipologia] = useState('todos');
    const userId = 2;

    const fetchFavoriteCourses = async () => {
        try {
            const data = await getFavoriteCourses(userId);
            setCourses(data);
        } catch (error) {
            console.error('Erro ao procurar cursos favoritos:', error);
            setCourses([]);
        }
    };

    // const handleRemoveFavorite = async (idCurso) => {
    //     try {
    //         await removeFromFavorites(userId, idCurso);
    //         setCourses(prev => prev.filter(curso => curso.id_curso !== idCurso));
    //     } catch (error) {
    //         console.error('Erro ao remover dos favoritos:', error);
    //     }
    // };

    useEffect(() => {
        fetchFavoriteCourses();
    }, []);

    const filteredCourses = courses.filter(curso => {
        if (tipologia === 'todos') return true;
        if (tipologia === 'sincrono') return curso.tipo === 'sincrono';
        if (tipologia === 'assincrono') return curso.tipo === 'assincrono';
        return false;
    });

    return (
        <div className="favorite-courses">
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <h1 className='mb-0'>Cursos Favoritos</h1>
                <select className='form-select w-auto' value={tipologia}
                    onChange={(e) => setTipologia(e.target.value)}>
                    <option value="todos">Todos</option>
                    <option value="sincrono">Síncrono</option>
                    <option value="assincrono">Assíncrono</option>
                </select>
            </div>

            {filteredCourses.length === 0 ? (
                <p>Você ainda não adicionou cursos aos favoritos.</p>
            ) : (
                <div className="course-list">
                    {filteredCourses.map(course => (
                        <FeaturedCourseCard
                            key={`${userId}-${course.id_curso_curso.id_curso}`}
                            course={course.id_curso_curso}
                            showDescription={false}
                            showFormador={false}
                            variant="favorite"
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoriteCourses;

