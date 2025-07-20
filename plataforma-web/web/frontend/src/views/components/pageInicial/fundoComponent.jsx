import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FundoComponent = () => {
    const navigate = useNavigate();
    const activeRole = localStorage.getItem('activeRole');

    const handleClick = () => {
        switch (activeRole) {
            case 'formando':
                navigate('/home');
                break;
            case 'formador':
                navigate('/formador/home');
                break;
            case 'admin':
                navigate('/admin/home');
                break;
            default:
                navigate('/login');
                break;
        }
    }

    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);


    return (
        <section
            className="py-5 text-white position-relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #3b5b84 0%, #00A9E0 100%)',
                minHeight: '500px'
            }}
        >
            <div
                className="position-absolute w-100 h-100"
                style={{
                    background: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpolygon points='50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40'/%3E%3C/g%3E%3C/svg%3E")`,
                    zIndex: 1,
                    animation: 'float 20s ease-in-out infinite'
                }}
            ></div>

            <div className="container position-relative" style={{ zIndex: 2 }}>
                <div className="row justify-content-center text-center">
                    <div className="col-lg-10">
                        <div style={{ animation: 'fadeInUp 1s ease-out' }}>
                            <div className="mb-4">
                                <span
                                    className="badge px-4 py-2 rounded-pill fw-normal fs-6"
                                    style={{
                                        background: 'rgba(255,255,255,0.2)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255,255,255,0.3)'
                                    }}
                                >
                                    🎯 Resultados Garantidos
                                </span>
                            </div>

                            <h2
                                className="display-3 fw-bold mb-4 lh-1"
                                style={{
                                    textShadow: '2px 4px 8px rgba(0,0,0,0.3)',
                                    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)'
                                }}
                            >
                                Pronto para Revolucionar<br />
                                <span
                                    style={{
                                        background: 'linear-gradient(45deg, #ffffff, rgba(255,255,255,0.8))',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text'
                                    }}
                                >
                                    a Formação na SoftSkills?
                                </span>
                            </h2>

                            <p
                                className="lead mb-5 fs-3 lh-base"
                                style={{
                                    textShadow: '1px 2px 4px rgba(0,0,0,0.3)',
                                    maxWidth: '700px',
                                    margin: '0 auto'
                                }}
                            >
                                Junte-se a <strong>nós</strong> e descubra novas possibilidades de aprendizagem com os nossos cursos.
                            </p>


                            <div className="row mb-5">
                                <div className="col-md-4 mb-3">
                                    <div className="d-flex align-items-center justify-content-center">
                                        <div
                                            className="me-3 rounded-circle d-flex align-items-center justify-content-center"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                background: 'rgba(255,255,255,0.2)',
                                                backdropFilter: 'blur(10px)'
                                            }}
                                        >
                                            🎓
                                        </div>
                                        <div className="text-start">
                                            <h6 className="mb-0 fw-bold">Cursos Diversificados</h6>
                                            <small className="opacity-75">Conteúdos variados</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="d-flex align-items-center justify-content-center">
                                        <div
                                            className="me-3 rounded-circle d-flex align-items-center justify-content-center"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                background: 'rgba(255,255,255,0.2)',
                                                backdropFilter: 'blur(10px)'
                                            }}
                                        >
                                            📃
                                        </div>
                                        <div className="text-start">
                                            <h6 className="mb-0 fw-bold">Certificação Imediata</h6>
                                            <small className="opacity-75">Certificados relavantes para a sua carreira</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="d-flex align-items-center justify-content-center">
                                        <div
                                            className="me-3 rounded-circle d-flex align-items-center justify-content-center"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                background: 'rgba(255,255,255,0.2)',
                                                backdropFilter: 'blur(10px)'
                                            }}
                                        >
                                            🛡️
                                        </div>
                                        <div className="text-start">
                                            <h6 className="mb-0 fw-bold">Suporte 24h</h6>
                                            <small className="opacity-75">Assistência permanente</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex gap-4 justify-content-center flex-wrap">
                                <button
                                    onClick={handleClick}
                                    className="btn btn-light btn-lg px-5 py-4 rounded-pill shadow-lg fw-bold"
                                    style={{
                                        transform: 'translateY(0)',
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        fontSize: '1.2rem',
                                        minWidth: '200px'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-8px) scale(1.05)';
                                        e.target.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0) scale(1)';
                                        e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
                                    }}
                                >
                                    🚀 Começar Agora
                                </button>

                                <button
                                    className="btn btn-outline-light btn-lg px-5 py-4 rounded-pill fw-bold"
                                    style={{
                                        transform: 'translateY(0)',
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        backdropFilter: 'blur(10px)',
                                        background: 'rgba(255,255,255,0.1)',
                                        border: '2px solid rgba(255,255,255,0.4)',
                                        fontSize: '1.2rem',
                                        minWidth: '200px'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-8px) scale(1.05)';

                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0) scale(1)';
                                        e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                                        e.target.style.borderColor = 'rgba(255,255,255,0.4)';
                                    }}
                                    onClick={openModal}
                                >
                                    📹 Ver Demonstração
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {showModal && (
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
                                        src={`https://www.youtube.com/embed/dQw4w9WgXcQ`}
                                        title="YouTube video"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default FundoComponent;
