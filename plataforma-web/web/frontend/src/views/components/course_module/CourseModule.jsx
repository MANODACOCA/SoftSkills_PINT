import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaVideo, FaFileAlt, FaQuestion } from 'react-icons/fa';

const CourseModule = ({ module, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getIconByType = (tipo) => {
    switch (tipo) {
      case 'video': return <FaVideo className="text-primary" />;
      case 'documento': return <FaFileAlt className="text-success" />;
      case 'quiz': return <FaQuestion className="text-warning" />;
      default: return <FaFileAlt className="text-secondary" />;
    }
  };

 return (
    <div className="mb-3 border rounded-4 shadow-sm">
      
      <button 
        className="w-100 text-start bg-light border-0 px-3 py-3 d-flex justify-content-between align-items-center rounded-top-4"
        onClick={() => setIsExpanded(prev => !prev)}
      >
        <div className="d-flex align-items-center gap-3">
          <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: '32px', height: '32px' }}>
            {index + 1}
          </div>
          <strong>{module.title}</strong>
        </div>
        <FaChevronDown className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      {/* Conteúdo do módulo (exibido quando expandido) */}
      {isExpanded && (
        <div className="bg-white border-top px-4 py-3">

          {module.aulas && module.aulas.length > 0 ? (
            <div className="list-group">
              {module.aulas.map((aula) => (
                <div key={aula.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-3">
                  <div className="d-flex align-items-center">
                    <span className="me-3 fs-5">
                      {getIconByType(aula.tipo)}
                    </span>
                    <span>{aula.titulo}</span>
                  </div>
                  <span className="badge bg-light text-dark">{aula.duracao}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">Não há aulas disponíveis neste módulo.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseModule;
