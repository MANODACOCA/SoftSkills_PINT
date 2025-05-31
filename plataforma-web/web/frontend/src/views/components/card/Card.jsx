import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaCalendarAlt } from 'react-icons/fa';
import './Card.css';

const Card = ({ image, title, type, startDate, endDate, courseId, membrosAtual, membrosMax }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/cursos/${courseId}`);
  };

  return (
    <div
      className="card rounded-4 overflow-hidden card-clickable custom-card"
      onClick={handleClick}>
      <img src={image} className="card-img-top imgage-card" alt={`Imagem do curso ${title}`} />
      <div className="card-body p-3 d-flex flex-column justify-content-between fs-6">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h4 className="card-title mb-0">{title}</h4>
          <span className="badge  rounded-pill px-3 py-2 no-pointer custom-badge">
            {type}
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2 text-muted">
            <FaCalendarAlt /> <span>{startDate} - {endDate}</span>
          </div>
          {type === 'Síncrono' && (
            <div className="d-flex align-items-center gap-2 text-muted" >
              <FaUsers />
              <span>{membrosAtual} / {membrosMax}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
