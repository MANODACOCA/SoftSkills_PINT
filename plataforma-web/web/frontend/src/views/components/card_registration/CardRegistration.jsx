import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaLanguage } from 'react-icons/fa';
import { GrStatusGood } from "react-icons/gr";
import { VscError } from "react-icons/vsc";
import { useUser } from '../../../utils/useUser';
import { create_inscricoes, get_inscricoes } from '../../../api/inscricoes_axios';
import { update_cursos } from '../../../api/cursos_axios';
import ISO6391 from 'iso-639-1';
import Swal from 'sweetalert2';
import './CardRegistration.css';


const EnrollmentCard = ({ course, onContadorUpdate }) => {

  const navigate = useNavigate();

  if (!course) return null;

  const duration = course.horas_curso || 0;

  const { user, setUser } = useUser();
  const [dadosInscricao, setDadosInscricao] = useState(null);
  const [inscrito, setInscrito] = useState(false);

  const [img, setImg] = useState(course?.imagem);

  const handleError = () => {
    const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(course.nome_curso)}&background=random&bold=true`;
    setImg(fallback);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user && course) {

      const inscricaoData = ({
        id_formando: user.id_utilizador,
        id_curso: course.id_curso
      });

      setDadosInscricao(inscricaoData);
      checkInscricao(user?.id_utilizador, course?.id_curso);
    }
  }, [user, course]);


  const checkInscricao = async (id_utilizador, id_curso) => {
    try {
      await get_inscricoes(id_utilizador, id_curso);
      setInscrito(true);
    } catch (error) {
      console.error("Erro ao buscar inscrição:", error);
    }
  }

  const handleSubmitInscricao = async () => {//vai realizar a inscricao
    if (!dadosInscricao) return;
    try {
      Swal.fire({
        title: "Tens a certeza de que queres inscrever-te no curso?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, inscrever-me!",
        cancelButtonText: "Cancelar",
        customClass: {
          confirmButton: 'btn btn-success me-2',
          cancelButton: 'btn btn-danger',
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          await create_inscricoes({
            ...dadosInscricao,
            nome_formando: user?.nome_utilizador,
            destinatario: user?.email,
            nome_curso: course?.nome_curso,
            data_inicio: new Date(course.data_inicio_curso).toLocaleDateString()
          });

          const atualizarContador = (course.contador_formandos || 0) + 1;
          await update_cursos(course.id_curso, { contador_formandos: atualizarContador });

          if (typeof onContadorUpdate === 'function') {//vai dar update do contador de formandos
            onContadorUpdate();
          }

          setInscrito(true);
          Swal.fire({
            title: "Inscrito com sucesso!",
            icon: "success",
            timer: 3000,
            showConfirmButton: false
          });
        }
      });

    } catch (error) {
      console.error("Erro ao realizar inscrição:", error);
    }
  }

  return (
    <div className="enrollment-card rounded-4">
      <img src={img ? img : `https://ui-avatars.com/api/?name=${encodeURIComponent(course.nome_curso)}&background=random&bold=true`}
        alt={`Imagem do curso ${course.nome_curso}`}
        className="card-img-top enrollment-image-vertical"
        onError={handleError}
      />

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
              <span className="detail-value">{ISO6391.getNativeName(course.idioma)}</span>
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
              style={{ opacity: 1 }}
              className="btn btn-primary btn-lg w-100 rounded-4 bg-success d-flex justify-content-center align-items-center gap-2"
              onClick={() => navigate(`/my/cursos/inscritos/curso/${course.id_curso}?tab=aulas`)}
            >
              <GrStatusGood /> Inscrito - Ir para o curso
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