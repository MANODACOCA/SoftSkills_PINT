import Table from "../../../components/table/Table";
import { columnsCursos } from "../../../components/table/ColumnsCursos";
import { useEffect, useState } from "react";
import { getCourseAdminLista, update_cursos } from "../../../../api/cursos_axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const CourseTable = () => {
    const [cursos, setcursos] = useState([]);
    const navigate = useNavigate();
 
    const FetchCursos = async () => {
        try {
            const response = await getCourseAdminLista(); 
            setcursos(response);
        } catch(error) {
            console.log('Erro ao listar Cursos')
        }
    }
    
    const HandleEditCreate = async (id) => {
        //console.log(id);
        const result = await Swal.fire({
            title: id == null ? 'Tem a certeza que deseja adicionar curso?' : 'Tem a certeza que deseja editar curso?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            customClass: {
                confirmButton: 'btn btn-success me-2',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false,
        });

        if(result.isConfirmed) {
            if(id != null || id != undefined) {
                navigate(`/admin/cursos/editar/${id}`);
            } else {
                navigate(`/admin/cursos/criar`);
            }
        }  
    };

    const HandleUpdate = async (id, estado) => {
        const result = await Swal.fire({
            title: estado ? 'Deseja ocultar este curso?' : 'Deseja mostrar este curso?',
            text: estado ? 'O curso será escondido da lista!' : 'O curso será tornado visível novamente!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            customClass: {
                confirmButton: 'btn btn-success me-2',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        });

        if(result.isConfirmed){
            try{
                await update_cursos(id, {estado: !estado});
                await FetchCursos();
                console.log(estado);
                Swal.fire({
                    title: 'Sucesso',
                    text: `Curso ${estado ? 'ocultado' : 'visivel'} com sucesso`,
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                }); 
            } catch(error){
                Swal.fire({
                    title: 'Erro', 
                    text: 'Ocorreu um erro ao atualizar o curso', 
                    icon: 'error',
                    confirmButtonText: 'Fechar',
                    customClass: {
                        confirmButton: 'btn btn-danger',
                    },
                });
                console.error("Erro ao esconder curso", error);
            }
        }
    }

    const HandleCriarNovaOcorrencia = async (id) =>{
        try{
            const cursoAnterior = cursos.find((c) => c.id_curso === id);
            navigate(`/admin/cursos/criar`, {state: {cursoAnterior}});
        }catch(error){
            console.error("Erro ao inserir dados do curso anterior para nova ocorrencia", error);
        }
    }

    const renderActions = (item) => {
        return(
            <div className="d-flex">
                <button className="btn btn-outline-primary me-2" onClick={() => HandleEditCreate(item.id_curso)}>
                    <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-outline-danger me-2" onClick={() =>  HandleUpdate(item.id_curso, item.estado)}>
                    <i className={`bi ${item.estado ? "bi-eye" : "bi-eye-slash"}`}></i>
                </button>
                {item.estado === false && (
                    <button className="btn btn-outline-primary me-2" onClick={() => HandleCriarNovaOcorrencia(item.id_curso)}>
                        <i className="bi bi-plus-circle"></i>
                    </button>
                )}
            </div>
        );
    }

    useEffect(() => {
        FetchCursos();
    }, [])

    return(
        <div>
            <Table columns={columnsCursos} data={cursos} actions={renderActions} onAddClick={{callback: HandleEditCreate, label: 'Curso'}}/>
        </div>
    );
}

export default CourseTable;