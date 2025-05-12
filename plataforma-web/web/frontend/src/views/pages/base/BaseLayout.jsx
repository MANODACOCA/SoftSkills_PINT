import React, { useState } from 'react';
import { Outlet , useLocation , useNavigate , NavLink } from "react-router-dom";
import logo from '../../../assets/images/logos/semfundo3.png';
import Footer from '../../components/base_components/Footer';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="d-flex">
        <div className={`bg-light border-end ${collapsed ? 'collapsed' : ''} d-flex flex-column align-items-start p-2 sidebar p-3`}>
            <button className="btn btn-outline-secondary mb-3 w-100" onClick={toggleSidebar}>
                <i className={`${collapsed ? 'bi bi-list fs-5' : 'bi bi-x-lg fs-5'}`}></i>
            </button>
            <div className='d-flex justify-content-between flex-column vh-100 w-100'>
                <div>
                    <NavLink to="/" className="nav-link d-flex align-items-center px-2 py-1">
                        <i className="bi bi-house-door fs-4 px-2"></i>
                        {!collapsed && 'Home'}
                    </NavLink>
                    <hr />
                    <NavLink to="/cursos" className="nav-link d-flex align-items-center px-2 py-1">
                        <i className="bi bi-mortarboard fs-4 px-2"></i>
                        {!collapsed && 'Cursos'}
                    </NavLink>
                    <NavLink to="/cursos/inscritos" className="nav-link d-flex align-items-center px-2 py-1">
                        <i className="bi bi-laptop fs-4 px-2"></i>
                        {!collapsed && 'Cursos inscritos'}
                    </NavLink>
                    <NavLink to="/cursos/favoritos" className="nav-link d-flex align-items-center px-2 py-1">
                        <i className="bi bi-heart fs-4 px-2"></i>
                        {!collapsed && 'Cursos Favoritos'}
                    </NavLink>
                    <NavLink to="/cursos/terminados" className="nav-link d-flex align-items-center px-2 py-1">
                        <i className="bi bi-patch-check fs-4 px-2"></i>
                        {!collapsed && 'Cursos Terminados'}
                    </NavLink>
                    <hr />
                    <NavLink to="/forum" className="nav-link d-flex align-items-center px-2 py-1">
                        <i className="bi bi-chat-dots fs-4 px-2"></i>
                        {!collapsed && 'Fórum'}
                    </NavLink>
                    <hr />
                    <NavLink to="/notificacoes" className="nav-link d-flex align-items-center px-2 py-1">
                        <i className="bi bi-bell fs-4 px-2"></i>
                        {!collapsed && 'Notificações'}
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/definicoes" className="nav-link d-flex align-items-center px-2 py-1">
                        <i className="bi bi-gear fs-4 px-2"></i>
                        {!collapsed && 'Definições'}
                    </NavLink>
                    <NavLink to="/logout" className="nav-link d-flex align-items-center px-2 py-1">
                        <i className="bi bi-box-arrow-right fs-4 px-2"></i>
                        {!collapsed && 'Logout'}
                    </NavLink>  
                </div>
            </div>
        </div>
        <div className={`main-container ${collapsed ? 'collapsed' : ''} ms-auto`}>
            <header className='w-100 bg-light p-3 d-flex justify-content-between align-items-center'>
                <img src={logo} alt="logo softskills" height={45}/>
                <div>search</div>
                <div className="d-flex align-items-center me-5 gap-3">
                    <img src="https://static.vecteezy.com/ti/vetor-gratis/p1/9952572-foto-de-perfil-masculino-vetor.jpg" alt="Imagem perfil" width={45} height={45} className="image-border"/>
                    <div className="">
                        <p className="m-0">Nome</p>
                        <small>cargo</small>    
                    </div>
                </div>                
            </header>
            <div className="flex-grow-1 p-4" >
                <h3>Dashboard content for /star-wars</h3>
                <h3>Dashboard content for /star-wars</h3>
                <h3>Dashboard content for /star-wars</h3>
                <h3>Dashboard content for /star-wars</h3>
                <h3>Dashboard content for /star-wars</h3>
                <h3>Dashboard content for /star-wars</h3>
                <h3>Dashboard content for /star-wars</h3>
                <h3>Dashboard content for /star-wars</h3>
                <h3>Dashboard content for /star-wars</h3>
                <h3>Dashboard content for /star-wars</h3>
                <h3>Dashboard content for /star-wars</h3>
                <h3>Dashboard content for /star-wars</h3>
                <h3>Dashboard content for /star-wars</h3>
                <h3>Dashboard content for /star-wars</h3>
                <h3>Dashboard content for /star-wars</h3>
                <h3>Dashboard content for /star-wars</h3>
                <h3>Dashboard content for /star-wars</h3>
                <h3>Dashboard content for /star-wars</h3>
                <h3>Dashboard content for /star-wars</h3>
                <h3>Dashboard content for /star-wars</h3>
            </div>
            <Footer />
        </div>
    </div>
  );
};

export default Layout;

