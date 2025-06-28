import Table from "../../../components/table/Table";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { areaColumns } from "../../../components/table/ColumnsCatAreaTopico";
import { useParams } from "react-router-dom";
import { create_topico, getCategoriaAreaTopico, update_topico } from "../../../../api/topico_axios";
import { create_area } from "../../../../api/area_axios";

const EditarCategoria = () => {
    const {id}  = useParams();
    const [areas, setAreas] = useState([]);
    const fetchCatAreaTop = async () => {
        try {
            const response = await getCategoriaAreaTopico();
            const area = response.find((a) => a.id_categoria.toString() == id.toString())?.areas;
            setAreas(area);
            console.log(area);
        } catch (error) {
            console.log('Erro na lista de categoria area e topico!');
        }
    }

    const renderActions = (item) => {
        return(
            <div>
                <button className="btn btn-outline-primary me-2" onClick={() => handleEditArea()}>
                    <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-outline-success me-2" onClick={() => handleAddTopico(item.id_area)}>
                    <i className="bi bi-plus-circle"></i>
                </button>
            </div>
        );
    }

    const renderTopicos = (item, isExpanded, expandedContent = false ) => {
        if (expandedContent) {
            return (
            <div className="m-0 bg-light border rounded">
                <h6 className='p-2'>Topicos</h6>
                <div className='mx-2 my-1 border rounded'>
                {item.topicos?.length > 0 ? 
                    (item.topicos?.map((t, index) => (    
                        <div key={index} className={`${index % 2 === 0 ? 'line-bg' : 'bg-light'} p-2`}>
                            <div className='d-flex align-items-center justify-content-between'>
                                <div>
                                    {t.nome_topico}   
                                </div>
                                <div>
                                    <button className="btn btn-outline-primary" onClick={()=> handleEditTopico(t)}>
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                    ) : (
                        <div className='p-2'>
                            Área sem tópicos disponíveis
                        </div>
                    )
                }
                </div>
            </div>
            );
        }
        return(
            <div>
                <i className={`bi ${isExpanded ? 'bi-arrow-up' : 'bi-arrow-down'}`}></i>
            </div>            
        );   
    }

    const handleAddTopico = async (idArea) => {
        const result = await Swal.fire({
            title: 'Tem a certeza que deseja alterar o nome do Topico?',
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
        if (result.isConfirmed) {
            const adicionarTopico = await Swal.fire({
                title: 'Adicionar Topico',
                html: ` 
                    <label for="nome" class="form-label">Nome do Tópico</label>
                    <input id="nome" class="form-control mb-3" placeholder= "Nome do Tópico">
                    <label for="descricao" class="form-label">Descrição do Tópico</label>
                    <textarea id="descricao" class="form-control mb-3" placeholder= "Descrição do Tópico"></textarea>
                `,
                preConfirm: () => {
                    const nome = document.getElementById('nome').value;
                    const descricao = document.getElementById('descricao').value;

                    if (!nome || !descricao) {
                        Swal.showValidationMessage('Todos os campos são obrigatórios!');
                        return;
                    }

                    return{
                        nome_topico: nome,
                        descricao_top: descricao,
                    };
                },
                showCancelButton: true,
                confirmButtonText: 'Adicionar Tópico',
                cancelButtonText: 'Cancelar',
                customClass: {
                    confirmButton: 'btn btn-success me-2',
                    cancelButton: 'btn btn-danger'
                },
            });
            if (adicionarTopico.isConfirmed && adicionarTopico.value) {
                try {
                    const id_area = idArea;
                    const nome_topico = adicionarTopico.value.nome_topico;
                    const descricao_top = adicionarTopico.value.descricao_top;
                    await create_topico({id_area, nome_topico, descricao_top});
                    fetchCatAreaTop();
                    Swal.fire({
                        title: 'Sucesso',
                        text: `Adicionado com sucesso`,
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    });
                } catch (error) {
                    Swal.fire({
                        title: 'Erro',
                        text: 'Erro ao cancelar operação',
                        icon: 'error',
                        confirmButtonText: 'Fechar',
                        customClass: {
                            confirmButton: 'btn btn-danger',
                        },
                    });
                    console.error("Erro ao cancelar criação de topico", error);
                }
            }
        }
    }

    const handleEditTopico = async (topicos) => {
        const result = await Swal.fire({
            title: 'Tem a certeza que deseja alterar este Topico?',
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

        if (result.isConfirmed) {
            const editarTopico = await Swal.fire({
                title: 'Editar Tópico',
                html: `
                    <label for="nome" class="form-label">Nome do Tópico</label>
                    <input id="nome" class="form-control mb-3" value="${topicos.nome_topico}" placeholder="Nome do Tópico">
                    <label for="descricao" class="form-label">Descrição do Tópico</label>
                    <textarea id="descricao" class="form-control mb-3" placeholder="Descrição do Tópico">${topicos.descricao_top}</textarea>
                `,
                preConfirm: () => {
                    const nome = document.getElementById('nome').value.trim();
                    const descricao = document.getElementById('descricao').value.trim();  
                    
                    if(!nome || !descricao) {
                        Swal.showValidationMessage('Todos os campos são obrigatórios!');
                        return;
                    }
                    
                    return {
                        nome_topico: nome,
                        descricao_top: descricao
                    };
                },
                showCancelButton: true,
                confirmButtonText: 'Editar Tópico',
                cancelButtonText: 'Cancelar',
                customClass: {
                    confirmButton: 'btn btn-success me-2',
                    cancelButton: 'btn btn-danger'
                },
            });

            if (editarTopico.isConfirmed && editarTopico.value) {
                try {
                    const { nome_topico, descricao_top } = editarTopico.value;
                    await update_topico({ nome_topico, descricao_top });
                    await fetchCatAreaTop();
                Swal.fire({
                        title: 'Sucesso',
                        text: `Alterado com sucesso`,
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    });

                } catch (error) {
                    Swal.fire({
                        title: 'Erro',
                        text: 'Erro ao cancelar operação',
                        icon: 'error',
                        confirmButtonText: 'Fechar',
                        customClass: {
                            confirmButton: 'btn btn-danger',
                        },
                    });
                    console.error("Erro ao editar de topico", error);
                }
            }
        }
    }

    const handleAddArea = async () => {
        const result = await Swal.fire({
            title: 'Tem a certeza que deseja adicionar área?',
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
        if (result.isConfirmed) {
            const adicionarArea = await Swal.fire({
                title: 'Adicionar Área',
                html: ` 
                    <label for="nome" class="form-label">Nome da Área</label>
                    <input id="nome" class="form-control mb-3" placeholder= "Nome da Área">
                `,
                preConfirm: () => {
                    const nome = document.getElementById('nome').value;

                    if (!nome) {
                        Swal.showValidationMessage('Todos os campos são obrigatórios!');
                        return;
                    }

                    return{
                        nome_area: nome,
                    };
                },
                showCancelButton: true,
                confirmButtonText: 'Adicionar Área',
                cancelButtonText: 'Cancelar',
                customClass: {
                    confirmButton: 'btn btn-success me-2',
                    cancelButton: 'btn btn-danger'
                },
            });
            if (adicionarArea.isConfirmed && adicionarArea.value) {
                try {
                    const id_categoria = id;
                    const nome_area = adicionarArea.value.nome_area;
                    await create_area({id_categoria, nome_area});
                    fetchCatAreaTop();
                    Swal.fire({
                        title: 'Sucesso',
                        text: `Adicionado com sucesso`,
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    });
                } catch (error) {
                    Swal.fire({
                        title: 'Erro',
                        text: 'Erro ao cancelar operação',
                        icon: 'error',
                        confirmButtonText: 'Fechar',
                        customClass: {
                            confirmButton: 'btn btn-danger',
                        },
                    });
                    console.error("Erro ao cancelar criação de área", error);
                }
            }
        }
    }

    const handleEditArea = async () => {
        
    }
    
    useEffect(() => {
        fetchCatAreaTop();
    }, []);

    return (
        <div className="">
            <div className="mb-4">
                <label className="form-label fw-bold">Nome da Categoria</label>
                <input className="form-control" type="text" />    
            </div>
            <div>
                <Table columns={areaColumns} data={areas ?? []} actions={renderActions} onAddClick={handleAddArea} conteudos={renderTopicos} />
            </div>
        </div>
    )

}

export default EditarCategoria;


