import Table from "../../../components/table/Table";
import { columnsCursos } from "../../../components/table/ColumnsCursos";
import { useEffect, useState } from "react";
import { getCourseAdminLista, update_cursos } from "../../../../api/cursos_axios";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
    const [cursos, setcursos] = useState([]);
    const navigate = useNavigate();
    
    const FetchCursos = async () => {
        try {
            const response = await getCourseAdminLista(); 
            setcursos(response);
            console.log(response);
        } catch(error) {
            console.log('Erro ao listar Cursos')
        }
    }
    
    const HandleEdit = (id) => {
        navigate(`/cursos/editar/${id}`);
    };

    const HandleUpdate = async (id, estado) => {
        try{
            console.log(estado);
            await update_cursos(id, {estado: !estado});
            FetchCursos();
        } catch(error){
            console.error("Erro ao esconder curso", error);
        }
    }

    const renderActions = (item) => {
        return(
            <div className="d-flex">
                <button className="btn btn-outline-primary me-2" onClick={() => HandleEdit(item.id_curso)}>
                    <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-outline-danger" onClick={() =>  HandleUpdate(item.id_curso, item.estado)}>
                    <i className={`bi ${item.estado ? "bi-eye" : "bi-eye-slash"}`}></i>
                </button>
            </div>
        );
    }

    useEffect(() => {
        FetchCursos();
    }, [])

    return(
        <div>
            <Table columns={columnsCursos} data={cursos} actions={renderActions} />
        </div>
    );
}

export default CourseTable;