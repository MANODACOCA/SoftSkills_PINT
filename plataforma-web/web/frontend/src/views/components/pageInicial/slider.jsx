import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import homepage from '../../../assets/images/InicialPage/homePage.png'
import cursos from '../../../assets/images/InicialPage/cursos.png'
import foruns from '../../../assets/images/InicialPage/foruns.png'


const Slider = () => {
    const activeRole = localStorage.getItem('activeRole');
    const token = localStorage.getItem('token');

    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);


    const [currentSlide, setCurrentSlide] = useState(0);
    const tempos = [0, 30, 90];//tempos defenidos
    const [videoStartTime, setVideoStartTime] = useState(0);

    const rotas = ["/home", "/cursos", "/forum"];//rotas defenidos
    const [rotaSlide, setRotaSlide] = useState("");


    useEffect(() => {
        setRotaSlide(rotas[currentSlide]);
    }, [currentSlide]);

    useEffect(() => {
        if (showModal) {
            setVideoStartTime(tempos[currentSlide]);
        }

    }, [showModal]);


    const heroSlides = [
        {
            title: "Conhece a SoftSkills e venha aprender conosco",
            subtitle: "Plataforma completa para gestão de cursos e partilha de conhecimento corporativo(forúns)",
            bg: "linear-gradient(135deg, #3b5b84 0%, #00A9E0 100%)",
            image: homepage,
            overlay: "rgba(59, 91, 132, 0.4)"
        },
        {
            title: "Explore todos os nossos cursos disponíveis",
            subtitle: "Na SoftSkills, você encontra uma ampla variedade de cursos — assíncronos e síncronos",
            bg: "linear-gradient(135deg, #00A9E0 0%, #3b5b84 100%)",
            image: cursos,
            overlay: "rgba(0, 169, 224, 0.4)"
        },
        {
            title: "Partilha de Conhecimento Corporativo",
            subtitle: "Conecte-se com outros utilizadores e partilhe os seus conhecimentos com a comunidade",
            bg: "linear-gradient(45deg, #3b5b84 0%, #00A9E0 50%, #3b5b84 100%)",
            image: foruns,
            overlay: "rgba(59, 91, 132, 0.5)"
        }
    ];


    // Auto slide para o herói
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);



    return (
        <section
            className="hero-section position-relative overflow-hidden"
            style={{
                background: heroSlides[currentSlide].bg,
                minHeight: '50vh',
                transition: 'all 1.2s ease-in-out'
            }}
        >
            {/* Overlay Pattern */}
            <div
                className="position-absolute w-100 h-100"
                style={{
                    background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    zIndex: 1
                }}
            ></div>

            <div className="container-fluid h-100 position-relative" style={{ zIndex: 2 }}>
                <div className="row h-100 align-items-center">
                    <div className="col-lg-6 text-white p-5">
                        <div
                            className="hero-content"
                            style={{
                                animation: 'slideInLeft 1s ease-out',
                                animationDelay: '0.3s',
                                animationFillMode: 'both'
                            }}
                        >
                            <div className="mb-4">
                                <span
                                    className="badge px-4 py-2 rounded-pill fw-normal"
                                    style={{
                                        background: 'rgba(255,255,255,0.2)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255,255,255,0.3)',
                                        animation: 'fadeInUp 1s ease-out 0.5s both'
                                    }}
                                >
                                    🚀 Transformação Digital na Formação
                                </span>
                            </div>

                            <h1
                                className="display-2 fw-bold mb-4 lh-1"
                                style={{
                                    textShadow: '2px 4px 8px rgba(0,0,0,0.3)',
                                    animation: 'fadeInUp 1s ease-out 0.7s both',
                                    fontSize: 'clamp(2.5rem, 5vw, 4rem)'
                                }}
                            >
                                {heroSlides[currentSlide].title}
                            </h1>

                            <p
                                className="lead mb-5 fs-4 lh-base"
                                style={{
                                    textShadow: '1px 2px 4px rgba(0,0,0,0.3)',
                                    animation: 'fadeInUp 1s ease-out 0.9s both',
                                    maxWidth: '500px'
                                }}
                            >
                                {heroSlides[currentSlide].subtitle}
                            </p>

                            <div
                                className="d-flex gap-4 flex-wrap align-items-center"
                                style={{ animation: 'fadeInUp 1s ease-out 1.1s both' }}
                            >
                                <button
                                    className="btn btn-light btn-lg px-5 py-3 rounded-pill shadow-lg fw-semibold"
                                    style={{
                                        transform: 'translateY(0)',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        fontSize: '1.1rem'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-3px)';
                                        e.target.style.boxShadow = '0 12px 28px rgba(0,0,0,0.25)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                                    }}
                                    onClick={openModal}
                                >
                                    <span className="me-2">▶</span>
                                    Ver Demonstração
                                </button>

                                {(activeRole === 'formando' || !token) && (<Link
                                    to={rotaSlide}
                                    className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill fw-semibold"
                                    style={{
                                        transform: 'translateY(0)',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        backdropFilter: 'blur(10px)',
                                        background: 'rgba(255,255,255,0.1)',
                                        border: '2px solid rgba(255,255,255,0.4)',
                                        fontSize: '1.1rem'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-3px)';
                                        e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                                    }}
                                >
                                    🔎 Explorar
                                </Link>)}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 position-relative">
                        <div
                            className="hero-image-container position-relative mt-5 me-5"
                            style={{
                                animation: 'slideInRight 1s ease-out 0.8s both',
                                height: '500px',

                            }}
                        >
                            <div
                                className="position-relative"
                                style={{
                                    transform: 'perspective(1000px) rotateY(-8deg) rotateX(5deg)',
                                    transition: 'all 0.8s ease'
                                }}
                            >
                                <img
                                    src={heroSlides[currentSlide].image}
                                    alt="Formação Corporativa"
                                    className="img rounded-4 shadow-lg"
                                    style={{
                                        maxHeight: '600px',
                                        objectFit: 'cover',
                                        width: '100%',
                                        border: '8px solid rgba(255,255,255,0.2)',
                                    }}
                                />

                                {/* Play Button Overlay */}
                                <div
                                    className="position-absolute top-50 start-50 translate-middle"
                                    onClick={openModal}
                                    style={{
                                        background: '#00a8e025',
                                        borderRadius: '50%',
                                        padding: '25px',
                                        animation: 'pulse 2s infinite',
                                        cursor: 'pointer',
                                        backdropFilter: 'blur(10px)',
                                        border: '3px solid rgba(224, 221, 221, 0.8)'
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: '3rem',
                                            color: '#3b5b84',
                                            marginLeft: '5px'
                                        }}
                                    >
                                        ▶
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4">
                <div className="d-flex gap-2">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            className={`btn rounded-pill ${index === currentSlide ? 'btn-light' : 'btn-outline-light'}`}
                            style={{ width: '12px', height: '12px', padding: 0 }}
                        ></button>
                    ))}
                </div>
            </div>

            {/* MODAL */}
            {
                showModal && (
                    <div
                        className="modal d-block"
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            zIndex: 1050,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onClick={closeModal}
                    >
                        <div
                            className="modal-dialog"
                            style={{ maxWidth: '1350px', width: '100%' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-content bg-dark rounded-4 overflow-hidden">
                                <div className="modal-header border-0 p-3">
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white ms-auto"
                                        onClick={closeModal}
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body p-0">
                                    <div className="ratio ratio-16x9">
                                        <iframe
                                            src={`https://www.youtube.com/embed/dQw4w9WgXcQ?start=${videoStartTime}`}
                                            title="YouTube video"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </section >
    )
}

export default Slider;
