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
  FaPlayCircle,
  FaDownload,
  FaChalkboardTeacher
} from 'react-icons/fa';
import { IoTimeSharp } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
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

const CourseModule = ({ module, index, aulaAtualId, usarAulaAtualId = false, onChangeAula, cursoTipo }) => {
  console.log(module);
  const [isExpanded, setIsExpanded] = useState(false);

  const getIconById = (id) => {
    return iconMapById[id] || <FaFile className="text-secondary" />;
  };

  useEffect(() => {
    if (usarAulaAtualId) {
      setIsExpanded(module.id === aulaAtualId);
    } else {
      setIsExpanded(false);
    }
  }, [aulaAtualId, module.id, usarAulaAtualId]);

  return (
    <div className="mb-3 border rounded-4 shadow-sm">
      <button
        className={`w-100 text-start border-0 px-3 py-3 d-flex justify-content-between align-items-center rounded-top-4 ${usarAulaAtualId && module.id === aulaAtualId ? 'bg-secondary bg-opacity-75 text-white' : 'bg-light rounded-bottom-4'}`}
        onClick={() => setIsExpanded(prev => !prev)}
      >
        <div className="d-flex align-items-center gap-3">
          {cursoTipo === 'assincrono' && (
            <div className="btn btn-primary rounded-circle d-flex justify-content-center align-items-center p-0"
              style={{ width: '32px', height: '32px' }}
              onClick={(e) => {
                e.stopPropagation();
                onChangeAula();
              }}>
              <FaPlayCircle />
            </div>
          )}
          {cursoTipo === 'sincrono' && (
            <>
              {new Date(module.dataAula) < new Date() && (
                <div className="bg-success text-white rounded-5 p-2 d-flex justify-content-between align-items-center gap-3"
                  style={{ backgroundColor: '#3b5b84' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChangeAula();
                  }}>
                  <div className='d-flex justify-content-between align-items-center gap-2'>
                    <FaChalkboardTeacher /><strong>Realizada</strong>
                  </div>
                </div>
              )}
              {new Date(module.dataAula) === new Date() && module.conteudo != null && (
                <a href={module.conteudo} target='blank' className='text-black text-decoration-none'>
                  <div className="btn btn-primary text-white rounded-5 p-2 d-flex justify-content-between align-items-center gap-3"
                    style={{ backgroundColor: '#3b5b84' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChangeAula();
                    }}>
                    <div className='d-flex justify-content-between align-items-center gap-2'>
                      <FaChalkboardTeacher /><strong>Participar</strong>
                    </div>
                  </div>
                </a>
              )}
              {new Date(module.dataAula) > new Date() && module.conteudo != null && (
                <div className="text-white rounded-circle d-flex justify-content-center align-items-center p-0"
                  style={{ width: '32px', height: '32px', backgroundColor: '#3b5b84' }}>
                  <FaChalkboardTeacher />
                </div>
              )}
            </>
          )}
          {cursoTipo === 'sincrono' && (
            <>
              <strong>{index + 1}. {module.title}</strong>
            </>
          )}
          {cursoTipo === 'assincrono' && (
            <strong>{index + 1}. {module.title}</strong>
          )}
        </div>
        <div className='d-flex justify-content-between align-items-center gap-4'>
          <div className="text-white rounded-5 p-2 d-flex justify-content-between align-items-center gap-3" style={{ backgroundColor: '#3b5b84' }}>
            {cursoTipo === 'sincrono' && (
              <div className='d-flex justify-content-between align-items-center gap-1'>
                <MdDateRange />
                <strong>{new Date(module.dataAula).toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</strong>
              </div>
            )}
            <div className='d-flex justify-content-between align-items-center gap-1'>
              <IoTimeSharp />
              <strong>
                {module.tempo_duracao?.hours > 0
                ? `${module.tempo_duracao.hours} : ${String(module.tempo_duracao.minutes || 0).padStart(2, '0')} : ${String(module.tempo_duracao.seconds || 0).padStart(2, '0')}`
                : module.tempo_duracao?.minutes > 0
                ? `${module.tempo_duracao.minutes} : ${String(module.tempo_duracao.seconds || 0).padStart(2, '0')}`
                : module.tempo_duracao?.seconds > 0
                ? `${module.tempo_duracao.seconds}`
                : `Tempo Inválido`
                } 
              </strong>
            </div>
          </div>
          <FaChevronDown className={`chevron-icon ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </button >

      {isExpanded && (
        <div className="bg-white border-top px-4 py-3 rounded-bottom-4">
          {module.aulas && module.aulas.length > 0 ? (
            <div className="list-group">
              {module.aulas.map((aula) => (
                <a href={aula.conteudo} target='blank' className='text-decoration-none'>
                  <div key={aula.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-3">
                    <div className="d-flex  align-items-center">
                      <span className="me-3 fs-5">
                        {getIconById(aula.tipo)}
                      </span>
                      <span>{aula.titulo}</span>
                    </div>
                    {usarAulaAtualId && (
                      <div className="d-flex justify-content-end align-items-end">
                        <span><FaDownload /></span>
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-muted">Ainda não se encontram disponíveis conteúdos para esta aula.</p>
          )}
        </div>
      )}
    </div >
  );
};

export default CourseModule;
