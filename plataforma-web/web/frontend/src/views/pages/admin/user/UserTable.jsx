import Table from "../../../components/table/Table";
import { columnsUtilizadores } from "../../../components/table/ColumnsUtilizadores";
import { useEffect, useState } from "react";
import { create_utilizador, delete_utilizador, list_utilizador, update_utilizador } from "../../../../api/utilizador_axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


const UsersTables = () => {
    const [user, setuser] = useState([]);
    const navigate = useNavigate();
    const [formador, setFormador] = useState(false);

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

    const HistoryUser = (id) => {
        navigate(`/admin/utilizadores/historico/${id}`);
    }

    const renderActions = (item) => {
        return(
            <div className="d-flex">
                <button className="btn btn-outline-success me-2" onClick={() => HistoryUser(item.id_utilizador)}>
                    <i className="bi bi-clock-history"></i>
                </button>
                <button className="btn btn-outline-danger" onClick={() => HandleBlock(item.id_utilizador, item.estado_utilizador)}>
                    <i className={`bi ${item.estado_utilizador ? 'bi-unlock' :  'bi-lock'}`}></i>
                </button>
            </div>
        );
    }

    const HandleCreate = async () => {
        const result = await Swal.fire({
            title: "Tem certeza que deseja adicionar utilizador?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonColor: "Cancelar",
            customClass: {
                confirmButton: 'btn btn-success me-2',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false,
        });
        if(result.isConfirmed) {
            const adicionarUtilizador = await Swal.fire({
                title: 'Adicionar Utilizador',
                html: ` 
                    <label for="nome" class="form-label">Nome de Utilizador</label>
                    <input id="nome" class="form-control mb-3" placeholder= "Nome do utilizador">
                    <label for="email" class="form-label">Email do utilizador</label>
                    <input id="email" class="form-control mb-3" placeholder="exemplo@email.com">
                `,
                preConfirm: () => {
                    const nome = document.getElementById('nome').value;
                    const email = document.getElementById('email').value;

                    if (!nome || !email) {
                        Swal.showValidationMessage('Todos os campos são obrigatórios!');
                        return;
                    }

                    return{
                        nome_utilizador: nome,
                        email,
                    };
                },
                showCancelButton: true,
                confirmButtonText: 'Adicionar Utilizador',
                cancelButtonText: 'Cancelar',
                customClass: {
                    confirmButton: 'btn btn-success me-2',
                    cancelButton: 'btn btn-danger'
                },
            });
            if (adicionarUtilizador.isConfirmed && adicionarUtilizador.value) {
                try {
                    const nome_utilizador = adicionarUtilizador.value.nome_utilizador;
                    const email = adicionarUtilizador.value.email
                    const data = await create_utilizador(nome_utilizador, email);
                    //const cargo = await update_utilizador(id, {isformador: formador});
                    console.log(data);
                    //console.log(cargo);
                    const users = await FetchUtilizadores();
                    console.log(users);
                    Swal.fire({
                        icon: "success",
                        title: "Conteudo adicionado com sucesso!",
                        timer: 2000,
                        showConfirmButton: false
                    });
                } catch (error) {
                    console.log('Erro ao criar Utlizador');
                    Swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Não foi possível adicionar o conteudo",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                }    
            }         
        }
    }

    useEffect(() => {
        FetchUtilizadores();
    }, [])

    return(
        <div>
            <Table columns={columnsUtilizadores} data={user} actions={renderActions} onAddClick={HandleCreate} />
        </div>
    );
}

export default UsersTables;