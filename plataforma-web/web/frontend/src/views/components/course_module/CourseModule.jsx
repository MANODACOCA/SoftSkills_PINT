import React, { useEffect, useState } from 'react';
import {
  FaVideo,
  FaFileAlt,
  FaFilePowerpoint,
  FaFileImage,
  FaFileAudio,
  FaFilePdf,
  FaLink,
  FaFile,
  FaChevronDown,
  FaInfoCircle,
  FaPlayCircle
} from 'react-icons/fa';
import { IoTimeSharp } from "react-icons/io5";
import './CourseModule.css';


const iconMapById = {
  1: <FaVideo className="text-primary" />,
  2: <FaFilePdf className="text-danger" />,
  3: <FaFilePowerpoint className="text-warning" />,
  4: <FaFileAlt className="text-success" />,
  5: <FaFileImage className="text-pink-500" />,
  6: <FaFileAudio className="text-indigo-500" />,
  7: <FaInfoCircle className="text-cyan-600" />,
  8: <FaLink className="text-blue-500" />,
};

const CourseModule = ({ module, index, aulaAtualId }) => {



  const [isExpanded, setIsExpanded] = useState(false);

  const getIconById = (id) => {
    return iconMapById[id] || <FaFile className="text-secondary" />;
  };

  useEffect(() => {
    if (module.id === aulaAtualId) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [aulaAtualId, module.id]);

  return (
    <div className="mb-3 border rounded-4 shadow-sm">
      <button
        className="w-100 text-start bg-light border-0 px-3 py-3 d-flex justify-content-between align-items-center rounded-top-4 rounded-bottom-4"
        onClick={() => setIsExpanded(prev => !prev)}
      >
        <div className="d-flex align-items-center gap-3">
          <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: '32px', height: '32px' }}>
            <FaPlayCircle />
          </div>
          <strong>{index + 1}. {module.title}</strong>
        </div>
        <div className='d-flex justify-content-between align-items-center gap-4'>
          <div className="bg-primary text-white rounded-5 p-2 d-flex align-items-center gap-1">
            <IoTimeSharp />
            <strong>{module.tempo_duracao.minutes}min</strong>
          </div>
          <FaChevronDown className={`chevron-icon ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isExpanded && (
        <div className="bg-white border-top px-4 py-3 rounded-bottom-4">
          {module.aulas && module.aulas.length > 0 ? (
            <div className="list-group">
              {module.aulas.map((aula) => (
                <div key={aula.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-3">
                  <div className="d-flex align-items-center">
                    <span className="me-3 fs-5">
                      {getIconById(aula.tipo)}
                    </span>
                    <span>{aula.titulo}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">Ainda não se encontram disponíveis conteúdos para esta aula.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseModule;
