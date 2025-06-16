import Table from "../../../components/table/Table";
import { columnsUtilizadores } from "../../../components/table/ColumnsUtilizadores";
import { useEffect, useState } from "react";
import { delete_utilizador, list_utilizador } from "../../../../api/utilizador_axios";
import { useNavigate } from "react-router-dom";

const UsersTables = () => {
    const [user, setuser] = useState([]);
    const navigate = useNavigate();

    const FetchUtilizadores = async() => {
        try {
            const response = await list_utilizador();
            setuser(response.data);
            console.log(response.data);
        } catch(error) {
            console.log('Erro ao aceder a tabela de utilizador');
        }
    }

    const HandleEdit = (id) => {
        navigate(`/utilizadores/editar/${id}`);
    };

    const HandleDelete = async (id) => {
        try {
            await delete_utilizador(id);
            FetchUtilizadores();
        } catch(error) {
            console.log('Erro ao eliminar Utilizador');
        }
    }

    const renderActions = (item) => {
        return(
            <div className="d-flex">
                <button className="btn btn-outline-primary me-2" onClick={() => HandleEdit(item.id_utilizador)}>
                    <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-outline-danger" onClick={() => HandleDelete(item.id_utilizador)}>
                    <i className="bi bi-trash"></i>
                </button>
            </div>
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