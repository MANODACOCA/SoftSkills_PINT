import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import './Sidebar.css';

const SidebarAdmin = ({ toggleSidebar, collapsed }) => {
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
                    <NavLink to="/admin/home" className={`nav-link d-flex align-items-center px-2  ${effectiveCollapsed ? 'justify-content-center' : 'my-2'}`}>
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
                    <NavLink to="/admin/cursos" className={`nav-link d-flex align-items-center px-2 ${effectiveCollapsed ? 'justify-content-center' : 'my-2'}`}>
                        {!effectiveCollapsed && 
                            <div className='d-flex align-items-center'>
                                <i className="bi bi-plus-lg fs-4 px-2"></i>
                                Gerir Cursos
                            </div>
                        }
                        {effectiveCollapsed && 
                            <div className='d-flex flex-column align-items-center m-0'>
                                <i className="bi bi-plus-lg fs-4 px-2"></i>
                                <small className='text-truncate d-inline-block text-ellipsis'>Gerir Cursos</small>
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
                    <NavLink to="admin/gerirforum" className={`nav-link d-flex align-items-center px-2  ${effectiveCollapsed ? 'justify-content-center' : 'my-2'}`}>
                        {!effectiveCollapsed && 
                            <div className='d-flex align-items-center'>
                                <i className="bi bi-person-gear fs-4 px-2"></i>
                                Gerir Fórum
                            </div>
                        }
                        {effectiveCollapsed && 
                            <div className='d-flex flex-column align-items-center m-0'>
                                <i className="bi bi-person-gear fs-4 px-2"></i>
                                <small className='text-truncate d-inline-block text-ellipsis'>Gerir Fórum</small>
                            </div>
                        }
                    </NavLink>
                    <NavLink to="/admin/queixas" className={`nav-link d-flex align-items-center px-2  ${effectiveCollapsed ? 'justify-content-center' : 'my-2'}`}>
                        {!effectiveCollapsed && 
                            <div className='d-flex align-items-center'>
                                <i className="bi bi-megaphone fs-4 px-2"></i>
                                Queixas
                            </div>
                        }
                        {effectiveCollapsed && 
                            <div className='d-flex flex-column align-items-center m-0'>
                                <i className="bi bi-megaphone fs-4 px-2"></i>
                                <small className='text-truncate d-inline-block text-ellipsis'>Queixas</small>
                            </div>
                        }
                    </NavLink>
                    <hr />
                    <NavLink to="/admin/utilizadores" className={`nav-link d-flex align-items-center px-2  ${effectiveCollapsed ? 'justify-content-center' : 'my-2'}`}>
                        {!effectiveCollapsed && 
                            <div className='d-fl-center'>
                                <i className="bi bi-person fs-4 px-2"></i>
                                Gerir Utilizadores
                            </div>
                        }
                        {effectiveCollapsed && 
                            <div className='d-flex flex-column align-items-center m-0'>
                                <i className="bi bi-person fs-4 px-2"></i>
                                <small className='text-truncate d-inline-block text-ellipsis'>Gerir Utillizadores</small>
                            </div>
                        }
                    </NavLink>
                    <hr />
                    { <NavLink to="/admin/categorias" className={`nav-link d-flex align-items-center px-2  ${effectiveCollapsed ? 'justify-content-center' : 'my-2'}`}>
                        {!effectiveCollapsed && 
                            <div className='d-flex align-items-center'>
                                <i className="bi bi-tag fs-4 px-2"></i>
                            Categorias   
                            </div>
                        }
                        {effectiveCollapsed && 
                            <div className='d-flex flex-column align-items-center m-0'>
                                <i className="bi bi-tag fs-4 px-2"></i>
                                <small className='text-truncate d-inline-block text-ellipsis'>Categorias</small>
                            </div>
                        }
                    </NavLink>}
                </div>
                <div>
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

export default SidebarAdmin;
