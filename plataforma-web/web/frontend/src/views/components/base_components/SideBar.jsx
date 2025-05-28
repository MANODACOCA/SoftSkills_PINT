import React from 'react';
import { NavLink } from "react-router-dom";
import './Sidebar.css';

const Sidebar = ({ toggleSidebar, collapsed }) => {

    return (
        <div className={`border-end ${collapsed ? 'collapsed' : ''} d-flex flex-column align-items-start p-3 sidebar`}>
            <div className='d-flex justify-content-between flex-column vh-100 w-100'>
                <div>
                    <NavLink to="/home" className="nav-link d-flex align-items-center px-2 py-1">
                        <i className="bi bi-house-door fs-4 px-2"></i>
                        {!collapsed && 'Home'}
                    </NavLink>
                    <hr />
                    <NavLink to="/cursos" end className="nav-link d-flex align-items-center px-2 py-1">
                        <i className="bi bi-mortarboard fs-4 px-2"></i>
                        {!collapsed && 'Cursos'}
                    </NavLink>
                    <NavLink to="/cursos/inscritos" className="nav-link d-flex align-items-center px-2 py-1">
                        <i className="bi bi-laptop fs-4 px-2"></i>
                        {!collapsed && 'Cursos inscritos'}
                    </NavLink>
                   {/*  <NavLink to="/cursos/favoritos" className="nav-link d-flex align-items-center px-2 py-1">
                        <i className="bi bi-heart fs-4 px-2"></i>
                        {!collapsed && 'Cursos Favoritos'}
                    </NavLink> */}
                    <NavLink to="/cursos/terminados" className="nav-link d-flex align-items-center px-2 py-1">
                        <i className="bi bi-patch-check fs-4 px-2"></i>
                        {!collapsed && 'Cursos Terminados'}
                    </NavLink>
                    <hr />
                    <NavLink to="/forum" className="nav-link d-flex align-items-center px-2 py-1">
                        <i className="bi bi-chat-dots fs-4 px-2"></i>
                        {!collapsed && 'Fórum'}
                    </NavLink>
                    {/* <hr />
                    <NavLink to="/notificacoes" className="nav-link d-flex align-items-center px-2 py-1">
                        <i className="bi bi-bell fs-4 px-2"></i>
                        {!collapsed && 'Notificações'}
                    </NavLink> */}
                </div>
                <div>
                    <NavLink to="/definicoes" className="nav-link d-flex align-items-center px-2 py-1">
                        <i className="bi bi-gear fs-4 px-2"></i>
                        {!collapsed && 'Definições'}
                    </NavLink>
                    <NavLink to="/login" className="nav-link d-flex align-items-center px-2 py-1">
                        <i className="bi bi-box-arrow-right fs-4 px-2 text-danger"></i>
                        <span className='text-danger'>{!collapsed && 'Logout'}</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
