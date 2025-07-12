import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import logo from '../../../../assets/images/logos/semfundo3.png';
import './Header.css';


const HeaderInicial = () => {
    return (
        <header className='w-100 p-3 d-flex justify-content-between align-items-center gap-4 border-bottom'>
            <div className="d-flex gap-4 ms-5">
                <Link to="/"><img src={logo} alt="logo softskills" height={45} /></Link>
            </div>
            <div className="d-flex gap-4 me-4">
                <Link to="/login/criar-conta" className="btn-outline-secundaria">
                    Registe-se
                </Link>
                <Link to="/login" className="btn btn-primary" style={{width:'150px',}}>
                    Login
                </Link>
            </div>
        </header>
    );
};

export default HeaderInicial;