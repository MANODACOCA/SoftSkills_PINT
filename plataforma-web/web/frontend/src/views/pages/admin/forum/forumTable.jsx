import Table from "../../../components/table/Table";
import { useEffect, useState } from "react";
import { columnsForum } from "../../../components/table/ColumnsForum";
import { list_conteudos_partilhado, delete_conteudos_partilhado, create_conteudos_partilhado } from "../../../../api/conteudos_partilhado_axios";
import { useNavigate } from "react-router-dom";
import { delete_pedido_forum, list_pedidos_forum } from "../../../../api/pedidos_forum_axios";
import { columnsPedidosForum } from "../../../components/table/ColumnsPedidosForum";
import Swal from "sweetalert2";
import { create_topico, getCategoriaAreaTopico } from "../../../../api/topico_axios";

const ForumTable = () => {
    const [forum, setforum] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const opcoes = ['Fóruns', 'Pedidos'];
    const [opcao, setOpcao] = useState("Fóruns");
    const [catAreaTop, setCatAreaTop] = useState([]);
    const navigate = useNavigate();

    const handleChangeOpcao = (a) => {
        setOpcao(a);
    };

    const FetchForum = async () => {
        try {
            const response = await list_conteudos_partilhado();
            setforum(response);
            console.log(response);
        } catch(error) {
            console.log('Erro ao carregar os dados dos Foruns');
        }
    }

    const FetchCategoriaAreaTopico = async () => {
        try {
            const response = await getCategoriaAreaTopico();
            console.log(response);
            setCatAreaTop(response);
        } catch (error) {
            console.log('Erro ao ir buscar os categoria, área e tópico');
        }
    }

    const FetchPedidos = async () => {
        try {
            const response = await list_pedidos_forum();
            setPedidos(response);
        } catch (error) {
            console.log('Erro ao encontrar Pedidos de forum');
        }
    }

    const HandleDeletePedido = async (id_pedido) => {
        console.log(id_pedido);
        const result = await Swal.fire({
            title: 'Tem a certeza que pretende eliminar pedido?',
            text: 'Não vai aceitar o pedido de criação de tópico!',
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
                await delete_pedido_forum(id_pedido);
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
                    text: 'Ocorreu um erro eliminar pedido', 
                    icon: 'error',
                    confirmButtonText: 'Fechar',
                    customClass: {
                        confirmButton: 'btn btn-danger',
                    },
                });
            }
        }
    }
    
    const HandleCreateTopico = async (id_pedido, topicoSugerido) => {
        console.log(id_pedido);
        const result = await Swal.fire({
            title: 'Criação do tópico sugerido!',
            html: ` 
                <label for="categoriaSelect" class="form-label">Categoria</label>
                <select id="categoriaSelect" class="form-select mb-3">
                    <option value="">--Escolher Categoria--</option>
                    ${catAreaTop.map(cat => `<option value="${cat.id_categoria}">${cat.nome_cat}</option>`).join('')}
                </select>

                <label for="areaSelect" class="form-label">Área</label>
                <select id="areaSelect" class="form-select mb-3">
                    <option value="">--Escolher Área--</option>
                </select>

                <label for="topicoSugerido" class="form-label">Tópico Sugerido</label>
                <input type="text" id="topicoSugerido" class="form-control mb-3" placeholder="Nome do Tópico" value="${topicoSugerido}">

                <label for="descricao" class="form-label">Descrição do Tópico</label>
                <textarea id="descricao" class="form-control mb-3" style="min-height: 300px; max-height: 500px;" placeholder="Descrição do Tópico"></textarea>
            `,
            didOpen: () => {
                const categoriaSelect = document.getElementById('categoriaSelect');
                const areaSelect = document.getElementById('areaSelect');

                categoriaSelect.addEventListener('change', () => {
                    const selectedCat = catAreaTop.find(cat => cat.id_categoria.toString() === categoriaSelect.value);
                    areaSelect.innerHTML = `<option value="">--Escolher Área--</option>`;
                    if (selectedCat?.areas?.length) {
                        selectedCat.areas.forEach(area => {
                            const opt = document.createElement('option');
                            opt.value = area.id_area;
                            opt.textContent = area.nome_area;
                            areaSelect.appendChild(opt);
                        });
                    }
                });
            },
            preConfirm: () => {
                const area = document.getElementById('areaSelect').value;
                const nome = document.getElementById('topicoSugerido').value;
                const descricao = document.getElementById('descricao').value;

                if (!area || !nome || !descricao) {
                    Swal.showValidationMessage('Todos os campos são obrigatórios!');
                    return false;
                }

                return { area, nome, descricao };
            },
            showCancelButton: true,
            confirmButtonText: 'Criar Tópico',
            cancelButtonText: 'Cancelar',
            customClass: {
                confirmButton: 'btn btn-success me-2',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        });

        if(result.isConfirmed){
            try{
                const {area, nome, descricao } = result.value;
                console.log(result.value);
                const data = await create_topico({id_area: area, nome_topico: nome, descricao_top: descricao});
                const id_topico = data.id_topico;
                const data_criacao_cp = new Date();
                await create_conteudos_partilhado({id_topico, data_criacao_cp, id_pedido});
                await FetchPedidos();
                Swal.fire({
                    title: 'Sucesso',
                    text: `Foi criado um novo tópico`,
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                }); 
            } catch(error){
                Swal.fire({
                    title: 'Erro', 
                    text: 'Ocorreu um erro a criar um novo tópico', 
                    icon: 'error',
                    confirmButtonText: 'Fechar',
                    customClass: {
                        confirmButton: 'btn btn-danger',
                    },
                });
                console.error(error);
            }
        }
    }

    const renderActions = (item) => {
        return(
            <div className="d-flex">
                <button className='btn btn-outline-primary me-2'
                    onClick={() => HandleCreateTopico(item.id_pedidos_novos_foruns, item.novo_forum)}>
                    <i className='bi bi-plus-circle fs-5'></i>
                </button>
                <button className='btn btn-outline-danger me-2'
                    onClick={() => HandleDeletePedido(item.id_pedidos_novos_foruns)}>
                    <i className='bi bi-trash fs-5'></i>
                </button>
            </div>
        );
    }

    useEffect(() => {
        FetchForum();
        FetchPedidos();
        FetchCategoriaAreaTopico();
    },[])

    return(
        <div>
            <div className="mb-3 d-flex justify-content-between">
                <div>
                    {opcao === 'Fóruns' && (
                    <h3>Lista tópicos fórum</h3>
                    )}
                    {opcao === 'Pedidos' && (
                    <h3>Pedidos de tópicos fórum</h3>
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
            
            {opcao === 'Fóruns' && (
               <Table columns={columnsForum} data={forum} /> 
            )}
            {opcao === 'Pedidos' && (
               <Table columns={columnsPedidosForum} data={pedidos} actions={renderActions}/>
            )}
        </div>
    );
}

export default ForumTable;