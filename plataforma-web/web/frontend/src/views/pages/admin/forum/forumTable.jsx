import Table from "../../../components/table/Table";
import { useEffect, useState } from "react";
import { columnsForum } from "../../../components/table/ColumnsForum";
import { list_conteudos_partilhado } from "../../../../api/conteudos_partilhado_axios";

const ForumTable = () => {
    const [forum, setforum] = useState([]);

    const FetchForum = async () => {
        try {
            const response = await list_conteudos_partilhado();
            setforum(response);
            console.log(response);
        } catch(error) {
            console.log('Erro ao carregar os dados das queixas');
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
        FetchForum();
    },[])

    return(
        <div>
            <Table columns={columnsForum} data={forum} actions={renderActions} />
        </div>
    );
}

export default ForumTable;