import React from 'react';
import { FaCalendarAlt, FaClock, FaLanguage } from 'react-icons/fa';
import './CardRegistration.css';

const EnrollmentCard = ({ course, onEnroll }) => {
  if (!course) return null;

  const duration = course.horas_curso || 0;
  
  return (
    <div className="enrollment-card rounded-4">
          <img src={course.imagem} alt={`Imagem do curso ${course.nome_curso}`}className="card-img-top enrollment-image-vertical"/>
        
          <div className="card-body d-flex flex-column">
            <div className="enrollment-details">
              <div className="detail-row">
                <FaClock className="detail-icon" />
                <div>
                  <span className="detail-label">Duração:</span>
                  <span className="detail-value">{duration} horas</span>
                </div>
              </div>
              
              <div className="detail-row">
                <FaCalendarAlt className="detail-icon" />
                <div>
                  <span className="detail-label">Período:</span>
                  <span className="detail-value">
                    {new Date(course.data_inicio_curso).toLocaleDateString()} - {new Date(course.data_fim_curso).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="detail-row">
                <FaLanguage className="detail-icon" />
                <div>
                  <span className="detail-label">Idioma:</span>
                  <span className="detail-value">{course.idioma || "Português"}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-auto">
              <button className="btn btn-primary btn-lg w-100 rounded-4" onClick={() => onEnroll(course.id_curso)}>Inscrever</button>
            </div>
          </div>
       
      </div>
  );
};

export default EnrollmentCard;