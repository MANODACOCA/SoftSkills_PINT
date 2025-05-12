import React from 'react';
import logo from '../../../assets/images/logos/logo.png';
import './Footer.css'

//icons
import {
    BsFacebook,
    BsInstagram,
    BsTwitter,
    BsApple,
    BsLinkedin,
} from 'react-icons/bs';
import { BiLogoPlayStore } from "react-icons/bi";

const Footer = () => {
    return (
        <footer className="app-fotter bg-light border-top pt-5 pb-4">
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
                            <span className="fw-bold">SoftSkills</span>
                        </a>
                    </div>

                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-6 col-md-4 mb-3">
                                <h6 className="text-uppercase fw-bold">LINKS RÁPIDOS</h6>
                                <div className="d-flex flex-column">
                                    <a href="#">Cursos</a>
                                    <a href="#">Fórum</a>
                                    <a href="#">Notificações</a>
                                </div>
                            </div>
                            <div className="col-6 col-md-4 mb-3">
                                <h6 className="text-uppercase fw-bold">SUPORTE</h6>
                                <div className="d-flex flex-column">
                                    <a href="#"><span>Centro de Suporte</span></a>
                                    <a href="#"><span>Política de Privacidade</span></a>
                                </div>
                            </div>
                            <div className="col-6 col-md-4 mb-3">
                                <h6 className="text-uppercase fw-bold">DOWNLOAD DA NOSSA APP</h6>
                                <div className="d-flex flex-column gap-2">
                                    <a href="" className="btn btn-dark d-flex align-items-center gap-2">
                                        <BiLogoPlayStore /> Download na Play Store
                                    </a>
                                    <a href="" className="btn btn-dark d-flex align-items-center gap-2">
                                        <BsApple /> Download na App Store
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr />

                <div className="row align-items-center">
                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        <small>© 2025 SoftSkills™. Todos os direitos reservados.</small>
                    </div>
                    <div className="col-md-6 text-center text-md-end">
                        <div className="d-flex justify-content-center justify-content-md-end gap-3">
                            <a href="#"><BsFacebook size={20} /></a>
                            <a href="#"><BsInstagram size={20} /></a>
                            <a href="#"><BsTwitter size={20} /></a>
                            <a href="#"><BsLinkedin size={20} /></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;