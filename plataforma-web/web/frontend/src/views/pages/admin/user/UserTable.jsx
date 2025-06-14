import Table from "../../../components/table/Table";
import { columnsUtilizadores } from "../../../components/table/ColumnsUtilizadores";
import { useEffect, useState } from "react";
import { list_utilizador } from "../../../../api/utilizador_axios";

const UsersTables = () => {
    const [user, setuser] = useState([]);

    const FetchUtilizadores = async() => {
        try {
            const response = await list_utilizador();
            setuser(response.data);
        } catch(error) {
            console.log('Erro ao aceder a tabela de utilizador');
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
        FetchUtilizadores();
    }, [])

    return(
        <div>
            <Table columns={columnsUtilizadores} data={user} actions={renderActions} />
        </div>
    );
}

export default UsersTables;