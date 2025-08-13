import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import './Sidebar.css';
import {} from '';

const SidebarFormando = ({ toggleSidebar, collapsed }) => {
    const [isPequena, setIsPequena] = useState(window.innerWidth <= 768);
    const [totalNotificacoes, setTotalNotificacoes] = useState("");

    

    useEffect(() => {
        const handleResize = () => {
            setIsPequena(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const effectiveCollapsed = isPequena ? true : collapsed;

    return (
        <div className={`border-end ${effectiveCollapsed ? 'collapsed' : ''} d-flex flex-column align-items-start p-2 sidebar`}>
            <div className='d-flex justify-content-between flex-column vh-100 w-100'>
                <div>
                    <NavLink to="/home" className={`nav-link d-flex align-items-center px-2  ${effectiveCollapsed ? 'justify-content-center' : 'my-2'}`}>
                        {!effectiveCollapsed &&
                            <div className='d-flex align-items-center'>
                                <i className="bi bi-house-door fs-4 px-2"></i>
                                Home
                            </div>
                        }
                        {effectiveCollapsed &&
                            <div className='d-flex flex-column align-items-center m-0'>
                                <i className="bi bi-house-door fs-4 px-2"></i>
                                <small className='text-truncate d-inline-block text-ellipsis'>Home</small>
                            </div>
                        }
                    </NavLink>
                    <hr />
                    <NavLink to="/cursos" className={`nav-link d-flex align-items-center px-2 ${effectiveCollapsed ? 'justify-content-center' : 'my-2'}`}>
                        {!effectiveCollapsed &&
                            <div className='d-flex align-items-center'>
                                <i className="bi bi-mortarboard fs-4 px-2"></i>
                                <span className='w-100'>Cursos</span>
                            </div>
                        }
                        {effectiveCollapsed &&
                            <div className='d-flex flex-column align-items-center m-0'>
                                <i className="bi bi-mortarboard fs-4 px-2"></i>
                                <small className='text-truncate d-inline-block text-ellipsis'>Cursos</small>
                            </div>
                        }
                    </NavLink>
                    <NavLink to="my/cursos/inscritos" className={`nav-link d-flex align-items-center px-2 ${effectiveCollapsed ? 'justify-content-center' : 'my-2'}`}>
                        {!effectiveCollapsed &&
                            <div className='d-flex align-items-center'>
                                <i className="bi bi-laptop fs-4 px-2"></i>
                                Cursos inscritos
                            </div>
                        }
                        {effectiveCollapsed &&
                            <div className='d-flex flex-column align-items-center m-0'>
                                <i className="bi bi-laptop fs-4 px-2"></i>
                                <small className='text-truncate d-inline-block text-ellipsis'>Cursos inscritos</small>
                            </div>
                        }
                    </NavLink>
                    {/*  <NavLink to="/cursos/favoritos" className="nav-link d-flex align-items-center px-2 ">
                        <i className="bi bi-heart fs-4 px-2"></i>
                        {!collapsed && 'Cursos Favoritos'}
                    </NavLink> */}
                    <NavLink to="my/cursos/terminados" className={`nav-link d-flex align-items-center px-2  ${effectiveCollapsed ? 'justify-content-center' : 'my-2'}`}>
                        {!effectiveCollapsed &&
                            <div className='d-flex align-items-center'>
                                <i className="bi bi-patch-check fs-4 px-2"></i>
                                Cursos Terminados
                            </div>
                        }
                        {effectiveCollapsed &&
                            <div className='d-flex flex-column align-items-center m-0'>
                                <i className="bi bi-patch-check fs-4 px-2"></i>
                                <small className='text-truncate d-inline-block text-ellipsis'>Cursos Terminados</small>
                            </div>
                        }
                    </NavLink>
                    <hr />
                    <NavLink to="/forum" className={`nav-link d-flex align-items-center px-2  ${effectiveCollapsed ? 'justify-content-center' : 'my-2'}`}>
                        {!effectiveCollapsed &&
                            <div className='d-flex align-items-center'>
                                <i className="bi bi-chat-dots fs-4 px-2"></i>
                                Fóruns
                            </div>
                        }
                        {effectiveCollapsed &&
                            <div className='d-flex flex-column align-items-center m-0'>
                                <i className="bi bi-chat-dots fs-4 px-2"></i>
                                <small className='text-truncate d-inline-block text-ellipsis'>Fóruns</small>
                            </div>
                        }
                    </NavLink>
                    <hr />
                    <NavLink to="/notificacoes" className={`nav-link d-flex align-items-center px-2  ${effectiveCollapsed ? 'justify-content-center' : 'my-2'}`}>
                        {!effectiveCollapsed &&
                            <div className='d-flex align-items-center'>
                                <i className="bi bi-bell fs-4 px-2"></i>
                                Notificações
                                <span className="badge ms-2 rounded-5" style={{ background: '#e00000ff' }}>{totalNotificacoes > 9 ? '9+' : totalNotificacoes}</span>
                            </div>
                        }
                        {effectiveCollapsed &&
                           <div className='d-flex flex-column align-items-center m-0 position-relative'>
                                <div className='position-absolute'
                                    style={{
                                        top: '-3px',
                                        right: '-6px', 
                                    }}>
                                    <span
                                        className="badge ms-2 rounded-5 d-flex justify-content-center align-items-center"
                                        style={{
                                            background: '#e00000ff',
                                            width: '24px',
                                            height: '24px',
                                            fontSize: '12px',
                                            padding: '0'
                                        }}
                                    >
                                        {totalNotificacoes > 9 ? '9+' : totalNotificacoes}
                                    </span>

                                </div>
                                <i className="bi bi-bell fs-4 px-2"></i>
                                <small className='text-truncate d-inline-block text-ellipsis'>Notificações</small>
                            </div>
                        }
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/" onClick={() => localStorage.removeItem('token')}
                        className={`nav-link d-flex align-items-center px-2  ${effectiveCollapsed ? 'justify-content-center' : 'my-2'}`}>
                        {!effectiveCollapsed &&
                            <div className='d-flex align-items-center'>
                                <i className="bi bi-box-arrow-right fs-4 px-2 text-danger"></i>
                                <span className='text-danger'>Logout</span>
                            </div>
                        }
                        {effectiveCollapsed &&
                            <div className='d-flex flex-column align-items-center justify-content-center m-0'>
                                <i className="bi bi-box-arrow-right fs-4 px-2 text-danger"></i>
                                <small className='text-truncate d-inline-block text-ellipsis text-danger'>Logout</small>
                            </div>
                        }
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default SidebarFormando;
