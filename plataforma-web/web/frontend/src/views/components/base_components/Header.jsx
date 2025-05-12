import React from "react";
import logo from '../../../assets/images/logos/semfundo3.png';
import './Header.css';

const Header = ({ toggleSidebar, collapsed }) => {
    return (
        <header className='w-100 bg-light p-3 d-flex justify-content-between align-items-center gap-4'>
            <div className="d-flex gap-4">
                <button className="btn btn-outline-secondary mx-2" onClick={toggleSidebar}>
                    <i className={`${collapsed ? 'bi bi-list fs-5' : 'bi bi-x-lg fs-5'}`}></i>
                </button>
                <img src={logo} alt="logo softskills" height={45} />     
            </div>
            <div className="input-group" style={{ maxWidth: '500px' }}>
                <input
                    className="form-control form-control-md"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                />
                <button className="btn btn-primary btn-sm" type="submit">
                    <i className="bi bi-search"></i>
                </button>
            </div>
            <div className="d-flex align-items-center me-5 gap-3">
                <img src="https://static.vecteezy.com/ti/vetor-gratis/p1/9952572-foto-de-perfil-masculino-vetor.jpg" alt="Imagem perfil" width={45} height={45} className="image-border" />
                <div className="">
                    <p className="m-0">Nome</p>
                    <small>cargo</small>
                </div>
            </div>
        </header>
    );
};

export default Header;