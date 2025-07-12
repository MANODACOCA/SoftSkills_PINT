import React, { useState, useEffect } from 'react';
import { utilizadores_contagem } from '../../../api/utilizador_axios';
import { cursos_contagem } from '../../../api/cursos_axios';
import { forum_contagem } from '../../../api/conteudos_partilhado_axios';



const MiddleComponent = () => {
    const [animatedStats, setAnimatedStats] = useState({ users: 0, courses: 0, companies: 0 });
    const [nUsers, setNUsers] = useState(null);
    const [nCourses, setNCourses] = useState(null);
    const [nForuns, setNForuns] = useState(null);

    
    useEffect(() => {
        const buscarValores = async () => {
            setNUsers(await utilizadores_contagem());
            setNCourses(await cursos_contagem());
            setNForuns(await forum_contagem());
        }
        buscarValores();
    }, []);

    useEffect(() => {
        if (!nUsers || !nCourses || !nForuns) return;

        const targets = { users: nUsers, courses: nCourses, companies: nForuns };
        const duration = 1000;
        const steps = 50;
        let step = 0;

        const interval = setInterval(() => {
            step++;
            const progress = step / steps;
            setAnimatedStats({
                users: Math.floor(targets.users * progress),
                courses: Math.floor(targets.courses * progress),
                companies: Math.floor(targets.companies * progress)
            });

            if (step >= steps) clearInterval(interval);
        }, duration / steps);

        return () => clearInterval(interval);

    }, [nUsers, nCourses, nForuns]);



    return (
        <>
            <section
                className="py-5"
                style={{
                    background: 'linear-gradient(135deg, #f8f9fa 0%, rgba(59, 91, 132, 0.05) 50%, rgba(0, 169, 224, 0.05) 100%)'
                }}
            >
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold mb-3" style={{ color: '#3b5b84' }}>
                            Números que Falam por Si
                        </h2>
                        <p className="lead text-muted">
                            Anos de resultados no desenvolvimento das conhecimento que o mercado valoriza
                        </p>
                    </div>

                    <div className="row text-center">
                        <div className="col-md-4 mb-4">
                            <div
                                className="stats-card p-5 bg-white rounded-4 shadow-lg h-100 position-relative overflow-hidden"
                                style={{
                                    transform: 'translateY(0)',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    animation: 'bounceIn 1s ease-out',
                                    border: '2px solid rgba(59, 91, 132, 0.1)'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-15px) scale(1.02)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                {/* Background Pattern */}
                                <div className="position-relative">
                                    <div
                                        className="mb-4 d-inline-flex align-items-center justify-content-center rounded-circle"
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            background: 'linear-gradient(135deg, #3b5b84, #00A9E0)',
                                            color: 'white',
                                            fontSize: '2rem'
                                        }}
                                    >
                                        👥
                                    </div>
                                    <h3
                                        className="display-3 fw-bold mb-2"
                                        style={{
                                            background: 'linear-gradient(135deg, #3b5b84, #00A9E0)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text'
                                        }}
                                    >
                                        {animatedStats.users.toLocaleString()}+
                                    </h3>
                                    <p className="fs-5 fw-semibold mb-2" style={{ color: '#3b5b84' }}>
                                        Utilizadores Ativos
                                    </p>
                                    <small className="text-muted">
                                        Profissionais em formação contínua
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div
                                className="stats-card p-5 bg-white rounded-4 shadow-lg h-100 position-relative overflow-hidden"
                                style={{
                                    transform: 'translateY(0)',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    animation: 'bounceIn 1s ease-out 0.2s both',
                                    border: '2px solid rgba(0, 169, 224, 0.1)'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-15px) scale(1.02)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                {/* Background Pattern */}
                                <div className="position-relative">
                                    <div
                                        className="mb-4 d-inline-flex align-items-center justify-content-center rounded-circle"
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            background: 'linear-gradient(135deg, #00A9E0, #3b5b84)',
                                            color: 'white',
                                            fontSize: '2rem'
                                        }}
                                    >
                                        📚
                                    </div>
                                    <h3
                                        className="display-3 fw-bold mb-2"
                                        style={{
                                            background: 'linear-gradient(135deg, #00A9E0, #3b5b84)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text'
                                        }}
                                    >
                                        {animatedStats.courses}+
                                    </h3>
                                    <p className="fs-5 fw-semibold mb-2" style={{ color: '#00A9E0' }}>
                                        Cursos Disponíveis
                                    </p>
                                    <small className="text-muted">
                                        Conteúdos especializados e atualizados
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div
                                className="stats-card p-5 bg-white rounded-4 shadow-lg h-100 position-relative overflow-hidden"
                                style={{
                                    transform: 'translateY(0)',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    animation: 'bounceIn 1s ease-out 0.4s both',
                                    border: '2px solid rgba(59, 91, 132, 0.1)'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-15px) scale(1.02)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                <div className="position-relative">
                                    <div
                                        className="mb-4 d-inline-flex align-items-center justify-content-center rounded-circle"
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            background: 'linear-gradient(135deg, #3b5b84, #00A9E0)',
                                            color: 'white',
                                            fontSize: '2rem'
                                        }}
                                    >
                                        🗫
                                    </div>
                                    <h3
                                        className="display-3 fw-bold mb-2"
                                        style={{
                                            background: 'linear-gradient(135deg, #3b5b84, #00A9E0)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text'
                                        }}
                                    >
                                        {animatedStats.companies}+
                                    </h3>
                                    <p className="fs-5 fw-semibold mb-2" style={{ color: '#3b5b84' }}>
                                        Forúns Livres
                                    </p>
                                    <small className="text-muted">
                                        Para partilha de conhecimento
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5 bg-white">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold mb-3">Como Funciona</h2>
                        <p className="lead text-muted">Implementação rápida e sem complicações</p>
                    </div>

                    <div className="row g-4">
                        {[
                            { icon: '📝', title: '1. Registo', text: 'Crie a sua conta de forma simples e rápida.' },
                            { icon: '📚', title: '2. Escolha um curso', text: 'Explore e encontre o curso ideal para o seus interesses.' },
                            { icon: '✍️', title: '3. Inscreva-se', text: 'Inscreva-se facilmente e comece a aprender.' },
                            { icon: '🎓', title: '4. Obtenha o certificado', text: 'No final do curso, recebe o seu certificado.' }
                        ].map((step, index) => (
                            <div className="col-md-3" key={index}>
                                <div className="text-center p-3 h-100">
                                    <div className="mb-3" style={{ fontSize: '2.5rem' }}>{step.icon}</div>
                                    <h3 className="h5 fw-bold">{step.title}</h3>
                                    <p className="text-muted mb-0">{step.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default MiddleComponent;
