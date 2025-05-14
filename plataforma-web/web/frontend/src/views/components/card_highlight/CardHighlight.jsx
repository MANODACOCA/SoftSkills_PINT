//Card de destaque que vai ficar na homepage
import './CardHighlight.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Img1 from '../../../assets/images/logos/comfundo.png';

const FeaturedCourseCard = ({ image, title, description, startDate, endDate, instructor, instructorImage, courseId }) => {
  const navigate = useNavigate();

  const goToCourse = () => {
    navigate(`/curso/${courseId}`);
  };

  return (
    <div className="card flex-row rounded-4 card-highlight">
      <img src={Img1} className="rounded-4 highlight-image" alt="imagem curso" />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h4 className="card-title">{'Geração de Videos com Inteligência Artificial'}</h4>
          <p className="card-text text-muted fs-4 truncate-text">
            {'Explore o pontecial da IA generativa para criar videos incriveis! Gere videos em diversos estilos e formatos Explore o pontecial da IA generativa para criar videos incriveis! Gere videos em diversos estilos e formatos Explore o pontecial da IA generativa para criar videos incriveis! Gere videos em diversos estilos e formatos'}</p>
          <p className="card-text text-muted mb-0 fs-6">
            📅 {'10 Dez'} - {'15 Jan'}
          </p>
          <div className="d-flex align-items-center mb-2">
            <img src={Img1} alt="instrutor" className="rounded-circle me-2 avatar" />
            <span>{'Kevin Gilbert'}</span>
          </div>
        </div>
        <div className="mt-2">
          <button className="btn btn-primary px-4 rounded-4" onClick={goToCourse} >Detalhess</button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourseCard;