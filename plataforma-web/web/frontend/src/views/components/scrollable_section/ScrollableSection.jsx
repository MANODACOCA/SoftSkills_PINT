import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Card from '../../components/card/Card';

const ScrollableSection = ({ title, courses, scrollRef, onScroll }) => {
    
    const formatDayMonthYear = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' , year: 'numeric'});
    }
    return (
        <>
            <h1 className="mt-3 ps-3">{title}</h1>
            <div className="position-relative px-3">
                <button
                    className="btn btn-light position-absolute top-50 start-0 translate-middle-y z-1 arrow-click"
                    onClick={() => onScroll(scrollRef, 'left')}>
                    <FaChevronLeft />
                </button>

                <div className="scroll-container d-flex gap-3" ref={scrollRef}>
                    {courses.map((courses) => (
                        <div className="card-wrapper" key={courses.id_curso}>
                            <Card
                                courseId={courses.id_curso}
                                image={courses.imagem}
                                title={courses.nome_curso}
                                type={courses.isassincrono ? 'Assíncrono' : courses.issincrono ? 'Síncrono' : 'Outro'}
                                startDate={formatDayMonthYear(courses.data_inicio_curso)}
                                endDate={formatDayMonthYear(courses.data_fim_curso)}
                                membrosAtual={courses.contador_formandos}
                                membrosMax={courses.numero_vagas}
                            />
                        </div>
                    ))}
                </div>

                <button
                    className="btn btn-light position-absolute top-50 end-0 translate-middle-y z-1 arrow-click"
                    onClick={() => onScroll(scrollRef, 'right')}>
                    <FaChevronRight />
                </button>
            </div>
        </>
    );
};

export default ScrollableSection;