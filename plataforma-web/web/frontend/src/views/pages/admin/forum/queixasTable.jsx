import Table from "../../../components/table/Table";
import { useEffect, useState } from "react";
import { list_denuncia } from "../../../../api/denuncia_axios";
import { columnsQueixas } from "../../../components/table/ColumnsQueixas";

const QueixasTables = () => {
    const [queixas, setqueixas] = useState([]);

    const FetchQueixas = async () => {
        try {
            const response = await list_denuncia();
            setqueixas(response);
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
        FetchQueixas();
    },[])

    return(
        <div>
            <Table columns={columnsQueixas} data={queixas} actions={renderActions} />
        </div>
    );
}

export default QueixasTables;