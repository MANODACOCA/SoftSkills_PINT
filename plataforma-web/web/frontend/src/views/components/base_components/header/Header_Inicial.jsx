import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../../assets/images/logos/semfundo3.png';
import './Header.css';


const HeaderInicial = () => {
    const token = localStorage.getItem('token');


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

    return (
        <header className='w-100 p-3 d-flex justify-content-between align-items-center gap-4 border-bottom'>
            <div className="d-flex gap-4 ms-5">
                <Link to="/"><img src={logo} alt="logo softskills" height={45} /></Link>
            </div>
            {token && (
                <button onClick={handleClick} className="btn btn-primary me-4" style={{ width: '150px', }}>
                    Ir para a home
                </button>
            )}
            {!token && (
                <div className="d-flex gap-4 me-4">
                    <Link to="/login/criar-conta" className="btn-outline-secundaria">
                        Registe-se
                    </Link>
                    <Link to="/login" className="btn btn-primary" style={{ width: '150px', }}>
                        Login
                    </Link>
                </div>
            )}
        </header>
    );
};

export default HeaderInicial;