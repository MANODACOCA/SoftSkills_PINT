import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';
import Img1 from '../../../assets/images/logos/comfundo.png';

const Card = ({ image, title, type, startDate, endDate, courseId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/curso/${courseId}`);
  };

  return (
    <div
      className="card shadow-sm rounded-4 overflow-hidden card-clickable"
      style={{ width: '20rem', height: '16rem', cursor: 'pointer' }}
      onClick={handleClick}
    >
      <img
        src={Img1} className="card-img-top imgage-card" alt={`Imagem do curso ${title}`}/>
      <div className="card-body p-3 d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h3 className="card-title mb-0">{'Curso C++'}</h3>
          <span className="badge  rounded-pill px-3 py-2 no-pointer custom-badge">
            {'Assíncrono'}
          </span>
        </div>
        <p className="card-text text-muted mb-0 small">
          📅 {'10 Dez'} - {'15 Jan'}
        </p>
      </div>
    </div>
  );
};

export default Card;
