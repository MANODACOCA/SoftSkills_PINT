//Card de destaque que vai ficar na homepage
import './CardHighlight.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCalendarAlt, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Img1 from '../../../assets/images/logos/comfundo.png';

const FeaturedCourseCard = ({
  image,
  title,
  description,
  startDate,
  endDate,
  instructor,
  instructorImage,
}) => {

  return (
    <div className="card flex-row p-3 rounded-4" style={{ backgroundColor: '#e8f0fb' }}>
      <img src={Img1} className="rounded-4" alt="imagem curso" style={{ width: '280px', height: 'auto', objectFit: 'cover' }} />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title fw-bold">{'Geração de Videos com Inteligência Artificial'}</h5>
          <p className="card-text text-muted" style={{ whiteSpace: 'pre-line' }}>
                    {'Explore o pontecial da IA generativa para criar videos incriveis!\nGere videos em diversos estilos e formatos'}</p>
          <div className="d-flex align-items-center mb-2">
            <FaCalendarAlt className="me-2 text-secondary" />
            <span>{'22 Dez'} - {'14 Jan'}</span>
          </div>
          <div className="d-flex align-items-center mb-2">
            <img src={Img1} alt="instrutor" className="rounded-circle me-2" style={{ width: '32px', height: '32px' }} />
            <span>{'Kevin Gilbert'}</span>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <div className="d-flex align-items-center">
          </div>
          <button className="btn btn-primary px-4 rounded-4">Detalhes</button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourseCard;