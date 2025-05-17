import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import cursos from '../../../assets/images/carrousel/courses.svg';
import forum from '../../../assets/images/carrousel/forum_resized.png';
import './Carrousel.css';


const MyCarousel = ({ course }) => {

  if (!course) return null;

  return (
    <Carousel fade>

      <Carousel.Item className='bg-dark rounded-4 position-relative overflow-hidden'>
        <img className="carrousel-img-centered" src={cursos} alt="Slide" />
        <Carousel.Caption className='carousel-caption overlay-caption text-center'>
          <h1>Cursos</h1>
          <p>📚 Descubra nossos cursos e transforme seu futuro hoje!</p>
          <a href="#" className="btn btn-primary">
            <i className="bi bi-info-circle-fill"></i>&nbsp;&nbsp;Mais Informações
          </a>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className='bg-dark rounded-4 position-relative overflow-hidden'>
        <img className="carrousel-img-centered" src={forum} alt="Slide" />
        <Carousel.Caption className='carousel-caption overlay-caption text-center'>
          <h1>Forúm</h1>
          <p>🌐 Vem partilhar o teu conhecimento no nosso forúm!</p>
          <a href="#" className="btn btn-primary">
            <i className="bi bi-info-circle-fill"></i>&nbsp;&nbsp;Mais Informações
          </a>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className='bg-dark rounded-4 position-relative overflow-hidden'>
        <img className="carrousel-img-centered" src={course.imagem} alt="Slide" />
        <Carousel.Caption className='carousel-caption overlay-caption text-center'>
          <h1>{course.nome_curso}</h1>
          <p>🧠 Conhece o curso mais procurado na SoftSkills.</p>
          <a href="#" className="btn btn-primary">
            <i className="bi bi-info-circle-fill"></i>&nbsp;&nbsp;Mais Informações
          </a>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  );
};

export default MyCarousel;