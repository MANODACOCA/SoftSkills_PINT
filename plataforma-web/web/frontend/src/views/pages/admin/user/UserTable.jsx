import Table from "../../../components/table/Table";
import { columnsUtilizadores } from "../../../components/table/ColumnsUtilizadores";

const UsersTables = () => {

    const user = [
    {
        id: 1,
        nome_utilizador: "joaosilva",
        email: "joao.silva@email.com",
        telemovel: "912345678",
        data_nascimento: "1990-05-12",
        género: "Masculino",
        país: "Portugal",
        morada: "Rua das Flores, 123",
        role: "admin"
    },
    {
        id: 2,
        nome_utilizador: "mariaoliveira",
        email: "maria.oliveira@email.com",
        telemovel: "934567891",
        data_nascimento: "1988-09-20",
        género: "Feminino",
        país: "Brasil",
        morada: "Av. Paulista, 456",
        role: "moderador"
    },
    {
        id: 3,
        nome_utilizador: "carlosmendes",
        email: "carlos.mendes@email.com",
        telemovel: "926789123",
        data_nascimento: "1995-01-07",
        género: "Masculino",
        país: "Angola",
        morada: "Rua Central, 88",
        role: "utilizador"
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
            <Table columns={columnsUtilizadores} data={user} actions={renderActions} />
        </div>
    );
}

export default UsersTables;