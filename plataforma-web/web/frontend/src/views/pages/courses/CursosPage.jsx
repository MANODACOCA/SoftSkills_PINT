import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCursosDisponiveisParaInscricao } from '../../../api/cursos_axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";



const CursosPage = () => {
  const [courses, setCourses] = useState([]);

  const fetchCursosDisponiveisInscricao = async () => {
    try {
      const cursosDisponiveis = await getCursosDisponiveisParaInscricao();
      setCourses(cursosDisponiveis);
    } catch (error) {
      console.error('Erro ao encontrar cursos disponiveis para inscricao:', error);
    }
  }

  useEffect(() => {
    fetchCursosDisponiveisInscricao();
  }, []);


  
  return (
    <div className="enrolled-courses">
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h1 className='mb-0'>Cursos</h1>
      </div>
      <div className="">

      </div>
    </div>
  );
};

export default CursosPage;