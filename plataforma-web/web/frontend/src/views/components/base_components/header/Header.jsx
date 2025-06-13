import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { debounce } from 'lodash';
import logo from '../../../../assets/images/logos/semfundo3.png';
import './Header.css';
import { IoIosArrowForward, IoIosFlag } from "react-icons/io";
import { GoKey } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { RxExit } from "react-icons/rx";
import { useUser } from '../../../../utils/userContext';

const Header = ({ toggleSidebar, collapsed }) => {
    const { user } = useUser();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileRef = useRef(null);

    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
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

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchParam = params.get('search') || '';
        setSearchTerm(searchParam);
    }, [location.search]);

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    const handleFocus = () => {
        if (location.pathname !== '/cursos') {
            navigate('/cursos');
        }
    };

    const debouncedNavigate = debounce((value) => {
        const params = new URLSearchParams(location.search);
        if (value) {
            params.set("search", value);
        } else {
            params.delete("search");
        }
        navigate(`${location.pathname}?${params.toString()}`);
    }, 300);

    if (!user) {
        return (
            <header className="w-100 p-3 border-bottom text-center">
            </header>
        );
    }

    return (
        <header className='w-100 p-3 d-flex justify-content-between align-items-center gap-4 border-bottom'>
            <div className="d-flex gap-4">
                <button className="btn btn-outline-secondary mx-2 hide" onClick={toggleSidebar}>
                    <i className={`${collapsed ? 'bi bi-list fs-5' : 'bi bi-x-lg fs-5'}`}></i>
                </button>
                <Link to="/home"><img src={logo} alt="logo softskills" height={45} /></Link>
            </div>

            <input
                className="input-group d-none d-md-flex form-control form-control-md"
                type="search"
                placeholder="Pesquisar curso"
                aria-label="Pesquisar"
                value={searchTerm}
                onChange={(e) => {
                    const value = e.target.value;
                    setSearchTerm(value);
                    debouncedNavigate(value);
                }}
                onFocus={handleFocus}
            />

            {user && (
                <div className="d-flex align-items-center me-5 gap-3 position-relative" ref={profileRef}>
                    <button onClick={toggleProfileMenu} className="btn p-0 border-0 bg-transparent d-flex align-items-center gap-2">
                        <img
                            src={
                                user.img_perfil ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nome_utilizador)}&background=random&bold=true`
                            }
                            alt="Imagem Perfil"
                            width={45}
                            height={45}
                            className="image-border rounded-circle"
                        />
                        <div className="text-start">
                            <p className="m-0">{user.nome_utilizador}</p>
                            <small>Formando</small>
                        </div>
                    </button>

                    {showProfileMenu && (
                        <div className="position-absolute top-100 end-0 profile-dropdown bg-white shadow-lg p-3 mt-2 z-3">
                            <div className="d-flex flex-column align-items-center text-center">
                                <img
                                    src={
                                        user.img_perfil ||
                                        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nome_utilizador)}&background=random&bold=true`
                                    }
                                    alt="Imagem Perfil"
                                    width={100}
                                    height={100}
                                    className="image-border rounded-circle mb-3"
                                />
                                <h4>{user.nome_utilizador}</h4>
                                <h6>Formando</h6>
                                <p>{user.email}</p>
                            </div>
                            <hr />
                            <div className="d-flex flex-column align-items-center justify-content-between">
                                <Link className="dropdown-item" to={'/perfil/editar'} onClick={() => setShowProfileMenu(false)}><CgProfile /> Alterar dados pessoais <IoIosArrowForward /></Link>
                                <Link className="dropdown-item" to={'my/cursos/terminados'} onClick={() => setShowProfileMenu(false)}><IoIosFlag /> Cursos Terminados <IoIosArrowForward /></Link>
                                <Link className="dropdown-item" to={'/perfil/info'} onClick={() => setShowProfileMenu(false)}><GoKey /> Informações de login <IoIosArrowForward /></Link>
                                <Link className="dropdown-item text-danger" to="/login" onClick={() => { localStorage.removeItem('token'); setShowProfileMenu(false); }}><RxExit /> Encerrar sessão <IoIosArrowForward /></Link>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;