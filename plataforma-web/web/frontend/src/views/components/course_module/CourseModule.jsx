import React, { useEffect, useState } from 'react';
import {
  FaFileAlt,
  FaFilePowerpoint,
  FaFileExcel,
  FaFileImage,
  FaFilePdf,
  FaLink,
  FaFile,
  FaChevronDown,
  FaPlayCircle,
  FaDownload,
  FaChalkboardTeacher
} from 'react-icons/fa';
import { IoTimeSharp } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { BsFiletypeTxt } from "react-icons/bs";
import { parseDateWithoutTimezone } from '../shared_functions/FunctionsUtils';
import './CourseModule.css';



const iconMapById = {
  1: <FaFilePdf className="text-danger" />,
  2: <FaFilePowerpoint className="text-warning" />,
  3: <FaFileAlt className="text-success" />,
  4: <FaFileExcel className="text-success" />,
  5: <BsFiletypeTxt className="text-cyan-600" />,
  6: <FaFileImage className="text-pink-500" />,
  7: <FaLink className="text-blue-500" />,
};

const CourseModule = ({ module, index, aulaAtualId, usarAulaAtualId = false, onChangeAula, cursoTipo }) => {

  const [isExpanded, setIsExpanded] = useState(false);

  //seccao que trata das horas do curso e verificacoes
  let DataAtual = null;
  let DataInicioAula = null;
  let DataFimAula = null;

  if (module.dataAula) {
    DataAtual = new Date();
    DataInicioAula = parseDateWithoutTimezone(module.dataAula);
    DataFimAula = parseDateWithoutTimezone(module.dataAula);

    if (module.tempo_duracao) {
      const { hours = 0, minutes = 0, seconds = 0 } = module.tempo_duracao;

      DataFimAula.setHours(DataFimAula.getHours() + hours);
      DataFimAula.setMinutes(DataFimAula.getMinutes() + minutes);
      DataFimAula.setSeconds(DataFimAula.getSeconds() + seconds);
    }
  }
  //seccao que trata das horas do curso e verificacoes

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
        className={`w-100 text-start border-0 px-3 py-3 d-flex justify-content-between align-items-center rounded-4 ${usarAulaAtualId && module.id === aulaAtualId ? 'bg-secondary bg-opacity-75 text-white' : 'bg-light'}`}
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
              {DataFimAula < DataAtual && (
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
              {module.conteudo && DataAtual >= DataInicioAula && DataAtual <= DataFimAula && (
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
              {DataAtual < DataInicioAula && (
                <div className="text-white rounded-circle d-flex justify-content-center align-items-center p-0"
                  style={{ width: '32px', height: '32px', backgroundColor: '#3b5b84' }} onClick={(e) => {
                    e.stopPropagation();
                    onChangeAula();
                  }}>
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
          <div
            className="text-white rounded-5 p-3 d-flex flex-wrap justify-content-between align-items-center gap-3"
            style={{ backgroundColor: '#3b5b84' }}
          >
            {cursoTipo === 'sincrono' && (
              <div className="d-flex align-items-center gap-2">
                <MdDateRange size={20} />
                <div>
                  <strong>Data e hora da aula:</strong>{' '}
                  {module.dataAula.split('T')[0]} | {module.dataAula.split('T')[1].slice(0, 5)}
                </div>
              </div>
            )}

            <div className="d-flex align-items-center gap-2">
              <IoTimeSharp size={20} />
              <div>
                <strong>Duração:</strong>{' '}
                {module.tempo_duracao?.hours > 0
                  ? `${module.tempo_duracao.hours}:${String(module.tempo_duracao.minutes || 0).padStart(2, '0')}:${String(module.tempo_duracao.seconds || 0).padStart(2, '0')}`
                  : module.tempo_duracao?.minutes > 0
                    ? `${module.tempo_duracao.minutes}:${String(module.tempo_duracao.seconds || 0).padStart(2, '0')}`
                    : module.tempo_duracao?.seconds > 0
                      ? `${module.tempo_duracao.seconds}s`
                      : 'Tempo Inválido'}
              </div>
            </div>
          </div>

          <FaChevronDown className={`chevron-icon ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </button >

      {isExpanded && (
        <div className="bg-white border-top px-4 py-3 rounded-bottom-4">
          {module.aulas && module.aulas.length > 0 ? (
            <>
              <h6>Conteúdos da aula:</h6>
              <div className="list-group">
                {module.aulas.map((aula) => (
                  <a key={aula.id} href={aula.conteudo} target='blank' className='text-decoration-none'>
                    <div className="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-3">
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
            </>
          ) : (
            <p className="text-muted">Ainda não se encontram disponíveis conteúdos para esta aula.</p>
          )}
        </div>
      )}
    </div >
  );
};

export default CourseModule;
