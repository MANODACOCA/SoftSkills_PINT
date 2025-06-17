import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaLanguage } from 'react-icons/fa';
import { GrStatusGood } from "react-icons/gr";
import { VscError } from "react-icons/vsc";
import { useUser } from '../../../utils/userContext';
import { create_inscricoes } from '../../../api/inscricoes_axios';
import { update_cursos } from '../../../api/cursos_axios';
import './CardRegistration.css';

const EnrollmentCard = ({ course }) => {
  if (!course) return null;

  const duration = course.horas_curso || 0;

  const { user, setUser } = useUser();
  const [dadosInscricao, setDadosInscricao] = useState(null);
  const [inscrito, setInscrito] = useState(false);
  console.log(course);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (user && course) {

      const inscricaoData = ({
        id_formando: user.id_utilizador,
        id_curso: course.id_curso
      });

      setDadosInscricao(inscricaoData);
    }
  }, [user, course]);

  const handleSubmitInscricao = async () => {//vai realizar a inscricao
    if (!dadosInscricao) return;
    try {
      await create_inscricoes(dadosInscricao);

      const atualizarContador = (course.contador_formandos || 0) + 1;
      await update_cursos(course.id_curso, { contador_formandos: atualizarContador });

      setInscrito(true);
    } catch (error) {
      console.error("Erro ao realizar inscrição:", error);
    }
  }

  return (
    <div className="enrollment-card rounded-4">
      <img src={course.imagem} alt={`Imagem do curso ${course.nome_curso}`} className="card-img-top enrollment-image-vertical" />

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
          {course.sincrono && course.sincrono.numero_vagas <= course.contador_formandos ? (
            <button
              style={{ opacity: 1, pointerEvents: "none" }}
              className="btn btn-primary btn-lg w-100 rounded-4 bg-danger d-flex justify-content-center align-items-center gap-2"
              disabled
            >
              Curso Lotado <VscError />
            </button>
          ) : inscrito ? (
            <button
              style={{ opacity: 1, pointerEvents: "none" }}
              className="btn btn-primary btn-lg w-100 rounded-4 bg-success d-flex justify-content-center align-items-center gap-2"
              disabled
            >
              Inscrito <GrStatusGood />
            </button>
          ) : (
            <button
              className="btn btn-primary btn-lg w-100 rounded-4"
              onClick={handleSubmitInscricao}
            >
              Inscrever
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrollmentCard;