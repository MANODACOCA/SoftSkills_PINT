import Table from "../../../components/table/Table";
import { columnsCursos } from "../../../components/table/ColumnsCursos";
import { useEffect, useState } from "react";
import { getCourseAdminLista } from "../../../../api/cursos_axios";

const CourseTable = () => {
    const [cursos, setcursos] = useState([]);

    const FetchCursos = async () => {
        try {
            const response = await getCourseAdminLista(); 
            setcursos(response);
            console.log(response);
        } catch(error) {
            console.log('Erro ao listar Cursos')
        }
    }

    const renderActions = (item) => {
        return(
            <>
                <button className="btn btn-outline-primary me-2" onClick={() => console.log('Editar', item.id)}>
                    <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-outline-danger" onClick={() => console.log('Deletar', item.id)}>
                    <i className="bi bi-trash"></i>
                </button>
            </>
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