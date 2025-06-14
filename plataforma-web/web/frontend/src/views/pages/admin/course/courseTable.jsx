import Table from "../../../components/table/Table";
import { columnsCursos } from "../../../components/table/ColumnsCursos";

const CourseTable = () => {

    const cursos = [
    {
        id: 1,
        nome: 'React Avançado',
        tipo: 'Online',
        datas: '01/07 - 15/07',
        formador: 'João Silva',
        vagas: 20,
        estado: 'Concluído'
    },
    {
        id: 2,
        nome: 'Node.js Básico',
        tipo: 'Presencial',
        datas: '10/08 - 20/08',
        formador: 'Maria Lima',
        vagas: 15,
        estado: 'Aberto'
    },
    {
        id: 1,
        nome: 'React Avançado',
        tipo: 'Online',
        datas: '01/07 - 15/07',
        formador: 'João Silva',
        vagas: 20,
        estado: 'Concluído'
    },
    {
        id: 2,
        nome: 'Node.js Básico',
        tipo: 'Presencial',
        datas: '10/08 - 20/08',
        formador: 'Maria Lima',
        vagas: 15,
        estado: 'Aberto'
    }
    ];

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

    return(
        <div>
            <Table columns={columnsCursos} data={cursos} actions={renderActions} />
        </div>
    );
}

export default CourseTable;