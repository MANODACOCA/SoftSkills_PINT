import React from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import './login.css'

//slide images
import slide1 from '../../../assets/images/carrousel-login/1.jpg';
import slide2 from '../../../assets/images/carrousel-login/2.jpg';
import slide3 from '../../../assets/images/carrousel-login/3.jpg';


//componets
import FirstLogin from '../../components/login/firstLogin/firstLogin'

const LoginPage = () => {
    const slides = [
        { id: 'slide-1', src: slide1 },
        { id: 'slide-2', src: slide2 },
        { id: 'slide-3', src: slide3 },
    ];

    return (
        <Container fluid className='login-page p-0'>
            <Row className="w-100 h-100 m-0">
                <Col md={6} className="carousel-col d-none d-md-block p-0">
                    <Carousel controls={false} indicators={false} interval={2000} fade>
                        {slides.map((slide, index) => (
                            <Carousel.Item key={slide.id}>
                                <img
                                    className="carrousel-img d-block w-100"
                                    src={slide.src}
                                    alt={`Slide ${index + 1}`}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
                <Col md={6} className="d-flex flex-column justify-content-center align-items-center">
                   <FirstLogin/>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
