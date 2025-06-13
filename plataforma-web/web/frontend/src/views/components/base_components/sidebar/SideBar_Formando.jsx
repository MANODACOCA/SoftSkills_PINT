import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import './Sidebar.css';

const SidebarFormando = ({ toggleSidebar, collapsed }) => {
    const [isPequena, setIsPequena] = useState(window.innerWidth <= 768);

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
                                Fórum
                            </div>
                        }
                        {effectiveCollapsed && 
                            <div className='d-flex flex-column align-items-center m-0'>
                                <i className="bi bi-chat-dots fs-4 px-2"></i>
                                <small className='text-truncate d-inline-block text-ellipsis'>Fórum</small>
                            </div>
                        }
                    </NavLink>
                    {/* <hr />
                    <NavLink to="/notificacoes" className="nav-link d-flex align-items-center px-2 ">
                        <i className="bi bi-bell fs-4 px-2"></i>
                        {!collapsed && 'Notificações'}
                    </NavLink> */}
                </div>
                <div>
                    <NavLink to="/definicoes" className={`nav-link d-flex align-items-center px-2  ${effectiveCollapsed ? 'justify-content-center' : 'my-2'}`}>
                        {!effectiveCollapsed && 
                            <div className='d-flex align-items-center'>
                                <i className="bi bi-gear fs-4 px-2"></i>
                                Definições
                            </div>
                        }
                        {effectiveCollapsed && 
                            <div className='d-flex flex-column align-items-center m-0'>
                                <i className="bi bi-gear fs-4 px-2"></i>
                                <small className='text-truncate d-inline-block text-ellipsis'>Definições</small>
                            </div>
                        }
                    </NavLink>
                    <NavLink to="/login" onClick={() => localStorage.removeItem('token')} 
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
