import Table from "../../../components/table/Table";
import { columnsUtilizadores } from "../../../components/table/ColumnsUtilizadores";
import { useEffect, useState } from "react";
import { create_utilizador, delete_utilizador, list_utilizador, update_utilizador } from "../../../../api/utilizador_axios";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';
import { create_formadores } from "../../../../api/formadores_axios";
import { debounce } from 'lodash';
import { delete_pedidos_upgrade, list_pedidos_upgrade } from "../../../../api/pedidos_upgrade_cargo_axios";
import { ColumnsUpgradeUser } from "../../../components/table/ColumnsUpgradeUser";

const UsersTables = () => {
    const [user, setuser] = useState([]);
    const opcoes = ['Utilizadores', 'Pedidos'];
    const [opcao, setOpcao] = useState("Utilizadores");
    const [pedidos, setPedidos] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');

    const handleChangeOpcao = (a) => {
        setOpcao(a);
    };

    const FetchUtilizadores = async() => {
        try {
            const response = await list_utilizador(searchTerm || "");
            setuser(response.data);
        } catch(error) {
            console.log('Erro ao aceder a tabela de utilizador');
        }
    }

    const FetchPedidos = async () => {
        try {
            const response = await list_pedidos_upgrade();
            setPedidos(response);
        } catch (error) {
            console.log('Erro ao encontrar pedido de update formador');
        }
    }

    const debouncedNavigate = debounce((value) => {
        const params = new URLSearchParams(location.search);
        if (value) {
            params.set("search", value);
        } else {
            params.delete("search");
        }
        navigate(`${location.pathname}?${params.toString()}`);
    });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setSearchTerm(params.get('search') || '');
    }, [location.search]);

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

    const HistoryUser = async (id, utilizador) => {
        const result = await Swal.fire({
            title: `Tem a certeza que deseja consultar o historico de ${utilizador}?`,
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

        if(result.isConfirmed) {
            try {
                navigate(`/admin/utilizadores/historico/${id}`);
            } catch (error) {
                Swal.fire({
                    title: 'Erro',
                    text: `Ocorreu um erro ao tentar aceder ao historico de utilizador ${utilizador}`,
                    icon: 'error',
                    confirmButtonText: 'Fechar',
                    customClass: {
                        confirmButton: 'btn btn-danger',
                    },
                });
            }
        }
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
                    <div class="mb-3 text-center">
                        <h4 class="mb-3">Tipo de Utilizador</h4>
                        <div class="form-check form-switch d-inline-flex align-items-center justify-content-center mb-2">
                            <input class="form-check-input me-3" type="checkbox" role="switch" id="formadorSwitch">
                            <label class="form-check-label" for="formadorSwitch">
                                Formador
                            </label>
                        </div>
                    </div>
                    <div id="descricaoWrapper" class="d-none">
                        <label for="descricao" id="descricaoLabel" class="form-label">Descrição do formador</label>
                        <textarea id="descricao" class="form-control mb-3" style="min-height: 300px; max-height: 500px;" placeholder="Descrição formador"></textarea>
                    </div>
                `,
                didOpen: () => {
                    const selectedFormador = document.getElementById('formadorSwitch');
                    const descricaoWrapper = document.getElementById('descricaoWrapper');

                    const toggleDescricao = () => {
                        if (selectedFormador.checked) {
                            descricaoWrapper.classList.remove('d-none');
                        } else {
                            descricaoWrapper.classList.add('d-none');
                        }
                    };

                    toggleDescricao();

                    formadorSwitch.addEventListener('change', toggleDescricao);
                },
                preConfirm: () => {
                    const nome = document.getElementById('nome').value;
                    const email = document.getElementById('email').value;
                    const formador = document.getElementById('formadorSwitch').checked;
                    const descricao = document.getElementById('descricao')?.value || '';
                    
                    if (!nome || !email) {
                        Swal.showValidationMessage('Todos os campos são obrigatórios!');
                        return;
                    }

                    return{
                        nome_utilizador: nome,
                        email,
                        isformador: formador,
                        descricao: formador ? descricao : ''
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
                    const formador = adicionarUtilizador.value.isformador;
                    const nome_utilizador = adicionarUtilizador.value.nome_utilizador;
                    const email = adicionarUtilizador.value.email;
                    const descricao_formador = adicionarUtilizador.value.descricao;
                    const data = await create_utilizador(nome_utilizador, email);
                    await update_utilizador(data.data.id_utilizador, {isformador: formador});
                    if (formador) {
                        const id_formador = data.data.id_utilizador;
                        await create_formadores({id_formador, descricao_formador});
                    }
                    FetchUtilizadores();
                    Swal.fire({
                        icon: "success",
                        title: "Utilizador adicionado com sucesso!",
                        timer: 2000,
                        showConfirmButton: false
                    });
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Não foi possível adicionar o utilizador",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                }    
            }         
        }
    }

    const HandleType = async (id, utilizador, id_pedido = null) => {
        console.log(id_pedido);
        const result = await Swal.fire({
            title: `Tem a certeza que deseja alterar ${utilizador} para formador?`,
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

        if(result.isConfirmed) {
            const adicionarFormador = await Swal.fire({
                title: 'Adicionar Formador',
                html: ` 
                    <label for="nome" class="form-label">Nome de Utilizador</label>
                    <input id="nome" class="form-control mb-3" value="${utilizador}" readonly>
                    <label for="descricaoformador" class="form-label">Descrição do formador</label>
                    <textarea id="descricaoFormador" class="form-control mb-3" style="min-height: 300px; max-height: 500px;" placeholder="Descrição do formador"></textarea> 
                `,
                preConfirm: () => {
                    const descricaoformador = document.getElementById('descricaoFormador').value.trim();
   
                    if (!descricaoformador) {
                        Swal.showValidationMessage('Todos os campos são obrigatórios!');
                        return;
                    }

                    return{
                        descricao_formador: descricaoformador,
                    };
                },
                showCancelButton: true,
                confirmButtonText: 'Atualizar Utilizador',
                cancelButtonText: 'Cancelar',
                customClass: {
                    confirmButton: 'btn btn-success me-2',
                    cancelButton: 'btn btn-danger'
                },
            });
            if (adicionarFormador.isConfirmed && adicionarFormador.value) {
                try {
                    const formador = adicionarFormador.value.descricao_formador;
                    await update_utilizador(id, {isformador: true});
                    await create_formadores({id_formador: id, descricao_formador: formador});
                    if(id_pedido) {
                        await delete_pedidos_upgrade(id_pedido);
                    }
                    FetchPedidos();
                    FetchUtilizadores();
                    Swal.fire({
                        icon: "success",
                        title: "Utilizador atualizado com sucesso!",
                        timer: 2000,
                        showConfirmButton: false
                    });
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Não foi possível atualizar o utilizador",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                }    
            }     
        }
    }

    const HandleDeletePedidos = async (id_pedido) => {
        const result = await Swal.fire({
            title: 'Tem a certeza que pretende eliminar pedido?',
            text: 'O utilizador vai continuar apenas como formando!',
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
                await delete_pedidos_upgrade(id_pedido);
                await FetchPedidos();
                Swal.fire({
                    title: 'Sucesso',
                    text: `O pedido foi ignorado`,
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
                <button className='btn btn-outline-primary me-2'
                    disabled={item.isformador}
                    onClick={() => HandleType(item.id_utilizador, item.nome_utilizador)}>
                    <i className='bi bi-person-fill-up fs-5'></i>
                </button>
                <button className="btn btn-outline-success me-2" onClick={() => HistoryUser(item.id_utilizador, item.nome_utilizador)}>
                    <i className="bi bi-person-lines-fill fs-5"></i>
                </button>
                <button className="btn btn-outline-danger" onClick={() => HandleBlock(item.id_utilizador, item.estado_utilizador)}>
                    <i className={`bi ${item.estado_utilizador ? 'bi-unlock' :  'bi-lock'}`}></i>
                </button>
            </div>
        );
    }

    const renderActionsPedidos = (item) => {
        return(
            <div className="d-flex">
                <button className='btn btn-outline-primary me-2'
                    disabled={item.id_formando_formando.id_formando_utilizador.isformador}
                    onClick={() => HandleType( item.id_formando_formando.id_formando_utilizador.id_util, item.id_formando_formando.id_formando_utilizador.nome_util, item.id_pedidos_upgrade_cargo)}>
                    <i className='bi bi-person-fill-up fs-5'></i>
                </button>
                <button className="btn btn-outline-success me-2" onClick={() => HistoryUser( item.id_formando_formando.id_formando_utilizador.id_util, item.id_formando_formando.id_formando_utilizador.nome_util)}>
                    <i className="bi bi-person-lines-fill fs-5"></i>
                </button>
                <button className="btn btn-outline-danger me-2" onClick={() => HandleDeletePedidos(item.id_pedidos_upgrade_cargo)}>
                    <i className="bi bi-trash fs-5"></i>
                </button>
            </div>
        );
    }

    useEffect(() => {
        FetchUtilizadores();
    }, [searchTerm])

    useEffect(() => {
        FetchPedidos();
    },[])

    return(
        <div>
            <div className="mb-3 d-flex justify-content-between">
                <div>
                    {opcao === 'Utilizadores' && (
                    <h3>Lista utilizadores</h3>
                    )}
                    {opcao === 'Pedidos' && (
                    <h3>Pedidos de upgrade formador</h3>
                    )}
                </div>
                <div className="btn-group w-25">
                    {opcoes.map((o, index) => (
                    <button
                        key={index}
                        className={`btn ${opcao === o ? 'btn-active' : 'btn-outline-custom'}`}
                        onClick={() => handleChangeOpcao(o)}
                    >
                        {o.charAt(0).toUpperCase() + o.slice(1)}
                    </button>
                    ))}
                </div>    
            </div>
            { opcao === 'Utilizadores' && (
                <Table 
                    columns={columnsUtilizadores} 
                    data={user ?? []} 
                    actions={renderActions} 
                    onAddClick={{callback: HandleCreate, label: 'Utilizadores'}}
                    pesquisa={true}
                    searchTerm={searchTerm}
                    onSearchChange={(value) => {
                        setSearchTerm(value);
                        debouncedNavigate(value);
                    }} 
                />    
            )}
            { opcao === 'Pedidos' && (
                <Table columns={ColumnsUpgradeUser} data={pedidos} actions={renderActionsPedidos}/>
            )}
            
        </div>
    );
}

export default UsersTables;