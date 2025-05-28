import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/images/logos/semfundo3.png';
import './Header.css';
import { IoIosArrowForward, IoIosFlag } from "react-icons/io";
import { GoKey } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { RxExit } from "react-icons/rx";

import FilterMenu from "../../components/filter_menu/filter_menu";


const Header = ({ toggleSidebar, collapsed }) => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showExplorarMenu, setShowExplorarMenu] = useState(false);
    const profileRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    return (
        <header className='w-100 p-3 d-flex justify-content-between align-items-center gap-4 border-bottom'>
            <div className="d-flex gap-4">
                <button className="btn btn-outline-secondary mx-2" onClick={toggleSidebar}>
                    <i className={`${collapsed ? 'bi bi-list fs-5' : 'bi bi-x-lg fs-5'}`}></i>
                </button>
                <Link to="/home"><img src={logo} alt="logo softskills" height={45} /></Link>
                {location.pathname ==='/cursos' && (
                    <div className="position-relative" onMouseEnter={() => setShowExplorarMenu(true)} onMouseLeave={() => setShowExplorarMenu(false)}>
                        <button className="btn btn-primary">
                            Explorar
                        </button>
                        {showExplorarMenu && (
                            <div className="position-absolute top-100 start-0">
                                <FilterMenu />
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="input-group d-none d-md-flex">
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

            <div className="d-flex align-items-center me-5 gap-3 position-relative" ref={profileRef}>
                <button onClick={toggleProfileMenu} className="btn p-0 border-0 bg-transparent d-flex align-items-center gap-2">
                    <img
                        src="https://static.vecteezy.com/ti/vetor-gratis/p1/9952572-foto-de-perfil-masculino-vetor.jpg"
                        alt="Imagem Perfil"
                        width={45}
                        height={45}
                        className="image-border rounded-circle"
                    />
                    <div className="text-start">
                        <p className="m-0">Diogo Oliveira</p>
                        <small>Formando</small>
                    </div>
                </button>

                {showProfileMenu && (
                    <div className="position-absolute top-100 end-0 profile-dropdown bg-white shadow-lg  p-3 mt-2 me-5 z-3">
                        <div className="d-flex flex-column align-items-center text-center">
                            <img
                                src="https://static.vecteezy.com/ti/vetor-gratis/p1/9952572-foto-de-perfil-masculino-vetor.jpg"
                                alt="Imagem Perfil"
                                width={100}
                                height={100}
                                className="image-border rounded-circle mb-3"
                            />
                            <h4>Diogo Oliveira</h4>
                            <h6>Formando</h6>
                            <p>dfso2013@gmail.com</p>
                        </div>
                        <hr />
                        <div className="d-flex flex-column align-items-center justify-content-between">
                            <Link className="dropdown-item" to={'/perfil/editar'}><CgProfile />Alterar dados pessoais<IoIosArrowForward /></Link>
                            <Link className="dropdown-item" to={'/cursos/terminados'}><IoIosFlag />Cursos Terminados<IoIosArrowForward /></Link>
                            <Link className="dropdown-item" to={'/info/login'}><GoKey />Informações de login<IoIosArrowForward /></Link>
                            <Link className="dropdown-item text-danger" to={''}><RxExit />Encerrar sessão<IoIosArrowForward /></Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
