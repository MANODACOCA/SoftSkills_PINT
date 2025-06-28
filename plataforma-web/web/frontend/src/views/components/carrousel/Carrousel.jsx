import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import cursos from '../../../assets/images/carrousel/courses.svg';
import forum from '../../../assets/images/carrousel/forum_resized.png';
import './Carrousel.css';


const MyCarousel = ({ course }) => {

  const [img, setImg] = useState(course.imagem);

  const handleError = () => {
    const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(course.nome_curso)}&background=random&bold=true`;
    setImg(fallback);
  };

  return (
    <Carousel fade>

      <Carousel.Item className='bg-dark rounded-4 position-relative overflow-hidden'>
        <img className="carrousel-img-centered" src={cursos} alt="Slide" />
        <Carousel.Caption className='carousel-caption overlay-caption text-center'>
          <h1>Cursos</h1>
          <p>📚 Descubra nossos cursos e transforme seu futuro hoje!</p>
          <Link to="/cursos" className='btn btn-primary'><i className="bi bi-info-circle-fill"></i>&nbsp;&nbsp;Mais Informações</Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='bg-dark rounded-4 position-relative overflow-hidden'>
        <img className="carrousel-img-centered" src={forum} alt="Slide" />
        <Carousel.Caption className='carousel-caption overlay-caption text-center'>
          <h1>Forúm</h1>
          <p>🌐 Vem partilhar o teu conhecimento no nosso forúm!</p>
          <Link to="/forum" className='btn btn-primary'><i className="bi bi-info-circle-fill"></i>&nbsp;&nbsp;Mais Informações</Link>
        </Carousel.Caption>
      </Carousel.Item>

      {course && (
        <Carousel.Item className='bg-dark rounded-4 position-relative overflow-hidden'>
          <img
            src={img ? img : `https://ui-avatars.com/api/?name=${encodeURIComponent(course.nome_curso)}&background=random&bold=true`}
            className="carrousel-img-centered"
            alt={`Imagem Slide de Curso`}
            onError={handleError}
          />
          <Carousel.Caption className='carousel-caption overlay-caption text-center'>
            <h1>{course.nome_curso}</h1>
            <p>🧠 Conhece o curso mais procurado na SoftSkills.</p>
            <Link to={`/cursos/${course.id_curso}`} className='btn btn-primary'>  <i className="bi bi-info-circle-fill"></i>&nbsp;&nbsp;Mais Informações</Link>
          </Carousel.Caption>
        </Carousel.Item>
      )}
    </Carousel>
  );
};

export default MyCarousel;