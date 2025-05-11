import React from 'react';
import logo from '../../../assets/images/logos/logo.png';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from 'react-icons/bs';

export default function Header() {
  return (
    <header className="bg-light border-bottom py-4">
      <Container>
        <Row className="align-items-center">
          <Col md={3} className="text-center text-md-start mb-3 mb-md-0">
            <a href="COLOCAR ALGO" className="d-inline-flex align-items-center text-decoration-none">
              <img
                src={logo}
                alt="Logo"
                height="30"
                className="me-2"
              />
              <span className="fw-bold">SoftSkills</span>
            </a>
          </Col>

          <Col md={6} className="mb-3 mb-md-0">
            <Row>
              <Col>
                <h6 className="text-uppercase fw-bold">LINKS RÁPIDOS</h6>
                <Nav className="flex-column">
                  <Nav.Link href="#">Cursos</Nav.Link>
                  <Nav.Link href="#">Fórum</Nav.Link>
                  <Nav.Link href="#">Notificações</Nav.Link>
                </Nav>
              </Col>
              <Col>
                <h6 className="text-uppercase fw-bold">SUPORTE</h6>
                <Nav className="flex-column">
                  <Nav.Link href="#">Centro de Suporte</Nav.Link>
                  <Nav.Link href="#">Politica de Privacidade</Nav.Link>
                </Nav>
              </Col>
              <Col>
                <h6 className="text-uppercase fw-bold">SUPORTE</h6>
                <Nav className="flex-column">
                  <Nav.Link href="#">Centro de Suporte</Nav.Link>
                  <Nav.Link href="#">Politica de Privacidade</Nav.Link>
                </Nav>
              </Col>
            </Row>
          </Col>

          <Col md={3} className="text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a href="#"><BsFacebook size={20} /></a>
              <a href="#"><BsInstagram size={20} /></a>
              <a href="#"><BsTwitter size={20} /></a>
              <a href="#"><BsGithub size={20} /></a>
              <a href="#"><BsDribbble size={20} /></a>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
}
