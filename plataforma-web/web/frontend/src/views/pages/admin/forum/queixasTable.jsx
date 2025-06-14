import Table from "../../../components/table/Table";
import { columnsUtilizadores } from "../../../components/table/ColumnsUtilizadores";

const QueixasTables = () => {

    

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
            <Table columns={columnsUtilizadores} data={user} actions={renderActions} />
        </div>
    );
}

export default QueixasTables;