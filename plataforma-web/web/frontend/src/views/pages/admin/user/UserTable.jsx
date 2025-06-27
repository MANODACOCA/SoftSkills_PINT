import Table from "../../../components/table/Table";
import { columnsUtilizadores } from "../../../components/table/ColumnsUtilizadores";
import { useEffect, useState } from "react";
import { delete_utilizador, list_utilizador, update_utilizador } from "../../../../api/utilizador_axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


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
        navigate(`/admin/utilizadores/editar/${id}`);
    };

    const HandleBlock = async (id, estado) => {
        const result = await Swal.fire({
            title: estado ? 'Deseja bloquear este utilizador?' : 'Deseja mostrar este utilizador?',
            text: estado ? 'O utilizador será bloqueado!' : 'O utilizador será desbloqueado!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            customClass: {
                confirmButton: 'btn btn-success me-2',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        });

        if(result.isConfirmed){
            try{
                await update_utilizador(id, {estado_utilizador: !estado});
                await FetchUtilizadores();
                console.log(estado);
                Swal.fire({
                    title: 'Sucesso',
                    text: `utilizador ${estado ? 'bloquado' : 'desbloquado'} com sucesso`,
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                }); 
            } catch(error){
                Swal.fire({
                    title: 'Erro', 
                    text: 'Ocorreu um erro ao atualizar o utilizador', 
                    icon: 'error',
                    confirmButtonText: 'Fechar',
                    customClass: {
                        confirmButton: 'btn btn-danger',
                    },
                });
                console.error("Erro ao bloquear utilizador", error);
            }
        }
    }

    const renderActions = (item) => {
        return(
            <div className="d-flex">
                <button className="btn btn-outline-primary me-2" onClick={() => HandleEdit(item.id_utilizador)}>
                    <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-outline-danger" onClick={() => HandleBlock(item.id_utilizador, item.estado_utilizador)}>
                    <i className={`bi ${item.estado_utilizador ? 'bi-unlock' :  'bi-lock'}`}></i>
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