import Table from "../../../components/table/Table";
import { useEffect, useState } from "react";
import { getCategoriaAreaTopico } from "../../../../api/topico_axios";
import { catColumns, areaColumns, topicoColumns } from "../../../components/table/ColumnsCatAreaTopico";
import { create_categoria } from "../../../../api/categoria_axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CategoriaAreaTopicoTable = () => {
    const [CatAreaTop, setCatAreaTop] = useState([]); 
    const navigate = useNavigate();
    
    const fetchCategoriaAreaTopico = async () => {
        try {
            const response = await getCategoriaAreaTopico();
            console.log(response);
            setCatAreaTop(response);
        } catch (error) {
            console.log('Erro ao ir buscar as categoria, área e tópico');
        }
    }

    const renderActions = (item) => {
        return(
        <div className="d-flex">
            <button className="btn btn-outline-primary me-2" onClick={() => handleEditCategoria(item.id_categoria, item.nome_cat)}>
                <i className="bi bi-pencil"></i>
            </button>
        </div>
        );
    };
    
    const handleEditCategoria = async (id, nome) => {
        const result = await Swal.fire({
            title: `Tem a certeza que deseja editar ou adicionar área/tópico à ${nome}`,
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
                navigate(`/admin/categorias/editar/${id}`);
            } catch (error) {
                Swal.fire({
                    title: 'Erro',
                    text: `Ocorreu um erro ao tentar aceder às areas da ${CatAreaTop.nome_cat} `,
                    icon: 'error',
                    confirmButtonText: 'Fechar',
                    customClass: {
                        confirmButton: 'btn btn-danger',
                    },
                });
            }
        }
    };

    const handleAddCategoria = async () => {
        const result = await Swal.fire({
            title: `Tem a certeza que deseja adicionar nova categoria?`,
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
            const adicionarCategoria = await Swal.fire({
                title: 'Adicionar Topico',
                html: ` 
                    <label for="nome" class="form-label">Nome da Categoria</label>
                    <input id="nome" class="form-control mb-3" placeholder= "Nome da categoria">
                `,
                preConfirm: () => {
                    const nome = document.getElementById('nome').value;
                    
                    if (!nome) {
                        Swal.showValidationMessage('Todos os campos são obrigatórios!');
                        return;
                    }

                    return{
                        nome_cat: nome,
                    };
                },
                showCancelButton: true,
                confirmButtonText: 'Adicionar Categoria',
                cancelButtonText: 'Cancelar',
                customClass: {
                    confirmButton: 'btn btn-success me-2',
                    cancelButton: 'btn btn-danger'
                },
            });
            if (adicionarCategoria.isConfirmed && adicionarCategoria.value) {
                try {
                    const nome_cat = adicionarCategoria.value.nome_cat;
                    await create_categoria({nome_cat: nome_cat});
                    fetchCategoriaAreaTopico();
                    Swal.fire({
                        icon: "success",
                        title: "Categoria adicionada com sucesso!",
                        timer: 2000,
                        showConfirmButton: false
                    });
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Não foi possível adicionar o categoria",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                }    
            }
        }
    }

    useEffect(() => {
        fetchCategoriaAreaTopico();
    }, []);

    return (
        <div className="">
            <Table columns={catColumns} data={CatAreaTop} actions={renderActions} onAddClick={handleAddCategoria} />
        </div>
        
    );
}

export default CategoriaAreaTopicoTable;