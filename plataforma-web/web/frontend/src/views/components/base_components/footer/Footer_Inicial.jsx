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
} from 'react-icons/bs';

const FooterIncial = () => {
    return (
        <footer className="app-fotter border-top pt-5 pb-4">
            <div className="container">
                <div className="row justify-content-between mb-4">
                    <div className="col-md-3 mb-3 text-center text-md-start">
                        <Link to="/">
                            <img
                                src={logo}
                                alt="Flowbite Logo"
                                height="50"
                                className="me-2"
                            />
                        </Link>
                    </div>

                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-6 col-md-8 mb-3">
                                <h6 className="text-uppercase fw-bold">CONTACTOS</h6>
                                <div className="d-flex flex-column">
                                    <h6><strong>Email:</strong> suporte@softinsa.com</h6>
                                    <h6><strong>Telefone:</strong> 213219600</h6>
                                    <h6><strong>Morada:</strong> Zona Industrial de Coimbrões 16b <br />
                                        3500-618 Viseu</h6>
                                </div>
                            </div>
                            <div className="col-6 col-md-4 mx-auto text-center">
                                <h6 className="text-uppercase fw-bold">DOWNLOAD DA NOSSA APP</h6>
                                <div className="d-flex flex-column gap-3">
                                    <img src='https://cdn-icons-png.flaticon.com/512/747/747470.png' alt="QRCODE" className="mx-auto" />
                                    <a href="https://play.google.com/store/games?hl=pt_PT" className="btn btn-dark rounded-4 gap-2">
                                        <BsDownload /> Clique para download
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

export default FooterIncial;