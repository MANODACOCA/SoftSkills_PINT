import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/images/logos/semfundo3.png';
import './Footer.css'

//icons
import {
    BsFacebook,
    BsInstagram,
    BsTwitter,
    BsLinkedin,
    BsDownload,
} from 'react-icons/bs';//icons

const FooterAdmin = () => {
    return (
        <footer className="app-fotter border-top pt-5 pb-4">
            <div className="container">
                <div className="row justify-content-between mb-4">
                    <div className="col-md-3 mb-3 text-center text-md-start">
                        <a
                            href="https://softskills.com"
                            className="d-inline-flex align-items-center text-decoration-none"
                        >
                            <img
                                src={logo}
                                alt="Flowbite Logo"
                                height="50"
                                className="me-2"
                            />
                        </a>
                    </div>

                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-6 col-md-4 mb-3">
                                <h6 className="text-uppercase fw-bold">LINKS RÁPIDOS</h6>
                                <div className="d-flex flex-column">
                                    <Link to="/cursos">Cursos</Link>
                                    <Link to="/forum">Fórum</Link>
                                    {/*                                      <Link>Notificações</Link> */}
                                </div>
                            </div>
{/*                             <div className="col-6 col-md-4 mb-3">
                                <h6 className="text-uppercase fw-bold">SUPORTE</h6>
                                <div className="d-flex flex-column">
                                    <a href="#"><span>Centro de Suporte</span></a>
                                    <a href="#"><span>Política de Privacidade</span></a>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

                <hr />

                <div className="row align-items-center">
                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        <small>© 2025 SoftSkills™. Todos os direitos reservados.</small>
                    </div>
                    <div className="col-md-6 text-center text-md-end">
                        <div className="d-flex justify-content-center justify-content-md-end gap-4">
                            <a href="https://www.facebook.com/Softinsa/?locale=pt_PT" target='blank'><BsFacebook size={20} /></a>
                            <a href="https://www.instagram.com/softinsa/" target='blank'><BsInstagram size={20} /></a>
                            <a href="https://www.linkedin.com/company/softinsa/?originalSubdomain=pt" target='blank'><BsLinkedin size={20} /></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default FooterAdmin;