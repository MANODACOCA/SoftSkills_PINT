import React from 'react';
import './headerForum.css';

const ForumHeader = ({ onCreatePost, totalPosts, totalMembers, forum }) => {
    const binaryNumbers = Array.from({ length: 150 }, () => Math.random() > 0.5 ? '1' : '0');
    console.log(forum);
    return (
        <div className="w-100">
            {/* Banner com efeito binário */}
            <div className="banner-gradient position-relative overflow-hidden" style={{ height: '140px' }}>
                <div className="binary-overlay position-absolute top-0 start-0 w-100 h-100">
                    <div className="binary-text p-3 d-flex flex-wrap">
                        {binaryNumbers.map((bit, i) => (
                            <span key={i} className="me-2 mb-1 opacity-50">{bit}</span>
                        ))}
                    </div>
                </div>



                <div className="position-absolute bottom-0 start-0 p-4 text-white">
                    <div className="d-flex align-items-center gap-4">
                        <div className="text-center">
                            <div className="h5 mb-0 fw-bold">10</div>
                            <small className="h5 mb-0 fw-semibold">Posts</small>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cabeçalho principal */}
            <div className="bg-white border-bottom shadow-sm">
                <div className="container-lg py-4">
                    <div className="row align-items-center">
                        <div className="col-md-10">
                            <div className="d-flex align-items-center">
                                <div className=" rounded-circle d-flex align-items-center justify-content-center me-3">
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(forum.id_topico_topico.nome_topico || 'F')}&background=random&bold=true`}
                                        alt={`Imagem do fórum`}
                                        className="rounded-5"
                                    />
                                </div>
                                <div>
                                    <h1 className="h2 mb-1 text-dark">{forum.id_topico_topico.nome_topico}</h1>
                                    <p className="text-muted mb-0 small">{forum.id_topico_topico.descricao_top}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2 text-md-end mt-3 mt-md-0">
                            <button className="btn btn-primary btn-lg" onClick={onCreatePost}>
                                <i className="bi bi-plus-circle me-2"></i>
                                Novo Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForumHeader;
