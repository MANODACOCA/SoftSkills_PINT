import Table from "../../../components/table/Table";
import { useEffect, useState } from "react";
import { delete_denuncia, list_denuncia } from "../../../../api/denuncia_axios";
import { columnsQueixas } from "../../../components/table/ColumnsQueixas";
import { useNavigate } from "react-router-dom";

const QueixasTables = () => {
    const [queixas, setqueixas] = useState([]);
    const navigate = useNavigate();
   
    const FetchQueixas = async () => {
        try {
            const response = await list_denuncia();
            setqueixas(response);
            console.log(response);
        } catch(error) {
            console.log('Erro ao carregar os dados das queixas');
        }
    }

    const HandleEdit = (id) => {
        navigate(`/queixas/editar/${id}`);
    };

    const HandleDelete = async (id) => {
        try {
            await delete_denuncia(id);
            FetchQueixas();
        } catch(error) {
            console.log('Erro ao eliminar Utilizador');
        }
    }

    const renderActions = (item) => {
        return(
            <div className="d-flex">
                <button className="btn btn-outline-primary me-2" onClick={() => HandleEdit(item.id_denuncia)}>
                    <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-outline-danger" onClick={() => HandleDelete(item.id_denuncia)}>
                    <i className="bi bi-trash"></i>
                </button>
            </div>
        );
    }

    useEffect(() => {
        FetchQueixas();
    },[])

    return(
        <div>
            <Table columns={columnsQueixas} data={queixas} actions={renderActions} />
        </div>
    );
}

export default QueixasTables;