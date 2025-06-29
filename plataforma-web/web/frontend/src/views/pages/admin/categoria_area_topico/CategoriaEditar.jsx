import Table from "../../../components/table/Table";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { areaColumns } from "../../../components/table/ColumnsCatAreaTopico";
import { useNavigate, useParams } from "react-router-dom";
import { create_topico, getCategoriaAreaTopico, update_topico } from "../../../../api/topico_axios";
import { create_area, update_area } from "../../../../api/area_axios";
import { get_categoria, update_categoria } from "../../../../api/categoria_axios";

const EditarCategoria = () => {
    const {id}  = useParams();
    const [areas, setAreas] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const navigate = useNavigate();

    const fetchCatAreaTop = async () => {
        try {
            const response = await getCategoriaAreaTopico();
            setCategoria(response);
            const area = response.find((a) => a.id_categoria.toString() == id.toString())?.areas;
            setAreas(area);
            console.log(area);
        } catch (error) {
            console.log('Erro na lista de categoria area e topico!');
        }
    }

    const fetchCategoria = async () => {
        try {
            const response = await get_categoria(id);
            setCategoria(response);
            console.log(response);
        } catch (error) {
            console.log('Erro ao carregar Categorias');
        }
    }

    const renderActions = (item) => {
        return(
            <div>
                <button className="btn btn-outline-primary me-2" onClick={() => handleEditArea(item)}>
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
                    <textarea id="descricao" class="form-control mb-3" style="min-height: 300px; max-height: 500px;" placeholder= "Descrição do Tópico"></textarea>
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
                        text: 'Erro ao tentar adicionar topico',
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
                    <textarea id="descricao" class="form-control mb-3" style="min-height: 300px; max-height: 500px;" placeholder="Descrição do Tópico">${topicos.descricao_top}</textarea>
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
                    const id_topico = topicos.id_topico;
                    await update_topico(id_topico, { nome_topico, descricao_top });
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
                        text: 'Erro ao tentar editar o topico',
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

    const handleEditArea = async (areas) => {
        console.log(areas.nome_area);
        const result = await Swal.fire({
            title: 'Tem a certeza que deseja editar a área?',
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
            const editarArea = await Swal.fire({
                title: 'Editar Área',
                html: ` 
                    <label for="nome" class="form-label">Nome da Área</label>
                    <input id="nome" class="form-control mb-3" value="${areas.nome_area}">
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
                confirmButtonText: 'Editar Área',
                cancelButtonText: 'Cancelar',
                customClass: {
                    confirmButton: 'btn btn-success me-2',
                    cancelButton: 'btn btn-danger'
                },
            });
            if (editarArea.isConfirmed && editarArea.value) {
                try {
                    const id_area = areas.id_area;
                    const nome_area = editarArea.value.nome_area;
                    await update_area(id_area, { nome_area});
                    fetchCatAreaTop();
                    Swal.fire({
                        title: 'Sucesso',
                        text: `Editado com sucesso`,
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    });
                } catch (error) {
                    Swal.fire({
                        title: 'Erro',
                        text: 'Erro ao editar área',
                        icon: 'error',
                        confirmButtonText: 'Fechar',
                        customClass: {
                            confirmButton: 'btn btn-danger',
                        },
                    });
                    console.error("Erro ao editar área", error);
                }
            }
        } 
    }

    const handleCategoria = async () => {
        console.log(categoria.id_categoria);
        const result = await Swal.fire({
            title: 'Tem a certeza que deseja o nome desta Categoria?',
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
        
        if (result.isConfirmed){
            try {
                await update_categoria(categoria.id_categoria, { nome_cat: categoria.nome_cat });
                Swal.fire({
                    icon: "success",
                    title: "Categoria alterada com sucesso!",
                    timer: 2000,
                    showConfirmButton: false
                });
                await fetchCatAreaTop();
            } catch (error) {
                console.error("Erro ao mudar nome da categoria", error);
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: "Não foi possível mudar o nome da categoria",
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        }
    }
    
    useEffect(() => {
        fetchCatAreaTop();
        fetchCategoria();
    }, []);

    return (
        <div className="">
            <div className="mb-5">
                <label className="form-label fw-bold">Nome da Categoria</label>
                <input className="form-control" type="text" value={categoria.nome_cat} onChange={(e) => setCategoria({ ...categoria, nome_cat: e.target.value })}/> 
                <div className="d-flex justify-content-between mt-4">
                    <button className="btn btn-success me-2" onClick={() => handleCategoria()}>
                        Alterar Nome Categoria
                    </button>
                    <button className="btn btn-danger me-2" onClick={() => {navigate('/admin/categorias')}}>
                        Cancelar Alterações
                    </button>
                </div>   
            </div>
            <div>
                <Table columns={areaColumns} data={areas ?? []} actions={renderActions} onAddClick={handleAddArea} conteudos={renderTopicos} />
            </div>
        </div>
    )
}

export default EditarCategoria;


